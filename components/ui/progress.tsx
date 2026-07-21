"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0–100
  tone?: "primary" | "bad";
}

export function Progress({ value, tone = "primary", className, ...props }: ProgressProps) {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setW(Math.max(0, Math.min(100, value))));
    return () => cancelAnimationFrame(id);
  }, [value]);

  return (
    <div
      className={cn("h-3 w-full overflow-hidden rounded-full bg-border", className)}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-1000 ease-out",
          tone === "bad" ? "bg-bad" : "bg-primary"
        )}
        style={{ width: `${w}%` }}
      />
    </div>
  );
}
