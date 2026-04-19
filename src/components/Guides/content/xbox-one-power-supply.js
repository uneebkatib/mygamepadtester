// Xbox One FAT Power Supply Repair
export const xboxOnePowerSupplyContent = {
  meta: { title: "Xbox One Power Supply Repair | Fix No Power Issues 2026", description: "Diagnose and repair Xbox One FAT power supply problems. Identify PSU failure, test voltages, and replace the internal power supply unit step by step.", keywords: ["xbox one power supply repair", "xbox one no power fix", "xbox one psu replacement", "xbox one wont turn on"], readTime: "15 MIN READ", difficulty: "3/5", lastUpdated: "April 2026" },
  hero: { title: "Xbox One FAT Power Supply Repair", subtitle: "Diagnose and Fix No-Power, Random Shutdown, and PSU Failure Issues", author: "Uneeb Katib | Hardware Diagnostic Specialist", experience: "6+ years in controller hardware analysis", publishedDate: "April 2026" },
  sections: [
    { type: "introduction", content: "Your Xbox One FAT will not turn on, shuts down randomly during gameplay, or makes a clicking sound when you press the power button. In most cases, the internal power supply unit (PSU) is the culprit. The original Xbox One uses a large internal PSU that converts 110-240V AC to 12V and 5V DC for the motherboard. These units degrade over time due to capacitor aging, dust buildup causing overheating, and power surge damage. This guide covers diagnosis, testing, and replacement of the Xbox One FAT internal power supply." },
    { type: "tool-callout", content: "If your console powers on but controllers do not respond, the issue may not be the PSU. Test your controller first.", buttonText: "Test Your Controller", buttonLink: "/" },
    { type: "h2", title: "What Causes Xbox One Power Supply Failure" },
    { type: "paragraph", content: "The Xbox One FAT (model 1540) contains an internal switching power supply rated at 220W. This PSU converts wall AC power through a series of capacitors, transformers, and voltage regulators. Three primary failure modes account for 90% of Xbox One PSU problems." },
    { type: "technical-box", title: "PSU Failure Modes", items: ["Capacitor degradation: Electrolytic capacitors dry out over 5-8 years, losing capacitance and causing voltage ripple that triggers the console's protection circuitry", "Thermal throttling: Dust buildup on PSU heatsinks causes overheating. The PSU shuts down to protect itself, creating random power-off symptoms", "Surge damage: Power spikes from lightning or unstable mains power can destroy MOSFETs and bridge rectifiers in the primary switching circuit", "Fan failure: The PSU has its own cooling fan. If it fails, the PSU overheats and enters thermal shutdown within 10-30 minutes of gaming"] },
    { type: "h2", title: "How to Confirm Your PSU Needs Repair or Replacement" },
    { type: "checklist", title: "Power Supply Failure Symptoms", items: ["Pressing power button produces no response at all (no light, no sound, no fan spin)", "Console beeps or clicks once then immediately shuts down", "Console powers on for 5-30 minutes then shuts off (thermal shutdown)", "Orange standby light on console but will not turn on (PSU provides standby 5V but cannot deliver 12V under load)", "Burning or electrical smell from the rear vents", "Console only powers on after being unplugged for several hours (capacitor recovery)"] },
    { type: "table", headers: ["Symptom", "Likely Cause", "Fix"], rows: [
      ["No response at all", "Dead PSU or blown fuse", "Replace PSU or check internal fuse"],
      ["Clicks then shuts off", "PSU cannot deliver startup current", "Replace capacitors or full PSU"],
      ["Shuts off during gaming", "Thermal shutdown from dust/fan failure", "Clean PSU, replace fan, or replace PSU"],
      ["Orange light stays on", "5V standby works but 12V rail failed", "Replace PSU"],
      ["Works after cooldown", "Thermal protection cycling", "Clean dust, improve ventilation"]
    ]},
    { type: "h2", title: "Tools and Parts You Will Need" },
    { type: "tools-grid", title: "PSU Diagnosis and Replacement Kit", tools: [
      { name: "Replacement Xbox One PSU (OEM or aftermarket)", purpose: "New power supply unit", cost: "$25-45" },
      { name: "T10 and T9 Torx Screwdrivers", purpose: "Console shell disassembly", cost: "$5-10" },
      { name: "Multimeter", purpose: "Testing PSU output voltages", cost: "$15-30" },
      { name: "Compressed Air", purpose: "Cleaning dust from PSU and console", cost: "$5-8" },
      { name: "Thermal Paste (Arctic MX-4 or similar)", purpose: "Reapply to PSU heatsink if cleaning", cost: "$5-10" }
    ]},
    { type: "h2", title: "Before You Start: Important Warnings" },
    { type: "warning-box", title: "High Voltage Danger", content: "The Xbox One internal PSU contains capacitors charged to 300V+ even when the console is unplugged. Wait at least 30 minutes after unplugging before opening the PSU module. Do not touch any components on the primary (input) side of the PSU transformer. If you need to test voltages, only probe the secondary (output) side connectors." },
    { type: "h2", title: "Step-by-Step Power Supply Repair" },
    { type: "method-box", title: "Method 1: PSU Diagnosis and Cleaning", subtitle: "Try this first. Fixes 40% of PSU issues without replacement.", steps: [
      { step: 1, title: "Open the Console", content: "Remove side vent panel, all T10 screws from rear and bottom, and separate shell halves. Remove RF shield. The PSU is the large metal box on the left side of the motherboard." },
      { step: 2, title: "Disconnect and Remove the PSU", content: "Unplug the main power connector from the motherboard (large white connector with 12V and 5V wires). Unplug the PSU fan connector. Remove the T10 screws holding the PSU cage in place. Lift the PSU module out." },
      { step: 3, title: "Clean the PSU", content: "Use compressed air to blow out all dust from the PSU vents and internal fan. Heavy dust buildup is the number one cause of thermal shutdown. If the PSU fan does not spin freely when pushed with a finger, the fan bearing is seized and the fan needs replacement." },
      { step: 4, title: "Test PSU Output Voltages", content: "Reconnect the PSU to the console (do not reassemble the shell). Plug in the power cable. Set your multimeter to DC voltage. Probe the output connector: the 12V pins should read 11.8-12.2V under no load. The 5V standby pins should read 4.9-5.1V. If 12V reads below 11V or above 13V, the PSU voltage regulation has failed and the unit needs replacement." }
    ]},
    { type: "method-box", title: "Method 2: Full PSU Replacement", subtitle: "Permanent fix when cleaning and testing confirm PSU failure", steps: [
      { step: 1, title: "Purchase the Correct Replacement PSU", content: "The Xbox One FAT uses model PA-1131-13MX or equivalent. Verify your console model number (1540, 1525) and match the PSU part number. Aftermarket PSUs work but ensure they are rated for 220W minimum. OEM refurbished units from repair suppliers are the most reliable option." },
      { step: 2, title: "Remove the Old PSU", content: "Follow Method 1 Steps 1-2 to remove the failed PSU." },
      { step: 3, title: "Install the Replacement PSU", content: "Place the new PSU in the same position. Secure with T10 screws. Connect the main power connector to the motherboard (it only fits one way). Connect the PSU fan cable." },
      { step: 4, title: "Test Before Full Reassembly", content: "With the shell still open, connect the power cable and press the power button. The console should boot normally with the Xbox logo on screen. Let it run for 15 minutes to confirm stable power delivery under thermal load. If it shuts down during this test, recheck all connections." }
    ]},
    { type: "h2", title: "How to Test If the Repair Worked" },
    { type: "ordered-list", title: "Post-Repair Verification", items: [
      { term: "Boot Test", desc: "Console powers on immediately when the power button is pressed. White light stays solid." },
      { term: "Load Test", desc: "Run a graphically intensive game for 30-60 minutes. The console should not shut down or exhibit instability." },
      { term: "Voltage Test", desc: "If you have access to the motherboard connector, verify 12V rail reads 11.8-12.2V under gaming load." },
      { term: "Fan Test", desc: "The PSU fan should spin at variable speeds based on temperature. Listen for abnormal noise (grinding indicates bearing failure)." }
    ]},
    { type: "h2", title: "How Long Will This Fix Last" },
    { type: "longevity-box", items: [
      { method: "PSU Cleaning Only", duration: "6-18 months", note: "Cleaning removes dust but does not fix aged capacitors. If the PSU is over 6 years old, capacitors are degrading regardless of cleanliness. Expect thermal shutdowns to return." },
      { method: "Full PSU Replacement (OEM)", duration: "5-8 years", note: "A new OEM PSU resets the capacitor aging clock. With proper ventilation, the replacement unit should match the original lifespan." },
      { method: "Full PSU Replacement (aftermarket)", duration: "3-5 years", note: "Aftermarket units use lower-grade capacitors but are functional. Expect slightly shorter lifespan compared to OEM." }
    ]},
    { type: "h2", title: "Related Guides and Next Steps" },
    { type: "related-guides", guides: [
      { title: "Xbox One HDMI Port Replacement", link: "/guides/microsoft/xbox-one-fat-original/hdmi-port-replacement" },
      { title: "Xbox One X Thermal Paste Replacement", link: "/guides/microsoft/xbox-one-x/thermal-paste-replacement" },
      { title: "Xbox Series S Fan Replacement", link: "/guides/microsoft/xbox-series-s/fan-replacement" }
    ]},
    { type: "h2", title: "Frequently Asked Questions" },
    { type: "faq", questions: [
      { q: "Can I use an Xbox One S power supply in an Xbox One FAT?", a: "No. The Xbox One S (model 1681) uses a smaller internal PSU with a different connector and lower wattage. The form factor and mounting points are not compatible with the Xbox One FAT. Always match the PSU to your exact console model." },
      { q: "Is it cheaper to repair or replace the Xbox One?", a: "A replacement PSU costs $25-45 and takes 30 minutes to install. A used Xbox One FAT costs $100-150. If your console has no other issues, PSU replacement is significantly more cost-effective. If the motherboard also has problems (HDMI, APU, etc.), buying a replacement console makes more sense." },
      { q: "Why does my Xbox One turn on then immediately shut off?", a: "This indicates the PSU can deliver enough current for the initial power-on sequence but cannot sustain the load. Common causes: dried-out filter capacitors, failed MOSFETs on the 12V rail, or a shorted component on the motherboard drawing excessive current. Test the 12V rail under load to identify the failing stage." },
      { q: "Can a power surge damage my Xbox One permanently?", a: "Yes. A severe power surge can destroy the PSU's MOSFETs, bridge rectifier, and occasionally sends damaging voltage to the motherboard. Using a quality surge protector ($15-30) prevents this. UPS units with automatic voltage regulation provide the best protection." }
    ]},
    { type: "conclusion", content: "Xbox One FAT power supply issues are among the most common reasons these consoles sit unused in closets. A $25-45 replacement PSU and 30 minutes of work brings most of them back to life." },
    { type: "final-cta", title: "Get Your Controller Ready", content: "Once your Xbox is running again, test your controllers for drift, button response, and latency.", buttonText: "Test Your Controller", buttonLink: "/" }
  ]
};
