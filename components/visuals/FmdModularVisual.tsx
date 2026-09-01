"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  IconContent,
  IconDashboard,
  IconModules,
  IconReports,
  IconUsers,
} from "@/components/visuals/schematic/SchematicIcons";
import {
  SchematicCanvas,
  SchematicCaption,
  SchematicPanel,
  SchematicSkeletonBars,
} from "@/components/visuals/schematic/SchematicPrimitives";
import { SchematicVisualFrame } from "@/components/visuals/schematic/SchematicVisualFrame";
import { schematicAspect } from "@/components/visuals/schematic/layout";
import { useSchematicPhase } from "@/lib/motion/useSchematicPhase";
import { cn } from "@/lib/utils/cn";

const MODULES = [
  { id: "overview", label: "OVERVIEW", step: "01", col: 1, row: 0, w: 2, h: 1, icon: IconDashboard },
  { id: "users", label: "USERS", step: "02", col: 3, row: 0, w: 1, h: 1, icon: IconUsers },
  { id: "content", label: "CONTENT", step: "03", col: 1, row: 1, w: 1, h: 2, icon: IconContent },
  { id: "modules", label: "MODULES", step: "04", col: 2, row: 1, w: 2, h: 1, icon: IconModules },
  { id: "reports", label: "REPORTS", step: "05", col: 2, row: 2, w: 2, h: 1, icon: IconReports },
] as const;

const MODULE_IDS = MODULES.map((m) => m.id);
const STEP_TO_MODULE = [0, 2, 4] as const;

const CELL_W = 86;
const CELL_H = 62;
const GAP = 8;
const ORIGIN_X = 148;
const ORIGIN_Y = 36;

type FmdModularVisualProps = {
  className?: string;
  animated?: boolean;
  activeStep?: number;
  fill?: boolean;
};

export function FmdModularVisual({
  className,
  animated = true,
  activeStep,
  fill = false,
}: FmdModularVisualProps) {
  const reducedMotion = useReducedMotion();
  const cycledId = useSchematicPhase(MODULE_IDS, 2400);
  const activeId =
    activeStep !== undefined
      ? MODULE_IDS[STEP_TO_MODULE[Math.min(activeStep, STEP_TO_MODULE.length - 1)]]
      : cycledId;
  const shouldAnimate = animated && !reducedMotion;

  const diagram = (
    <SchematicCanvas
      viewBox="0 0 520 260"
      className={cn("w-full", className)}
      ariaLabel="FMD modular panel structure"
      fill={fill}
    >
      <SchematicCaption x={260} y={248} label="ADMIN PANEL · MODULAR IA" />

      {/* Sidebar nav mock */}
      <SchematicPanel x={16} y={28} width={120} height={196} active={activeId === "overview"}>
        <SchematicSkeletonBars x={28} y={48} width={96} heights={[10, 10, 10, 10, 10]} activeIndex={0} />
        <g transform="translate(88, 200)">
          <IconDashboard size={16} active={activeId === "overview"} />
        </g>
      </SchematicPanel>

      {/* Connection hints between modules */}
      <path
        d="M 136 67 L 148 67 M 136 137 L 148 137 M 328 137 L 336 137"
        stroke="var(--line-strong)"
        strokeWidth={1}
        strokeDasharray="3 4"
        opacity={0.4}
      />

      {MODULES.map((mod) => {
        const x = ORIGIN_X + mod.col * (CELL_W + GAP);
        const y = ORIGIN_Y + mod.row * (CELL_H + GAP);
        const w = mod.w * CELL_W + (mod.w - 1) * GAP;
        const h = mod.h * CELL_H + (mod.h - 1) * GAP;
        const isActive = activeId === mod.id;
        const Icon = mod.icon;

        return (
          <g key={mod.id}>
            {isActive && shouldAnimate && (
              <motion.rect
                x={x - 3}
                y={y - 3}
                width={w + 6}
                height={h + 6}
                rx={6}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={1}
                strokeOpacity={0.4}
                animate={{ strokeOpacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx={4}
              fill={isActive ? "rgba(59, 130, 246, 0.1)" : "var(--ink-soft)"}
              stroke={isActive ? "var(--accent)" : "var(--line-strong)"}
              strokeWidth={isActive ? 1.5 : 1}
            />
            <text
              x={x + 12}
              y={y + 14}
              fill={isActive ? "var(--accent-light)" : "var(--foreground-muted)"}
              fontSize={8}
              fontFamily="var(--font-jetbrains)"
              letterSpacing="0.08em"
            >
              {mod.step}
            </text>
            <g transform={`translate(${x + w - 28}, ${y + 6})`}>
              <Icon size={16} active={isActive} />
            </g>
            <text
              x={x + 12}
              y={y + 28}
              fill={isActive ? "var(--foreground)" : "var(--foreground-muted)"}
              fontSize={9}
              fontFamily="var(--font-jetbrains)"
              letterSpacing="0.1em"
            >
              {mod.label}
            </text>
            <SchematicSkeletonBars
              x={x + 12}
              y={y + 36}
              width={w - 24}
              heights={mod.h > 1 ? [12, 10, 10, 14] : [10, 10]}
              activeIndex={isActive && shouldAnimate ? 0 : undefined}
            />
          </g>
        );
      })}
    </SchematicCanvas>
  );

  if (fill) {
    return (
      <SchematicVisualFrame aspectRatio={schematicAspect("fmd")}>{diagram}</SchematicVisualFrame>
    );
  }

  return diagram;
}
