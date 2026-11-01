import { HomeFeatured } from "@/components/home/HomeFeatured";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeOpenSource } from "@/components/home/HomeOpenSource";
import { HomeTechStack } from "@/components/home/HomeTechStack";
import { getOpenSourceStats } from "@/lib/data/open-source";

/** Home sections; shared by /en, /tr and the root page, which shows the English home without a redirect. */
export async function HomeContent() {
  const stats = await getOpenSourceStats();

  return (
    <>
      <HomeHero />
      <HomeFeatured />
      <HomeTechStack />
      <HomeOpenSource stats={stats} />
    </>
  );
}
