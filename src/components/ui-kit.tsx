import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-wide transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "px-4 py-2.5 text-sm",
        size === "lg" && "px-7 py-3.5 text-sm uppercase tracking-[0.15em]",
        variant === "primary" &&
          "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "outline" &&
          "border border-border bg-transparent text-foreground hover:border-primary hover:text-primary",
        variant === "ghost" && "text-muted-foreground hover:text-foreground",
        variant === "danger" &&
          "border border-destructive/40 text-destructive hover:bg-destructive/10",
        className,
      )}
      {...props}
    />
  );
}

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

const controlClasses =
  "w-full rounded-md border border-input bg-secondary/40 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring transition-colors";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClasses, className)} {...props} />;
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(controlClasses, className)} {...props}>
      {children}
    </select>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 transition-colors duration-200",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.12em]",
        status === "confirmada" && "bg-success/15 text-success",
        status === "pendiente" && "bg-warning/15 text-warning",
        status === "cancelada" && "bg-destructive/15 text-destructive",
      )}
    >
      {status}
    </span>
  );
}
