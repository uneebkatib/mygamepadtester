'use client'
import dynamic from 'next/dynamic'
const JoyConTester = dynamic(() => import('@/components/ControllerPages/JoyConTester'), { ssr: false })
export default function JoyConClient() { return <JoyConTester /> }

