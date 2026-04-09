import { useCountdown } from "@/hooks/useCountdown";
import { useMemo } from "react";

interface Props {
  endDate: string;
  compact?: boolean;
  /** If provided, shows a visual time-remaining bar */
  startDate?: string;
}

const CountdownTimer = ({ endDate, compact = false, startDate }: Props) => {
  const { days, hours, minutes, seconds, total } = useCountdown(endDate);
  const isUrgent = total > 0 && total < 1000 * 60 * 60 * 24;

  // Progress: how much time has elapsed (0 = just started, 100 = ended)
  const progressPercent = useMemo(() => {
    if (!startDate) return null;
    const totalDuration = new Date(endDate).getTime() - new Date(startDate).getTime();
    if (totalDuration <= 0) return 100;
    const elapsed = Date.now() - new Date(startDate).getTime();
    return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
  }, [startDate, endDate, total]);

  // Remaining percent (for the bar fill)
  const remainingPercent = progressPercent !== null ? 100 - progressPercent : null;

  if (total <= 0) {
    return (
      <div>
        {remainingPercent !== null && (
          <div className="w-full h-1 rounded-full bg-secondary mb-1.5 overflow-hidden">
            <div className="h-full bg-destructive/50 rounded-full" style={{ width: "0%" }} />
          </div>
        )}
        <p className="text-[10px] font-medium text-destructive uppercase tracking-wider">Dražba zaključena</p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="space-y-1">
        {/* Visual time bar */}
        {remainingPercent !== null && (
          <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${isUrgent ? "bg-destructive" : "bg-primary/60"}`}
              style={{ width: `${remainingPercent}%` }}
            />
          </div>
        )}
        <div className={`flex items-center justify-between`}>
          <div className={`flex items-center gap-1.5 text-xs font-medium ${isUrgent ? "text-destructive" : "text-muted-foreground"}`}>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
            </svg>
            {days > 0 && <span>{days}d</span>}
            <span className="tabular-nums">{String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</span>
          </div>
          {remainingPercent !== null && (
            <span className={`text-[9px] uppercase tracking-wider ${isUrgent ? "text-destructive/60" : "text-muted-foreground/60"}`}>
              {Math.round(remainingPercent)}% preostalo
            </span>
          )}
        </div>
      </div>
    );
  }

  const units = [
    { value: days, label: "Dni" },
    { value: hours, label: "Ur" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Sek" },
  ];

  return (
    <div>
      {remainingPercent !== null && (
        <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden mb-2">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${isUrgent ? "bg-destructive" : "bg-primary/60"}`}
            style={{ width: `${remainingPercent}%` }}
          />
        </div>
      )}
      <div className="flex items-center gap-2">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-2">
            <div className={`text-center min-w-[52px] py-2.5 px-2 rounded-sm ${isUrgent ? "bg-destructive/10" : "bg-secondary"}`}>
              <p className={`font-heading text-2xl font-semibold tabular-nums ${isUrgent ? "text-destructive" : "text-foreground"}`}>
                {String(unit.value).padStart(2, "0")}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{unit.label}</p>
            </div>
            {i < units.length - 1 && (
              <span className={`text-lg font-light ${isUrgent ? "text-destructive/50" : "text-muted-foreground/50"}`}>:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
