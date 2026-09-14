const mcQuestions = [
    // ── SECTION A ──────────────────────────────────────────────────────────────
    {
        id: "MC_A001", section: "A", subtopic: "A.1.1", level: "SL",
        question: "Which of the following correctly describes the role of the sympathetic nervous system during exercise?",
        options: ["A. Decreases heart rate and dilates blood vessels to the gut", "B. Increases heart rate and causes vasoconstriction of non-active tissues", "C. Stimulates the parasympathetic response to maintain homeostasis", "D. Reduces adrenaline secretion from the adrenal medulla"],
        answer: 1,
        explanation: "The sympathetic nervous system is the 'fight or flight' branch of the autonomic nervous system. During exercise it increases heart rate and cardiac output, and causes vasoconstriction of arterioles to non-active organs (such as the gut and kidneys), redirecting blood to working muscles. It simultaneously stimulates the adrenal medulla to release adrenaline and noradrenaline. The parasympathetic branch has the opposite effect (rest and digest). CC A.1.1"
    },
    {
        id: "MC_A002", section: "A", subtopic: "A.1.2", level: "SL",
        question: "Insulin promotes glucose uptake primarily by stimulating which process?",
        options: ["A. Gluconeogenesis in the liver", "B. Glycogenolysis in muscle cells", "C. Translocation of GLUT4 transporters to cell membranes", "D. Release of glucagon from the pancreas"],
        answer: 2,
        explanation: "Insulin is secreted by pancreatic beta cells in response to elevated blood glucose. Its primary mechanism for increasing glucose uptake in muscle and adipose cells is the translocation of GLUT4 glucose transporter proteins to the cell membrane, allowing glucose to enter by facilitated diffusion. Gluconeogenesis is the synthesis of glucose from non-carbohydrate sources; glycogenolysis is the breakdown of glycogen — both are the opposite of what insulin promotes. CC A.1.2"
    },
    {
        id: "MC_A003", section: "A", subtopic: "A.1.3", level: "SL",
        question: "During exercise, which mechanism causes blood to be redistributed away from non-active organs?",
        options: ["A. Vasodilation of arterioles supplying the gut", "B. Vasoconstriction of arterioles supplying non-active tissues", "C. Decreased cardiac output", "D. Reduced venous return from working muscles"],
        answer: 1,
        explanation: "The vascular shunt mechanism redirects blood during exercise. Sympathetic stimulation causes vasoconstriction (narrowing) of arterioles supplying non-active organs such as the gut, kidneys and liver, reducing blood flow to these areas. Simultaneously, arterioles supplying working muscles vasodilate in response to local metabolic changes (increased CO₂, temperature and acidity). This redistribution — not a drop in cardiac output — is what shunts blood to where it is needed. CC A.1.3"
    },
    {
        id: "MC_A004", section: "A", subtopic: "A.1.3", level: "SL",
        question: "Gaseous exchange at the alveoli occurs because:",
        options: ["A. Active transport moves O₂ into the blood against a concentration gradient", "B. Gases diffuse from areas of high partial pressure to areas of low partial pressure", "C. The heart pumps gases directly through the alveolar walls", "D. CO₂ binds to haemoglobin and forces O₂ out"],
        answer: 1,
        explanation: "Gaseous exchange occurs entirely by simple diffusion — gases move passively down their partial pressure gradients. O₂ has a higher partial pressure in alveolar air than in pulmonary capillary blood, so it diffuses into the blood. CO₂ has a higher partial pressure in capillary blood than in alveolar air, so it diffuses out. No energy is required; active transport is not involved. The thin, moist, large-surface-area alveolar membrane facilitates this rapid exchange. CC A.1.3"
    },
    {
        id: "MC_A005", section: "A", subtopic: "A.2.1", level: "SL",
        question: "Which hormone primarily increases water reabsorption in the kidneys when blood osmolarity rises?",
        options: ["A. Aldosterone", "B. Insulin", "C. Glucagon", "D. Anti-diuretic hormone (ADH)"],
        answer: 3,
        explanation: "ADH (anti-diuretic hormone, also called vasopressin) is released from the posterior pituitary gland when blood osmolarity rises (e.g. due to dehydration or sweating). ADH acts on the collecting ducts and distal tubules of the kidneys, increasing their permeability to water so more water is reabsorbed into the blood, reducing urine volume. Aldosterone primarily regulates sodium reabsorption (and thereby water indirectly), but ADH is the primary direct water-conservation hormone. CC A.2.1"
    },
    {
        id: "MC_A006", section: "A", subtopic: "A.2.1", level: "SL",
        question: "Hyponatremia in endurance athletes is most likely caused by:",
        options: ["A. Excessive sodium intake combined with dehydration", "B. Drinking too much plain water without replacing electrolytes", "C. High sweat-rate reducing blood osmolarity", "D. Overproduction of aldosterone"],
        answer: 1,
        explanation: "Hyponatremia (abnormally low blood sodium) in endurance athletes is most commonly caused by excessive consumption of plain water (overhydration) without replacing the sodium lost in sweat. This dilutes the sodium concentration in blood plasma. It is a particular risk during prolonged events such as marathons and triathlons. Sodium-containing sports drinks rather than plain water should be consumed during extended bouts of exercise to maintain electrolyte balance. CC A.2.1"
    },
    {
        id: "MC_A007", section: "A", subtopic: "A.2.2", level: "SL",
        question: "Which macronutrient ratio is most appropriate for an elite marathon runner?",
        options: ["A. 20% carbohydrate, 50% fat, 30% protein", "B. 55–75% carbohydrate, 20–35% fat, 10–15% protein", "C. 50% protein, 25% carbohydrate, 25% fat", "D. 45% fat, 35% carbohydrate, 20% protein"],
        answer: 1,
        explanation: "Endurance athletes such as marathon runners require a diet high in carbohydrates (55–75% of energy) to maximise muscle and liver glycogen stores, which are the primary fuel for sustained aerobic exercise. Fat provides 20–35% of energy and becomes increasingly important at lower intensities. Protein (10–15%) is needed for muscle repair but should not be a primary fuel source. High-fat or high-protein diets are inappropriate for optimal endurance performance. CC A.2.2"
    },
    {
        id: "MC_A008", section: "A", subtopic: "A.2.2", level: "SL",
        question: "Low glycaemic index (GI) carbohydrates are preferred before competition because they:",
        options: ["A. Are digested rapidly, spiking blood glucose for immediate energy", "B. Are absorbed slowly, providing sustained energy release", "C. Suppress insulin secretion entirely", "D. Convert directly to protein for muscle repair"],
        answer: 1,
        explanation: "Low GI carbohydrates (e.g. oats, wholegrain bread, legumes) are digested and absorbed slowly, causing a gradual and sustained rise in blood glucose. This prevents the sharp spike-and-crash cycle associated with high-GI foods and provides a steady fuel supply throughout a competition. High-GI foods may cause reactive hypoglycaemia (a drop in blood glucose) which can impair performance. CC A.2.2"
    },
    {
        id: "MC_A009", section: "A", subtopic: "A.2.3", level: "SL",
        question: "The ATP-PC energy system provides ATP for approximately how long during maximal effort?",
        options: ["A. 2–3 minutes", "B. 30–60 seconds", "C. 10–15 seconds", "D. 5–8 minutes"],
        answer: 2,
        explanation: "The ATP-PC (phosphocreatine) system provides an immediate, powerful supply of ATP anaerobically by transferring a phosphate group from creatine phosphate (PC) to ADP. However, PC stores in the muscle are very limited and are depleted within approximately 10–15 seconds of maximal effort. This system dominates during explosive activities such as sprinting, jumping and throwing. After depletion, the lactic acid system takes over. CC A.2.3"
    },
    {
        id: "MC_A010", section: "A", subtopic: "A.2.3", level: "SL",
        question: "Which enzyme controls the ATP-PC energy system?",
        options: ["A. Lactate dehydrogenase", "B. Creatine kinase", "C. Phosphofructokinase", "D. Pyruvate dehydrogenase"],
        answer: 1,
        explanation: "Creatine kinase (CK) is the enzyme that catalyses the transfer of a phosphate group from phosphocreatine (PC) to ADP to resynthesise ATP in the ATP-PC system: PC + ADP → C + ATP. Lactate dehydrogenase converts pyruvate to lactate in the lactic acid system. Phosphofructokinase (PFK) is a key regulatory enzyme in glycolysis. Pyruvate dehydrogenase converts pyruvate to acetyl-CoA for entry into the Krebs cycle. CC A.2.3"
    },
    {
        id: "MC_A011", section: "A", subtopic: "A.2.3", level: "SL",
        question: "A respiratory exchange ratio (RER) of 1.0 indicates that the predominant fuel source is:",
        options: ["A. Fat", "B. Protein", "C. Carbohydrate", "D. Creatine phosphate"],
        answer: 2,
        explanation: "The RER (ratio of CO₂ produced to O₂ consumed: VCO₂/VO₂) indicates the fuel being metabolised. Carbohydrate oxidation produces an equal volume of CO₂ to O₂ consumed, giving an RER of 1.0. Fat oxidation yields an RER of ~0.7 because fats require proportionally more O₂. Values between 0.7 and 1.0 indicate mixed fuel use. RER > 1.0 indicates anaerobic contribution with CO₂ being produced from bicarbonate buffering of lactic acid. Creatine phosphate is not measured by RER. CC A.2.3"
    },
    {
        id: "MC_A012", section: "A", subtopic: "A.3.1", level: "SL",
        question: "The training principle that states the body must be subjected to greater stress than normal to improve fitness is called:",
        options: ["A. Specificity", "B. Reversibility", "C. Progressive overload", "D. Periodization"],
        answer: 2,
        explanation: "Progressive overload is the principle that in order for fitness adaptations to occur, the training stimulus must exceed the body's current capacity and be gradually increased over time. This can be achieved by increasing intensity, duration, frequency or volume. Without progressive overload, the body adapts to the existing stimulus and improvement plateaus. Specificity refers to training for the demands of the sport; reversibility describes the loss of fitness when training stops. CC A.3.1"
    },
    {
        id: "MC_A013", section: "A", subtopic: "A.3.2", level: "SL",
        question: "Which cardiovascular adaptation is a long-term benefit of regular aerobic training?",
        options: ["A. Increased resting heart rate", "B. Decreased stroke volume", "C. Increased cardiac output at rest", "D. Increased stroke volume at rest"],
        answer: 3,
        explanation: "Regular aerobic training causes cardiac hypertrophy — the heart muscle (especially the left ventricle) becomes larger and stronger. This increases stroke volume (the volume of blood ejected per beat). As a result, resting heart rate decreases (bradycardia) because each beat is more efficient. Cardiac output (HR × SV) at rest remains similar but is achieved with a lower heart rate and higher stroke volume. Increased resting HR and decreased SV are the opposite of what training produces. CC A.3.2"
    },
    {
        id: "MC_A014", section: "A", subtopic: "A.3.3", level: "SL",
        question: "EPOC stands for:",
        options: ["A. Excess Post-exercise Oxygen Consumption", "B. Enhanced Pulmonary Oxygen Capacity", "C. Elevated Partial pressure Oxygen Count", "D. Exercise-Produced Oxidative Concentration"],
        answer: 0,
        explanation: "EPOC — Excess Post-exercise Oxygen Consumption — refers to the elevated rate of oxygen intake that continues after exercise has ended. During recovery, the body uses this extra O₂ to: replenish depleted ATP and phosphocreatine stores, remove and oxidise accumulated lactate, restore oxygen bound to myoglobin and haemoglobin, and return body temperature and hormone levels to resting values. EPOC is greater after high-intensity exercise than after low-intensity work. CC A.3.3"
    },
    {
        id: "MC_A015", section: "A", subtopic: "A.3.3", level: "SL",
        question: "VO₂ max is best described as:",
        options: ["A. The maximum volume of CO₂ a person can expire per minute", "B. The maximum rate at which the body can take in, transport and utilise oxygen", "C. The minimum oxygen consumption required for resting metabolism", "D. The volume of oxygen used per heartbeat"],
        answer: 1,
        explanation: "VO₂ max (maximal oxygen uptake) is the gold-standard measure of aerobic fitness. It represents the maximum rate (in mL·kg⁻¹·min⁻¹ or L·min⁻¹) at which the cardiovascular and respiratory systems can deliver oxygen to, and the muscles can utilise oxygen for, energy production. Elite endurance athletes have very high VO₂ max values; sedentary individuals have lower values. It is limited by cardiac output, oxygen-carrying capacity of the blood, and mitochondrial density in muscle. CC A.3.3"
    },

    // ── SECTION B ──────────────────────────────────────────────────────────────
    {
        id: "MC_B001", section: "B", subtopic: "B.1.1", level: "SL",
        question: "Abduction is defined as movement:",
        options: ["A. Toward the midline of the body", "B. Decreasing the angle at a joint", "C. Away from the midline of the body", "D. Rotating around a longitudinal axis"],
        answer: 2,
        explanation: "Abduction is movement of a segment away from the midline of the body (think: ABduction = moving Away). For example, raising the arm laterally from the side of the body, or spreading the fingers apart. The opposite movement — toward the midline — is adduction. Flexion and extension refer to decreasing and increasing the joint angle, respectively. Rotation describes movement around a longitudinal axis. CC B.1.1"
    },
    {
        id: "MC_B002", section: "B", subtopic: "B.1.1", level: "SL",
        question: "The sagittal plane divides the body into:",
        options: ["A. Upper and lower halves", "B. Front and back halves", "C. Left and right halves", "D. Proximal and distal segments"],
        answer: 2,
        explanation: "The sagittal plane (also called the anterior-posterior plane) is a vertical plane that divides the body into left and right halves. Movements in the sagittal plane include flexion and extension (e.g. bicep curl, running). The frontal (coronal) plane divides the body into front and back and includes abduction and adduction. The transverse (horizontal) plane divides the body into upper and lower halves and includes rotational movements. CC B.1.1"
    },
    {
        id: "MC_B003", section: "B", subtopic: "B.1.2", level: "SL",
        question: "Which structural feature of a synovial joint lubricates the articular cartilage?",
        options: ["A. Periosteum", "B. Synovial fluid", "C. Ligament", "D. Tendon"],
        answer: 1,
        explanation: "Synovial fluid is a viscous fluid secreted by the synovial membrane that lines the joint capsule. It lubricates the articular cartilage surfaces (reducing friction), nourishes the avascular cartilage by diffusion, and acts as a shock absorber. The periosteum is the connective tissue sheath covering bone. Ligaments connect bone to bone and stabilise the joint. Tendons connect muscle to bone. None of these produce lubrication. CC B.1.2"
    },
    {
        id: "MC_B004", section: "B", subtopic: "B.1.2", level: "SL",
        question: "Tendons connect:",
        options: ["A. Bone to bone", "B. Muscle to bone", "C. Cartilage to bone", "D. Ligament to muscle"],
        answer: 1,
        explanation: "Tendons are dense, fibrous connective tissue structures that attach muscle to bone, transmitting the force produced by muscle contraction to the skeletal system to produce movement. Ligaments, by contrast, connect bone to bone and provide joint stability. Tendons are composed primarily of collagen fibres arranged in parallel, making them strong but relatively inelastic. This is important to distinguish as both tendons and ligaments are composed of fibrous connective tissue. CC B.1.2"
    },
    {
        id: "MC_B005", section: "B", subtopic: "B.1.3", level: "SL",
        question: "Which muscle fibre type has the highest resistance to fatigue?",
        options: ["A. Type IIX (fast glycolytic)", "B. Type IIa (fast oxidative glycolytic)", "C. Type I (slow oxidative)", "D. Type IIb (fast twitch)"],
        answer: 2,
        explanation: "Type I (slow oxidative) muscle fibres have the highest fatigue resistance. They contain many mitochondria, a rich capillary supply, and high myoglobin content, enabling sustained aerobic ATP production. They contract slowly with low force output but are ideal for endurance activities. Type IIa fibres are intermediate (moderately fatigue-resistant), while Type IIX (fast glycolytic) fibres fatigue rapidly because they rely on anaerobic glycolysis with limited mitochondria. CC B.1.3"
    },
    {
        id: "MC_B006", section: "B", subtopic: "B.1.3", level: "SL",
        question: "During the sliding filament theory, calcium ions cause contraction by:",
        options: ["A. Directly binding to myosin heads to initiate cross-bridge formation", "B. Binding to troponin, which moves tropomyosin to expose actin binding sites", "C. Releasing ATP from the sarcoplasmic reticulum", "D. Stimulating acetylcholine release at the neuromuscular junction"],
        answer: 1,
        explanation: "When an action potential travels down the T-tubules, it triggers the sarcoplasmic reticulum to release Ca²⁺ ions. These calcium ions bind to troponin (a regulatory protein on the thin filament), causing a conformational change that moves tropomyosin away from the myosin-binding sites on actin. This exposes the active sites, allowing myosin heads to attach and form cross-bridges, initiating the power stroke and muscle contraction. Calcium binds to troponin — not myosin. CC B.1.3"
    },
    {
        id: "MC_B007", section: "B", subtopic: "B.1.3", level: "SL",
        question: "In a bicep curl, which muscle acts as the agonist during the upward (concentric) phase?",
        options: ["A. Triceps brachii", "B. Deltoid", "C. Biceps brachii", "D. Brachioradialis"],
        answer: 2,
        explanation: "The agonist (prime mover) is the muscle that contracts concentrically to produce the primary movement. During the upward (concentric) phase of a bicep curl — elbow flexion — the biceps brachii is the agonist. The triceps brachii acts as the antagonist (relaxing to allow flexion) and is the agonist during the downward extension phase. The deltoid abducts and flexes the shoulder and is not the primary mover in elbow flexion. CC B.1.3"
    },
    {
        id: "MC_B008", section: "B", subtopic: "B.1.4", level: "SL",
        question: "In a third-class lever, the effort is located:",
        options: ["A. At the far end, beyond the load", "B. Between the fulcrum and the load", "C. At the same point as the load", "D. On the opposite side of the fulcrum from the load"],
        answer: 1,
        explanation: "In a third-class lever, the effort (force) is applied between the fulcrum and the load (resistance). This is the most common lever system in the human body — for example, the bicep curl (fulcrum = elbow joint, effort = biceps insertion, load = weight in hand). Third-class levers are always at a mechanical disadvantage (effort arm < load arm), meaning more muscular force is needed, but the trade-off is a greater range and speed of movement at the end of the limb. CC B.1.4"
    },
    {
        id: "MC_B009", section: "B", subtopic: "B.2.1", level: "SL",
        question: "Newton's second law of motion (F = ma) states that:",
        options: ["A. Every action has an equal and opposite reaction", "B. A body at rest remains at rest unless acted upon by a net force", "C. The acceleration of a body is proportional to the net force applied and inversely proportional to its mass", "D. Angular momentum is conserved unless an external torque acts"],
        answer: 2,
        explanation: "Newton's Second Law (the Law of Acceleration) states that the acceleration of an object is directly proportional to the net force applied to it and inversely proportional to its mass: F = ma. In sport this means a heavier athlete requires more force to accelerate at the same rate as a lighter athlete, and a greater muscular force produces a greater acceleration. Option A is Newton's Third Law. Option B is Newton's First Law (inertia). Angular momentum conservation is a separate principle. CC B.2.1"
    },
    {
        id: "MC_B010", section: "B", subtopic: "B.2.2", level: "HL",
        question: "The diagram shows a luge athlete. Which of the following would most significantly reduce the drag force acting on the athlete?",
        image: "images/HL1AQ25.png",
        options: ["A. Increasing the cross-sectional area", "B. Wearing a rougher surface suit", "C. Maintaining a more streamlined body position", "D. Increasing the height of the sled"],
        answer: 2,
        explanation: "Drag is influenced by cross-sectional area, surface roughness, and body shape (streamlining). A more streamlined body position reduces the amount of air displacement and turbulence behind the athlete (form drag), thereby reducing the total drag force. CC B.2.2"
    },
    {
        id: "MC_B011", section: "B", subtopic: "B.2.1", level: "SL",
        question: "The diagram shows four different rugby tackle positions. Which position provides the most stability for the tackler?",
        image: "images/HL1AQ26.png",
        options: ["A. Position A", "B. Position B", "C. Position C", "D. Position D"],
        answer: 2,
        explanation: "Stability is maximized when the center of mass is low and the base of support is wide. In position C, the tackler has a low center of mass and both feet firmly planted, creating a stable base to resist the force of the opponent. CC B.2.1"
    },
    {
        id: "MC_B011_MAGNUS", section: "B", subtopic: "B.2.2", level: "HL",
        question: "The Magnus effect explains why a spinning ball curves because:",
        options: ["A. Spin increases the ball's mass momentarily", "B. Differential air velocity around the ball creates a pressure difference", "C. The ball's surface heats during flight, changing air density", "D. Gravity acts unevenly on a rotating object"],
        answer: 1,
        explanation: "The Magnus effect occurs when a spinning ball creates unequal air velocities on opposite sides. On the side where the ball's surface moves in the same direction as the airflow, air speeds up; on the opposite side, air slows down. By Bernoulli's principle, faster-moving air has lower pressure. The resulting pressure difference produces a net force (the Magnus force) that curves the ball toward the low-pressure side. Topspin causes the ball to dip; backspin causes it to rise. This is exploited in tennis, football, and cricket. CC B.2.2"
    },
    {
        id: "MC_B012", section: "B", subtopic: "B.2.3", level: "SL",
        question: "A spinning figure skater pulls their arms inward. Their angular velocity will:",
        options: ["A. Decrease, because moment of inertia decreases", "B. Increase, because moment of inertia decreases", "C. Remain the same, as angular momentum is constant", "D. Decrease, because angular momentum decreases"],
        answer: 1,
        explanation: "This demonstrates the conservation of angular momentum: L = I × ω (angular momentum = moment of inertia × angular velocity). If no external torque acts, angular momentum remains constant. When the skater pulls their arms inward, the moment of inertia (I) decreases (mass is closer to the axis of rotation). To keep L constant, angular velocity (ω) must increase. This is why ice skaters spin faster as they bring their arms in — the same principle applies to gymnasts and divers. CC B.2.3"
    },
    {
        id: "MC_B013", section: "B", subtopic: "B.3.1", level: "SL",
        question: "A chronic injury is best described as:",
        options: ["A. A sudden onset injury from direct impact", "B. An injury that develops gradually over time due to overuse", "C. An injury that heals completely within 48 hours", "D. A fracture caused by a single traumatic event"],
        answer: 1,
        explanation: "A chronic injury develops gradually as a result of repetitive stress or overuse, rather than a single traumatic event. Examples include tendinitis (patellar, Achilles), stress fractures, and shin splints. Symptoms typically worsen over time if training load is not modified. Chronic injuries are common in athletes who rapidly increase training volume or who have poor biomechanics. An acute injury, in contrast, has sudden onset (e.g. a sprained ankle or muscle tear from a single incident). CC B.3.1"
    },
    {
        id: "MC_B014", section: "B", subtopic: "B.3.2", level: "SL",
        question: "The RICE protocol for acute injury management stands for:",
        options: ["A. Rest, Ice, Compression, Elevation", "B. Run, Ice, Cardio, Elevation", "C. Rest, Inflammation, Compression, Exercise", "D. Resistance, Ice, Cooling, Elevation"],
        answer: 0,
        explanation: "RICE is the standard first-aid protocol for acute soft-tissue injuries: Rest (stop activity to prevent further damage), Ice (apply ice wrapped in cloth for 15–20 min to reduce swelling and pain via vasoconstriction), Compression (wrap the injury to limit swelling), and Elevation (raise the limb above heart level to reduce blood pooling and swelling). More recent guidelines have updated this to PRICE (Protection added) or PEACE & LOVE, but RICE remains the foundational approach tested in IB SEHS. CC B.3.2"
    },

    // ── SECTION C ──────────────────────────────────────────────────────────────
    {
        id: "MC_C001", section: "C", subtopic: "C.1.1", level: "SL",
        question: "According to trait theory, personality traits are:",
        options: ["A. Acquired only through social experience and environment", "B. Stable, enduring characteristics that are largely consistent across situations", "C. Determined entirely by the outcome of a specific competition", "D. Temporary states that vary widely from moment to moment"],
        answer: 1,
        explanation: "Trait theory (associated with Cattell and Eysenck) proposes that personality is made up of stable, consistent dispositions (traits) that are relatively fixed across situations and time, and have a genetic basis. For example, an individual high in extraversion will generally be more outgoing whether in training or competition. This contrasts with interactionist theory, which acknowledges that behaviour is influenced by both stable traits and situational factors. Temporary states (like current mood) are distinct from enduring traits. CC C.1.1"
    },
    {
        id: "MC_C002", section: "C", subtopic: "C.1.2", level: "SL",
        question: "Somatic anxiety refers to:",
        options: ["A. Negative thoughts and worry about performance", "B. Physical symptoms such as increased heart rate, sweating and nausea", "C. Loss of concentration during competition", "D. Reduced motivation caused by past failures"],
        answer: 1,
        explanation: "Anxiety has two components: cognitive and somatic. Somatic anxiety refers to the physiological (physical) symptoms of anxiety — increased heart rate, muscle tension, nausea, butterflies in the stomach, sweating and trembling. These physical sensations arise from activation of the sympathetic nervous system. Cognitive anxiety involves the mental aspect: negative thoughts, self-doubt, worry about performance outcomes, and loss of concentration. Both types can impair performance if they are excessive. CC C.1.2"
    },
    {
        id: "MC_C003", section: "C", subtopic: "C.2.1", level: "SL",
        question: "The autonomous stage of the Fitts and Posner model is characterised by:",
        options: ["A. High error rate and conscious attention to every movement", "B. Skill execution that is automatic with very little conscious attention required", "C. Rapid improvement in accuracy and reduced errors", "D. Heavy reliance on external feedback from a coach"],
        answer: 1,
        explanation: "The Fitts and Posner model describes three stages of motor learning: (1) Cognitive — the beginner consciously thinks about each movement, makes many errors, and relies heavily on feedback; (2) Associative — the learner practises and refines the skill, errors decrease; (3) Autonomous — the skill is largely automatic, requiring minimal conscious attention. Expert athletes are largely in the autonomous stage, freeing attentional resources to focus on tactics, opponents and game context rather than mechanics. CC C.2.1"
    },
    {
        id: "MC_C004", section: "C", subtopic: "C.2.1", level: "SL",
        question: "Positive transfer occurs when:",
        options: ["A. A previously learned skill hinders the learning of a new skill", "B. A previously learned skill benefits or improves the learning of a new skill", "C. Training transfers from one athlete to another through observation", "D. Massed practice transfers to a distributed practice schedule"],
        answer: 1,
        explanation: "Transfer of learning refers to the influence that learning one skill has on learning another. Positive transfer occurs when a previously learned skill facilitates (helps) the acquisition of a new skill because the two share similar movement patterns or cognitive elements. For example, a badminton player may find it easier to learn tennis because of overlapping footwork and racket-control skills. Negative transfer is the opposite — where a prior skill interferes with learning (e.g. different grip or swing mechanics causing confusion). CC C.2.1"
    },
    {
        id: "MC_C005", section: "C", subtopic: "C.2.2", level: "SL",
        question: "Which type of feedback gives information about the quality of the movement itself (rather than its outcome)?",
        options: ["A. Knowledge of results", "B. Extrinsic feedback", "C. Knowledge of performance", "D. Terminal feedback"],
        answer: 2,
        explanation: "Knowledge of performance (KP) provides information about the quality, mechanics or process of the movement — for example, a coach telling an athlete 'your elbow was too low on the backswing.' This is contrasted with knowledge of results (KR), which provides information about the outcome of the movement (e.g. 'the ball went 5 metres to the left'). Both are types of extrinsic (augmented) feedback — provided by an external source rather than the athlete's own sensory system (intrinsic feedback). CC C.2.2"
    },
    {
        id: "MC_C006", section: "C", subtopic: "C.3.1", level: "SL",
        question: "An athlete high in NACH (need to achieve) is most likely to:",
        options: ["A. Avoid challenging situations to protect their self-image", "B. Seek out challenging tasks and persist when facing setbacks", "C. Rely entirely on extrinsic rewards such as medals and trophies", "D. Perform best only when anxiety is very low"],
        answer: 1,
        explanation: "Atkinson's Achievement Motivation Theory describes two competing motives: NACH (need to achieve / need to succeed) and NAF (need to avoid failure). Athletes high in NACH approach challenging tasks with confidence, set moderately difficult goals, are outcome-focused, and persist after setbacks because they view failure as informative. Athletes high in NAF tend to avoid challenging tasks, set very easy or very difficult goals (to minimise blame), and give up easily. NACH athletes are generally better performers over time. CC C.3.1"
    },
    {
        id: "MC_C007", section: "C", subtopic: "C.3.2", level: "SL",
        question: "According to self-determination theory, which three basic psychological needs must be met to foster intrinsic motivation?",
        options: ["A. Achievement, recognition, and social status", "B. Autonomy, competence, and relatedness", "C. Goal-setting, imagery, and self-talk", "D. Arousal, motivation, and attention"],
        answer: 1,
        explanation: "Self-Determination Theory (Deci & Ryan) proposes that intrinsic motivation flourishes when three universal psychological needs are satisfied: Autonomy (feeling in control of one's own choices and actions), Competence (feeling capable and effective in the activity), and Relatedness (feeling connected to and valued by others). When coaches support these needs — offering choice, providing mastery opportunities and fostering team belonging — athletes are more intrinsically motivated, leading to better performance and greater wellbeing. CC C.3.2"
    },
    {
        id: "MC_C008", section: "C", subtopic: "C.3.3", level: "SL",
        question: "In a mastery motivational climate, success is defined by:",
        options: ["A. Beating opponents and finishing in first place", "B. Earning the most financial rewards", "C. Personal improvement and task mastery", "D. Receiving the highest rating from a coach"],
        answer: 2,
        explanation: "Motivational climate theory (Ames) distinguishes two coaching environments. A mastery (task-involving) climate defines success through personal improvement, effort and skill mastery — athletes are judged against their own previous standards. A performance (ego-involving) climate defines success through social comparison — winning, being better than others. Mastery climates are associated with greater intrinsic motivation, positive affect, effort and long-term participation. Performance climates increase anxiety and dropout, especially in lower-ability athletes. CC C.3.3"
    },
    {
        id: "MC_C009", section: "C", subtopic: "C.4.1", level: "SL",
        question: "The inverted-U hypothesis predicts that sports performance is optimal when arousal is:",
        options: ["A. At its maximum", "B. At its minimum", "C. At a moderate level", "D. Rapidly increasing"],
        answer: 2,
        explanation: "The inverted-U hypothesis (Yerkes-Dodson Law) predicts a curvilinear relationship between arousal and performance. At low arousal, performance is poor (insufficient drive). As arousal increases toward an optimal level, performance improves. Beyond that optimal point, further increases in arousal cause performance to deteriorate (over-arousal leads to anxiety, distraction and muscular tension). The optimal level of arousal differs between individuals and tasks — simple, gross-motor tasks benefit from higher arousal; complex, fine-motor tasks are impaired by high arousal. CC C.4.1"
    },
    {
        id: "MC_C010", section: "C", subtopic: "C.4.2", level: "SL",
        question: "Progressive muscle relaxation is used to manage which type of anxiety?",
        options: ["A. Cognitive anxiety", "B. Somatic anxiety", "C. Trait anxiety", "D. State anxiety arising from referees"],
        answer: 1,
        explanation: "Progressive muscle relaxation (PMR), developed by Jacobsen, involves systematically tensing and then relaxing specific muscle groups, helping the athlete recognise and release physical tension. It directly targets somatic (physical) anxiety — the physiological symptoms such as muscle tightness, trembling and elevated heart rate. Cognitive anxiety (worry and negative thoughts) is better addressed through cognitive techniques such as positive self-talk, cognitive reframing and meditation. Using both techniques together addresses the full spectrum of pre-competition anxiety. CC C.4.2"
    },
    {
        id: "MC_C011", section: "C", subtopic: "C.5.1", level: "SL",
        question: "Which of the following is an example of a PROCESS goal?",
        options: ["A. Win the national championship", "B. Run 100 m in under 11 seconds by the end of season", "C. Focus on knee-drive technique during the first 30 metres of each sprint", "D. Score more points than any other player this season"],
        answer: 2,
        explanation: "Goals can be classified as: Outcome goals (focused on competitive results relative to others: e.g. win the race), Performance goals (focused on achieving a personal performance standard: e.g. run sub-11 s), and Process goals (focused on the specific actions and techniques during performance: e.g. concentrate on knee drive). Process goals are most controllable and are particularly effective at managing anxiety and maintaining focus during competition. A well-structured psychological skills programme should include all three types. CC C.5.1"
    },
    {
        id: "MC_C012", section: "C", subtopic: "C.5.2", level: "SL",
        question: "The acquisition phase of a Psychological Skills Training (PST) programme involves:",
        options: ["A. Identifying an athlete's psychological needs and educating them about mental skills", "B. Developing and practising individual psychological strategies tailored to the athlete", "C. Applying psychological skills automatically in competition without conscious thought", "D. Evaluating the long-term effectiveness of the programme"],
        answer: 1,
        explanation: "PST programmes typically involve three phases: (1) Education phase — the athlete learns about the importance of psychological skills and identifies which areas need development; (2) Acquisition phase — specific strategies are introduced, practised and tailored to the individual (e.g. imagery scripts, relaxation routines, self-talk cues); (3) Practice phase — these skills are integrated into training and then competition until they become automatic. The acquisition phase is about learning and refining individual techniques, not yet applying them automatically in competition. CC C.5.2"
    }
];

window.mcQuestions = mcQuestions;
