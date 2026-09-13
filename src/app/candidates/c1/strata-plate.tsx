// The hero drawing: a Vivary workspace seen in cross-section. Four stippled
// strata stack inside a sealed vessel. Density falls and the stipple brightens
// as the strata rise, so the texture carries the reading, not a color accent.

type Stratum = {
  key: string;
  top: number;
  wave: number;
  gloss: string;
  center: number;
};

// Every band is painted from its own crest down to this floor. Bands paint top
// first, so each lower band covers the one above and the crest reads as a
// boundary. The top band has no crest: the glass is its boundary.
const FLOOR = 640;

const STRATA: Stratum[] = [
  { key: "exo", top: 40, wave: 0, gloss: "role contracts", center: 132 },
  { key: "ozone", top: 190, wave: 7, gloss: "review gates", center: 251 },
  { key: "strato", top: 312, wave: 8, gloss: "state surface", center: 376 },
  { key: "tropo", top: 440, wave: 9, gloss: "knowledge graph", center: 517 },
];

const JAR_OUTSIDE = "M48 152 C48 88 130 64 240 64 C350 64 432 88 432 152 V604 H48 Z";
const JAR_INSIDE = "M59 155 C59 98 136 75 240 75 C344 75 421 98 421 155 V595 H59 Z";

function crest(top: number, w: number): string {
  return `M26 ${top} C 130 ${top - w}, 230 ${top + w}, 330 ${top - w * 0.7} S 420 ${top + w * 0.6}, 456 ${top - w * 0.3}`;
}

function band(top: number, w: number): string {
  return `${crest(top, w)} L456 ${FLOOR} L26 ${FLOOR} Z`;
}

function Stipple({ prefix }: { prefix: string }) {
  return (
    <>
      <pattern id={`${prefix}-exo`} width="19" height="19" patternUnits="userSpaceOnUse">
        <rect width="19" height="19" fill="#041a15" />
        <rect width="2" height="2" fill="#b8f7d8" opacity="0.6" />
        <rect x="11" y="9" width="1" height="1" fill="#b8f7d8" opacity="0.34" />
        <rect x="5" y="14" width="1" height="1" fill="#b8f7d8" opacity="0.22" />
      </pattern>
      <pattern id={`${prefix}-ozone`} width="14" height="14" patternUnits="userSpaceOnUse">
        <rect width="14" height="14" fill="#071f19" />
        <rect width="2" height="2" fill="#7fecc6" opacity="0.55" />
        <rect x="8" y="7" width="2" height="2" fill="#7fecc6" opacity="0.32" />
        <rect x="4" y="11" width="1" height="1" fill="#b8f7d8" opacity="0.24" />
      </pattern>
      <pattern id={`${prefix}-strato`} width="11" height="11" patternUnits="userSpaceOnUse">
        <rect width="11" height="11" fill="#0a251f" />
        <rect width="2" height="2" fill="#49e1b1" opacity="0.5" />
        <rect x="6" y="5" width="2" height="2" fill="#5fe7bd" opacity="0.34" />
        <rect x="3" y="8" width="1" height="1" fill="#49e1b1" opacity="0.22" />
      </pattern>
      <pattern id={`${prefix}-tropo`} width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="#0d3028" />
        <rect width="2" height="2" fill="#49e1b1" opacity="0.55" />
        <rect x="4" y="4" width="2" height="2" fill="#49e1b1" opacity="0.38" />
        <rect x="4" y="1" width="1" height="1" fill="#49e1b1" opacity="0.22" />
        <rect x="1" y="5" width="1" height="1" fill="#49e1b1" opacity="0.22" />
      </pattern>
    </>
  );
}

/** The scale engraved down the inside of the left wall. */
function DepthScale() {
  const ticks: number[] = [];
  for (let y = 176; y <= 588; y += 22) ticks.push(y);
  return (
    <g stroke="#49e1b1" fill="none">
      <line x1="70" y1="170" x2="70" y2="590" strokeWidth="1" opacity="0.2" />
      {ticks.map((y) => (
        <line key={y} x1="70" y1={y} x2="78" y2={y} strokeWidth="1" opacity="0.26" />
      ))}
      {STRATA.slice(1).map((s) => (
        <line key={s.key} x1="64" y1={s.top} x2="90" y2={s.top} strokeWidth="1.4" opacity="0.6" />
      ))}
    </g>
  );
}

const ROOTS: [number, number][] = [
  [230, 460],
  [160, 518],
  [232, 534],
  [305, 514],
  [352, 560],
  [128, 566],
  [262, 570],
];

/** One small mark per stratum, drawn from what that layer actually holds. */
function Marks() {
  return (
    <g fill="none" stroke="#49e1b1" strokeLinecap="round">
      {/* exo: separate agents, each holding a claim against the others */}
      <g opacity="0.8">
        <path d="M198 124 L250 148 L302 120" strokeWidth="1" opacity="0.45" />
        <circle cx="198" cy="124" r="2.6" fill="#b8f7d8" stroke="none" />
        <circle cx="250" cy="148" r="2.6" fill="#b8f7d8" stroke="none" />
        <circle cx="302" cy="120" r="2.6" fill="#b8f7d8" stroke="none" />
        <circle cx="334" cy="150" r="2" fill="#b8f7d8" stroke="none" opacity="0.55" />
      </g>
      {/* ozone: a gate with an opening in it */}
      <g opacity="0.72" strokeWidth="1.4">
        <path d="M214 262 V216" />
        <path d="M286 262 V216" />
        <path d="M214 222 H242" />
        <path d="M258 222 H286" />
      </g>
      {/* strato: one visible surface, then a private boundary */}
      <g opacity="0.66">
        <rect x="118" y="360" width="58" height="16" rx="2" strokeWidth="1.2" fill="#0d3028" />
        <path d="M186 368 H250" strokeWidth="1.2" />
        <path d="M260 368 H378" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.7" />
      </g>
      {/* tropo: the graph of what depends on what, rooted in the ground */}
      <g opacity="0.75" strokeWidth="1.3">
        <path d="M230 460 L160 518 M230 460 L232 534 M230 460 L305 514" />
        <path d="M305 514 L352 560 M160 518 L128 566 M232 534 L262 570" />
        {ROOTS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#b8f7d8" stroke="none" opacity="0.85" />
        ))}
      </g>
    </g>
  );
}

export function StrataPlate() {
  return (
    <svg
      className="c1-plate"
      viewBox="0 0 620 662"
      role="img"
      aria-labelledby="c1-plate-title c1-plate-desc"
    >
      <title id="c1-plate-title">A Vivary workspace in cross-section</title>
      <desc id="c1-plate-desc">
        A sealed vessel drawn in section. Four stippled strata stack inside it and are
        labeled tropo, strato, ozone and exo from the ground up.
      </desc>
      <defs>
        <Stipple prefix="c1p" />
        <clipPath id="c1-jar">
          <path d={JAR_INSIDE} />
        </clipPath>
      </defs>

      <line x1="18" y1="638" x2="462" y2="638" stroke="#263e35" strokeWidth="1" />
      <rect
        x="30"
        y="604"
        width="420"
        height="22"
        rx="3"
        fill="#04111b"
        stroke="#49e1b1"
        strokeWidth="1.6"
        opacity="0.55"
      />
      <rect
        x="214"
        y="42"
        width="52"
        height="15"
        rx="7.5"
        fill="#04111b"
        stroke="#49e1b1"
        strokeWidth="1.6"
        opacity="0.55"
      />

      <g clipPath="url(#c1-jar)">
        {STRATA.map((s, i) => (
          <g key={s.key} className="c1-band" style={{ "--i": i } as React.CSSProperties}>
            <path d={band(s.top, s.wave)} fill={`url(#c1p-${s.key})`} />
            {s.wave > 0 && (
              <path
                d={crest(s.top, s.wave)}
                stroke="#49e1b1"
                strokeWidth="1.25"
                fill="none"
                opacity="0.42"
              />
            )}
          </g>
        ))}
        <DepthScale />
        <Marks />
      </g>

      <path d={JAR_OUTSIDE} fill="none" stroke="#49e1b1" strokeWidth="2" opacity="0.45" />
      <path d={JAR_INSIDE} fill="none" stroke="#455e55" strokeWidth="1" opacity="0.5" />
      <path
        d="M68 172 C68 114 132 90 188 86"
        fill="none"
        stroke="#b8f7d8"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.22"
      />

      <g className="c1-callouts">
        {STRATA.map((s) => (
          <g key={s.key}>
            <rect x="396" y={s.center - 2} width="4" height="4" fill="#49e1b1" opacity="0.8" />
            <line
              x1="400"
              y1={s.center}
              x2="454"
              y2={s.center}
              stroke="#49e1b1"
              strokeWidth="1"
              opacity="0.5"
            />
            <text x="462" y={s.center} fill="#f1f7f3" fontSize="24" fontWeight="600" dy="0.32em">
              {s.key}
            </text>
            <text x="462" y={s.center + 22} className="c1-gloss" fill="#738981" fontSize="13.5">
              {s.gloss}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/** The same stipple, cut down to a chip for the layer list. */
export function StrataSwatch({ layer }: { layer: string }) {
  const prefix = `c1s-${layer}`;
  return (
    <svg className="c1-swatch" viewBox="0 0 56 56" aria-hidden="true">
      <defs>
        <Stipple prefix={prefix} />
      </defs>
      <rect width="56" height="56" fill={`url(#${prefix}-${layer})`} />
    </svg>
  );
}
