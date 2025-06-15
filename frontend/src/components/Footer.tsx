import { Github } from 'lucide-react';
import Image from 'next/image';
export default function Footer() {
    return (
        <footer className="bg-background border-t-2 w-full h-1/4 border-primary-foreground/10">
            {/* Green accent bar at top */}
            <div className="w-[90%] mx-auto py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Image
                                src={"/logo-removebg-preview.png"}
                                alt="Logo"
                                width={1000}
                                height={50}
                                className="w-80 h-10  object-cover"
                            />
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                            Turning your "what if" into "what's next." DoesMyIdeaExist is your go-to platform for discovering if your big idea already exists, with instant comparisons to over 10,000 startups.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center space-x-4 pt-2">
                            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Product Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                            Product
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Examples
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Roadmap
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Twitter
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-12 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        © 2025 DoesMyIdeaExist. All rights reserved.
                    </p>
                    <p className="text-sm text-gray-500 hover:text-gray-700 transition-colors mt-4 md:mt-0">
                        Built with ❤️ for founders.
                    </p>
                </div>
            </div>
        </footer>
    );
}