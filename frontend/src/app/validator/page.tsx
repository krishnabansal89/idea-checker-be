"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import StartupCard from "@/lib/ui/cards";
import { StartupCardProps } from "@/lib/ui/cards";
import { createEntry } from "@/app/actions/checker";
import LinearLoader from "@/lib/ui/progressBar";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";
export default function Page() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<StartupCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!input.trim()) {
      alert("Please enter a valid idea.");
      return;
    }
    const response = (await createEntry(input)) as {
      success: boolean;
      error?: string;
      uuid?: string;
    };
    if (response.error) {
      alert(response.error);
      return null;
    }
    setLoading(true);
    setError(null);
    const uuid = (response.uuid as string) || "";
    const matchResponse = await fetch(`${BACKEND_URL}/match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw_request: input, uuid: uuid }),
    });

    const matchData = await matchResponse.json();
    if (matchData.error) {
        setLoading(false);
        setError(matchData.error);
      alert(matchData.error);
      return null;
    }

    setLoading(false);
    setResults(matchData.matches || []);
  };
  return (
    <motion.div
      className="w-full h-full m-0 p-0 bg-background flex flex-col items-center justify-center pt-40"
      layoutId="mac-window"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <h1 className="text-3xl font-inter font-bold">
        Find Your <span className="text-primary">Competition</span>
      </h1>
      <div className="searchbar md:w-[60%] w-[90%] mt-8 rounded-3xl bg-secondary p-4 flex items-center border-2 border-primary-foreground/20 overflow-hidden  justify-between shadow-[0px_4px_10px_0px_rgba(0,_0,_0,_0.1)]">
        <textarea
          placeholder="Search for competitions..."
          style={{
            resize: "none",
            height: "100px",
            scrollbarColor: "transparent transparent",
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full  bg-transparent text-secondary-foreground/80 placeholder:text-secondary-foreground/60 focus:outline-none overflow-y-auto color-sc box-content"
        />
        <button
          className="bg-primary text-secondary-foreground px-4 py-2 rounded-3xl font-inter font-semibold hover:bg-primary/90 transition-colors"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
      <div className="mt-4 md:w-[60%] mx-auto w-[90%]">
<LinearLoader isLoading={loading} onComplete={() => setLoading(false)} />
</div>
      <p className="text-secondary-foreground/70 mt-4 font-poppins text-sm mx-auto w-[90%] text-center">
        Paste your idea and we will find the closest matches from our database
        of 500,000 startups.
      </p>


      {results && results.length > 0 ? (
        <div className="md:w-[80%] mt-8 w-[90%] grid-cols-1 grid md:grid-cols-3 gap-4">
          {results.map((startup) => (
            <StartupCard key={startup.startup_id} {...startup} />
          ))}
        </div>
      ):""}
      {error &&  (
        <p className="text-secondary-foreground/70 mt-8 font-poppins text-sm">
          No results found.
        </p>
      )}
    </motion.div>
  );
}
