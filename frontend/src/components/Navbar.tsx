"use client";

import { useState } from "react";
import Button from "@/lib/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full h-16 bg-background flex items-center fixed font-inter top-0 z-50 border-b">
      <div className="w-[90%] mx-auto flex items-center justify-between">
        <Link href={"/"}>
          {" "}
          <Image
            src="/logo-removebg-preview.png"
            alt="IdeaCheck"
            width={200}
            height={100}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-x-8">
          <Link
            href="/"
            className="text-secondary-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/"
            className="text-secondary-foreground hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="/"
            className="text-secondary-foreground hover:text-primary transition-colors"
          >
            How it works
          </Link>
          <Link
            href="/"
            className="text-secondary-foreground hover:text-primary transition-colors"
          >
            Roadmap
          </Link>
          <Link
            href="/"
            className="text-secondary-foreground hover:text-primary transition-colors"
          >
            FAQ
          </Link>
        </div>

        {/* Desktop Button */}
        <div className="hidden md:block mt-2">
          <Button onClick={() => router.push("/validator")} className="w-44">Check Now</Button>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center focus:outline-none"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-secondary-foreground transition-all duration-300 ease-in-out ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-secondary-foreground transition-all duration-300 ease-in-out my-1 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-secondary-foreground transition-all duration-300 ease-in-out ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-background border-b transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <div className="flex flex-col w-[90%] mx-auto py-4 space-y-4">
          <Link
            href="#"
            className="text-secondary-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-secondary-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-secondary-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            How it works
          </Link>
          <Link
            href="#"
            className="text-secondary-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            Roadmap
          </Link>
          <Link
            href="#"
            className="text-secondary-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            FAQ
          </Link>
          <div className="pt-2">
            <Button
              className="w-full"
              onClick={() => {
                console.log("clicked");
                router.push("/validator");
                setIsOpen(false);
              }}
            >
              Check Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
