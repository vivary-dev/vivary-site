import { BAYER4 } from "@/components/dither-kit/pixel";

const INK = "#16271d";
const INK_SOFT = "#3d5145";
const AMBER = "#c87a16";
const PAPER = "#e4e7dc";

/** Cells of one 4x4 ordered-dither tile that are lit at this density. */
function tileCells(density: number) {
  const cells: { x: number; y: number }[] = [];
  for (let y = 0; y < 4; y += 1) {
    for (let x = 0; x < 4; x += 1) {
      if (BAYER4[y][x] < density) cells.push({ x, y });
    }
  }
  return cells;
}

function DitherTile({
  id,
  density,
  color,
  scale = 2,
}: {
  id: string;
  density: number;
  color: string;
  scale?: number;
}) {
  return (
    <pattern id={id} width={4 * scale} height={4 * scale} patternUnits="userSpaceOnUse">
      {tileCells(density).map((cell) => (
        <rect
          key={`${cell.x}-${cell.y}`}
          x={cell.x * scale}
          y={cell.y * scale}
          width={scale}
          height={scale}
          fill={color}
        />
      ))}
    </pattern>
  );
}

/** A short strip of the same dither, used as a section mark and a layer swatch. */
export function StratumMark({
  id,
  density,
  tone = "ink",
  width = 56,
  height = 10,
}: {
  id: string;
  density: number;
  tone?: "ink" | "amber";
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <defs>
        <DitherTile id={id} density={density} color={tone === "amber" ? AMBER : INK} />
      </defs>
      <rect width={width} height={height} fill={`url(#${id})`} />
    </svg>
  );
}

// The engine, drawn as strata: thinner and taller as it rises.
const BANDS = [
  { key: "exo", y: 34, h: 104, density: 0.16, color: AMBER, delay: 520 },
  { key: "ozone", y: 138, h: 92, density: 0.3, color: AMBER, delay: 390 },
  { key: "strato", y: 230, h: 84, density: 0.46, color: INK, delay: 260 },
  { key: "tropo", y: 314, h: 76, density: 0.68, color: INK, delay: 130 },
];

const FILE_X = [53, 101, 149, 197, 245];

/**
 * A workspace under glass: your files in the tray, the engine stacked above
 * them. Each band carries the same ordered dither the charts use.
 */
export function Vivarium() {
  return (
    <svg
      viewBox="0 0 460 520"
      role="img"
      aria-label="A workspace under glass. A tray of files sits at the bottom and the engine stands above it as stacked layers."
    >
      <defs>
        <clipPath id="c4-glass-clip">
          <rect x={22} y={28} width={288} height={462} rx={21} />
        </clipPath>
        {BANDS.map((band) => (
          <DitherTile
            key={band.key}
            id={`c4-tile-${band.key}`}
            density={band.density}
            color={band.color}
          />
        ))}
        <DitherTile id="c4-tile-substrate" density={0.9} color={INK} />
      </defs>

      <rect x={16} y={22} width={300} height={474} rx={26} fill="rgba(255,255,255,0.3)" />

      {BANDS.map((band) => (
        <g key={band.key} className="c4-band" style={{ transitionDelay: `${band.delay}ms` }}>
          <rect
            x={22}
            y={band.y}
            width={288}
            height={band.h}
            fill={`url(#c4-tile-${band.key})`}
            clipPath="url(#c4-glass-clip)"
          />
        </g>
      ))}

      <g className="c4-band" style={{ transitionDelay: "600ms" }}>
        <path
          d="M 320 34 L 328 34 L 328 390 L 320 390"
          fill="none"
          stroke={INK}
          strokeOpacity={0.4}
        />
        <text
          x={336}
          y={212}
          fill={INK_SOFT}
          fontSize={16}
          dominantBaseline="middle"
          style={{ fontFamily: "var(--c4-sans), system-ui, sans-serif" }}
        >
          the engine
        </text>
      </g>

      <g className="c4-band" style={{ transitionDelay: "0ms" }}>
        <g clipPath="url(#c4-glass-clip)">
          <rect x={22} y={390} width={288} height={100} fill="url(#c4-tile-substrate)" />
          {FILE_X.map((x) => (
            <g key={x}>
              <rect
                x={x}
                y={408}
                width={34}
                height={54}
                rx={2}
                fill={PAPER}
                stroke={INK}
                strokeOpacity={0.55}
              />
              <line x1={x + 7} y1={424} x2={x + 24} y2={424} stroke={INK} strokeOpacity={0.35} />
              <line x1={x + 7} y1={434} x2={x + 20} y2={434} stroke={INK} strokeOpacity={0.35} />
            </g>
          ))}
        </g>
        <line x1={316} y1={440} x2={330} y2={440} stroke={INK} strokeOpacity={0.4} />
        <text
          x={338}
          y={440}
          fill={INK_SOFT}
          fontSize={16}
          dominantBaseline="middle"
          style={{ fontFamily: "var(--c4-sans), system-ui, sans-serif" }}
        >
          your files
        </text>
      </g>

      <path
        d="M 62 28 L 118 28 L 58 490 L 26 490 Z"
        fill="#ffffff"
        fillOpacity={0.3}
        clipPath="url(#c4-glass-clip)"
      />
      <rect
        x={16}
        y={22}
        width={300}
        height={474}
        rx={26}
        fill="none"
        stroke={INK}
        strokeOpacity={0.45}
        strokeWidth={1.6}
      />
      <line x1={6} y1={498} x2={326} y2={498} stroke={INK} strokeOpacity={0.3} strokeWidth={1.5} />
    </svg>
  );
}
