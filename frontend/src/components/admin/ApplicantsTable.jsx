import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const [selectedApplicant, setSelectedApplicant] = React.useState(null);

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Date</TableHead>  
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell >
                                    {
                                        item.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>
                                    <button type="button" onClick={() => setSelectedApplicant(item?.applicant)} className="text-sm px-2 py-1 border rounded">View</button>
                                </TableCell>
                                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>

                            </tr>
                        ))
                    }

                </TableBody>

            </Table>
            {
                selectedApplicant && (
                    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-6 overflow-auto z-50">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg">Applicant Details</h3>
                            <button className="px-3 py-1 border rounded hover:bg-gray-100" onClick={() => setSelectedApplicant(null)}>Close</button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <strong className="text-gray-700">Skills:</strong>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedApplicant.profile?.skills?.length ? selectedApplicant.profile.skills.map(s => (
                                        <span key={s} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{s}</span>
                                    )) : <span className="text-gray-400">NA</span>}
                                </div>
                            </div>
                            <div>
                                <strong className="text-gray-700">Job Titles:</strong>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedApplicant.profile?.jobTitles?.length ? selectedApplicant.profile.jobTitles.map(t => (
                                        <span key={t} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{t}</span>
                                    )) : <span className="text-gray-400">NA</span>}
                                </div>
                            </div>
                            <div>
                                <strong className="text-gray-700">Preferred Locations:</strong>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedApplicant.profile?.preferredLocations?.length ? selectedApplicant.profile.preferredLocations.map(loc => (
                                        <span key={loc} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">{loc}</span>
                                    )) : <span className="text-gray-400">NA</span>}
                                </div>
                            </div>
                            <div>
                                <strong className="text-gray-700">Work Preference:</strong>
                                <p className="mt-1 text-sm capitalize">{selectedApplicant.profile?.workPreference || 'NA'}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ApplicantsTable