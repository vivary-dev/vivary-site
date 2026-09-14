import type { ReactNode } from "react";

export type Row = { k: ReactNode; v: ReactNode };

export function Ledger({
  rows,
  plain,
  label,
}: {
  rows: Row[];
  plain?: boolean;
  label?: string;
}) {
  return (
    <dl className={`ledger ${plain ? "ledger-plain" : ""}`.trim()} aria-label={label}>
      {rows.map((r, i) => (
        <div key={i}>
          <dt>{r.k}</dt>
          <dd>{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}
