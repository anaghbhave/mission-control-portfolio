import { miprQueue, hrRequests, contracts } from "@/lib/dashboard-data";
import { StatusBadge } from "./status-badge";

function confidenceTone(c: number) {
  if (c >= 90) return "success" as const;
  if (c >= 80) return "info" as const;
  if (c >= 70) return "warning" as const;
  return "destructive" as const;
}

function slaTone(sla: string) {
  if (sla === "Overdue") return "destructive" as const;
  if (sla === "At risk") return "warning" as const;
  if (sla === "Review") return "warning" as const;
  return "success" as const;
}

export function DocumentLedPanel() {
  return (
    <div className="glass-panel overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <h3 className="font-display text-base font-semibold text-foreground">MIPR Queue · Document-Led</h3>
          <p className="text-xs text-muted-foreground">Intake → IDP extraction → validation → approval routing → ERP handoff</p>
        </div>
        <div className="flex gap-2 text-[11px] text-muted-foreground">
          <span className="rounded-md bg-surface-elevated px-2 py-1">Confidence avg <span className="font-mono text-foreground">87.6%</span></span>
          <span className="rounded-md bg-surface-elevated px-2 py-1">Handoff success <span className="font-mono text-foreground">99.1%</span></span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-2.5">MIPR</th>
              <th className="px-3 py-2.5">Program</th>
              <th className="px-3 py-2.5">Value</th>
              <th className="px-3 py-2.5">Stage</th>
              <th className="px-3 py-2.5">Confidence</th>
              <th className="px-5 py-2.5 text-right">SLA</th>
            </tr>
          </thead>
          <tbody>
            {miprQueue.map((r) => (
              <tr key={r.id} className="border-b border-border/50 transition-colors hover:bg-surface-elevated/50">
                <td className="px-5 py-3 font-mono text-xs text-primary">{r.id}</td>
                <td className="px-3 py-3 text-foreground">{r.program}</td>
                <td className="px-3 py-3 font-mono text-xs text-foreground">{r.value}</td>
                <td className="px-3 py-3"><StatusBadge tone="info">{r.stage}</StatusBadge></td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-elevated">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${r.confidence}%`,
                          background:
                            r.confidence >= 90
                              ? "var(--success)"
                              : r.confidence >= 80
                              ? "var(--info)"
                              : r.confidence >= 70
                              ? "var(--warning)"
                              : "var(--destructive)",
                        }}
                      />
                    </div>
                    <span className={`font-mono text-xs text-${confidenceTone(r.confidence) === "success" ? "success" : confidenceTone(r.confidence) === "warning" ? "warning" : confidenceTone(r.confidence) === "destructive" ? "destructive" : "info"}`}>{r.confidence}%</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-right"><StatusBadge tone={slaTone(r.sla)}>{r.sla}</StatusBadge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AiLedPanel() {
  return (
    <div className="glass-panel overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <h3 className="font-display text-base font-semibold text-foreground">HR Service Requests · AI-Led</h3>
          <p className="text-xs text-muted-foreground">Request type → agent recommendation → supervisor response → SLA</p>
        </div>
        <div className="flex gap-2 text-[11px] text-muted-foreground">
          <span className="rounded-md bg-surface-elevated px-2 py-1">Auto-approve rate <span className="font-mono text-foreground">64%</span></span>
          <span className="rounded-md bg-surface-elevated px-2 py-1">SLA met <span className="font-mono text-foreground">92%</span></span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-2.5">Ticket</th>
              <th className="px-3 py-2.5">Request type</th>
              <th className="px-3 py-2.5">Requester</th>
              <th className="px-3 py-2.5">Agent recommendation</th>
              <th className="px-5 py-2.5 text-right">SLA</th>
            </tr>
          </thead>
          <tbody>
            {hrRequests.map((r) => (
              <tr key={r.id} className="border-b border-border/50 transition-colors hover:bg-surface-elevated/50">
                <td className="px-5 py-3 font-mono text-xs text-primary">{r.id}</td>
                <td className="px-3 py-3 text-foreground">{r.type}</td>
                <td className="px-3 py-3 text-muted-foreground">{r.requester}</td>
                <td className="px-3 py-3">
                  <StatusBadge tone={r.status === "recommended" ? "success" : r.status === "routed" ? "info" : "destructive"}>
                    {r.recommendation}
                  </StatusBadge>
                </td>
                <td className="px-5 py-3 text-right">
                  <StatusBadge tone={r.sla === "Overdue" ? "destructive" : r.sla.includes("1h") ? "warning" : "success"}>{r.sla}</StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AgentLedPanel() {
  return (
    <div className="glass-panel overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <h3 className="font-display text-base font-semibold text-foreground">Contract Portfolio · Agent-Led</h3>
          <p className="text-xs text-muted-foreground">Flagged contracts → fund status → justifications → recommended action → audit</p>
        </div>
        <div className="flex gap-2 text-[11px] text-muted-foreground">
          <span className="rounded-md bg-surface-elevated px-2 py-1">Funds recovered <span className="font-mono text-foreground">$4.8M</span></span>
          <span className="rounded-md bg-surface-elevated px-2 py-1">Audit ready <span className="font-mono text-foreground">100%</span></span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-2.5">Contract</th>
              <th className="px-3 py-2.5">Vendor</th>
              <th className="px-3 py-2.5">Flag</th>
              <th className="px-3 py-2.5">Fund</th>
              <th className="px-3 py-2.5">Recommended action</th>
              <th className="px-5 py-2.5 text-right">Audit trail</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c) => (
              <tr key={c.id} className="border-b border-border/50 transition-colors hover:bg-surface-elevated/50">
                <td className="px-5 py-3 font-mono text-xs text-primary">{c.id}</td>
                <td className="px-3 py-3 text-foreground">{c.vendor}</td>
                <td className="px-3 py-3">
                  <StatusBadge tone={c.flag.includes("healthy") ? "success" : c.flag.includes("Overrun") || c.flag.includes("Under") ? "warning" : c.flag.includes("missing") ? "destructive" : "warning"}>
                    {c.flag}
                  </StatusBadge>
                </td>
                <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{c.fund}</td>
                <td className="px-3 py-3 text-foreground">{c.action}</td>
                <td className="px-5 py-3 text-right">
                  <StatusBadge tone={c.audit === "Complete" ? "success" : c.audit.includes("Pending") ? "warning" : "info"}>{c.audit}</StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
