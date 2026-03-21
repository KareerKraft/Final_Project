import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCards = ({ job, isActive = false }) => {
  return (
    <div className={`latest-job-card ${isActive ? 'is-active' : 'is-muted'}`}>
      <div className='latest-job-card-header'>
        <h1 className='latest-job-company'>{job?.company?.name}</h1>
        <p className='latest-job-location'>{job?.location || 'India'}</p>
      </div>

      <div>
        <h1 className='latest-job-title'>{job?.title}</h1>
        <p className='latest-job-description'>{job?.description}</p>
      </div>

      <div className='latest-job-badges'>
        <Badge className={`${isActive ? 'bg-[#e8f8ec] border-[#67c97c]' : ''} text-[#000000] font-bold`} variant="outline">
          {job?.position} Positions
        </Badge>
        <Badge className={`${isActive ? 'bg-[#e8f8ec] border-[#67c97c]' : ''} text-[#000000] font-bold`} variant="outline">
          {job?.jobType}
        </Badge>
        <Badge className={`${isActive ? 'bg-[#e8f8ec] border-[#67c97c]' : ''} text-[#000000] font-bold`} variant="outline">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
