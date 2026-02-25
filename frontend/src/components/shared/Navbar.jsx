import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { User2, LogOut } from "lucide-react";
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner';
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/explore");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
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
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-88 z-10">
                                    <div className=''>
                                        <div className='flex gap-4 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                        </div>
                                        <div className='flex flex-col text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
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