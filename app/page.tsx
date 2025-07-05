import HeroSection from "@/components/top-page/hero-section";
import FeaturesSection from "@/components/top-page/features-section";
import CallToActionSection from "@/components/top-page/cta-section";
import { createClient } from "@/lib/supabase/server";

export default async function TopPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  return (
    <div>
      <HeroSection isLoggedIn={isLoggedIn} />
      <FeaturesSection />
      <CallToActionSection isLoggedIn={isLoggedIn} />
    </div>
  );
}
