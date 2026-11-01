"use client";

import {
  useEffect,
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

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

/** Pulls the control slightly toward the cursor on devices with a real pointer. */
export function MagneticLink(props: MagneticLinkProps) {
  const { children, className, strength = 0.2, ...rest } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const isAnchor = "href" in props && props.href !== undefined;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;
    if (!matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    function handleMouseMove(event: MouseEvent) {
      const rect = wrapper!.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * strength;
      const y = (event.clientY - rect.top - rect.height / 2) * strength;
      inner!.style.transition = "transform 80ms linear";
      inner!.style.transform = `translate(${x}px, ${y}px)`;
    }

    function handleMouseLeave() {
      inner!.style.transition = "transform 400ms var(--ease-reveal)";
      inner!.style.transform = "";
    }

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  const element = isAnchor ? (
    <a className={className} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} href={props.href}>
      {children}
    </a>
  ) : (
    <button type="button" className={className} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );

  return (
    <div ref={wrapperRef} className="inline-flex">
      <div ref={innerRef} className="inline-flex">
        {element}
      </div>
    </div>
  );
}
