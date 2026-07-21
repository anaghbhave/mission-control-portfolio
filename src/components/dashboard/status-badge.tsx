type Tone = "success" | "warning" | "destructive" | "info" | "muted";

const tones: Record<Tone, string> = {
  success: "bg-success/15 text-success ring-success/30",
  warning: "bg-warning/15 text-warning ring-warning/30",
  destructive: "bg-destructive/15 text-destructive ring-destructive/30",
  info: "bg-info/15 text-info ring-info/30",
  muted: "bg-muted text-muted-foreground ring-border",
};

export function StatusBadge({ tone = "muted", children }: { tone?: Tone; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ring-1 ${tones[tone]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {children}
    </span>
  );
}
