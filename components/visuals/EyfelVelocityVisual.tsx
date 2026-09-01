"use client";

import { useReducedMotion } from "framer-motion";
import { SchematicPathTravel, SchematicPulse } from "@/components/motion/SchematicPulse";
import {
  IconCourier,
  IconDelivery,
  IconOrder,
  IconRestaurant,
  TravelCourierGlyph,
} from "@/components/visuals/schematic/SchematicIcons";
import {
  SchematicCanvas,
  SchematicCaption,
  SchematicEdge,
  SchematicIconNode,
  SCHEMATIC,
} from "@/components/visuals/schematic/SchematicPrimitives";
import { SchematicVisualFrame } from "@/components/visuals/schematic/SchematicVisualFrame";
import { schematicAspect } from "@/components/visuals/schematic/layout";
import { cn } from "@/lib/utils/cn";

type EyfelVelocityVisualProps = {
  className?: string;
  animated?: boolean;
  activeStep?: number;
  fill?: boolean;
};

const STEPS = [
  { label: "ORDER", step: "01", icon: IconOrder },
  { label: "RESTAURANT", step: "02", icon: IconRestaurant },
  { label: "COURIER", step: "03", icon: IconCourier },
  { label: "DELIVERY", step: "04", icon: IconDelivery },
] as const;

const POSITIONS = [100, 280, 460, 640];
const ROUTE_PATH = "M 60 178 Q 200 158 370 148 Q 540 138 680 178";

export function EyfelVelocityVisual({
  className,
  animated = true,
  activeStep,
  fill = false,
}: EyfelVelocityVisualProps) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = animated && !reducedMotion;
  const stepIndex =
    activeStep !== undefined ? Math.min(activeStep, STEPS.length - 1) : undefined;
  const showCourierTravel =
    shouldAnimate &&
    (stepIndex === undefined || stepIndex >= 2);

  const diagram = (
    <SchematicCanvas
      viewBox="0 0 740 220"
      className={cn(className)}
      ariaLabel="Eyfel Kurye dispatch route diagram"
      fill={fill}
    >
      <SchematicCaption x={370} y={208} label="DISPATCH PIPELINE · ORDER → DELIVERY" />

      {/* Route track beneath nodes */}
      <path
        d={ROUTE_PATH}
        stroke="var(--line-strong)"
        strokeWidth={1.5}
        strokeDasharray="5 7"
        opacity={0.45}
        fill="none"
      />
      <SchematicCaption x={370} y={196} label="LIVE ROUTE" />

      {showCourierTravel && (
        <SchematicPathTravel path={ROUTE_PATH} duration={4} delay={0.5}>
          <g transform="translate(-8, -8)">
            <TravelCourierGlyph active />
          </g>
        </SchematicPathTravel>
      )}

      {STEPS.map((item, i) => {
        const cx = POSITIONS[i];
        const isLit = stepIndex !== undefined ? i <= stepIndex : true;
        const isActive = stepIndex !== undefined ? i === stepIndex : false;
        const hw = SCHEMATIC.iconNode.w / 2;
        const Icon = item.icon;

        return (
          <g key={item.label}>
            {i > 0 && (
              <>
                <SchematicEdge
                  x1={POSITIONS[i - 1] + hw}
                  y1={98}
                  x2={cx - hw}
                  y2={98}
                  active={isLit}
                />
                {shouldAnimate && activeStep === undefined && (
                  <SchematicPulse
                    x1={POSITIONS[i - 1] + hw}
                    y1={98}
                    x2={cx - hw}
                    y2={98}
                    delay={0.4 + i * 0.65}
                    duration={2}
                    r={4}
                  />
                )}
              </>
            )}
            <SchematicIconNode
              x={cx - hw}
              y={62}
              label={item.label}
              step={item.step}
              active={isActive || (stepIndex === undefined && isLit)}
              icon={
                <Icon
                  size={20}
                  active={isActive || (stepIndex === undefined && isLit)}
                  pulse={isActive && item.label === "COURIER" && shouldAnimate}
                />
              }
            />
          </g>
        );
      })}
    </SchematicCanvas>
  );

  if (fill) {
    return (
      <SchematicVisualFrame aspectRatio={schematicAspect("eyfel")}>{diagram}</SchematicVisualFrame>
    );
  }

  return diagram;
}
