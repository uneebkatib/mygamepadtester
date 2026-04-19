// Xbox One S Fan Cleaning and Replacement
export const xboxOneSFanContent = {
  meta: { title: "Xbox One S Fan Cleaning & Replacement | Overheating Fix 2026", description: "Fix Xbox One S overheating with fan cleaning or replacement. Stop thermal shutdowns, reduce noise, and extend console lifespan.", keywords: ["xbox one s fan cleaning", "xbox one s overheating fix", "xbox one s fan replacement", "xbox one s loud fan"], readTime: "14 MIN READ", difficulty: "2/5", lastUpdated: "April 2026" },
  hero: { title: "Xbox One S Fan Cleaning & Replacement", subtitle: "Stop Overheating, Reduce Noise, and Prevent Thermal Shutdown", author: "Uneeb Katib | Hardware Diagnostic Specialist", experience: "6+ years in controller hardware analysis", publishedDate: "April 2026" },
  sections: [
    { type: "introduction", content: "The Xbox One S (model 1681) is a compact console with a single internal fan responsible for cooling the APU, RAM, and voltage regulators. After 3-5 years of use, dust accumulation restricts airflow, fan bearings wear out, and thermal paste dries up. The result: your console runs loud, overheats during demanding games, and eventually shuts down to protect itself. This guide covers cleaning, fan replacement, and thermal paste reapplication to restore your console's cooling performance." },
    { type: "h2", title: "What Causes Xbox One S Overheating" },
    { type: "technical-box", title: "Cooling System Components", items: ["Single 120mm centrifugal blower fan draws air across the heatsink", "Copper heatpipe transfers heat from APU to aluminum heatsink fins", "Thermal paste (factory-applied) bridges the gap between APU die and heatpipe contact plate", "Ventilation slots on top and side panels allow airflow in and out"] },
    { type: "paragraph", content: "Dust acts as an insulating blanket on heatsink fins, reducing their ability to transfer heat to the moving air. Simultaneously, the fan motor bearings degrade, reducing RPM and airflow. Combined with thermal paste that dries and cracks after 3-4 years, cooling efficiency can drop by 40-60%." },
    { type: "h2", title: "How to Confirm Your Console Is Overheating" },
    { type: "checklist", title: "Overheating Symptoms", items: ["Fan runs at maximum speed constantly (loud whirring noise)", "Console is hot to the touch on top panel", "Games stutter or framerate drops during intense scenes", "Console shuts down after 15-45 minutes of gaming", "Console displays overheating warning message on screen", "Console works fine for Netflix/YouTube but crashes during games"] },
    { type: "h2", title: "Tools and Parts You Will Need" },
    { type: "tools-grid", title: "Fan Cleaning/Replacement Kit", tools: [
      { name: "T9/T10 Torx Screwdriver", purpose: "Shell and RF shield screws", cost: "$5-10" },
      { name: "Compressed Air Can", purpose: "Blowing dust from heatsink and fan", cost: "$5-8" },
      { name: "Replacement Fan (OEM or aftermarket)", purpose: "If fan bearings are worn", cost: "$10-20" },
      { name: "Thermal Paste (Arctic MX-4 or Noctua NT-H1)", purpose: "Replacing dried factory paste", cost: "$5-10" },
      { name: "99% Isopropyl Alcohol + Lint-Free Wipes", purpose: "Cleaning old thermal paste", cost: "$5-8" },
      { name: "Soft Brush or Paintbrush", purpose: "Removing stubborn dust from fan blades", cost: "$2" }
    ]},
    { type: "h2", title: "Step-by-Step Fan Cleaning and Replacement" },
    { type: "method-box", title: "Phase 1: Cleaning (No Parts Needed)", subtitle: "Fixes 70% of overheating issues", steps: [
      { step: 1, title: "Open the Console", content: "Pry off the perforated side panel. Remove T9/T10 screws from the back and bottom. Separate the shell halves. Remove the metal RF shield screws and lift the shield." },
      { step: 2, title: "Clean the Fan", content: "Hold the fan blade in place with your finger (prevent spinning) and blast compressed air through it. Dust will blow out from the heatsink side. Repeat from multiple angles. For stubborn buildup, use a soft brush to dislodge caked dust from individual fan blades." },
      { step: 3, title: "Clean the Heatsink", content: "Direct compressed air through the heatsink fins from the fan side. Dust bunnies will exit through the ventilation slots. Continue until no more dust comes out. The fins should be visually clean with clear airflow channels." },
      { step: 4, title: "Reassemble and Test", content: "Reassemble the console and run a demanding game for 30 minutes. If the fan runs quieter and the console stays on without shutting down, the cleaning was sufficient." }
    ]},
    { type: "method-box", title: "Phase 2: Fan Replacement + Thermal Paste", subtitle: "For when cleaning does not solve the overheating or the fan is noisy", steps: [
      { step: 1, title: "Remove the Old Fan", content: "Disconnect the fan power cable from the motherboard (small 2-pin or 3-pin connector). Remove the screws holding the fan housing to the heatsink assembly. Lift the old fan out." },
      { step: 2, title: "Replace Thermal Paste (While You Are In Here)", content: "Remove the heatsink from the APU by unscrewing the spring-loaded retention screws (turn each one a quarter-turn at a time in a cross pattern to avoid cracking the die). Clean old thermal paste from the APU surface and heatsink contact plate using IPA and lint-free wipes. Apply a pea-sized dot of fresh thermal paste to the center of the APU. Reinstall the heatsink using the cross-pattern tightening method." },
      { step: 3, title: "Install New Fan", content: "Place the replacement fan in the housing. Secure with screws. Connect the power cable to the motherboard. Ensure the cable is routed away from the fan blades." },
      { step: 4, title: "Test Before Full Reassembly", content: "Power on the console with the shell still open. Verify the fan spins smoothly and quietly. Let it run for 15 minutes to confirm thermal paste makes good contact. The APU temperature should stabilize and the fan should not ramp to maximum speed during idle." }
    ]},
    { type: "h2", title: "How to Test If the Repair Worked" },
    { type: "ordered-list", title: "Post-Repair Verification", items: [
      { term: "Noise Level", desc: "Fan should run quietly at idle and only increase speed during heavy gaming. If the fan hits maximum RPM immediately at boot, the thermal paste may not have proper contact." },
      { term: "Temperature Test", desc: "Touch the top panel after 30 minutes of gaming. It should feel warm but not uncomfortably hot. Pre-repair, this area often feels hot enough to be unpleasant." },
      { term: "Stability Test", desc: "Run the most demanding game in your library for 60 minutes. No shutdowns, no stuttering, no overheating warnings." },
      { term: "Fan Spin Test", desc: "When powering on, listen for the fan start-up. It should spin smoothly without grinding, clicking, or rattling." }
    ]},
    { type: "h2", title: "How Long Will This Fix Last" },
    { type: "longevity-box", items: [
      { method: "Cleaning Only", duration: "6-12 months", note: "Dust returns. Clean every 6-12 months depending on your environment. Pet owners and smokers need more frequent cleaning." },
      { method: "Fan Replacement", duration: "4-6 years", note: "New fan bearings restore airflow to factory specs. The replacement fan should last as long as the original." },
      { method: "Thermal Paste Reapplication", duration: "3-5 years", note: "Quality thermal paste (Arctic MX-4, Noctua NT-H1) maintains thermal conductivity for years. Budget paste may dry out faster." }
    ]},
    { type: "h2", title: "Related Guides and Next Steps" },
    { type: "related-guides", guides: [
      { title: "Xbox One S Optical Drive Replacement", link: "/guides/microsoft/xbox-one-s/optical-drive-replacement" },
      { title: "Xbox One X Thermal Paste Replacement", link: "/guides/microsoft/xbox-one-x/thermal-paste-replacement" },
      { title: "Xbox Series S Fan Replacement", link: "/guides/microsoft/xbox-series-s/fan-replacement" }
    ]},
    { type: "h2", title: "Frequently Asked Questions" },
    { type: "faq", questions: [
      { q: "Can I clean the Xbox One S fan without opening the console?", a: "You can blast compressed air through the ventilation slots, which removes some surface dust. But this does not clean the heatsink fins or fan blades effectively. For proper cleaning, the console needs to be opened. The process takes about 15 minutes." },
      { q: "What thermal paste should I use for Xbox One S?", a: "Arctic MX-4 or Noctua NT-H1 are the most recommended options. Both are non-conductive (safe if you accidentally apply too much) and maintain performance for 3-5 years. Avoid liquid metal on the Xbox One S. The heatsink is aluminum, and liquid metal corrodes aluminum." },
      { q: "My Xbox One S fan works but the console still overheats. Why?", a: "If the fan spins correctly but overheating persists, the thermal paste has dried out and is no longer conducting heat from the APU to the heatsink. Even with maximum airflow, dried thermal paste creates a thermal barrier that prevents effective cooling. Reapply fresh thermal paste." },
      { q: "Is it safe to run the Xbox One S without the top shell for testing?", a: "Yes, for brief testing. The console will run cooler without the shell because there are no airflow restrictions. Running without the shell for a few minutes to verify a repair is perfectly safe. Do not leave it running without the shell long-term, as the airflow design requires the ducting the shell provides." }
    ]},
    { type: "conclusion", content: "Xbox One S overheating is almost always fixable with cleaning, fan replacement, or thermal paste reapplication. These are low-cost, moderate-difficulty repairs that add years to your console's lifespan." },
    { type: "final-cta", title: "Test Your Controller Performance", content: "With your console running cool again, make sure your controllers are performing at their best.", buttonText: "Run Controller Diagnostic", buttonLink: "/" }
  ]
};
