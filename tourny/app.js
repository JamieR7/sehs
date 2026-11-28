const state = {
  title: "PE TOURNAMENT",
  numTeams: 8, // Supports 4 to 12 teams
  format: "groups", // 'groups' | 'roundrobin'
  includeSemiFinals: false, // Cross-over 1st vs 2nd semis when format === 'groups'
  timingMode: "finish", // 'finish' | 'manual'
  startTimeMode: "now", // 'now' | 'custom'
  customStartTime: "10:00",
  desiredFinishTime: "11:00",
  manualMinutes: 4,
  manualSeconds: 0,
  intermissionSeconds: 10,
  numCourts: 2, // Supports 1 to 4 courts
  teamNames: [
    "Team 1", "Team 2", "Team 3", "Team 4",
    "Team 5", "Team 6", "Team 7", "Team 8",
    "Team 9", "Team 10", "Team 11", "Team 12"
  ],
  courtNames: ["Court 1", "Court 2", "Court 3", "Court 4"],

  inProgress: false,
  rounds: [],
  currentRoundIndex: 0,
  gameDurationSec: 240,
  timeLeftSec: 240,
  roundFullDurationSec: 240,
  targetFinishTimestampMs: null,
  timerRunning: false,
  inIntermission: false,
  intermissionLeftSec: 10,
  inWarmUp: false,
  warmUpTargetMs: null,
  warmUpLeftSec: 0,
  warmUpOneMinWarned: false,
  autoAdvance: true,
  timerInterval: null,
  darkMode: true,
  pushUpClickCount: 0
};

const FUN_PE_NAMES = [
  "Versoix Vipers", "Léman Panthers", "Geneva Giants", "Alpine Eagles",
  "Divonne Dynamos", "Jura Jaguars", "Mont Blanc Bears", "Rhône Raiders",
  "Lausanne Lions", "Nyon Ninjas", "Valais Vikings", "Bern Broncos"
];

const PUSH_UP_MESSAGES = [
  {
    emoji: "💪😂",
    text: "Did somebody tell you to push that? Do your 10 push ups and never trust them again without thinking twice!"
  },
  {
    emoji: "📸💪",
    text: "Ah, busted! Did you use your critical thinking or just do what you were told? 10 push ups time!"
  },
  {
    emoji: "🫡🔥",
    text: "You pressed it AGAIN?! You are collecting push ups now, I admire your commitment!"
  },
  {
    emoji: "📣🏋️",
    text: "The horn definitely works. Your arms are about to work too. Off you go, 10 push ups!"
  },
  {
    emoji: "🐱💪",
    text: "Curiosity didn't kill the cat, it just gave it a really strong upper body. 10 push ups!"
  },
  {
    emoji: "👀⚡",
    text: "Still testing? At this point you're just volunteering for extra fitness. Another 10!"
  }
];

let audioCtx = null;
let pendingCoachAction = null;

function ensureAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
}

function playCountdownPip(freq = 880, duration = 0.12) {
  try {
    ensureAudioContext();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

function playArenaBuzzer() {
  try {
    ensureAudioContext();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    const freqs = [145, 217.5, 290, 435];
    freqs.forEach((f) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(f, now);
      osc.frequency.linearRampToValueAtTime(f * 0.96, now + 1.45);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.16, now + 0.05);
      gain.gain.setValueAtTime(0.16, now + 1.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 1.55);
    });
  } catch (e) {}
}

function playStartWhistle() {
  try {
    ensureAudioContext();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(2600, now);
    osc.frequency.setValueAtTime(2850, now + 0.08);
    osc.frequency.setValueAtTime(2600, now + 0.16);
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  } catch (e) {}
}

// Cheeky Coach Check Modal
function requestCoachConfirmation(actionDescription, onConfirm) {
  pendingCoachAction = onConfirm;
  const sub = document.getElementById("coachModalSub");
  if (sub) {
    sub.textContent = actionDescription || "Hands off the tournament controls unless you’ve got a whistle!";
  }
  document.getElementById("coachModal").classList.remove("hidden");
}

function closeCoachModal() {
  pendingCoachAction = null;
  document.getElementById("coachModal").classList.add("hidden");
}

function showPushUpModal() {
  const item = PUSH_UP_MESSAGES[state.pushUpClickCount % PUSH_UP_MESSAGES.length];
  state.pushUpClickCount += 1;
  document.getElementById("pushUpModalEmoji").textContent = item.emoji;
  document.getElementById("pushUpModalText").textContent = item.text;
  document.getElementById("pushUpModal").classList.remove("hidden");
}

function closePushUpModal() {
  document.getElementById("pushUpModal").classList.add("hidden");
}

function getSanitizedActiveTeams() {
  const seen = new Map();
  return state.teamNames.slice(0, state.numTeams).map((raw, idx) => {
    let base = (raw || "").trim() || `Team ${idx + 1}`;
    if (!seen.has(base)) {
      seen.set(base, 1);
      return base;
    } else {
      const count = seen.get(base) + 1;
      seen.set(base, count);
      const uniqueName = `${base} (${count})`;
      seen.set(uniqueName, 1);
      return uniqueName;
    }
  });
}

function generateRoundRobinSubRounds(teams) {
  const list = [...teams];
  if (list.length % 2 !== 0) list.push(null);
  const n = list.length;
  const numRounds = n - 1;
  const half = n / 2;
  const subRounds = [];

  for (let r = 0; r < numRounds; r++) {
    const roundPairings = [];
    for (let i = 0; i < half; i++) {
      const t1 = list[i];
      const t2 = list[n - 1 - i];
      if (t1 !== null && t2 !== null) roundPairings.push({ teamA: t1, teamB: t2 });
    }
    subRounds.push(roundPairings);
    const last = list.pop();
    list.splice(1, 0, last);
  }
  return subRounds;
}

function packMatchesIntoRounds(matchPool, numCourts) {
  const remaining = [...matchPool];
  const rounds = [];

  while (remaining.length > 0) {
    const roundMatches = [];
    const usedTeams = new Set();

    for (let i = 0; i < remaining.length; i++) {
      if (roundMatches.length >= numCourts) break;
      const m = remaining[i];
      if (!usedTeams.has(m.teamA) && !usedTeams.has(m.teamB)) {
        roundMatches.push(m);
        usedTeams.add(m.teamA);
        usedTeams.add(m.teamB);
        remaining.splice(i, 1);
        i--;
      }
    }
    if (roundMatches.length === 0 && remaining.length > 0) {
      roundMatches.push(remaining.shift());
    }
    rounds.push(roundMatches);
  }
  return rounds;
}

function buildTournamentSchedule() {
  const activeTeams = getSanitizedActiveTeams();
  const numCourts = state.numCourts;
  let allRounds = [];
  let matchIdCounter = 1;

  if (state.format === "roundrobin") {
    const subRounds = generateRoundRobinSubRounds(activeTeams);
    const rawPairings = subRounds.flat().map((p) => ({
      id: matchIdCounter++,
      stage: "LEAGUE",
      groupLabel: "League",
      teamA: p.teamA,
      teamB: p.teamB,
      scoreA: 0,
      scoreB: 0,
      completed: false,
      edited: false,
      goldenPointWinner: null
    }));
    allRounds = packMatchesIntoRounds(rawPairings, numCourts);
  } else {
    const half = Math.ceil(activeTeams.length / 2);
    const groupA = activeTeams.slice(0, half);
    const groupB = activeTeams.slice(half);

    const subRoundsA = generateRoundRobinSubRounds(groupA).map((rnd) =>
      rnd.map((p) => ({
        id: matchIdCounter++,
        stage: "GROUP STAGE",
        groupLabel: "Group A",
        teamA: p.teamA,
        teamB: p.teamB,
        scoreA: 0,
        scoreB: 0,
        completed: false,
        edited: false,
        goldenPointWinner: null
      }))
    );

    const subRoundsB = generateRoundRobinSubRounds(groupB).map((rnd) =>
      rnd.map((p) => ({
        id: matchIdCounter++,
        stage: "GROUP STAGE",
        groupLabel: "Group B",
        teamA: p.teamA,
        teamB: p.teamB,
        scoreA: 0,
        scoreB: 0,
        completed: false,
        edited: false,
        goldenPointWinner: null
      }))
    );

    const orderedPool = [];
    const maxSubRounds = Math.max(subRoundsA.length, subRoundsB.length);
    for (let r = 0; r < maxSubRounds; r++) {
      const rA = subRoundsA[r] || [];
      const rB = subRoundsB[r] || [];
      if (rA.length >= rB.length) {
        orderedPool.push(...rA, ...rB);
      } else {
        orderedPool.push(...rB, ...rA);
      }
    }

    const groupRounds = packMatchesIntoRounds(orderedPool, numCourts);

    const maxCommonRank = Math.min(groupA.length, groupB.length);
    const placementLabels = {
      6: "11th Place Playoff",
      5: "9th Place Playoff",
      4: "7th Place Playoff",
      3: "5th Place Playoff",
      2: "Bronze Final (3rd/4th)",
      1: "🏆 GRAND FINAL (1st/2nd)"
    };
    const ordinal = (n) => (n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : `${n}th`);

    if (state.includeSemiFinals && maxCommonRank >= 2) {
      const semiMatches = [
        {
          id: matchIdCounter++,
          stage: "SEMI-FINALS",
          groupLabel: "Semi-Final 1",
          semiId: "SF1",
          placeholderA: { group: "A", rank: 1, defaultLabel: "1st Group A" },
          placeholderB: { group: "B", rank: 2, defaultLabel: "2nd Group B" },
          teamA: "1st Group A",
          teamB: "2nd Group B",
          scoreA: 0,
          scoreB: 0,
          completed: false,
          edited: false,
          isSemi: true,
          isKnockout: true,
          goldenPointWinner: null
        },
        {
          id: matchIdCounter++,
          stage: "SEMI-FINALS",
          groupLabel: "Semi-Final 2",
          semiId: "SF2",
          placeholderA: { group: "B", rank: 1, defaultLabel: "1st Group B" },
          placeholderB: { group: "A", rank: 2, defaultLabel: "2nd Group A" },
          teamA: "1st Group B",
          teamB: "2nd Group A",
          scoreA: 0,
          scoreB: 0,
          completed: false,
          edited: false,
          isSemi: true,
          isKnockout: true,
          goldenPointWinner: null
        }
      ];

      const semiRounds = [];
      for (let i = 0; i < semiMatches.length; i += numCourts) {
        semiRounds.push(semiMatches.slice(i, i + numCourts));
      }

      const finalsMatches = [];
      for (let r = maxCommonRank; r >= 3; r--) {
        const defaultA = `${ordinal(r)} Group A`;
        const defaultB = `${ordinal(r)} Group B`;
        finalsMatches.push({
          id: matchIdCounter++,
          stage: "FINALS",
          groupLabel: placementLabels[r] || `Rank ${r} Playoff`,
          placementRank: r,
          placeholderA: { group: "A", rank: r, defaultLabel: defaultA },
          placeholderB: { group: "B", rank: r, defaultLabel: defaultB },
          teamA: defaultA,
          teamB: defaultB,
          scoreA: 0,
          scoreB: 0,
          completed: false,
          edited: false,
          isFinal: true,
          isKnockout: true,
          goldenPointWinner: null
        });
      }

      finalsMatches.push({
        id: matchIdCounter++,
        stage: "FINALS",
        groupLabel: "Bronze Final (3rd/4th)",
        placementRank: 2,
        fromSemis: "losers",
        teamA: "Loser SF1",
        teamB: "Loser SF2",
        scoreA: 0,
        scoreB: 0,
        completed: false,
        edited: false,
        isFinal: true,
        isKnockout: true,
        goldenPointWinner: null
      });

      finalsMatches.push({
        id: matchIdCounter++,
        stage: "FINALS",
        groupLabel: "🏆 GRAND FINAL (1st/2nd)",
        placementRank: 1,
        fromSemis: "winners",
        teamA: "Winner SF1",
        teamB: "Winner SF2",
        scoreA: 0,
        scoreB: 0,
        completed: false,
        edited: false,
        isFinal: true,
        isKnockout: true,
        goldenPointWinner: null
      });

      const finalsRounds = [];
      for (let i = 0; i < finalsMatches.length; i += numCourts) {
        finalsRounds.push(finalsMatches.slice(i, i + numCourts));
      }

      allRounds = [...groupRounds, ...semiRounds, ...finalsRounds];
    } else {
      const finalsMatches = [];
      for (let r = maxCommonRank; r >= 1; r--) {
        const defaultA = `${ordinal(r)} Group A`;
        const defaultB = `${ordinal(r)} Group B`;
        finalsMatches.push({
          id: matchIdCounter++,
          stage: "FINALS",
          groupLabel: placementLabels[r] || `Rank ${r} Playoff`,
          placementRank: r,
          placeholderA: { group: "A", rank: r, defaultLabel: defaultA },
          placeholderB: { group: "B", rank: r, defaultLabel: defaultB },
          teamA: defaultA,
          teamB: defaultB,
          scoreA: 0,
          scoreB: 0,
          completed: false,
          edited: false,
          isFinal: true,
          isKnockout: true,
          goldenPointWinner: null
        });
      }

      const finalsRounds = [];
      for (let i = 0; i < finalsMatches.length; i += numCourts) {
        finalsRounds.push(finalsMatches.slice(i, i + numCourts));
      }
      allRounds = [...groupRounds, ...finalsRounds];
    }
  }

  allRounds.forEach((rnd, rIdx) => {
    rnd.forEach((m, cIdx) => {
      m.roundNumber = rIdx + 1;
      m.courtIndex = cIdx;
    });
  });

  return allRounds;
}

function getMatchWinnerAndLoser(m) {
  if (!m) return { winner: null, loser: null };
  if (m.scoreA > m.scoreB) return { winner: m.teamA, loser: m.teamB };
  if (m.scoreB > m.scoreA) return { winner: m.teamB, loser: m.teamA };
  if (m.goldenPointWinner === "A") return { winner: m.teamA, loser: m.teamB };
  if (m.goldenPointWinner === "B") return { winner: m.teamB, loser: m.teamA };
  return { winner: null, loser: null };
}

function computeGroupStandings(teamList, groupFilterLabel = null, includeKnockouts = false) {
  const stats = {};
  teamList.forEach((t) => {
    stats[t] = { team: t, P: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, Pts: 0 };
  });

  state.rounds.forEach((rnd, rIdx) => {
    rnd.forEach((m) => {
      if (!includeKnockouts && (m.isFinal || m.isSemi)) return;
      if (groupFilterLabel && m.groupLabel !== groupFilterLabel) return;
      const isPlayed =
        m.completed ||
        m.edited ||
        (!state.inWarmUp && rIdx < state.currentRoundIndex) ||
        m.scoreA > 0 ||
        m.scoreB > 0 ||
        m.goldenPointWinner !== null;
      if (!isPlayed) return;

      const stA = stats[m.teamA];
      const stB = stats[m.teamB];
      if (!stA || !stB) return;

      stA.P += 1;
      stB.P += 1;
      stA.GF += m.scoreA;
      stA.GA += m.scoreB;
      stB.GF += m.scoreB;
      stB.GA += m.scoreA;
      stA.GD = stA.GF - stA.GA;
      stB.GD = stB.GF - stB.GA;

      if (m.scoreA > m.scoreB || (m.scoreA === m.scoreB && m.goldenPointWinner === "A")) {
        stA.W += 1;
        stA.Pts += 3;
        stB.L += 1;
      } else if (m.scoreB > m.scoreA || (m.scoreA === m.scoreB && m.goldenPointWinner === "B")) {
        stB.W += 1;
        stB.Pts += 3;
        stA.L += 1;
      } else {
        stA.D += 1;
        stB.D += 1;
        stA.Pts += 1;
        stB.Pts += 1;
      }
    });
  });

  return Object.values(stats).sort((a, b) => {
    if (b.Pts !== a.Pts) return b.Pts - a.Pts;
    if (b.GD !== a.GD) return b.GD - a.GD;
    if (b.GF !== a.GF) return b.GF - a.GF;
    return a.team.localeCompare(b.team);
  });
}

function updateFinalsSeedingIfReady() {
  if (state.format !== "groups") return;
  const activeTeams = getSanitizedActiveTeams();
  const half = Math.ceil(activeTeams.length / 2);
  const groupATeams = activeTeams.slice(0, half);
  const groupBTeams = activeTeams.slice(half);

  const standingsA = computeGroupStandings(groupATeams, "Group A");
  const standingsB = computeGroupStandings(groupBTeams, "Group B");

  const anyGroupAPlayed = standingsA.some((s) => s.P > 0);
  const anyGroupBPlayed = standingsB.some((s) => s.P > 0);

  let sf1Match = null;
  let sf2Match = null;

  state.rounds.forEach((rnd) => {
    rnd.forEach((m) => {
      if ((m.isFinal || m.isSemi) && m.placeholderA && m.placeholderB) {
        const stListA = m.placeholderA.group === "A" ? standingsA : standingsB;
        const stListB = m.placeholderB.group === "A" ? standingsA : standingsB;
        const playedA = m.placeholderA.group === "A" ? anyGroupAPlayed : anyGroupBPlayed;
        const playedB = m.placeholderB.group === "A" ? anyGroupAPlayed : anyGroupBPlayed;

        const rankA = m.placeholderA.rank - 1;
        const rankB = m.placeholderB.rank - 1;

        m.teamA =
          playedA && stListA[rankA]
            ? stListA[rankA].team
            : m.placeholderA.defaultLabel;
        m.teamB =
          playedB && stListB[rankB]
            ? stListB[rankB].team
            : m.placeholderB.defaultLabel;
      }
      if (m.semiId === "SF1") sf1Match = m;
      if (m.semiId === "SF2") sf2Match = m;
    });
  });

  if (sf1Match || sf2Match) {
    const sf1Res = getMatchWinnerAndLoser(sf1Match);
    const sf2Res = getMatchWinnerAndLoser(sf2Match);

    state.rounds.forEach((rnd) => {
      rnd.forEach((m) => {
        if (m.fromSemis === "winners") {
          m.teamA = sf1Res.winner || "Winner SF1";
          m.teamB = sf2Res.winner || "Winner SF2";
        } else if (m.fromSemis === "losers") {
          m.teamA = sf1Res.loser || "Loser SF1";
          m.teamB = sf2Res.loser || "Loser SF2";
        }
      });
    });
  }
}

function getCustomStartTimestampMs() {
  if (state.startTimeMode !== "custom" || !state.customStartTime) return null;
  const [sh, sm] = state.customStartTime.split(":").map(Number);
  if (isNaN(sh) || isNaN(sm)) return null;
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), sh, sm, 0, 0).getTime();
}

function computeTargetFinishTimestampMs() {
  const now = new Date();
  let startSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  if (state.startTimeMode === "custom" && state.customStartTime) {
    const [sh, sm] = state.customStartTime.split(":").map(Number);
    if (!isNaN(sh) && !isNaN(sm)) startSec = (sh * 60 + sm) * 60;
  }

  let finishSec = startSec + 45 * 60;
  if (state.desiredFinishTime) {
    const [fh, fm] = state.desiredFinishTime.split(":").map(Number);
    if (!isNaN(fh) && !isNaN(fm)) finishSec = (fh * 60 + fm) * 60;
  }

  let diffSec = finishSec - startSec;
  if (diffSec <= 0) diffSec += 24 * 3600;

  if (state.startTimeMode === "custom" && state.customStartTime) {
    const customMs = getCustomStartTimestampMs();
    if (customMs !== null) return customMs + diffSec * 1000;
  }
  return now.getTime() + diffSec * 1000;
}

function calculateGameDurationSeconds(numRounds) {
  if (numRounds <= 0) return 240;

  if (state.timingMode === "manual") {
    const parsedMin = parseInt(state.manualMinutes, 10);
    const parsedSec = parseInt(state.manualSeconds, 10);
    const mins = isNaN(parsedMin) ? 4 : Math.max(0, parsedMin);
    const secs = isNaN(parsedSec) ? 0 : Math.max(0, parsedSec);
    return Math.max(15, mins * 60 + secs);
  }

  const now = new Date();
  let startTotalSeconds =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  if (state.startTimeMode === "custom" && state.customStartTime) {
    const [sh, sm] = state.customStartTime.split(":").map(Number);
    if (!isNaN(sh) && !isNaN(sm)) startTotalSeconds = (sh * 60 + sm) * 60;
  }

  let finishTotalSeconds = startTotalSeconds + 45 * 60;
  if (state.desiredFinishTime) {
    const [fh, fm] = state.desiredFinishTime.split(":").map(Number);
    if (!isNaN(fh) && !isNaN(fm)) finishTotalSeconds = (fh * 60 + fm) * 60;
  }

  let diffSeconds = finishTotalSeconds - startTotalSeconds;
  if (diffSeconds <= 0) diffSeconds += 24 * 3600;

  const totalIntermission = Math.max(0, numRounds - 1) * state.intermissionSeconds;
  const availablePlaySeconds = Math.max(numRounds * 25, diffSeconds - totalIntermission);
  return Math.floor(availablePlaySeconds / numRounds);
}

function recalculateFutureGameDuration(includeCurrentRound = true) {
  if (state.timingMode !== "finish" || !state.targetFinishTimestampMs) return;

  const totalRounds = state.rounds.length;
  const futureRoundsCount = Math.max(0, totalRounds - state.currentRoundIndex - 1);
  const roundsToFit = includeCurrentRound ? futureRoundsCount + 1 : futureRoundsCount;

  if (roundsToFit <= 0) return;

  const baseMs = state.inWarmUp && state.warmUpTargetMs ? state.warmUpTargetMs : Date.now();
  let remainingWindowSec = Math.floor((state.targetFinishTimestampMs - baseMs) / 1000);

  if (!includeCurrentRound) {
    const currentRem = state.inIntermission
      ? state.intermissionLeftSec
      : state.timeLeftSec + (futureRoundsCount > 0 ? state.intermissionSeconds : 0);
    remainingWindowSec -= currentRem;
  }

  const intermissionsToFit = Math.max(0, roundsToFit - 1) * state.intermissionSeconds;
  const availablePlaySec = Math.max(
    roundsToFit * 25,
    remainingWindowSec - intermissionsToFit
  );

  state.gameDurationSec = Math.floor(availablePlaySec / roundsToFit);
}

function formatMMSS(totalSec) {
  const s = Math.max(0, Math.floor(totalSec));
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function getExpectedFinishTimeString() {
  if (state.inWarmUp && state.targetFinishTimestampMs) {
    const d = new Date(state.targetFinishTimestampMs);
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")} (${formatMMSS(state.gameDurationSec)}/game)`;
  }

  const remainingFutureRounds = Math.max(0, state.rounds.length - state.currentRoundIndex - 1);

  let projectedFutureGameSec = state.gameDurationSec;
  if (state.timingMode === "finish" && state.targetFinishTimestampMs && remainingFutureRounds > 0) {
    const currentRem = state.inIntermission
      ? state.intermissionLeftSec
      : state.timeLeftSec + state.intermissionSeconds;
    const remWindowAfterCurrent =
      Math.floor((state.targetFinishTimestampMs - Date.now()) / 1000) - currentRem;
    const futureIntermissions = Math.max(0, remainingFutureRounds - 1) * state.intermissionSeconds;
    const availPlay = Math.max(
      remainingFutureRounds * 25,
      remWindowAfterCurrent - futureIntermissions
    );
    projectedFutureGameSec = Math.floor(availPlay / remainingFutureRounds);
  }

  const currentRoundRemainingSec = state.inIntermission
    ? state.intermissionLeftSec
    : state.timeLeftSec + (remainingFutureRounds > 0 ? state.intermissionSeconds : 0);

  const futureRoundsSec =
    remainingFutureRounds * projectedFutureGameSec +
    Math.max(0, remainingFutureRounds - 1) * state.intermissionSeconds;

  const totalRemainingSec = currentRoundRemainingSec + futureRoundsSec;
  const finishDate = new Date(Date.now() + totalRemainingSec * 1000);
  const finishStr = `${String(finishDate.getHours()).padStart(2, "0")}:${String(finishDate.getMinutes()).padStart(2, "0")}`;

  if (state.timingMode === "finish" && remainingFutureRounds > 0) {
    return `${finishStr} (Next Games: ${formatMMSS(projectedFutureGameSec)})`;
  }
  return finishStr;
}

function initSetupDefaults() {
  const future = new Date(Date.now() + 50 * 60 * 1000);
  state.desiredFinishTime = `${String(future.getHours()).padStart(2, "0")}:${String(future.getMinutes()).padStart(2, "0")}`;
  const finishInput = document.getElementById("desiredFinishTimeInput");
  if (finishInput) finishInput.value = state.desiredFinishTime;

  const warmUpDefault = new Date(Date.now() + 5 * 60 * 1000);
  state.customStartTime = `${String(warmUpDefault.getHours()).padStart(2, "0")}:${String(warmUpDefault.getMinutes()).padStart(2, "0")}`;
  const customInput = document.getElementById("customStartTimeInput");
  if (customInput) customInput.value = state.customStartTime;
}

function renderSetupView() {
  document.getElementById("selectedTeamsBadge").textContent = `${state.numTeams} Teams`;

  document.querySelectorAll(".team-count-btn").forEach((btn) => {
    const count = parseInt(btn.getAttribute("data-teams"), 10);
    btn.className =
      count === state.numTeams
        ? "team-count-btn rounded-xl border-2 border-gold-500 bg-gold-500/20 text-white py-2.5 font-black text-sm transition shadow-md"
        : "team-count-btn rounded-xl border-2 border-slate-700 bg-navy-950/60 text-slate-300 hover:border-slate-500 py-2.5 font-black text-sm transition";
  });

  const countA = Math.ceil(state.numTeams / 2);
  const countB = state.numTeams - countA;
  const groupDesc = document.getElementById("groupFormatDesc");
  if (groupDesc) {
    const finalsTxt = state.includeSemiFinals ? "Semi-Finals + Finals" : "Placement Finals";
    groupDesc.textContent =
      countA === countB
        ? `2 Groups of ${countA} + ${finalsTxt}`
        : `Group A (${countA}) & Group B (${countB}) + ${finalsTxt}`;
  }

  document.getElementById("semiFinalsOptionBox").classList.toggle("hidden", state.format !== "groups");
  document.getElementById("includeSemiFinalsCheckbox").checked = state.includeSemiFinals;

  document.querySelectorAll(".format-btn").forEach((btn) => {
    const fmt = btn.getAttribute("data-format");
    const radio = btn.querySelector(".format-radio");
    const dot = btn.querySelector(".format-dot");
    if (fmt === state.format) {
      btn.className = "format-btn w-full text-left rounded-2xl border-2 border-gold-500 bg-gold-500/15 p-4 transition flex items-start gap-3.5 shadow-md";
      radio.className = "mt-0.5 w-5 h-5 rounded-full border-2 border-gold-500 flex items-center justify-center shrink-0 format-radio";
      dot.classList.remove("hidden");
    } else {
      btn.className = "format-btn w-full text-left rounded-2xl border-2 border-slate-700 bg-navy-950/50 hover:border-slate-500 p-4 transition flex items-start gap-3.5";
      radio.className = "mt-0.5 w-5 h-5 rounded-full border-2 border-slate-500 flex items-center justify-center shrink-0 format-radio";
      dot.classList.add("hidden");
    }
  });

  document.querySelectorAll(".timing-mode-btn").forEach((btn) => {
    const mode = btn.getAttribute("data-timing");
    btn.className =
      mode === state.timingMode
        ? "timing-mode-btn rounded-xl border-2 border-gold-500 bg-gold-500/20 text-white py-2.5 px-3 text-xs font-black uppercase tracking-wider transition"
        : "timing-mode-btn rounded-xl border-2 border-slate-700 bg-navy-950/60 text-slate-400 hover:border-slate-500 py-2.5 px-3 text-xs font-black uppercase tracking-wider transition";
  });

  document.getElementById("finishTimePanel").classList.toggle("hidden", state.timingMode !== "finish");
  document.getElementById("manualDurationPanel").classList.toggle("hidden", state.timingMode !== "manual");

  document.querySelectorAll(".court-count-btn").forEach((btn) => {
    const c = parseInt(btn.getAttribute("data-courts"), 10);
    btn.className =
      c === state.numCourts
        ? "court-count-btn rounded-xl border-2 border-gold-500 bg-gold-500/20 text-white py-3 font-black text-sm transition shadow-md"
        : "court-count-btn rounded-xl border-2 border-slate-700 bg-navy-950/60 text-slate-300 hover:border-slate-500 py-3 font-black text-sm transition";
  });

  const teamContainer = document.getElementById("teamNamesContainer");
  teamContainer.innerHTML = "";
  for (let i = 0; i < state.numTeams; i++) {
    const row = document.createElement("div");
    row.className = "flex items-center gap-2";
    const isGroupA = i < countA;
    const groupTag =
      state.format === "groups"
        ? `<span class="text-[10px] font-black uppercase px-2 py-0.5 rounded shrink-0 ${
            isGroupA
              ? "bg-navy-800 text-gold-400 border border-gold-500/30"
              : "bg-slate-800 text-slate-300 border border-slate-700"
          }">${isGroupA ? "Grp A" : "Grp B"}</span>`
        : "";
    row.innerHTML = `
      <span class="w-5 text-xs font-black text-slate-400">${i + 1}.</span>
      <input type="text" data-team-idx="${i}" value="${state.teamNames[i] || `Team ${i + 1}`}"
        class="team-name-input flex-1 min-w-0 rounded-xl border border-slate-700 bg-navy-950 px-3 py-2 text-sm font-bold text-white focus:border-gold-500 focus:outline-none transition" />
      ${groupTag}
    `;
    teamContainer.appendChild(row);
  }

  document.querySelectorAll(".team-name-input").forEach((inp) => {
    inp.addEventListener("input", (e) => {
      const idx = parseInt(e.target.getAttribute("data-team-idx"), 10);
      state.teamNames[idx] = e.target.value;
    });
  });

  const courtContainer = document.getElementById("courtNamesContainer");
  courtContainer.innerHTML = "";
  for (let i = 0; i < state.numCourts; i++) {
    const div = document.createElement("div");
    div.className = "flex items-center gap-2.5";
    div.innerHTML = `
      <span class="text-xs font-black text-slate-400">${i + 1}.</span>
      <input type="text" data-court-idx="${i}" value="${state.courtNames[i] || `Court ${i + 1}`}"
        class="court-name-input flex-1 rounded-xl border border-slate-700 bg-navy-950 px-3.5 py-2.5 text-sm font-bold text-white focus:border-gold-500 focus:outline-none transition" />
    `;
    courtContainer.appendChild(div);
  }

  document.querySelectorAll(".court-name-input").forEach((inp) => {
    inp.addEventListener("input", (e) => {
      const idx = parseInt(e.target.getAttribute("data-court-idx"), 10);
      state.courtNames[idx] = e.target.value;
    });
  });

  const previewRounds = buildTournamentSchedule();
  const previewSec = calculateGameDurationSeconds(previewRounds.length);
  document.getElementById("calcRoundsBadge").textContent = `${previewRounds.length} Rounds • ${formatMMSS(previewSec)} / game`;
  const autoText = document.getElementById("autoCalcGameTimeText");
  if (autoText) {
    autoText.textContent = `Auto-calculated: ${formatMMSS(previewSec)} per game across ${previewRounds.length} rounds.`;
  }
}

function renderArenaView() {
  updateFinalsSeedingIfReady();

  const totalRounds = state.rounds.length;
  const currentRound = state.rounds[state.currentRoundIndex] || [];
  const nextRound = state.rounds[state.currentRoundIndex + 1] || [];
  const stageLabel = currentRound[0] ? currentRound[0].stage : "TOURNAMENT";

  const isPreCourtWarmUp = state.inWarmUp && state.warmUpLeftSec > 60;
  const isFinalMinuteWarmUp = state.inWarmUp && state.warmUpLeftSec <= 60;

  document.getElementById("headerTitle").textContent = state.title || "PE TOURNAMENT";

  const livePhaseBadge = document.getElementById("livePhaseBadge");
  if (isFinalMinuteWarmUp) {
    livePhaseBadge.textContent = "1 MINUTE TO GO";
  } else if (state.inWarmUp) {
    livePhaseBadge.textContent = "WARM-UP";
  } else {
    livePhaseBadge.textContent = `ROUND ${state.currentRoundIndex + 1} / ${totalRounds} (${stageLabel})`;
  }

  document.getElementById("roundBottomLabel").textContent = state.inWarmUp
    ? "WARM-UP"
    : `ROUND ${state.currentRoundIndex + 1} / ${totalRounds} (${stageLabel})`;
  document.getElementById("expectedFinishLabel").textContent = `Expected Finish: ${getExpectedFinishTimeString()}`;

  const autoAdvLabel = document.getElementById("autoAdvanceLabelText");
  if (autoAdvLabel) {
    autoAdvLabel.textContent = `Auto-Advance on Timer End (${state.intermissionSeconds}s Score View)`;
  }

  const mainTimerDisplay = document.getElementById("mainTimerDisplay");
  const displaySec = state.inWarmUp ? state.warmUpLeftSec : state.timeLeftSec;
  mainTimerDisplay.textContent = formatMMSS(displaySec);
  mainTimerDisplay.className = state.inWarmUp
    ? "timer-digits text-8xl sm:text-9xl font-extrabold text-white my-1 select-none"
    : "timer-digits text-7xl sm:text-8xl font-extrabold text-white my-1 select-none";

  const playPauseBtn = document.getElementById("playPauseBtn");
  const skipWarmUpBtn = document.getElementById("skipWarmUpBtn");
  const resetTimerBtn = document.getElementById("resetTimerBtn");
  const warmUpLeadLabel = document.getElementById("warmUpLeadLabel");
  const warmUpBanner = document.getElementById("warmUpBanner");
  const intermissionBanner = document.getElementById("intermissionBanner");
  const autoAdvanceWrapper = document.getElementById("autoAdvanceWrapper");
  const warmUpAdviceGrid = document.getElementById("warmUpAdviceGrid");
  const courtsGrid = document.getElementById("courtsGrid");
  const fixturesAndStandingsGrid = document.getElementById("fixturesAndStandingsGrid");
  const timerCard = document.getElementById("timerCard");

  timerCard.classList.remove("intermission-glow", "warmup-alert-glow", "border-gold-500", "border-crimson-500");

  if (state.inWarmUp) {
    playPauseBtn.classList.add("hidden");
    resetTimerBtn.classList.add("hidden");
    autoAdvanceWrapper.classList.add("hidden");
    skipWarmUpBtn.classList.remove("hidden");
    warmUpLeadLabel.classList.remove("hidden");
    intermissionBanner.classList.add("hidden");

    // Hide fixtures & standings during warm-up so matchups aren't spoiled early
    fixturesAndStandingsGrid.classList.add("hidden");

    if (isFinalMinuteWarmUp) {
      warmUpBanner.classList.remove("hidden");
      warmUpAdviceGrid.classList.add("hidden");
      courtsGrid.classList.remove("hidden");
      timerCard.classList.add("warmup-alert-glow", "border-crimson-500");
    } else {
      warmUpBanner.classList.add("hidden");
      warmUpAdviceGrid.classList.remove("hidden");
      courtsGrid.classList.add("hidden");
      timerCard.classList.add("border-gold-500");
    }
  } else {
    playPauseBtn.classList.remove("hidden");
    resetTimerBtn.classList.remove("hidden");
    autoAdvanceWrapper.classList.remove("hidden");
    skipWarmUpBtn.classList.add("hidden");
    warmUpLeadLabel.classList.add("hidden");
    warmUpBanner.classList.add("hidden");
    warmUpAdviceGrid.classList.add("hidden");
    courtsGrid.classList.remove("hidden");
    fixturesAndStandingsGrid.classList.remove("hidden");

    document.getElementById("playPauseIcon").textContent = state.timerRunning ? "⏸" : "▶";
    document.getElementById("playPauseText").textContent = state.timerRunning ? "PAUSE" : "START";

    if (state.inIntermission) {
      intermissionBanner.classList.remove("hidden");
      document.getElementById("intermissionCountdown").textContent = state.intermissionLeftSec;
      timerCard.classList.add("intermission-glow", "border-gold-500");
    } else {
      intermissionBanner.classList.add("hidden");
    }
  }

  document.getElementById("prevRoundBtn").disabled = state.inWarmUp || state.currentRoundIndex <= 0;
  const nextBtnText = document.getElementById("nextRoundBtnText");
  nextBtnText.textContent = state.inWarmUp
    ? "SKIP WARM-UP & START ROUND 1"
    : state.currentRoundIndex >= totalRounds - 1
    ? "🏆 FINISH & VIEW RESULTS"
    : state.inIntermission
    ? "SKIP WAIT & START NEXT ROUND"
    : "NEXT ROUND";

  // Only render courts when visible (final minute of warm-up or live rounds)
  courtsGrid.innerHTML = "";
  courtsGrid.className =
    (isPreCourtWarmUp ? "hidden " : "") +
    (state.numCourts === 1
      ? "grid grid-cols-1 max-w-2xl mx-auto gap-6"
      : "grid grid-cols-1 lg:grid-cols-2 gap-6");

  if (!isPreCourtWarmUp) {
    for (let cIdx = 0; cIdx < state.numCourts; cIdx++) {
      const courtName = state.courtNames[cIdx] || `Court ${cIdx + 1}`;
      const match = currentRound[cIdx];
      const upNextMatch = nextRound[cIdx];

      const card = document.createElement("div");
      card.className = `rounded-3xl border-2 ${
        state.inIntermission ? "border-gold-500 bg-navy-900" : "border-slate-700/90 bg-navy-900/90"
      } p-6 shadow-2xl flex flex-col justify-between transition-all`;

      if (!match) {
        card.innerHTML = `
          <div>
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
              <h3 class="text-xl font-black uppercase tracking-wider text-slate-400">${courtName}</h3>
              <span class="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-slate-800 text-slate-400">Idle</span>
            </div>
            <p class="text-center text-slate-500 font-bold py-8">No Match Needed on ${courtName} This Round</p>
          </div>
        `;
      } else {
        const upNextHTML =
          !state.inWarmUp && upNextMatch
            ? `<div class="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                 <div>
                   <div class="text-[10px] font-black uppercase tracking-widest text-slate-400">UP NEXT</div>
                   <div class="text-sm font-extrabold italic text-slate-200 mt-0.5">${upNextMatch.teamA} <span class="text-xs font-normal not-italic text-slate-400 px-1">vs</span> ${upNextMatch.teamB}</div>
                 </div>
                 <span class="text-[11px] font-bold text-slate-400">${upNextMatch.groupLabel}</span>
               </div>`
            : state.inWarmUp
            ? `<div class="mt-6 pt-4 border-t border-slate-800 text-xs font-black text-gold-400 uppercase tracking-widest">Round 1 • Head to ${courtName}</div>`
            : `<div class="mt-6 pt-4 border-t border-slate-800 text-xs font-bold text-slate-500 uppercase tracking-wider">Final Scheduled Match on ${courtName}</div>`;

        let goldenPointHTML = "";
        if (match.isKnockout && match.scoreA === match.scoreB && !state.inWarmUp) {
          const aSelected = match.goldenPointWinner === "A";
          const bSelected = match.goldenPointWinner === "B";
          goldenPointHTML = `
            <div class="mt-5 p-3.5 rounded-2xl bg-navy-950/90 border-2 border-gold-500/60 space-y-2.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black uppercase tracking-widest text-gold-400">⚡ Scores Level — Golden Point Winner</span>
                ${match.goldenPointWinner ? `<span class="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-gold-500/20 text-gold-400">Decided</span>` : ""}
              </div>
              <div class="grid grid-cols-2 gap-2.5">
                <button type="button" data-gp-match="${match.id}" data-gp-side="A"
                  class="gp-btn rounded-xl border-2 px-3 py-2 text-xs font-black uppercase tracking-wider truncate transition ${
                    aSelected
                      ? "border-gold-500 bg-gold-500 text-navy-950 shadow-md"
                      : "border-slate-700 bg-navy-900 text-slate-200 hover:border-gold-500"
                  }">
                  ${aSelected ? "⚡ " : ""}${match.teamA}
                </button>
                <button type="button" data-gp-match="${match.id}" data-gp-side="B"
                  class="gp-btn rounded-xl border-2 px-3 py-2 text-xs font-black uppercase tracking-wider truncate transition ${
                    bSelected
                      ? "border-gold-500 bg-gold-500 text-navy-950 shadow-md"
                      : "border-slate-700 bg-navy-900 text-slate-200 hover:border-gold-500"
                  }">
                  ${bSelected ? "⚡ " : ""}${match.teamB}
                </button>
              </div>
            </div>
          `;
        }

        const gpBadgeA = match.goldenPointWinner === "A" ? `<span class="ml-2 text-xs font-black px-2 py-0.5 rounded bg-gold-500 text-navy-950">⚡ GP</span>` : "";
        const gpBadgeB = match.goldenPointWinner === "B" ? `<span class="ml-2 text-xs font-black px-2 py-0.5 rounded bg-gold-500 text-navy-950">⚡ GP</span>` : "";

        card.innerHTML = `
          <div>
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
              <h3 class="text-2xl font-black uppercase tracking-wider text-white">${courtName}</h3>
              <span class="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-navy-800 text-gold-400 border border-gold-500/30">${match.groupLabel}</span>
            </div>

            <div class="space-y-5">
              <div class="flex items-center justify-between gap-3">
                <span class="text-xl sm:text-2xl font-black text-white truncate flex items-center">${match.teamA}${gpBadgeA}</span>
                <div class="flex items-center gap-3 shrink-0">
                  <button type="button" data-match-id="${match.id}" data-team="A" data-delta="-1"
                    class="score-btn w-11 h-11 rounded-xl border-2 border-slate-600 hover:border-gold-500 bg-navy-950 text-xl font-black text-slate-200 flex items-center justify-center transition active:scale-95">−</button>
                  <span class="timer-digits text-4xl sm:text-5xl font-black text-gold-400 w-12 text-center">${match.scoreA}</span>
                  <button type="button" data-match-id="${match.id}" data-team="A" data-delta="1"
                    class="score-btn w-11 h-11 rounded-xl border-2 border-slate-600 hover:border-gold-500 bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-xl font-black text-white flex items-center justify-center transition active:scale-95">+</button>
                </div>
              </div>

              <div class="flex items-center justify-between gap-3">
                <span class="text-xl sm:text-2xl font-black text-white truncate flex items-center">${match.teamB}${gpBadgeB}</span>
                <div class="flex items-center gap-3 shrink-0">
                  <button type="button" data-match-id="${match.id}" data-team="B" data-delta="-1"
                    class="score-btn w-11 h-11 rounded-xl border-2 border-slate-600 hover:border-gold-500 bg-navy-950 text-xl font-black text-slate-200 flex items-center justify-center transition active:scale-95">−</button>
                  <span class="timer-digits text-4xl sm:text-5xl font-black text-gold-400 w-12 text-center">${match.scoreB}</span>
                  <button type="button" data-match-id="${match.id}" data-team="B" data-delta="1"
                    class="score-btn w-11 h-11 rounded-xl border-2 border-slate-600 hover:border-gold-500 bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-xl font-black text-white flex items-center justify-center transition active:scale-95">+</button>
                </div>
              </div>
            </div>

            ${goldenPointHTML}
          </div>
          ${upNextHTML}
        `;
      }
      courtsGrid.appendChild(card);
    }
  }

  if (!state.inWarmUp) {
    renderFixturesList();
    renderStandingsTables();
  }

  document.querySelectorAll(".score-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mId = parseInt(btn.getAttribute("data-match-id"), 10);
      const side = btn.getAttribute("data-team");
      const delta = parseInt(btn.getAttribute("data-delta"), 10);
      adjustMatchScore(mId, side, delta);
    });
  });

  document.querySelectorAll(".gp-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mId = parseInt(btn.getAttribute("data-gp-match"), 10);
      const side = btn.getAttribute("data-gp-side");
      setGoldenPointWinner(mId, side);
    });
  });
}

function adjustMatchScore(matchId, side, delta) {
  state.rounds.forEach((rnd) => {
    rnd.forEach((m) => {
      if (m.id === matchId) {
        if (side === "A") m.scoreA = Math.max(0, m.scoreA + delta);
        else m.scoreB = Math.max(0, m.scoreB + delta);
        if (m.scoreA !== m.scoreB) m.goldenPointWinner = null;
        m.edited = m.scoreA > 0 || m.scoreB > 0;
      }
    });
  });
  renderArenaView();
}

function setGoldenPointWinner(matchId, side) {
  state.rounds.forEach((rnd) => {
    rnd.forEach((m) => {
      if (m.id === matchId) {
        m.goldenPointWinner = m.goldenPointWinner === side ? null : side;
        m.edited = true;
      }
    });
  });
  playCountdownPip(1046, 0.14);
  renderArenaView();
}

function renderFixturesList() {
  const container = document.getElementById("fixturesListContainer");
  container.innerHTML = "";

  let lastStage = "";
  state.rounds.forEach((rnd, rIdx) => {
    const isCurrentRound = !state.inWarmUp && rIdx === state.currentRoundIndex;

    rnd.forEach((m) => {
      if (m.stage !== lastStage) {
        lastStage = m.stage;
        const divider = document.createElement("div");
        divider.className = "text-[11px] font-black uppercase tracking-widest text-center text-gold-400 bg-navy-950/90 py-1.5 my-2 rounded-lg border border-slate-800";
        divider.textContent = m.stage;
        container.appendChild(divider);
      }

      const gpA = m.goldenPointWinner === "A" ? " ⚡" : "";
      const gpB = m.goldenPointWinner === "B" ? "⚡ " : "";

      const row = document.createElement("div");
      row.className = `flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border text-xs transition ${
        isCurrentRound
          ? "bg-navy-800/40 border-gold-500/60 text-white font-bold"
          : "bg-navy-950/40 border-slate-800/80 text-slate-300"
      }`;

      row.innerHTML = `
        <div class="flex items-center gap-2 min-w-[85px]">
          <span class="font-black text-slate-400">R${m.roundNumber}</span>
          <span class="text-[11px] text-slate-400 truncate">${m.groupLabel}</span>
        </div>
        <div class="flex-1 flex items-center justify-end gap-2 truncate">
          <span class="truncate font-bold">${m.teamA}${gpA}</span>
          <div class="flex flex-col leading-none">
            <button type="button" data-match-id="${m.id}" data-team="A" data-delta="1" class="score-btn text-[10px] hover:text-gold-400">▲</button>
            <button type="button" data-match-id="${m.id}" data-team="A" data-delta="-1" class="score-btn text-[10px] hover:text-gold-400">▼</button>
          </div>
        </div>
        <div class="flex items-center gap-1.5 px-2">
          <span class="px-2 py-1 rounded-lg bg-navy-950 border border-slate-700 font-black text-gold-400">${m.scoreA}</span>
          <span class="text-slate-500">-</span>
          <span class="px-2 py-1 rounded-lg bg-navy-950 border border-slate-700 font-black text-gold-400">${m.scoreB}</span>
        </div>
        <div class="flex-1 flex items-center justify-start gap-2 truncate">
          <div class="flex flex-col leading-none">
            <button type="button" data-match-id="${m.id}" data-team="B" data-delta="1" class="score-btn text-[10px] hover:text-gold-400">▲</button>
            <button type="button" data-match-id="${m.id}" data-team="B" data-delta="-1" class="score-btn text-[10px] hover:text-gold-400">▼</button>
          </div>
          <span class="truncate font-bold">${gpB}${m.teamB}</span>
        </div>
      `;
      container.appendChild(row);
    });
  });
}

function createStandingsTableHTML(title, rows) {
  const trs = rows
    .map(
      (r, idx) => `
    <tr class="border-b border-slate-800/80 ${idx === 0 ? "bg-gold-500/10" : ""}">
      <td class="py-2.5 px-2 font-black text-slate-400">${idx + 1}</td>
      <td class="py-2.5 px-2 font-extrabold text-white">${r.team}</td>
      <td class="py-2.5 px-2 text-center text-slate-300">${r.P}</td>
      <td class="py-2.5 px-2 text-center text-slate-300">${r.W}</td>
      <td class="py-2.5 px-2 text-center text-slate-300">${r.D}</td>
      <td class="py-2.5 px-2 text-center text-slate-300">${r.L}</td>
      <td class="py-2.5 px-2 text-center text-slate-300">${r.GD > 0 ? `+${r.GD}` : r.GD}</td>
      <td class="py-2.5 px-2 text-center font-black text-gold-400 text-sm">${r.Pts}</td>
    </tr>
  `
    )
    .join("");

  return `
    <div class="rounded-3xl border-2 border-slate-800 bg-navy-900/90 p-5 sm:p-6 shadow-xl">
      <div class="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-800">
        <h3 class="text-sm font-black uppercase tracking-widest text-white">${title}</h3>
        <span>🏆</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-xs text-left">
          <thead>
            <tr class="border-b border-slate-700 text-slate-400 uppercase font-black">
              <th class="py-2 px-2">Pos</th>
              <th class="py-2 px-2">Team</th>
              <th class="py-2 px-2 text-center">P</th>
              <th class="py-2 px-2 text-center">W</th>
              <th class="py-2 px-2 text-center">D</th>
              <th class="py-2 px-2 text-center">L</th>
              <th class="py-2 px-2 text-center">GD</th>
              <th class="py-2 px-2 text-center">Pts</th>
            </tr>
          </thead>
          <tbody>${trs}</tbody>
        </table>
      </div>
    </div>
  `;
}

function renderStandingsTables() {
  const container = document.getElementById("standingsContainer");
  const activeTeams = getSanitizedActiveTeams();

  if (state.format === "roundrobin") {
    const standings = computeGroupStandings(activeTeams, null);
    container.innerHTML = createStandingsTableHTML("LEAGUE STANDINGS", standings);
  } else {
    const half = Math.ceil(activeTeams.length / 2);
    const groupA = activeTeams.slice(0, half);
    const groupB = activeTeams.slice(half);
    const stA = computeGroupStandings(groupA, "Group A");
    const stB = computeGroupStandings(groupB, "Group B");
    container.innerHTML =
      createStandingsTableHTML("GROUP A STANDINGS", stA) +
      createStandingsTableHTML("GROUP B STANDINGS", stB);
  }
}

function computeFinalRankings() {
  const activeTeams = getSanitizedActiveTeams();
  const overallStats = computeGroupStandings(activeTeams, null, true);
  const statsByTeam = {};
  overallStats.forEach((s) => (statsByTeam[s.team] = s));

  if (state.format === "roundrobin") {
    return overallStats;
  }

  const placedTeams = [];
  const addTeam = (name) => {
    if (name && statsByTeam[name] && !placedTeams.includes(name)) {
      placedTeams.push(name);
    }
  };

  const finalMatches = [];
  state.rounds.forEach((rnd) => {
    rnd.forEach((m) => {
      if (m.isFinal) finalMatches.push(m);
    });
  });

  finalMatches.sort((a, b) => (a.placementRank || 99) - (b.placementRank || 99));

  finalMatches.forEach((m) => {
    const { winner, loser } = getMatchWinnerAndLoser(m);
    if (winner && loser) {
      addTeam(winner);
      addTeam(loser);
    } else {
      const sA = statsByTeam[m.teamA];
      const sB = statsByTeam[m.teamB];
      if (sA && sB) {
        const order = [sA, sB].sort((a, b) => b.Pts - a.Pts || b.GD - a.GD || b.GF - a.GF);
        addTeam(order[0].team);
        addTeam(order[1].team);
      } else {
        addTeam(m.teamA);
        addTeam(m.teamB);
      }
    }
  });

  overallStats.forEach((s) => addTeam(s.team));

  return placedTeams.map((t) => statsByTeam[t]);
}

function renderResultsView() {
  updateFinalsSeedingIfReady();
  const rankings = computeFinalRankings();

  document.getElementById("resultsTournamentTitle").textContent = state.title || "PE TOURNAMENT";

  const first = rankings[0];
  const second = rankings[1];
  const third = rankings[2];

  const podiumCard = (entry, medal, label, borderCls, heightCls, orderCls) => {
    if (!entry) return "";
    return `
      <div class="${orderCls} rounded-3xl border-2 ${borderCls} bg-navy-950/90 p-5 flex flex-col justify-between shadow-xl ${heightCls}">
        <div class="text-4xl mb-2">${medal}</div>
        <div>
          <div class="text-xs font-black uppercase tracking-widest text-slate-400">${label}</div>
          <div class="text-xl sm:text-2xl font-black text-white mt-1 break-words">${entry.team}</div>
        </div>
        <div class="mt-3 pt-2.5 border-t border-slate-800 text-xs font-bold text-slate-300">
          ${entry.W}W • ${entry.D}D • ${entry.L}L &nbsp;|&nbsp; GF: ${entry.GF}
        </div>
      </div>
    `;
  };

  document.getElementById("podiumContainer").innerHTML =
    podiumCard(second, "🥈", "2nd Place", "border-slate-400/70", "md:min-h-[205px]", "order-2 md:order-1") +
    podiumCard(first, "🥇", "Champions", "border-gold-500 ring-2 ring-gold-500/30", "md:min-h-[240px]", "order-1 md:order-2") +
    podiumCard(third, "🥉", "3rd Place", "border-amber-700/80", "md:min-h-[185px]", "order-3 md:order-3");

  let totalGoals = 0;
  let matchesPlayed = 0;
  state.rounds.forEach((rnd) => {
    rnd.forEach((m) => {
      if (m.completed || m.edited || m.scoreA > 0 || m.scoreB > 0 || m.goldenPointWinner) {
        matchesPlayed += 1;
        totalGoals += m.scoreA + m.scoreB;
      }
    });
  });

  const topScorer = [...rankings].sort((a, b) => b.GF - a.GF)[0];
  const playedTeams = rankings.filter((r) => r.P > 0);
  const tightestDef = playedTeams.length
    ? [...playedTeams].sort((a, b) => a.GA - b.GA || b.P - a.P)[0]
    : rankings[0];

  const statBox = (icon, label, value, sub) => `
    <div class="rounded-2xl border border-slate-800 bg-navy-950/80 p-4 text-center">
      <div class="text-2xl">${icon}</div>
      <div class="text-[11px] font-black uppercase tracking-widest text-slate-400 mt-1">${label}</div>
      <div class="text-lg font-black text-gold-400 mt-0.5 truncate">${value}</div>
      <div class="text-xs font-bold text-slate-300">${sub}</div>
    </div>
  `;

  document.getElementById("tournamentStatsContainer").innerHTML =
    statBox("🔥", "Top Attack", topScorer ? topScorer.team : "—", topScorer ? `${topScorer.GF} scored` : "") +
    statBox("🛡️", "Tightest Defence", tightestDef ? tightestDef.team : "—", tightestDef ? `${tightestDef.GA} conceded` : "") +
    statBox("🎯", "Total Points", totalGoals, "across all courts") +
    statBox("🏟️", "Matches Played", matchesPlayed, `${state.rounds.length} rounds`);

  document.getElementById("finalRankingsContainer").innerHTML = createStandingsTableHTML(
    "FINAL TOURNAMENT RANKINGS",
    rankings
  );
}

function finishWarmUpAndStartRound1() {
  state.inWarmUp = false;
  state.warmUpTargetMs = null;
  state.warmUpLeftSec = 0;
  state.currentRoundIndex = 0;
  state.inIntermission = false;

  if (state.timingMode === "finish") {
    recalculateFutureGameDuration(true);
  } else {
    state.gameDurationSec = calculateGameDurationSeconds(state.rounds.length);
  }

  state.timeLeftSec = state.gameDurationSec;
  state.roundFullDurationSec = state.gameDurationSec;
  state.timerRunning = true;

  playStartWhistle();
  renderArenaView();
}

function updateTimerDisplay() {
  const displaySec = state.inWarmUp ? state.warmUpLeftSec : state.timeLeftSec;
  const timerEl = document.getElementById("mainTimerDisplay");
  if (timerEl) timerEl.textContent = formatMMSS(displaySec);

  if (state.inIntermission) {
    const interEl = document.getElementById("intermissionCountdown");
    if (interEl) interEl.textContent = state.intermissionLeftSec;
  }

  const finishEl = document.getElementById("expectedFinishLabel");
  if (finishEl) finishEl.textContent = `Expected Finish: ${getExpectedFinishTimeString()}`;
}

function startTimerLoop() {
  if (state.timerInterval) clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    if (state.inWarmUp && state.warmUpTargetMs) {
      const secsLeft = Math.max(0, Math.ceil((state.warmUpTargetMs - Date.now()) / 1000));
      state.warmUpLeftSec = secsLeft;

      // 1-minute warning blast & court reveal!
      if (secsLeft <= 60 && secsLeft > 0 && !state.warmUpOneMinWarned) {
        state.warmUpOneMinWarned = true;
        playArenaBuzzer();
        renderArenaView();
        return;
      }

      if (secsLeft > 0 && secsLeft <= 3) {
        playCountdownPip(880, 0.1);
      }

      if (secsLeft <= 0) {
        finishWarmUpAndStartRound1();
      } else {
        updateTimerDisplay();
      }
      return;
    }

    if (!state.timerRunning) return;

    if (!state.inIntermission) {
      if (state.timeLeftSec > 0) {
        state.timeLeftSec -= 1;
        if (state.timeLeftSec > 0 && state.timeLeftSec <= 3) playCountdownPip(880, 0.1);
        updateTimerDisplay();
      }

      if (state.timeLeftSec === 0) {
        const currentRound = state.rounds[state.currentRoundIndex] || [];
        currentRound.forEach((m) => (m.completed = true));
        playArenaBuzzer();

        if (state.autoAdvance && state.currentRoundIndex < state.rounds.length - 1) {
          state.inIntermission = true;
          state.intermissionLeftSec = state.intermissionSeconds;
          renderArenaView();
        } else {
          state.timerRunning = false;
          renderArenaView();
        }
      }
    } else {
      if (state.intermissionLeftSec > 0) {
        state.intermissionLeftSec -= 1;
        updateTimerDisplay();
      }
      if (state.intermissionLeftSec <= 0) {
        advanceToRound(state.currentRoundIndex + 1, true);
      }
    }
  }, 1000);
}

function advanceToRound(targetIndex, autoStartClock = false) {
  if (targetIndex > state.currentRoundIndex && state.rounds[state.currentRoundIndex]) {
    state.rounds[state.currentRoundIndex].forEach((m) => (m.completed = true));
  }

  if (targetIndex < 0 || targetIndex >= state.rounds.length) {
    state.timerRunning = false;
    state.inIntermission = false;
    renderArenaView();
    return;
  }

  state.currentRoundIndex = targetIndex;
  state.inIntermission = false;

  recalculateFutureGameDuration(true);

  state.timeLeftSec = state.gameDurationSec;
  state.roundFullDurationSec = state.gameDurationSec;
  state.timerRunning = autoStartClock;

  if (autoStartClock) playStartWhistle();
  renderArenaView();
}

function openResultsPage() {
  if (state.rounds[state.currentRoundIndex]) {
    state.rounds[state.currentRoundIndex].forEach((m) => (m.completed = true));
  }
  state.timerRunning = false;
  state.inIntermission = false;
  state.inWarmUp = false;
  playArenaBuzzer();

  document.getElementById("arenaView").classList.add("hidden");
  document.getElementById("resultsView").classList.remove("hidden");
  renderResultsView();
}

// Browser warning if trying to close/refresh during a live tournament
window.addEventListener("beforeunload", (e) => {
  if (state.inProgress) {
    e.preventDefault();
    e.returnValue = "End tournament? Current scores and progress will be lost.";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  initSetupDefaults();
  renderSetupView();
  startTimerLoop();

  // Coach Modal Buttons
  document.getElementById("coachModalNoBtn").addEventListener("click", closeCoachModal);
  document.getElementById("coachModalYesBtn").addEventListener("click", () => {
    const fn = pendingCoachAction;
    closeCoachModal();
    if (typeof fn === "function") fn();
  });

  // Push-Up Modal Button
  document.getElementById("pushUpModalCloseBtn").addEventListener("click", closePushUpModal);

  document.getElementById("tournamentTitleInput").addEventListener("input", (e) => {
    state.title = e.target.value;
    document.getElementById("headerTitle").textContent = state.title || "PE TOURNAMENT";
  });

  document.querySelectorAll(".team-count-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.numTeams = parseInt(btn.getAttribute("data-teams"), 10);
      renderSetupView();
    });
  });

  document.querySelectorAll(".format-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.format = btn.getAttribute("data-format");
      renderSetupView();
    });
  });

  document.getElementById("includeSemiFinalsCheckbox").addEventListener("change", (e) => {
    state.includeSemiFinals = e.target.checked;
    renderSetupView();
  });

  document.querySelectorAll(".timing-mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.timingMode = btn.getAttribute("data-timing");
      renderSetupView();
    });
  });

  document.querySelectorAll('input[name="startTimeMode"]').forEach((radio) => {
    radio.addEventListener("change", (e) => {
      state.startTimeMode = e.target.value;
      document
        .getElementById("customStartTimeInput")
        .classList.toggle("hidden", state.startTimeMode !== "custom");
      renderSetupView();
    });
  });

  document.getElementById("customStartTimeInput").addEventListener("input", (e) => {
    state.customStartTime = e.target.value;
    renderSetupView();
  });

  document.getElementById("desiredFinishTimeInput").addEventListener("input", (e) => {
    state.desiredFinishTime = e.target.value;
    renderSetupView();
  });

  document.getElementById("manualMinutesInput").addEventListener("input", (e) => {
    const val = parseInt(e.target.value, 10);
    state.manualMinutes = isNaN(val) ? 0 : Math.max(0, val);
    renderSetupView();
  });

  document.getElementById("manualSecondsInput").addEventListener("input", (e) => {
    const val = parseInt(e.target.value, 10);
    state.manualSeconds = isNaN(val) ? 0 : Math.max(0, val);
    renderSetupView();
  });

  document.getElementById("intermissionSecInput").addEventListener("input", (e) => {
    const val = parseInt(e.target.value, 10);
    state.intermissionSeconds = isNaN(val) ? 10 : Math.max(3, val);
    renderSetupView();
  });

  document.querySelectorAll(".court-count-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.numCourts = parseInt(btn.getAttribute("data-courts"), 10);
      renderSetupView();
    });
  });

  document.getElementById("presetNamesBtn").addEventListener("click", () => {
    state.teamNames = [...FUN_PE_NAMES];
    renderSetupView();
  });

  document.getElementById("resetDefaultNamesBtn").addEventListener("click", () => {
    state.teamNames = Array.from({ length: 12 }, (_, i) => `Team ${i + 1}`);
    renderSetupView();
  });

  document.getElementById("startTournamentBtn").addEventListener("click", () => {
    ensureAudioContext();
    state.rounds = buildTournamentSchedule();
    state.targetFinishTimestampMs =
      state.timingMode === "finish" ? computeTargetFinishTimestampMs() : null;
    state.currentRoundIndex = 0;
    state.inIntermission = false;
    state.inProgress = true;

    const customStartMs =
      state.timingMode === "finish" && state.startTimeMode === "custom"
        ? getCustomStartTimestampMs()
        : null;

    if (customStartMs && customStartMs > Date.now() + 2000) {
      state.inWarmUp = true;
      state.warmUpTargetMs = customStartMs;
      state.warmUpLeftSec = Math.ceil((customStartMs - Date.now()) / 1000);
      state.warmUpOneMinWarned = state.warmUpLeftSec <= 60;
      state.gameDurationSec = calculateGameDurationSeconds(state.rounds.length);
      state.timeLeftSec = state.gameDurationSec;
      state.roundFullDurationSec = state.gameDurationSec;
      state.timerRunning = false;
    } else {
      state.inWarmUp = false;
      state.warmUpTargetMs = null;
      if (state.timingMode === "finish") {
        recalculateFutureGameDuration(true);
      } else {
        state.gameDurationSec = calculateGameDurationSeconds(state.rounds.length);
      }
      state.timeLeftSec = state.gameDurationSec;
      state.roundFullDurationSec = state.gameDurationSec;
      state.timerRunning = true;
      playStartWhistle();
    }

    document.getElementById("setupView").classList.add("hidden");
    document.getElementById("resultsView").classList.add("hidden");
    document.getElementById("arenaView").classList.remove("hidden");
    document.getElementById("setupToggleBtn").classList.remove("hidden");

    renderArenaView();
  });

  // Guarded Control Buttons ("Oi oi, are you a coach?")
  document.getElementById("setupToggleBtn").addEventListener("click", () => {
    requestCoachConfirmation(
      "End tournament and return to Setup? Current scores will be reset if you start a new one.",
      () => {
        state.timerRunning = false;
        state.inIntermission = false;
        state.inWarmUp = false;
        state.inProgress = false;
        document.getElementById("arenaView").classList.add("hidden");
        document.getElementById("resultsView").classList.add("hidden");
        document.getElementById("setupView").classList.remove("hidden");
        document.getElementById("setupToggleBtn").classList.add("hidden");
        renderSetupView();
      }
    );
  });

  document.getElementById("playPauseBtn").addEventListener("click", () => {
    const label = state.timerRunning ? "Pause the match clock?" : "Start the match clock?";
    requestCoachConfirmation(label, () => {
      ensureAudioContext();
      const wasPaused = !state.timerRunning;
      state.timerRunning = !state.timerRunning;

      if (wasPaused && state.timingMode === "finish" && !state.inIntermission) {
        const roundHasNotTickedYet = state.timeLeftSec === state.roundFullDurationSec;
        if (roundHasNotTickedYet) {
          recalculateFutureGameDuration(true);
          state.timeLeftSec = state.gameDurationSec;
          state.roundFullDurationSec = state.gameDurationSec;
        } else {
          recalculateFutureGameDuration(false);
        }
      }
      renderArenaView();
    });
  });

  document.getElementById("skipWarmUpBtn").addEventListener("click", () => {
    requestCoachConfirmation("Skip the warm-up countdown and start Round 1 now?", () => {
      ensureAudioContext();
      finishWarmUpAndStartRound1();
    });
  });

  document.getElementById("resetTimerBtn").addEventListener("click", () => {
    requestCoachConfirmation("Reset the timer for this round?", () => {
      state.timerRunning = false;
      state.inIntermission = false;
      if (state.timingMode === "finish") {
        recalculateFutureGameDuration(true);
      }
      state.timeLeftSec = state.gameDurationSec;
      state.roundFullDurationSec = state.gameDurationSec;
      renderArenaView();
    });
  });

  document.getElementById("hornManualBtn").addEventListener("click", playArenaBuzzer);

  document.getElementById("testSoundBtn").addEventListener("click", () => {
    playArenaBuzzer();
    showPushUpModal();
  });

  document.getElementById("autoAdvanceCheckbox").addEventListener("change", (e) => {
    state.autoAdvance = e.target.checked;
  });

  document.getElementById("nextRoundBtn").addEventListener("click", () => {
    if (state.inWarmUp) {
      requestCoachConfirmation("Skip the warm-up countdown and start Round 1 now?", () => {
        ensureAudioContext();
        finishWarmUpAndStartRound1();
      });
      return;
    }

    const isLastRound = state.currentRoundIndex >= state.rounds.length - 1;
    const msg = isLastRound
      ? "Finish the tournament and reveal the final podium?"
      : "Advance to the next round?";

    requestCoachConfirmation(msg, () => {
      ensureAudioContext();
      if (!isLastRound) {
        advanceToRound(state.currentRoundIndex + 1, state.timerRunning);
      } else {
        openResultsPage();
      }
    });
  });

  document.getElementById("prevRoundBtn").addEventListener("click", () => {
    if (state.currentRoundIndex <= 0 || state.inWarmUp) return;
    requestCoachConfirmation("Go back to the previous round?", () => {
      advanceToRound(state.currentRoundIndex - 1, false);
    });
  });

  // Results View Buttons
  document.getElementById("backToArenaBtn").addEventListener("click", () => {
    document.getElementById("resultsView").classList.add("hidden");
    document.getElementById("arenaView").classList.remove("hidden");
    renderArenaView();
  });

  document.getElementById("newTournamentBtn").addEventListener("click", () => {
    requestCoachConfirmation("End tournament and start a brand new one?", () => {
      state.inProgress = false;
      state.timerRunning = false;
      state.inIntermission = false;
      state.inWarmUp = false;
      document.getElementById("resultsView").classList.add("hidden");
      document.getElementById("arenaView").classList.add("hidden");
      document.getElementById("setupView").classList.remove("hidden");
      document.getElementById("setupToggleBtn").classList.add("hidden");
      renderSetupView();
    });
  });

  document.getElementById("themeToggleBtn").addEventListener("click", () => {
    state.darkMode = !state.darkMode;
    const body = document.body;
    const btn = document.getElementById("themeToggleBtn");
    if (state.darkMode) {
      body.classList.remove("bg-slate-100", "text-slate-900");
      body.classList.add("bg-navy-950", "text-slate-100");
      btn.textContent = "☀️";
    } else {
      body.classList.remove("bg-navy-950", "text-slate-100");
      body.classList.add("bg-slate-100", "text-slate-900");
      btn.textContent = "🌙";
    }
  });
});
