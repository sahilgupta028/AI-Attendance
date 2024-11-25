import AttendanceAlerts from '@/components/Features/AttendanceAlerts'
import AttendanceGraph from '@/components/Features/AttendanceGraph'
import CameraAttendance from '@/components/Features/CameraAttendance'
import CameraAuthentication from '@/components/Features/CameraAuthentication'
import ReportGeneration from '@/components/Features/ReportGeneration'
import StudentChatbot from '@/components/Features/StudentChatbot'
import Banner from '@/components/Home/Banner'
import Banner2 from '@/components/Home/Banner2'
import React from 'react'

const page = () => {
  return (
    <div>
        <Banner2 />
        <CameraAttendance />
        <StudentChatbot />
        <ReportGeneration />
        <AttendanceAlerts />
        <AttendanceGraph />
        <CameraAuthentication />
    </div>
  )
}

export default page