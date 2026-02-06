"use client";

import * as React from "react";
import { Button, Input } from "./ui";

export function AnchorTop3({
  items,
  setItems,
  locked,
  setLocked,
}: {
  items: string[];
  setItems: (v: string[]) => void;
  locked: boolean;
  setLocked: (v: boolean) => void;
}) {
  const update = (idx: number, val: string) => {
    const next = [...items];
    next[idx] = val;
    setItems(next);
  };

  return (
    <div className="space-y-3">
      <div className="grid gap-2">
        {items.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[rgb(var(--border))]"
              aria-label={`Complete priority ${i + 1}`}
            />
            <Input
              value={v}
              disabled={locked}
              onChange={(e) => update(i, e.target.value)}
              placeholder={`Priority ${i + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={locked ? "ghost" : "primary"}
          onClick={() => setLocked(!locked)}
        >
          {locked ? "Unlock Today" : "Lock Today"}
        </Button>

        <Button
          variant="ghost"
          onClick={() => setItems(["", "", ""])}
          disabled={locked}
          title={locked ? "Unlock to edit" : "Clear"}
        >
          Clear
        </Button>

        <span className="ml-auto text-sm text-[rgb(var(--muted))]">
          Three. Not ten. No side quests today.
        </span>
      </div>
    </div>
  );
}