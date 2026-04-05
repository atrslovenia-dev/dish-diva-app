import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  endDate: string;
  compact?: boolean;
}

const CountdownTimer = ({ endDate, compact = false }: Props) => {
  const { days, hours, minutes, seconds, total } = useCountdown(endDate);
  const isUrgent = total > 0 && total < 1000 * 60 * 60 * 24; // less than 24h

  if (total <= 0) {
    return (
      <div className="text-center">
        <p className="text-sm font-medium text-destructive uppercase tracking-wider">Dražba zaključena</p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={`flex items-center gap-1.5 text-xs font-medium ${isUrgent ? "text-destructive" : "text-muted-foreground"}`}>
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
        </svg>
        {days > 0 && <span>{days}d</span>}
        <span>{String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</span>
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
  );
};

export default CountdownTimer;
