const allQuestions = [
    // ========== TOPIC A: ANATOMY & PHYSIOLOGY - CARDIOVASCULAR SYSTEM ==========

    {
        q: "Which defines diastolic blood pressure?",
        options: [
            "The force exerted on arterial walls during ventricular contraction",
            "The force exerted on arterial walls during ventricular relaxation",
            "The force exerted on venous walls during ventricular contraction",
            "The force exerted on venous walls during ventricular relaxation"
        ],
        correct: 1
    },
    {
        q: "What is the definition of systolic blood pressure?",
        options: [
            "The force exerted by the blood on arterial walls during ventricular relaxation",
            "The force exerted by the blood on venous walls during ventricular contraction",
            "The force exerted by blood on arterial walls during ventricular contraction",
            "The force exerted by blood on venous walls during ventricular relaxation"
        ],
        correct: 2
    },
    {
        q: "Which defines the term diastolic blood pressure?",
        options: [
            "The force exerted on arterial walls during atrial contraction",
            "The force exerted on venous walls during atrial contraction",
            "The force exerted on arterial walls during ventricular contraction",
            "The force exerted on venous walls during ventricular contraction"
        ],
        correct: 0
    },
    {
        q: "Which option represents the highest pressure exerted on the aorta?",
        options: [
            "Systolic",
            "Diastolic",
            "Cardiovascular drift",
            "Ventricular relaxation"
        ],
        correct: 0
    },
    {
        q: "During prolonged exercise, blood viscosity increases due to sweating, causing lower venous return and increased heart rate. What is this called?",
        options: [
            "Stroke volume response",
            "Cardiovascular drift",
            "Arterio-venous difference",
            "Maximal cardiac output"
        ],
        correct: 1
    },
    {
        q: "Which describes the blood pressure in the vascular system?",
        options: [
            "Systolic blood pressure is a measure of the blood pressure in a person's veins when they are doing a flexed arm hang",
            "Diastolic blood pressure is measured when the left ventricle contracts",
            "Systolic blood pressure increases when someone goes for a 20-minute training run",
            "Diastolic blood pressure always adjusts equally with systolic blood pressure"
        ],
        correct: 2
    },
    {
        q: "What effect does the sympathetic nervous system have on cardiovascular function?",
        options: [
            "Increased stroke volume and coronary artery vasoconstriction",
            "Increased stroke volume and coronary artery vasodilation",
            "Decreased stroke volume and coronary artery vasodilation",
            "Decreased stroke volume and coronary artery vasoconstriction"
        ],
        correct: 1
    },
    {
        q: "Which results in the highest cardiac output?",
        options: [
            "Heart rate 60 bpm and stroke volume 70 mL",
            "Heart rate 80 bpm and stroke volume 80 mL",
            "Heart rate 100 bpm and stroke volume 90 mL",
            "Heart rate 120 bpm and stroke volume 100 mL"
        ],
        correct: 3
    },
    {
        q: "What is the relationship between cardiac output and stroke volume during a warm-up?",
        options: [
            "Both increase",
            "Both decrease",
            "Cardiac output increases and stroke volume decreases",
            "Cardiac output decreases and stroke volume increases"
        ],
        correct: 0
    },
    {
        q: "Which describes the cardiac output of an athlete recovering from strenuous exercise?",
        options: [
            "It remains elevated and then rapidly returns to resting values",
            "It remains elevated and then slowly returns to resting values",
            "It rapidly decreases and then remains at resting values",
            "It slowly decreases and then gradually returns to resting values"
        ],
        correct: 3
    },
    {
        q: "What is the cardiovascular response during the first 5 minutes after completing a cycle race?",
        options: [
            "Cardiac output remains high and heart rate decreases",
            "Cardiac output decreases and heart rate decreases",
            "Cardiac output increases and heart rate increases",
            "Cardiac output remains constant and heart rate increases"
        ],
        correct: 1
    },
    {
        q: "Which cardiovascular adaptation to endurance exercise training affects the maximal cardiac output of an athlete?",
        options: [
            "Increased maximal stroke volume",
            "Decreased resting heart rate",
            "Increased capillarisation",
            "Decreased blood viscosity"
        ],
        correct: 0
    },
    {
        q: "Which adaptation is expected as training for a half marathon progresses?",
        options: [
            "Ability to train at the same relative intensity with a lower heart rate",
            "A lower arterio-venous oxygen (a-vO2) difference",
            "A lower stroke volume",
            "A lower blood pH towards the end of the training period"
        ],
        correct: 0
    },
    {
        q: "Which changes occur in blood flow as a cyclist begins their training session?",
        options: [
            "Cardiac output increases and vascular shunt occurs",
            "Cardiac output decreases and vascular shunt occurs",
            "Cardiac output increases and no vascular shunt occurs",
            "Cardiac output decreases and no vascular shunt occurs"
        ],
        correct: 0
    },
    {
        q: "Which exercise will result in an elevation of both systolic and diastolic blood pressures?",
        options: [
            "Swimming",
            "Jogging",
            "Weight lifting",
            "Cycling"
        ],
        correct: 2
    },
    {
        q: "What changes occur to a boxer's stroke volume and heart rate while punching during a bout?",
        options: [
            "Stroke volume increases and heart rate increases",
            "Stroke volume decreases and heart rate decreases",
            "Stroke volume increases and heart rate decreases",
            "Stroke volume decreases and heart rate increases"
        ],
        correct: 0
    },

    // ========== TOPIC A: RESPIRATORY SYSTEM ==========

    {
        q: "Which identifies the mechanics of ventilation?",
        options: [
            "Inhalation: diaphragm contracts, external intercostals contract. Exhalation: diaphragm relaxes, external intercostals relax",
            "Inhalation: diaphragm relaxes, external intercostals relax. Exhalation: diaphragm contracts, external intercostals contract",
            "Inhalation: diaphragm contracts, external intercostals relax. Exhalation: diaphragm relaxes, external intercostals contract",
            "Inhalation: diaphragm relaxes, external intercostals contract. Exhalation: diaphragm contracts, external intercostals relax"
        ],
        correct: 0
    },
    {
        q: "Which of the following occurs during inhalation?",
        options: [
            "I. Diaphragm contracts only",
            "II. Chest cavity volume increases only",
            "I. Diaphragm contracts and II. Chest cavity volume increases only",
            "I, II and III. Chest cavity pressure increases"
        ],
        correct: 2
    },
    {
        q: "Which occurs during the inhalation phase of ventilation during exercise?",
        options: [
            "Diaphragm relaxes and external intercostals contract",
            "Diaphragm contracts and internal intercostals contract",
            "Diaphragm contracts and external intercostals contract",
            "Diaphragm relaxes and internal intercostals relax"
        ],
        correct: 2
    },
    {
        q: "What causes maximal inspiration?",
        options: [
            "Diaphragm relaxes, external intercostals relax, internal intercostals contract",
            "Diaphragm contracts, external intercostals contract, internal intercostals contract",
            "Diaphragm contracts, external intercostals relax, internal intercostals relax",
            "Diaphragm relaxes, external intercostals contract, internal intercostals relax"
        ],
        correct: 1
    },
    {
        q: "What regulates the rate and depth of ventilation when an athlete starts to exercise?",
        options: [
            "An increase in blood pH",
            "A decrease in blood pH",
            "A decrease in blood CO2 level",
            "An increase in blood O2 level"
        ],
        correct: 1
    },
    {
        q: "Which increases the rate of ventilation?",
        options: [
            "Decreasing the airflow through the nose, larynx, trachea and bronchi to the alveoli",
            "Increasing the pressure in the thoracic cavity during expiration",
            "Increasing blood oxygen concentration during exercise",
            "Decreasing pH levels in the blood"
        ],
        correct: 3
    },
    {
        q: "Which of these stimulates an increase in ventilation as exercise begins?",
        options: [
            "Decreasing blood pH levels",
            "Decreasing blood adrenaline levels",
            "Decreasing blood carbon dioxide levels",
            "Decreasing blood oxygen levels"
        ],
        correct: 0
    },
    {
        q: "Which correctly characterizes the relationship between blood acidity levels and ventilation during a sub-maximal training session?",
        options: [
            "Blood acidity rises and pH lowers",
            "Blood acidity remains low and pH lowers",
            "Blood acidity decreases and pH increases",
            "Blood acidity remains constant and pH increases"
        ],
        correct: 0
    },
    {
        q: "An athlete has a high maximal oxygen consumption level (VO2max). What information does this provide?",
        options: [
            "The athlete has poor aerobic capacity",
            "The athlete has good aerobic capacity",
            "The athlete's oxygen carrying capacity is reduced",
            "The athlete has a greater reliance on anaerobic respiration"
        ],
        correct: 1
    },
    {
        q: "Maximal oxygen consumption represents the functional capacity of the oxygen transport system. Which person would likely have the highest VO2 max?",
        options: [
            "Elite marathon runner",
            "Chess player",
            "Novice hiker",
            "Young weightlifter"
        ],
        correct: 0
    },

    // ========== TOPIC A: METABOLISM & ENERGY SYSTEMS ==========

    {
        q: "What is the function of glucagon during fasting?",
        options: [
            "It stimulates the storage of lipids",
            "It stimulates the storage of glucose",
            "It stimulates the breakdown of glycogen",
            "It stimulates the breakdown of insulin"
        ],
        correct: 2
    },
    {
        q: "What is a function of glucagon?",
        options: [
            "Aids in short-term energy storage",
            "Aids in the storage of glucose in liver cells",
            "Stimulates the breakdown of glycogen",
            "Decreases blood glucose levels"
        ],
        correct: 2
    },
    {
        q: "Which regulates insulin release from the pancreas?",
        options: [
            "Signals from the nervous system",
            "Chemical changes in the blood",
            "An increase in antidiuretic hormone (ADH)",
            "Stimulation from the anterior pituitary gland"
        ],
        correct: 1
    },
    {
        q: "Which factor causes insulin levels in the blood to increase?",
        options: [
            "Low levels of blood glucose",
            "Low levels of glycogen in the liver",
            "High levels of glycogen in the liver",
            "High levels of blood glucose"
        ],
        correct: 3
    },
    {
        q: "Insulin and muscle contraction influence glucose during exercise. Which combination correctly states how they influence glucose uptake?",
        options: [
            "Insulin stimulates and muscle contraction stimulates",
            "Insulin inhibits and muscle contraction stimulates",
            "Insulin stimulates and muscle contraction inhibits",
            "Insulin inhibits and muscle contraction inhibits"
        ],
        correct: 0
    },
    {
        q: "Which statement applies to glycogen?",
        options: [
            "Broken down in catabolic reactions in response to insulin",
            "Stored in the liver and muscles in response to glucagon",
            "Synthesized in catabolic reactions from fatty acids and glycerol",
            "Broken down in slow twitch (type I) muscle fibres in response to adrenaline"
        ],
        correct: 3
    },
    {
        q: "Which process occurs when blood glucose levels are decreased?",
        options: [
            "Glycolysis",
            "Lipolysis",
            "Glycogenolysis",
            "Glycogenesis"
        ],
        correct: 2
    },
    {
        q: "During fasting, the body releases hormones that promote the breakdown of glycogen to replenish glucose in the body. What is this process called?",
        options: [
            "Gluconeogenesis",
            "Glycogenolysis",
            "Lipolysis",
            "Glycolysis"
        ],
        correct: 1
    },
    {
        q: "What is a function of adrenaline?",
        options: [
            "Increases stimulation of the parasympathetic nervous system",
            "Increases heart rate",
            "Decreases glycogenolysis",
            "Decreases heart rate"
        ],
        correct: 1
    },
    {
        q: "Which is the predominant energy system used when performing a high jump?",
        options: [
            "ATP-CP",
            "Lactic acid",
            "Aerobic glycolysis",
            "Aerobic lipolysis"
        ],
        correct: 0
    },
    {
        q: "What is the main fuel source for an elite athlete in a 400 m running race?",
        options: [
            "Creatine phosphate",
            "Glycogen",
            "Lactic acid",
            "Amino acid"
        ],
        correct: 1
    },
    {
        q: "Which energy system is the predominant contributor of ATP for a runner participating in a marathon?",
        options: [
            "ATP-PC system",
            "Anaerobic system",
            "Lactic acid system",
            "Aerobic system"
        ],
        correct: 3
    },
    {
        q: "Which metabolic process produces the greatest ATP yield?",
        options: [
            "ATP-CP system",
            "Anaerobic glycolysis",
            "Krebs cycle",
            "Electron transport chain"
        ],
        correct: 3
    },
    {
        q: "Which donates a phosphate group to adenosine diphosphate (ADP) during the initial stages of intense exercise to regenerate adenosine triphosphate (ATP)?",
        options: [
            "Glycogen",
            "Glucose-6-phosphate",
            "Amino acid",
            "Creatine phosphate"
        ],
        correct: 3
    },
    {
        q: "Which component of the aerobic energy system also occurs in the anaerobic system?",
        options: [
            "Krebs cycle",
            "Electron transport chain",
            "Glycolysis",
            "There are no common components"
        ],
        correct: 2
    },
    {
        q: "Which represents the production of adenosine triphosphate (ATP) via the aerobic glycolysis system?",
        options: [
            "PC + ADP → 1ATP + C",
            "glucose → pyruvate + 2 ATP → lactate + H+",
            "glucose → pyruvate + O2 → acetylCoA → Krebs cycle → electron transport chain → 38 ATP + H2O + CO2 + heat",
            "ADP + P → ATP"
        ],
        correct: 2
    },
    {
        q: "Which processes require the presence of oxygen to produce adenosine triphosphate (ATP)?",
        options: [
            "I. Glycolysis by the lactic acid system and II. Glycolysis followed by the Krebs cycle only",
            "I. Glycolysis by the lactic acid system and III. Beta oxidation of fatty acids only",
            "II. Glycolysis followed by the Krebs cycle and III. Beta oxidation of fatty acids only",
            "I, II and III"
        ],
        correct: 2
    },
    {
        q: "Which processes metabolize glucose and fat?",
        options: [
            "I. Krebs cycle and II. Glycolysis only",
            "I. Krebs cycle and III. Oxidative phosphorylation only",
            "II. Glycolysis and III. Oxidative phosphorylation only",
            "I, II and III"
        ],
        correct: 1
    },
    {
        q: "With sufficient fuel availability, what is the effect of muscle cell oxygen levels on fuel use to produce adenosine triphosphate (ATP)?",
        options: [
            "Elevated oxygen will promote the use of carbohydrates and fatty acids",
            "Depressed oxygen will promote the use of carbohydrates and fatty acids",
            "Elevated oxygen will promote the use of proteins",
            "Depressed oxygen will do little to promote any specific fuel"
        ],
        correct: 0
    },

    // ========== TOPIC A: FATIGUE & RECOVERY ==========

    {
        q: "What best defines fatigue?",
        options: [
            "A permanent exercise-induced decline in performance",
            "A decline in performance exclusively due to a rise in lactic acid",
            "A reversible, exercise-induced decline in performance",
            "A decline in performance due to increasing muscle pH"
        ],
        correct: 2
    },
    {
        q: "What is the definition of fatigue?",
        options: [
            "A decline in arousal levels during performance",
            "A reversible, exercise-induced decline in performance",
            "A negative emotional state associated with performance",
            "A temporary depletion in energy sources during athletic performance"
        ],
        correct: 1
    },
    {
        q: "What is fatigue in sports?",
        options: [
            "A non-reversible decline in performance due to poor sleep",
            "A reversible, exercise-induced decline in performance",
            "A reversible, unexplained decline in performance",
            "A non-reversible decline in performance due to poor nutrition"
        ],
        correct: 1
    },
    {
        q: "What causes the development of peripheral fatigue in a 100 m sprint?",
        options: [
            "Increased muscle and liver glycogen",
            "Depletion of acetylcholine",
            "Depletion of creatine phosphate",
            "Increased calcium ion release"
        ],
        correct: 2
    },
    {
        q: "Which plays a role in recovery from fatigue?",
        options: [
            "Decrease of creatine phosphate (CP)",
            "Increase of hydrogen ions",
            "Replenishment of myoglobin stores",
            "Depletion of acetylcholine"
        ],
        correct: 2
    },
    {
        q: "What is a key feature of excess post-exercise oxygen consumption (EPOC)?",
        options: [
            "Creatine phosphate stores are exhausted",
            "Resynthesis of muscle glycogen from lactate",
            "Myoglobin stores are depleted",
            "Hydrogen ions are produced"
        ],
        correct: 1
    },
    {
        q: "During recovery, which are restored to homeostatic levels?",
        options: [
            "I. Oxygen saturation of myoglobin and II. Muscle creatine phosphate stores only",
            "I. Oxygen saturation of myoglobin and III. Liver protein stores only",
            "II. Muscle creatine phosphate stores and III. Liver protein stores only",
            "I, II and III"
        ],
        correct: 0
    },
    {
        q: "What strategies can a coach employ to minimize fatigue during a basketball game?",
        options: [
            "Ensure players are substituted regularly",
            "Ensure players consume low GI food at half time",
            "Ensure the best players complete the full game",
            "Ensure players have complete rest the week before the match"
        ],
        correct: 0
    },

    // ========== TOPIC A: HORMONES & IMMUNE SYSTEM ==========

    {
        q: "Which may influence the feedback loops that regulate hormones?",
        options: [
            "I. Other hormones and II. Chemical signals only",
            "I. Other hormones and III. Neural signalling only",
            "II. Chemical signals and III. Neural signalling only",
            "I, II and III"
        ],
        correct: 3
    },
    {
        q: "Which applies to hormones?",
        options: [
            "Act only on target cells possessing specific receptors",
            "Examples include thyroid and testosterone",
            "Are only released over longer periods of time",
            "Are secreted by exocrine glands"
        ],
        correct: 0
    },
    {
        q: "Which is the immune response that occurs during delayed onset muscle soreness (DOMS)?",
        options: [
            "Overtraining increases red blood cells",
            "Overstretching increases the pH of bodily fluids",
            "Inflammation recruits white blood cells",
            "Antibody production increases due to pathogens"
        ],
        correct: 2
    },
    {
        q: "Which describes inflammation?",
        options: [
            "Tissue damage increases fluid build-up, allowing immune cells to reach the site of damage",
            "The ability to stop an area of the body from continuing to bleed",
            "The skin has secretions that help to prevent disease from invading the body",
            "A localized decrease in the number of leucocytes at the site of tissue damage"
        ],
        correct: 0
    },

    // ========== TOPIC B: SKELETAL SYSTEM & JOINTS ==========

    {
        q: "The radius and ulna articulate at the radioulnar joint. What is this type of joint?",
        options: [
            "Saddle",
            "Pivot",
            "Condyloid",
            "Gliding"
        ],
        correct: 1
    },
    {
        q: "Which is the location of a hinge joint?",
        options: [
            "The medial end of the clavicle",
            "The proximal end of the femur",
            "The anterior end of the ribs",
            "The distal end of the femur"
        ],
        correct: 3
    },
    {
        q: "What is the function of a ligament?",
        options: [
            "To attach muscle to bone",
            "To attach bone to bone",
            "To reduce friction",
            "To secrete synovial fluid"
        ],
        correct: 1
    },
    {
        q: "What is an example of circumduction?",
        options: [
            "Shoulder joint topspin in tennis",
            "Shoulder joint overarm serve in tennis",
            "Pointing toes in ballet",
            "Turning head to breathe when swimming"
        ],
        correct: 1
    },
    {
        q: "What type of movement is it when the sole of the foot is turned inwards toward the midline?",
        options: [
            "Eversion",
            "Flexion",
            "Elevation",
            "Inversion"
        ],
        correct: 3
    },
    {
        q: "What is the movement demonstrated when the ankle turns inward?",
        options: [
            "Eversion",
            "Inversion",
            "Plantar flexion",
            "Dorsi flexion"
        ],
        correct: 1
    },
    {
        q: "An athlete, while running, sprains the ligaments on the lateral side of their ankle. What type of movement occurred at the ankle to stretch the lateral tendons?",
        options: [
            "Inversion",
            "Dorsi flexion",
            "Plantar flexion",
            "Eversion"
        ],
        correct: 0
    },
    {
        q: "What describes the position of the patella relative to the metatarsals with reference to the hip joint?",
        options: [
            "Posterior",
            "Inferior",
            "Proximal",
            "Distal"
        ],
        correct: 2
    },
    {
        q: "During a handstand, what is the position of the tarsals in relation to the femur?",
        options: [
            "Superior",
            "Inferior",
            "Lateral",
            "Medial"
        ],
        correct: 0
    },
    {
        q: "Which anatomical term best describes the position of the ulna in relation to the humerus?",
        options: [
            "Proximal",
            "Superior",
            "Distal",
            "Medial"
        ],
        correct: 2
    },

    // ========== TOPIC B: MUSCULAR SYSTEM ==========

    {
        q: "Which describes hypertrophy?",
        options: [
            "A decrease in the size of a muscle fibre usually caused by a decrease in muscle use",
            "The ability of a muscle to shorten in length caused by an increase in muscle use",
            "The ability of a muscle to return to its original length due to relaxation of fibres",
            "An increase in size of the whole muscle due to an increase in size of the myofibrils"
        ],
        correct: 3
    },
    {
        q: "What is an example of an isotonic eccentric contraction for the triceps?",
        options: [
            "Lowering phase (elbow flexion) in a push-up",
            "Lifting phase (elbow extension) in a push-up",
            "Execution phase (elbow extension) when throwing a ball",
            "Preparation phase (elbow flexion) when throwing a ball"
        ],
        correct: 0
    },
    {
        q: "What type of muscle contraction is occurring when lowering weights with control?",
        options: [
            "Isokinetic",
            "Concentric",
            "Eccentric",
            "Isometric"
        ],
        correct: 2
    },
    {
        q: "What type of muscle contraction occurs in the skier's quadriceps during a downhill position?",
        options: [
            "Isotonic eccentric",
            "Isotonic concentric",
            "Isokinetic",
            "Isometric"
        ],
        correct: 3
    },
    {
        q: "Which muscle is an agonist during shoulder abduction?",
        options: [
            "The trapezius contracts isokinetically",
            "The deltoid contracts concentrically",
            "The pectoralis contracts isometrically",
            "The biceps brachii contracts eccentrically"
        ],
        correct: 1
    },
    {
        q: "Which muscle is the agonist during shoulder abduction?",
        options: [
            "Deltoid which contracts concentrically",
            "Deltoid which contracts eccentrically",
            "Latissimus dorsi which contracts eccentrically",
            "Latissimus dorsi which contracts concentrically"
        ],
        correct: 0
    },
    {
        q: "Which correctly characterizes reciprocal inhibition during the upward phase of a bicep curl?",
        options: [
            "Triceps brachii lengthens and biceps brachii shortens",
            "Triceps brachii relaxes and biceps brachii shortens",
            "Triceps brachii shortens and biceps brachii relaxes",
            "Triceps brachii shortens and biceps brachii lengthens"
        ],
        correct: 1
    },
    {
        q: "The gluteus maximus relaxes when the iliopsoas contracts while kicking a ball. Which explains the relaxation?",
        options: [
            "Stimulation by motor neurons",
            "Stimulation by acetylcholine",
            "Reflex action of the nervous system",
            "Voluntary control of reciprocal inhibition"
        ],
        correct: 2
    },
    {
        q: "The hamstrings relax when the quadriceps femoris contracts during the upward phase of a squat. Which statement explains this?",
        options: [
            "Antagonist contracts by a reflex action of the sympathetic nervous system",
            "Agonist contracts upon stimulation by motor neurons",
            "Antagonist relaxes upon stimulation of acetylcholine",
            "Agonist relaxes under voluntary control during reciprocal inhibition"
        ],
        correct: 1
    },
    {
        q: "Which factors contribute to the total force produced at a motor unit?",
        options: [
            "I. The number of muscle fibres and II. The muscle fibre type only",
            "I. The number of muscle fibres and III. The size of the motor unit only",
            "II. The muscle fibre type and III. The size of the motor unit only",
            "I, II and III"
        ],
        correct: 3
    },
    {
        q: "Which correctly identifies functions of slow twitch (type I) muscle fibres?",
        options: [
            "High resistance to fatigue and low force production",
            "Low resistance to fatigue and high force production",
            "High resistance to fatigue and high force production",
            "Low resistance to fatigue and low force production"
        ],
        correct: 0
    },
    {
        q: "What shortens during muscular contraction according to the sliding filament theory?",
        options: [
            "Z line",
            "A band",
            "H zone",
            "Actin"
        ],
        correct: 2
    },
    {
        q: "According to the sliding filament theory, which occurs in the muscle fibres when extending the elbow while throwing a javelin?",
        options: [
            "The H zone increases",
            "The A band shortens",
            "The Z lines move closer together",
            "The A band lengthens"
        ],
        correct: 2
    },
    {
        q: "Which decrease during muscle contraction?",
        options: [
            "I. H zone and II. A band only",
            "I. H zone and III. Distance between Z lines only",
            "II. A band and III. Distance between Z lines only",
            "I, II and III"
        ],
        correct: 1
    },
    {
        q: "Which is required for muscle relaxation to occur?",
        options: [
            "Breakdown of acetylcholine by cholinesterase",
            "Release of calcium ions from sarcoplasmic reticulum",
            "Hydrolysis of ATP bound to myosin head",
            "Binding of ATP to actin head"
        ],
        correct: 0
    },
    {
        q: "A neural impulse travels along the axon. Which structure does the nerve impulse travel through next?",
        options: [
            "Cell body",
            "Synapse",
            "Dendrite",
            "Motor end plate"
        ],
        correct: 1
    },
    {
        q: "In preparation for a downhill running event, what can an athlete do during initial training to prevent delayed onset muscle soreness (DOMS)?",
        options: [
            "Reduce eccentric muscle actions",
            "Increase eccentric muscle actions",
            "Reduce concentric muscle actions",
            "Increase intensity of muscle actions"
        ],
        correct: 0
    },
    {
        q: "Which is a factor in delayed onset muscle soreness (DOMS)?",
        options: [
            "Lactic acid accumulation",
            "Concentric muscle contractions",
            "Inflammation of fibres",
            "Low-intensity exercises"
        ],
        correct: 2
    },

    // ========== TOPIC B: BIOMECHANICS - LEVERS ==========

    {
        q: "What is an example of a first-class lever?",
        options: [
            "Triceps contracting, moving the elbow",
            "Biceps contracting, moving the elbow",
            "Quadriceps contracting, moving the knee",
            "Hamstrings contracting, moving the knee"
        ],
        correct: 0
    },
    {
        q: "When the forearm acts as a first-class lever to extend the elbow, which muscle acts as the effort to lift a load?",
        options: [
            "Biceps brachii",
            "Deltoid",
            "Trapezius",
            "Triceps brachii"
        ],
        correct: 3
    },
    {
        q: "Which describes the lever system of the calf-ankle joint?",
        options: [
            "It is an example of a third class lever",
            "The effort force has a shorter arm than the load force",
            "The fulcrum is an equal distance from the load and effort force",
            "The load force is located between the fulcrum and the effort force"
        ],
        correct: 3
    },
    {
        q: "Which are examples of a third class lever?",
        options: [
            "I. Elbow extension when swinging a baseball bat and II. Plantar flexion when jumping only",
            "I. Elbow extension when swinging a baseball bat and III. Knee extension to kick a football only",
            "II. Plantar flexion when jumping and III. Knee extension to kick a football only",
            "I, II and III"
        ],
        correct: 1
    },
    {
        q: "Which is a third-class lever?",
        options: [
            "Extension of the elbow during a tennis serve",
            "Tucking of the chin during a somersault in gymnastics",
            "Plantar flexion of the ankle during a jump shot in basketball",
            "Flexion of the elbow during a bicep curl in weightlifting"
        ],
        correct: 3
    },
    {
        q: "Which classes of lever have the effort force and the resistance force on the same side of the fulcrum?",
        options: [
            "I. First and II. Second only",
            "I. First and III. Third only",
            "II. Second and III. Third only",
            "I, II and III"
        ],
        correct: 2
    },
    {
        q: "A golfer wants to increase the force applied to their golf ball to make it travel further. Assuming the ball will be hit with the same acceleration each time, which golf club should they use?",
        options: [
            "The longest golf club",
            "The heaviest golf club",
            "The lightest golf club",
            "The widest golf club head"
        ],
        correct: 1
    },

    // ========== TOPIC B: BIOMECHANICS - MOTION & FORCES ==========

    {
        q: "What is acceleration?",
        options: [
            "A change in velocity and direction",
            "A change in displacement",
            "A change in position from a starting point",
            "A change in linear momentum"
        ],
        correct: 0
    },
    {
        q: "Which term describes how velocity changes over time?",
        options: [
            "Impulse",
            "Displacement",
            "Momentum",
            "Acceleration"
        ],
        correct: 3
    },
    {
        q: "Which best defines momentum?",
        options: [
            "A vector quantity that describes the push or pull of an object in space",
            "A vector quantity that describes the measurement of mass in motion",
            "A scalar quantity that describes how fast an object is moving",
            "A scalar quantity that describes the amount of matter in an object"
        ],
        correct: 1
    },
    {
        q: "Which represents the relationship between momentum, velocity and mass?",
        options: [
            "Momentum is inversely proportional to velocity and proportional to mass",
            "Momentum is proportional to velocity and inversely proportional to mass",
            "Momentum is inversely proportional to velocity and mass",
            "Momentum is proportional to velocity and mass"
        ],
        correct: 3
    },
    {
        q: "Which represents the relationship between impulse, time and force?",
        options: [
            "Impulse is inversely proportional to time and proportional to force",
            "Impulse is proportional to time and inversely proportional to force",
            "Impulse is proportional to time and force",
            "Impulse is inversely proportional to time and force"
        ],
        correct: 2
    },
    {
        q: "What is the definition of Newton's first law of motion?",
        options: [
            "For every action force, there is an equal and opposite reaction force",
            "An amount of force applied over a given time",
            "Every object will continue with uniform velocity unless acted upon by an unbalanced force",
            "Force equals mass multiplied by acceleration"
        ],
        correct: 2
    },
    {
        q: "Which is an example of Newton's second law of motion?",
        options: [
            "A ball is stationary on a penalty spot before it is kicked",
            "A ball will travel faster if greater force is applied by a racquet",
            "A ball applies a backward force on a racquet when it is hit",
            "Once kicked, a ball's acceleration is affected by gravity"
        ],
        correct: 1
    },
    {
        q: "A ball hit during a game of tennis is subject to Newton's laws of motion. What will increase the acceleration of the ball?",
        options: [
            "I. Increasing the angular velocity of the racket head and II. Increasing the force applied only",
            "I. Increasing the angular velocity of the racket head and III. Increasing the mass of the ball only",
            "II. Increasing the force applied and III. Increasing the mass of the ball only",
            "I, II and III"
        ],
        correct: 0
    },
    {
        q: "How is angular momentum calculated?",
        options: [
            "Moment of inertia + angular velocity",
            "Moment of inertia - angular velocity",
            "Moment of inertia × angular velocity",
            "Moment of inertia ÷ angular velocity"
        ],
        correct: 2
    },
    {
        q: "How does the angular velocity change when a diver moves from an open position to a tuck position?",
        options: [
            "It decreases to change the moment of inertia",
            "It remains the same in order to conserve momentum",
            "It increases in order to conserve momentum",
            "It is not altered with a change in moment of inertia"
        ],
        correct: 2
    },

    // ========== TOPIC B: BIOMECHANICS - FRICTION & DRAG ==========

    {
        q: "What is friction?",
        options: [
            "The force acting parallel to the interface of two surfaces that are in contact",
            "The force or forces acting to oppose the motion of a tennis ball through the air",
            "The force or forces acting to oppose the motion of an object through a fluid",
            "The force that acts to increase the acceleration of objects"
        ],
        correct: 0
    },
    {
        q: "Which statement is correct about friction?",
        options: [
            "Acts parallel to the interface of two surfaces that are in contact, and opposes their relative motion",
            "Acts perpendicular to the interface of two surfaces that are in contact, and opposes their relative motion",
            "Acts perpendicular to the interface of two surfaces that are in contact, and promotes their relative motion",
            "Acts parallel to the interface of two surfaces that are in contact, and promotes their relative motion"
        ],
        correct: 0
    },
    {
        q: "Which would reduce the coefficient of friction?",
        options: [
            "An ice skater sharpens their skates",
            "A rock climber applies chalk to their hands when climbing",
            "A baseball player uses cleats (studs) on their boots",
            "A golfer wears a glove when hitting the ball"
        ],
        correct: 0
    },
    {
        q: "Which has the lowest coefficient of friction?",
        options: [
            "Steel skates on ice",
            "Athletic shoes with spikes on a running track",
            "Rock climbing shoes on an artificial climbing wall",
            "Football (soccer) boots on a turf field"
        ],
        correct: 0
    },
    {
        q: "Which has the highest coefficient of friction?",
        options: [
            "An ice hockey puck on ice",
            "A ski travelling downhill on snow",
            "A football cleat on grass",
            "A volleyball player's foot on sand"
        ],
        correct: 2
    },
    {
        q: "Which correctly describes the static and dynamic friction experienced by a speed skater as they push off at the start of a race?",
        options: [
            "Static friction equals dynamic friction",
            "Static friction is larger than dynamic friction",
            "Static friction is smaller than dynamic friction",
            "Static friction stays the same and dynamic friction increases"
        ],
        correct: 1
    },
    {
        q: "In the sport of curling, team members slide a large stone across ice towards a target. Which is relevant to the stone as it moves across the ice?",
        options: [
            "The coefficient of static friction",
            "The coefficient of dynamic friction",
            "The coefficient of static drag",
            "The coefficient of dynamic drag"
        ],
        correct: 1
    },
    {
        q: "What is drag?",
        options: [
            "A dimensionless scalar quantity, which is the ratio of friction and normal reaction force",
            "A force applied to attempt to move a stationary object",
            "A force that acts parallel to the interface of two surfaces that are in contact",
            "A force acting to oppose the motion of an object through a fluid"
        ],
        correct: 3
    },
    {
        q: "Why does a cyclist use a low position to increase speed?",
        options: [
            "To increase friction",
            "To decrease ground reaction force",
            "To decrease air resistance",
            "To increase push"
        ],
        correct: 2
    },
    {
        q: "What is an example of an athlete reducing form drag?",
        options: [
            "A cyclist adopting a low profile position",
            "A swimmer staying underwater for as long as possible at the start of the race",
            "A swimmer using a shark-skin suit",
            "A soccer player using soccer boots on a grass surface"
        ],
        correct: 0
    },
    {
        q: "Drag increases with speed. Which action increases a swimmer's drag?",
        options: [
            "Shaving before the race",
            "Staying underwater for as long as is allowed at the start of the race",
            "Pushing off the wall in a streamlined position",
            "Wearing a cap without covering the edges of the goggles"
        ],
        correct: 3
    },
    {
        q: "When a golfer hits a golf ball with backspin, what is the effect of the spin on the ball?",
        options: [
            "It will create lift and bring the ball back down to the ground sooner",
            "It will generate a force that will cause the ball to curve to the side",
            "It will not alter the flight of the ball",
            "It will create lift and keep the ball in the air longer"
        ],
        correct: 3
    },

    // ========== TOPIC C: SKILL ACQUISITION - LEARNING STAGES ==========

    {
        q: "Which is an example of the associative stage of learning?",
        options: [
            "A gymnast detects and self-corrects movements on a balance beam without external feedback",
            "A soccer (football) player talks through the steps of a throw-in as they attempt the skill",
            "A tennis player detects movement of a serve and receives some feedback from a coach",
            "A basketball player consistently dribbles and evaluates the movement of opponents"
        ],
        correct: 2
    },
    {
        q: "Which skill demonstrates that the autonomous stage of learning has been reached?",
        options: [
            "A basketball player dribbles the ball down the court with uncoordinated movements",
            "A golfer hits balls on a driving range to improve the consistency of their shots",
            "A swimmer can perform a turn at the end of each lap with consistency",
            "A gymnast watches the performance of a skill and attempts to replicate it"
        ],
        correct: 2
    },
    {
        q: "Which phase of learning relies heavily on working memory and learning strategies?",
        options: [
            "Cognitive",
            "Associative",
            "Autonomous",
            "Competence"
        ],
        correct: 0
  
    },

    // ========== TOPIC C: SKILL ACQUISITION - PEDAGOGY & CONSTRAINTS ==========

    {
        q: "Which is a characteristic of traditional linear pedagogy?",
        options: [
            "Athlete-led learning",
            "Coach-led learning",
            "Process-orientated learning",
            "Coach-athlete collaborative learning"
        ],
        correct: 1
    },
    {
        q: "Which is a feature of non-linear pedagogy?",
        options: [
            "Process-orientated learning",
            "Content-focused learning",
            "Coach-led learning",
            "Coach-orientated learning"
        ],
        correct: 0
    },
    {
        q: "Which is a feature of non-linear pedagogy in sports?",
        options: [
            "Content-focused learning",
            "Transmission of fixed knowledge from coach to athlete",
            "Process-orientated learning",
            "Low levels of connectivity between athletes and coaches"
        ],
        correct: 2
    },
    {
        q: "What is a feature of non-linear pedagogy?",
        options: [
            "Content-focused learning",
            "Process-orientated learning",
            "Coach-led learning",
            "A coach has responsibility for all learning"
        ],
        correct: 1
    },
    {
        q: "Which is a feature of non-linear pedagogy in sport?",
        options: [
            "Content-focused learning",
            "Coach-led learning",
            "Development of creative processes in athletes",
            "Transmission of fixed knowledge from a coach"
        ],
        correct: 2
    },
    {
        q: "Which is a feature of non-linear pedagogy in sports coaching?",
        options: [
            "It helps to develop the athlete's creative problem-solving processes",
            "The coach dictates what is to be learnt in a training session",
            "The coach has full responsibility for when and how learning will occur in each session",
            "The athlete's learning is very content focused"
        ],
        correct: 0
    },
    {
        q: "Which is an example of non-linear pedagogy?",
        options: [
            "A tennis coach allows a novice to play with a larger tennis ball",
            "A basketball coach teaches correct hand placement during a free throw",
            "A football coach instructs the team on defensive strategy",
            "A coach models the correct technique for a gymnast to copy"
        ],
        correct: 0
    },
    {
        q: "A coach considers movement as a complex interaction between the body, the task and the environment. Which approach to motor learning is this?",
        options: [
            "Ecological systems theory",
            "Schema theory",
            "Open-loop theory",
            "Closed-loop theory"
        ],
        correct: 0
    },
    {
        q: "Which is an environmental constraint to learning to play basketball?",
        options: [
            "The athlete's decision to pass the ball",
            "Lines on a basketball court",
            "Setting a goal to reach x number of layups",
            "Enforcing specific performance conditions"
        ],
        correct: 1
    },
    {
        q: "Which are examples of task constraints?",
        options: [
            "Rules of the game and equipment used",
            "Height of athlete and fitness level",
            "Weather conditions and playing surface",
            "Coaching style and team dynamics"
        ],
        correct: 0
    },

    // ========== TOPIC C: SKILL ACQUISITION - TRANSFER ==========

    {
        q: "A volleyball player serves well due to training. Which type of transfer occurs when the volleyball player successfully performs tennis serves?",
        options: [
            "Skill to skill",
            "Practice to performance",
            "Stage to stage",
            "Whole-part-whole"
        ],
        correct: 0
    },
    {
        q: "What type of skill transfer occurs when a soccer player performs kicking drills as part of their warm-up before a big match?",
        options: [
            "Principles to skill",
            "Skill to skill",
            "Practice to performance",
            "Abilities to skill"
        ],
        correct: 2
    },
    {
        q: "Which transfer occurs when a left-handed tennis player learns to hit with their right hand?",
        options: [
            "Skill to skill",
            "Abilities to skill",
            "Stage to stage",
            "Bilateral"
        ],
        correct: 3
    },
    {
        q: "Which type of transfer is best demonstrated when a baseball player learns to hit a ball both left handed and right handed?",
        options: [
            "Skill to skill",
            "Stage to stage",
            "Bilateral",
            "Practice to performance"
        ],
        correct: 2
    },
    {
        q: "Which describes practice to performance transfer in tennis?",
        options: [
            "Hitting against a ball machine",
            "Understanding the biomechanics of hitting",
            "Training for strength to improve hitting",
            "Hitting right-handed and left-handed"
        ],
        correct: 0
    },
    {
        q: "What type of transfer occurs when a gymnast learns that forming a tuck in a somersault will reduce the moment of inertia and allow them to spin faster?",
        options: [
            "Skill to skill",
            "Practice to performance",
            "Stage to stage",
            "Principles to skills"
        ],
        correct: 3
    },

    // ========== TOPIC C: SPORTS PSYCHOLOGY - ATTENTION & PERCEPTION ==========

    {
        q: "What adds a psychological refractory period (PRP)?",
        options: [
            "Reacting to a starter in a 100 m sprint",
            "Receiving a serve in tennis",
            "Defender responding to a fake shot in basketball",
            "Moving to intercept a pass in hockey"
        ],
        correct: 2
    },
    {
        q: "Which situation is an example of the psychological refractory period (PRP)?",
        options: [
            "A defender's reaction is delayed as a player steps to shoot and suddenly changes direction",
            "Selective attention (SA) overreaction causes a false start in a race",
            "Attention deficit leads to a delayed nerve transmission in a race",
            "Response time is improved as a player focuses on the ball and reacts quickly"
        ],
        correct: 0
    },
    {
        q: "What best describes the attentional focus of a tennis player trying to work out a strategy during a match?",
        options: [
            "Internal, narrow",
            "Internal, broad",
            "External, narrow",
            "External, broad"
        ],
        correct: 1
    },

    // ========== TOPIC C: SPORTS PSYCHOLOGY - PERSONALITY & MOTIVATION ==========

    {
        q: "An athlete scoring high in conscientiousness and openness in a personality test is more likely to exhibit which of these behaviours in practice?",
        options: [
            "Remain calm and help teammates",
            "Produce consistent effort and listen to coach instruction",
            "Remain quiet and listen to coach instruction",
            "Help teammates and produce consistent effort"
        ],
        correct: 1
    },
    {
        q: "A soccer player explains to their sport psychologist that their aims for the upcoming season are to win top goal scorer and for the team to win the league. Which motivational orientation is shown by these aims?",
        options: [
            "High task, high ego",
            "High task, low ego",
            "Low task, low ego",
            "Low task, high ego"
        ],
        correct: 3
    },
    {
        q: "Which of these promote an ego motivational climate?",
        options: [
            "I. Grouping players based on ability and II. Rewarding effort above outcome only",
            "I. Grouping players based on ability and III. Encouraging competition between teammates only",
            "II. Rewarding effort above outcome and III. Encouraging competition between teammates only",
            "I, II and III"
        ],
        correct: 1
    },
    {
        q: "What is a potential outcome of high self-determination and intrinsic motivation?",
        options: [
            "Elevated anxiety",
            "Decreased enjoyment in the sport",
            "Elevated dropout rate",
            "Elevated self-regulation"
        ],
        correct: 3
    },
    {
        q: "Which example of extrinsic motivation will enhance intrinsic motivation?",
        options: [
            "An athlete receives positive verbal feedback about their effective pacing strategy in a race",
            "An athlete receives an extraordinary meal from their parents following a competition",
            "An athlete receives a trophy following a competition",
            "An athlete receives a contract to play their sport at the professional level"
        ],
        correct: 0
    },
    {
        q: "A coach wants a golfer to focus their attention on aspects of their game that they can control internally. What is represented by this scenario?",
        options: [
            "Self-fulfilling prophecy",
            "Learned helplessness",
            "Attribution theory",
            "Mental toughness"
        ],
        correct: 2
    },

    // ========== TOPIC C: SPORTS PSYCHOLOGY - ANXIETY & COPING ==========

    {
        q: "Which is an example of a problem-focused coping strategy?",
        options: [
            "A golfer studying the course before a tournament",
            "A sprinter meditating before a race",
            "A hockey player enjoying time with friends before a game",
            "A gymnast practising with a large crash mat"
        ],
        correct: 0
    },
    {
        q: "What are the limitations of using self-reporting tests to measure pre-competition anxiety in athletes?",
        options: [
            "I. The time when the test is administered can affect the results and II. The test must be repeated multiple times only",
            "I. The time when the test is administered can affect the results and III. The athlete might not respond honestly only",
            "II. The test must be repeated multiple times and III. The athlete might not respond honestly only",
            "I, II and III"
        ],
        correct: 1
    },

    // ========== TOPIC C: SPORTS PSYCHOLOGY - GOAL SETTING & IMAGERY ==========

    {
        q: "A swimmer sets a goal to improve their flip turn by improving their technique. What type of goal is this?",
        options: [
            "Ego",
            "Performance",
            "Task",
            "Process"
        ],
        correct: 1
    },
    {
        q: "What is not part of an imagery experience for a professional basketball player practising before their next away game?",
        options: [
            "Imagining performing perfectly a three-point shot",
            "Imagining performing perfectly a block against the best forward",
            "Imagining staying relaxed and focused in the hostile crowded stadium",
            "Imagining being the best player scoring the most points"
        ],
        correct: 3
    },

    // ========== TOPIC C: TRAINING PRINCIPLES & INJURY ==========

    {
        q: "What does the training principle of reversibility refer to?",
        options: [
            "The gradual increase of intensity in training demands",
            "The variability of training loads and skills",
            "The replication of performance demands in training",
            "The training benefits are lost if training ceases"
        ],
        correct: 3
    },
    {
        q: "A weightlifter stops training for three months due to injury, which results in muscle atrophy. Which principle of training describes this period of time?",
        options: [
            "Reversibility",
            "Progression",
            "Overload",
            "Variety"
        ],
        correct: 0
    },
    {
        q: "Which are benefits of a warm-up?",
        options: [
            "I. Increases the respiration rate and II. Lowers heart rate only",
            "I. Increases the respiration rate and III. Reduces muscle soreness only",
            "II. Lowers heart rate and III. Reduces muscle soreness only",
            "I, II and III"
        ],
        correct: 1
    },
    {
        q: "Which describes inflammation?",
        options: [
            "Tissue damage increases fluid build-up, allowing immune cells to reach the site of damage",
            "The ability to stop an area of the body from continuing to bleed",
            "The skin has secretions that help to prevent disease from invading the body",
            "A localized decrease in the number of leucocytes at the site of tissue damage"
        ],
        correct: 0
    },
    {
        q: "Which methods will help to lower the risk of injury?",
        options: [
            "I. Protective equipment and II. Flexibility training only",
            "I. Protective equipment and III. Cardiovascular training only",
            "II. Flexibility training and III. Cardiovascular training only",
            "I, II and III"
        ],
        correct: 0
    }
];
