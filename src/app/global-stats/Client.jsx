"use client";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useI18n } from '@/contexts/I18nContext';

// Global stats client component

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 20px;
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 900;
    color: #0f172a;
    margin-bottom: 1rem;
    letter-spacing: -1px;
  }
  
  p {
    font-size: 1.15rem;
    color: #475569;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const TimeframeSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  background: white;
  padding: 8px;
  border-radius: 100px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
`;

const TimeframeButton = styled.button`
  padding: 10px 24px;
  border-radius: 99px;
  border: none;
  background: ${props => props.$active ? '#0f172a' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#64748b'};
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: ${props => props.$active ? 'white' : '#0f172a'};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.$accent || '#E8622A'};
  }

  .label {
    font-size: 0.8rem;
    color: #64748b;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 0.5rem;
  }

  .val {
    font-size: 3rem;
    font-weight: 900;
    color: #0f172a;
    line-height: 1.1;
    letter-spacing: -1px;
  }

  .subval {
    margin-top: auto;
    padding-top: 1rem;
    font-size: 0.85rem;
    color: #94a3b8;
    font-weight: 500;
  }
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
  border: 1px solid #e2e8f0;

  h3 {
    font-size: 1.1rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 1.5rem;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
`;

const LeaderboardRow = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr auto;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 8px;
  background: #f8fafc;
  transition: background 0.2s;

  &:hover { background: #f1f5f9; }

  .rank {
    font-weight: 900;
    color: #cbd5e1;
    font-size: 1.1rem;
  }

  .name {
    font-weight: 600;
    color: #334155;
    font-size: 0.95rem;
  }

  .score {
    background: white;
    padding: 6px 12px;
    border-radius: 8px;
    color: #0f172a;
    font-weight: 800;
    font-size: 0.85rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.02);
  }
`;

const Loader = styled.div`
  text-align: center;
  padding: 5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #64748b;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }
`;

const TabContainer = styled.div`
  display: flex;
  background: transparent;
  margin: 3rem 0 1.5rem 0;
  overflow-x: auto;
  gap: 0.5rem;
  padding-bottom: 10px;

  &::-webkit-scrollbar { height: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
`;

const Tab = styled.button`
  padding: 12px 24px;
  border-radius: 12px;
  border: 1px solid ${props => props.$active ? '#0f172a' : '#e2e8f0'};
  background: ${props => props.$active ? '#0f172a' : 'white'};
  color: ${props => props.$active ? 'white' : '#64748b'};
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);

  &:hover {
    border-color: #0f172a;
    color: ${props => props.$active ? 'white' : '#0f172a'};
  }
`;

const ToolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const SectionHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.5px;
  margin-bottom: 2rem;
`;

const DonutChart = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(
    #22c55e ${props => props.$percentage}%, 
    #f1f5f9 ${props => props.$percentage}%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;

  &::before {
    content: '';
    width: 90px;
    height: 90px;
    background: white;
    border-radius: 50%;
    position: absolute;
  }

  span {
    position: relative;
    font-size: 1.5rem;
    font-weight: 900;
    color: #0f172a;
  }
`;

export default function GlobalStatsClient() {
    const { t } = useI18n();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeframe, setTimeframe] = useState('all_time');
    const [activeCategory, setActiveCategory] = useState('gamepad');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`/api.php?action=global_stats&timeframe=${timeframe}`);
                const rawText = await res.text();
                
                if (rawText.trim().startsWith('<?php') || rawText.trim().startsWith('<')) {
                    console.warn("Local dev server detected: api.php returned raw source.");
                    
                    // Fallback local mock data so the dashboard still renders locally
                    setData({
                        all_time: {
                            total_tests: 12450,
                            average_health: 84.2,
                            top_controllers: [
                                { controller_name_clean: "DualSense Wireless Controller", count: 4210 },
                                { controller_name_clean: "Xbox Wireless Controller", count: 3890 },
                                { controller_name_clean: "Nintendo Switch Pro Controller", count: 1850 }
                            ],
                            tools: {
                                stick_drift: { samples: 4120, avg_l: 14.2, avg_r: 12.8 },
                                input_lag: { samples: 3450, avg_lag: 4.8, avg_polling: 250 },
                                button: { samples: 5800, total_fails: 1240 },
                                trigger: { samples: 2100, avg_lt: 0.98, avg_rt: 0.96 },
                                deadzone: { samples: 1400, avg_inner: 8.5, avg_outer: 95.0 },
                                mouse: { samples: 850, top_devices: [{device_name: "Logitech G Pro X", count: 210}] },
                                keyboard: { samples: 640, top_devices: [{device_name: "Wooting 60HE", count: 180}] },
                                sens_converter: { samples: 1200, top_from: [{from_game: "Valorant", count: 420}], top_to: [{to_game: "CS2", count: 380}], recent: [] }
                            },
                            failure_counts: { drift_l: 850, drift_r: 720, lag: 450, bad_buttons: 180 }
                        }
                    });
                    setLoading(false);
                    return;
                }

                const json = JSON.parse(rawText);
                if (json.success) {
                    setData(json.data);
                } else {
                    setError("Failed to load statistics database.");
                }
            } catch (err) {
                setError("Stats API connection error.");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <Loader>{t('stats.aggregating') || "Aggregating Millions of Hardware Tests..."}</Loader>;

    const activeData = data ? data[timeframe] : {
        total_tests: 0,
        average_health: 0,
        top_controllers: [],
        failure_counts: { drift_l: 0, drift_r: 0, lag: 0, bad_buttons: 0 },
        tools: {
          stick_drift: { samples: 0, avg_l: 0, avg_r: 0 },
          trigger: { samples: 0, avg_lt: 0, avg_rt: 0 },
          mouse: { samples: 0, total_chatter: 0, top_devices: [] },
          keyboard: { samples: 0, avg_ms: 0, top_devices: [] },
          button: { samples: 0, total_fails: 0 },
          input_lag: { samples: 0, avg_lag: 0, avg_polling: 0 },
          deadzone: { samples: 0, avg_inner: 0, avg_outer: 0 },
          sens_converter: { samples: 0, top_from: [], top_to: [], recent: [] }
        }
    };

    const toolStats = activeData?.tools || {
      stick_drift: { samples: 0, avg_l: 0, avg_r: 0 },
      trigger: { samples: 0, avg_lt: 0, avg_rt: 0 },
      mouse: { samples: 0, total_chatter: 0, top_devices: [] },
      keyboard: { samples: 0, avg_ms: 0, top_devices: [] },
      button: { samples: 0, total_fails: 0 },
      input_lag: { samples: 0, avg_lag: 0, avg_polling: 0 },
      deadzone: { samples: 0, avg_inner: 0, avg_outer: 0 },
      sens_converter: { samples: 0, top_from: [], top_to: [], recent: [] }
    };

    const hardwareCategories = [
      { id: 'gamepad', name: 'Gamepad Analytics', icon: '🎮' },
      { id: 'mouse', name: 'Mouse Telemetry', icon: '🖱️' },
      { id: 'keyboard', name: 'Keyboard Data', icon: '⌨️' },
      { id: 'aim_sens', name: 'Aim Sensitivity', icon: '🎯' }
    ];

    return (
        <PageContainer>
            <Header>
                <h1>{t('stats.title')}</h1>
                <p>{t('stats.description')}</p>
            </Header>

            <TimeframeSelector>
                <TimeframeButton $active={timeframe === 'all_time'} onClick={() => setTimeframe('all_time')}>{t('stats.allTime')}</TimeframeButton>
                <TimeframeButton $active={timeframe === 'last_30_days'} onClick={() => setTimeframe('last_30_days')}>{t('stats.last30')}</TimeframeButton>
                <TimeframeButton $active={timeframe === 'last_7_days'} onClick={() => setTimeframe('last_7_days')}>{t('stats.last7')}</TimeframeButton>
                <TimeframeButton $active={timeframe === 'last_24_hours'} onClick={() => setTimeframe('last_24_hours')}>{t('stats.last24')}</TimeframeButton>
            </TimeframeSelector>

            <StatsGrid>
                <StatCard $accent="#3b82f6">
                    <div className="label">{t('stats.totalTests') || 'Total Diagnostics'}</div>
                    <div className="val">{activeData.total_tests.toLocaleString()}</div>
                    <div className="subval">Hardware units tested worldwide</div>
                </StatCard>
                <StatCard $accent="#22c55e" style={{ textAlign: 'center', alignItems: 'center' }}>
                    <div className="label">{t('stats.healthAverage') || 'Global Health Index'}</div>
                    <DonutChart $percentage={activeData.average_health}>
                        <span>{activeData.average_health}%</span>
                    </DonutChart>
                    <div className="subval">Average controller health rating</div>
                </StatCard>
            </StatsGrid>
            
            <TabContainer>
              {hardwareCategories.map(cat => (
                <Tab 
                  key={cat.id} 
                  $active={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.icon} {cat.name}
                </Tab>
              ))}
            </TabContainer>

            {activeCategory === 'gamepad' && (
              <>
                <SectionHeading>Gamepad Telemetry</SectionHeading>
                <ToolGrid>
                  <StatCard $accent="#ef4444">
                    <div className="label">Stick Drift Index L/R</div>
                    <div className="val">{Number(toolStats.stick_drift.avg_l || 0).toFixed(1)}% / {Number(toolStats.stick_drift.avg_r || 0).toFixed(1)}%</div>
                    <div className="subval">Global analog resting deviation</div>
                  </StatCard>
                  
                  <StatCard $accent="#eab308">
                    <div className="label">Input Lag Average</div>
                    <div className="val">{Number(toolStats.input_lag.avg_lag || 0).toFixed(2)}ms</div>
                    <div className="subval">From {toolStats.input_lag.samples || 0} latency samples</div>
                  </StatCard>

                  <StatCard $accent="#ec4899">
                    <div className="label">Deadzone Radius</div>
                    <div className="val">{Number(toolStats.deadzone.avg_inner || 0).toFixed(1)}% IN</div>
                    <div className="subval">Avg inner hardware deadzone</div>
                  </StatCard>

                  <StatCard $accent="#3b82f6">
                    <div className="label">Button Failures</div>
                    <div className="val">{toolStats.button.total_fails || 0}</div>
                    <div className="subval">Dead switches intercepted</div>
                  </StatCard>
                </ToolGrid>

                <ChartsContainer style={{ marginTop: '5rem' }}>
                    <ChartCard>
                        <h3>{t('stats.topTitle') || 'Most Tested Controllers'}</h3>
                        {activeData.top_controllers?.slice(0, 8).map((ctrl, i) => (
                            <LeaderboardRow key={i}>
                                <div className="rank">#{i + 1}</div>
                                <div className="name">{ctrl.controller_name_clean}</div>
                                <div className="score">{Number(ctrl.count).toLocaleString()} {t('stats.uses')}</div>
                            </LeaderboardRow>
                        ))}
                    </ChartCard>

                    <ChartCard>
                        <h3>{t('stats.matrixTitle') || 'Common Gamepad Failure Points'}</h3>
                        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {(() => {
                                const total = activeData.total_tests || 1;
                                const driftFails = Number(activeData.failure_counts?.drift_l || 0) + Number(activeData.failure_counts?.drift_r || 0);
                                const lagFails = activeData.failure_counts?.lag || 0;
                                const btnFails = activeData.failure_counts?.bad_buttons || 0;

                                return (
                                    <>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>
                                                <span>Stick Drift Failures</span>
                                                <span>{driftFails} Units</span>
                                            </div>
                                            <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                                <div style={{ width: `${Math.min(100, (driftFails / total) * 100)}%`, height: '100%', background: '#ef4444', transition: 'width 1s ease-in-out' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>
                                                <span>High Latency Flagged</span>
                                                <span>{lagFails} Units</span>
                                            </div>
                                            <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                                <div style={{ width: `${Math.min(100, (lagFails / total) * 100)}%`, height: '100%', background: '#f97316', transition: 'width 1s ease-in-out' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: '600', color: '#334155' }}>
                                                <span>Unresponsive Buttons</span>
                                                <span>{btnFails} Units</span>
                                            </div>
                                            <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                                <div style={{ width: `${Math.min(100, (btnFails / total) * 100)}%`, height: '100%', background: '#3b82f6', transition: 'width 1s ease-in-out' }}></div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </ChartCard>
                </ChartsContainer>
              </>
            )}

            {activeCategory === 'mouse' && (
              <>
                <SectionHeading>Mouse Telemetry</SectionHeading>
                <ToolGrid>
                  <StatCard $accent="#3b82f6">
                    <div className="label">Clicks Analyzed</div>
                    <div className="val">{toolStats.mouse.samples || 0}</div>
                    <div className="subval">Total mice tested</div>
                  </StatCard>
                  
                  <ChartCard style={{ gridColumn: 'span 2' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Most Tested Mice</h3>
                    {toolStats.mouse.top_devices?.map((dev, i) => (
                      <LeaderboardRow key={i}>
                        <div className="rank">#{i + 1}</div>
                        <div className="name">{dev.device_name}</div>
                        <div className="score">{dev.count} Tests</div>
                      </LeaderboardRow>
                    ))}
                  </ChartCard>
                </ToolGrid>
              </>
            )}

            {activeCategory === 'keyboard' && (
              <>
                <SectionHeading>Keyboard Telemetry</SectionHeading>
                <ToolGrid>
                  <StatCard $accent="#3b82f6">
                    <div className="label">Keyboards Tested</div>
                    <div className="val">{toolStats.keyboard.samples || 0}</div>
                    <div className="subval">Mechanical & membrane</div>
                  </StatCard>
                  
                  <ChartCard style={{ gridColumn: 'span 2' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Most Tested Keyboards</h3>
                    {toolStats.keyboard.top_devices?.map((dev, i) => (
                      <LeaderboardRow key={i}>
                        <div className="rank">#{i + 1}</div>
                        <div className="name">{dev.device_name}</div>
                        <div className="score">{dev.count} Tests</div>
                      </LeaderboardRow>
                    ))}
                  </ChartCard>
                </ToolGrid>
              </>
            )}

            {activeCategory === 'aim_sens' && (
              <>
                <SectionHeading>Aim Sensitivity Data</SectionHeading>
                <ToolGrid>
                  <StatCard $accent="#8b5cf6">
                    <div className="label">Total Conversions</div>
                    <div className="val">{toolStats.sens_converter.samples || 0}</div>
                    <div className="subval">Calculations performed</div>
                  </StatCard>
                  <ChartCard style={{ gridColumn: 'span 1' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Most Converted From</h3>
                    {toolStats.sens_converter.top_from?.map((game, i) => (
                      <LeaderboardRow key={i}>
                        <div className="rank">#{i + 1}</div>
                        <div className="name">{game.from_game}</div>
                        <div className="score">{game.count} Tests</div>
                      </LeaderboardRow>
                    ))}
                  </ChartCard>
                  <ChartCard style={{ gridColumn: 'span 1' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Most Converted To</h3>
                    {toolStats.sens_converter.top_to?.map((game, i) => (
                      <LeaderboardRow key={i}>
                        <div className="rank">#{i + 1}</div>
                        <div className="name">{game.to_game}</div>
                        <div className="score">{game.count} Tests</div>
                      </LeaderboardRow>
                    ))}
                  </ChartCard>
                  
                  {toolStats.sens_converter.recent?.length > 0 && (
                    <ChartCard style={{ gridColumn: '1 / -1' }}>
                      <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Recent Global Conversions</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                        {toolStats.sens_converter.recent.map((conv, i) => (
                          <LeaderboardRow key={i} style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: 'none' }}>
                            <div className="name" style={{ fontSize: '0.85rem' }}>
                              {conv.from_game} <span style={{ color: '#E8622A' }}>→</span> {conv.to_game}
                            </div>
                            <div className="score" style={{ background: 'white', color: '#94a3b8', fontSize: '0.75rem' }}>
                              {new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </LeaderboardRow>
                        ))}
                      </div>
                    </ChartCard>
                  )}
                </ToolGrid>
              </>
            )}

        </PageContainer>
    );
}

