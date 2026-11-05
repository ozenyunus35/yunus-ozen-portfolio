import Image from "next/image";
import { withBasePath } from "@/lib/data/base-path";
import { cn } from "@/lib/utils/cn";

/** The profile photo used on GitHub and LinkedIn, as a round mark. */
export function Avatar({ size = 30, className, alt = "" }: { size?: number; className?: string; alt?: string }) {
  return (
    <Image
      src={withBasePath("/images/avatar.jpg")}
      alt={alt}
      width={size}
      height={size}
      className={cn("avatar", className)}
      style={{ width: size, height: size }}
    />
  );
}
