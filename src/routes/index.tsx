import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  Bell,
  Command,
  FileText,
  GitBranch,
  Layers,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { kpis, throughput, automationMix } from "@/lib/dashboard-data";
import { KpiTile } from "@/components/dashboard/kpi-tile";
import { ExceptionsPanel } from "@/components/dashboard/exceptions-panel";
import {
  AgentLedPanel,
  AiLedPanel,
  DocumentLedPanel,
} from "@/components/dashboard/workflow-panels";

export const Route = createFileRoute("/")({
  component: CommandCenter,
});

const tabs = [
  { id: "overview", label: "Overview", icon: Command },
  { id: "document", label: "Document-Led", icon: FileText },
  { id: "ai", label: "AI-Led", icon: Sparkles },
  { id: "agent", label: "Agent-Led", icon: GitBranch },
  { id: "exceptions", label: "Exceptions", icon: ShieldCheck },
] as const;

type TabId = (typeof tabs)[number]["id"];

const accents = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--chart-1)", "var(--chart-2)", "var(--chart-3)"];

function CommandCenter() {
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <div className="min-h-screen grid-bg">
      {/* Top nav */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
              <Radar className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-display text-sm font-semibold leading-tight text-foreground">Mission Automation</p>
              <p className="text-[11px] leading-tight text-muted-foreground">Command Center · Q3 FY25</p>
            </div>
          </div>
          <div className="hidden flex-1 max-w-md md:block">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                placeholder="Search MIPR, contract, ticket, program…"
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <kbd className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">⌘K</kbd>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-medium text-success ring-1 ring-success/30 md:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              All systems operational
            </div>
            <button className="relative rounded-lg border border-border bg-surface p-2 text-muted-foreground transition-colors hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-info font-display text-xs font-semibold text-primary-foreground">
              JR
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 py-8">
        {/* Hero */}
        <section className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Portfolio Overview</p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Automation performance across <span className="text-gradient">every mission workflow</span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Real-time visibility into document-led intake, AI-led service delivery, and agent-led portfolio actions —
              tuned for leaders who need cycle time, throughput, and exceptions on one screen.
            </p>
          </div>
          <div className="flex gap-2">
            {(["24h", "7d", "30d", "QTD"] as const).map((r, i) => (
              <button
                key={r}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  i === 2
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-surface text-muted-foreground hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </section>

        {/* Tabs */}
        <nav className="mb-6 flex flex-wrap gap-1 rounded-xl border border-border bg-surface/50 p-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                  active
                    ? "bg-surface-elevated text-foreground shadow-sm ring-1 ring-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </nav>

        {tab === "overview" && (
          <>
            {/* KPI grid */}
            <section className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {kpis.map((k, i) => (
                <KpiTile
                  key={k.id}
                  label={k.label}
                  value={k.value}
                  unit={k.unit}
                  delta={k.delta}
                  trend={k.trend as "up" | "down"}
                  spark={k.spark}
                  positiveIsGood={!["validation", "approvals", "exceptions", "cycle"].includes(k.id)}
                  accent={accents[i]}
                />
              ))}
            </section>

            {/* Charts row */}
            <section className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="glass-panel col-span-1 rounded-xl p-5 lg:col-span-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Throughput
                    </h3>
                    <p className="mt-1 font-display text-lg text-foreground">
                      Intake · Extraction · ERP posting <span className="text-xs text-muted-foreground">— last 8 weeks</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <Legend2 color="var(--chart-1)" label="MIPR intake" />
                    <Legend2 color="var(--chart-2)" label="Fields extracted" />
                    <Legend2 color="var(--chart-3)" label="ERP posted" />
                  </div>
                </div>
                <div className="mt-4 h-72">
                  <ResponsiveContainer>
                    <AreaChart data={throughput}>
                      <defs>
                        <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="a2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                      <XAxis dataKey="week" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          background: "var(--color-popover)",
                          border: "1px solid var(--color-border)",
                          borderRadius: 8,
                          fontSize: 12,
                        }}
                      />
                      <Area type="monotone" dataKey="extracted" stroke="var(--chart-2)" strokeWidth={2} fill="url(#a2)" />
                      <Area type="monotone" dataKey="intake" stroke="var(--chart-1)" strokeWidth={2} fill="url(#a1)" />
                      <Area type="monotone" dataKey="erp" stroke="var(--chart-3)" strokeWidth={2} fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-5">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Automation mix
                </h3>
                <p className="mt-1 font-display text-lg text-foreground">Volume by workflow class</p>
                <div className="mt-2 h-56">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={automationMix}
                        dataKey="value"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        stroke="var(--color-background)"
                        strokeWidth={2}
                      >
                        {automationMix.map((s) => (
                          <Cell key={s.name} fill={s.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: "var(--color-popover)",
                          border: "1px solid var(--color-border)",
                          borderRadius: 8,
                          fontSize: 12,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="mt-2 space-y-1.5">
                  {automationMix.map((s) => (
                    <li key={s.name} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <span className="h-2 w-2 rounded-sm" style={{ background: s.color }} />
                        {s.name}
                      </span>
                      <span className="font-mono text-foreground">{s.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Cycle time + exceptions */}
            <section className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="glass-panel rounded-xl p-5">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Cycle time by stage
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">Median hours, current week</p>
                <div className="mt-4 h-56">
                  <ResponsiveContainer>
                    <BarChart
                      data={[
                        { s: "Intake", h: 0.4 },
                        { s: "IDP", h: 1.1 },
                        { s: "Validate", h: 3.8 },
                        { s: "Approve", h: 8.2 },
                        { s: "ERP", h: 0.7 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                      <XAxis dataKey="s" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          background: "var(--color-popover)",
                          border: "1px solid var(--color-border)",
                          borderRadius: 8,
                          fontSize: 12,
                        }}
                      />
                      <Bar dataKey="h" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="lg:col-span-2">
                <ExceptionsPanel />
              </div>
            </section>

            {/* Bottom activity strip */}
            <section className="glass-panel rounded-xl p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Live activity
                  </h3>
                </div>
                <span className="text-[11px] text-muted-foreground">Streaming · updated 2s ago</span>
              </div>
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {[
                  { t: "IDP extracted 24 fields on MIPR-2049 (avg 96% conf.)", tag: "Document-Led", tone: "chart-1" },
                  { t: "Agent auto-approved HR-8817 (Dependent Update)", tag: "AI-Led", tone: "chart-2" },
                  { t: "Contract CT-5501 · deobligation recommended $128K", tag: "Agent-Led", tone: "chart-3" },
                  { t: "MIPR-2044 approval overdue — escalated to J. Reeves", tag: "Exception", tone: "chart-5" },
                ].map((row, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-surface/50 p-3">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: `var(--${row.tone})` }} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-foreground">{row.t}</p>
                      <p className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">{row.tag}</p>
                    </div>
                    <Layers className="h-4 w-4 text-muted-foreground" />
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {tab === "document" && (
          <section className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {kpis.slice(0, 4).map((k, i) => (
                <KpiTile key={k.id} {...k} trend={k.trend as "up" | "down"} spark={k.spark} accent={accents[i]} />
              ))}
            </div>
            <DocumentLedPanel />
          </section>
        )}

        {tab === "ai" && (
          <section className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[kpis[3], kpis[6], kpis[7], kpis[5]].map((k, i) => (
                <KpiTile key={k.id} {...k} trend={k.trend as "up" | "down"} spark={k.spark} accent={accents[i + 1]} positiveIsGood={!["approvals", "exceptions", "cycle"].includes(k.id)} />
              ))}
            </div>
            <AiLedPanel />
          </section>
        )}

        {tab === "agent" && (
          <section className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[kpis[4], kpis[7], kpis[5], kpis[6]].map((k, i) => (
                <KpiTile key={k.id} {...k} trend={k.trend as "up" | "down"} spark={k.spark} accent={accents[i + 2]} positiveIsGood={!["exceptions", "cycle"].includes(k.id)} />
              ))}
            </div>
            <AgentLedPanel />
          </section>
        )}

        {tab === "exceptions" && (
          <section className="grid grid-cols-1 gap-4">
            <ExceptionsPanel />
          </section>
        )}

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground">
          <span>Mission Automation Command Center · Demonstration data</span>
          <span className="font-mono">v2.4.1 · region us-gov-east-1</span>
        </footer>
      </main>
    </div>
  );
}

function Legend2({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-muted-foreground">
      <span className="h-2 w-2 rounded-sm" style={{ background: color }} />
      {label}
    </span>
  );
}
