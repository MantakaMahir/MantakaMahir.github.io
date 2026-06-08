"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function Footer() {
  const router = useRouter();
  const [clicks, setClicks] = useState(0);

  return (
    <footer className="border-t border-[var(--line)] px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>Mantaka Mahir</p>
        <div className="flex items-center gap-4">
          <span
            onClick={() => {
              const next = clicks + 1;
              setClicks(next);
              if (next >= 3) {
                setClicks(0);
                router.push("/admin");
              }
            }}
            className="cursor-pointer text-xs text-[var(--line)] transition hover:text-[var(--muted)] select-none"
          >
            copyright
          </span>
          <a href="#home" className="transition hover:text-[var(--foreground)]">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
