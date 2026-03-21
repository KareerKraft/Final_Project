import React, { useEffect, useMemo, useState } from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
    const [activeIndex, setActiveIndex] = useState(0);
    const orderedJobs = useMemo(() => {
        return [...(allJobs || [])].sort((a, b) => {
            const firstDate = new Date(a?.createdAt || 0).getTime();
            const secondDate = new Date(b?.createdAt || 0).getTime();
            return secondDate - firstDate;
        });
    }, [allJobs]);

    useEffect(() => {
        if (orderedJobs.length <= 1) return;

        const intervalId = setInterval(() => {
            setActiveIndex((current) => {
                if (current >= orderedJobs.length - 1) {
                    return current;
                }
                return current + 1;
            });
        }, 4500);

        return () => clearInterval(intervalId);
    }, [orderedJobs.length]);

    useEffect(() => {
        if (activeIndex >= orderedJobs.length) {
            setActiveIndex(0);
        }
    }, [activeIndex, orderedJobs.length]);

    useEffect(() => {
        if (orderedJobs.length <= 1) return;

        const handleKeyDown = (event) => {
            const tagName = event.target?.tagName?.toLowerCase();
            if (tagName === 'input' || tagName === 'textarea' || event.target?.isContentEditable) {
                return;
            }

            if (event.key === 'ArrowLeft') {
                setActiveIndex((current) => Math.max(current - 1, 0));
            }

            if (event.key === 'ArrowRight') {
                setActiveIndex((current) => Math.min(current + 1, orderedJobs.length - 1));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [orderedJobs.length]);

    const showPrevious = () => {
        setActiveIndex((current) => Math.max(current - 1, 0));
    };

    const showNext = () => {
        setActiveIndex((current) => Math.min(current + 1, orderedJobs.length - 1));
    };

    return (
        <section className='latest-jobs-section'>
            <div className='latest-jobs-shell' tabIndex={0}>
                <div className='latest-jobs-head'>
                    <div>
                        <h1 className='latest-jobs-title'><span>CheckOut</span> Latest Openings</h1>
                        <p className='latest-jobs-subtitle'>
                            The spotlight shifts automatically every few seconds. Use the side arrows, your keyboard arrow keys, or click any card to bring it into focus.
                        </p>
                    </div>
                </div>

                <div className='latest-jobs-viewport'>
                    {activeIndex > 0 && (
                        <button type="button" className='latest-jobs-arrow latest-jobs-arrow-left' onClick={showPrevious} aria-label='Previous jobs'>
                            <ChevronLeft size={22} />
                        </button>
                    )}
                    {orderedJobs.length <= 0 ? (
                        <div className='latest-job-empty'>No Job Available</div>
                    ) : (
                        <div
                            className='latest-jobs-track'
                            style={{ '--active-index': activeIndex }}
                        >
                            {orderedJobs.map((job, index) => {
                                const distance = Math.abs(index - activeIndex);
                                return (
                                    <div
                                        key={job?._id || index}
                                        className='latest-job-slot'
                                        data-distance={Math.min(distance, 3)}
                                        data-active={index === activeIndex}
                                        role='button'
                                        tabIndex={0}
                                        onClick={() => setActiveIndex(index)}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter' || event.key === ' ') {
                                                event.preventDefault();
                                            setActiveIndex(index);
                                        }
                                        }}
                                    >
                                        <LatestJobCards job={job} isActive={index === activeIndex} />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {activeIndex < orderedJobs.length - 1 && (
                        <button type="button" className='latest-jobs-arrow latest-jobs-arrow-right' onClick={showNext} aria-label='Next jobs'>
                            <ChevronRight size={22} />
                        </button>
                    )}
                </div>
            </div>
        </section>
    )
}

export default LatestJobs
