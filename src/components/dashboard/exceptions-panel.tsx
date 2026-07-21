import { AlertTriangle, Clock, FileWarning, ShieldAlert, UserX } from "lucide-react";
import { exceptions } from "@/lib/dashboard-data";
import { StatusBadge } from "./status-badge";

const kindIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  "Low confidence": FileWarning,
  "Missing field": AlertTriangle,
  Rejected: ShieldAlert,
  "Overdue approval": Clock,
  Escalation: UserX,
};

const sevTone: Record<string, "destructive" | "warning" | "muted"> = {
  high: "destructive",
  med: "warning",
  low: "muted",
};

export function ExceptionsPanel() {
  const counts = exceptions.reduce<Record<string, number>>((a, e) => ({ ...a, [e.kind]: (a[e.kind] || 0) + 1 }), {});
  return (
    <section className="glass-panel rounded-xl p-5">
      <header className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Exception Management</h3>
          <p className="mt-1 font-display text-2xl font-semibold text-foreground">
            {exceptions.length} <span className="text-sm font-normal text-muted-foreground">items require attention</span>
          </p>
        </div>
        <button className="rounded-md border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary">
          Open queue →
        </button>
      </header>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {Object.entries(counts).map(([k, v]) => (
          <div key={k} className="rounded-lg border border-border bg-surface/50 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</p>
            <p className="mt-1 font-mono text-lg font-semibold text-foreground">{v}</p>
          </div>
        ))}
      </div>

      <ul className="mt-5 divide-y divide-border">
        {exceptions.map((e) => {
          const Icon = kindIcon[e.kind] ?? AlertTriangle;
          return (
            <li key={e.id} className="flex items-center gap-3 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-elevated ring-1 ring-border">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-muted-foreground">{e.id}</span>
                  <StatusBadge tone={sevTone[e.severity]}>{e.severity}</StatusBadge>
                  <span className="text-[11px] text-muted-foreground">· {e.kind}</span>
                </div>
                <p className="mt-0.5 truncate text-sm text-foreground">{e.item}</p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-[11px] text-muted-foreground">Owner</p>
                <p className="text-xs font-medium text-foreground">{e.owner}</p>
              </div>
              <div className="ml-2 text-right">
                <p className="text-[11px] text-muted-foreground">Age</p>
                <p className="font-mono text-xs font-medium text-foreground">{e.age}</p>
              </div>
              <button className="ml-2 rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
                Resolve
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
