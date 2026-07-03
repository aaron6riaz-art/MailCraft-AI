import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { EmailGenerator } from "@/components/email-form";
import { Features } from "@/components/features";
import { PricingPlaceholder } from "@/components/pricing-placeholder";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <EmailGenerator />
      <Features />
      <PricingPlaceholder />
      <Footer />
    </main>
  );
}
