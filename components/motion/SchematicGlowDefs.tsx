/** Soft glow filter shared by the hero network and the system diagrams. */
export function SchematicGlowDefs() {
  return (
    <defs>
      <filter id="schematic-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}
