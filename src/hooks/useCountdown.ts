import { useState, useEffect, useCallback } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export const useCountdown = (endDate: string): TimeLeft => {
  const calculate = useCallback((): TimeLeft => {
    const diff = new Date(endDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      total: diff,
    };
  }, [endDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculate);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [calculate]);

  return timeLeft;
};
