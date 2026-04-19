'use client'
import dynamic from 'next/dynamic'
const ButtonTest = dynamic(() => import('@/components/UtilityPages/ButtonTest'), { ssr: false })
export default function ButtonTestClient() { return <ButtonTest /> }
