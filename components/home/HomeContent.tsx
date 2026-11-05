import { HomeCta } from "@/components/home/HomeCta";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeOpenSource } from "@/components/home/HomeOpenSource";
import { HomeProcess } from "@/components/home/HomeProcess";
import { HomeProductTour } from "@/components/home/HomeProductTour";
import { HomeProjects } from "@/components/home/HomeProjects";
import { HomeStats } from "@/components/home/HomeStats";
import { HomeTechMap } from "@/components/home/HomeTechMap";
import { OPEN_SOURCE_ALSO, getOpenSourceStats } from "@/lib/data/open-source";

/** Home sections; shared by /en, /tr and the root page, which shows the English home without a redirect. */
export async function HomeContent() {
  const stats = await getOpenSourceStats();
  const marquee = [...stats.repos.map((r) => r.name), ...OPEN_SOURCE_ALSO];

  return (
    <>
      <HomeHero marquee={marquee} stats={stats} />
      <HomeStats stats={stats} />
      <HomeProductTour />
      <HomeProcess />
      <HomeProjects />
      <HomeTechMap />
      <HomeOpenSource stats={stats} />
      <HomeFaq />
      <HomeCta />
    </>
  );
}
