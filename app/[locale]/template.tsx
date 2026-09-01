"use client";

import { PageTransition } from "@/components/motion/PageTransition";

type TemplateProps = {
  children: React.ReactNode;
};

export default function Template({ children }: TemplateProps) {
  return <PageTransition>{children}</PageTransition>;
}
