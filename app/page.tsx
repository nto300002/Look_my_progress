import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
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
