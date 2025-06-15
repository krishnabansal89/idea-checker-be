import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ComingSoon from "@/components/ComingSoon";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
export default function Home() {
  return (
<div className="w-full h-full m-0 p-0 bg-background">
  <Hero />
  <Features />
  <ComingSoon />
  <FAQ /> 
  <CTA />
  <Footer />
</div>
  );
}
