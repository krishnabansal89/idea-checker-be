import Header from "@/lib/ui/header";
import { LayoutDashboard , TrendingUpIcon , Hammer , History , Save , ApertureIcon} from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
const upComingFeatures = [
    {
        title: "Advanced Analytics Dashboard",
        description: "Gain deeper insights into your startup's performance with our new analytics dashboard, coming soon.",
        logo: LayoutDashboard,
    },
    {
        title: "AI-Powered Market Trends",
        description: "Stay ahead of the curve with AI-driven market trend analysis, set to launch next quarter.",
        logo: TrendingUpIcon,
    },
    {
        title: "SWOT Analysis Tool",
        description: "Identify strengths, weaknesses, opportunities, and threats for your startup with our upcoming SWOT analysis tool.",
        logo: Hammer,
    },
    {
        title: "How they started",
        description: "Learn from the success stories of top startups with our new 'How They Started' feature, launching next month.",
        logo: History,
    },
    {
        title: "IdeaBoard",
        description: "Organize and visualize your startup ideas with our upcoming IdeaBoard feature, designed for better brainstorming and planning.",
        logo: Save,
    },
    {
        title: "Deep Research Tools",
        description: "Access comprehensive research tools to validate your startup ideas, coming soon to enhance your decision-making process.",
        logo: ApertureIcon,
    }
];

export default function ComingSoon() {
    return (
        <div className=" relative flex flex-col items-center justify-center h-full pt-20 ">
            <GridPattern width={40} height={40} x={-1}
                y={-1}
                color="#7fe2b8"
                className=" w-full h-full opacity-40 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)] " />
                
            <Header className="mb-8">
                Roadmap
            </Header>
            <h2 className="text-4xl font-inter font-bold text-primary-foreground mb-6 text-center">
                What's Coming Next
            </h2>
            <span className="text-secondary-foreground text-center font-poppins mb-12 w-[80%]">
                Discover the exciting features and improvements we have planned for the future of our platform.
            </span>
            <div className="w-full">

                <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upComingFeatures.map((feature, index) => (

                        <div key={index} className="bg-secondary z-20 rounded-lg p-4 shadow-[0px_0px_3px_2px_rgba(0,_0,_0,_0.1)]">
                            <div className="flex items-center justify-center mb-4 w-12 h-12 bg-primary/30 rounded-full">
                                <feature.logo className="w-6 h-6 text-primary" />
                            </div>
                            <h2 className="text-lg font-bold font-inter  text-primary-foreground mb-4">{feature.title}</h2>
                            <p className="text-secondary-foreground/60 text-md font-poppins ">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}