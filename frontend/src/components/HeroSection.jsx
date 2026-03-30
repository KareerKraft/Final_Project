import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Bell, Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import axios from '@/utils/axios';
import { ANNOUNCEMENT_API_END_POINT } from '@/utils/constant';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const [latestUpdates, setLatestUpdates] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchLatestAnnouncements = async () => {
            try {
                const res = await axios.get(`${ANNOUNCEMENT_API_END_POINT}/latest`, {
                    withCredentials: true,
                });

                if (res.data.success) {
                    setLatestUpdates(res.data.announcements || []);
                }
            } catch (error) {
                console.log("Failed to load announcements", error);
            }
        };

        if (user?.role === "student") {
            fetchLatestAnnouncements();
        }
    }, [user?.role]);

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center relative'>
            {user?.role === "student" ? (
                <div className='mx-auto flex max-w-6xl justify-end px-4 pt-2'>
                    <Button
                        type="button"
                        variant="outline"
                        className='relative h-11 rounded-full border-green-200 bg-white/90 px-4 shadow-sm'
                        onClick={() => navigate('/updates')}
                    >
                        <Bell className='h-4 w-4 text-[#499428]' />
                        <span>Latest Updates</span>
                        {latestUpdates.length > 0 ? (
                            <span className='absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#499428] px-1 text-[10px] font-bold text-white'>
                                {latestUpdates.length}
                            </span>
                        ) : null}
                    </Button>
                </div>
            ) : null}
            <div className='flex flex-col gap-5 my-10'>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#469428]'>Dream Jobs</span></h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        searchJobHandler();
                    }}
                    className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'
                >
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'

                    />
                    <Button type="submit" className="rounded-r-full bg-[#499428] hover:bg-[#66BB6A]">
                        <Search className='h-5 w-5' />
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default HeroSection
