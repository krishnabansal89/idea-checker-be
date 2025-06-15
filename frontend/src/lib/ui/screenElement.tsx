import Image from "next/image";
import { CircularProgressBar } from "./circularProgressBar";
export default function ScreenElement({
    url,
    Name,
    desc,
    score,
}: {
    url: string;
    Name: string;
    desc: string;
    score: number;
}) {
    return (
        <div
            className={`w-full h-full rounded-lg border-2 border-primary-foreground/5 bg-background flex flex-col `}
        >
            <div className="h-10 w-full border-0 border-b-2 border-primary-foreground/10 flex items-center justify-center px-2">
                <span className="text-primary-foreground/60  font-architects-daughter text-sm">{Name}</span>


            </div>

            <div className="w-full h-full lg:px-2 md:px-0.5 px-2 flex ">
                    <span className="w-[70%] text-secondary-foreground/60 font-architects-daughter h-full flex items-center text-xs">
                        {desc.slice(0, 50)}{desc.length > 50 ? '...' : ''}
                    </span>
                    <span className="w-[30%] text-secondary-foreground/60 font-architects-daughter text-sm text-right flex items-center justify-end h-full">
                        <CircularProgressBar value={score} color="#72e3ad"/>
                    </span>
            </div>
        </div>
    );
}