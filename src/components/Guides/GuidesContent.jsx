'use client'
import React from 'react';
import { guidesDataLight } from './guidesDataLight';
import Link from 'next/link';

export default function GuidesContent() {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1a202c' }}>Gamepad & Controller Guides</h1>
            <p style={{ fontSize: '1.1rem', color: '#718096', marginBottom: '3rem', maxWidth: '800px' }}>
                Welcome to the ultimate hub for gamepad diagnostics, repair, and optimization. Whether you're experiencing PS5 stick drift, Xbox controller connectivity issues, or Nintendo Switch Joy-Con calibration problems, our comprehensive guides have the solution. Select your console manufacturer below to find specific repair guides, troubleshooting steps, and maintenance tips.
            </p>

            {guidesDataLight && Object.entries(guidesDataLight).map(([categoryKey, category]) => (
                <section key={categoryKey} style={{ marginBottom: '3rem' }}>
                    <Link href={`/guides/${categoryKey}`} style={{ textDecoration: 'none' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '1.5rem',
                            padding: '1rem 1.5rem',
                            background: '#f7fafc',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            transition: 'border-color 0.2s',
                            cursor: 'pointer',
                        }}>
                            <span style={{ fontSize: '2rem', marginRight: '0.75rem' }}>{category.icon}</span>
                            <div style={{ flex: 1 }}>
                                <h2 style={{ fontSize: '1.5rem', color: category.color, margin: 0 }}>{category.title}</h2>
                                <p style={{ color: '#718096', margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>{category.description}</p>
                            </div>
                            <span style={{
                                background: category.color,
                                color: 'white',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                            }}>
                                {Object.keys(category.devices).length} Devices
                            </span>
                        </div>
                    </Link>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {category.devices && Object.entries(category.devices).map(([deviceKey, device]) => (
                            <div
                                key={deviceKey}
                                style={{
                                    background: '#fff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    padding: '1.5rem',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                                }}
                            >
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#2d3748' }}>{device.title}</h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {device.guides && Object.entries(device.guides).map(([guideKey, guide]) => (
                                        <li key={guideKey} style={{ marginBottom: '0.5rem' }}>
                                            <Link
                                                href={`/guides/${categoryKey}/${deviceKey}/${guideKey}`}
                                                style={{
                                                    color: category.color,
                                                    textDecoration: 'none',
                                                    display: 'block',
                                                    padding: '0.5rem',
                                                    borderRadius: '6px',
                                                    transition: 'background 0.2s',
                                                }}
                                                onMouseEnter={(e) => e.target.style.background = '#f7fafc'}
                                                onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                            >
                                                {guide.title}
                                                {guide.readTime && (
                                                    <span style={{
                                                        display: 'block',
                                                        fontSize: '0.85rem',
                                                        color: '#a0aec0',
                                                        marginTop: '0.25rem'
                                                    }}>
                                                        {guide.readTime}
                                                    </span>
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            {/* SEO Article Content — matches production deployment */}
            <article style={{ maxWidth: '800px', margin: '4rem auto 0', lineHeight: 1.8, color: '#2d3748' }}>
                <p style={{ fontSize: '1.05rem', color: '#4a5568' }}>
                    Modern gaming controllers are complex pieces of engineering that endure hundreds of hours of physical stress. From the precision potentiometers measuring your analog stick movements to the tactile membrane switches under your action buttons, every component is subjected to wear and tear. At MyGamepadTester.com, our mission is to empower gamers and repair professionals alike with the knowledge and tools needed to diagnose, fix, and optimize their hardware.
                </p>

                <h3 style={{ marginTop: '2.5rem', color: '#1a202c' }}>Understanding Controller Stick Drift</h3>
                <p>
                    Analog stick drift is arguably the most pervasive issue facing modern gamers, affecting up to 40% of all controllers within their first year of use. But what exactly is stick drift? Inside your controller&apos;s analog module lie tiny electronic components known as potentiometers. These components use a resistive carbon track and a metallic wiper to measure the physical tilt of the stick against two axes (X and Y). Every time you move the stick, the wiper slowly scrapes microscopic layers of carbon away.
                </p>
                <p>
                    Over time, this mechanical friction inevitably degrades the carbon track, creating electrical &quot;noise&quot; or dead zones. Your controller&apos;s microprocessor interprets these resistance irregularities as actual movement, causing your on-screen camera or character to drift even when your thumbs are completely off the sticks. Combined with weakened centering springs and internal dust accumulation, this wear-and-tear cycle makes stick drift an inevitability for nearly all traditional ALPS stick modules found in PlayStation, Xbox, and Nintendo controllers.
                </p>

                <h3 style={{ marginTop: '2.5rem', color: '#1a202c' }}>The Importance of Accurate Testing</h3>
                <p>
                    Before opening your controller or ordering replacement parts, accurate diagnosis is critical. Is your controller actually suffering from hardware failure, or is it a software calibration issue? Our browser-based game controller tester utilizes the HTML5 Gamepad API to read the raw sub-millimeter data directly from your controller&apos;s microchip, bypassing any in-game software deadzones or filtering.
                </p>
                <p>
                    By establishing a testing baseline, you can accurately measure the current state of your analog sticks. Our diagnostic tools will show you whether your drift is a severe hardware malfunction (Values exceeding 0.15 on our testing scale) or a minor tracking discrepancy that can be solved by slightly increasing your in-game deadzones.
                </p>

                <h3 style={{ marginTop: '2.5rem', color: '#1a202c' }}>Controller Hardware Architectures and Generation Differences</h3>
                <p>Each console generation introduces new features, but they also introduce distinct mechanical vulnerabilities. Understanding what hardware generation you own is essential for successful troubleshooting.</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                    <li style={{ marginBottom: '1rem' }}><strong>Sony PlayStation 5 DualSense:</strong> The DualSense introduced revolutionary adaptive triggers and advanced haptic feedback actuators. While these motors are highly reliable, the complex internal wiring required for the adaptive triggers leaves them prone to mechanical snapping if the controller is dropped. The DualSense also relies on standard ALPS potentiometers, making it just as susceptible to stick drift as its PS4 predecessor.</li>
                    <li style={{ marginBottom: '1rem' }}><strong>Microsoft Xbox Series Controllers:</strong> Microsoft&apos;s approach emphasizes modularity and backward compatibility. Xbox Series X|S controllers use extremely durable trigger mechanisms and robust membrane face buttons. However, elite competitive players frequently report problems with the Xbox Elite Series 2&apos;s delicate bumper switches and adjustable-tension stick modules, which have higher-than-average failure rates.</li>
                    <li style={{ marginBottom: '1rem' }}><strong>Nintendo Switch Joy-Cons:</strong> Due to their incredibly compact form factor, Joy-Cons utilize custom, miniaturized analog modules (the ALPS 1JZP). These have a carbon track roughly half the size of a standard controller&apos;s. This concentrated surface area accelerates the wear process, leading to the infamous &quot;Joy-Con Drift&quot; phenomenon that has sparked massive class-action lawsuits worldwide.</li>
                </ul>

                <h3 style={{ marginTop: '2.5rem', color: '#1a202c' }}>Preventative Maintenance vs. DIY Repair</h3>
                <p>
                    While true hardware degradation cannot be entirely prevented, simple routine maintenance can dramatically extend your controller&apos;s lifespan. By regularly cleaning the base of your analog sticks with a microfiber cloth and carefully applying electrical contact cleaner (never use water-based solvents or standard WD-40!), you can dissolve the graphite buildup and skin oils that accelerate carbon wear.
                </p>
                <p>
                    When preventative maintenance is no longer enough, repairing a controller yourself is a highly cost-effective alternative to purchasing a $70 replacement. Most controller repairs, such as replacing sticky face buttons or swapping out dead batteries, only require a simple screwdriver set and 20 minutes of patience. More advanced repairs, such as replacing a heavily degraded analog module, may require soldering skills. If you are not comfortable soldering, establishing the presence of drift through our tools provides the undeniable diagnostic proof needed to confidently file a warranty claim or request a repair from a qualified technician.
                </p>

                <h3 style={{ marginTop: '2.5rem', color: '#1a202c' }}>The Future of Controllers: The Hall Effect Revolution</h3>
                <p>
                    As wear-based stick drift has reached crisis levels across the gaming industry, third-party manufacturers have pioneered a return to a drift-resistant technology: Hall Effect sensors. Unlike standard potentiometers that rely on physical scraping, Hall Effect sensors use magnets and electrical conductors to measure distance. Because the parts never physically touch, friction is eliminated, fundamentally curing the root cause of stick drift. Many of our hardware evaluation guides increasingly focus on evaluating these superior third-party alternatives side-by-side with official OEM hardware.
                </p>

                <h3 style={{ marginTop: '2.5rem', color: '#1a202c' }}>Optimizing Your Deadzones and Latency</h3>
                <p>
                    Even if your controller physical hardware is flawless, poorly calibrated software settings can ruin your competitive edge. Our deadzone guides are specifically designed for esports and competitive players who want to squeeze every microsecond of latency out of their response times. Finding the golden ratio between a responsive deadzone and an overly sensitive, drifting camera curve requires systemic testing.
                </p>
                <p>
                    For maximum performance, competitive players often need a 1:1 &quot;linear&quot; input curve with deadzones floating between 3-5%, combined with wired USB connections to lower bluetooth polling latency. You can verify your exact polling rate using our polling rate diagnostic tools. A slower 125Hz polling rate causes around 8ms of input lag, but overclocking your controller on a PC to a 1000Hz polling rate reduces input lag to practically 1ms, transforming how quickly you can react in titles like Call of Duty, Fortnite, or Rocket League.
                </p>
                <p>
                    Explore the categories above to deep dive into your specific device. We continually update our repository with the latest teardown guides, repair methodologies, and diagnostic insights to ensure your gear never holds you back.
                </p>
            </article>
        </div>
    );
}
