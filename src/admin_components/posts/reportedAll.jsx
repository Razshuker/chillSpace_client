import React from 'react'
import ReportedPosts from './reportedPosts'
import ReportedComments from './reportedComments'

export default function ReportedAll() {
  return (
    <div className='container-fluid'>
        <ReportedPosts/>
        <ReportedComments/>
    </div>
  )
}
