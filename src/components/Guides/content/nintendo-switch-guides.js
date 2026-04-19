// Nintendo Switch Guides
export const switchTeardownContent = { meta: { title: "Nintendo Switch Teardown & Disassembly | Complete Guide 2026", description: "Complete Nintendo Switch HAC-001 teardown guide. Step-by-step disassembly for repairs, cleaning, and component identification.", keywords: ["nintendo switch teardown", "nintendo switch disassembly", "switch take apart", "nintendo switch internal components"], readTime: "20 MIN READ", difficulty: "3/5", lastUpdated: "April 2026" }, hero: { title: "Nintendo Switch Teardown & Disassembly", subtitle: "Complete Disassembly Guide for the Original Nintendo Switch (HAC-001)", author: "Uneeb Katib | Hardware Diagnostic Specialist", experience: "6+ years in controller hardware analysis", publishedDate: "April 2026" }, sections: [
  { type: "introduction", content: "Whether you need to replace a broken screen, swap the battery, fix charging issues, or just clean years of dust from inside your Nintendo Switch, it starts with a proper teardown. The original Switch (model HAC-001) uses a straightforward but densely packed layout with ribbon cables, thermal pads, and a surprisingly large battery. This guide walks you through complete disassembly with notes on every connector you will encounter." },
  { type: "h2", title: "Tools You Will Need" },
  { type: "tools-grid", title: "Switch Teardown Kit", tools: [
    { name: "Y00 Tri-point Screwdriver", purpose: "Back panel screws (Nintendo proprietary)", cost: "$4-6" },
    { name: "JIS #0 Phillips Screwdriver", purpose: "Internal component screws", cost: "$3-5" },
    { name: "Plastic Spudger", purpose: "Disconnecting ribbon cables and connectors", cost: "$3" },
    { name: "Suction Cup", purpose: "Lifting the screen panel during display replacement", cost: "$2" },
    { name: "Tweezers", purpose: "Handling small screws and connectors", cost: "$3" },
    { name: "Anti-Static Wrist Strap", purpose: "Protecting ESD-sensitive components", cost: "$5" }
  ]},
  { type: "h2", title: "Step-by-Step Disassembly" },
  { type: "method-box", title: "Full Nintendo Switch Teardown", subtitle: "Reference guide for all internal repairs", steps: [
    { step: 1, title: "Remove Joy-Cons and Game Card", content: "Slide both Joy-Cons off the rails. Remove any game card or microSD card from the slots." },
    { step: 2, title: "Remove Back Panel Screws", content: "Using the Y00 tri-point screwdriver, remove the four Y-type screws on the back panel. Then remove all Phillips screws along the edges. There are screws hidden under the kickstand (remove it by gently prying). Remove the two screws under the kickstand." },
    { step: 3, title: "Remove the Back Panel", content: "Use a plastic spudger to unclip the back panel from the frame. Start at the bottom edge and work around. Lift the panel straight up. The microSD card reader is mounted on the back panel and connected via a ribbon cable. Disconnect it before fully removing the panel." },
    { step: 4, title: "Disconnect the Battery", content: "Locate the battery connector near the bottom of the motherboard. Use a spudger to gently pry the connector straight up from its socket. Always disconnect the battery before working on any internal components." },
    { step: 5, title: "Remove Internal Components", content: "The Switch interior contains: metal shielding plate (remove screws), heatsink with fan and copper heatpipe (remove screws and disconnect fan cable), SD card reader ribbon, game card reader, speaker, and the main battery. Each component is held by Phillips screws and connected via ZIF ribbon cables or press-fit connectors." },
    { step: 6, title: "Remove the Motherboard (If Needed)", content: "Disconnect all remaining ribbon cables: touchscreen digitizer, LCD display, volume buttons, power button. Remove the Phillips screws securing the motherboard. Lift the motherboard out carefully." }
  ]},
  { type: "warning-box", title: "Ribbon Cable Caution", content: "The Switch uses ZIF (zero insertion force) connectors for flat ribbon cables. To disconnect: lift the small locking tab with a spudger, then slide the ribbon out. To reconnect: slide the ribbon in until seated, then press the locking tab down. Never pull a ribbon cable with the lock tab down; this tears the cable or breaks the connector." },
  { type: "h2", title: "Related Guides and Next Steps" },
  { type: "related-guides", guides: [
    { title: "Switch Screen Replacement", link: "/guides/nintendo/nintendo-switch/screen-replacement-guide" },
    { title: "Switch Battery Replacement", link: "/guides/nintendo/nintendo-switch/battery-replacement" },
    { title: "Switch Kickstand Repair", link: "/guides/nintendo/nintendo-switch/kickstand-repair" },
    { title: "Joy-Con Button Repair", link: "/guides/nintendo/nintendo-switch-joy-con/joy-con-button-repair" }
  ]},
  { type: "h2", title: "Frequently Asked Questions" },
  { type: "faq", questions: [
    { q: "What screwdriver do I need for Nintendo Switch?", a: "You need a Y00 tri-point screwdriver for the back panel screws (proprietary Nintendo screws) and a JIS #0 Phillips for internal screws. A standard Phillips #0 works for internal screws but JIS provides a better fit and reduces stripping risk." },
    { q: "Is the Switch OLED disassembly different?", a: "Yes. The Switch OLED (model HEG-001) has a different internal layout with larger screen, different heatsink, and an ethernet port in the dock. This teardown guide is specific to the original HAC-001 model." },
    { q: "Can I reassemble the Switch after a full teardown?", a: "Yes. Take photos at each step, especially before disconnecting ribbon cables. Keep screws organized by step (a magnetic mat or labeled containers help). Reassemble in exact reverse order." },
    { q: "Will opening my Switch void the warranty?", a: "Yes. Nintendo's warranty does not cover consoles that have been opened. If your Switch is still under warranty and has a defect, contact Nintendo support for warranty repair before attempting DIY." }
  ]},
  { type: "conclusion", content: "A complete Switch teardown gives you access to every internal component for repair, cleaning, or upgrade. Taking photos at each step ensures smooth reassembly." },
  { type: "final-cta", title: "Test Your Joy-Cons", content: "After reassembly, verify your Joy-Con sticks and buttons work correctly.", buttonText: "Run Controller Test", buttonLink: "/" }
]};

export const switchScreenContent = { meta: { title: "Nintendo Switch Screen Replacement | LCD Fix Guide 2026", description: "Replace a cracked or malfunctioning Nintendo Switch LCD screen. Complete guide with digitizer separation, LCD installation, and adhesive application.", keywords: ["nintendo switch screen replacement", "switch cracked screen fix", "nintendo switch lcd replacement", "switch screen repair"], readTime: "25 MIN READ", difficulty: "4/5", lastUpdated: "April 2026" }, hero: { title: "Nintendo Switch Screen Replacement", subtitle: "Replace a Cracked or Dead LCD on the Original Nintendo Switch", author: "Uneeb Katib | Hardware Diagnostic Specialist", experience: "6+ years in controller hardware analysis", publishedDate: "April 2026" }, sections: [
  { type: "introduction", content: "A cracked Switch screen or dead pixels make the console unusable in handheld mode. The original Switch (HAC-001) uses a 6.2-inch 720p IPS LCD with a separate touch digitizer layered on top. Replacement LCDs with pre-attached digitizers cost $25-40 and the swap takes about 45 minutes. This guide covers safe screen removal, new display installation, and adhesive reapplication." },
  { type: "h2", title: "Tools and Parts" },
  { type: "tools-grid", title: "Screen Replacement Kit", tools: [
    { name: "Replacement LCD + Digitizer Assembly", purpose: "New screen unit", cost: "$25-40" },
    { name: "Y00 Tri-point + Phillips #0", purpose: "Console disassembly", cost: "$5-10" },
    { name: "Heat Gun or Hair Dryer", purpose: "Softening screen adhesive", cost: "$10-30" },
    { name: "Suction Cup", purpose: "Lifting the glass panel", cost: "$2" },
    { name: "Screen Adhesive Strips (pre-cut)", purpose: "Sealing the new screen", cost: "$3-5" },
    { name: "Plastic Spudger + Opening Picks", purpose: "Separating screen from frame", cost: "$5" }
  ]},
  { type: "h2", title: "Step-by-Step Screen Replacement" },
  { type: "method-box", title: "LCD + Digitizer Replacement", subtitle: "Requires patience with adhesive removal", steps: [
    { step: 1, title: "Complete Teardown to Motherboard Level", content: "Follow the Switch Teardown guide through Step 6. The motherboard must be removed to access the LCD ribbon cable connector underneath." },
    { step: 2, title: "Heat and Remove Old Screen", content: "Apply heat around the edges of the screen (not the center LCD) at 60-70°C with a hair dryer. This softens the adhesive. Apply the suction cup to the screen center and pull gently while sliding an opening pick into the gap between screen and frame. Work the pick around the entire perimeter to separate the adhesive." },
    { step: 3, title: "Disconnect LCD Ribbon Cable", content: "With the screen loose, carefully disconnect the LCD ribbon cable from the motherboard. The connector is a ZIF type: lift the lock tab, slide the ribbon out." },
    { step: 4, title: "Clean the Frame", content: "Remove all old adhesive from the frame rails using IPA and a spudger. The frame must be clean and flat for the new screen to sit properly." },
    { step: 5, title: "Install New Screen", content: "Apply pre-cut adhesive strips to the frame perimeter. Connect the new LCD ribbon cable to the motherboard connector (slide in, press lock tab down). Carefully lower the new screen into the frame, aligning all edges evenly. Press firmly around the edges to set the adhesive." },
    { step: 6, title: "Reassemble and Test", content: "Reinstall the motherboard, reconnect all cables, and power on before fully closing the case. Verify the new screen displays correctly, the touch digitizer responds to all areas, and there are no dead pixels or backlight bleed." }
  ]},
  { type: "h2", title: "Related Guides" },
  { type: "related-guides", guides: [
    { title: "Switch Teardown & Disassembly", link: "/guides/nintendo/nintendo-switch/nintendo-switch-teardown-disassembly" },
    { title: "Switch Battery Replacement", link: "/guides/nintendo/nintendo-switch/battery-replacement" },
    { title: "Switch OLED Screen Replacement", link: "/guides/nintendo/nintendo-switch-oled/oled-screen-replacement" }
  ]},
  { type: "h2", title: "Frequently Asked Questions" },
  { type: "faq", questions: [
    { q: "Can I replace just the glass without replacing the LCD?", a: "Only if the LCD itself is undamaged and only the glass digitizer is cracked. The digitizer can be separated from the LCD with careful heating, but this is risky. Pre-assembled LCD+digitizer units ($25-40) are the safer and recommended approach." },
    { q: "Is a Switch OLED screen compatible with the original Switch?", a: "No. The OLED model uses a 7-inch OLED panel with different dimensions and connector. The original Switch requires a 6.2-inch LCD specific to model HAC-001." },
    { q: "Will replacing the screen affect my saved data?", a: "No. All data is stored on the motherboard and microSD card. The screen is a display-only component. Your games, saves, and Nintendo account remain intact." }
  ]},
  { type: "conclusion", content: "Switch screen replacement saves $150+ compared to buying a new console or using Nintendo's repair service. A $30 screen and 45 minutes of careful work restores your handheld to like-new display quality." },
  { type: "final-cta", title: "Test Your Switch Controllers", content: "After reassembly, verify Joy-Con and Pro Controller inputs.", buttonText: "Test Controller", buttonLink: "/" }
]};

export const switchBatteryContent = { meta: { title: "Nintendo Switch Battery Replacement | Guide 2026", description: "Replace a degraded Nintendo Switch battery to restore play time. Step-by-step removal and installation of the HAC-003 battery pack.", keywords: ["nintendo switch battery replacement", "switch battery life fix", "nintendo switch battery swap", "switch hac-003 battery"], readTime: "15 MIN READ", difficulty: "3/5", lastUpdated: "April 2026" }, hero: { title: "Nintendo Switch Battery Replacement", subtitle: "Restore Full Battery Life to Your Nintendo Switch", author: "Uneeb Katib | Hardware Diagnostic Specialist", experience: "6+ years in controller hardware analysis", publishedDate: "April 2026" }, sections: [
  { type: "introduction", content: "The original Nintendo Switch (HAC-001) ships with a 4310mAh lithium-ion battery providing 2.5-6.5 hours of play depending on the game. After 3-4 years of regular use and hundreds of charge cycles, battery capacity drops significantly. If your Switch only lasts 1-2 hours or dies unexpectedly, a replacement battery ($15-20) and 20 minutes of work restores original battery life." },
  { type: "h2", title: "Tools and Parts" },
  { type: "tools-grid", title: "Battery Replacement Kit", tools: [
    { name: "Replacement Battery (HAC-003, 4310mAh)", purpose: "New battery cell", cost: "$15-20" },
    { name: "Y00 Tri-point Screwdriver", purpose: "Back panel screws", cost: "$4-6" },
    { name: "Phillips #0 Screwdriver", purpose: "Internal screws and battery bracket", cost: "$3-5" },
    { name: "Plastic Spudger", purpose: "Disconnecting battery connector and prying adhesive", cost: "$3" }
  ]},
  { type: "h2", title: "Step-by-Step Replacement" },
  { type: "method-box", title: "Switch Battery Replacement", subtitle: "Moderate difficulty. 20-30 minutes.", steps: [
    { step: 1, title: "Open the Back Panel", content: "Remove all Y00 and Phillips screws from the back, including those under the kickstand. Lift the back panel and disconnect the microSD reader ribbon cable." },
    { step: 2, title: "Disconnect the Battery", content: "Locate the battery connector at the bottom of the PCB. Use a spudger to gently lift the connector straight up." },
    { step: 3, title: "Remove Metal Shielding", content: "Remove the Phillips screws from the metal plate covering the battery and motherboard area. Lift the plate off to expose the battery." },
    { step: 4, title: "Remove the Old Battery", content: "The battery is secured with adhesive strips. Slide a thin plastic card under the battery to separate it from the adhesive. Work slowly and do not bend the battery. Pull the battery out once freed." },
    { step: 5, title: "Install the New Battery", content: "Place the new battery in the same position. Secure with adhesive. Connect the battery cable to the motherboard socket. Press firmly until it clicks." },
    { step: 6, title: "Reassemble", content: "Replace shielding plate, reconnect microSD cable, screw back panel on. Power on and verify battery percentage displays correctly." }
  ]},
  { type: "h2", title: "Related Guides" },
  { type: "related-guides", guides: [
    { title: "Switch Teardown", link: "/guides/nintendo/nintendo-switch/nintendo-switch-teardown-disassembly" },
    { title: "Switch Kickstand Repair", link: "/guides/nintendo/nintendo-switch/kickstand-repair" },
    { title: "Switch Lite Analog Stick Replacement", link: "/guides/nintendo/nintendo-switch-lite/analog-stick-replacement" }
  ]},
  { type: "h2", title: "Frequently Asked Questions" },
  { type: "faq", questions: [
    { q: "What battery does the Nintendo Switch use?", a: "The original Switch (HAC-001) uses a HAC-003 battery rated at 4310mAh, 3.7V, 16.0Wh. The V2 revision (HAC-001(-01)) uses the same battery but has a more efficient processor, giving 4.5-9 hours of play." },
    { q: "Can I use a higher capacity battery?", a: "Third-party batteries rated at 4500-5000mAh exist and fit the same compartment. They provide marginally more play time but may not meet Nintendo's safety certification standards." },
    { q: "How long does a new Switch battery last before it degrades?", a: "Expect 2-4 years of healthy battery life with normal use. Battery longevity depends on charge habits, play-while-charging frequency, and ambient temperatures." }
  ]},
  { type: "conclusion", content: "Switch battery replacement is one of the most impactful and affordable repairs. A $15 battery restores hours of portable gaming time." },
  { type: "final-cta", title: "Test Your Joy-Cons", content: "Verify your Joy-Con drift levels and button response after reassembly.", buttonText: "Run Drift Test", buttonLink: "/stick-drift-test" }
]};

export const switchKickstandContent = { meta: { title: "Nintendo Switch Kickstand Repair | Quick Fix Guide 2026", description: "Fix or replace a broken Nintendo Switch kickstand. Simple snap-on replacement with no tools required.", keywords: ["nintendo switch kickstand repair", "switch kickstand replacement", "switch kickstand broken", "switch kickstand fix"], readTime: "8 MIN READ", difficulty: "1/5", lastUpdated: "April 2026" }, hero: { title: "Nintendo Switch Kickstand Repair", subtitle: "Replace a Broken or Loose Kickstand in Under 2 Minutes", author: "Uneeb Katib | Hardware Diagnostic Specialist", experience: "6+ years in controller hardware analysis", publishedDate: "April 2026" }, sections: [
  { type: "introduction", content: "The Nintendo Switch kickstand is one of the console's most fragile components. It snaps, falls off, or loses its friction hold after regular use. The good news: the kickstand is a simple clip-on part that requires zero tools and takes under 2 minutes to replace. Replacement kickstands cost $3-8." },
  { type: "h2", title: "How to Replace the Kickstand" },
  { type: "method-box", title: "Kickstand Replacement", subtitle: "No tools needed. 1-2 minutes.", steps: [
    { step: 1, title: "Remove the Old Kickstand", content: "Open the kickstand to its fully extended position. Apply steady outward pressure while sliding the kickstand toward the bottom edge of the Switch. The kickstand slides off its rail mount." },
    { step: 2, title: "Clean the Rail", content: "If the rail channel has dust or debris, clean it with compressed air or a dry brush." },
    { step: 3, title: "Install New Kickstand", content: "Align the new kickstand with the rail channel at the bottom edge. Slide it upward until it clicks into place. Test the kickstand opens and closes with proper friction." }
  ]},
  { type: "h2", title: "Related Guides" },
  { type: "related-guides", guides: [
    { title: "Switch Teardown", link: "/guides/nintendo/nintendo-switch/nintendo-switch-teardown-disassembly" },
    { title: "Switch Battery Replacement", link: "/guides/nintendo/nintendo-switch/battery-replacement" },
    { title: "Switch OLED Kickstand Maintenance", link: "/guides/nintendo/nintendo-switch-oled/improved-kickstand-maintenance" }
  ]},
  { type: "h2", title: "Frequently Asked Questions" },
  { type: "faq", questions: [
    { q: "Is the Switch OLED kickstand the same as the original?", a: "No. The Switch OLED has a much larger, full-width adjustable kickstand. Original Switch kickstands are not compatible with the OLED model and vice versa." },
    { q: "Can I use a third-party kickstand?", a: "Yes. Many aftermarket kickstands use the same rail system. Some offer wider profiles for better stability. Ensure the replacement is listed as compatible with HAC-001." }
  ]},
  { type: "conclusion", content: "Switch kickstand replacement is the easiest Nintendo repair possible. No tools, no screws, no risk. Just slide, click, done." },
  { type: "final-cta", title: "Test Your Controllers", content: "Check your Joy-Con drift and button response.", buttonText: "Run Controller Test", buttonLink: "/" }
]};
