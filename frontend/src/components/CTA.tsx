import { GridPattern } from "./magicui/grid-pattern";

export default function CTA() {
    return (
        <div
            className="h-[60vh] w-full bg-gradient-to-br from-primary/70 via-primary to-primary/40 flex items-center justify-center text-primary-foreground py-16 relative"
        >
            <GridPattern
                width={40}
                height={40}
                x={-1}
                y={-1}
                color="#7fe2b8"
                className=" w-full h-full opacity-40 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)] " />
            <div className="w-[90%] mx-auto flex flex-col items-center justify-center text-center z-20">
                <h2 className="text-3xl font-bold mb-4 font-inter">Ready to take your idea to the next level?</h2>
                <p className="text-lg mb-6 font-architects-daughter">Join us today and start validating your ideas with ease!</p>
                <a href="/validator" className="bg-secondary font-inter text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer shadow-[0px_0px_3px_2px_rgba(0,_0,_0,_0.1)] font-semibold ">
                    Get Started
                </a>
            </div>
        </div>
    );
}