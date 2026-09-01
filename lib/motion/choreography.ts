/** Choreographed loop timings — stagger components against these phases */

export const CHOREO = {
  nodeActivation: 0,
  lineDraw: 1,
  signalTravel: 2,
  secondaryNode: 3,
  labelUpdate: 4,
  pause: 5,
  relationshipShift: 7,
  fadeReset: 10,
  newCycle: 12,
} as const;

export const LOOP_DURATION_S = 14;

export const AMBIENT_DRIFT_S = 48;
export const GRID_DRIFT_S = 60;
