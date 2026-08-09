import type { Metadata } from "next";
import { VoiceTextFooter, VoiceTextHeader, VoiceTextMark } from "./VoiceTextShell";

export const metadata: Metadata = {
  title: "VoiceText — Transcribe voice messages locally",
  description: "A focused Chrome and Edge extension for transcribing selected WhatsApp Web and Messenger voice messages.",
  alternates: { canonical: "/voicetext" },
};

const points = [
  ["Choose", "Select one voice message and press Transcribe."],
  ["Capture", "VoiceText captures audio from your active target tab only."],
  ["Read", "Get a plain-text transcript you can copy, retry, or collapse."],
];

export default function VoiceTextPage() {
  return (
    <div className="min-h-screen bg-[#f8f5ee] text-[#183d38] selection:bg-[#f2c98d]">
      <VoiceTextHeader />
      <main>
        <section className="mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-12 sm:px-8 sm:pt-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-10 lg:pb-28">
          <div>
            <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#c8d5c9] bg-[#edf3e9] px-3 py-1.5 text-xs font-semibold uppercase tracking-[.18em] text-[#356258]"><span className="h-1.5 w-1.5 rounded-full bg-[#e5a85b]" /> Chrome + Edge · MV3</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-7xl">Hear it once.<br /><span className="text-[#d17e38]">Keep the words.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#53615b] sm:text-xl">VoiceText adds a clear Transcribe control to individual voice messages on WhatsApp Web and Messenger—so a useful thought does not disappear into a replay loop.</p>
            <div className="mt-9 flex flex-wrap items-center gap-5 text-sm font-medium"><a href="#how-it-works" className="rounded-full bg-[#183d38] px-6 py-3.5 text-[#fffaf1] shadow-[0_8px_24px_rgba(24,61,56,.16)] transition-transform hover:-translate-y-0.5">See how it works <span aria-hidden="true">↓</span></a><a href="/voicetext/privacy" className="text-[#356258] underline decoration-[#e5a85b] decoration-2 underline-offset-8">Read the privacy policy</a></div>
            <p className="mt-8 text-sm leading-6 text-[#68736c]">Requires the separately-run local VoiceText backend at <code className="rounded bg-[#ebe6da] px-1.5 py-0.5 text-xs">127.0.0.1:8787</code>.</p>
          </div>
          <div className="relative mx-auto w-full max-w-sm lg:ml-auto">
            <div aria-hidden="true" className="absolute -right-6 -top-8 h-24 w-24 rounded-full border border-[#e5a85b]" />
            <div className="relative rounded-[2rem] border border-[#c8d5c9] bg-[#e9f0e6] p-7 shadow-[0_24px_60px_rgba(24,61,56,.10)] sm:p-9">
              <VoiceTextMark />
              <div className="mt-12 flex items-end gap-1.5" aria-label="A sound waveform illustration"><span className="h-8 w-1.5 rounded-full bg-[#e5a85b]" /><span className="h-16 w-1.5 rounded-full bg-[#d17e38]" /><span className="h-24 w-1.5 rounded-full bg-[#183d38]" /><span className="h-12 w-1.5 rounded-full bg-[#356258]" /><span className="h-20 w-1.5 rounded-full bg-[#d17e38]" /><span className="h-10 w-1.5 rounded-full bg-[#e5a85b]" /><span className="h-28 w-1.5 rounded-full bg-[#183d38]" /><span className="h-14 w-1.5 rounded-full bg-[#356258]" /><span className="h-7 w-1.5 rounded-full bg-[#e5a85b]" /></div>
              <p className="mt-8 text-2xl font-medium tracking-tight">Less replay.<br />More remember.</p>
              <p className="mt-3 text-sm leading-6 text-[#53615b]">Designed for the one message you chose—not the whole conversation.</p>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="border-y border-[#d8d5cc] bg-[#fffaf1]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#d17e38]">A focused flow</p><div className="mt-8 grid gap-10 md:grid-cols-3">{points.map(([title, text], index) => <div key={title} className="border-l-2 border-[#e5a85b] pl-5"><span className="text-sm text-[#9b988e]">0{index + 1}</span><h2 className="mt-5 text-2xl font-semibold tracking-tight">{title}</h2><p className="mt-3 leading-7 text-[#53615b]">{text}</p></div>)}</div></div>
        </section>
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#d17e38]">Built with boundaries</p><h2 className="mt-5 text-3xl font-semibold tracking-[-.035em] sm:text-4xl">Your selection sets the scope.</h2><p className="mt-5 text-lg leading-8 text-[#53615b]">VoiceText never auto-captures visible conversations. It runs only after you choose a specific voice message and enable active-tab capture from the extension action where required. It never uses your microphone or desktop audio.</p></div><div className="mt-12 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl bg-[#183d38] p-6 text-[#fffaf1]"><p className="text-3xl font-semibold">0</p><p className="mt-3 text-sm leading-6 text-[#d9e5d8]">analytics, tracking, or content logging</p></div><div className="rounded-2xl border border-[#c8d5c9] p-6"><p className="text-3xl font-semibold">4</p><p className="mt-3 text-sm leading-6 text-[#53615b]">language modes: Auto, Bangla, English, mixed</p></div><div className="rounded-2xl border border-[#c8d5c9] p-6"><p className="text-3xl font-semibold">116+</p><p className="mt-3 text-sm leading-6 text-[#53615b]">Chrome or Edge Chromium browser version</p></div></div></section>
      </main><VoiceTextFooter />
    </div>
  );
}
