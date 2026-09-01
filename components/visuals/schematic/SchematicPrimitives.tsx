"use client";

import { motion } from "framer-motion";
import { createContext, useContext, useId, type ReactNode } from "react";
import { SchematicGlowDefs } from "@/components/motion/SchematicPulse";
import { cn } from "@/lib/utils/cn";

type MarkersCtx = { arrow: string; arrowMuted: string };

const SchematicMarkersContext = createContext<MarkersCtx>({
  arrow: "url(#schematic-arrow)",
  arrowMuted: "url(#schematic-arrow-muted)",
});

function useSchematicMarkers() {
  return useContext(SchematicMarkersContext);
}

type SchematicCanvasProps = {
  viewBox: string;
  children: ReactNode;
  className?: string;
  showGrid?: boolean;
  showFrame?: boolean;
  ariaLabel?: string;
  /** Size SVG to fill its aspect-ratio frame (always preserves full diagram) */
  fill?: boolean;
};

export function SchematicCanvas({
  viewBox,
  children,
  className,
  showGrid = true,
  showFrame = true,
  ariaLabel,
  fill = false,
}: SchematicCanvasProps) {
  const uid = useId().replace(/:/g, "");
  const [, , width, height] = viewBox.split(" ").map(Number);
  const gridId = `schematic-dot-grid-${uid}`;
  const arrowId = `schematic-arrow-${uid}`;
  const arrowMutedId = `schematic-arrow-muted-${uid}`;

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className={cn("w-full", fill && "h-full", className)}
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    >
      <SchematicGlowDefs />
      <defs>
        <pattern id={gridId} width={24} height={24} patternUnits="userSpaceOnUse">
          <circle cx={0.5} cy={0.5} r={0.5} fill="var(--accent)" opacity={0.22} />
        </pattern>
        <marker id={arrowId} markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" opacity={0.85} />
        </marker>
        <marker id={arrowMutedId} markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--line-strong)" />
        </marker>
      </defs>

      {showGrid && <rect width={width} height={height} fill={`url(#${gridId})`} opacity={0.55} />}

      {showFrame && (
        <rect
          x={0.5}
          y={0.5}
          width={width - 1}
          height={height - 1}
          stroke="var(--line)"
          strokeWidth={1}
          rx={6}
        />
      )}

      <SchematicMarkersContext.Provider
        value={{ arrow: `url(#${arrowId})`, arrowMuted: `url(#${arrowMutedId})` }}
      >
        {children}
      </SchematicMarkersContext.Provider>
    </svg>
  );
}

export const SCHEMATIC = {
  node: { w: 108, h: 56, rx: 4, headerH: 18 },
  iconNode: { w: 108, h: 72, rx: 5, headerH: 20, iconY: 30 },
  font: { label: 8.5, step: 8, caption: 8 },
} as const;

type SchematicNodeProps = {
  x: number;
  y: number;
  label: string;
  step?: string;
  active?: boolean;
  width?: number;
  height?: number;
};

type SchematicIconNodeProps = SchematicNodeProps & {
  icon: ReactNode;
};

export function SchematicIconNode({
  x,
  y,
  label,
  step,
  active = false,
  icon,
  width = SCHEMATIC.iconNode.w,
  height = SCHEMATIC.iconNode.h,
}: SchematicIconNodeProps) {
  const { rx, headerH, iconY } = SCHEMATIC.iconNode;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {active && (
        <motion.rect
          width={width + 8}
          height={height + 8}
          x={-4}
          y={-4}
          rx={rx + 2}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1}
          strokeOpacity={0.35}
          animate={{ strokeOpacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <rect
        width={width}
        height={height}
        rx={rx}
        fill={active ? "rgba(59, 130, 246, 0.1)" : "var(--ink-soft)"}
        stroke={active ? "var(--accent)" : "var(--line-strong)"}
        strokeWidth={active ? 1.5 : 1}
      />
      <rect
        width={width}
        height={headerH}
        rx={rx}
        fill={active ? "rgba(59, 130, 246, 0.16)" : "rgba(255, 255, 255, 0.04)"}
      />
      <rect
        y={headerH - rx}
        width={width}
        height={rx}
        fill={active ? "rgba(59, 130, 246, 0.16)" : "rgba(255, 255, 255, 0.04)"}
      />
      {step && (
        <text
          x={10}
          y={13}
          fill={active ? "var(--accent-light)" : "var(--foreground-muted)"}
          fontSize={SCHEMATIC.font.step}
          fontFamily="var(--font-jetbrains)"
          letterSpacing="0.08em"
        >
          {step}
        </text>
      )}
      <g transform={`translate(${width / 2 - 10}, ${iconY - 10})`}>{icon}</g>
      <text
        x={width / 2}
        y={height - 10}
        textAnchor="middle"
        fill={active ? "var(--foreground)" : "var(--foreground-muted)"}
        fontSize={SCHEMATIC.font.label}
        fontFamily="var(--font-jetbrains)"
        letterSpacing="0.08em"
      >
        {label}
      </text>
    </g>
  );
}

export function SchematicNode({
  x,
  y,
  label,
  step,
  active = false,
  width = SCHEMATIC.node.w,
  height = SCHEMATIC.node.h,
}: SchematicNodeProps) {
  const { rx, headerH } = SCHEMATIC.node;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        width={width}
        height={height}
        rx={rx}
        fill={active ? "rgba(59, 130, 246, 0.1)" : "var(--ink-soft)"}
        stroke={active ? "var(--accent)" : "var(--line-strong)"}
        strokeWidth={active ? 1.5 : 1}
      />
      <rect
        width={width}
        height={headerH}
        rx={rx}
        fill={active ? "rgba(59, 130, 246, 0.16)" : "rgba(255, 255, 255, 0.04)"}
      />
      <rect
        y={headerH - rx}
        width={width}
        height={rx}
        fill={active ? "rgba(59, 130, 246, 0.16)" : "rgba(255, 255, 255, 0.04)"}
      />
      {step && (
        <text
          x={10}
          y={12}
          fill={active ? "var(--accent-light)" : "var(--foreground-muted)"}
          fontSize={SCHEMATIC.font.step}
          fontFamily="var(--font-jetbrains)"
          letterSpacing="0.08em"
        >
          {step}
        </text>
      )}
      <text
        x={width / 2}
        y={height / 2 + (step ? 6 : 2)}
        textAnchor="middle"
        fill={active ? "var(--foreground)" : "var(--foreground-muted)"}
        fontSize={SCHEMATIC.font.label}
        fontFamily="var(--font-jetbrains)"
        letterSpacing="0.1em"
      >
        {label}
      </text>
    </g>
  );
}

type SchematicEdgeProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active?: boolean;
};

export function SchematicEdge({ x1, y1, x2, y2, active = false }: SchematicEdgeProps) {
  const markers = useSchematicMarkers();
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={active ? "var(--accent)" : "var(--line-strong)"}
      strokeWidth={active ? 1.5 : 1}
      strokeOpacity={active ? 1 : 0.45}
      markerEnd={active ? markers.arrow : markers.arrowMuted}
    />
  );
}

type SchematicCaptionProps = {
  x: number;
  y: number;
  label: string;
  align?: "start" | "middle" | "end";
};

export function SchematicCaption({ x, y, label, align = "middle" }: SchematicCaptionProps) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={align}
      fill="var(--foreground-muted)"
      fontSize={SCHEMATIC.font.caption}
      fontFamily="var(--font-jetbrains)"
      letterSpacing="0.12em"
      opacity={0.75}
    >
      {label}
    </text>
  );
}

export function SchematicSkeletonBars({
  x,
  y,
  width,
  heights,
  activeIndex,
}: {
  x: number;
  y: number;
  width: number;
  heights: number[];
  activeIndex?: number;
}) {
  let offsetY = y;
  return (
    <g>
      {heights.map((h, i) => {
        const barY = offsetY;
        offsetY += h + 8;
        const active = activeIndex === i;
        return (
          <rect
            key={`${x}-${barY}`}
            x={x}
            y={barY}
            width={width - (i % 2 === 0 ? 0 : 14)}
            height={h}
            rx={2}
            fill={active ? "rgba(59, 130, 246, 0.14)" : "var(--line)"}
            stroke={active ? "var(--accent-border)" : "none"}
            strokeWidth={1}
          />
        );
      })}
    </g>
  );
}

export function SchematicPanel({
  x,
  y,
  width,
  height,
  title,
  active = false,
  children,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  title?: string;
  active?: boolean;
  children?: ReactNode;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={8}
        fill={active ? "rgba(59, 130, 246, 0.06)" : "var(--ink-soft)"}
        stroke={active ? "var(--accent)" : "var(--line-strong)"}
        strokeWidth={active ? 1.5 : 1}
      />
      <rect x={x + 12} y={y + 14} width={36} height={4} rx={2} fill="var(--accent)" opacity={active ? 0.7 : 0.25} />
      <circle cx={x + width - 18} cy={y + 16} r={3} fill="var(--line-strong)" />
      {children}
      {title && (
        <text
          x={x + width / 2}
          y={y + height + 18}
          textAnchor="middle"
          fill={active ? "var(--accent-light)" : "var(--foreground-muted)"}
          fontSize={SCHEMATIC.font.caption}
          fontFamily="var(--font-jetbrains)"
          letterSpacing="0.1em"
        >
          {title}
        </text>
      )}
    </g>
  );
}

export function useSchematicMarkerUrls() {
  return useSchematicMarkers();
}
