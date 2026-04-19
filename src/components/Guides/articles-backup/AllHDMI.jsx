'use client'

import styled from "styled-components";
import { HDMI_PS3_FAT } from "../../../components/HDMITester/HDMI_PS3_FAT";
import { HDMI_PS4_FAT } from "../../../components/HDMITester/HDMI_PS4_FAT";
import { HDMI_PS4_PRO } from "../../../components/HDMITester/HDMI_PS4_PRO";
import { HDMI_PS4_SLIM } from "../../../components/HDMITester/HDMI_PS4_SLIM";
import { HDMI_PS5_FAT } from "../../../components/HDMITester/HDMI_PS5_FAT";
import { HDMI_PS5_PRO } from "../../../components/HDMITester/HDMI_PS5_PRO";
import { HDMI_XBOX_ONE_FAT } from "../../../components/HDMITester/HDMI_XBOX_ONE_FAT";
import { HDMI_XBOX_ONE_S } from "../../../components/HDMITester/HDMI_XBOX_ONE_S";
import { HDMI_XBOX_ONE_X } from "../../../components/HDMITester/HDMI_XBOX_ONE_X";
import { HDMI_XBOX_SERIES_S } from "@/components/HDMITester/HDMI_XBOX_SERIES_S";
import { HDMI_XBOX_SERIES_X } from "@/components/HDMITester/HDMI_XBOX_SERIES_X";
import { StyledArticleWrapper } from "@/components/Guides/articles/ArticleStyles";
import { ArticleContent } from "@/components/SEO/OptimizedContent.jsx";

const AllHDMIWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-self: center;
  justify-content: center;
  margin-top: 2rem;
  gap: 5rem;
  position: absolute;
`;

export function AllHDMI() {
  return (
    <StyledArticleWrapper>
      <h1>Universal HDMI Diode Testing Guide</h1>
      <p>Professional diagnostic procedures for testing HDMI diodes and ESD protection circuits across all gaming consoles.</p>
      
      <h2>HDMI Protection Circuit Components</h2>
      <ul>
        <li>ESD protection diodes</li>
        <li>Common mode chokes</li>
        <li>Termination resistors</li>
        <li>Signal conditioning circuits</li>
      </ul>
      
      <h2>Testing Equipment Required</h2>
      <ul>
        <li>Digital multimeter with diode test function</li>
        <li>Oscilloscope for signal analysis</li>
        <li>HDMI signal generator (optional)</li>
        <li>Magnifying equipment for visual inspection</li>
      </ul>
      
      <h2>Diode Test Procedure</h2>
      <ol>
        <li>Power off console completely</li>
        <li>Remove HDMI cable</li>
        <li>Set multimeter to diode test mode</li>
        <li>Test each HDMI pin for proper diode response</li>
        <li>Compare readings to known good values</li>
        <li>Document any out-of-spec readings</li>
      </ol>
      
      <h2>Normal Readings</h2>
      <p>Healthy ESD diodes typically show 0.3-0.7V forward voltage and infinite resistance in reverse direction.</p>
      
      <h2>Failure Indicators</h2>
      <ul>
        <li>Short circuit (0V both directions)</li>
        <li>Open circuit (infinite resistance both directions)</li>
        <li>High forward voltage (&gt;1V)</li>
        <li>Low reverse resistance</li>
      </ul>
      
      <h3>
        USB-C is reversible - when you connect the tester, the results may
        appear in the opposite order.
      </h3>

      <AllHDMIWrapper>
        <HDMI_PS4_FAT />
        <HDMI_PS4_SLIM />
        <HDMI_PS4_PRO />
        <HDMI_PS5_FAT />
        <HDMI_PS5_PRO />
        <HDMI_XBOX_ONE_FAT />
        <HDMI_XBOX_ONE_S />
        <HDMI_XBOX_ONE_X />
        <HDMI_XBOX_SERIES_S />
        <HDMI_XBOX_SERIES_X />
        <HDMI_PS3_FAT />
      </AllHDMIWrapper>
      
      <ArticleContent 
        articleTitle="Universal HDMI Troubleshooting Professional Guide" 
        articleDescription="Comprehensive guide for diagnosing and fixing HDMI issues across all gaming consoles. Professional testing methods for ESD protection circuits, signal integrity analysis, and connector repair procedures."
      />
    </StyledArticleWrapper>
  );
}