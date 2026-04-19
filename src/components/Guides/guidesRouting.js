// Master routing table - matches the exact URL structure from the content architecture
// Format: { companySlug: { deviceSlug: [guideSlug, ...] } }
// Generates static pages at: /guides/{companySlug}/{deviceSlug}/{guideSlug}

export const guidesRouting = {
  "controller-testing": {
    "gamepad-calibration": ["professional-calibration-methods", "analog-stick-optimization"],
    "drift-detection": ["advanced-drift-analysis", "micro-drift-detection"],
    "latency-testing": ["input-lag-optimization", "wireless-vs-wired-analysis"]
  },
  "microsoft": {
    "xbox-one-fat-original": ["hdmi-port-replacement", "power-supply-repair"],
    "xbox-one-s": ["optical-drive-replacement", "fan-cleaning-and-replacement"],
    "xbox-one-x": ["thermal-paste-replacement", "hard-drive-upgrade"],
    "xbox-one-gamepad": ["stick-drift-repair", "button-repair-guide"],
    "xbox-series-s": ["storage-expansion", "fan-replacement"],
    "xbox-series-x": ["ssd-expansion-guide", "liquid-metal-maintenance"],
    "xbox-elite-series-gamepad": ["paddle-replacement", "hair-trigger-adjustment"],
    "xbox-elite-series-2-gamepad": ["battery-replacement", "stick-tension-adjustment"]
  },
  "nintendo": {
    "nintendo-switch": ["nintendo-switch-teardown-disassembly", "screen-replacement-guide", "battery-replacement", "kickstand-repair"],
    "nintendo-switch-lite": ["analog-stick-replacement", "d-pad-repair"],
    "nintendo-switch-oled": ["oled-screen-replacement", "improved-kickstand-maintenance"],
    "nintendo-switch-joy-con": ["joy-con-button-repair", "joy-con-rail-replacement"],
    "nintendo-switch-2": ["pre-release-information"],
    "nintendo-switch-2-joy-con": ["next-gen-joy-con-features"]
  },
  "sony": {
    "playstation-3-ps3": ["ylod-repair-guide", "blu-ray-drive-repair"],
    "ps3-gamepad-dualshock-3": ["dualshock-3-repair", "battery-replacement"],
    "playstation-4-ps4": ["hard-drive-upgrade", "overheating-repair"],
    "ps5-console": ["ps5-hdmi-replacement", "ssd-expansion-guide", "fan-cleaning-guide"],
    "playstation-5-slim-ps5-slim": ["ps5-slim-hdmi-replacement", "detachable-drive-module"],
    "playstation-5-pro-ps5-pro": ["ps5-pro-hdmi-replacement", "enhanced-cooling-system"],
    "ps5": ["dualsense-complete-troubleshooting", "adaptive-trigger-repair"],
    "ps5-gamepad-dualsense-edge": ["dualsense-edge-repair", "stick-module-replacement"]
  },
  "valve": {
    "steamdeck-1010-lcd": ["ssd-upgrade-guide", "thumbstick-replacement", "screen-replacement"],
    "steamdeck-1030-oled": ["oled-display-care", "enhanced-cooling-system"]
  },
  "hdmi": {
    "all-consoles": ["all-consoles-hdmi-diode-test", "hdmi-troubleshooting-guide", "hdmi-port-replacement-guide"]
  }
};
