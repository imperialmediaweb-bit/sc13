import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide",
  {
    variants: {
      tone: {
        done: "bg-ok-soft text-ok",
        progress: "bg-warn-soft text-warn",
        bad: "bg-bad-soft text-bad",
        none: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { tone: "none" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export { Badge, badgeVariants };
