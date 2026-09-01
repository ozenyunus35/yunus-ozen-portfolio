"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SchematicPulse } from "@/components/motion/SchematicPulse";
import { IconPhone, IconRestaurant, ScanBeam } from "@/components/visuals/schematic/SchematicIcons";
import {
  SchematicCanvas,
  SchematicCaption,
  SchematicEdge,
  SchematicPanel,
  SchematicSkeletonBars,
} from "@/components/visuals/schematic/SchematicPrimitives";
import { SchematicVisualFrame } from "@/components/visuals/schematic/SchematicVisualFrame";
import { schematicAspect, SCHEMATIC_VIEW } from "@/components/visuals/schematic/layout";
import { cn } from "@/lib/utils/cn";

type TavukPhysicalVisualProps = {
  className?: string;
  animated?: boolean;
  activeStep?: number;
  fill?: boolean;
};

function QrPattern({ x, y, active, scanning }: { x: number; y: number; active: boolean; scanning: boolean }) {
  const cells = [
    [0, 0],
    [1, 0],
    [2, 0],
    [0, 1],
    [2, 1],
    [0, 2],
    [1, 2],
    [2, 2],
  ];

  return (
    <g>
      {active && (
        <motion.rect
          x={x - 4}
          y={y - 4}
          width={80}
          height={80}
          rx={6}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1}
          strokeOpacity={0.35}
          animate={{ strokeOpacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <rect
        x={x}
        y={y}
        width={72}
        height={72}
        rx={4}
        fill={active ? "rgba(59, 130, 246, 0.1)" : "var(--ink-soft)"}
        stroke={active ? "var(--accent)" : "var(--line-strong)"}
        strokeWidth={active ? 1.5 : 1}
      />
      {cells.map(([col, row]) => (
        <motion.rect
          key={`${col}-${row}`}
          x={x + 12 + col * 18}
          y={y + 12 + row * 18}
          width={14}
          height={14}
          rx={1}
          fill={active ? "var(--accent-light)" : "var(--foreground-muted)"}
          animate={scanning ? { opacity: [0.45, 1, 0.45] } : { opacity: active ? 0.9 : 0.55 }}
          transition={
            scanning
              ? { duration: 1.6, repeat: Infinity, delay: (col + row) * 0.08 }
              : { duration: 0.3 }
          }
        />
      ))}
      <ScanBeam x={x} y={y} height={72} active={scanning} />
      <text
        x={x + 36}
        y={y + 92}
        textAnchor="middle"
        fill={active ? "var(--accent-light)" : "var(--foreground-muted)"}
        fontSize={8}
        fontFamily="var(--font-jetbrains)"
        letterSpacing="0.1em"
      >
        QR CODE
      </text>
    </g>
  );
}

export function TavukPhysicalVisual({
  className,
  animated = true,
  activeStep,
  fill = false,
}: TavukPhysicalVisualProps) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = animated && !reducedMotion;
  const focus = activeStep ?? (shouldAnimate ? undefined : 0);
  const qrActive = focus === 0 || focus === undefined;
  const flowActive = focus === 1 || focus === undefined;
  const menuActive = focus !== undefined && focus >= 2;
  const scanning = shouldAnimate && (focus === 0 || focus === 1 || focus === undefined);
  const { w, h } = SCHEMATIC_VIEW.tavuk;

  const diagram = (
    <SchematicCanvas
      viewBox={`0 0 ${w} ${h}`}
      className={cn("w-full", className)}
      ariaLabel="Tavuk da Tavuk QR to menu flow"
      fill={fill}
    >
      <SchematicCaption x={w / 2} y={h - 6} label="ON-SITE FLOW · SCAN → MOBILE MENU" />

      <QrPattern x={48} y={44} active={qrActive} scanning={scanning} />

      <SchematicEdge x1={128} y1={80} x2={188} y2={80} active={flowActive} />
      {shouldAnimate && flowActive && (
        <SchematicPulse x1={128} y1={80} x2={188} y2={80} duration={1.6} delay={0.2} r={4} />
      )}

      <text
        x={158}
        y={100}
        textAnchor="middle"
        fill={flowActive ? "var(--accent-light)" : "var(--foreground-muted)"}
        fontSize={8}
        fontFamily="var(--font-jetbrains)"
        letterSpacing="0.1em"
      >
        SCAN
      </text>

      <SchematicPanel x={200} y={28} width={128} height={168} active={menuActive}>
        <text
          x={264}
          y={218}
          textAnchor="middle"
          fill={menuActive ? "var(--accent-light)" : "var(--foreground-muted)"}
          fontSize={8}
          fontFamily="var(--font-jetbrains)"
          letterSpacing="0.1em"
        >
          MOBILE MENU
        </text>
        <g transform="translate(248, 44)">
          <IconPhone size={18} active={menuActive} />
        </g>
        <SchematicSkeletonBars
          x={216}
          y={60}
          width={96}
          heights={[18, 12, 12, 16, 12]}
          activeIndex={menuActive ? 0 : undefined}
        />
        {menuActive && (
          <g transform="translate(228, 140)">
            <IconRestaurant size={16} active />
          </g>
        )}
      </SchematicPanel>

      <rect
        x={360}
        y={44}
        width={96}
        height={72}
        rx={4}
        fill="var(--ink-soft)"
        stroke="var(--line-strong)"
        strokeWidth={1}
      />
      <SchematicSkeletonBars x={372} y={58} width={72} heights={[10, 8, 8]} />
      <SchematicCaption x={408} y={132} label="CORPORATE WEB" />

      <path
        d="M 120 122 Q 240 142 320 122"
        stroke="var(--line)"
        strokeWidth={1}
        strokeDasharray="4 5"
        fill="none"
        opacity={0.35}
      />
      <SchematicCaption x={240} y={156} label="PHYSICAL TOUCHPOINT" align="middle" />
    </SchematicCanvas>
  );

  if (fill) {
    return (
      <SchematicVisualFrame aspectRatio={schematicAspect("tavuk")}>{diagram}</SchematicVisualFrame>
    );
  }

  return diagram;
}
