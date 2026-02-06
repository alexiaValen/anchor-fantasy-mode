"use client";

import * as React from "react";
import { Button } from "./ui";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function SprintTimer() {
  const [minutes, setMinutes] = React.useState(20);
  const [secondsLeft, setSecondsLeft] = React.useState(minutes * 60);
  const [running, setRunning] = React.useState(false);
  const [done, setDone] = React.useState<null | boolean>(null);
  const [blocker, setBlocker] = React.useState("");

  React.useEffect(() => {
    setSecondsLeft(minutes * 60);
    setRunning(false);
    setDone(null);
    setBlocker("");
  }, [minutes]);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          setRunning(false);
          setDone(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const mm = Math.floor(secondsLeft / 60);
  const ss = secondsLeft % 60;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {[20, 45, 60].map((m) => (
          <button
            key={m}
            className={`rounded-full border px-3 py-1 text-sm ${
              minutes === m
                ? "border-black/20 bg-[rgb(var(--spark))] font-semibold"
                : "border-[rgb(var(--border))] bg-white hover:bg-black/5"
            }`}
            onClick={() => setMinutes(m)}
          >
            {m} min
          </button>
        ))}
        <span className="ml-auto font-mono text-lg">
          {pad(mm)}:{pad(ss)}
        </span>
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => setRunning(true)} disabled={running || secondsLeft === 0}>
          Start
        </Button>
        <Button variant="ghost" onClick={() => setRunning(false)} disabled={!running}>
          Pause
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setSecondsLeft(minutes * 60);
            setRunning(false);
            setDone(null);
            setBlocker("");
          }}
        >
          Reset
        </Button>
      </div>

      {secondsLeft === 0 ? (
        <div className="rounded-xl border border-[rgb(var(--border))] bg-white p-3">
          <p className="text-sm font-medium">
            Sprint ended. Did we finish what we said we’d do?
          </p>
          <div className="mt-2 flex gap-2">
            <Button
              onClick={() => setDone(true)}
              variant="primary"
            >
              Yes
            </Button>
            <Button
              onClick={() => setDone(false)}
              variant="ghost"
            >
              No
            </Button>
          </div>

          {done === false ? (
            <div className="mt-3">
              <label className="text-sm text-[rgb(var(--muted))]">
                Name the blocker in one sentence (no drama):
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-[rgb(var(--border))] bg-white px-3 py-2 text-sm outline-none focus:border-black/30"
                value={blocker}
                onChange={(e) => setBlocker(e.target.value)}
                placeholder="e.g., missing info / stuck on error / too many branches"
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}