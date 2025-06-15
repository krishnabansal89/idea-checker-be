"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useEffect } from 'react';
import { createEntry } from '@/app/actions/checker';

export default function Page() {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([{
        name: "Example Startup 1",
        description: "This is a description of Example Startup 1.",
        link: "https://example.com/startup1"
    }, {
        name: "Example Startup 2",
        description: "This is a description of Example Startup 2.",
        link: "https://example.com/startup2"
    }]);

    const handleSubmit = async () => {
        if (!input.trim()) {
            alert("Please enter a valid idea.");
            return;
        }
        const response = (await createEntry(input)) as { success: boolean, error?: string, uuid?: string }; 
        if (response.error) {
            alert(response.error);
            return null;
        }
        const uuid = response.uuid as string || '';
        const matchResponse = await fetch(`${process.env.BACKEND_URL}/match`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ raw_request: input, request_id: uuid }),
            }
        );

        const matchData = await matchResponse.json();
        if (matchData.error) {
            alert(matchData.error);
            return null;
        }
        setResults(matchData.results || []);
        setInput(''); // Clear input after submission

    }
    return (
        <motion.div className='w-full h-full m-0 p-0 bg-background flex flex-col items-center justify-center pt-40'
            layoutId="mac-window"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1  }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}


        >
            <h1 className='text-3xl font-inter font-bold'>Find Your <span className='text-primary'>Competition</span></h1>
            <div className='searchbar md:w-[60%] w-[90%] mt-8 rounded-3xl bg-secondary p-4 flex items-center border-2 border-primary-foreground/20 overflow-hidden  justify-between shadow-[0px_4px_10px_0px_rgba(0,_0,_0,_0.1)]'>
                <textarea
                    placeholder="Search for competitions..."
                    style={{ resize: 'none', height: '100px', scrollbarColor: 'transparent transparent' }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className='w-full  bg-transparent text-secondary-foreground/80 placeholder:text-secondary-foreground/60 focus:outline-none overflow-y-auto color-sc box-content'
                />
                <button className='bg-primary text-secondary-foreground px-4 py-2 rounded-3xl font-inter font-semibold hover:bg-primary/90 transition-colors' onClick={handleSubmit}>
                    Search
                </button>
            </div>
            <p className='text-secondary-foreground/70 mt-4 font-poppins text-sm'>Paste your idea and we will find the closest matches from our database of 500,000 startups.</p>

            {results && results.length > 0 ? (
                <div className='mt-8 w-full max-w-3xl'>
                    <h2 className='text-2xl font-inter font-bold mb-4'>Results</h2>
                    <ul className='space-y-4'>
                        {results.map((result, index) => (
                            <li key={index} className='bg-secondary p-4 rounded-lg shadow-[0px_2px_6px_0px_rgba(0,_0,_0,_0.1)]'>
                                <h3 className='text-lg font-inter font-semibold text-primary-foreground'>{result.name}</h3>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className='text-secondary-foreground/70 mt-4 font-poppins text-sm'>No results found.</p>
            )}  

        </motion.div>
    );
}