import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

const Job = ({job, onClick, isSelected}) => {
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <div 
            onClick={onClick}
            className={`h-full p-5 rounded-md bg-white border-2 shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:border-[#66BB6A] ${isSelected ? 'border-[#66BB6A]' : 'border-gray-200'}`}
        >
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
            </div>

            <div className='flex items-center gap-2 my-2 min-w-0'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div className='min-w-0'>
                    <h1 className='font-medium text-lg truncate'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div className='min-w-0'>
                <h1 className='font-bold text-lg my-2 break-words line-clamp-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2 break-words'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap items-center gap-2 mt-4 overflow-hidden'>
                <Badge className={'max-w-full text-black font-bold whitespace-normal break-words'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'max-w-full text-black font-bold whitespace-normal break-words'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'max-w-full text-black font-bold whitespace-normal break-words'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button className="bg-[#66BB6A] hover:bg-[#66AA5A]">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job
