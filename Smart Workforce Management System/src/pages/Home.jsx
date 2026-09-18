import AIInsightsSection from "../components/landing/AIInsightsSection";
import BenefitsSection from "../components/landing/BenefitsSection";
import DecisionEngineSection from "../components/landing/DecisionEngineSection";
import FAQSection from "../components/landing/FAQSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import Footer from "../components/landing/Footer";
import Hero from "../components/landing/Hero";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import IndustriesSection from "../components/landing/IndustriesSection";
import PredictiveAnalytics from "../components/landing/PredictiveAnalytics";
// import PricingSection from "../components/landing/PricingSection";
import ProblemSection from "../components/landing/ProblemSection";
import RealTimeAnalytics from "../components/landing/RealTimeAnalytics";
import SolutionSection from "../components/landing/SolutionSection";
import TechnologyStackSection from "../components/landing/TechnologyStackSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import TrustedBy from "../components/landing/TrustedBy";
import WorkforceHealthSection from "../components/landing/WorkforceHealthSection";
import WorkloadSection from "../components/landing/WorkloadSection";

function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <FeaturesSection />
      <ProblemSection />
      <SolutionSection />
      <AIInsightsSection />
      <WorkloadSection />
      <PredictiveAnalytics />
      <WorkforceHealthSection />
      <DecisionEngineSection />
      <RealTimeAnalytics />
      <IndustriesSection />
      <HowItWorksSection />
      <TechnologyStackSection />
      <BenefitsSection />
      <TestimonialsSection />
      {/* <PricingSection /> */}
      <FAQSection />
      <Footer />
    </>
  );
}

export default Home;