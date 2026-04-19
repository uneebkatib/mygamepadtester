'use client'
import React, { useEffect, useState } from 'react';
import { guidesDataLight } from './guidesDataLight';
import Link from 'next/link';
import GuideRenderer from './GuideRenderer';

// ── Controller Testing ──
import { professionalCalibrationContent } from './content/professional-calibration-methods';
import { analogStickOptimizationContent } from './content/analog-stick-optimization';
import { advancedDriftAnalysisContent } from './content/advanced-drift-analysis';
import { microDriftDetectionContent } from './content/micro-drift-detection';
import { inputLagOptimizationContent } from './content/input-lag-optimization';
import { wirelessVsWiredContent } from './content/wireless-vs-wired-analysis';

// ── Microsoft ──
import { stickDriftRepairContent } from './content/xbox-one-stick-drift-repair';
import { buttonRepairContent } from './content/xbox-one-button-repair';
import { xboxOneHdmiContent } from './content/xbox-one-hdmi-replacement';
import { xboxOnePowerSupplyContent } from './content/xbox-one-power-supply';
import { xboxOneSOpticalDriveContent } from './content/xbox-one-s-optical-drive';
import { xboxOneSFanContent } from './content/xbox-one-s-fan-cleaning';
import { xboxOneXThermalPasteContent } from './content/xbox-one-x-thermal-paste';
import { xboxOneXHddContent } from './content/xbox-one-x-hdd-upgrade';
import { xboxSeriesSStorageContent } from './content/xbox-series-s-storage';
import { xboxSeriesSFanContent } from './content/xbox-series-s-fan';
import { xboxSeriesXSsdContent, xboxSeriesXLiquidMetalContent } from './content/xbox-series-x-guides';
import { xboxElitePaddleContent, xboxEliteHairTriggerContent } from './content/xbox-elite-1-guides';
import { xboxElite2BatteryContent, xboxElite2StickTensionContent } from './content/xbox-elite-2-guides';

// ── Nintendo ──
import { switchTeardownContent, switchScreenContent, switchBatteryContent, switchKickstandContent } from './content/nintendo-switch-guides';
import { switchLiteAnalogContent, switchLiteDpadContent, switchOledScreenContent, switchOledKickstandContent, joyconButtonContent, joyconRailContent, switch2InfoContent, switch2JoyconContent } from './content/nintendo-peripheral-guides';
import { joyconDriftRepairContent } from './content/joycon-drift-repair';

// ── Sony ──
import { ps5HdmiReplacementContent } from './content/ps5-hdmi-replacement';
import { ps5DualSenseTroubleshootingContent } from './content/ps5-dualsense-troubleshooting';
import { ps4DualShockButtonRepairContent } from './content/ps4-dualshock-button-repair';
import { ps3YlodContent, ps3BlurayContent, ds3RepairContent, ds3BatteryContent, ps4HddContent, ps4OverheatingContent } from './content/sony-ps3-ps4-guides';
import { ps5SsdContent, ps5FanCleaningContent, ps5SlimHdmiContent, ps5SlimDriveContent, ps5ProHdmiContent, ps5ProCoolingContent, dualsenseAdaptiveTriggerContent, dualsenseEdgeRepairContent, dualsenseEdgeStickContent } from './content/sony-ps5-guides';

// ── Valve ──
import { steamdeckSsdUpgradeContent } from './content/steamdeck-ssd-upgrade';
import { steamdeckThumbstickContent, steamdeckScreenContent, steamdeckOledCareContent, steamdeckOledCoolingContent } from './content/valve-hdmi-guides';

// ── HDMI ──
import { hdmiDiodeTestContent } from './content/hdmi-diode-test';
import { hdmiTroubleshootingContent, hdmiPortReplacementContent } from './content/valve-hdmi-guides';


// Master content map: "{companySlug}-{deviceSlug}-{guideSlug}" -> content object
const guideContentMap = {
  // ── Controller Testing ──
  'controller-testing-gamepad-calibration-professional-calibration-methods': professionalCalibrationContent,
  'controller-testing-gamepad-calibration-analog-stick-optimization': analogStickOptimizationContent,
  'controller-testing-drift-detection-advanced-drift-analysis': advancedDriftAnalysisContent,
  'controller-testing-drift-detection-micro-drift-detection': microDriftDetectionContent,
  'controller-testing-latency-testing-input-lag-optimization': inputLagOptimizationContent,
  'controller-testing-latency-testing-wireless-vs-wired-analysis': wirelessVsWiredContent,

  // ── Microsoft: Xbox One FAT ──
  'microsoft-xbox-one-fat-original-hdmi-port-replacement': xboxOneHdmiContent,
  'microsoft-xbox-one-fat-original-power-supply-repair': xboxOnePowerSupplyContent,
  // ── Microsoft: Xbox One S ──
  'microsoft-xbox-one-s-optical-drive-replacement': xboxOneSOpticalDriveContent,
  'microsoft-xbox-one-s-fan-cleaning-and-replacement': xboxOneSFanContent,
  // ── Microsoft: Xbox One X ──
  'microsoft-xbox-one-x-thermal-paste-replacement': xboxOneXThermalPasteContent,
  'microsoft-xbox-one-x-hard-drive-upgrade': xboxOneXHddContent,
  // ── Microsoft: Xbox One Gamepad ──
  'microsoft-xbox-one-gamepad-stick-drift-repair': stickDriftRepairContent,
  'microsoft-xbox-one-gamepad-button-repair-guide': buttonRepairContent,
  // ── Microsoft: Xbox Series S ──
  'microsoft-xbox-series-s-storage-expansion': xboxSeriesSStorageContent,
  'microsoft-xbox-series-s-fan-replacement': xboxSeriesSFanContent,
  // ── Microsoft: Xbox Series X ──
  'microsoft-xbox-series-x-ssd-expansion-guide': xboxSeriesXSsdContent,
  'microsoft-xbox-series-x-liquid-metal-maintenance': xboxSeriesXLiquidMetalContent,
  // ── Microsoft: Xbox Elite 1 ──
  'microsoft-xbox-elite-series-gamepad-paddle-replacement': xboxElitePaddleContent,
  'microsoft-xbox-elite-series-gamepad-hair-trigger-adjustment': xboxEliteHairTriggerContent,
  // ── Microsoft: Xbox Elite 2 ──
  'microsoft-xbox-elite-series-2-gamepad-battery-replacement': xboxElite2BatteryContent,
  'microsoft-xbox-elite-series-2-gamepad-stick-tension-adjustment': xboxElite2StickTensionContent,

  // ── Nintendo: Switch ──
  'nintendo-nintendo-switch-nintendo-switch-teardown-disassembly': switchTeardownContent,
  'nintendo-nintendo-switch-screen-replacement-guide': switchScreenContent,
  'nintendo-nintendo-switch-battery-replacement': switchBatteryContent,
  'nintendo-nintendo-switch-kickstand-repair': switchKickstandContent,
  // ── Nintendo: Switch Lite ──
  'nintendo-nintendo-switch-lite-analog-stick-replacement': switchLiteAnalogContent,
  'nintendo-nintendo-switch-lite-d-pad-repair': switchLiteDpadContent,
  // ── Nintendo: Switch OLED ──
  'nintendo-nintendo-switch-oled-oled-screen-replacement': switchOledScreenContent,
  'nintendo-nintendo-switch-oled-improved-kickstand-maintenance': switchOledKickstandContent,
  // ── Nintendo: Joy-Con ──
  'nintendo-nintendo-switch-joy-con-joy-con-button-repair': joyconButtonContent,
  'nintendo-nintendo-switch-joy-con-joy-con-rail-replacement': joyconRailContent,
  // ── Nintendo: Switch 2 ──
  'nintendo-nintendo-switch-2-pre-release-information': switch2InfoContent,
  'nintendo-nintendo-switch-2-joy-con-next-gen-joy-con-features': switch2JoyconContent,

  // ── Sony: PS3 ──
  'sony-playstation-3-ps3-ylod-repair-guide': ps3YlodContent,
  'sony-playstation-3-ps3-blu-ray-drive-repair': ps3BlurayContent,
  // ── Sony: PS3 DualShock 3 ──
  'sony-ps3-gamepad-dualshock-3-dualshock-3-repair': ds3RepairContent,
  'sony-ps3-gamepad-dualshock-3-battery-replacement': ds3BatteryContent,
  // ── Sony: PS4 ──
  'sony-playstation-4-ps4-hard-drive-upgrade': ps4HddContent,
  'sony-playstation-4-ps4-overheating-repair': ps4OverheatingContent,
  // ── Sony: PS5 Console ──
  'sony-ps5-console-ps5-hdmi-replacement': ps5HdmiReplacementContent,
  'sony-ps5-console-ssd-expansion-guide': ps5SsdContent,
  'sony-ps5-console-fan-cleaning-guide': ps5FanCleaningContent,
  // ── Sony: PS5 Slim ──
  'sony-playstation-5-slim-ps5-slim-ps5-slim-hdmi-replacement': ps5SlimHdmiContent,
  'sony-playstation-5-slim-ps5-slim-detachable-drive-module': ps5SlimDriveContent,
  // ── Sony: PS5 Pro ──
  'sony-playstation-5-pro-ps5-pro-ps5-pro-hdmi-replacement': ps5ProHdmiContent,
  'sony-playstation-5-pro-ps5-pro-enhanced-cooling-system': ps5ProCoolingContent,
  // ── Sony: DualSense ──
  'sony-ps5-dualsense-complete-troubleshooting': ps5DualSenseTroubleshootingContent,
  'sony-ps5-adaptive-trigger-repair': dualsenseAdaptiveTriggerContent,
  // ── Sony: DualSense Edge ──
  'sony-ps5-gamepad-dualsense-edge-dualsense-edge-repair': dualsenseEdgeRepairContent,
  'sony-ps5-gamepad-dualsense-edge-stick-module-replacement': dualsenseEdgeStickContent,

  // ── Valve: Steam Deck LCD ──
  'valve-steamdeck-1010-lcd-ssd-upgrade-guide': steamdeckSsdUpgradeContent,
  'valve-steamdeck-1010-lcd-thumbstick-replacement': steamdeckThumbstickContent,
  'valve-steamdeck-1010-lcd-screen-replacement': steamdeckScreenContent,
  // ── Valve: Steam Deck OLED ──
  'valve-steamdeck-1030-oled-oled-display-care': steamdeckOledCareContent,
  'valve-steamdeck-1030-oled-enhanced-cooling-system': steamdeckOledCoolingContent,

  // ── HDMI ──
  'hdmi-all-consoles-all-consoles-hdmi-diode-test': hdmiDiodeTestContent,
  'hdmi-all-consoles-hdmi-troubleshooting-guide': hdmiTroubleshootingContent,
  'hdmi-all-consoles-hdmi-port-replacement-guide': hdmiPortReplacementContent,
};

export default function GuideContent({ companySlug, deviceSlug, guideSlug }) {
    // Determine data immediately (statically imported)
    const category = guidesDataLight[companySlug];
    const device = category?.devices?.[deviceSlug];
    const guide = device?.guides?.[guideSlug];

    if (!guide || !device || !category) {
        return (
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
                <h1 style={{ color: '#e53e3e', marginBottom: '1rem' }}>Guide Not Found</h1>
                <p style={{ color: '#718096', marginBottom: '2rem' }}>The guide you are looking for does not exist or has been moved.</p>
                <Link href="/guides" style={{ color: '#DA7756', textDecoration: 'underline' }}>Back to all guides</Link>
            </div>
        );
    }

    // Resolve content key
    const contentKey = `${companySlug}-${deviceSlug}-${guideSlug}`;
    const content = guideContentMap[contentKey];

    return (
        <>
            {/* Breadcrumb Navigation */}
            <nav style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem 2rem', fontSize: '0.9rem', color: '#718096' }}>
                <Link href="/guides" style={{ color: '#DA7756', textDecoration: 'none' }}>Guides</Link>
                <span style={{ margin: '0 0.5rem' }}>&rsaquo;</span>
                <Link href={`/guides/${companySlug}`} style={{ color: '#DA7756', textDecoration: 'none' }}>{category.title}</Link>
                <span style={{ margin: '0 0.5rem' }}>&rsaquo;</span>
                <Link href={`/guides/${companySlug}/${deviceSlug}`} style={{ color: '#DA7756', textDecoration: 'none' }}>{device.title}</Link>
                <span style={{ margin: '0 0.5rem' }}>&rsaquo;</span>
                <span style={{ color: '#4a5568' }}>{guide.title}</span>
            </nav>

            {/* Render content */}
            {content ? (
                <GuideRenderer content={content} />
            ) : (
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
                    <header style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '3px solid #DA7756' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1a202c' }}>{guide.title}</h1>
                        <p style={{ fontSize: '1.2rem', color: '#718096' }}>
                            Complete guide for {device.title}
                        </p>
                        {guide.readTime && (
                            <span style={{
                                display: 'inline-block',
                                padding: '0.4rem 1rem',
                                background: '#f7fafc',
                                borderRadius: '20px',
                                fontSize: '0.85rem',
                                color: '#4a5568',
                                marginTop: '1rem'
                            }}>
                                {guide.readTime}
                            </span>
                        )}
                    </header>

                    <div style={{
                        background: '#fff',
                        border: '2px dashed #e2e8f0',
                        borderRadius: '16px',
                        padding: '3rem',
                        textAlign: 'center',
                        marginBottom: '2rem'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📖</div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2d3748' }}>Guide Content Coming Soon</h2>
                        <p style={{ color: '#718096', marginBottom: '2rem', lineHeight: '1.6' }}>
                            This guide is being prepared with expert instructions and step-by-step details.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
