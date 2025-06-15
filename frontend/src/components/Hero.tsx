"use client";
import React from 'react';
import Button from '@/lib/ui/button';
import Screen from '@/lib/ui/screen';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const features = ["Fast Seconds", "Compare with 500,000 Startups", "No Sign-Up Required"];

export default function Hero() {
    const router = useRouter();
    const handleClick = () => {
        setVisible(false);
        setTimeout(() => {
            router.push('/validator');
            setVisible(true);
        }, 600);

    };
    const [visible, setVisible] = useState(true);

    return (
        <div className="w-[90%] mx-auto md:h-screen h-fit bg-background grid grid-cols-1 md:grid-cols-[60%_40%] ">
            <div className='flex flex-col justify-center items-start py-10 '>
                <h1 className='xl:text-6xl lg:text-5xl sm:text-4xl text-3xl mt-20 md:mt-0 font-bold text-primary-foreground font-inter '>Does your big <span className='italic'>Idea </span> </h1>
                <p className='mt-4 xl:text-7xl lg:text-6xl sm:text-5xl  text-4xl text-primary-foreground font-inter'> <span className='text-primary  font-bold'> ALREADY </span> exist</p>
                <p className='mt-8 text-md text-secondary-foreground xl:w-[120%] md:w-[90%] font-poppins leading-relaxed'>
                    Paste the concept, hit Enter, and we&apos;ll compare it to 500,000 startups in seconds.
                </p>
                <div className='flex flex-col sm:flex-row'>
                    <Button className='mt-8 w-56' onClick={handleClick}>Check Idea</Button>
                    <Button className='mt-8 sm:ml-4 w-56'>How it works</Button>
                </div>
                <div className='mt-8 text-secondary-foreground font-inter flex  md:flex-col lg:flex-row gap-x-2 text-sm'>
                    {features.map((feature, index) => (
                        <div key={index} className='flex font-[poppins] leading-relaxed items-center gap-0.5'>
                            <span className='text-primary'><Check /></span>
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-row justify-center items-center py-10 relative'>
                <Image src="/arrow1.svg" alt="IdeaCheck" width={10} height={10} className="xl:w-32 lg:w-24 md:w-[30%] h-20 object-contain lg:-left-[30%]  md:-left-[40%] xl:-left-40 hidden md:block" style={{ position: "absolute", top: 200 }} />
                <AnimatePresence>
                    {visible && <motion.div
                        initial={{ opacity: 0.7, y: 100, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 ,y: 0}}
                        exit={{ opacity: 0.2, scale: 2, backgroundColor: "white" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        key="box"
                        className='z-50 '
                    >
                        <Screen className='' onClick={handleClick} />
                    </motion.div>
                    }
                </AnimatePresence>
            </div>

        </div>
    )
}