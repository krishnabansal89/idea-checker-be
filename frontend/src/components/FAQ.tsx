"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Header from '@/lib/ui/header';

const faqList = [
    {
        question: "How accurate are the similarity scores?",
        answer: "We ground every match in real company data—our RAG model cross-references pitch decks, taglines, and metadata to minimize false positives."
    },
    {
        question: "How many startups are in your index?",
        answer: "Right now we cover over 10 000 startups drawn from leading databases—and we add hundreds more every night."
    },
    {
        question: "Can I save and revisit my searches?",
        answer: "Absolutely. Just click \"Sign in with Google\" to save your ideas, track changes, and receive updates (Coming Soon)."
    },
    {
        question: "Will there be an API?",
        answer: "API access and bulk-validation endpoints are launching soon—keep an eye out for early-access invites."
    },
    {
        question: "What's the pricing?",
        answer: "DoesMyIdeaExist Tool is completely free to use. It's open source and available for personal and commercial projects without any licensing fees."
    }
];

export default function FAQ() {
    const [openItems, setOpenItems] = useState(new Set());

    const toggleItem = (index:number) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(index)) {
            newOpenItems.delete(index);
        } else {
            newOpenItems.add(index);
        }
        setOpenItems(newOpenItems);
    };

    return (
        <div className="w-full h-full bg-background">
            {/* Header Section */}
            <div className="w-[90%] mx-auto py-20 flex items-center justify-center flex-col">
                <Header className="mb-4">FAQ</Header>
                <h2 className="text-4xl font-inter font-bold text-primary-foreground mb-6 text-center">
                    Frequently Asked Questions
                </h2>
                <span className="text-secondary-foreground text-center font-poppins mb-12 w-[80%]">
                    Find answers to common questions about tweakcn.


                </span>

                {/* FAQ Items */}
                <div className="space-y-4 md:w-[80%] w-full mx-auto">
                    {faqList.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-sm text-secondary-foreground hover:text-primary"
                        >
                            <button
                                onClick={() => toggleItem(index)}
                                className="w-full px-6 py-5 text-left "
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold  pr-4">
                                        {faq.question}
                                    </h3>
                                    <ChevronDown
                                        className={`w-5 h-5  transition-transform duration-300 ease-in-out flex-shrink-0 ${openItems.has(index) ? 'transform rotate-180' : ''
                                            }`}
                                    />
                                </div>
                            </button>

                            {/* Animated Answer Section */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openItems.has(index)
                                        ? 'max-h-96 opacity-100'
                                        : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-6 pb-5">
                                    <div className="pt-2 border-t border-gray-100">
                                        <p className="text-primary-foreground/60 leading-relaxed font-poppins mt-3">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}