import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ClockProps {
  variant: "login" | "header";
}

export default function Clock({ variant }: ClockProps) {
  // update the time every second
  const [time, setTime] = useState<Date>(new Date());

  // update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (variant === "login") {
    return (
      <div className={cn("flex flex-col justify-center items-center")}>
        <p className={cn("text-[28px] font-light")}>
          {new Intl.DateTimeFormat("lookup", {
            weekday: "long",
            day: "numeric",
            month: "long",
          }).format(time)}
        </p>

        <p className={cn("text-[86px] leading-[86px] font-bold")}>
          {new Intl.DateTimeFormat("lookup", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          }).format(time)}
        </p>
      </div>
    );
  }

  return (
    <p className={cn("text-[13px]")}>
      {new Intl.DateTimeFormat("lookup", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
        .format(time)
        .replace(/,/g, "")}
    </p>
  );
}
