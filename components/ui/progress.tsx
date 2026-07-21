import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0–100
  tone?: "primary" | "bad";
}

export function Progress({ value, tone = "primary", className, ...props }: ProgressProps) {
  const w = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn("h-3 w-full overflow-hidden rounded-full bg-border", className)}
      role="progressbar"
      aria-valuenow={Math.round(w)}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <div
        className={cn("h-full rounded-full", tone === "bad" ? "bg-bad" : "bg-primary")}
        style={{ width: `${w}%` }}
      />
    </div>
  );
}
