'use client'
import dynamic from 'next/dynamic'
const JoystickCalibration = dynamic(() => import('@/components/UtilityPages/JoystickCalibration'), { ssr: false })
export default function JoystickCalibrationClient() { return <JoystickCalibration /> }

