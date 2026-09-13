"use client";

import { Area } from "@/components/dither-kit/area";
import { AreaChart } from "@/components/dither-kit/area-chart";
import type { ChartConfig } from "@/components/dither-kit/chart-context";

// Source: /home/workspace/Projects/vivary-integration/stats/history.csv,
// read 2026-09-13. Every row in the file, columns npm_weekly and pypi_weekly,
// dated 2026-06-21 through 2026-07-06.
const SIGNALS = [
  { day: "2026-06-21", npm: 259, pypi: 279 },
  { day: "2026-06-22", npm: 259, pypi: 452 },
  { day: "2026-06-23", npm: 446, pypi: 1479 },
  { day: "2026-06-24", npm: 555, pypi: 2350 },
  { day: "2026-06-25", npm: 562, pypi: 2368 },
  { day: "2026-06-26", npm: 562, pypi: 1479 },
  { day: "2026-06-27", npm: 562, pypi: 2426 },
  { day: "2026-06-28", npm: 1076, pypi: 3356 },
  { day: "2026-06-29", npm: 866, pypi: 2566 },
  { day: "2026-06-30", npm: 866, pypi: 2545 },
  { day: "2026-07-01", npm: 866, pypi: 1201 },
  { day: "2026-07-02", npm: 866, pypi: 1219 },
  { day: "2026-07-03", npm: 590, pypi: 1425 },
  { day: "2026-07-04", npm: 590, pypi: 1155 },
  { day: "2026-07-05", npm: 344, pypi: 1467 },
  { day: "2026-07-06", npm: 319, pypi: 1632 },
];

const CONFIG: ChartConfig = {
  pypi: { label: "PyPI", color: "blue" },
  npm: { label: "npm", color: "grey" },
};

export function SignalChart() {
  return (
    <div className="c3-chart">
      <AreaChart
        data={SIGNALS}
        config={CONFIG}
        interactive={false}
        margins={{ top: 6, right: 0, bottom: 0, left: 0 }}
      >
        <Area dataKey="pypi" variant="gradient" />
        <Area dataKey="npm" variant="dotted" />
      </AreaChart>
    </div>
  );
}
