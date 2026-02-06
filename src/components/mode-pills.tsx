"use client";

import * as React from "react";
import { cn } from "./ui";

export type Mode = "Developer" | "Founder" | "Student" | "Mom" | "Rest";

const MODES: Mode[] = ["Developer", "Founder", "Student", "Mom", "Rest"];

export function ModePills({
  value,
  onChange,
}: {
  value: Mode;
  onChange: (m: Mode) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {MODES.map((m) => {
        const active = m === value;
        return (
          <button
            key={m}
            onClick={() => onChange(m)}
            className={cn(
              "rounded-full border px-3 py-1 text-sm transition",
              active
                ? "border-black/20 bg-[rgb(var(--spark))] font-semibold"
                : "border-[rgb(var(--border))] bg-white hover:bg-black/5"
            )}
            aria-pressed={active}
          >
            {m}
          </button>
        );
      })}
    </div>
  );
}