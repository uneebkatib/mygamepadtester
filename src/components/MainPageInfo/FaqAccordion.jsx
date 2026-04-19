'use client'

import { useState } from 'react'
import styled from 'styled-components'

const FaqWrapper = styled.div`
  max-width: 820px;
  margin: 2rem auto 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const FaqItem = styled.div`
  border: 1px solid #ffeadd;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  position: relative;
`

const FaqBtn = styled.button`
  width: 100%;
  text-align: left;
  background: ${({ $open }) => $open ? '#fff' : '#f8fafc'};
  padding: 1.1rem 1.4rem;
  border: none;
  border-bottom: ${({ $open }) => $open ? '1px solid #f0f0f0' : 'none'};
  font-size: 1rem;
  font-weight: 600;
  color: ${({ $open }) => $open ? '#DA7756' : '#1e293b'};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #fff;
    color: #DA7756;
  }

  .chev {
    flex-shrink: 0;
    font-size: 0.75rem;
    transition: transform 0.3s;
    transform: ${({ $open }) => $open ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`

const FaqBody = styled.div`
  overflow: hidden;
  transition: max-height 0.35s ease, opacity 0.25s ease, padding 0.25s ease;
  max-height: ${({ $open }) => $open ? '400px' : '0'};
  opacity: ${({ $open }) => $open ? '1' : '0'};
  padding: ${({ $open }) => $open ? '1.1rem 1.4rem' : '0 1.4rem'};

  p {
    margin: 0;
    font-size: 0.97rem;
    color: #475569;
    line-height: 1.75;
  }
`


const faqs = [
    {
        q: "Is Gamepad Tester safe to use?",
        a: "Everything runs entirely client-side, meaning Gamepad Tester never uploads your controller data or personal information to a server , what happens in your browser stays in your browser."
    },
    {
        q: "How can I measure stick drift accurately?",
        a: "Rotate the stick slowly in a full circle and the Gamepad Tester graphs the axis in real time. If the resting points settle off-centre, it indicates drift that needs addressing, whether via recalibration or full potentiometer replacement."
    },
    {
        q: "Why isn't my gamepad showing up?",
        a: "The Gamepad API is inconsistent across browsers and OSes. Ensure the device is plugged in or connected via Bluetooth, press a few buttons to wake it, and close any background apps claiming the gamepad. Restarting the browser often resolves the issue."
    },
    {
        q: "What information is being displayed here?",
        a: "The tool instantly shows the current state of multiple gamepads connected to your computer. The timestamp shows the latest update, every axis position is visible in real-time, and digital buttons reflect clear on/off status. Analog buttons for high-precision triggers are mapped for perfect accuracy."
    },
    {
        q: "Does vibration work?",
        a: "Vibration is supported in modern browsers. If feedback doesn't trigger immediately, refreshing the page usually resolves the issue. Pose API tracking does not affect standard motor rumble."
    },
    {
        q: "Why are the axis values weird?",
        a: "Different devices, browsers, and OSes handle input differently. The Gamepad API returns values that may appear unusual, which is normal and often reported by other users."
    },
    {
        q: "What is circularity?",
        a: "The test circularity feature measures how accurately analog sticks move in all directions. A bounding circle is drawn and its radius checked to see if movement goes outside the circle, indicating drift or irregular input."
    },
    {
        q: "Can I test button latency?",
        a: "The Gamepad Tester records the exact timestamp of each input and its arrival on the panel, letting you observe any lag. Compare wired and wireless controllers in milliseconds to see which is faster."
    },
    {
        q: "Can I use Gamepad Tester on Android or iOS?",
        a: "The tool runs on PC through Chrome, Edge, Firefox, but mobile browser Gamepad API support varies. Some mobile browsers lack full features, so results may be less accurate."
    },
    {
        q: "Does Gamepad Tester work on Linux?",
        a: "The tool runs on most Linux distros with modern browsers, offering nearly all full features and maintaining feature parity with PC versions."
    },
    {
        q: "What does the deadzone percentage mean?",
        a: "The Gamepad Tester displays a figure showing the dead zone around the centre of your stick. Movements within the threshold are ignored so the console doesn't register unintended input. Adjustment is needed for accurate readings."
    }
]

import { useI18n } from '@/contexts/I18nContext'

export default function FaqAccordion() {
    const { t } = useI18n()
    const [openFaq, setOpenFaq] = useState(null)
    const toggle = (i) => setOpenFaq(openFaq === i ? null : i)

    // Match the JSON structure faq1Question, faq1Answer etc.
    const faqs = [
        { q: t('mainPageInfo.faq1Question'), a: t('mainPageInfo.faq1Answer') },
        { q: t('mainPageInfo.faq2Question'), a: t('mainPageInfo.faq2Answer') },
        { q: t('mainPageInfo.faq3Question'), a: t('mainPageInfo.faq3Answer') },
        { q: t('mainPageInfo.faq4Question'), a: t('mainPageInfo.faq4Answer') },
        { q: t('mainPageInfo.faq5Question'), a: t('mainPageInfo.faq5Answer') },
        { q: t('mainPageInfo.faq6Question'), a: t('mainPageInfo.faq6Answer') },
        { q: t('mainPageInfo.faq7Question'), a: t('mainPageInfo.faq7Answer') },
        { q: t('mainPageInfo.faq8Question'), a: t('mainPageInfo.faq8Answer') },
        { q: t('mainPageInfo.faq9Question'), a: t('mainPageInfo.faq9Answer') },
    ].filter(f => f.q && f.q !== 'mainPageInfo.faq1Question') // Filter out missing keys

    return (
        <FaqWrapper>
            {faqs.map((faq, i) => (
                <FaqItem key={i}>
                    <FaqBtn $open={openFaq === i} onClick={() => toggle(i)}>
                        {faq.q}
                        <span className="chev">▼</span>
                    </FaqBtn>
                    <FaqBody $open={openFaq === i}>
                        <p>{faq.a}</p>
                    </FaqBody>
                </FaqItem>
            ))}
        </FaqWrapper>
    )
}
