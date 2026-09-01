"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SchematicPathTravel, SchematicPulse } from "@/components/motion/SchematicPulse";
import {
  IconDelivery,
  IconOffers,
  IconPackage,
  IconTruck,
  IconWarehouse,
  TravelTruckGlyph,
} from "@/components/visuals/schematic/SchematicIcons";
import {
  SchematicCanvas,
  SchematicCaption,
  SchematicIconNode,
  SCHEMATIC,
  useSchematicMarkerUrls,
} from "@/components/visuals/schematic/SchematicPrimitives";
import { SchematicVisualFrame } from "@/components/visuals/schematic/SchematicVisualFrame";
import { schematicAspect, SCHEMATIC_VIEW } from "@/components/visuals/schematic/layout";
import { useSchematicPhase } from "@/lib/motion/useSchematicPhase";
import { cn } from "@/lib/utils/cn";

export type BisevkPhase =
  | "shipper"
  | "load"
  | "marketplace"
  | "carriers"
  | "offers"
  | "selected"
  | "transport"
  | "delivered"
  | "full";

const NODES = [
  {
    id: "shipper",
    label: "SHIPPER",
    step: "01",
    cx: 90,
    cy: 118,
    icon: IconWarehouse,
  },
  {
    id: "load",
    label: "LOAD POST",
    step: "02",
    cx: 230,
    cy: 118,
    icon: IconPackage,
  },
  {
    id: "offers",
    label: "OFFERS",
    step: "03",
    cx: 400,
    cy: 58,
    icon: IconOffers,
  },
  {
    id: "carrier",
    label: "CARRIER",
    step: "04",
    cx: 400,
    cy: 178,
    icon: IconTruck,
  },
  {
    id: "transport",
    label: "TRANSPORT",
    step: "05",
    cx: 570,
    cy: 118,
    icon: IconTruck,
  },
  {
    id: "delivery",
    label: "DELIVERY",
    step: "06",
    cx: 720,
    cy: 118,
    icon: IconDelivery,
  },
] as const;

const EDGES: Array<[string, string]> = [
  ["shipper", "load"],
  ["load", "offers"],
  ["load", "carrier"],
  ["offers", "transport"],
  ["carrier", "transport"],
  ["transport", "delivery"],
];

const PHASE_ACTIVE: Record<BisevkPhase, string[]> = {
  shipper: ["shipper"],
  load: ["shipper", "load"],
  marketplace: ["shipper", "load", "offers", "carrier"],
  carriers: ["shipper", "load", "offers", "carrier"],
  offers: ["shipper", "load", "offers", "carrier"],
  selected: ["shipper", "load", "carrier", "transport"],
  transport: ["shipper", "load", "carrier", "transport"],
  delivered: ["shipper", "load", "carrier", "transport", "delivery"],
  full: ["shipper", "load", "offers", "carrier", "transport", "delivery"],
};

const CYCLE_PHASES: BisevkPhase[] = [
  "shipper",
  "load",
  "marketplace",
  "offers",
  "selected",
  "transport",
  "delivered",
];

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

function connectorPath(from: string, to: string): string {
  const a = getNode(from);
  const b = getNode(to);
  const hw = SCHEMATIC.iconNode.w / 2;
  const hh = SCHEMATIC.iconNode.h / 2;

  if (Math.abs(a.cy - b.cy) < 24) {
    return `M ${a.cx + hw} ${a.cy} L ${b.cx - hw} ${b.cy}`;
  }

  const startX = a.cx;
  const startY = a.cy + (b.cy > a.cy ? hh : -hh);
  const endX = b.cx;
  const endY = b.cy + (b.cy > a.cy ? -hh : hh);
  const midY = (startY + endY) / 2;
  return `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
}

type BisevkSystemVisualProps = {
  phase?: BisevkPhase;
  className?: string;
  large?: boolean;
  animated?: boolean;
  fill?: boolean;
};

function BisevkEdges({
  active,
  shouldAnimate,
  showTransport,
}: {
  active: Set<string>;
  shouldAnimate: boolean;
  showTransport: boolean;
}) {
  const markers = useSchematicMarkerUrls();
  const transportPath = connectorPath("transport", "delivery");

  return (
    <>
      {EDGES.map(([from, to], index) => {
        const isActive = active.has(from) && active.has(to);
        const d = connectorPath(from, to);
        const a = getNode(from);
        const b = getNode(to);
        const isOfferFan = from === "load" && (to === "offers" || to === "carrier");

        return (
          <g key={`${from}-${to}`}>
            <motion.path
              d={d}
              fill="none"
              stroke={isActive ? "var(--accent)" : "var(--line-strong)"}
              strokeWidth={isActive ? 1.5 : 1}
              strokeOpacity={isActive ? 1 : 0.35}
              strokeDasharray={isOfferFan && !isActive ? "3 4" : undefined}
              markerEnd={isActive ? markers.arrow : markers.arrowMuted}
              animate={{ opacity: isActive ? 1 : 0.4 }}
              transition={{ duration: 0.35 }}
            />
            {shouldAnimate && isActive && !(from === "transport" && to === "delivery") && (
              <SchematicPulse
                x1={a.cx + 48}
                y1={a.cy}
                x2={b.cx - 48}
                y2={b.cy}
                delay={index * 0.25}
                duration={2.2}
                r={4}
              />
            )}
          </g>
        );
      })}

      {shouldAnimate && showTransport && active.has("transport") && active.has("delivery") && (
        <SchematicPathTravel path={transportPath} duration={2.8} delay={0.2}>
          <g transform="translate(-8, -8)">
            <TravelTruckGlyph active />
          </g>
        </SchematicPathTravel>
      )}
    </>
  );
}

export function BisevkSystemVisual({
  phase = "full",
  className,
  large = false,
  animated = true,
  fill = false,
}: BisevkSystemVisualProps) {
  const reducedMotion = useReducedMotion();
  const cyclePhase = useSchematicPhase(CYCLE_PHASES, 2200);
  const displayPhase = animated && !reducedMotion && phase === "full" ? cyclePhase : phase;
  const active = new Set(PHASE_ACTIVE[displayPhase]);
  const shouldAnimate = animated && !reducedMotion;
  const showTransport =
    displayPhase === "transport" ||
    displayPhase === "delivered" ||
    displayPhase === "full";
  const h = large ? 248 : SCHEMATIC_VIEW.bisevk.h;

  const diagram = (
    <SchematicCanvas
      viewBox={`0 0 820 ${h}`}
      className={cn(className)}
      ariaLabel="Bi-Sevk logistics flow diagram"
      fill={fill}
    >
      <SchematicCaption x={410} y={h - 8} label="MARKETPLACE FLOW · LOAD → MATCH → DELIVERY" />

      {/* Marketplace zone label */}
      <rect
        x={318}
        y={24}
        width={164}
        height={188}
        rx={6}
        fill="rgba(59, 130, 246, 0.03)"
        stroke="var(--line)"
        strokeWidth={1}
        strokeDasharray="4 6"
        opacity={active.has("offers") || active.has("carrier") ? 0.9 : 0.45}
      />
      <SchematicCaption x={400} y={38} label="MATCH ZONE" />

      <BisevkEdges
        active={active}
        shouldAnimate={shouldAnimate}
        showTransport={showTransport}
      />

      {NODES.map((node) => {
        const isActive = active.has(node.id);
        const Icon = node.icon;
        const pulseIcon =
          (node.id === "carrier" && (displayPhase === "carriers" || displayPhase === "offers")) ||
          (node.id === "transport" && displayPhase === "transport") ||
          (node.id === "load" && displayPhase === "load");

        return (
          <SchematicIconNode
            key={node.id}
            x={node.cx - SCHEMATIC.iconNode.w / 2}
            y={node.cy - SCHEMATIC.iconNode.h / 2}
            label={node.label}
            step={node.step}
            active={isActive}
            icon={<Icon size={20} active={isActive} pulse={pulseIcon && shouldAnimate} />}
          />
        );
      })}
    </SchematicCanvas>
  );

  if (fill) {
    return (
      <SchematicVisualFrame aspectRatio={schematicAspect("bisevk")}>{diagram}</SchematicVisualFrame>
    );
  }

  return diagram;
}
