'use client'
import styled from "styled-components";
import { HDMI_PS5_FAT } from "@/components/HDMITester/HDMI_PS5_FAT";
import { HDMI_PS5_PRO } from "@/components/HDMITester/HDMI_PS5_PRO";
import { StyledArticleWrapper } from "@/components/Guides/articles/ArticleStyles";
import { useState } from "react";

const DiodeTesterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin: 1.5rem 0;
`;

const GalleryButton = styled.button`
  font-size: 1.4rem;
  font-weight: bold;
  background: none;
  border: none;
  margin-top: 0.9rem;
  text-align: left;
  text-decoration: underline;
  cursor: pointer;
  color: #c15f3c;
`;

export function PS5_HDMI_Replacement() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StyledArticleWrapper>
        <h1>
          Note: Replacing HDMI requires experience and the right equipment!
        </h1>
        <h2>● Issue Description</h2>
        <div>
          <ol>
            <li>Mechanical damage</li>
            <li>Video/Audio signal depends on cable movement</li>
            <li>No Video/Audio output</li>
          </ol>
        </div>
        
        <h2>● Diagnostics</h2>
        <ol>
          <li>Check for visible mechanical damage.</li>
          <li>Verify the console light – solid white = good.</li>
          <li>Connect a gamepad to confirm console response.</li>
          <li>
            Perform a diode test as shown below. Values may vary slightly, but
            the key is the location of the green, red, and white pins.
          </li>

          <DiodeTesterWrapper>
            <HDMI_PS5_FAT />
            <HDMI_PS5_PRO />
          </DiodeTesterWrapper>
        </ol>
        <h2>● Repair Steps</h2>
        <ol>
          <li>
            The PS5 motherboard is robust. Use hot air at 420°C, airflow 2–3,
            with preheating at 160°C.
          </li>
          <li>Apply flux and fresh solder.</li>
          <li>Heat the area – using a soldering iron can help.</li>
          <li>
            Be careful with the small components located behind the HDMI port –
            they can be easily displaced or damaged.
          </li>
          <li>Clean the pads thoroughly.</li>
          <li>Install the new HDMI port.</li>
        </ol>
        <h2>● Testing</h2>
        <ol>
          <li>Perform a diode test again.</li>
          <li>Check video and audio output with a display.</li>
        </ol>
        <GalleryButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "● Close Gallery" : "● Open Gallery"}
        </GalleryButton>
        <div className="gallery">
          {isOpen && (
            <div style={{ padding: '1rem', textAlign: 'center' }}>
              <p>(Original gallery images were located in Sony/PlayStation 5 (PS5)/PS5_photo/)</p>
            </div>
          )}
        </div>
      </StyledArticleWrapper>
    </>
  );
}
