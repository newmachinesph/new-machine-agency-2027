import type { ReactNode } from "react";

type GlassCardProps = {
  className?: string;
  children: ReactNode;
};

export default function GlassCard({ className = "", children }: GlassCardProps) {
  return <div className={`glass p-5 ${className}`.trim()}>{children}</div>;
}
