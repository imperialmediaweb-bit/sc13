"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

/** Buton cu efect de „shimmer” (stil Magic UI), randat ca link. */
export function ShimmerButton({ children, className, ...props }: ShimmerButtonProps) {
  return (
    <a
      className={cn(
        "group relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-md bg-primary px-5 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-px hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background motion-reduce:transform-none",
        className
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent animate-shimmer motion-reduce:hidden"
      />
    </a>
  );
}
