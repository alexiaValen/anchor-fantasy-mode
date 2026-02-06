import * as React from "react";

export function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function SectionHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgb(var(--spark))]">
            ✨
          </span>
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        {subtitle ? (
          <p className="mt-1 text-sm text-[rgb(var(--muted))]">{subtitle}</p>
        ) : null}
      </div>
      {right ? <div className="pt-1">{right}</div> : null}
    </div>
  );
}

export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed";
  const styles =
    variant === "primary"
      ? "bg-[rgb(var(--pink))] text-black hover:opacity-90"
      : variant === "secondary"
        ? "bg-[rgb(var(--denim))] text-white hover:opacity-90"
        : "bg-transparent hover:bg-black/5";

  return <button className={cn(base, styles, className)} {...props} />;
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-[rgb(var(--border))] bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-black/30",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full min-h-[120px] rounded-xl border border-[rgb(var(--border))] bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-black/30",
        className
      )}
      {...props}
    />
  );
}