import React from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center space-y-2" : "space-y-2"}>
      {eyebrow && (
        <p className="text-[10px] font-extrabold font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        {title}
      </h2>
      {description && <p className="text-xs leading-relaxed text-slate-500 dark:text-zinc-400 sm:text-sm">{description}</p>}
    </div>
  );
}
