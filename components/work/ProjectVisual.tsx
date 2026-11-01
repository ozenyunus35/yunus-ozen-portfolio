"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/data/base-path";
import { PROJECT_MEDIA } from "@/lib/data/project-media";

/**
 * The two system diagrams pull in Framer Motion. They load on their own chunk
 * once they come near the viewport, so no page waits on them at first paint.
 */
const BisevkSystemVisual = dynamic(
  () => import("@/components/visuals/BisevkSystemVisual").then((m) => m.BisevkSystemVisual),
  { ssr: false, loading: () => <DiagramPlaceholder /> },
);
const TavukPhysicalVisual = dynamic(
  () => import("@/components/visuals/TavukPhysicalVisual").then((m) => m.TavukPhysicalVisual),
  { ssr: false, loading: () => <DiagramPlaceholder /> },
);

function DiagramPlaceholder() {
  return <div className="diagram-placeholder flex-1" aria-hidden="true" />;
}

/**
 * Mounts its children once the box is within one screen of the viewport.
 * With `scroll`, phones get the diagram at a readable width and swipe across it.
 */
function WhenNear({ children, scroll = false }: { children: React.ReactNode; scroll?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!scroll) {
    return (
      <div ref={ref} className="flex flex-1 flex-col">
        {near ? children : <DiagramPlaceholder />}
      </div>
    );
  }

  return (
    <div ref={ref} className="diagram-scroll -mx-4 flex flex-1 flex-col overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
      <div className="flex min-w-[600px] flex-1 flex-col sm:min-w-0">{near ? children : <DiagramPlaceholder />}</div>
    </div>
  );
}

type ProjectVisualProps = {
  slug: string;
  alt: string;
  fill?: boolean;
  /** Diagrams loop only where they are the focus (project page, featured card). */
  animated?: boolean;
  priority?: boolean;
  sizes?: string;
  /** Let phones swipe across the diagram instead of shrinking its labels. */
  scrollOnSmall?: boolean;
};

/** Screenshot pair for demo projects, system diagram for the others. */
export function ProjectVisual({ slug, alt, fill = false, animated = true, priority, sizes, scrollOnSmall = false }: ProjectVisualProps) {
  switch (slug) {
    case "bisevk":
      return (
        <WhenNear scroll={scrollOnSmall}>
          <BisevkSystemVisual phase="full" animated={animated} fill={fill} />
        </WhenNear>
      );
    case "tavuk-da-tavuk":
      return (
        <WhenNear scroll={scrollOnSmall}>
          <TavukPhysicalVisual animated={animated} fill={fill} />
        </WhenNear>
      );
  }
  const media = PROJECT_MEDIA[slug];
  if (!media) return null;
  return (
    <div className="flex flex-1 items-center justify-center">
      <Image
        src={withBasePath(media.image)}
        alt={alt}
        width={1600}
        height={1032}
        sizes={sizes ?? "(min-width: 1024px) 58vw, 100vw"}
        priority={priority}
        className="h-auto w-full"
      />
    </div>
  );
}
