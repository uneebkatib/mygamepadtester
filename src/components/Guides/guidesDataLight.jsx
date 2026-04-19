// guidesDataLight.jsx - Master data matching the exact URL architecture
// This drives the /guides listing page and device/guide metadata

export const guidesDataLight = {
  "controller-testing": {
    title: "Controller Testing",
    description: "Diagnostic methodologies for gamepad calibration, drift detection, and latency analysis.",
    icon: "🏢",
    color: "#E8622A",
    devices: {
      "gamepad-calibration": {
        title: "Gamepad Calibration",
        guides: {
          "professional-calibration-methods": { title: "Professional Calibration Methods", readTime: "12 min read" },
          "analog-stick-optimization": { title: "Analog Stick Optimization", readTime: "10 min read" }
        }
      },
      "drift-detection": {
        title: "Drift Detection",
        guides: {
          "advanced-drift-analysis": { title: "Advanced Drift Analysis", readTime: "15 min read" },
          "micro-drift-detection": { title: "Micro-Drift Detection", readTime: "12 min read" }
        }
      },
      "latency-testing": {
        title: "Latency Testing",
        guides: {
          "input-lag-optimization": { title: "Input Lag Optimization", readTime: "11 min read" },
          "wireless-vs-wired-analysis": { title: "Wireless vs Wired Analysis", readTime: "9 min read" }
        }
      }
    }
  },
  "microsoft": {
    title: "Microsoft",
    description: "Xbox console and controller repair, maintenance, and hardware upgrade guides.",
    icon: "🏢",
    color: "#107c10",
    devices: {
      "xbox-one-fat-original": {
        title: "Xbox One FAT (Original)",
        guides: {
          "hdmi-port-replacement": { title: "HDMI Port Replacement", readTime: "20 min read" },
          "power-supply-repair": { title: "Power Supply Repair", readTime: "15 min read" }
        }
      },
      "xbox-one-s": {
        title: "Xbox One S",
        guides: {
          "optical-drive-replacement": { title: "Optical Drive Replacement", readTime: "18 min read" },
          "fan-cleaning-and-replacement": { title: "Fan Cleaning & Replacement", readTime: "14 min read" }
        }
      },
      "xbox-one-x": {
        title: "Xbox One X",
        guides: {
          "thermal-paste-replacement": { title: "Thermal Paste Replacement", readTime: "25 min read" },
          "hard-drive-upgrade": { title: "Hard Drive Upgrade", readTime: "15 min read" }
        }
      },
      "xbox-one-gamepad": {
        title: "Xbox One Gamepad",
        guides: {
          "stick-drift-repair": { title: "Stick Drift Repair", readTime: "25 min read" },
          "button-repair-guide": { title: "Button Repair Guide", readTime: "20 min read" }
        }
      },
      "xbox-series-s": {
        title: "Xbox Series S",
        guides: {
          "storage-expansion": { title: "Storage Expansion Guide", readTime: "15 min read" },
          "fan-replacement": { title: "Fan Replacement", readTime: "20 min read" }
        }
      },
      "xbox-series-x": {
        title: "Xbox Series X",
        guides: {
          "ssd-expansion-guide": { title: "SSD Expansion Guide", readTime: "12 min read" },
          "liquid-metal-maintenance": { title: "Liquid Metal Maintenance", readTime: "22 min read" }
        }
      },
      "xbox-elite-series-gamepad": {
        title: "Xbox Elite Series 1 Gamepad",
        guides: {
          "paddle-replacement": { title: "Paddle Replacement", readTime: "15 min read" },
          "hair-trigger-adjustment": { title: "Hair Trigger Adjustment", readTime: "10 min read" }
        }
      },
      "xbox-elite-series-2-gamepad": {
        title: "Xbox Elite Series 2 Gamepad",
        guides: {
          "battery-replacement": { title: "Battery Replacement", readTime: "18 min read" },
          "stick-tension-adjustment": { title: "Stick Tension Adjustment", readTime: "12 min read" }
        }
      }
    }
  },
  "nintendo": {
    title: "Nintendo",
    description: "Switch consoles, Joy-Con controllers, and accessory repair tutorials.",
    icon: "🏢",
    color: "#e60012",
    devices: {
      "nintendo-switch": {
        title: "Nintendo Switch",
        guides: {
          "nintendo-switch-teardown-disassembly": { title: "Teardown & Disassembly", readTime: "20 min read" },
          "screen-replacement-guide": { title: "Screen Replacement", readTime: "25 min read" },
          "battery-replacement": { title: "Battery Replacement", readTime: "15 min read" },
          "kickstand-repair": { title: "Kickstand Repair", readTime: "8 min read" }
        }
      },
      "nintendo-switch-lite": {
        title: "Nintendo Switch Lite",
        guides: {
          "analog-stick-replacement": { title: "Analog Stick Replacement", readTime: "18 min read" },
          "d-pad-repair": { title: "D-Pad Repair", readTime: "12 min read" }
        }
      },
      "nintendo-switch-oled": {
        title: "Nintendo Switch OLED",
        guides: {
          "oled-screen-replacement": { title: "OLED Screen Replacement", readTime: "25 min read" },
          "improved-kickstand-maintenance": { title: "Improved Kickstand Maintenance", readTime: "8 min read" }
        }
      },
      "nintendo-switch-joy-con": {
        title: "Nintendo Switch Joy-Con",
        guides: {
          "joy-con-button-repair": { title: "Joy-Con Button Repair", readTime: "15 min read" },
          "joy-con-rail-replacement": { title: "Joy-Con Rail Replacement", readTime: "18 min read" }
        }
      },
      "nintendo-switch-2": {
        title: "Nintendo Switch 2",
        guides: {
          "pre-release-information": { title: "Pre-Release Information", readTime: "6 min read" }
        }
      },
      "nintendo-switch-2-joy-con": {
        title: "Nintendo Switch 2 Joy-Con",
        guides: {
          "next-gen-joy-con-features": { title: "Next-Gen Joy-Con Features", readTime: "8 min read" }
        }
      }
    }
  },
  "sony": {
    title: "Sony",
    description: "PlayStation console and DualSense/DualShock controller diagnostics and repair.",
    icon: "🏢",
    color: "#003087",
    devices: {
      "playstation-3-ps3": {
        title: "PlayStation 3 (PS3)",
        guides: {
          "ylod-repair-guide": { title: "YLOD Repair Guide", readTime: "30 min read" },
          "blu-ray-drive-repair": { title: "Blu-Ray Drive Repair", readTime: "20 min read" }
        }
      },
      "ps3-gamepad-dualshock-3": {
        title: "PS3 DualShock 3",
        guides: {
          "dualshock-3-repair": { title: "DualShock 3 Repair", readTime: "15 min read" },
          "battery-replacement": { title: "Battery Replacement", readTime: "12 min read" }
        }
      },
      "playstation-4-ps4": {
        title: "PlayStation 4 (PS4)",
        guides: {
          "hard-drive-upgrade": { title: "Hard Drive Upgrade", readTime: "15 min read" },
          "overheating-repair": { title: "Overheating Repair", readTime: "20 min read" }
        }
      },
      "ps5-console": {
        title: "PS5 Console",
        guides: {
          "ps5-hdmi-replacement": { title: "PS5 HDMI Replacement", readTime: "25 min read" },
          "ssd-expansion-guide": { title: "SSD Expansion Guide", readTime: "10 min read" },
          "fan-cleaning-guide": { title: "Fan Cleaning Guide", readTime: "15 min read" }
        }
      },
      "playstation-5-slim-ps5-slim": {
        title: "PlayStation 5 Slim",
        guides: {
          "ps5-slim-hdmi-replacement": { title: "PS5 Slim HDMI Replacement", readTime: "25 min read" },
          "detachable-drive-module": { title: "Detachable Drive Module", readTime: "12 min read" }
        }
      },
      "playstation-5-pro-ps5-pro": {
        title: "PlayStation 5 Pro",
        guides: {
          "ps5-pro-hdmi-replacement": { title: "PS5 Pro HDMI Replacement", readTime: "25 min read" },
          "enhanced-cooling-system": { title: "Enhanced Cooling System", readTime: "18 min read" }
        }
      },
      "ps5": {
        title: "PS5 DualSense Controller",
        guides: {
          "dualsense-complete-troubleshooting": { title: "DualSense Complete Troubleshooting", readTime: "20 min read" },
          "adaptive-trigger-repair": { title: "Adaptive Trigger Repair", readTime: "18 min read" }
        }
      },
      "ps5-gamepad-dualsense-edge": {
        title: "DualSense Edge",
        guides: {
          "dualsense-edge-repair": { title: "DualSense Edge Repair", readTime: "20 min read" },
          "stick-module-replacement": { title: "Stick Module Replacement", readTime: "15 min read" }
        }
      }
    }
  },
  "valve": {
    title: "Valve",
    description: "Steam Deck maintenance, hardware upgrades, and repair manuals.",
    icon: "🏢",
    color: "#171a21",
    devices: {
      "steamdeck-1010-lcd": {
        title: "Steam Deck 1010 (LCD)",
        guides: {
          "ssd-upgrade-guide": { title: "SSD Upgrade Guide", readTime: "15 min read" },
          "thumbstick-replacement": { title: "Thumbstick Replacement", readTime: "20 min read" },
          "screen-replacement": { title: "Screen Replacement", readTime: "25 min read" }
        }
      },
      "steamdeck-1030-oled": {
        title: "Steam Deck 1030 (OLED)",
        guides: {
          "oled-display-care": { title: "OLED Display Care", readTime: "10 min read" },
          "enhanced-cooling-system": { title: "Enhanced Cooling System", readTime: "18 min read" }
        }
      }
    }
  },
  "hdmi": {
    title: "HDMI & Display",
    description: "Universal HDMI diode testing, troubleshooting, and port replacement guides.",
    icon: "🏢",
    color: "#4a5568",
    devices: {
      "all-consoles": {
        title: "All Consoles",
        guides: {
          "all-consoles-hdmi-diode-test": { title: "HDMI Diode Test (All Consoles)", readTime: "18 min read" },
          "hdmi-troubleshooting-guide": { title: "HDMI Troubleshooting Guide", readTime: "15 min read" },
          "hdmi-port-replacement-guide": { title: "HDMI Port Replacement Guide", readTime: "25 min read" }
        }
      }
    }
  }
};
