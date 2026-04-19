'use client'
import dynamic from 'next/dynamic'
const TermsOfService = dynamic(() => import('@/components/TermsOfService/TermsOfService'), { ssr: false })
export default function TermsClient() { return <TermsOfService /> }

