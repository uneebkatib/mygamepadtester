'use client'
import dynamic from 'next/dynamic'
const PrivacyPolicy = dynamic(() => import('@/components/PrivacyPolicy/PrivacyPolicy'), { ssr: false })
export default function PrivacyClient() { return <PrivacyPolicy /> }

