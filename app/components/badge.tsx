import React from "react";

interface BadgeProps {
  icon?: React.ReactNode;
  text: string;
}

export default function Badge({ icon, text }: BadgeProps) {
  return (
    <span className="inline-flex items-center gap-x-1.5 h-[22px] rounded-sm border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-1.5 py-0 text-xs font-medium text-neutral-700 dark:text-neutral-300 align-middle">
      {icon}
      {text}
    </span>
  );
}
