import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const jobRoles = ["All", "Frontend Developer", "Backend Developer", "FullStack Developer"];
const locations = ["All", "Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"];

const Jobs = () => {
    const { allJobs = [] } = useSelector(store => store.job || {});
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [filterJobs, setFilterJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isApplied, setIsApplied] = useState(false);
    const [selectedJobRole, setSelectedJobRole] = useState("All");
    const [selectedLocation, setSelectedLocation] = useState("All");

    useEffect(() => {
        let filtered = allJobs;

        // Filter by job role
        if (selectedJobRole !== "All") {
            filtered = filtered.filter((job) =>
                job?.title?.toLowerCase().includes(selectedJobRole.toLowerCase())
            );
        }

        // Filter by location
        if (selectedLocation !== "All") {
            filtered = filtered.filter((job) =>
                job?.location?.toLowerCase().includes(selectedLocation.toLowerCase())
            );
        }

        setFilterJobs(filtered);
    }, [allJobs, selectedJobRole, selectedLocation]);

    useEffect(() => {
        if (selectedJob) {
            // Check if user has already applied for this job
            const hasAlreadyApplied = selectedJob?.applications?.some(
                application => {
                    // Handle both cases: applicant is an id string or an object with _id
                    const applicantId = typeof application?.applicant === 'string' 
                        ? application?.applicant 
                        : application?.applicant?._id;
                    return applicantId === user?._id;
                }
            );
            setIsApplied(hasAlreadyApplied || false);
        }
    }, [selectedJob, user?._id]);

    const applyJobHandler = async () => {
        try {
            if (!selectedJob?._id) {
                toast.error('Job ID is missing');
                return;
            }

            if (!user?._id) {
                toast.error('Please log in to apply for jobs');
                return;
            }

            if (isApplied) {
                toast.info('You have already applied for this job');
                return;
            }

            // Immediately set to true to update UI optimistically
            setIsApplied(true);

            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/apply/${selectedJob._id}`,
                {},
                { withCredentials: true }
            );

            if (res.data.success) {
                // Create the new application with the user object
                const newApplication = { 
                    applicant: { _id: user._id }
                };
                const updatedApplications = [
                    ...(selectedJob.applications || []),
                    newApplication
                ];

                const updatedJob = {
                    ...selectedJob,
                    applications: updatedApplications
                };

                // Update the selected job
                setSelectedJob(updatedJob);

                // Update all jobs so status persists
                const updatedAllJobs = allJobs.map((j) =>
                    j._id === updatedJob._id
                        ? { ...j, applications: updatedApplications }
                        : j
                );

                dispatch(setAllJobs(updatedAllJobs));

                toast.success(res.data.message || "Successfully applied!");
            }

        } catch (error) {
            console.log("Apply error:", error.response);

            const errorMessage = error.response?.data?.message || "Failed to apply";

            // If we get a 400 error, fetch fresh job data to see the actual state
            if (error.response?.status === 400) {
                try {
                    const freshJobRes = await axios.get(
                        `${JOB_API_END_POINT}/get/${selectedJob._id}`,
                        { withCredentials: true }
                    );
                    if (freshJobRes.data.success) {
                        const freshJob = freshJobRes.data.job;
                        setSelectedJob(freshJob);

                        // Update allJobs with fresh data
                        const updatedAllJobs = allJobs.map((j) =>
                            j._id === freshJob._id ? freshJob : j
                        );
                        dispatch(setAllJobs(updatedAllJobs));

                        // Check if user has applied based on fresh data
                        const hasApplied = freshJob?.applications?.some(
                            application => {
                                const applicantId = typeof application?.applicant === 'string'
                                    ? application?.applicant
                                    : application?.applicant?._id;
                                return applicantId === user?._id;
                            }
                        );

                        if (hasApplied) {
                            setIsApplied(true);
                            toast.info("You have already applied for this job");
                        } else {
                            setIsApplied(false);
                            toast.error(errorMessage);
                        }
                    }
                } catch (fetchError) {
                    console.log("Error fetching fresh job data:", fetchError);
                    setIsApplied(false);
                    toast.error(errorMessage);
                }
                return;
            }

            // For other errors, revert the state
            setIsApplied(false);
            toast.error(errorMessage);
        }
    };

    return (
        <div>
            <Navbar />

            {/* Top Search Bar */}
            <div className='bg-white border-b'>
                <div className='max-w-7xl mx-auto py-4 px-5'>
                    <div className='flex gap-4 items-center'>
                        {/* Job Role Dropdown */}
                        <div className='flex-1'>
                            <label className='text-sm text-gray-600 block mb-2'>Job Role</label>
                            <select
                                value={selectedJobRole}
                                onChange={(e) => setSelectedJobRole(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66BB6A]'
                            >
                                {jobRoles.map((role) => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>

                        {/* Location Dropdown */}
                        <div className='flex-1'>
                            <label className='text-sm text-gray-600 block mb-2'>Location</label>
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66BB6A]'
                            >
                                {locations.map((location) => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='max-w-7xl mx-auto mt-5 pb-5'>
                <div className='flex gap-5 h-[78vh]'>
                    {/* Left Side - Job Cards Grid */}
                    <div className='w-[45%] overflow-y-auto pr-3'>
                        {filterJobs.length <= 0 ? (
                            <div className='text-center py-10'>
                                <span className='text-gray-500'>No jobs found</span>
                            </div>
                        ) : (
                            <div className='grid grid-cols-2 gap-4'>
                                {
                                    filterJobs.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                            key={job?._id}
                                            onClick={() => setSelectedJob(job)}
                                        >
                                            <Job
                                                job={job}
                                                onClick={() => setSelectedJob(job)}
                                                isSelected={selectedJob?._id === job?._id}
                                            />
                                        </motion.div>
                                    ))
                                }
                            </div>
                        )}
                    </div>

                    {/* Right Side - Job Details Panel */}
                    <div className='flex-1 bg-white rounded-md p-6 overflow-y-auto'>
                        {selectedJob ? (
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className='flex items-center justify-between mb-4'>
                                    <div>
                                        <h1 className='font-bold text-2xl'>{selectedJob?.title}</h1>
                                        <div className='flex items-center gap-2 mt-4'>
                                            <Badge className={'text-blue-700 font-bold'} variant="ghost">{selectedJob?.position} Positions</Badge>
                                            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{selectedJob?.jobType}</Badge>
                                            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{selectedJob?.salary}LPA</Badge>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={isApplied ? null : applyJobHandler}
                                        disabled={isApplied}
                                        className={`rounded-lg font-bold text-white ${isApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#66BB6A] hover:bg-[#5fa858]'}`}>
                                        {isApplied ? 'Already Applied' : 'Apply Now'}
                                    </Button>
                                </div>
                                <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
                                <div className='my-4 space-y-3'>
                                    <h1 className='font-bold'>Role: <span className='pl-4 font-normal text-gray-800'>{selectedJob?.title}</span></h1>
                                    <h1 className='font-bold'>Location: <span className='pl-4 font-normal text-gray-800'>{selectedJob?.location}</span></h1>
                                    <h1 className='font-bold'>Description: <span className='pl-4 font-normal text-gray-800'>{selectedJob?.description}</span></h1>
                                    <h1 className='font-bold'>Experience: <span className='pl-4 font-normal text-gray-800'>{selectedJob?.experience} yrs</span></h1>
                                    <h1 className='font-bold'>Salary: <span className='pl-4 font-normal text-gray-800'>{selectedJob?.salary}LPA</span></h1>
                                    <h1 className='font-bold'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{selectedJob?.applications?.length}</span></h1>
                                    <h1 className='font-bold'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{selectedJob?.createdAt.split("T")[0]}</span></h1>
                                </div>
                            </motion.div>
                        ) : (
                            <div className='flex items-center justify-center h-full text-gray-500'>
                                <p>Click on a job to see details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs
