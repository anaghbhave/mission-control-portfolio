import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

type Props = {
  label: string;
  value: number;
  unit: string;
  delta: number;
  trend: "up" | "down";
  spark: readonly number[];
  positiveIsGood?: boolean;
  accent?: string;
};

export function KpiTile({ label, value, unit, delta, trend, spark, accent = "var(--chart-1)" }: Props) {
  const isUp = trend === "up";
  const data = spark.map((v, i) => ({ i, v }));
  const gradId = `g-${label.replace(/\s+/g, "")}`;

  return (
    <div className="glass-panel group relative overflow-hidden rounded-xl p-5 transition-all hover:border-primary/40">
      <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `radial-gradient(400px circle at 50% 0%, ${accent}22, transparent 60%)` }} />
      <div className="relative">
        <div className="flex items-start justify-between">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
              isUp ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
            }`}
          >
            {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta)}%
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="font-display text-3xl font-semibold tracking-tight text-foreground">
            {value.toLocaleString(undefined, { maximumFractionDigits: 1 })}
          </span>
          <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
        <div className="mt-3 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={accent} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke={accent} strokeWidth={1.5} fill={`url(#${gradId})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
