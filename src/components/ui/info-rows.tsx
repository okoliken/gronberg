import { Fragment, type ReactNode } from "react";

type Row = { label: ReactNode; value: ReactNode };

// Label/value table split by hairlines (Project "Details", Exhibition "Information")
export function InfoRows({ rows, labelClassName, gap = "gap-20 lg:gap-32" }: { rows: Row[]; labelClassName: string; gap?: string }) {
  return (
    <dl className={`flex flex-col ${gap}`}>
      {rows.map((row, i) => (
        <Fragment key={i}>
          {i > 0 && <div aria-hidden="true" className="h-px bg-line" />}
          <div className="flex items-center justify-between gap-32">
            <dt className={labelClassName}>{row.label}</dt>
            <dd className="text-right">{row.value}</dd>
          </div>
        </Fragment>
      ))}
    </dl>
  );
}

// Label column + content column, as in the About / Details / Experiences rows
export function LabelledRow({ label, labelWidth, children }: { label: string; labelWidth: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-24 lg:flex-row lg:gap-104">
      <h2 className={`shrink-0 text-h3 uppercase ${labelWidth}`}>{label}</h2>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
