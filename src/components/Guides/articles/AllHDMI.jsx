'use client';
import styled from "styled-components";
import { HDMI_PS3_FAT } from "@/components/HDMITester/HDMI_PS3_FAT";
import { HDMI_PS4_FAT } from "@/components/HDMITester/HDMI_PS4_FAT";
import { HDMI_PS4_PRO } from "@/components/HDMITester/HDMI_PS4_PRO";
import { HDMI_PS4_SLIM } from "@/components/HDMITester/HDMI_PS4_SLIM";
import { HDMI_PS5_FAT } from "@/components/HDMITester/HDMI_PS5_FAT";
import { HDMI_PS5_PRO } from "@/components/HDMITester/HDMI_PS5_PRO";
import { HDMI_XBOX_ONE_FAT } from "@/components/HDMITester/HDMI_XBOX_ONE_FAT";
import { HDMI_XBOX_ONE_S } from "@/components/HDMITester/HDMI_XBOX_ONE_S";
import { HDMI_XBOX_ONE_X } from "@/components/HDMITester/HDMI_XBOX_ONE_X";
import { HDMI_XBOX_SERIES_S } from "@/components/HDMITester/HDMI_XBOX_SERIES_S";
import { HDMI_XBOX_SERIES_X } from "@/components/HDMITester/HDMI_XBOX_SERIES_X";

const AllHDMIWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
  gap: 2rem;
  width: 100%;
`;

export function AllHDMI() {
  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h3>
          USB-C is reversible — when you connect the tester, the results may
          appear in the opposite order.
        </h3>
      </div>

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
    </>
  );
}
