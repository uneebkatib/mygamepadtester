'use client'

import React, { memo, Suspense, lazy } from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

import Ad from "../Ad/Ad";
import { useI18n } from "@/contexts/I18nContext";

import FaqAccordion from './FaqAccordion';
import TOCWidget from './TOCWidget';
import TopControllersPreview from './TopControllersPreview';

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const PageWrapper = styled.div`
  width: 100%;
  background: #fff;
`;

const SectionContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

/* ---- Section divider ---- */
const SectionDivider = styled.div`
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #DA7756, #ff9f7c);
  border-radius: 2px;
  margin: 0 auto 1.5rem auto;
`;

/* ---- H1 ---- */
const PageH1 = styled.h1`
  font-size: clamp(1.75rem, 4vw, 2.6rem);
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1.2;
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.02em;
  text-align: center;

  span {
    background: linear-gradient(90deg, #DA7756 0%, #ff9f7c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

/* ---- H2 ---- */
const PageH2 = styled.h2`
  font-size: clamp(1.45rem, 3.5vw, 2rem);
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.25;
  margin: 0 0 1.25rem 0;
  letter-spacing: -0.01em;
  text-align: center;
`;

/* ---- Section wrapper ---- */
const Section = styled.section`
  padding: 4rem 0;
  border-bottom: 1px solid #f3f3f3;

  &:last-of-type {
    border-bottom: none;
  }
`;

/* ---- Intro section ---- */
const IntroSection = styled(Section)`
  padding: 3.5rem 0 3rem 0;
  background: linear-gradient(180deg, #fff8f6 0%, #fff 100%);
`;

/* ---- Highlight sentence box ---- */
const HighlightBox = styled.div`
  background: #fff5f2;
  border-left: 4px solid #DA7756;
  border-radius: 0 10px 10px 0;
  padding: 1.1rem 1.5rem;
  margin: 1.5rem 0;
  font-size: 1rem;
  color: #333;
  line-height: 1.7;
  font-style: italic;
`;

/* ---- Feature chip row ---- */
const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 1.5rem 0;
  justify-content: center;
`;

const Chip = styled.span`
  background: #fdf2ef;
  border: 1px solid #ffd9c8;
  color: #c05a35;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.35rem 0.9rem;
  border-radius: 50px;
  white-space: nowrap;
  transition: background 0.2s;

  &:hover {
    background: #DA7756;
    color: #fff;
    border-color: #DA7756;
  }
`;

/* ---- Prose text ---- */
const ProseText = styled.p`
  font-size: 1rem;
  color: #475569;
  line-height: 1.8;
  margin: 0 0 1.1rem 0;
  max-width: 860px;
  margin-left: auto;
  margin-right: auto;
`;

/* ---- Info cards grid ---- */
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 1.25rem;
  margin-top: 2rem;
`;

const InfoCard = styled.div`
  background: #fff;
  border: 1px solid #ffeadd;
  border-radius: 14px;
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(218,119,86,0.06);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(218,119,86,0.14);
    border-color: #DA7756;
  }

  .card-icon {
    font-size: 1.6rem;
    margin-bottom: 0.75rem;
    display: block;
  }

  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 0.5rem 0;
  }

  p {
    font-size: 0.92rem;
    color: #555;
    line-height: 1.65;
    margin: 0;
  }
`;

/* ---- Drift fix step list ---- */
const StepList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  counter-reset: step-counter;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const StepListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: #DA7756;
    box-shadow: 0 4px 14px rgba(218,119,86,0.1);
  }

  .step-num {
    background: linear-gradient(135deg, #DA7756, #ff9f7c);
    color: #fff;
    font-weight: 800;
    font-size: 0.85rem;
    min-width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 0.1rem;
  }

  .step-text {
    font-size: 0.95rem;
    color: #334155;
    line-height: 1.65;
  }
`;

/* ---- Table ---- */
const TableWrapper = styled.div`
  overflow-x: auto;
  margin: 2rem 0;
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.07);
  border: 1px solid #ffeadd;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  min-width: 540px;

  thead tr {
    background: linear-gradient(90deg, #fdf2ef, #fff5f0);
  }

  th {
    padding: 0.9rem 1.1rem;
    text-align: left;
    font-size: 0.88rem;
    font-weight: 700;
    color: #1a1a1a;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    white-space: nowrap;
    border-bottom: 2px solid #ffeadd;
  }

  td {
    padding: 0.85rem 1.1rem;
    font-size: 0.93rem;
    color: #334155;
    border-bottom: 1px solid #f5f5f5;
    line-height: 1.5;
  }

  td:first-child {
    font-weight: 600;
    color: #1a1a1a;
    background: #fffafa;
    white-space: nowrap;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover td {
    background: #fff8f6;
  }

  .badge {
    display: inline-block;
    background: #fdf2ef;
    color: #DA7756;
    font-size: 0.78rem;
    font-weight: 700;
    padding: 0.2rem 0.6rem;
    border-radius: 50px;
    border: 1px solid #ffd9c8;
  }
`;

/* ---- 3-step process ---- */
const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  counter-reset: proc-counter;
`;

const ProcessCard = styled.div`
  position: relative;
  background: #f9fafb;
  border: 1px solid #eef0f3;
  border-radius: 14px;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(218,119,86,0.12);
    border-color: #DA7756;
  }

  .proc-num {
    position: absolute;
    top: -0.6rem;
    left: 1.25rem;
    font-size: 4rem;
    font-weight: 900;
    color: rgba(218,119,86,0.08);
    line-height: 1;
    user-select: none;
  }

  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 0.6rem 0;
    position: relative;
  }

  p {
    font-size: 0.92rem;
    color: #555;
    line-height: 1.65;
    margin: 0;
    position: relative;
  }
`;

/* ---- Quick fix cards ---- */
const FixGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
  margin-top: 2rem;
`;

const FixCard = styled.div`
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  border-top: 4px solid #DA7756;
  padding: 1.5rem;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 8px 24px rgba(218,119,86,0.12);
  }

  .fix-label {
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #DA7756;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 0.6rem 0;
  }

  p {
    font-size: 0.92rem;
    color: #475569;
    line-height: 1.65;
    margin: 0;
  }
`;

/* ---- Tips ---- */
const TipsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const TipRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: #f8fafc;
  border: 1px solid #e8edf3;
  border-radius: 12px;
  padding: 1.1rem 1.25rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: #DA7756;
  }

  .tip-icon {
    font-size: 1.4rem;
    flex-shrink: 0;
    margin-top: 0.05rem;
  }

  .tip-body {
    font-size: 0.95rem;
    color: #334155;
    line-height: 1.7;
  }
`;

const ImageBlock = styled.div`
    position: relative;
    margin: 2rem auto;
    max-width: 450px;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 15px 35px rgba(0,0,0,0.06);
    border: 1px solid #f1f5f9;

    img {
        width: 100%;
        height: auto;
        display: block;
        transition: transform 0.5s ease;
    }

    &:hover img {
        transform: scale(1.03);
    }

    &::after {
        content: 'mygamepadtester.com';
        position: absolute;
        bottom: 12px;
        right: 12px;
        background: rgba(255, 255, 255, 0.95);
        color: #DA7756;
        padding: 5px 10px;
        border-radius: 6px;
        font-size: 0.65rem;
        font-weight: 800;
        letter-spacing: 0.04em;
        box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        z-index: 10;
        pointer-events: none;
        text-transform: uppercase;
    }
`;




// ============================================================================
// HERO EXPORT — removed as requested, returns null
// ============================================================================

export const MainPageHero = () => null;

// ============================================================================
// MAIN CONTENT EXPORT
// ============================================================================

export const MainPageContent = () => {
  const { t } = useI18n();
  return (
    <PageWrapper>

      {/* ── TOC ── */}
      <div style={{ padding: '1.5rem 0 0.5rem 0' }}>
        <Suspense fallback={null}>
          <TOCWidget />
        </Suspense>
      </div>

      {/* ══════════════════════════════════════════════════════
          H1 — INTRO
      ══════════════════════════════════════════════════════ */}
      <IntroSection id="intro">
        <SectionContainer>
          <div>
            <SectionDivider />
            <PageH1>
              {t('mainPageInfo.heroHeadline').split('–')[0]} - <span>{t('mainPageInfo.heroHeadline').split('–')[1] || 'Live Controller Diagnostics'}</span>
            </PageH1>

            <ChipRow>
              {['PS5 DualSense', 'PS4 DualShock', 'Xbox Series', 'Xbox One', 'Switch Pro', 'Generic PC', 'Modded JoyCons', 'PS3 Gear'].map(c => (
                <Chip key={c}>{c}</Chip>
              ))}
            </ChipRow>

            <HighlightBox>
              {t('mainPageInfo.introHighlight') || "If you've ever dealt with a controller that registers ghost inputs or a joystick that refuses to sit still, you already know how frustrating it is to troubleshoot blind. That's exactly why I built this tool, a fully free, online gamepad tester that runs straight in your browser with no download required."}
            </HighlightBox>

            <CardGrid>
              <InfoCard>
                <span className="card-icon">⚡</span>
                <h3>{t('mainPageInfo.card1Title') || "Live via HTML5 Gamepad API"}</h3>
                <p>{t('mainPageInfo.card1Desc') || "Pulls live data from your inputs the moment you connect."}</p>
              </InfoCard>
              <InfoCard>
                <span className="card-icon">🎮</span>
                <h3>{t('mainPageInfo.card2Title') || "All Supported Devices"}</h3>
                <p>{t('mainPageInfo.card2Desc') || "Handles PS5, Xbox, Switch, and PC controllers."}</p>
              </InfoCard>
              <InfoCard>
                <span className="card-icon">🔬</span>
                <h3>{t('mainPageInfo.card3Title') || "Deep Test Suite"}</h3>
                <p>{t('mainPageInfo.card3Desc') || "Run button and joystick tests to map out accuracy."}</p>
              </InfoCard>
              <InfoCard>
                <span className="card-icon">🎙️</span>
                <h3>{t('mainPageInfo.card4Title') || "Microphone & Vibration"}</h3>
                <p>{t('mainPageInfo.card4Desc') || "Judge vibration controls and motor strength."}</p>
              </InfoCard>
              <InfoCard>
                <span className="card-icon">🎯</span>
                <h3>{t('mainPageInfo.card5Title') || "Analog Calibration"}</h3>
                <p>{t('mainPageInfo.card5Desc') || "Fine-tune dead zones and thresholds."}</p>
              </InfoCard>
              <InfoCard>
                <span className="card-icon">📊</span>
                <h3>{t('mainPageInfo.card6Title') || "Raw Numbers That Matter"}</h3>
                <p>{t('mainPageInfo.card6Desc') || "View axis offsets and response curves."}</p>
              </InfoCard>
            </CardGrid>
          </div>
        </SectionContainer>
      </IntroSection>

      {/* ══════════════════════════════════════════════════════
          H2 — STICK DRIFT FIX
      ══════════════════════════════════════════════════════ */}
      <Section id="stick-drift-fix">
        <SectionContainer>
          <div>
            <SectionDivider />
            <PageH2>{t('mainPageInfo.stickDriftHeading')}</PageH2>

            <ProseText 
                style={{ textAlign: 'center' }}
                dangerouslySetInnerHTML={{ __html: t('mainPageInfo.stickDriftIntro') }}
            />

            <ImageBlock>
                <Image 
                    src="/images/homepage/controller_repair_1.webp" 
                    alt="Disassembled modern gaming controller showing internal circuit board and analog stick modules for repair diagnostics" 
                    width={450}
                    height={300}
                    style={{ width: '100%', height: 'auto' }}
                    loading="lazy"
                />
            </ImageBlock>
            
            <StepList>
              {t('mainPageInfo.stickDriftSteps').map((step, i) => (
                <StepListItem key={i}>
                  <span className="step-num">{i + 1}</span>
                  <span className="step-text" dangerouslySetInnerHTML={{ __html: step }} />
                </StepListItem>
              ))}
            </StepList>
          </div>
        </SectionContainer>
      </Section>

      {/* ══════════════════════════════════════════════════════
          H2 — WHY STANDS APART
      ══════════════════════════════════════════════════════ */}
      <Section id="why-stands-apart" style={{ background: '#fafafa' }}>
        <SectionContainer>
          <div>
            <SectionDivider />
            <PageH2>{t('mainPageInfo.whyStandsApartHeading')}</PageH2>

            <TableWrapper>
              <StyledTable>
                <thead>
                  <tr>
                    <th>{t('mainPageInfo.table.feature')}</th>
                    <th>{t('mainPageInfo.table.meaning')}</th>
                  </tr>
                </thead>
                <tbody>
                  {t('mainPageInfo.table.rows').map((row, i) => (
                    <tr key={i}>
                      <td>{row[0]}</td>
                      <td>{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
            </TableWrapper>

            <ProseText 
                style={{ textAlign: 'center' }}
                dangerouslySetInnerHTML={{ __html: t('mainPageInfo.whyStandsApartIntro') }}
            />
          </div>
        </SectionContainer>
      </Section>

      {/* ══════════════════════════════════════════════════════
          H2 — BUTTON, STICK & VIBRATION
      ══════════════════════════════════════════════════════ */}
      <Section id="full-test">
        <SectionContainer>
          <div>
            <SectionDivider />
            <PageH2>{t('mainPageInfo.fullTestHeading')}</PageH2>

            <CardGrid>
              <InfoCard>
                <span className="card-icon">🔘</span>
                <h3>{t('mainPageInfo.buttonResponseTitle')}</h3>
                <p>{t('mainPageInfo.buttonResponseDesc')}</p>
              </InfoCard>
              <InfoCard>
                <span className="card-icon">🕹️</span>
                <h3>{t('mainPageInfo.stickHeatmapsTitle')}</h3>
                <p>{t('mainPageInfo.stickHeatmapsDesc')}</p>
              </InfoCard>
              <InfoCard>
                <span className="card-icon">📳</span>
                <h3>{t('mainPageInfo.vibrationMotorTitle')}</h3>
                <p>{t('mainPageInfo.vibrationMotorDesc')}</p>
              </InfoCard>
            </CardGrid>
          </div>
        </SectionContainer>
      </Section>

      {/* ══════════════════════════════════════════════════════
          H2 — UNIVERSAL CONTROLLER TESTER
      ══════════════════════════════════════════════════════ */}
      <Section id="universal-tester" style={{ background: '#fafafa' }}>
        <SectionContainer>
          <div>
            <SectionDivider />
            <PageH2>{t('mainPageInfo.universalTesterHeading')}</PageH2>

            <ProseText 
                style={{ textAlign: 'center' }}
                dangerouslySetInnerHTML={{ __html: t('mainPageInfo.universalTesterIntro') }}
            />

            <TableWrapper>
              <StyledTable>
                <thead>
                  <tr>
                    <th>{t('mainPageInfo.universalTable.controller')}</th>
                    <th>{t('mainPageInfo.universalTable.connection')}</th>
                    <th>{t('mainPageInfo.universalTable.features')}</th>
                  </tr>
                </thead>
                <tbody>
                  {t('mainPageInfo.universalTable.rows').map((row, i) => (
                    <tr key={i}>
                      <td>{row[0]}</td>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
            </TableWrapper>

            <ProseText style={{ textAlign: 'center' }}>
              {t('mainPageInfo.universalTesterFooter')}
            </ProseText>
          </div>
        </SectionContainer>
      </Section>

      {/* ══════════════════════════════════════════════════════
          H2 — HOW TO USE
      ══════════════════════════════════════════════════════ */}
      <Section id="how-to-use">
        <SectionContainer>
          <div>
            <SectionDivider />
            <PageH2>{t('mainPageInfo.howToUseHeading')}</PageH2>

            <ProcessGrid>
              {t('mainPageInfo.howToUseSteps').map((step, i) => (
                <ProcessCard key={i}>
                  <span className="proc-num">{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: step.desc }} />
                </ProcessCard>
              ))}
            </ProcessGrid>

            <ImageBlock>
                <Image 
                    src="/images/homepage/controller_repair_2.webp" 
                    alt="Technical diagram of gaming controller internal components illustrating precision testing and sensor calibration points" 
                    width={450}
                    height={300}
                    style={{ width: '100%', height: 'auto' }}
                    loading="lazy"
                />
            </ImageBlock>
          </div>
        </SectionContainer>
      </Section>

      {/* ══════════════════════════════════════════════════════
          H2 — QUICK FIXES
      ══════════════════════════════════════════════════════ */}
      <Section id="quick-fixes" style={{ background: '#fafafa' }}>
        <SectionContainer>
          <div>
            <SectionDivider />
            <PageH2>{t('mainPageInfo.quickFixesHeading')}</PageH2>

            <FixGrid>
              {t('mainPageInfo.quickFixes').map((fix, i) => (
                <FixCard key={i}>
                  <div className="fix-label">{fix.label}</div>
                  <h3>{fix.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: fix.desc }} />
                </FixCard>
              ))}
            </FixGrid>

            <ImageBlock>
                <Image 
                    src="/images/homepage/controller_repair_3.webp" 
                    alt="Comparison infographic explaining the difference between software recalibration and physical hardware repair for controller drift" 
                    width={450}
                    height={300}
                    style={{ width: '100%', height: 'auto' }}
                    loading="lazy"
                />
            </ImageBlock>
          </div>
        </SectionContainer>
      </Section>

      {/* ══════════════════════════════════════════════════════
          H2 — ADVANCED TIPS
      ══════════════════════════════════════════════════════ */}
      <Section id="advanced-tips">
        <SectionContainer>
          <div>
            <SectionDivider />
            <PageH2>{t('mainPageInfo.advancedTipsHeading')}</PageH2>

            <TipsList>
              {t('mainPageInfo.advancedTips').map((tip, i) => (
                <TipRow key={i}>
                  <span className="tip-icon">{i === 0 ? '🔬' : i === 1 ? '⚡' : '🧹'}</span>
                  <span className="tip-body">{tip}</span>
                </TipRow>
              ))}
            </TipsList>
          </div>
        </SectionContainer>
      </Section>

      {/* ══════════════════════════════════════════════════════
          H2 — FAQ
      ══════════════════════════════════════════════════════ */}
      <Section id="faqs" style={{ background: '#fafafa', paddingBottom: '5rem' }}>
        <SectionContainer>
          <div>
            <SectionDivider />
            <PageH2>{t('mainPageInfo.faqHeading')}</PageH2>
            <Suspense fallback={<div style={{ height: '200px' }} />}>
              <FaqAccordion />
            </Suspense>
          </div>
        </SectionContainer>
      </Section>

      <Ad />
    </PageWrapper>
  );
};

// ============================================================================
// LEGACY WRAPPER — kept for any other imports
// ============================================================================

const MainPageInfoComponent = () => (
  <>
    <MainPageHero />
    <MainPageContent />
  </>
);

export const MainPageInfo = memo(MainPageInfoComponent);
export default MainPageInfo;
