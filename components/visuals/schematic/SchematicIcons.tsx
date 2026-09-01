"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type SchematicIconProps = {
  size?: number;
  active?: boolean;
  className?: string;
};

const STROKE = 1.5;

function iconColor(active?: boolean) {
  return active ? "var(--accent-light)" : "var(--foreground-muted)";
}

function IconWrapper({
  size = 20,
  active,
  children,
  pulse = false,
}: SchematicIconProps & { children: ReactNode; pulse?: boolean }) {
  const color = iconColor(active);
  const content = (
    <g
      stroke={color}
      fill="none"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </g>
  );

  if (pulse && active) {
    return (
      <motion.g
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "12px 12px" }}
      >
        <g transform={`scale(${size / 24})`}>{content}</g>
      </motion.g>
    );
  }

  return <g transform={`scale(${size / 24})`}>{content}</g>;
}

/** Warehouse / shipper */
export function IconWarehouse({ size = 20, active }: SchematicIconProps) {
  return (
    <IconWrapper size={size} active={active}>
      <path d="M4 10 L12 4 L20 10" />
      <rect x="6" y="10" width="12" height="10" rx="1" />
      <path d="M10 20 L10 14 M14 20 L14 14" />
    </IconWrapper>
  );
}

/** Cargo / load listing */
export function IconPackage({ size = 20, active, pulse }: SchematicIconProps & { pulse?: boolean }) {
  return (
    <IconWrapper size={size} active={active} pulse={pulse}>
      <path d="M12 3 L20 7 L12 11 L4 7 Z" />
      <path d="M4 7 L4 17 L12 21 L20 17 L20 7" />
      <path d="M12 11 L12 21" />
    </IconWrapper>
  );
}

/** Carrier / transport truck */
export function IconTruck({ size = 20, active, pulse }: SchematicIconProps & { pulse?: boolean }) {
  return (
    <IconWrapper size={size} active={active} pulse={pulse}>
      <rect x="2" y="8" width="11" height="8" rx="1" />
      <path d="M13 10 L18 10 L20 14 L20 16 L13 16 Z" />
      <circle cx="6" cy="18" r="2" fill={active ? "var(--accent)" : "var(--foreground-muted)"} stroke="none" />
      <circle cx="17" cy="18" r="2" fill={active ? "var(--accent)" : "var(--foreground-muted)"} stroke="none" />
      <path d="M2 16 L20 16" />
    </IconWrapper>
  );
}

/** Offers / bidding */
export function IconOffers({ size = 20, active }: SchematicIconProps) {
  return (
    <IconWrapper size={size} active={active}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8 L15 8 M9 12 L15 12 M9 16 L12 16" />
    </IconWrapper>
  );
}

/** Delivery destination */
export function IconDelivery({ size = 20, active }: SchematicIconProps) {
  return (
    <IconWrapper size={size} active={active}>
      <path d="M12 21 C12 21 5 14 5 9.5 C5 6.5 7.5 4 12 4 C16.5 4 19 6.5 19 9.5 C19 14 12 21 12 21 Z" />
      <circle cx="12" cy="9.5" r="2.5" fill={active ? "var(--accent)" : "none"} />
    </IconWrapper>
  );
}

/** Customer order */
export function IconOrder({ size = 20, active }: SchematicIconProps) {
  return (
    <IconWrapper size={size} active={active}>
      <path d="M7 7 L7 4 C7 3 8 2 9 2 L15 2 C16 2 17 3 17 4 L17 7" />
      <path d="M5 7 L19 7 L18 20 C18 21 17 22 16 22 L8 22 C7 22 6 21 6 20 Z" />
    </IconWrapper>
  );
}

/** Restaurant / kitchen */
export function IconRestaurant({ size = 20, active }: SchematicIconProps) {
  return (
    <IconWrapper size={size} active={active}>
      <path d="M6 3 L6 11 C6 12 7 13 8 13 C9 13 10 12 10 11 L10 3" />
      <path d="M8 13 L8 21" />
      <path d="M14 3 L14 21" />
      <path d="M14 9 C16 9 18 7 18 5" />
    </IconWrapper>
  );
}

/** Courier / delivery rider */
export function IconCourier({ size = 20, active, pulse }: SchematicIconProps & { pulse?: boolean }) {
  return (
    <IconWrapper size={size} active={active} pulse={pulse}>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.5 18 L15.5 18" />
      <path d="M12 8 L12 14 M9 11 L15 11" />
      <path d="M12 8 C12 5 14 3 17 3" />
    </IconWrapper>
  );
}

/** Mobile device */
export function IconPhone({ size = 20, active }: SchematicIconProps) {
  return (
    <IconWrapper size={size} active={active}>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M10 19 L14 19" strokeWidth={2} />
    </IconWrapper>
  );
}

/** QR scan beam */
export function IconScan({ size = 20, active }: SchematicIconProps) {
  return (
    <IconWrapper size={size} active={active}>
      <path d="M4 4 L4 8 L8 8 M16 4 L16 8 L12 8 M4 16 L4 12 L8 12 M16 16 L16 12 L12 12" />
      <path d="M7 12 L17 12" stroke={active ? "var(--accent)" : iconColor(active)} strokeDasharray="2 2" />
    </IconWrapper>
  );
}

/** Admin dashboard */
export function IconDashboard({ size = 20, active }: SchematicIconProps) {
  return (
    <IconWrapper size={size} active={active}>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="5" rx="1" />
      <rect x="13" y="10" width="8" height="11" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
    </IconWrapper>
  );
}

export function IconUsers({ size = 20, active }: SchematicIconProps) {
  return (
    <IconWrapper size={size} active={active}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20 C3 16 5.5 14 9 14 C12.5 14 15 16 15 20" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15 20 C15 17.5 16.5 16 18.5 16" />
    </IconWrapper>
  );
}

export function IconContent({ size = 20, active }: SchematicIconProps) {
  return (
    <IconWrapper size={size} active={active}>
      <path d="M6 4 L18 4 L18 20 L6 20 Z" />
      <path d="M9 9 L15 9 M9 13 L15 13 M9 17 L12 17" />
    </IconWrapper>
  );
}

export function IconModules({ size = 20, active }: SchematicIconProps) {
  return (
    <IconWrapper size={size} active={active}>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </IconWrapper>
  );
}

export function IconReports({ size = 20, active }: SchematicIconProps) {
  return (
    <IconWrapper size={size} active={active}>
      <path d="M4 20 L4 12 L9 12 L9 20" />
      <path d="M10 20 L10 8 L15 8 L15 20" />
      <path d="M16 20 L16 4 L21 4 L21 20" />
    </IconWrapper>
  );
}

/** Inline truck for path travel — faces right, 24×24 coords */
export function TravelTruckGlyph({ active = true }: { active?: boolean }) {
  const fill = active ? "var(--accent-light)" : "var(--foreground-muted)";
  return (
    <g fill={fill} stroke={fill} strokeWidth={1.2} strokeLinejoin="round">
      <rect x="1" y="6" width="10" height="7" rx="0.8" fill="none" />
      <path d="M11 7.5 L15 7.5 L16.5 11 L16.5 13 L11 13 Z" fill="none" />
      <circle cx="4.5" cy="14.5" r="1.8" />
      <circle cx="14" cy="14.5" r="1.8" />
    </g>
  );
}

/** Inline courier bike for path travel */
export function TravelCourierGlyph({ active = true }: { active?: boolean }) {
  const color = active ? "var(--accent-light)" : "var(--foreground-muted)";
  return (
    <g stroke={color} fill="none" strokeWidth={1.3} strokeLinecap="round">
      <circle cx="5" cy="14" r="2.5" />
      <circle cx="15" cy="14" r="2.5" />
      <path d="M7.5 14 L12.5 14 M10 8 L10 12" />
      <path d="M10 8 C10 6 11.5 4.5 14 4.5" />
    </g>
  );
}

/** Scan pulse beam for QR flow */
export function ScanBeam({
  x,
  y,
  height,
  active,
}: {
  x: number;
  y: number;
  height: number;
  active: boolean;
}) {
  if (!active) return null;
  return (
    <motion.line
      x1={x + 4}
      y1={y + 12}
      x2={x + 68}
      y2={y + 12}
      stroke="var(--accent)"
      strokeWidth={1.5}
      strokeOpacity={0.85}
      animate={{ y1: [y + 8, y + height - 8, y + 8], y2: [y + 8, y + height - 8, y + 8] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
