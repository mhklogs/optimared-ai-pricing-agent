/**
 * Optimared brand mark — bespoke geometric SVG glyph.
 *
 * Concept: a hanging price tag (rounded card with a cord) crossed by a
 * rising trend line with an up-notch arrowhead. Reads as "tag + margin up",
 * i.e. pricing intelligence that lifts margin. Stroke-based, rounded caps,
 * single accent color #D97706. No icon library, no emoji.
 */
export function OptimaredMark({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="32"
        cy="31"
        r="23.5"
        stroke="#D97706"
        strokeOpacity="0.3"
        strokeWidth="1.6"
        strokeDasharray="2.5 5"
        strokeLinecap="round"
      />
      <path d="M32 4v5" stroke="#D97706" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="32" cy="4" r="1.7" fill="#D97706" />
      <path
        d="M23 8h18a6 6 0 0 1 6 6v19a6 6 0 0 1-6 6H23a6 6 0 0 1-6-6V14a6 6 0 0 1 6-6z"
        stroke="#D97706"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M21 32l7-6 5 3 11-10"
        stroke="#D97706"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M44 19l-4.5-1.2M44 19l-1.2-4.5" stroke="#D97706" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="44" cy="19" r="2.1" fill="#D97706" />
    </svg>
  );
}

export default function OptimaredLogo({
  markSize = 40,
  tagline = true,
}: {
  markSize?: number;
  tagline?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="logo-tile flex h-10 w-10 shrink-0 items-center justify-center">
        <OptimaredMark size={markSize - 10} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-bold uppercase tracking-[0.08em] text-ink">
          Optimared
        </span>
        {tagline && (
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-amber">
            AI pricing agent
          </span>
        )}
      </span>
    </span>
  );
}