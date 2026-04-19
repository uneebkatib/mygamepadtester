// Xbox Elite Series 2 Battery Replacement
export const xboxElite2BatteryContent = { meta: { title: "Xbox Elite Series 2 Battery Replacement | Complete Guide 2026", description: "Replace the internal rechargeable battery on your Xbox Elite Series 2 controller. Fix poor battery life, swollen battery, and charging issues.", keywords: ["xbox elite series 2 battery replacement", "xbox elite 2 battery fix", "elite controller battery life", "xbox elite 2 wont charge"], readTime: "18 MIN READ", difficulty: "3/5", lastUpdated: "April 2026" }, hero: { title: "Xbox Elite Series 2 Battery Replacement", subtitle: "Replace the Internal Rechargeable Battery to Restore Full Battery Life", author: "Uneeb Katib | Hardware Diagnostic Specialist", experience: "6+ years in controller hardware analysis", publishedDate: "April 2026" }, sections: [
  { type: "introduction", content: "The Xbox Elite Series 2 controller uses an internal 1100mAh rechargeable lithium-ion battery, rated for up to 40 hours of play. After 2-3 years of regular charging cycles, this battery degrades: play time drops from 40 hours to 10-15 hours, the controller dies mid-session, or it refuses to hold a charge at all. Unlike the standard Xbox controller that uses replaceable AA batteries, the Elite 2's battery is soldered and glued inside. This guide shows you how to replace it safely." },
  { type: "h2", title: "What Causes Battery Degradation" },
  { type: "technical-box", title: "Lithium-Ion Battery Chemistry", items: ["Li-ion batteries lose capacity with every charge cycle (300-500 full cycles = 70-80% capacity)", "Heat accelerates degradation (charging while playing generates the most heat)", "Full discharge cycles (0% to 100%) wear batteries faster than partial cycles (20% to 80%)", "After 3 years of daily use, expect 50-60% of original capacity remaining"] },
  { type: "h2", title: "How to Confirm Battery Needs Replacement" },
  { type: "checklist", title: "Battery Degradation Symptoms", items: ["Play time dropped by 50% or more from when the controller was new", "Controller shuts off unexpectedly despite showing battery remaining", "Controller will not charge past a certain percentage", "Battery percentage jumps erratically (shows 60% then drops to 10%)", "Controller only works when connected via USB cable", "Battery area of controller feels warm or swollen"] },
  { type: "warning-box", title: "Swollen Battery Warning", content: "If the back of your controller feels puffy, rounded, or the grips are separating, the battery is swollen. This is a safety hazard. Stop using the controller immediately. Swollen lithium batteries can rupture or catch fire. Handle with care during removal." },
  { type: "h2", title: "Tools and Parts" },
  { type: "tools-grid", title: "Battery Replacement Kit", tools: [
    { name: "Replacement Battery (1100mAh, Elite 2 compatible)", purpose: "New lithium-ion cell", cost: "$12-20" },
    { name: "T6 Security Torx Screwdriver", purpose: "Controller screws", cost: "$5" },
    { name: "T8 Security Torx Screwdriver", purpose: "Grip panel screws", cost: "$5" },
    { name: "Plastic Spudger / iSesamo Tool", purpose: "Prying grip panels and battery", cost: "$5" },
    { name: "Soldering Iron (if battery is soldered)", purpose: "Disconnecting/reconnecting battery leads", cost: "$25-50" }
  ]},
  { type: "h2", title: "Step-by-Step Battery Replacement" },
  { type: "method-box", title: "Elite Series 2 Battery Replacement", subtitle: "Requires grip panel removal and careful battery extraction", steps: [
    { step: 1, title: "Remove the Grip Panels", content: "The rubber grip panels are glued in place. Heat them with a hair dryer at medium setting for 30-45 seconds to soften the adhesive. Starting from the bottom edge, use a plastic spudger to slowly peel each grip panel off. Work slowly to avoid tearing the rubber." },
    { step: 2, title: "Remove Internal Screws", content: "With grips removed, you will see additional T6 screws. Remove all visible screws. There are also screws under the bumper buttons and behind the faceplate." },
    { step: 3, title: "Open the Controller", content: "Carefully separate the front and back shell halves. The shells are connected by several ribbon cables (triggers, bumpers, main button board). Disconnect these carefully using the spudger to lift the cable locks on the ZIF connectors." },
    { step: 4, title: "Remove the Old Battery", content: "The battery is attached with adhesive tape and connected to the PCB via a small 2-pin connector or soldered leads. If it uses a connector, simply unplug it. If soldered, desolder the positive and negative leads. Carefully peel the battery from the adhesive holding it in place. If the battery is swollen, wrap it in electrical tape and dispose of it at a battery recycling center." },
    { step: 5, title: "Install the New Battery", content: "Connect the new battery to the same connector or solder the leads to the same pads (red to positive, black to negative). Secure the battery with double-sided adhesive tape. Ensure the battery sits flat and does not press against internal components." },
    { step: 6, title: "Reassemble and Test", content: "Reconnect all ribbon cables. Snap shell halves together. Reinstall all screws. Reattach grip panels using fresh adhesive or double-sided tape. Connect the controller via USB and charge for 2 hours. The controller should show charging indicator and reach 100%." }
  ]},
  { type: "h2", title: "How to Test If the Replacement Worked" },
  { type: "ordered-list", title: "Post-Replacement Verification", items: [
    { term: "Charge Test", desc: "Connect via USB. The controller should charge to 100% within 3-4 hours. The charging indicator light should function normally." },
    { term: "Drain Test", desc: "Fully charge, then use the controller wirelessly for an extended session. A new 1100mAh battery should provide 35-40 hours of use." },
    { term: "Stability Test", desc: "Use the controller wirelessly for 2-3 hours. It should maintain connection without unexpected shutdowns." },
    { term: "Button Test", desc: "Verify all buttons, paddles, and triggers still function correctly after reassembly." }
  ]},
  { type: "tool-callout", content: "After reassembly, run a full controller diagnostic to verify all inputs work", buttonText: "Run Full Controller Test", buttonLink: "/" },
  { type: "h2", title: "Related Guides and Next Steps" },
  { type: "related-guides", guides: [
    { title: "Xbox Elite Series 2 Stick Tension Adjustment", link: "/guides/microsoft/xbox-elite-series-2-gamepad/stick-tension-adjustment" },
    { title: "Xbox Elite Paddle Replacement", link: "/guides/microsoft/xbox-elite-series-gamepad/paddle-replacement" },
    { title: "DualSense Edge Repair", link: "/guides/sony/ps5-gamepad-dualsense-edge/dualsense-edge-repair" }
  ]},
  { type: "h2", title: "Frequently Asked Questions" },
  { type: "faq", questions: [
    { q: "Can I use a higher capacity battery in the Elite 2?", a: "Physically, a larger battery may not fit in the battery compartment. Electrically, the charging circuit is designed for 1100mAh cells. A higher capacity battery (1500-2000mAh) may charge slower and could potentially overheat the charging circuit. Stick with the OEM-specified capacity for safety." },
    { q: "How do I make the Elite 2 battery last longer?", a: "Charge between 20-80% when possible instead of full 0-100% cycles. Avoid playing while charging (generates heat). Turn off the controller when not in use. These practices can extend battery lifespan from 2 years to 4+ years." },
    { q: "Can I convert the Elite 2 to use AA batteries?", a: "Not without significant modification. The internal compartment is not designed for AA battery holders. Some third-party kits exist but they require permanent modifications to the controller. The intended design is the internal rechargeable cell." },
    { q: "Does battery replacement void the warranty?", a: "Yes. Opening the Elite 2 controller voids the Microsoft warranty. Since the Elite 2 launched in 2019, most standard warranties have expired. If you purchased Microsoft Complete coverage, check the terms." }
  ]},
  { type: "conclusion", content: "Elite Series 2 battery replacement restores the controller to its original 40-hour battery life. The $15 battery and 30-minute repair are far cheaper than buying a new $180 controller." },
  { type: "final-cta", title: "Test All Controller Inputs", content: "Verify buttons, sticks, triggers, and paddles all function after reassembly.", buttonText: "Start Controller Diagnostic", buttonLink: "/" }
]};

// Xbox Elite Series 2 Stick Tension Adjustment
export const xboxElite2StickTensionContent = { meta: { title: "Xbox Elite Series 2 Stick Tension Adjustment | Guide 2026", description: "Adjust analog stick tension on your Xbox Elite Series 2 controller. Use the interchangeable thumbstick tool and software configuration for optimal feel.", keywords: ["xbox elite series 2 stick tension", "elite controller stick adjustment", "xbox elite thumbstick swap", "elite 2 stick sensitivity"], readTime: "12 MIN READ", difficulty: "1/5", lastUpdated: "April 2026" }, hero: { title: "Xbox Elite Series 2 Stick Tension Adjustment", subtitle: "Customize Analog Stick Resistance and Feel for Your Play Style", author: "Uneeb Katib | Hardware Diagnostic Specialist", experience: "6+ years in controller hardware analysis", publishedDate: "April 2026" }, sections: [
  { type: "introduction", content: "The Xbox Elite Series 2 controller includes three interchangeable thumbstick types (standard, tall, dome) and an adjustable stick tension tool that lets you physically change how much force is required to move each stick. Combined with the Xbox Accessories app's software sensitivity curves, you have granular control over how your sticks feel and respond. This guide covers both the physical tension adjustment and the software configuration." },
  { type: "h2", title: "How Stick Tension Works on Elite 2" },
  { type: "technical-box", title: "Elite 2 Stick System", items: ["Magnetic thumbstick attachment allows tool-free stick swapping", "Physical tension adjustment tool (included in Elite 2 carrying case) turns the internal tension ring", "Three tension levels: light (fast flicks), medium (balanced), heavy (precise micro-aim)", "Software curves in Xbox Accessories app modify the digital response independent of physical tension"] },
  { type: "h2", title: "Step-by-Step Tension Adjustment" },
  { type: "method-box", title: "Physical Stick Tension Adjustment", subtitle: "No disassembly required. Uses the included tension tool.", steps: [
    { step: 1, title: "Remove the Thumbstick", content: "Pull the magnetic thumbstick straight up. It detaches with light force." },
    { step: 2, title: "Insert the Tension Tool", content: "Take the tension adjustment key from the Elite 2 carrying case. It is a small metal tool shaped like a thin stick with a key-shaped end. Insert it into the center of the stick well and press down slightly to engage." },
    { step: 3, title: "Adjust Tension", content: "Turn the tool clockwise to increase tension (heavier resistance). Turn counter-clockwise to decrease tension (lighter, faster movement). Make small adjustments: quarter-turns are enough to feel a difference." },
    { step: 4, title: "Reattach Thumbstick and Test", content: "Place the magnetic thumbstick back on. Move the stick to feel the new tension. Adjust further if needed. Set each stick independently: many players prefer light tension on the movement stick and heavy tension on the aim stick." }
  ]},
  { type: "h2", title: "Recommended Tension Settings by Game Type" },
  { type: "table", headers: ["Game Type", "Left Stick (Movement)", "Right Stick (Aim)", "Thumbstick Type"], rows: [
    ["FPS (CoD, Halo)", "Light", "Medium-Heavy", "Tall for aim stick"],
    ["Battle Royale (Apex, Fortnite)", "Light", "Medium", "Standard or tall"],
    ["Racing (Forza)", "Medium", "N/A (camera)", "Dome for steering"],
    ["Fighting (Street Fighter)", "Medium", "N/A", "Standard or dome"]
  ]},
  { type: "tool-callout", content: "After adjusting tension, test your stick accuracy and deadzone", buttonText: "Run Stick Drift Test", buttonLink: "/stick-drift-test" },
  { type: "h2", title: "Software Configuration" },
  { type: "paragraph", content: "Open the Xbox Accessories app and navigate to your Elite 2 profile. Under the stick configuration section, you can set independent sensitivity curves (Smooth, Instant, Aggressive, Delay, Default) for each stick. Combine physical tension (how the stick feels) with software curves (how the stick responds) for truly custom control." },
  { type: "h2", title: "Related Guides and Next Steps" },
  { type: "related-guides", guides: [
    { title: "Xbox Elite Series 2 Battery Replacement", link: "/guides/microsoft/xbox-elite-series-2-gamepad/battery-replacement" },
    { title: "Analog Stick Optimization", link: "/guides/controller-testing/gamepad-calibration/analog-stick-optimization" },
    { title: "Professional Calibration Methods", link: "/guides/controller-testing/gamepad-calibration/professional-calibration-methods" }
  ]},
  { type: "h2", title: "Frequently Asked Questions" },
  { type: "faq", questions: [
    { q: "Can stick tension adjustment fix drift on the Elite 2?", a: "No. Stick tension adjusts the physical resistance of the stick spring mechanism. Drift is caused by potentiometer wear inside the stick module. If your Elite 2 has drift, you need stick module replacement or cleaning, not tension adjustment." },
    { q: "What happens if I over-tighten the tension?", a: "Over-tightening makes the stick extremely stiff and difficult to push to full deflection. In extreme cases, you may not be able to reach 100% input in one or more directions. If you over-tighten, simply turn the tool counter-clockwise to reduce tension. The adjustment is fully reversible." },
    { q: "Do the different thumbstick shapes affect sensitivity?", a: "Yes, physically. Taller sticks provide more leverage, which means more precise control but slower maximum movement speed. Shorter dome sticks are faster to flick but harder to make micro-adjustments. The digital sensitivity curve from software applies on top of the physical properties." },
    { q: "Can I use Elite 2 thumbsticks on a standard Xbox controller?", a: "No. The Elite 2 uses a proprietary magnetic attachment system. Standard Xbox controllers use press-fit thumbstick caps on a different stem. The sticks are not interchangeable between Elite and standard controllers." }
  ]},
  { type: "conclusion", content: "Stick tension adjustment is one of the Elite 2's most underutilized features. Spending 5 minutes dialing in your preferred tension for each stick creates a noticeably more responsive and comfortable gaming experience." },
  { type: "final-cta", title: "Measure Your Stick Accuracy", content: "Verify your tension settings produce clean, accurate inputs with our diagnostic tools.", buttonText: "Start Stick Test", buttonLink: "/stick-drift-test" }
]};
