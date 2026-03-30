import React, { useEffect, useState } from 'react'
import { Bell, CalendarDays, ExternalLink, FileText, Link as LinkIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from '@/utils/axios'
import { ANNOUNCEMENT_API_END_POINT } from '@/utils/constant'
import Navbar from './shared/Navbar'

const getTypeLabel = (type) => {
    if (type === 'shortlisted') return 'Shortlisted Students';
    if (type === 'venue') return 'Exam Venue Details';
    return 'Custom Announcement';
};

const LatestUpdates = () => {
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.auth);
    const [latestUpdates, setLatestUpdates] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (user.role !== 'student') {
            navigate('/home');
            return;
        }

        const fetchLatestAnnouncements = async () => {
            try {
                const res = await axios.get(`${ANNOUNCEMENT_API_END_POINT}/latest`, {
                    withCredentials: true,
                });

                if (res.data.success) {
                    setLatestUpdates(res.data.announcements || []);
                }
            } catch (error) {
                console.log('Failed to load announcements', error);
            }
        };

        fetchLatestAnnouncements();
    }, [navigate, user]);

    return (
        <div className='min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(73,148,40,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(134,239,172,0.22),transparent_28%),linear-gradient(135deg,#f8fff9_0%,#f4fbf3_52%,#eef9f0_100%)]'>
            <Navbar />

            <div className='mx-auto max-w-6xl px-4 py-10'>
                <section className='rounded-[32px] bg-gradient-to-r from-slate-950 via-slate-900 to-[#245b14] px-8 py-10 text-white shadow-xl'>
                    <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
                        <div className='max-w-3xl'>
                            <div className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide text-green-100'>
                                <Bell className='h-4 w-4' />
                                Latest Updates
                            </div>
                            <h1 className='mt-5 text-4xl font-bold leading-tight'>Do not miss out on updates from recruiters.</h1>
                            <p className='mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base'>
                                This page shows the latest shortlisted notices, exam venue details, and custom announcements posted from the recruiter post center.
                            </p>
                        </div>
                        <div className='rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-center backdrop-blur'>
                            <p className='text-xs uppercase tracking-[0.22em] text-green-100'>Total Updates</p>
                            <p className='mt-2 text-3xl font-bold text-white'>{latestUpdates.length}</p>
                        </div>
                    </div>
                </section>

                <section className='mt-8'>
                    {latestUpdates.length === 0 ? (
                        <div className='rounded-3xl border border-dashed border-slate-300 bg-white/85 px-6 py-12 text-center text-slate-500 shadow-sm'>
                            No recruiter updates have been posted yet.
                        </div>
                    ) : (
                        <div className='grid gap-5'>
                            {latestUpdates.map((update) => (
                                <article key={update._id} className='rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm'>
                                    <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
                                        <div className='max-w-3xl'>
                                            <p className='text-xs font-semibold uppercase tracking-[0.18em] text-[#499428]'>
                                                {getTypeLabel(update.type)}
                                            </p>
                                            <h2 className='mt-2 text-2xl font-bold text-slate-900'>{update.title}</h2>
                                            <p className='mt-3 text-sm leading-7 text-slate-600'>
                                                {update.description || update.summary || 'A new recruiter update has been published.'}
                                            </p>
                                        </div>
                                        <div className='shrink-0 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600'>
                                            <div className='inline-flex items-center gap-2'>
                                                <CalendarDays className='h-4 w-4 text-[#499428]' />
                                                {update.createdAt?.split('T')[0]}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mt-5 flex flex-wrap gap-3 text-sm'>
                                        <div className='inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-[#3f7e24]'>
                                            <FileText className='h-4 w-4' />
                                            {update.files?.length || 0} attachment(s)
                                        </div>
                                        <div className='inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-slate-700'>
                                            <LinkIcon className='h-4 w-4' />
                                            {update.links?.length || 0} link(s)
                                        </div>
                                    </div>

                                    {update.links?.length > 0 ? (
                                        <div className='mt-5 flex flex-col gap-3'>
                                            {update.links.map((link, index) => (
                                                <a
                                                    key={`${update._id}-${index}`}
                                                    href={link.url}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    className='inline-flex items-center gap-2 text-sm font-semibold text-[#499428] hover:underline'
                                                >
                                                    <ExternalLink className='h-4 w-4' />
                                                    {link.label || 'Open update link'}
                                                </a>
                                            ))}
                                        </div>
                                    ) : null}
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

export default LatestUpdates
