/** ViewBox dimensions — used for aspect-ratio framing (full diagram visible, no crop). */
export const SCHEMATIC_VIEW = {
  bisevk: { w: 820, h: 248 },
  tavuk: { w: 480, h: 252 },
} as const;

export function schematicAspect(key: keyof typeof SCHEMATIC_VIEW) {
  const { w, h } = SCHEMATIC_VIEW[key];
  return w / h;
}
