import Image from "next/image";
import { withBasePath } from "@/lib/data/base-path";
import { PROJECT_MEDIA } from "@/lib/data/project-media";

type ProjectVisualProps = {
  slug: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
};

/** MacBook + iPhone screenshot pair, the same frame for every project. */
export function ProjectVisual({ slug, alt, priority, sizes }: ProjectVisualProps) {
  const media = PROJECT_MEDIA[slug];
  if (!media) return null;
  return (
    <div className="flex flex-1 items-center justify-center">
      <Image
        src={withBasePath(media.image)}
        alt={alt}
        width={1600}
        height={1033}
        sizes={sizes ?? "(min-width: 1024px) 58vw, 100vw"}
        priority={priority}
        className="h-auto w-full"
      />
    </div>
  );
}
