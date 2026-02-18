"use client";

import ThemeToggle from "@/components/shared/ThemeToggle";
import SectionNav from "@/components/shared/SectionNav";
import ShareButton from "@/components/shared/ShareButton";
import CompletionCard from "@/components/shared/CompletionCard";
import UnpackFooter from "@/components/shared/UnpackFooter";

import HeroSection from "@/components/sections/HeroSection";
import BenchmarkSection from "@/components/sections/BenchmarkSection";
import PricingSection from "@/components/sections/PricingSection";
import ModelFamilySection from "@/components/sections/ModelFamilySection";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import ProductionSection from "@/components/sections/ProductionSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ImplicationsSection from "@/components/sections/ImplicationsSection";

export default function Seed2Explainer() {
  return (
    <>
      <ThemeToggle />
      <SectionNav />
      <ShareButton />

      <main>
        <HeroSection />
        <BenchmarkSection />
        <PricingSection />
        <ModelFamilySection />
        <CapabilitiesSection />
        <ProductionSection />
        <AchievementsSection />
        <ImplicationsSection />
      </main>

      <CompletionCard />
      <UnpackFooter />
    </>
  );
}
