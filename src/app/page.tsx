"use client";

import * as React from "react";
import { Card, SectionHeader, Button, Textarea } from "@/components/ui";
import { ModePills, Mode } from "@/components/mode-pills";
import { AnchorTop3 } from "@/components/anchor-top3";
import { SprintTimer } from "@/components/sprint-timer";
import { SessionNotes } from "@/components/session-notes";
import { PlannerCard } from "../components/planner-card";

function makeCommitDraft(input: {
  mode: Mode;
  started: string;
  figured: string;
  ended: string;
  files: string[];
}) {
  // Very simple heuristic for v1 (we’ll improve later)
  const type = input.mode === "Developer" ? "fix" : "chore";
  const scope = input.mode === "Developer" ? "dev" : "anchor";
  const summary =
    input.ended.split("\n")[0].trim() ||
    input.figured.split("\n")[0].trim() ||
    "update progress";

  const bullets = [
    input.started ? `- Started with: ${input.started.split("\n")[0]}` : null,
    input.figured ? `- Figured out: ${input.figured.split("\n")[0]}` : null,
    input.ended ? `- Ended here: ${input.ended.split("\n")[0]}` : null,
    input.files.length ? `- Touched: ${input.files.slice(0, 4).join(", ")}${input.files.length > 4 ? "…" : ""}` : null,
  ].filter(Boolean);

  const header = `${type}(${scope}): ${summary.toLowerCase()}`;
  return [header, "", ...bullets].join("\n");
}

export default function DashboardPage() {
  const [mode, setMode] = React.useState<Mode>("Developer");

  const [top3, setTop3] = React.useState<string[]>(["", "", ""]);
  const [locked, setLocked] = React.useState(false);

  const [bubbleBrain, setBubbleBrain] = React.useState("");

  const [started, setStarted] = React.useState("");
  const [figured, setFigured] = React.useState("");
  const [ended, setEnded] = React.useState("");
  const [files, setFiles] = React.useState<string[]>([]);

  const [commitDraft, setCommitDraft] = React.useState("");
  const [plannerQuickHits, setPlannerQuickHits] = React.useState<string[]>([]);
  const [plannerDone, setPlannerDone] = React.useState<string[]>([]);

  const generateCommit = () => {
    const draft = makeCommitDraft({ mode, started, figured, ended, files });
    setCommitDraft(draft);
  };

  const sendToPlanner = () => {
    // For v1: put ended/figured lines into quick hits if present
    const hits = [
      ...ended.split("\n").map((l) => l.trim()).filter(Boolean),
      ...figured.split("\n").map((l) => l.trim()).filter(Boolean),
    ].slice(0, 5);

    setPlannerQuickHits(hits);
  };

  const copyCommit = async () => {
    await navigator.clipboard.writeText(commitDraft);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Top bar */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Anchor <span className="opacity-70">·</span> Fantasy Mode
          </h1>
          <p className="text-sm text-[rgb(var(--muted))]">
            Bubble Brain holds the chaos. Anchor ships the day.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 md:items-end">
          <ModePills value={mode} onChange={setMode} />
          <p className="text-xs text-[rgb(var(--muted))]">
            Mode changes the tone. Not the standards.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-4 lg:col-span-2">
          <Card className="p-5">
            <SectionHeader
              title="Today’s Anchor (pick 3 only)"
              subtitle="Three priorities. That’s the deal."
              right={
                <span className="rounded-full border border-[rgb(var(--border))] bg-white px-3 py-1 text-xs">
                  {locked ? "Locked" : "Editable"}
                </span>
              }
            />
            <div className="mt-4">
              <AnchorTop3
                items={top3}
                setItems={setTop3}
                locked={locked}
                setLocked={setLocked}
              />
            </div>
          </Card>

          <Card className="p-5">
            <SectionHeader
              title="Focus Sprint"
              subtitle="We’re not spiraling. One sprint at a time."
            />
            <div className="mt-4">
              <SprintTimer />
            </div>
          </Card>

          <Card className="p-5">
            <SectionHeader
              title="Session Notes (simple language)"
              subtitle="We started with → figured out → ended here → files touched."
            />
            <div className="mt-4">
              <SessionNotes
                started={started}
                setStarted={setStarted}
                figured={figured}
                setFigured={setFigured}
                ended={ended}
                setEnded={setEnded}
                files={files}
                setFiles={setFiles}
                onGenerateCommit={generateCommit}
                onSendToPlanner={sendToPlanner}
              />
            </div>
          </Card>

          {commitDraft ? (
            <Card className="p-5">
              <SectionHeader
                title="Commit Draft"
                subtitle="Write it while context is alive."
                right={
                  <Button variant="secondary" onClick={copyCommit}>
                    Copy
                  </Button>
                }
              />
              <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-[rgb(var(--border))] bg-white p-3 text-sm">
                {commitDraft}
              </pre>
            </Card>
          ) : null}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <Card className="p-5">
            <SectionHeader
              title="Bubble Brain"
              subtitle="Drop it here. No organizing. Park the side quests."
            />
            <div className="mt-4">
              <Textarea
                value={bubbleBrain}
                onChange={(e) => setBubbleBrain(e.target.value)}
                placeholder="Ideas, worries, random reminders…"
              />
              <div className="mt-3 flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setBubbleBrain("")}
                  disabled={!bubbleBrain}
                >
                  Clear
                </Button>
                <span className="ml-auto text-sm text-[rgb(var(--muted))]">
                  Cute idea? Park it. 😌
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <SectionHeader
              title="Planner Card"
              subtitle="Mental cue → screen → write it down."
            />
            <div className="mt-4">
              <PlannerCard
                top3={top3}
                quickHits={plannerQuickHits}
                done={plannerDone}
              />

              <div className="mt-4 rounded-xl border border-[rgb(var(--border))] bg-white p-3">
                <p className="text-sm font-medium">Optional: mark “done” items</p>
                <p className="mt-1 text-sm text-[rgb(var(--muted))]">
                  Even if it’s completed, writing + highlighting it gives you that
                  “full planner” satisfaction.
                </p>

                <div className="mt-3 flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setPlannerDone(top3.filter(Boolean))}
                    disabled={!top3.some(Boolean)}
                  >
                    Add Top 3 to Done ✅
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setPlannerDone([])}
                    disabled={!plannerDone.length}
                  >
                    Clear Done
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <SectionHeader
              title="Somatic Instructions"
              subtitle="Reduce force, keep direction."
            />
            <div className="mt-4 space-y-2 text-sm">
              <div className="rounded-xl border border-[rgb(var(--border))] bg-white p-3">
                <p className="font-medium">Soften</p>
                <p className="text-[rgb(var(--muted))]">Same task. Softer grip.</p>
              </div>
              <div className="rounded-xl border border-[rgb(var(--border))] bg-white p-3">
                <p className="font-medium">Unclench</p>
                <p className="text-[rgb(var(--muted))]">
                  Release tension before deciding.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-[rgb(var(--muted))]">
        Anchor · Fantasy Mode — UI-first MVP. Ship the loop. Then expand.
      </div>
    </div>
  );
}