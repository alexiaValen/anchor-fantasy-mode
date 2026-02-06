"use client";

import * as React from "react";
import { Button } from "./ui";

export function PlannerCard({
  top3,
  quickHits,
  done,
}: {
  top3: string[];
  quickHits: string[];
  done: string[];
}) {
  const text = [
    "Top 3:",
    ...top3.filter(Boolean).map((t, i) => `${i + 1}. ${t}`),
    "",
    "Quick hits:",
    ...quickHits.filter(Boolean).map((t) => `- ${t}`),
    "",
    "Done (still write + highlight):",
    ...done.filter(Boolean).map((t) => `✅ ${t}`),
  ].join("\n");

  const copy = async () => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-3">
      <pre className="whitespace-pre-wrap rounded-xl border border-[rgb(var(--border))] bg-white p-3 text-sm">
        {text}
      </pre>

      <div className="flex gap-2">
        <Button variant="secondary" onClick={copy}>
          Copy
        </Button>
        <Button
          variant="ghost"
          onClick={() => window.print()}
          title="Basic print; later we’ll add a clean print layout"
        >
          Print view
        </Button>
      </div>

      <p className="text-sm text-[rgb(var(--muted))]">
        You remember best when you write it down. This is the bridge.
      </p>
    </div>
  );
}