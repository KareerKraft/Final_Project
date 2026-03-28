import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '@/utils/axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import SearchableMultiSelect from './SearchableMultiSelect'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const isRecruiter = user?.role === 'recruiter';

    const SKILLS = [
        'JavaScript','React','Node.js','Express','MongoDB','Python','Django','Java','C++','SQL','TypeScript','AWS','Docker','Kubernetes','Vue.js','Angular','Spring Boot','PHP','Ruby','Go','Rust','C#','.NET','GraphQL','REST API','Git','Linux','Windows','MacOS','Firebase','PostgreSQL','MySQL','Redis','Elasticsearch','Kubernetes','Jenkins','GitLab','GitHub','Bitbucket','JIRA','Figma','Bootstrap','Tailwind CSS','SASS','HTML5','CSS3','jQuery','Axios','Testing','Jest','Mocha','Cypress','REST','SOAP','OAuth','JWT','Microservices','API Design'
    ];
    const JOB_TITLES = [
        'Software Engineer','Frontend Developer','Backend Developer','Fullstack Developer','Data Scientist','DevOps Engineer','Product Manager','QA Engineer','Mobile Developer','iOS Developer','Android Developer','UI/UX Designer','Database Administrator','Network Engineer','Security Engineer','System Administrator','Solutions Architect','Technical Lead','Engineering Manager','Scrum Master','Business Analyst','Data Analyst','Machine Learning Engineer','Cloud Architect','Site Reliability Engineer'
    ];
    const LOCATIONS = [
        'Bengaluru','Hyderabad','Pune','Chennai','Mumbai','New Delhi','Gurugram','Noida','Kolkata','Ahmedabad','Lucknow','Jaipur','Surat','Nagpur','Indore','Bhopal','Thiruvananthapuram','Kochi','Coimbatore','Visakhapatnam','Bhubaneswar','Chandigarh','Vadodara','Rajkot','Patna','Aurangabad','Vijayawada','Madurai','Mysore','Dehradun','Ranchi', 'Remote', 'Anywhere'
    ];

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills || [],
        jobTitles: user?.profile?.jobTitles || [],
        preferredLocation1: user?.profile?.preferredLocations?.[0] || '',
        preferredLocation2: user?.profile?.preferredLocations?.[1] || '',
        preferredLocation3: user?.profile?.preferredLocations?.[2] || '',
        workPreference: user?.profile?.workPreference || 'remote',
        file: null,
        profilePhoto: null
    });
    const [photoPreview, setPhotoPreview] = useState(user?.profile?.profilePhoto || null);
    const dispatch = useDispatch();

    
    const changeEventHandler = (e) => {
        const { name, value, multiple, options } = e.target;
        if (multiple) {
            const vals = Array.from(options).filter(o => o.selected).map(o => o.value);
            setInput({ ...input, [name]: vals });
            return;
        }
        setInput({ ...input, [name]: value });
    }
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const profilePhotoChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, profilePhoto: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const bioWordCount = input.bio.trim().split(/\s+/).filter(Boolean).length;

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (!isRecruiter) {
            formData.append("fullname", input.fullname);
            formData.append("email", input.email);
            formData.append("phoneNumber", input.phoneNumber);
            formData.append("bio", input.bio);
            formData.append("skills", (input.skills || []).join(","));
            formData.append("jobTitles", (input.jobTitles || []).join(","));
            const preferredLocationsArray = [input.preferredLocation1, input.preferredLocation2, input.preferredLocation3].filter(Boolean);
            formData.append("preferredLocations", preferredLocationsArray.join(","));
            formData.append("workPreference", input.workPreference);
            if (input.file) {
                formData.append("file", input.file);
            }
        }
        if (input.profilePhoto) {
            formData.append("profilePhoto", input.profilePhoto);
        }
        try {
            setLoading(true);
            const res = await axios.post(
                `${USER_API_END_POINT}/profile/update`,
                formData,
                { withCredentials: true

        });
        if (res.data.success) {
            dispatch(setUser(res.data.user));
            toast.success('✓ Profile updated successfully!', { 
                duration: 3000,
                position: 'top-center',
                style: {
                    background: '#10b981',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    padding: '16px'
                }
            });
            setOpen(false);
        }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
        console.log(input);
}



return (
    <div>
        <Dialog open={open}>
            <DialogContent className={`${isRecruiter ? 'sm:max-w-md' : 'sm:max-w-2xl'} max-h-[90vh] overflow-y-auto bg-white`} onInteractOutside={() => setOpen(false)}>
                <DialogHeader className="bg-black -mx-6 -mt-6 px-6 pt-6 pb-4 rounded-t-lg">
                    <DialogTitle className="text-xl md:text-2xl text-white font-bold">{isRecruiter ? 'Update Profile Photo' : 'Update Your Profile'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-6 py-6 px-2 md:px-4'>
                        <div className="rounded-lg bg-gray-50 p-4 shadow-sm border border-green-200">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center overflow-hidden">
                                    {photoPreview ? (
                                        <img src={photoPreview} alt="profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-white text-2xl md:text-3xl font-bold">{input.fullname?.charAt(0)?.toUpperCase()}</span>
                                    )}
                                </div>
                                <label className="flex-1 cursor-pointer">
                                    <div className="px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-lg text-sm font-medium transition-colors duration-200">
                                        Upload Photo
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={profilePhotoChangeHandler}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {isRecruiter && (
                                <p className="text-sm text-gray-600">Upload a recruiter profile picture here. No other profile fields are required.</p>
                            )}
                        </div>

                        {!isRecruiter && (
                        <>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className="rounded-lg bg-gray-50 p-4 shadow-sm border border-green-200">
                                <Label htmlFor="name" className="text-sm md:text-base font-semibold text-gray-900 block mb-2">Full Name</Label>
                                <Input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="text-sm md:text-base border-green-300 focus:border-green-500 focus:ring-green-500"
                                />
                            </div>
                            <div className="rounded-lg bg-gray-50 p-4 shadow-sm border border-green-200">
                                <Label htmlFor="email" className="text-sm md:text-base font-semibold text-gray-900 block mb-2">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="text-sm md:text-base border-green-300 focus:border-green-500 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className="rounded-lg bg-gray-50 p-4 shadow-sm border border-green-200">
                                <Label htmlFor="number" className="text-sm md:text-base font-semibold text-gray-900 block mb-2">Phone Number</Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="text-sm md:text-base border-green-300 focus:border-green-500 focus:ring-green-500"
                                />
                            </div>
                        <div className="rounded-lg bg-gray-50 p-4 shadow-sm border border-green-200">
                            <div className="flex justify-between items-baseline mb-2">
                                <Label htmlFor="bio" className="text-sm md:text-base font-semibold text-gray-900">Bio</Label>
                                <span className={`text-xs md:text-sm font-medium ${bioWordCount > 250 ? 'text-red-600' : 'text-gray-600'}`}>{bioWordCount}/250 words</span>
                                </div>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={(e) => {
                                        const words = e.target.value.trim().split(/\s+/).filter(Boolean).length;
                                        if (words <= 250 || e.target.value.length < input.bio.length) {
                                            setInput({ ...input, bio: e.target.value });
                                        }
                                    }}
                                    placeholder="Tell us about yourself..."
                                    className="w-full text-sm md:text-base border border-green-300 focus:border-green-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-200 resize-none min-h-24"
                                    maxLength="2000"
                                />
                            </div>
                        </div>

                        <div className='grid gap-4'>
                            <div className="rounded-lg bg-white p-4 shadow-sm border border-blue-100">
                                <SearchableMultiSelect 
                                    label="Skills"
                                    options={SKILLS}
                                    selected={input.skills}
                                    onChange={(newSkills) => setInput({ ...input, skills: newSkills })}
                                    color="blue"
                                />
                                {/* Show selected skills one-per-line for easier editing */}
                                {/* {input.skills && input.skills.length > 0 && (
                                    <div className="mt-3 flex flex-col gap-2">
                                        {input.skills.map((s, i) => (
                                            <div key={i} className="text-base text-gray-800">{s}</div>
                                        ))}
                                    </div>
                                )} */}
                            </div>

                            <div className="rounded-lg bg-white p-4 shadow-sm border border-blue-100">
                                <SearchableMultiSelect 
                                    label="Job Titles"
                                    options={JOB_TITLES}
                                    selected={input.jobTitles}
                                    onChange={(newJobTitles) => setInput({ ...input, jobTitles: newJobTitles })}
                                    color="green"
                                />
                                {/* Show selected job titles one-per-line for easier editing */}
                                {/* {input.jobTitles && input.jobTitles.length > 0 && (
                                    <div className="mt-3 flex flex-col gap-2">
                                        {input.jobTitles.map((j, i) => (
                                            <div key={i} className="text-base text-gray-800">{j}</div>
                                        ))}
                                    </div>
                                )} */}
                            </div>
                        </div>

                        <div className='grid gap-4 md:grid-cols-3'>
                            <div className="rounded-lg bg-gray-50 p-4 shadow-sm border border-green-200">
                                <Label htmlFor="preferredLocation1" className="text-sm md:text-base font-semibold text-gray-900 block mb-2">Preferred Location 1</Label>
                                <select name="preferredLocation1" value={input.preferredLocation1} onChange={changeEventHandler} className="w-full border border-green-300 focus:border-green-500 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-green-200 text-sm md:text-base">
                                    <option value="">Select location</option>
                                    {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                </select>
                            </div>

                            <div className="rounded-lg bg-gray-50 p-4 shadow-sm border border-green-200">
                                <Label htmlFor="preferredLocation2" className="text-sm md:text-base font-semibold text-gray-900 block mb-2">Preferred Location 2</Label>
                                <select name="preferredLocation2" value={input.preferredLocation2} onChange={changeEventHandler} className="w-full border border-green-300 focus:border-green-500 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-green-200 text-sm md:text-base">
                                    <option value="">Select location</option>
                                    {LOCATIONS.filter(loc => loc !== input.preferredLocation1).map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                </select>
                            </div>

                            <div className="rounded-lg bg-gray-50 p-4 shadow-sm border border-green-200">
                                <Label htmlFor="preferredLocation3" className="text-sm md:text-base font-semibold text-gray-900 block mb-2">Preferred Location 3</Label>
                                <select name="preferredLocation3" value={input.preferredLocation3} onChange={changeEventHandler} className="w-full border border-green-300 focus:border-green-500 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-green-200 text-sm md:text-base">
                                    <option value="">Select location</option>
                                    {LOCATIONS.filter(loc => loc !== input.preferredLocation1 && loc !== input.preferredLocation2).map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="rounded-lg bg-gray-50 p-4 shadow-sm border border-green-200">
                            <Label htmlFor="workPreference" className="text-sm md:text-base font-semibold text-gray-900 block mb-3">Work Preference</Label>
                            <div className="flex items-center gap-4 flex-wrap">
                                <label className="flex items-center gap-2 text-sm md:text-base cursor-pointer hover:text-green-700 transition-colors">
                                    <input type="radio" name="workPreference" value="remote" checked={input.workPreference==='remote'} onChange={changeEventHandler} className="accent-green-600"/> Remote
                                </label>
                                <label className="flex items-center gap-2 text-sm md:text-base cursor-pointer hover:text-green-700 transition-colors">
                                    <input type="radio" name="workPreference" value="onsite" checked={input.workPreference==='onsite'} onChange={changeEventHandler} className="accent-green-600"/> On-site
                                </label>
                                <label className="flex items-center gap-2 text-sm md:text-base cursor-pointer hover:text-green-700 transition-colors">
                                    <input type="radio" name="workPreference" value="hybrid" checked={input.workPreference==='hybrid'} onChange={changeEventHandler} className="accent-green-600"/> Hybrid
                                </label>
                            </div>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4 shadow-sm border border-green-200">
                            <Label htmlFor="file" className="text-sm md:text-base font-semibold text-gray-900 block mb-2">Resume (PDF)</Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="text-sm md:text-base border-green-300 focus:border-green-500 focus:ring-green-500"
                            />
                        </div>
                        </>
                        )}
                    </div>
                    <DialogFooter className="bg-black -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
                        {
                            loading ? <Button className="w-full text-sm md:text-base bg-green-600 text-white hover:bg-green-700 font-semibold"> <Loader2 className='mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin' /> Updating... </Button> : <Button type="submit" className="w-full text-sm md:text-base bg-green-600 text-white hover:bg-green-700 font-semibold">Update Profile</Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
)
}

export default UpdateProfileDialog
