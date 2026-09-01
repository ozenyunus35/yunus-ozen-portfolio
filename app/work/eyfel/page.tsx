import { StaticRedirect } from "@/components/seo/StaticRedirect";
import { withBasePath } from "@/lib/data/base-path";

export default function LegacyWorkRedirect() {
  return <StaticRedirect target={withBasePath("/tr/work/eyfel-kurye/")} />;
}
