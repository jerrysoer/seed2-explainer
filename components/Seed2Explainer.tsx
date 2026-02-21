"use client";

import {
  ThemeToggle,
  SectionNav,
  ShareButton,
  CompletionCard,
  SectionDivider,
} from "@/components/base";
import UnpackFooter from "@/components/shared/UnpackFooter";

import HeroSection from "@/components/sections/HeroSection";
import BenchmarkSection from "@/components/sections/BenchmarkSection";
import PricingSection from "@/components/sections/PricingSection";
import ModelFamilySection from "@/components/sections/ModelFamilySection";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import ProductionSection from "@/components/sections/ProductionSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ImplicationsSection from "@/components/sections/ImplicationsSection";

const sections = [
  { id: "hero", label: "The Quiet Disruption" },
  { id: "benchmarks", label: "The Scoreboard" },
  { id: "pricing", label: "The Price Gap" },
  { id: "model-family", label: "Three Tiers" },
  { id: "capabilities", label: "Beyond Text" },
  { id: "production", label: "Battle-Tested" },
  { id: "achievements", label: "Gold Standard" },
  { id: "implications", label: "What This Means" },
];

export default function Seed2Explainer() {
  return (
    <>
      <ThemeToggle />
      <SectionNav sections={sections} />
      <ShareButton />

      <main>
        <HeroSection />
        <SectionDivider variant="numbered" number={1} />

        <BenchmarkSection />
        <SectionDivider variant="numbered" number={2} />

        <PricingSection />
        <SectionDivider variant="numbered" number={3} />

        <ModelFamilySection />
        <SectionDivider variant="numbered" number={4} />

        <CapabilitiesSection />
        <SectionDivider variant="numbered" number={5} />

        <ProductionSection />
        <SectionDivider variant="numbered" number={6} />

        <AchievementsSection />
        <SectionDivider variant="numbered" number={7} />

        <ImplicationsSection />
      </main>

      <CompletionCard variant="confetti" />
      <UnpackFooter />
    </>
  );
}
