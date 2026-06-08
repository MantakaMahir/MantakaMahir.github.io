"use client";

import { useEffect, useState } from "react";

const PASSWORD = "####1234";

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => {
    if (typeof sessionStorage !== "undefined") {
      return sessionStorage.getItem("admin_auth") === "1";
    }
    return false;
  });
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [tab, setTab] = useState("hero");

  function login() {
    if (pw === PASSWORD) {
      sessionStorage.setItem("admin_auth", "1");
      setAuthed(true);
    } else {
      setErr(true);
    }
  }

  useEffect(() => {
    if (!authed) return;
    fetch("/content.json")
      .then((r) => r.json())
      .then(setData);
  }, [authed]);

  function save() {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-5">
        <div className="w-full max-w-sm">
          <h1 className="mb-6 text-2xl font-semibold tracking-[-0.03em]">Admin</h1>
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(false); }}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Password"
            className="w-full border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm outline-none"
          />
          {err && <p className="mt-2 text-xs text-red-500">Wrong password</p>}
          <button onClick={login} className="mt-4 w-full border border-[var(--foreground)] bg-[var(--foreground)] px-4 py-3 text-sm font-semibold text-[var(--background)]">
            Enter
          </button>
        </div>
      </div>
    );
  }

  if (!data) return <div className="flex min-h-screen items-center justify-center text-[var(--muted)]">Loading content...</div>;

  const tabs = ["hero", "about", "experience", "projects", "skills", "writing", "now", "contact"] as const;
  const hero = data.hero as Record<string, unknown>;
  const about = data.about as Record<string, string>;
  const experience = data.experience as Record<string, unknown>[];
  const projects = data.projects as Record<string, unknown>[];
  const skills = data.skills as Record<string, unknown>;
  const writing = data.writing as Record<string, string>[];
  const now = data.now as Record<string, string>;
  const contact = data.contact as Record<string, unknown>;

  function set(key: string, val: unknown) {
    setData({ ...data, [key]: val } as Record<string, unknown>);
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-[-0.03em]">Content Manager</h1>
        <button onClick={save} className="border border-[var(--foreground)] bg-[var(--foreground)] px-4 py-2 text-sm font-semibold text-[var(--background)]">
          Download JSON
        </button>
      </div>

      <div className="mb-8 flex flex-wrap gap-2 border-b border-[var(--line)] pb-4">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] ${tab === t ? "border-b-2 border-[var(--foreground)] text-[var(--foreground)]" : "text-[var(--muted)]"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {tab === "hero" && (
          <div className="space-y-4">
            <Field label="Eyebrow" value={hero.eyebrow as string} onChange={(v: string) => set("hero", { ...hero, eyebrow: v })} />
            <Field label="Headline" value={hero.headline as string} onChange={(v: string) => set("hero", { ...hero, headline: v })} />
            <TextArea label="Subheadline" value={hero.subheadline as string} onChange={(v: string) => set("hero", { ...hero, subheadline: v })} />
            <h3 className="text-sm font-semibold">Snapshot</h3>
            {(hero.snapshot as { label: string; value: string }[]).map((s, i) => (
              <div key={i} className="flex gap-3">
                <input value={s.label} onChange={(e) => { const cp = [...(hero.snapshot as { label: string; value: string }[])]; cp[i] = { ...cp[i], label: e.target.value }; set("hero", { ...hero, snapshot: cp }); }} className="flex-1 border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm" />
                <input value={s.value} onChange={(e) => { const cp = [...(hero.snapshot as { label: string; value: string }[])]; cp[i] = { ...cp[i], value: e.target.value }; set("hero", { ...hero, snapshot: cp }); }} className="flex-1 border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm" />
              </div>
            ))}
          </div>
        )}

        {tab === "about" && (
          <TextArea label="Body" value={about.body} onChange={(v) => set("about", { body: v })} />
        )}

        {tab === "experience" && (
          <div className="space-y-8">
            {experience.map((exp, i) => (
              <div key={i} className="border border-[var(--line)] p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold">{exp.org as string}</h3>
                  <button onClick={() => { const cp = [...experience]; cp.splice(i, 1); set("experience", cp); }} className="text-xs text-red-500">Remove</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Role" value={exp.role as string} onChange={(v) => { const cp = [...experience]; cp[i] = { ...cp[i], role: v }; set("experience", cp); }} />
                  <Field label="Org" value={exp.org as string} onChange={(v) => { const cp = [...experience]; cp[i] = { ...cp[i], org: v }; set("experience", cp); }} />
                  <Field label="Period" value={exp.period as string} onChange={(v) => { const cp = [...experience]; cp[i] = { ...cp[i], period: v }; set("experience", cp); }} />
                  <Field label="Type" value={exp.type as string} onChange={(v) => { const cp = [...experience]; cp[i] = { ...cp[i], type: v }; set("experience", cp); }} />
                </div>
                <h4 className="mb-2 mt-4 text-xs font-semibold text-[var(--muted)]">HIGHLIGHTS</h4>
                {(exp.highlights as string[]).map((h, j) => (
                  <div key={j} className="mb-2">
                    <input value={h} onChange={(e) => { const cp = [...experience]; const hl = [...(cp[i].highlights as string[])]; hl[j] = e.target.value; cp[i] = { ...cp[i], highlights: hl }; set("experience", cp); }} className="w-full border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {tab === "projects" && (
          <div className="space-y-8">
            {projects.map((p, i) => (
              <div key={i} className="border border-[var(--line)] p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold">{(p.name as string) || `Project ${i + 1}`}</h3>
                  <button onClick={() => { const cp = [...projects]; cp.splice(i, 1); set("projects", cp); }} className="text-xs text-red-500">Remove</button>
                </div>
                <Field label="Name" value={(p.name as string) || ""} onChange={(v) => { const cp = [...projects]; cp[i] = { ...cp[i], name: v }; set("projects", cp); }} />
                <TextArea label="Description" value={(p.description as string) || ""} onChange={(v) => { const cp = [...projects]; cp[i] = { ...cp[i], description: v }; set("projects", cp); }} />
                <Field label="Tech Stack" value={(p.techStack as string) || ""} onChange={(v) => { const cp = [...projects]; cp[i] = { ...cp[i], techStack: v }; set("projects", cp); }} />
                <Field label="Metric" value={(p.metric as string) || ""} onChange={(v) => { const cp = [...projects]; cp[i] = { ...cp[i], metric: v }; set("projects", cp); }} />
                <Field label="Tags (comma separated)" value={(p.tags as string[]).join(", ")} onChange={(v) => { const cp = [...projects]; cp[i] = { ...cp[i], tags: v.split(",").map((t: string) => t.trim()).filter(Boolean) }; set("projects", cp); }} />
              </div>
            ))}
          </div>
        )}

        {tab === "skills" && (
          <div className="space-y-6">
            <div className="border border-[var(--line)] p-5">
              <h3 className="mb-3 font-semibold">Core</h3>
              <Field label="Title" value={(skills.core as Record<string, string>).title} onChange={(v) => set("skills", { ...skills, core: { ...skills.core as Record<string, unknown>, title: v } })} />
              <Field label="Items (comma separated)" value={(skills.core as Record<string, string[]>).items.join(", ")} onChange={(v) => set("skills", { ...skills, core: { ...skills.core as Record<string, unknown>, items: v.split(",").map((t: string) => t.trim()).filter(Boolean) } })} />
            </div>
            {(skills.groups as Record<string, unknown>[]).map((g, i) => (
              <div key={i} className="border border-[var(--line)] p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold">{g.title as string}</h3>
                  <button onClick={() => { const cp = [...(skills.groups as Record<string, unknown>[])]; cp.splice(i, 1); set("skills", { ...skills, groups: cp }); }} className="text-xs text-red-500">Remove</button>
                </div>
                <Field label="Title" value={g.title as string} onChange={(v) => { const cp = [...(skills.groups as Record<string, unknown>[])]; cp[i] = { ...cp[i], title: v }; set("skills", { ...skills, groups: cp }); }} />
                <Field label="Items (comma separated)" value={(g.items as string[]).join(", ")} onChange={(v) => { const cp = [...(skills.groups as Record<string, unknown>[])]; cp[i] = { ...cp[i], items: v.split(",").map((t: string) => t.trim()).filter(Boolean) }; set("skills", { ...skills, groups: cp }); }} />
              </div>
            ))}
          </div>
        )}

        {tab === "writing" && (
          <div className="space-y-8">
            {writing.map((w, i) => (
              <div key={i} className="border border-[var(--line)] p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold">{w.title}</h3>
                  <button onClick={() => { const cp = [...writing]; cp.splice(i, 1); set("writing", cp); }} className="text-xs text-red-500">Remove</button>
                </div>
                <Field label="Title" value={w.title} onChange={(v) => { const cp = [...writing]; cp[i] = { ...cp[i], title: v }; set("writing", cp); }} />
                <Field label="Detail" value={w.detail} onChange={(v) => { const cp = [...writing]; cp[i] = { ...cp[i], detail: v }; set("writing", cp); }} />
                <Field label="Link" value={w.href} onChange={(v) => { const cp = [...writing]; cp[i] = { ...cp[i], href: v }; set("writing", cp); }} />
              </div>
            ))}
          </div>
        )}

        {tab === "now" && (
          <div className="space-y-4">
            <TextArea label="Line 1" value={now.line1} onChange={(v) => set("now", { ...now, line1: v })} />
            <TextArea label="Line 2" value={now.line2} onChange={(v) => set("now", { ...now, line2: v })} />
          </div>
        )}

        {tab === "contact" && (
          <div className="space-y-4">
            <TextArea label="CTA" value={contact.cta as string} onChange={(v) => set("contact", { ...contact, cta: v })} />
            <h3 className="text-sm font-semibold">Links</h3>
            {(contact.links as { label: string; href: string }[]).map((l, i) => (
              <div key={i} className="flex gap-3">
                <input value={l.label} onChange={(e) => { const cp = [...(contact.links as { label: string; href: string }[])]; cp[i] = { ...cp[i], label: e.target.value }; set("contact", { ...contact, links: cp }); }} className="flex-1 border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm" placeholder="Label" />
                <input value={l.href} onChange={(e) => { const cp = [...(contact.links as { label: string; href: string }[])]; cp[i] = { ...cp[i], href: e.target.value }; set("contact", { ...contact, links: cp }); }} className="flex-1 border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm" placeholder="URL" />
                <button onClick={() => { const cp = [...(contact.links as { label: string; href: string }[])]; cp.splice(i, 1); set("contact", { ...contact, links: cp }); }} className="text-xs text-red-500">X</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-[var(--muted)]">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm outline-none" />
    </div>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-[var(--muted)]">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="w-full border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm outline-none" />
    </div>
  );
}
