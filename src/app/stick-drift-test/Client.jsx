'use client'
import dynamic from 'next/dynamic'
const StickDriftTest = dynamic(() => import('@/components/UtilityPages/StickDriftTest'), { ssr: false })
export default function StickDriftTestClient() { return <StickDriftTest /> }
