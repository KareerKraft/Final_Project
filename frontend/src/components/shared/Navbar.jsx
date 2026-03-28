import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { User2, LogOut } from "lucide-react";
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner';
import { setUser } from "@/redux/authSlice";
import { persistor } from '@/redux/store';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profilePhoto = user?.profile?.profilePhoto;
    const firstName = user?.fullname?.trim()?.split(" ")[0] || "User";

    const completeLocalLogout = (message) => {
        dispatch(setUser(null));
        persistor.purge();
        navigate("/explore", { replace: true });
        toast.success(message);
    };

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res?.data?.success) {
                completeLocalLogout(res.data.message);
            }
        } catch (error) {
            console.log(error);
            if (!error?.response) {
                completeLocalLogout("Logged out locally.");
                return;
            }
            toast.error(error?.response?.data?.message || "Logout failed");
        }
    }
    return (
        <div className='bg-white relative z-0'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-[#469428] text-2xl font-bold'>Job<span className='text-[#000000]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li> <Link to="/admin/companies">Companies</Link></li>
                                    <li> <Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li> <Link to="/home">Home</Link></li>
                                    <li> <Link to="/jobs">Jobs</Link></li>
                                    <li> <Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }

                    </ul>
                    {
                        !user ? (
                            <div className="flex items-center gap-2">
                                <Link to="/login"><Button variant="outline" className="h-9 px-4">Login</Button></Link>
                                <Link to="/signup"><Button className="h-9 px-4 bg-[#499428] hover:bg-[#66BB6A]">SignUp</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="h-10 w-10 cursor-pointer border border-gray-200">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        <AvatarFallback>{user?.fullname?.charAt(0)?.toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent align="end" sideOffset={10} className="z-[70] w-64 border border-gray-200 bg-white p-4 shadow-xl">
                                    <div className='space-y-4'>
                                        <div className='flex items-center gap-3'>
                                            <Avatar className="h-12 w-12 border border-gray-200">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                                <AvatarFallback>{user?.fullname?.charAt(0)?.toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className='min-w-0'>
                                                <p className='truncate font-semibold text-gray-900'>{user?.role === 'recruiter' ? firstName : user?.fullname}</p>
                                                <p className='truncate text-sm text-gray-500'>{user?.email}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-1 text-gray-600'>
                                            {user?.role !== 'recruiter' && (
                                                <div className='flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-green-100'>
                                                    <User2 className='h-4 w-4' />
                                                    <Button asChild variant="link" className="h-auto p-0 text-gray-700 no-underline hover:no-underline">
                                                        <Link to="/profile">View Profile</Link>
                                                    </Button>
                                                </div>
                                            )}
                                            {user?.role === 'recruiter' && (
                                                <div className='rounded-md px-2 py-1 text-xs text-gray-500'>
                                                    {profilePhoto ? 'Profile photo is available.' : `${firstName} is logged in.`}
                                                </div>
                                            )}
                                            <div
                                                onClick={logoutHandler}
                                                className='flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-gray-100'
                                            >
                                                <LogOut />
                                                <Button type="button" variant="link" className="h-auto p-0 text-gray-700 no-underline hover:no-underline">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
