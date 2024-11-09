import Banner from '@/components/Home/Banner'
import Banner2 from '@/components/Home/Banner2'
import DoubtForm from '@/components/Home/DoubtForm'
import Features from '@/components/Home/Features'
import StudentPortal from '@/components/Home/StudentsPortal'
import TeachersPortal from '@/components/Home/TeacherPortal'
import OurTeam from '@/components/Home/Team'
import Testimonials from '@/components/Home/Testimonals'
import React from 'react'

const page = () => {
  return (
    <div>
      <Banner />
      <StudentPortal />
      <TeachersPortal />
      <Features />
      <OurTeam />
      <Testimonials />
      <DoubtForm />
    </div>
  )
}

export default page