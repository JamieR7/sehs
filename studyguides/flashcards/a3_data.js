const a3Params = {
    containerId: 'flashcard-app-root',
    data: [
        { question: "Outline the role of chemoreceptors in the nervous control of heart rate.", answer: "They detect an increase in blood acidity or CO2 concentration to trigger a stimulus for heart rate increase." },
        { question: "Explain how epinephrine increases cardiac output during exercise.", answer: "It increases the force of contraction in the myocardium, leading to a higher stroke volume." },
        { question: "Calculate the percentage change in performance if a runner improves their time from 40.05 s to 38.98 s.", answer: "((40.05 - 38.98) / 40.05) × 100 = 2.67 %" },
        { question: "Discuss why a generalization cannot be drawn from performance studies with insufficient data sets.", answer: "Variation in factors like the female menstrual cycle, mental health status, and circadian rhythms can impact results." },
        { question: "Explain why a lower mean VO2 for a specific shoe at a given speed suggests better running economy.", answer: "It indicates that the athlete is consuming less oxygen to maintain the same rate of energy production." },
        { question: "Identify one strength and one limitation of using non-randomized parametric data sets in sports science.", answer: "Strength: provides two large sets of ratio data; Limitation: the sample is not representative of the general population." },
        { question: "Calculate the acceleration of a bobsled that reaches 12 m s⁻¹ from rest in 6 seconds.", answer: "a = (12 - 0) / 6 = 2 m s⁻²" },
        { question: "Explain how Newton's second law relates to the reduction of concussion risk through protective headgear.", answer: "The gear allows for a gradual reduction of speed upon impact, which decreases the resultant force on the head." },
        { question: "Distinguish between outcome goals and performance goals.", answer: "Outcome goals are norm-referenced objective results, while performance goals are self-referenced measurable targets." },
        { question: "Explain the relationship between muscle strength and muscle power during a bobsled push-off.", answer: "Strength training increases maximal force, providing more potential to increase the rate of work performed (power)." },
        { question: "List three strategies for heat acclimation prior to competing in a desert environment.", answer: "Training in similar conditions for >5 days, using an environmental chamber, and initially reducing training intensity." },
        { question: "Outline the 'reversibility' principle of training.", answer: "It states that physiological adaptations achieved through training will be lost if the training stimulus is removed." },
        { question: "Explain why breathing remains elevated during recovery according to the concept of EPOC.", answer: "The body must pay back the oxygen deficit incurred at the start of exercise to restore PCr and clear lactate." },
        { question: "Describe the ATP-CP system's mechanism for energy production.", answer: "Creatine kinase breaks down PCr, and the freed inorganic phosphate (Pi) combines with ADP to form 1 ATP." },
        { question: "Distinguish between anaerobic glycolysis and the aerobic system in terms of oxygen requirement.", answer: "Anaerobic glycolysis breaks down glucose without oxygen, whereas the aerobic system requires oxygen in the mitochondria." },
        { question: "Define 'overreaching' as a training concept.", answer: "A systematic attempt to intentionally overstress the body for a short period to induce supercompensation." },
        { question: "Identify the agonist and antagonist muscles at the knee joint during the extension phase of a jump.", answer: "Agonist: Quadriceps (Rectus femoris); Antagonist: Hamstrings." },
        { question: "Outline the 'Return to School' protocol following a concussion (Steps 3 and 4).", answer: "Step 3: Return part-time with rest breaks; Step 4: Return full-time to all academic activities." },
        { question: "Explain how protective equipment like eyewear in field hockey prevents injury from a biomechanical perspective.", answer: "It absorbs and minimizes the excessive impact forces experienced by the athlete during a collision." },
        { question: "Discuss the ethical requirement of confidentiality in sports psychology research.", answer: "Participants have a right to privacy, ensuring their individual results are not identified without permission." },
        { question: "State the formula for calculating friction force (Ff).", answer: "Ff = μR (Coefficient of friction × Normal reaction force)" },
        { question: "Explain the role of calcium ions in the sliding filament theory.", answer: "They bind to troponin, causing it to change shape and expose the active binding sites on the actin filament." },
        { question: "Outline how the 'overjustification effect' can impact an athlete's motivation.", answer: "External rewards like money can diminish an athlete's internal drive or intrinsic motivation for the sport." },
        { question: "Discuss the impact of regular exercise on bone density.", answer: "Exercise preserves bone mass, which reduces the risk of osteoporosis and fractures later in life." },
        { question: "Identify the primary hormone responsible for increasing blood glucose during the 'fight or flight' response.", answer: "Glucagon (or Epinephrine)." },
        { question: "Explain the significance of 'specificity' in training programme design.", answer: "It ensures the training stimulus matches the physiological and biomechanical demands of the target activity." },
        { question: "Calculate the cardiac output (Q) of an athlete with a heart rate of 140 bpm and a stroke volume of 75 mL.", answer: "140 × 75 = 10,500 mL min⁻¹ (or 10.5 L min⁻¹)" },
        { question: "Describe the physiological benefits of a warm-up routine.", answer: "It increases core body temperature and blood flow, leading to increased muscle elasticity and range of motion." },
        { question: "Explain the role of the 'Purkinje fibres' in the heart structure.", answer: "They carry the electrical impulse through the ventricles to ensure a coordinated and powerful contraction." },
        { question: "Define 'anthropometry' and state one of its applications.", answer: "The measurement of human body proportions; used in the ergonomic design of sporting equipment." },
        { question: "Outline two consequences of a weakened immune system due to disrupted homeostasis.", answer: "Increased susceptibility to infections and slower recovery times from training or injury." },
        { question: "Explain how 'self-talk' serves as a psychological skill for athletes.", answer: "It alters emotional responses to stressors and helps maintain focus by recalling past positive experiences." },
        { question: "State the command term for: 'Give a specific name, value or other brief answer without explanation'.", answer: "State." },
        { question: "Distinguish between a 'first-class' and a 'second-class' lever.", answer: "A first-class lever has the fulcrum in the middle, whereas a second-class lever has the load in the middle." },
        { question: "Discuss the relationship between physical activity and type 2 diabetes risk.", answer: "Exercise lowers risk by improving insulin sensitivity and helping to maintain a healthy body fat percentage." },
        { question: "Identify the location of the 'adrenal cortex' within the endocrine system.", answer: "It is located on the superior surface of the kidneys." },
        { question: "Explain why 'progressive overload' is essential for improving sporting performance.", answer: "The body must be gradually and systematically stressed beyond its current capacity to trigger physiological adaptations." },
        { question: "Outline the 'luteal phase' of the menstrual cycle in terms of hormonal dominance.", answer: "It is the phase after ovulation where the corpus luteum produces high levels of progesterone." },
        { question: "State the SI unit for force and the SI unit for power.", answer: "Force: Newtons (N); Power: Watts (W)." },
        { question: "Explain how the 'sliding filament theory' accounts for the shortening of a sarcomere.", answer: "Myosin heads pull actin filaments toward the center, decreasing the distance between Z-lines." }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    new FlashcardApp(a3Params);
});
