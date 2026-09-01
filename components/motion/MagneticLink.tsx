"use client";

import {
  useEffect,
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { gsap } from "@/lib/motion/gsap";
import { useMotionConfig } from "@/lib/motion/useMotionConfig";

type MagneticLinkBaseProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

type MagneticButtonProps = MagneticLinkBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type MagneticAnchorProps = MagneticLinkBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type MagneticLinkProps = MagneticButtonProps | MagneticAnchorProps;

export function MagneticLink(props: MagneticLinkProps) {
  const { children, className, strength = 0.2, ...rest } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { magnetic } = useMotionConfig();
  const isAnchor = "href" in props && props.href !== undefined;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner || !magnetic) return;

    const wrapperEl = wrapper;
    const innerEl = inner;

    const xSet = gsap.quickSetter(innerEl, "x", "px");
    const ySet = gsap.quickSetter(innerEl, "y", "px");

    function handleMouseMove(event: MouseEvent) {
      const rect = wrapperEl.getBoundingClientRect();
      xSet((event.clientX - rect.left - rect.width / 2) * strength);
      ySet((event.clientY - rect.top - rect.height / 2) * strength);
    }

    function handleMouseLeave() {
      gsap.to(innerEl, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
    }

    wrapperEl.addEventListener("mousemove", handleMouseMove);
    wrapperEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapperEl.removeEventListener("mousemove", handleMouseMove);
      wrapperEl.removeEventListener("mouseleave", handleMouseLeave);
      gsap.set(innerEl, { x: 0, y: 0 });
    };
  }, [magnetic, strength]);

  const element = isAnchor ? (
    <a className={className} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} href={props.href}>
      {children}
    </a>
  ) : (
    <button
      type="button"
      className={className}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );

  if (!magnetic) return element;

  return (
    <div ref={wrapperRef} className="inline-flex">
      <div ref={innerRef} className="inline-flex will-change-transform">
        {element}
      </div>
    </div>
  );
}
