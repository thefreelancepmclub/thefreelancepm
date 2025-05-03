import React from 'react'
import Header from '@/components/header'
import QuizzesContainer from './_components/quizzes-container'
import JobRightFit from '../jobBoard/_components/JobRightFit'

const page = () => {
  return (
    <div className=''>
        <Header subtitile="Discover Your Project Management Path">
        Discover Your Project {" "}
        <span className="text-[#FFA400] underline">Management</span>Path
      </Header>
      <div className='container mx-auto mb-10'>
      <QuizzesContainer/>
      </div>
      <JobRightFit/>
    </div>
  )
}

export default page