"use client";
import React from "react";

import { Search } from "lucide-react";
import ScreenElement from "./screenElement";
import { motion, AnimatePresence } from 'framer-motion';

export default function Screen({
    className = "",
    onClick = () => { },
}: {
    className?: string;
    onClick?: () => void;
}) {
    return (
        <AnimatePresence >
            <motion.div
                
                onClick={onClick}
                className={`w-full rounded-xl mx-auto md:h-1/2  flex flex-col shadow-[0px_0px_6px_2px_rgba(0,_0,_0,_0.1)]  ${className}`}
            >
                <div className="h-12 border-0 border-b-2 border-primary-foreground/10 w-full mb-4 flex items-center justify-start px-6 gap-x-2">
                    <span className="bg-[#fb2c36] w-4 h-4 rounded-full"></span>
                    <span className="bg-[#f0b100] w-4 h-4 rounded-full"></span>
                    <span className="bg-[#00b140] w-4 h-4 rounded-full"></span>
                </div>
                <div className="flex flex-col items-center h-full md:px-6 px-2">
                    <div className="w-full h-12 flex  rounded-lg mb-4">
                        <div className=" border-2 border-primary-foreground/10 h-full w-full flex gap-x-4 items-center lg:px-4 md:px-1 px-2 rounded-xl">
                            <Search className="w-6 h-6 text-primary-foreground/20" />
                            <span className="text-primary-foreground/60 xl:text-base text-xs">AI that summarises Zoom calls for doctors...</span>
                        </div>
                    </div>
                    <div className="w-full h-full grid grid-cols-2 gap-x-2 gap-y-2 mb-4 ">
                        <ScreenElement
                            url="https://example.com"
                            Name="Knowtex"
                            desc="Knowtex is a platform that uses AI to summarize Zoom calls for doctors, helping them save time and focus on patient care."
                            score={90}
                        />
                        <ScreenElement
                            url="https://example.com"
                            Name="Spinach AI"
                            desc="Spinach AI is a tool that helps users manage their tasks and projects more efficiently."
                            score={90}
                        />
                        <ScreenElement
                            url="https://example.com"
                            Name="Tetra"
                            desc="Tetra is a platform that uses AI to help teams collaborate more effectively."
                            score={80}
                        />
                        <ScreenElement
                            url="https://example.com"
                            Name="Demodesk"
                            desc="Demodesk is a virtual meeting platform that helps sales teams close deals faster."
                            score={65}
                        />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}