import Link from "next/link";

export function VoiceTextMark({ small = false }: { small?: boolean }) {
  return (
    <svg aria-hidden="true" className={small ? "h-8 w-8" : "h-16 w-16"} viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="18" fill="#183D38" />
      <path d="M20 24v12a12 12 0 0 0 24 0V24" stroke="#F4E8D0" strokeWidth="5" strokeLinecap="round" />
      <path d="M16 36a16 16 0 0 0 32 0M32 52V44" stroke="#E5A85B" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function VoiceTextHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
      <Link href="/voicetext" className="flex items-center gap-3 font-semibold tracking-tight text-[#183d38]">
        <VoiceTextMark small />
        <span>VoiceText</span>
      </Link>
      <nav aria-label="VoiceText" className="flex items-center gap-5 text-sm text-[#53615b]">
        <Link className="transition-colors hover:text-[#183d38]" href="/voicetext/privacy">Privacy</Link>
        <a className="rounded-full border border-[#183d38] px-4 py-2 font-medium text-[#183d38] transition-colors hover:bg-[#183d38] hover:text-[#fffaf1]" href="#how-it-works">How it works</a>
      </nav>
    </header>
  );
}

export function VoiceTextFooter() {
  return <footer className="mx-auto flex w-full max-w-6xl flex-col gap-3 border-t border-[#d8d5cc] px-5 py-7 text-sm text-[#68736c] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"><span>VoiceText · a small, deliberate tool</span><Link className="underline decoration-[#e5a85b] underline-offset-4 hover:text-[#183d38]" href="/voicetext/privacy">Privacy policy</Link></footer>;
}
