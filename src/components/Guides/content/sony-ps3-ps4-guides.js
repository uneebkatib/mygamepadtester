// Sony PS3 and PS4 Guides
export const ps3YlodContent = { meta: { title: "PS3 YLOD Repair Guide | Yellow Light of Death Fix 2026", description: "Fix the Yellow Light of Death on PlayStation 3. Complete reflow and reball guide for YLOD error with success rate data and long-term fix options.", keywords: ["ps3 ylod repair", "ps3 yellow light of death fix", "playstation 3 ylod", "ps3 reflow guide"], readTime: "30 MIN READ", difficulty: "5/5", lastUpdated: "April 2026" }, hero: { title: "PS3 YLOD Repair Guide", subtitle: "Understanding, Diagnosing, and Fixing the Yellow Light of Death", author: "Uneeb Katib | Hardware Diagnostic Specialist", experience: "6+ years in controller hardware analysis", publishedDate: "April 2026" }, sections: [
  { type: "introduction", content: "The Yellow Light of Death (YLOD) is the most infamous PS3 failure. The console powers on for 1-2 seconds, the power LED turns from green to yellow, then flashes red, and the console shuts down. YLOD indicates a critical hardware failure, most commonly cracked solder joints under the RSX GPU or Cell processor caused by years of thermal cycling. This guide covers diagnosis, temporary reflow fixes, and permanent reball solutions." },
  { type: "h2", title: "What Causes YLOD" },
  { type: "technical-box", title: "YLOD Failure Mechanism", items: ["Lead-free solder (SAC305) used in PS3 manufacturing develops micro-cracks over time", "Thermal cycling (heating during play, cooling when off) stresses BGA solder balls", "Fat PS3 models (CECHG and earlier) are most susceptible due to higher heat output", "The RSX GPU (90nm process) runs hottest and is the most common point of failure", "NEC/Tokin capacitors on early models also fail, causing similar symptoms"] },
  { type: "h2", title: "Diagnosis: Is It Actually YLOD?" },
  { type: "checklist", title: "YLOD Confirmation", items: ["Power LED goes Green > Yellow > Flashing Red (definitive YLOD sequence)", "Console beeps three times when shutting down", "No video output at any point during the sequence", "Console was working previously and failure was sudden", "Console is a Fat model (Slim/Super Slim have different failure modes)"] },
  { type: "h2", title: "Repair Options Compared" },
  { type: "table", headers: ["Method", "Cost", "Success Rate", "Duration of Fix"], rows: [["Heat Gun Reflow", "$0-15", "60-70%", "2 weeks - 3 months"], ["Professional Reflow (IR Station)", "$50-80", "75-85%", "3-12 months"], ["Full BGA Reball", "$80-150", "90-95%", "2-5 years"], ["NEC/Tokin Cap Replacement", "$5-15 (DIY)", "50% (if caps are the issue)", "Permanent if caps were the cause"]] },
  { type: "warning-box", title: "Reflow Is a Temporary Fix", content: "Heating the GPU/CPU area re-melts cracked solder joints temporarily. But the same lead-free solder will crack again under thermal stress. Reflow is a data recovery opportunity, not a permanent repair. Back up your saves immediately after a successful reflow." },
  { type: "h2", title: "Step-by-Step Repair" },
  { type: "method-box", title: "Method 1: Heat Gun Reflow", subtitle: "Temporary fix for data recovery. 60-70% success rate.", steps: [
    { step: 1, title: "Full Disassembly", content: "Remove the hard drive, Blu-ray drive, power supply, and all ribbon cables. Remove the motherboard from the chassis. Remove the heatsink assembly (twist the screws, do not unscrew; they are captive spring screws on Fat models)." },
    { step: 2, title: "Clean and Prepare", content: "Remove old thermal paste from CPU and GPU. Apply flux around the GPU and CPU BGA packages. Cover nearby components with aluminum foil to protect them from heat." },
    { step: 3, title: "Reflow the GPU", content: "Using a heat gun at 350-380°C, heat the RSX GPU area in a circular motion for 3-4 minutes. Keep the heat gun 2-3 inches from the board. The flux should bubble and flow. Heat the Cell CPU for 2-3 minutes as well." },
    { step: 4, title: "Cool and Reassemble", content: "Let the board cool naturally for 30 minutes (do not force cool). Apply fresh thermal paste. Reassemble the console. Test if it boots." }
  ]},
  { type: "h2", title: "Related Guides" },
  { type: "related-guides", guides: [{ title: "PS3 Blu-Ray Drive Repair", link: "/guides/sony/playstation-3-ps3/blu-ray-drive-repair" }, { title: "DualShock 3 Repair", link: "/guides/sony/ps3-gamepad-dualshock-3/dualshock-3-repair" }, { title: "PS4 Overheating Repair", link: "/guides/sony/playstation-4-ps4/overheating-repair" }] },
  { type: "h2", title: "Frequently Asked Questions" },
  { type: "faq", questions: [
    { q: "Is YLOD the same as Red Light of Death?", a: "No. YLOD (Green > Yellow > Red) indicates GPU/CPU solder failure. A solid red light indicates overheating. A blinking red light after YLOD sequence indicates the console detected a critical hardware error. They share some overlap but have different root causes." },
    { q: "Can I oven-bake my PS3 motherboard to fix YLOD?", a: "Some guides recommend baking the motherboard in a kitchen oven at 200°C. This is unreliable and risks damaging other components. A directed heat gun reflow on the GPU area is more targeted and less destructive. Oven baking should be a last resort." },
    { q: "Is it worth fixing a PS3 YLOD in 2026?", a: "For data recovery (saves that are not backed up), absolutely. For continued use, only if you have physical games that are not available digitally. Fat PS3 models with backward compatibility (CECHA/CECHB) are worth repairing due to their collectible value." }
  ]},
  { type: "conclusion", content: "YLOD repair is the most challenging console fix in this guide series. Success is not guaranteed, but the techniques described can recover your data and potentially extend your console's life." },
  { type: "final-cta", title: "Test Your Controllers", content: "If your PS3 is running, test your DualShock 3 controllers.", buttonText: "Run Controller Test", buttonLink: "/" }
]};

export const ps3BlurayContent = { meta: { title: "PS3 Blu-Ray Drive Repair | Disc Read Fix 2026", description: "Fix PS3 Blu-ray drive read errors, grinding noise, and disc eject failures. Lens cleaning and drive mechanism repair guide.", keywords: ["ps3 blu-ray drive repair", "ps3 disc read error", "ps3 disc drive not reading", "ps3 drive grinding noise"], readTime: "20 MIN READ", difficulty: "3/5", lastUpdated: "April 2026" }, hero: { title: "PS3 Blu-Ray Drive Repair", subtitle: "Fix Disc Read Errors, Grinding Noise, and Eject Mechanism Failures", author: "Uneeb Katib | Hardware Diagnostic Specialist", experience: "6+ years in controller hardware analysis", publishedDate: "April 2026" }, sections: [
  { type: "introduction", content: "The PS3 Blu-ray drive handles both game discs and Blu-ray movies. After years of use, the laser diode weakens, the lens gets contaminated, and the disc spindle motor bearings wear. Common symptoms include the console not reading discs, making grinding noises, or accepting discs but failing to spin them up. Most drive issues can be fixed with lens cleaning or laser assembly replacement without replacing the entire drive." },
  { type: "h2", title: "Step-by-Step Repair" },
  { type: "method-box", title: "PS3 Blu-Ray Drive Repair", subtitle: "Start with cleaning. Replace laser only if cleaning fails.", steps: [
    { step: 1, title: "Remove the Drive", content: "Disassemble the PS3 to access the Blu-ray drive. Disconnect power and data cables. Slide the drive out of the chassis." },
    { step: 2, title: "Clean the Laser Lens", content: "Open the drive's top cover. Locate the laser lens on the sled assembly. Apply one drop of 99% IPA to a lint-free cloth and gently wipe the lens surface." },
    { step: 3, title: "Check the Spindle Motor", content: "With the drive open, manually spin the disc platform. It should rotate freely without wobble or grinding. If the motor is seized, the entire drive mechanism needs replacement." },
    { step: 4, title: "Replace Laser Assembly If Needed", content: "If cleaning does not fix disc reads, the laser diode is weakened beyond recovery. Purchase a replacement laser assembly (KES-400A for Fat, KES-450A for Slim). Remove the old assembly from the sled and install the new one. This is a ribbon cable connection, no soldering needed." }
  ]},
  { type: "warning-box", title: "PS3 Drive Pairing", content: "PS3 Blu-ray drives are paired to the motherboard via a logic board (daughter board). If you replace the entire drive mechanism, you MUST transfer the original daughter board to maintain the drive-motherboard pairing. Swapping to a completely new drive with its own daughter board will result in the PS3 rejecting the drive." },
  { type: "h2", title: "Related Guides" },
  { type: "related-guides", guides: [{ title: "PS3 YLOD Repair", link: "/guides/sony/playstation-3-ps3/ylod-repair-guide" }, { title: "Xbox One S Optical Drive Replacement", link: "/guides/microsoft/xbox-one-s/optical-drive-replacement" }] },
  { type: "h2", title: "Frequently Asked Questions" },
  { type: "faq", questions: [{ q: "Can PS3 play PS5 Blu-ray discs?", a: "PS3 can play standard Blu-ray movie discs but cannot play PS5 game discs. PS5 games use a different data format. PS3 can only play PS3 game discs and PS1 discs (on backward-compatible models)." }, { q: "Why does my PS3 drive grind but not read discs?", a: "Grinding typically indicates the spindle motor bearings have worn out or the disc is not sitting flat on the turntable. Check if the turntable hub is cracked or if the rubber centering ring is missing." }] },
  { type: "conclusion", content: "PS3 Blu-ray drive repair starts with simple lens cleaning and escalates to laser replacement only if needed. Most disc read issues resolve with a $5 cleaning and 15 minutes of work." },
  { type: "final-cta", title: "Test Your PS3 Controller", content: "Check your DualShock 3 for drift and button response.", buttonText: "Run Controller Test", buttonLink: "/" }
]};

export const ds3RepairContent = { meta: { title: "DualShock 3 Repair Guide | PS3 Controller Fix 2026", description: "Fix common DualShock 3 problems: sticky buttons, dead battery, broken triggers, and Bluetooth pairing issues.", keywords: ["dualshock 3 repair", "ps3 controller fix", "dualshock 3 buttons sticky", "ds3 repair guide"], readTime: "15 MIN READ", difficulty: "2/5", lastUpdated: "April 2026" }, hero: { title: "PS3 DualShock 3 Repair Guide", subtitle: "Fix Buttons, Triggers, Battery, and Connectivity Issues", author: "Uneeb Katib | Hardware Diagnostic Specialist", experience: "6+ years in controller hardware analysis", publishedDate: "April 2026" }, sections: [
  { type: "introduction", content: "The DualShock 3 is a resilient controller, but after a decade or more of use, common issues emerge: sticky buttons from accumulated grime, dead batteries that no longer hold charge, worn trigger springs, and Bluetooth pairing failures. This guide covers the most common DS3 repairs." },
  { type: "h2", title: "Common Repairs" },
  { type: "method-box", title: "DualShock 3 Button and Trigger Repair", subtitle: "Simple internal cleaning", steps: [
    { step: 1, title: "Open the Controller", content: "Remove the 5 Phillips screws from the back. Separate the shell halves. Disconnect the battery." },
    { step: 2, title: "Clean Buttons", content: "Remove button caps and rubber membrane. Clean PCB contact pads and membrane with IPA. Remove any sticky residue from under buttons." },
    { step: 3, title: "Fix Triggers", content: "L2/R2 triggers use a spring mechanism. If the spring is broken or weak, replacement springs cost $2. Remove the old spring and clip the new one in place." },
    { step: 4, title: "Replace Battery", content: "The DS3 uses a LIP1859 battery (3.7V, 570mAh). Disconnect the old battery connector and plug in the new one. New batteries cost $5-8." }
  ]},
  { type: "h2", title: "Related Guides" },
  { type: "related-guides", guides: [{ title: "DualShock 3 Battery Replacement", link: "/guides/sony/ps3-gamepad-dualshock-3/battery-replacement" }, { title: "PS3 YLOD Repair", link: "/guides/sony/playstation-3-ps3/ylod-repair-guide" }, { title: "DualSense Troubleshooting", link: "/guides/sony/ps5/dualsense-complete-troubleshooting" }] },
  { type: "h2", title: "Frequently Asked Questions" },
  { type: "faq", questions: [{ q: "Can I use a DualShock 3 on PS4 or PS5?", a: "Not natively. The DualShock 3 uses a different Bluetooth protocol. Third-party adapters (CronusMax, Brook) can translate DS3 input for PS4/PS5, but with increased latency." }, { q: "Why does my DualShock 3 not pair via Bluetooth?", a: "Try resetting the controller by pressing the small reset button on the back (inside a pinhole near L2). Then connect via USB cable to re-pair. If pairing still fails, the internal Bluetooth module may have failed." }] },
  { type: "conclusion", content: "DualShock 3 controllers are simple to repair. Button cleaning, spring replacement, and battery swaps keep them functional for continued retro gaming." },
  { type: "final-cta", title: "Test Your Controller", content: "Check all buttons and analog sticks.", buttonText: "Run Controller Test", buttonLink: "/" }
]};

export const ds3BatteryContent = { meta: { title: "DualShock 3 Battery Replacement | Guide 2026", description: "Replace the dead battery in your PS3 DualShock 3 controller. Simple connector swap with no soldering.", keywords: ["dualshock 3 battery replacement", "ps3 controller battery", "ds3 battery swap"], readTime: "12 MIN READ", difficulty: "1/5", lastUpdated: "April 2026" }, hero: { title: "DualShock 3 Battery Replacement", subtitle: "Restore Wireless Play to Your PS3 Controller", author: "Uneeb Katib | Hardware Diagnostic Specialist", experience: "6+ years in controller hardware analysis", publishedDate: "April 2026" }, sections: [
  { type: "introduction", content: "After 10+ years, every DualShock 3 battery dies. The controller only works wired, charges for hours but dies in minutes, or refuses to power on at all. The LIP1859 battery is a simple plug-in replacement: 5 screws, one connector, and 10 minutes of work restores wireless functionality." },
  { type: "h2", title: "Step-by-Step Replacement" },
  { type: "method-box", title: "DS3 Battery Swap", subtitle: "Easiest controller repair possible", steps: [
    { step: 1, title: "Open Controller", content: "Remove 5 Phillips screws. Separate shell halves." },
    { step: 2, title: "Disconnect Old Battery", content: "Unplug the battery connector from the PCB. It is a small 2-pin white connector. Pull straight up gently." },
    { step: 3, title: "Connect New Battery", content: "Plug the new battery connector in. Place the battery in the compartment. Reassemble." },
    { step: 4, title: "Initial Charge", content: "Connect via USB and charge for 3 hours before first wireless use." }
  ]},
  { type: "h2", title: "Related Guides" },
  { type: "related-guides", guides: [{ title: "DualShock 3 Repair", link: "/guides/sony/ps3-gamepad-dualshock-3/dualshock-3-repair" }, { title: "Xbox Elite 2 Battery Replacement", link: "/guides/microsoft/xbox-elite-series-2-gamepad/battery-replacement" }] },
  { type: "h2", title: "Frequently Asked Questions" },
  { type: "faq", questions: [{ q: "What battery does the DualShock 3 use?", a: "LIP1859, 3.7V, 570mAh lithium-ion. Some aftermarket options offer 600-700mAh for slightly longer play time." }, { q: "Can a dead battery damage the controller?", a: "A swollen battery can press against internal components, potentially damaging ribbon cables. If the back of your DS3 feels puffy, replace the battery immediately." }] },
  { type: "conclusion", content: "DualShock 3 battery replacement is the quickest and simplest controller repair. Ten minutes and $6 restores wireless gaming." },
  { type: "final-cta", title: "Test Your Controller", content: "Verify all buttons and sticks work after battery swap.", buttonText: "Run Controller Test", buttonLink: "/" }
]};

export const ps4HddContent = { meta: { title: "PS4 Hard Drive Upgrade | SSD Replacement Guide 2026", description: "Upgrade your PS4 hard drive to an SSD for faster load times. No tools beyond a Phillips screwdriver needed. Step-by-step with OS reinstallation.", keywords: ["ps4 hard drive upgrade", "ps4 ssd upgrade", "ps4 hdd replacement", "ps4 faster load times"], readTime: "15 MIN READ", difficulty: "1/5", lastUpdated: "April 2026" }, hero: { title: "PS4 Hard Drive Upgrade", subtitle: "Swap the Stock HDD for an SSD Without Voiding Your Warranty", author: "Uneeb Katib | Hardware Diagnostic Specialist", experience: "6+ years in controller hardware analysis", publishedDate: "April 2026" }, sections: [
  { type: "introduction", content: "Sony designed the PS4 with a user-replaceable hard drive, making this one of the easiest console upgrades possible. The stock 500GB or 1TB 5400RPM drive is a performance bottleneck. Swapping it for a SATA SSD ($35-70) reduces game load times by 40-50% and system boot time dramatically. This upgrade does NOT void your warranty." },
  { type: "h2", title: "Step-by-Step Upgrade" },
  { type: "method-box", title: "PS4 HDD to SSD Upgrade", subtitle: "No console disassembly required. Sony designed this to be user-serviceable.", steps: [
    { step: 1, title: "Back Up Data", content: "Settings > System > Back Up and Restore. Back up to external USB drive. Or ensure PS Plus cloud saves are uploaded." },
    { step: 2, title: "Download PS4 System Software", content: "On your PC, download the full PS4 system software (reinstallation file, ~1GB) from PlayStation support. Copy to USB drive: USB > PS4 > UPDATE > PS4UPDATE.PUP" },
    { step: 3, title: "Remove the HDD Cover", content: "PS4 Original: slide the glossy top panel to the left. PS4 Slim: remove the screw cover on the bottom left. PS4 Pro: remove the rear screw cover. Remove the Phillips screw holding the drive cage." },
    { step: 4, title: "Swap the Drive", content: "Pull the drive cage out. Remove the 4 screws on the cage sides. Remove the HDD. Install SSD. Replace the 4 cage screws." },
    { step: 5, title: "Reinstall PS4 OS", content: "Slide the drive cage back in. Replace the Phillips screw. Insert the USB drive with system software. Power on while holding the power button 7 seconds until Safe Mode loads. Select 'Initialize PS4 (Reinstall System Software)." },
    { step: 6, title: "Restore Data", content: "After OS installation, restore saves from USB backup or re-download from PS Plus cloud." }
  ]},
  { type: "h2", title: "Related Guides" },
  { type: "related-guides", guides: [{ title: "PS4 Overheating Repair", link: "/guides/sony/playstation-4-ps4/overheating-repair" }, { title: "Xbox One X Hard Drive Upgrade", link: "/guides/microsoft/xbox-one-x/hard-drive-upgrade" }, { title: "PS5 SSD Expansion", link: "/guides/sony/ps5-console/ssd-expansion-guide" }] },
  { type: "h2", title: "Frequently Asked Questions" },
  { type: "faq", questions: [{ q: "Does PS4 support NVMe SSDs?", a: "No. The PS4 uses SATA III interface. NVMe drives are physically and electrically incompatible. Use any standard 2.5-inch SATA SSD." }, { q: "Will SSD upgrade void my PS4 warranty?", a: "No. Sony explicitly designed the PS4 with a user-serviceable hard drive bay. The PS4 manual includes HDD replacement instructions." }, { q: "What SSD size should I get?", a: "1TB is the sweet spot for price/capacity. 500GB fills up fast with 2-3 modern games. 2TB provides maximum capacity if you install many games." }] },
  { type: "conclusion", content: "PS4 HDD to SSD upgrade is the easiest and most impactful performance modification for the console. No disassembly, no warranty void, dramatic load time improvement." },
  { type: "final-cta", title: "Test Your Controllers", content: "Make sure your DualShock 4 controllers are in top shape.", buttonText: "Run Controller Test", buttonLink: "/" }
]};

export const ps4OverheatingContent = { meta: { title: "PS4 Overheating Repair | Fix Loud Fan & Thermal Shutdown 2026", description: "Fix PS4 overheating with fan cleaning, thermal paste replacement, and power supply inspection. Stop loud fan noise and thermal shutdowns.", keywords: ["ps4 overheating fix", "ps4 loud fan repair", "ps4 thermal paste replacement", "ps4 shuts down overheating"], readTime: "20 MIN READ", difficulty: "3/5", lastUpdated: "April 2026" }, hero: { title: "PS4 Overheating Repair", subtitle: "Fix Loud Fan Noise, Thermal Shutdowns, and Performance Throttling", author: "Uneeb Katib | Hardware Diagnostic Specialist", experience: "6+ years in controller hardware analysis", publishedDate: "April 2026" }, sections: [
  { type: "introduction", content: "PS4 overheating is the most common issue for consoles over 3 years old. Dust clogs the heatsink, thermal paste dries out, and the fan struggles to maintain safe temperatures. Symptoms range from a jet engine fan to complete thermal shutdown. Cleaning and thermal paste replacement cost under $15 and fix 90% of overheating cases." },
  { type: "h2", title: "Step-by-Step Repair" },
  { type: "method-box", title: "PS4 Thermal Restoration", subtitle: "Full cleaning and thermal paste service", steps: [
    { step: 1, title: "Disassemble to Motherboard", content: "Remove warranty stickers, T8/T9 screws, shell panels, power supply, Blu-ray drive. The motherboard and heatsink assembly are now accessible." },
    { step: 2, title: "Remove Heatsink", content: "Remove the spring-loaded screws holding the heatsink to the APU (cross pattern). Lift heatsink straight up." },
    { step: 3, title: "Clean Everything", content: "Blast compressed air through the heatsink fins. Clean fan blades with a brush. Remove all old thermal paste from APU and heatsink base with IPA." },
    { step: 4, title: "Apply Fresh Thermal Paste", content: "Apply a pea-dot or X-pattern of thermal paste (Arctic MX-4 or Noctua NT-H1) to the APU surface. Reinstall heatsink with cross-pattern tightening." },
    { step: 5, title: "Reassemble and Test", content: "Reassemble fully. Run a demanding game for 30 minutes. Fan should run at moderate speed, not maximum." }
  ]},
  { type: "h2", title: "Related Guides" },
  { type: "related-guides", guides: [{ title: "PS4 HDD Upgrade", link: "/guides/sony/playstation-4-ps4/hard-drive-upgrade" }, { title: "Xbox One X Thermal Paste", link: "/guides/microsoft/xbox-one-x/thermal-paste-replacement" }, { title: "PS5 Fan Cleaning", link: "/guides/sony/ps5-console/fan-cleaning-guide" }] },
  { type: "h2", title: "Frequently Asked Questions" },
  { type: "faq", questions: [{ q: "Can I use liquid metal on PS4?", a: "Not recommended. The PS4 heatsink is aluminum, and liquid metal corrodes aluminum. Use standard thermal paste." }, { q: "How often should I clean my PS4?", a: "Every 12-18 months in normal environments. Every 6 months if you have pets, smoke indoors, or live in a dusty area." }] },
  { type: "conclusion", content: "PS4 overheating repair is essential maintenance for any console over 3 years old. A $10 thermal paste and 30 minutes of cleaning transforms your PS4 from a jet engine back to a quiet gaming machine." },
  { type: "final-cta", title: "Test Your Controllers", content: "With your PS4 running cool, check your DS4 controllers.", buttonText: "Run Controller Test", buttonLink: "/" }
]};
