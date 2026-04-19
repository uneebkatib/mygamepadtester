import React from 'react';
import { AllHDMI } from "./articles/AllHDMI";
import { Nintendo_Switch_teardown } from "./articles/Nintendo/Nintendo_Switch_teardown";
import { PS5_HDMI_Replacement } from "./articles/Sony/PS5_HDMI_Replacement";

export const guidesData = {
  "microsoft": {
    title: "Microsoft",
    devices: {
      "xbox-one": {
        title: "Xbox One FAT (original)",
        guides: {}
      },
      "xbox-one-s": {
        title: "Xbox One S",
        guides: {}
      },
      "xbox-one-x": {
        title: "Xbox One X",
        guides: {}
      },
      "xbox-series-s": {
        title: "Xbox Series S",
        guides: {}
      },
      "xbox-series-x": {
        title: "Xbox Series X",
        guides: {}
      }
    }
  },
  "nintendo": {
    title: "Nintendo",
    devices: {
      "nintendo-switch": {
        title: "Nintendo Switch",
        guides: {
          "teardown-disassembly": { title: "Teardown & Disassembly", content: <Nintendo_Switch_teardown /> }
        }
      },
      "nintendo-switch-lite": { title: "Nintendo Switch Lite", guides: {} },
      "nintendo-switch-oled": { title: "Nintendo Switch OLED", guides: {} }
    }
  },
  "sony": {
    title: "Sony",
    devices: {
      "playstation-3": { title: "PlayStation 3 (PS3)", guides: {} },
      "playstation-4": { title: "PlayStation 4 (PS4)", guides: {} },
      "playstation-5": {
        title: "PlayStation 5 (PS5)",
        guides: {
          "hdmi-replacement": { title: "HDMI Replacement", content: <PS5_HDMI_Replacement /> }
        }
      },
      "playstation-5-slim": {
        title: "PlayStation 5 Slim",
        guides: {
          "hdmi-replacement": { title: "HDMI Replacement", content: <PS5_HDMI_Replacement /> }
        }
      },
      "playstation-5-pro": {
        title: "PlayStation 5 PRO",
        guides: {
          "hdmi-replacement": { title: "HDMI Replacement", content: <PS5_HDMI_Replacement /> }
        }
      }
    }
  },
  "valve": {
    title: "Valve",
    devices: {
      "steamdeck-lcd": { title: "SteamDeck 1010 (LCD)", guides: {} },
      "steamdeck-oled": { title: "SteamDeck 1030 (OLED)", guides: {} }
    }
  },
  "hdmi": {
    title: "HDMI & Display",
    devices: {
      "all-consoles": {
        title: "All consoles",
        guides: {
          "hdmi-diode-test": { title: "All consoles HDMI diode test", content: <AllHDMI /> }
        }
      }
    }
  }
};
