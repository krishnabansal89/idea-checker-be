import Header from "@/lib/ui/header";
import { Brain, NotepadText, CloudLightning, Database, DollarSign, Rocket } from "lucide-react";

const featuresList = [
    {
        title: "Result Delivery Within Seconds",
        description: "Modern research shows that even a one-second delay can slash conversions and satisfaction",
        icon: CloudLightning,
    },
    {
        title: "NLP-Powered Scoring",
        description: "A Retrieval-Augmented Generation workflow compares your idea against our corpus and assigns a 0–100 % similarity score ",
        icon: Brain,
    },
    {
        title: "10,000+ Startups (and Counting)",
        description: "We aggregate data from leading startup databases and expand the index daily via an automated pipeline",
        icon: Database,
    },
    {
        title: "Why & Why Not” Explanations",
        description: "Transparent highlight chips show overlapping keywords and missing angles, tapping explainable-AI principles that build user trust",
        icon: NotepadText,
    },
    {
        title: "One-Tap Google Sign-In",
        description: "Embed Google One Tap to save ideas case studies show up to 2× higher signup conversion when frictionless auth is offered",
        icon: Rocket,
    },
    {
        title: "Complete Free - No Credit Card Required",
        description: "We believe in democratizing access to startup intelligence, so we offer our core features completely free of charge",
        icon: DollarSign,
    },
]

export default function Features() {
    return (
        <div className="w-full h-full">
            <div className="w-[90%] mx-auto pt-20 flex items-center justify-center flex-col">
                <Header className="mb-10 w-32">Features</Header>
                <h2 className="text-4xl font-inter font-bold text-primary-foreground mb-6 text-center">
                    Explore our key features
                </h2>
                <span className="text-secondary-foreground text-center font-poppins mb-12 w-[80%]">
                    Discover the powerful tools and functionalities that make our platform unique and effective.
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuresList.map((feature, index) => (

                        <div key={index} className="bg-secondary rounded-lg p-4 shadow-[0px_0px_3px_2px_rgba(0,_0,_0,_0.1)]">
                            <div className="flex items-center justify-center mb-4 w-12 h-12 bg-primary/30 rounded-full">
                                <feature.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h2 className="text-lg font-bold font-inter  text-primary-foreground mb-4">{feature.title}</h2>
                            <p className="text-secondary-foreground/60 text-md font-poppins leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}