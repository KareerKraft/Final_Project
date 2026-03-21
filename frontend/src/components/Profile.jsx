import Navbar from './shared/Navbar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import { useState } from 'react'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJob'

// const skills = ["Html", "CSS", "JavaScript", "React.js"]

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const isRecruiter = user?.role === 'recruiter';
    const firstName = user?.fullname?.trim()?.split(" ")[0] || user?.fullname;
    const hasResume = Boolean(user?.profile?.resume);
    const hasProfilePhoto = Boolean(user?.profile?.profilePhoto);

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-8 shadow-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} />
                            <AvatarFallback>{user?.fullname?.charAt(0)?.toUpperCase()}</AvatarFallback>
                        </Avatar>

                        <div>
                            <h1 className="font-medium text-xl">{isRecruiter ? firstName : user?.fullname}</h1>
                            <p>{user?.profile?.bio || "Add a short profile summary to introduce yourself."}</p>
                            {isRecruiter && (
                                <Button onClick={() => setOpen(true)} variant="link" className="mt-2 h-auto p-0 text-[#499428]">
                                    {hasProfilePhoto ? 'Edit Profile Photo' : 'Add Profile Photo'}
                                </Button>
                            )}
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)}className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2">
                        <Mail />
                        <span>{user?.email}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div>
                    <h1>{isRecruiter ? 'Expertise' : 'Skills'}</h1>
                    <div className='flex flex-wrap items-center gap-1'>
                        {
                            user?.profile?.skills?.length > 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} className="bg-[#499428] text-white rounded-full px-3 py-1 text-sm">{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">{isRecruiter ? 'Company Profile / Resume' : 'Resume'}</Label>
                    {
                        hasResume ? <a target='blank' href={user?.profile?.resume} className='text-[#499428] hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            {!isRecruiter && (
                <div className='mt-8 max-w-4xl mx-auto bg-white rounded-2xl p-8 '>
                    <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                    <AppliedJobTable />
                </div>
            )}
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
