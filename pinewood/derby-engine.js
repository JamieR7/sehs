/**
 * PACK 130 GENEVA - PINEWOOD DERBY ENGINE (derby-engine.js)
 * Pure JS state & scheduling engine for 6 Dens, 6 Lanes, variable car counts,
 * configurable per-Den qualifiers, 2-or-3 Semifinal groups, and selectable Final heats.
 * Complete Audited & Patched Version (100% Pure ASCII)
 */

const DENS = [
  { id: 'Lions',   name: 'Lions',   prefix: 'L',  emoji: '\u{1F981}' },
  { id: 'Tigers',  name: 'Tigers',  prefix: 'T',  emoji: '\u{1F42F}' },
  { id: 'Wolves',  name: 'Wolves',  prefix: 'WO', emoji: '\u{1F43A}' },
  { id: 'Bears',   name: 'Bears',   prefix: 'B',  emoji: '\u{1F43B}' },
  { id: 'Webelos', name: 'Webelos', prefix: 'WE', emoji: '\u{1F9ED}' },
  { id: 'AOLs',    name: 'AOLs',    prefix: 'A',  emoji: '\u{1F3F9}' }
];

// Non-consecutive lane progression: spreads 3-heat runs across Left/Center/Right
// and covers all 6 unique lanes without repeats on up to 6-heat Finals.
const STEPPED_LANE_ORDER = [1, 3, 5, 2, 4, 6];

const STORAGE_KEY = 'PACK_130_DERBY_STATE_V1';

/**
 * Unbiased Fisher-Yates array shuffle
 */
function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

class DerbyEngine {
  constructor() {
    this.state = this.loadState() || this.getInitialState();
    // Backfill new settings if loading an older saved state
    let needsSave = false;
    if (!this.state.denQualifiers) {
      this.state.denQualifiers = this.getDefaultDenQualifiers();
      needsSave = true;
    }
    if (!this.state.semiFormat) {
      this.state.semiFormat = 'AUTO'; // 'AUTO' | '2_GROUPS' | '3_GROUPS'
      needsSave = true;
    }
    if (typeof this.state.finalRuns !== 'number') {
      this.state.finalRuns = 3; // Default to 3 heats in Grand Final (editable 1..6)
      needsSave = true;
    }
    if (needsSave) {
      this.saveState();
    }
  }

  getDefaultDenQualifiers() {
    const map = {};
    DENS.forEach(d => { map[d.id] = 2; });
    return map;
  }

  getInitialState() {
    return {
      // "AVERAGE" = Lowest avg finish wins + Wildcard option (Slide Deck)
      // "POINTS"  = 6-5-4-3-2-1 pts (Manual Plan)
      rulesMode: 'AVERAGE',
      // "AUTO" = 2 Semis if <=12 qualifiers, 3 Semis (Top 2 each) if >12 qualifiers
      // "2_GROUPS" = Always 2 Semifinals (A & B)
      // "3_GROUPS" = Always 3 Semifinals (A, B, C - Top 2 each advance to 6-car Final)
      semiFormat: 'AUTO',
      finalRuns: 3, // Number of heats in the Grand Final (1..6)
      stage: 'CHECK_IN', // CHECK_IN | QUALIFYING | SEMIFINALS | WILDCARD | FINALS
      activeHeatId: null,
      denQualifiers: this.getDefaultDenQualifiers(),
      cars: [],
      heats: []
    };
  }

  getDenQualifierCount(denId) {
    const val = this.state.denQualifiers?.[denId];
    return typeof val === 'number' && val >= 1 ? val : 2;
  }

  setDenQualifierCount(denId, count) {
    if (!this.state.denQualifiers) {
      this.state.denQualifiers = this.getDefaultDenQualifiers();
    }
    const parsed = parseInt(count, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 6) {
      this.state.denQualifiers[denId] = parsed;
      this.saveState();
    }
  }

  getTotalPlannedSemifinalists() {
    return DENS.reduce((sum, d) => sum + this.getDenQualifierCount(d.id), 0);
  }

  /**
   * Returns 2 or 3 depending on semiFormat and/or active Semifinal heats
   */
  getEffectiveSemiGroupCount() {
    const existingSemiC = this.state.heats.some(
      h => h.stage === 'SEMIFINALS' && h.group === 'Semifinal C'
    );
    const existingSemiA = this.state.heats.some(
      h => h.stage === 'SEMIFINALS' && h.group === 'Semifinal A'
    );
    // If Semifinals have already been generated, respect the generated structure
    if (existingSemiA) {
      return existingSemiC ? 3 : 2;
    }
    if (this.state.semiFormat === '3_GROUPS') return 3;
    if (this.state.semiFormat === '2_GROUPS') return 2;
    // AUTO mode: use 3 groups whenever total planned semifinalists > 12
    return this.getTotalPlannedSemifinalists() > 12 ? 3 : 2;
  }

  getSemiGroupNames() {
    return this.getEffectiveSemiGroupCount() === 3
      ? ['Semifinal A', 'Semifinal B', 'Semifinal C']
      : ['Semifinal A', 'Semifinal B'];
  }

  saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
  }

  loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error('Failed to load state from localStorage', e);
      return null;
    }
  }

  resetAll() {
    this.state = this.getInitialState();
    this.saveState();
  }

  // ==========================================
  // 1. CHECK-IN & DEMO ROSTER
  // ==========================================
  addCar(denId, cubName, carName) {
    const denObj = DENS.find(d => d.id === denId);
    if (!denObj) throw new Error('Invalid Den');

    const denCars = this.state.cars.filter(c => c.den === denId);

    // Prevent duplicate ID collisions if an earlier car was removed
    const maxNum = denCars.reduce((max, c) => {
      const num = parseInt(c.id.replace(denObj.prefix, ''), 10) || 0;
      return Math.max(max, num);
    }, 0);
    const nextNum = maxNum + 1;
    const carId = `${denObj.prefix}${nextNum}`;

    const newCar = {
      id: carId,
      den: denId,
      cubName: cubName.trim(),
      carName: carName.trim() || `Car ${carId}`,
      checkedIn: true
    };

    this.state.cars.push(newCar);
    this.saveState();
    return newCar;
  }

  removeCar(carId) {
    this.state.cars = this.state.cars.filter(c => c.id !== carId);
    // Also remove any references from existing heats to avoid ghost entries
    this.state.heats.forEach(h => {
      h.lanes = h.lanes.filter(l => l.carId !== carId);
    });
    this.state.heats = this.state.heats.filter(h => h.lanes.length > 0);
    this.saveState();
  }

  loadDemoRoster() {
    const preservedQualifiers = { ...(this.state.denQualifiers || this.getDefaultDenQualifiers()) };
    const preservedSemiFormat = this.state.semiFormat || 'AUTO';
    const preservedFinalRuns = this.state.finalRuns || 3;
    const preservedRulesMode = this.state.rulesMode || 'AVERAGE';

    this.state = this.getInitialState();
    this.state.denQualifiers = preservedQualifiers;
    this.state.semiFormat = preservedSemiFormat;
    this.state.finalRuns = preservedFinalRuns;
    this.state.rulesMode = preservedRulesMode;

    const sampleCounts = { Lions: 4, Tigers: 6, Wolves: 8, Bears: 5, Webelos: 7, AOLs: 3 };
    const singularLabels = {
      Lions: 'Lion',
      Tigers: 'Tiger',
      Wolves: 'Wolf',
      Bears: 'Bear',
      Webelos: 'Webelos',
      AOLs: 'AOL'
    };
    const sampleNames = ['Thunder', 'Swiss Miss', "Jet d'Eau", 'Red Arrow', 'Matterhorn', 'Fondue Express', 'Vortex', 'Falcon', 'Cobra'];

    DENS.forEach(den => {
      const count = sampleCounts[den.id];
      const singular = singularLabels[den.id] || den.id;
      for (let i = 1; i <= count; i++) {
        this.addCar(
          den.id,
          `${singular} Cub ${i}`,
          `${sampleNames[(i - 1) % sampleNames.length]} ${i}`
        );
      }
    });
    this.saveState();
  }

  // ==========================================
  // 2. DETERMINISTIC 6-LANE HEAT GENERATOR
  // ==========================================
  generateGroupHeats(cars, stage, groupName, runsPerCar = 3) {
    const N = cars.length;
    if (N === 0) return [];

    // Case 1: 6 or fewer cars -> Shuffle initial lane order so check-in order doesn't bias lanes,
    // then assign lanes using STEPPED_LANE_ORDER ([1, 3, 5, 2, 4, 6]) so consecutive runs jump by 2 lanes
    // and up to 6 runs cover all 6 lanes without repeating.
    if (N <= 6) {
      const seededCars = shuffleArray(cars);
      const heats = [];
      for (let h = 0; h < runsPerCar; h++) {
        const lanes = [];
        for (let cIdx = 0; cIdx < N; cIdx++) {
          const laneNum = STEPPED_LANE_ORDER[(cIdx + h) % 6];
          lanes.push({ lane: laneNum, carId: seededCars[cIdx].id, finish: null });
        }
        lanes.sort((a, b) => a.lane - b.lane);
        heats.push({
          id: `${stage}_${groupName}_H${h + 1}_${Date.now().toString().slice(-4)}_${Math.floor(Math.random() * 100)}`,
          stage,
          group: groupName,
          heatNumber: h + 1,
          status: 'PENDING',
          lanes
        });
      }
      return heats;
    }

    // Case 2: More than 6 cars -> Distribute evenly across ceil((N * runsPerCar) / 6) heats
    const totalSlots = N * runsPerCar;
    const numHeats = Math.ceil(totalSlots / 6);

    const targetSizes = Array(numHeats).fill(Math.floor(totalSlots / numHeats));
    for (let i = 0; i < (totalSlots % numHeats); i++) {
      targetSizes[i]++;
    }

    // Fast randomized Latin-square greedy solver with retries using unbiased Fisher-Yates shuffle
    for (let attempt = 0; attempt < 400; attempt++) {
      const heatBuckets = Array.from({ length: numHeats }, () => []);
      const carUsedHeats = new Map(cars.map(c => [c.id, new Set()]));
      const carUsedLanes = new Map(cars.map(c => [c.id, new Set()]));
      let success = true;

      for (let run = 0; run < runsPerCar; run++) {
        const shuffledCars = shuffleArray(cars);
        for (const car of shuffledCars) {
          const candidateHeats = [];
          for (let h = 0; h < numHeats; h++) {
            if (
              heatBuckets[h].length < targetSizes[h] &&
              !carUsedHeats.get(car.id).has(h)
            ) {
              const takenLanesInHeat = new Set(heatBuckets[h].map(slot => slot.lane));
              const usedByCar = carUsedLanes.get(car.id);
              const availableLanes = [1, 2, 3, 4, 5, 6].filter(
                l => !takenLanesInHeat.has(l) && !usedByCar.has(l)
              );
              if (availableLanes.length > 0) {
                candidateHeats.push({ h, availableLanes });
              }
            }
          }

          if (candidateHeats.length === 0) {
            success = false;
            break;
          }

          candidateHeats.sort(
            (a, b) =>
              (targetSizes[b.h] - heatBuckets[b.h].length) -
              (targetSizes[a.h] - heatBuckets[a.h].length)
          );

          const chosen = candidateHeats[0];
          const chosenLane =
            chosen.availableLanes[Math.floor(Math.random() * chosen.availableLanes.length)];

          heatBuckets[chosen.h].push({ lane: chosenLane, carId: car.id, finish: null });
          carUsedHeats.get(car.id).add(chosen.h);
          carUsedLanes.get(car.id).add(chosenLane);
        }
        if (!success) break;
      }

      if (success) {
        return heatBuckets.map((lanes, idx) => ({
          id: `${stage}_${groupName}_H${idx + 1}`,
          stage,
          group: groupName,
          heatNumber: idx + 1,
          status: 'PENDING',
          lanes: lanes.sort((a, b) => a.lane - b.lane)
        }));
      }
    }

    // Fallback cyclic assignment if strict lane constraint needs relaxation
    const fallbackBuckets = Array.from({ length: numHeats }, () => []);
    const fallbackCarLanes = new Map(cars.map(c => [c.id, new Set()]));
    let heatCursor = 0;
    for (let r = 0; r < runsPerCar; r++) {
      for (const car of cars) {
        while (
          fallbackBuckets[heatCursor].length >= 6 ||
          fallbackBuckets[heatCursor].some(s => s.carId === car.id)
        ) {
          heatCursor = (heatCursor + 1) % numHeats;
        }
        const usedLanesInHeat = new Set(fallbackBuckets[heatCursor].map(s => s.lane));
        const usedByCar = fallbackCarLanes.get(car.id);
        const lane =
          STEPPED_LANE_ORDER.find(l => !usedLanesInHeat.has(l) && !usedByCar.has(l)) ||
          STEPPED_LANE_ORDER.find(l => !usedLanesInHeat.has(l)) ||
          1;
        fallbackBuckets[heatCursor].push({ lane, carId: car.id, finish: null });
        usedByCar.add(lane);
        heatCursor = (heatCursor + 1) % numHeats;
      }
    }

    return fallbackBuckets.map((lanes, idx) => ({
      id: `${stage}_${groupName}_H${idx + 1}`,
      stage,
      group: groupName,
      heatNumber: idx + 1,
      status: 'PENDING',
      lanes: lanes.sort((a, b) => a.lane - b.lane)
    }));
  }

  // ==========================================
  // 3. STAGE TRANSITIONS, UNDO & SCORING
  // ==========================================
  startQualifying() {
    this.state.heats = [];
    DENS.forEach(den => {
      const denCars = this.state.cars.filter(c => c.den === den.id && c.checkedIn);
      // Allow >= 1 so a solo Scout in a Den still gets their 3 track runs and advances cleanly
      if (denCars.length >= 1) {
        const denHeats = this.generateGroupHeats(denCars, 'QUALIFYING', den.id, 3);
        this.state.heats.push(...denHeats);
      }
    });
    this.state.stage = 'QUALIFYING';
    this.state.activeHeatId = this.state.heats[0]?.id || null;
    this.saveState();
  }

  /**
   * Returns the stage that precedes the current stage so the user can safely undo a stage transition.
   */
  getPreviousStage() {
    if (this.state.stage === 'FINALS') {
      const hasWildcard = this.state.heats.some(h => h.stage === 'WILDCARD');
      return hasWildcard ? 'WILDCARD' : 'SEMIFINALS';
    }
    if (this.state.stage === 'WILDCARD') {
      return 'SEMIFINALS';
    }
    if (this.state.stage === 'SEMIFINALS') {
      return 'QUALIFYING';
    }
    return null;
  }

  /**
   * Reverts from the current stage back to the previous stage, clearing only the current stage's heats
   * and preserving all completed heats and scores from the previous stage.
   */
  revertToPreviousStage() {
    const prevStage = this.getPreviousStage();
    if (!prevStage) return false;

    const currentStage = this.state.stage;
    this.state.heats = this.state.heats.filter(h => h.stage !== currentStage);
    this.state.stage = prevStage;

    const prevStageHeats = this.state.heats.filter(h => h.stage === prevStage);
    const pendingInPrev = prevStageHeats.find(h => h.status === 'PENDING');
    this.state.activeHeatId = pendingInPrev
      ? pendingInPrev.id
      : (prevStageHeats[prevStageHeats.length - 1]?.id || null);

    this.saveState();
    return true;
  }

  recordHeatResult(heatId, laneFinishesMap) {
    const heat = this.state.heats.find(h => h.id === heatId);
    if (!heat) return;

    heat.lanes.forEach(slot => {
      slot.finish = laneFinishesMap[slot.lane] || null;
    });
    heat.status = 'COMPLETED';

    const nextPending = this.state.heats.find(h => h.stage === this.state.stage && h.status === 'PENDING') ||
                        this.state.heats.find(h => h.status === 'PENDING');
    this.state.activeHeatId = nextPending ? nextPending.id : heat.id;
    this.saveState();
  }

  rerunHeat(heatId) {
    const heat = this.state.heats.find(h => h.id === heatId);
    if (!heat) return;
    heat.lanes.forEach(slot => { slot.finish = null; });
    heat.status = 'PENDING';
    this.state.activeHeatId = heat.id;
    this.saveState();
  }

  getGroupStandings(stage, groupName) {
    const relevantHeats = this.state.heats.filter(
      h => h.stage === stage && h.group === groupName && h.status === 'COMPLETED'
    );

    const allStageHeats = this.state.heats.filter(
      h => h.stage === stage && h.group === groupName
    );
    const carIds = new Set();
    allStageHeats.forEach(h => h.lanes.forEach(l => carIds.add(l.carId)));

    const stats = Array.from(carIds).map(carId => {
      const car = this.state.cars.find(c => c.id === carId);
      let racesCompleted = 0;
      let finishSum = 0;
      let pointsSum = 0;
      let tieBreakerRank = null;

      relevantHeats.forEach(h => {
        const slot = h.lanes.find(l => l.carId === carId);
        if (slot && slot.finish !== null) {
          if (h.isTieBreaker) {
            tieBreakerRank = slot.finish;
          } else {
            racesCompleted++;
            finishSum += slot.finish;
            pointsSum += Math.max(1, 7 - slot.finish);
          }
        }
      });

      const exactAvg = racesCompleted > 0 ? finishSum / racesCompleted : 999;

      return {
        carId,
        carName: car?.carName || carId,
        cubName: car?.cubName || '',
        den: car?.den || '',
        racesCompleted,
        finishSum,
        pointsSum,
        exactAvg,
        avgFinish: Number(exactAvg.toFixed(2)),
        tieBreakerRank
      };
    });

    // Sort by rulesMode using exact precision before tie-breakers
    stats.sort((a, b) => {
      if (a.racesCompleted === 0 && b.racesCompleted === 0) return 0;
      if (a.racesCompleted === 0) return 1;
      if (b.racesCompleted === 0) return -1;

      if (this.state.rulesMode === 'AVERAGE') {
        // Exact cross-multiplication prevents floating-point rounding false ties
        const diff = (a.finishSum * b.racesCompleted) - (b.finishSum * a.racesCompleted);
        if (diff !== 0) return diff;
      } else {
        if (b.pointsSum !== a.pointsSum) return b.pointsSum - a.pointsSum;
      }

      if (a.tieBreakerRank !== null && b.tieBreakerRank !== null) {
        return a.tieBreakerRank - b.tieBreakerRank;
      }
      return 0;
    });

    return stats;
  }

  /**
   * Helper: Returns true if the race is in Finals (or has Finals heats) and Wildcard was skipped in 2-group mode.
   */
  didSkipWildcardInTwoGroupMode() {
    if (this.getEffectiveSemiGroupCount() !== 2) return false;
    const hasFinals = this.state.heats.some(h => h.stage === 'FINALS');
    const hasWildcard = this.state.heats.some(h => h.stage === 'WILDCARD');
    return hasFinals && !hasWildcard;
  }

  /**
   * Helper: Returns the primary advancement cutoff for any stage & group,
   * respecting custom per-Den qualifier settings, 2-vs-3 Semifinal format, and skipped Wildcard.
   */
  getGroupCutoff(stage, groupName) {
    if (stage === 'QUALIFYING') {
      return this.getDenQualifierCount(groupName);
    }
    if (stage === 'FINALS') {
      return 1;
    }
    if (stage === 'SEMIFINALS') {
      // If running 3 Semifinal groups (A, B, C), Top 2 from each of the 3 groups advance to 6-car Grand Final
      if (this.getEffectiveSemiGroupCount() === 3) {
        return 2;
      }
      // In 2-group mode, if POINTS mode OR if Wildcard was skipped to go straight to Finals, Top 3 advance
      if (this.state.rulesMode === 'POINTS' || this.didSkipWildcardInTwoGroupMode()) {
        return 3;
      }
      return 2;
    }
    return 2;
  }

  /**
   * Helper: Returns an array of tied car IDs at the advancement cutoff(s) for a given stage & group,
   * using exact cross-multiplication (AVERAGE) or exact points (POINTS).
   */
  getCutoffTieCars(stage, groupName) {
    const rows = this.getGroupStandings(stage, groupName);
    const primaryCutoff = this.getGroupCutoff(stage, groupName);

    // In 2-Group SEMIFINALS under AVERAGE mode (before skipping Wildcard), Top 2 advance to Finals AND 3rd-5th (cutoff 5) advance to Wildcard.
    const isTwoGroupAvgSemi =
      stage === 'SEMIFINALS' &&
      this.state.rulesMode === 'AVERAGE' &&
      this.getEffectiveSemiGroupCount() === 2 &&
      !this.didSkipWildcardInTwoGroupMode();

    const cutoffsToCheck = isTwoGroupAvgSemi ? [2, 5] : [primaryCutoff];

    const isSameMetric = (r1, r2) => {
      if (this.state.rulesMode === 'AVERAGE') {
        return (r1.finishSum * r2.racesCompleted) === (r2.finishSum * r1.racesCompleted);
      }
      return r1.pointsSum === r2.pointsSum;
    };

    for (const cutoff of cutoffsToCheck) {
      if (rows.length > cutoff && rows[cutoff - 1].racesCompleted > 0 && rows[cutoff].racesCompleted > 0) {
        const boundaryRow = rows[cutoff - 1];
        const nextRow = rows[cutoff];
        if (
          isSameMetric(boundaryRow, nextRow) &&
          (boundaryRow.tieBreakerRank === null || nextRow.tieBreakerRank === null)
        ) {
          return rows
            .filter(r => r.racesCompleted > 0 && isSameMetric(r, boundaryRow) && r.tieBreakerRank === null)
            .map(r => r.carId);
        }
      }
    }

    return [];
  }

  /**
   * Helper: Checks all groups in a stage for unresolved cutoff ties.
   */
  getStageUnresolvedTies(stage) {
    let groups = [];
    if (stage === 'QUALIFYING') groups = DENS.map(d => d.id);
    else if (stage === 'SEMIFINALS') groups = this.getSemiGroupNames();
    else if (stage === 'WILDCARD') groups = ['Wildcard Race'];
    else if (stage === 'FINALS') groups = ['Grand Final'];

    const ties = [];
    groups.forEach(groupName => {
      const carIds = this.getCutoffTieCars(stage, groupName);
      if (carIds.length >= 2) {
        ties.push({ stage, groupName, carIds });
      }
    });
    return ties;
  }

  spawnTieBreakerHeat(stage, groupName, carIds) {
    const lanes = carIds.slice(0, 6).map((carId, idx) => ({
      lane: STEPPED_LANE_ORDER[idx % 6],
      carId,
      finish: null
    })).sort((a, b) => a.lane - b.lane);

    const tbHeat = {
      id: `${stage}_${groupName}_TB_${Date.now().toString().slice(-4)}_${Math.floor(Math.random() * 100)}`,
      stage,
      group: groupName,
      heatNumber: 'TIE-BREAKER',
      isTieBreaker: true,
      status: 'PENDING',
      lanes
    };

    this.state.heats.push(tbHeat);
    this.state.activeHeatId = tbHeat.id;
    this.saveState();
    return tbHeat;
  }

  startSemifinals() {
    // Idempotency guard: clear any existing Semifinal, Wildcard, or Final heats if re-triggered
    this.state.heats = this.state.heats.filter(
      h => h.stage === 'QUALIFYING'
    );

    // Collect qualifiers by rank tier across all 6 Dens so 1st-place Den winners
    // and 2nd-place Den runners-up are distributed first, followed by 3rd/4th-place qualifiers.
    const maxQuals = Math.max(...DENS.map(d => this.getDenQualifierCount(d.id)));
    const allQualifiersOrdered = [];

    for (let rankIdx = 0; rankIdx < maxQuals; rankIdx++) {
      // Alternate Den direction on odd/even rank tiers (snake order)
      const denOrder = rankIdx % 2 === 0 ? DENS : [...DENS].reverse();
      denOrder.forEach(den => {
        const limit = this.getDenQualifierCount(den.id);
        if (rankIdx < limit) {
          const standings = this.getGroupStandings('QUALIFYING', den.id).filter(r => r.racesCompleted > 0);
          const qRow = standings[rankIdx];
          if (qRow) {
            const carObj = this.state.cars.find(c => c.id === qRow.carId);
            if (carObj) {
              allQualifiersOrdered.push({ car: carObj, denId: den.id, rank: rankIdx + 1 });
            }
          }
        }
      });
    }

    // Decide 2 or 3 Semifinal groups based on semiFormat & actual qualifier count
    let numGroups = 2;
    if (this.state.semiFormat === '3_GROUPS') {
      numGroups = 3;
    } else if (this.state.semiFormat === '2_GROUPS') {
      numGroups = 2;
    } else {
      numGroups = allQualifiersOrdered.length > 12 ? 3 : 2;
    }

    const groupNames = numGroups === 3
      ? ['Semifinal A', 'Semifinal B', 'Semifinal C']
      : ['Semifinal A', 'Semifinal B'];
    const buckets = Array.from({ length: numGroups }, () => []);
    const targetMaxPerGroup = Math.ceil(allQualifiersOrdered.length / numGroups);

    // Assign each qualifier, prioritizing Den separation as long as a group hasn't hit targetMaxPerGroup
    allQualifiersOrdered.forEach((item, idx) => {
      const candidates = buckets
        .map((b, gIdx) => ({
          gIdx,
          size: b.length,
          sameDenCount: b.filter(c => c.den === item.denId).length
        }))
        .filter(c => c.size < targetMaxPerGroup);

      candidates.sort((a, b) => {
        if (a.sameDenCount !== b.sameDenCount) return a.sameDenCount - b.sameDenCount;
        if (a.size !== b.size) return a.size - b.size;
        return ((a.gIdx + idx) % numGroups) - ((b.gIdx + idx) % numGroups);
      });

      const chosenIdx = candidates.length > 0 ? candidates[0].gIdx : (idx % numGroups);
      buckets[chosenIdx].push(item.car);
    });

    // Always run 3 heats in Semifinals for consistent 3-lane track coverage across both modes
    const semiRuns = 3;
    const generatedHeats = [];

    groupNames.forEach((gName, gIdx) => {
      if (buckets[gIdx].length > 0) {
        const gHeats = this.generateGroupHeats(buckets[gIdx], 'SEMIFINALS', gName, semiRuns);
        generatedHeats.push(...gHeats);
      }
    });

    this.state.heats.push(...generatedHeats);
    this.state.stage = 'SEMIFINALS';
    this.state.activeHeatId = generatedHeats[0]?.id || null;
    this.saveState();
  }

  startWildcardRace() {
    // Idempotency guard: clear any prior Wildcard or Final heats if re-triggered
    this.state.heats = this.state.heats.filter(
      h => h.stage === 'QUALIFYING' || h.stage === 'SEMIFINALS'
    );

    const semiA = this.getGroupStandings('SEMIFINALS', 'Semifinal A');
    const semiB = this.getGroupStandings('SEMIFINALS', 'Semifinal B');

    const wildcardPoolIds = [
      semiA[2]?.carId, semiA[3]?.carId, semiA[4]?.carId,
      semiB[2]?.carId, semiB[3]?.carId, semiB[4]?.carId
    ].filter(Boolean).slice(0, 6);

    const wildcardCars = wildcardPoolIds.map(id => this.state.cars.find(c => c.id === id)).filter(Boolean);
    const wcHeats = this.generateGroupHeats(wildcardCars, 'WILDCARD', 'Wildcard Race', 1);

    this.state.heats.push(...wcHeats);
    this.state.stage = 'WILDCARD';
    this.state.activeHeatId = wcHeats[0]?.id || null;
    this.saveState();
  }

  startGrandFinal() {
    // Idempotency guard: remove any existing FINALS heats if re-triggered
    this.state.heats = this.state.heats.filter(
      h => h.stage !== 'FINALS'
    );

    const numSemiGroups = this.getEffectiveSemiGroupCount();
    const semiA = this.getGroupStandings('SEMIFINALS', 'Semifinal A');
    const semiB = this.getGroupStandings('SEMIFINALS', 'Semifinal B');
    const semiC = this.getGroupStandings('SEMIFINALS', 'Semifinal C');
    let finalistIds = [];

    const wcStandings = this.getGroupStandings('WILDCARD', 'Wildcard Race');

    if (numSemiGroups === 3) {
      // 3 Semifinal groups: Top 2 from A, B, and C = 6 finalists
      finalistIds = [
        semiA[0]?.carId, semiA[1]?.carId,
        semiB[0]?.carId, semiB[1]?.carId,
        semiC[0]?.carId, semiC[1]?.carId
      ].filter(Boolean);
    } else if (wcStandings.length > 0) {
      // 2 Semifinal groups + Wildcard: Top 2 from A & B + Top 2 from Wildcard = 6 finalists
      finalistIds = [
        semiA[0]?.carId, semiA[1]?.carId,
        semiB[0]?.carId, semiB[1]?.carId,
        wcStandings[0]?.carId, wcStandings[1]?.carId
      ].filter(Boolean);
    } else {
      // 2 Semifinal groups without Wildcard: Top 3 from A & B = 6 finalists
      finalistIds = [
        semiA[0]?.carId, semiA[1]?.carId, semiA[2]?.carId,
        semiB[0]?.carId, semiB[1]?.carId, semiB[2]?.carId
      ].filter(Boolean);
    }

    const finalCars = finalistIds.map(id => this.state.cars.find(c => c.id === id)).filter(Boolean);
    const finalRuns = typeof this.state.finalRuns === 'number' && this.state.finalRuns >= 1
      ? this.state.finalRuns
      : 3;
    const finalHeats = this.generateGroupHeats(finalCars, 'FINALS', 'Grand Final', finalRuns);

    this.state.heats.push(...finalHeats);
    this.state.stage = 'FINALS';
    this.state.activeHeatId = finalHeats[0]?.id || null;
    this.saveState();
  }
}

// Expose globally for index.html
window.DENS = DENS;
window.DerbyEngine = DerbyEngine;
