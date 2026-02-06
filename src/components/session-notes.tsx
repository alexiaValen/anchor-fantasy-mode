"use client";

import * as React from "react";
import { Button, Textarea } from "./ui";

function toLines(s: string) {
  return s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export function SessionNotes({
  started,
  setStarted,
  figured,
  setFigured,
  ended,
  setEnded,
  files,
  setFiles,
  onGenerateCommit,
  onSendToPlanner,
}: {
  started: string;
  setStarted: (v: string) => void;
  figured: string;
  setFigured: (v: string) => void;
  ended: string;
  setEnded: (v: string) => void;
  files: string[];
  setFiles: (v: string[]) => void;
  onGenerateCommit: () => void;
  onSendToPlanner: () => void;
}) {
  const [fileInput, setFileInput] = React.useState("");

  const addFiles = () => {
    const next = Array.from(new Set([...files, ...toLines(fileInput)]));
    setFiles(next);
    setFileInput("");
  };

  const removeFile = (f: string) => setFiles(files.filter((x) => x !== f));

  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label className="text-sm text-[rgb(var(--muted))]">We started with:</label>
          <Textarea value={started} onChange={(e) => setStarted(e.target.value)} placeholder="What was broken / unclear?" />
        </div>
        <div>
          <label className="text-sm text-[rgb(var(--muted))]">We figured out:</label>
          <Textarea value={figured} onChange={(e) => setFigured(e.target.value)} placeholder="What did you learn / confirm?" />
        </div>
        <div>
          <label className="text-sm text-[rgb(var(--muted))]">We ended here:</label>
          <Textarea value={ended} onChange={(e) => setEnded(e.target.value)} placeholder="What’s now working / next?" />
        </div>
      </div>

      <div className="rounded-xl border border-[rgb(var(--border))] bg-white p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium">Files touched</p>
          <p className="text-xs text-[rgb(var(--muted))]">Tip: one per line</p>
        </div>

        <div className="mt-2 flex flex-col gap-2 md:flex-row">
          <Textarea
            className="min-h-[80px]"
            value={fileInput}
            onChange={(e) => setFileInput(e.target.value)}
            placeholder={"src/services/healthKit.service.ts\nsrc/app/page.tsx"}
          />
          <div className="flex gap-2 md:flex-col">
            <Button variant="secondary" onClick={addFiles}>
              Add
            </Button>
            <Button variant="ghost" onClick={() => setFiles([])} disabled={files.length === 0}>
              Clear
            </Button>
          </div>
        </div>

        {files.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {files.map((f) => (
              <button
                key={f}
                onClick={() => removeFile(f)}
                className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--spark))] px-3 py-1 text-xs hover:opacity-90"
                title="Remove"
              >
                {f} ✕
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-[rgb(var(--muted))]">
            Add file paths as you go — future-you will thank you.
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={onGenerateCommit}>Generate Commit Draft</Button>
        <Button variant="ghost" onClick={onSendToPlanner}>
          Send to Planner Card
        </Button>
        <span className="ml-auto text-sm text-[rgb(var(--muted))]">
          Unclench. Then commit while it’s fresh.
        </span>
      </div>
    </div>
  );
}