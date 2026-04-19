'use client'
import dynamic from 'next/dynamic'
const Contact = dynamic(() => import('@/components/Contact/Contact'), { ssr: false })
export default function ContactClient() { return <Contact /> }

