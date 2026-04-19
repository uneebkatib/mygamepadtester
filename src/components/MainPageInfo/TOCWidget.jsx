'use client'

import { useState } from 'react'
import styled from 'styled-components'
import Link from "next/link";


const TOCWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto 0 auto;
  padding: 0 1.5rem;
`

const TOCToggle = styled.button`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  color: #1e293b;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  transition: all 0.2s;

  &:hover {
    border-color: #DA7756;
    color: #DA7756;
  }
`

const TOCBox = styled.div`
  max-height: ${({ $open }) => $open ? '600px' : '0'};
  opacity: ${({ $open }) => $open ? '1' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  background: #fff;
  border: ${({ $open }) => $open ? '1px solid #ffeadd' : 'none'};
  border-radius: 12px;
  margin-top: 0.75rem;
  padding: ${({ $open }) => $open ? '1.25rem 1.5rem' : '0 1.5rem'};
`

const TOCGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.5rem 2rem;
`

const TOCLi = styled.li`
  a {
    color: #475569;
    text-decoration: none;
    font-size: 0.93rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0;
    transition: color 0.15s;

    &::before {
      content: '›';
      color: #DA7756;
      font-weight: 700;
    }

    &:hover {
      color: #DA7756;
    }
  }
`

import { useI18n } from '@/contexts/I18nContext'

export default function TOCWidget() {
  const { t } = useI18n()
  const [tocOpen, setTocOpen] = useState(false)

  const tocLinks = [
    { href: '#intro', label: t('mainPageInfo.tocLabels.intro') },
    { href: '#stick-drift-fix', label: t('mainPageInfo.tocLabels.stickDrift') },
    { href: '#why-stands-apart', label: t('mainPageInfo.tocLabels.whyApart') },
    { href: '#full-test', label: t('mainPageInfo.tocLabels.fullTest') },
    { href: '#universal-tester', label: t('mainPageInfo.tocLabels.universal') },
    { href: '#how-to-use', label: t('mainPageInfo.tocLabels.howTo') },
    { href: '#quick-fixes', label: t('mainPageInfo.tocLabels.quickFixes') },
    { href: '#advanced-tips', label: t('mainPageInfo.tocLabels.advancedTips') },
    { href: '#faqs', label: t('mainPageInfo.tocLabels.faq') },
  ]

  return (
    <TOCWrapper>
      <TOCToggle onClick={() => setTocOpen(!tocOpen)}>
        📋 {t('mainPageInfo.tocLabel')} {tocOpen ? '▲' : '▼'}
      </TOCToggle>
      <TOCBox $open={tocOpen}>
        <TOCGrid>
          {tocLinks.map(({ href, label }) => (
            <TOCLi key={href}>
              <Link href={href}>{label}</Link>
            </TOCLi>
          ))}
        </TOCGrid>
      </TOCBox>
    </TOCWrapper>
  )
}
