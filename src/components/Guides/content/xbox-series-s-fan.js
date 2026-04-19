// Xbox Series S Fan Replacement
export const xboxSeriesSFanContent = {
  meta: { title: "Xbox Series S Fan Replacement | Fix Overheating & Noise 2026", description: "Replace a noisy or failed fan in your Xbox Series S. Step-by-step teardown with fan specifications, thermal paste tips, and noise troubleshooting.", keywords: ["xbox series s fan replacement", "xbox series s overheating", "xbox series s loud fan fix", "xbox series s fan noise"], readTime: "20 MIN READ", difficulty: "3/5", lastUpdated: "April 2026" },
  hero: { title: "Xbox Series S Fan Replacement", subtitle: "Fix Loud Fan Noise, Overheating, and Thermal Shutdown Issues", author: "Uneeb Katib | Hardware Diagnostic Specialist", experience: "6+ years in controller hardware analysis", publishedDate: "April 2026" },
  sections: [
    { type: "introduction", content: "The Xbox Series S uses a single centrifugal blower fan to cool its custom AMD APU. The compact design means this fan is the sole barrier between your console and thermal throttling. When the fan fails, develops bearing noise, or cannot keep up with dust accumulation, performance suffers. This guide covers teardown, fan replacement, and optional thermal paste service to restore full cooling performance." },
    { type: "h2", title: "What Causes Fan Issues on Xbox Series S" },
    { type: "technical-box", title: "Xbox Series S Cooling Design", items: ["Single 110mm centrifugal blower fan rated at ~3500 RPM maximum", "Air intake from the circular vent on top, exhaust through rear vents", "Fan is PWM-controlled based on APU temperature sensor readings", "The compact 275x151x65mm chassis limits airflow compared to the Series X"] },
    { type: "h2", title: "How to Confirm Your Fan Needs Replacement" },
    { type: "checklist", title: "Fan Failure Symptoms", items: ["Grinding, clicking, or rattling noise from the console", "Fan runs at maximum speed constantly regardless of workload", "Console overheats and shuts down during gaming", "Fan does not spin at all when powered on (silent but overheating)", "Intermittent buzzing that changes with console orientation"] },
    { type: "h2", title: "Tools and Parts You Will Need" },
    { type: "tools-grid", title: "Fan Replacement Kit", tools: [
      { name: "Replacement Fan (Xbox Series S compatible)", purpose: "New fan unit", cost: "$12-25" },
      { name: "T8 Security Torx Screwdriver", purpose: "Console shell screws", cost: "$5" },
      { name: "T6 Torx Screwdriver", purpose: "Internal component screws", cost: "$5" },
      { name: "Plastic Spudger", purpose: "Prying clips and connectors", cost: "$3" },
      { name: "Compressed Air", purpose: "Cleaning dust from heatsink", cost: "$5-8" },
      { name: "Thermal Paste (optional)", purpose: "Reapply if removing heatsink", cost: "$7-12" }
    ]},
    { type: "h2", title: "Step-by-Step Fan Replacement" },
    { type: "method-box", title: "Xbox Series S Fan Replacement Procedure", subtitle: "Moderate difficulty. Takes 20-30 minutes.", steps: [
      { step: 1, title: "Remove the Bottom Panel", content: "Place the console upside down. Pry off the black bottom panel starting from the rear corners. It is held by plastic clips. Work slowly around the perimeter." },
      { step: 2, title: "Remove the Metal Chassis Screws", content: "Remove all T8 security Torx screws visible on the bottom (typically 5-7 screws). Some screws are under sticker covers." },
      { step: 3, title: "Separate the Shell", content: "Carefully lift the white outer shell off the inner chassis. Disconnect the front panel button ribbon cable and the Wi-Fi antenna cable if needed." },
      { step: 4, title: "Access the Fan", content: "The fan is visible on top of the heatsink assembly. Disconnect the fan power cable from the motherboard (small 3-pin or 4-pin connector). Remove the T6 screws holding the fan shroud to the heatsink." },
      { step: 5, title: "Remove and Replace the Fan", content: "Lift the old fan out. Clean any dust from the heatsink fins with compressed air. Place the new fan in the same orientation (check the airflow direction arrow on the fan housing). Secure with T6 screws. Reconnect the power cable." },
      { step: 6, title: "Reassemble and Test", content: "Reassemble in reverse order. Power on the console. The new fan should spin up quietly. Run a game for 20 minutes to verify temperatures remain stable and the fan adjusts speed based on load." }
    ]},
    { type: "h2", title: "How to Test If the Repair Worked" },
    { type: "ordered-list", title: "Post-Repair Verification", items: [
      { term: "Noise Level", desc: "New fan should produce a smooth airflow sound. No grinding, clicking, or rattling." },
      { term: "Speed Variation", desc: "Fan should run slowly at idle and increase speed during gaming. Constant maximum RPM indicates a thermal issue beyond the fan." },
      { term: "Stability Test", desc: "Play a demanding game for 60 minutes. No thermal shutdowns or throttling." },
      { term: "Temperature Check", desc: "The top vent area should push warm (not hot) air during gaming." }
    ]},
    { type: "h2", title: "Related Guides and Next Steps" },
    { type: "related-guides", guides: [
      { title: "Xbox Series S Storage Expansion", link: "/guides/microsoft/xbox-series-s/storage-expansion" },
      { title: "Xbox One S Fan Cleaning", link: "/guides/microsoft/xbox-one-s/fan-cleaning-and-replacement" },
      { title: "Xbox Series X Liquid Metal Maintenance", link: "/guides/microsoft/xbox-series-x/liquid-metal-maintenance" }
    ]},
    { type: "h2", title: "Frequently Asked Questions" },
    { type: "faq", questions: [
      { q: "Can I use a third-party fan in the Xbox Series S?", a: "Yes, as long as the replacement fan matches the original specifications: same connector type (3-pin or 4-pin PWM), same mounting dimensions, and similar or higher RPM rating. Aftermarket fans from reputable suppliers work well and cost $12-20." },
      { q: "Should I replace the thermal paste when replacing the fan?", a: "If your console is 3+ years old and you are already inside, replacing thermal paste is recommended. It adds 10 minutes to the repair and provides additional cooling improvement. If the console is less than 2 years old, the thermal paste is likely still good." },
      { q: "Why is my Xbox Series S fan loud only during certain games?", a: "Games with heavy GPU load (high resolution, ray tracing) generate more heat, causing the fan to ramp up. This is normal behavior. If the fan is loud during menu screens or light games, the heatsink is likely clogged with dust or the thermal paste has degraded." },
      { q: "Can a failed fan damage the Xbox Series S hardware?", a: "Modern consoles have thermal protection that shuts down the system before damage occurs. A failed fan causes thermal shutdown (annoying) but typically does not cause permanent hardware damage. Repeated thermal cycling without fixing the fan issue can accelerate solder joint degradation over months." }
    ]},
    { type: "conclusion", content: "Xbox Series S fan replacement is a straightforward repair that eliminates noise, prevents overheating, and extends your console's lifespan. A $15 fan and 30 minutes of work bring your console back to quiet, cool operation." },
    { type: "final-cta", title: "Test Your Gaming Setup", content: "With your console running cool, verify your controllers are performing accurately.", buttonText: "Run Controller Test", buttonLink: "/" }
  ]
};
