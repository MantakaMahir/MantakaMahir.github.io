"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { hero, contact } from "@/data/loader";
import { ThemeToggle } from "./ThemeToggle";

export function Portfolio({ sections }: { sections: { id: string; label: string; content: React.ReactNode }[] }) {
  const [active, setActive] = useState(0);
  return (
    <main id="home" className="portfolio-shell">
      <header className="portfolio-intro">
        <Image src="https://github.com/MantakaMahir.png" alt="Mantaka Mahir" width={82} height={78} unoptimized className="portfolio-portrait" />
        <h1 aria-label={`Hey, I'm ${hero.eyebrow}.`}>{`Hey, I'm ${hero.eyebrow}.`.split(" ").map((word, index) => <span aria-hidden="true" className="intro-word" style={{ "--word": index } as CSSProperties} key={index}>{word} </span>)}</h1>
        <p className="portfolio-position">{hero.headline}</p>
        <p className="portfolio-position">Co-founder @ <a href="https://gotiq.co/" target="_blank" rel="noreferrer">Gotiq ↗</a></p>
        <p className="portfolio-description" aria-label={hero.subheadline}>{hero.subheadline.split(" ").map((word, index) => <span aria-hidden="true" className="intro-word" style={{ "--word": index + 4 } as CSSProperties} key={index}>{word} </span>)}</p>
        <div className="portfolio-social">
          {contact.links.map(link => <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}
          <ThemeToggle />
        </div>
      </header>
      <nav className="portfolio-tabs" role="tablist" aria-label="Portfolio sections">
        {sections.map((section, index) => (
          <button key={section.id} type="button" id={`tab-${section.id}`} role="tab" aria-selected={active === index} aria-controls={`panel-${section.id}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
            const next = event.key === "ArrowRight" ? (index + 1) % sections.length : event.key === "ArrowLeft" ? (index + sections.length - 1) % sections.length : event.key === "Home" ? 0 : event.key === "End" ? sections.length - 1 : null;
            if (next !== null) { event.preventDefault(); setActive(next); document.getElementById(`tab-${sections[next].id}`)?.focus(); }
          }}>{section.label}</button>
        ))}
      </nav>
      {sections.map((section, index) => <div key={section.id} id={`panel-${section.id}`} className="portfolio-panel" role="tabpanel" aria-labelledby={`tab-${section.id}`} hidden={active !== index} tabIndex={0}>{section.content}</div>)}
      {active === 0 && <dl className="portfolio-snapshot">{hero.snapshot.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>}
      <footer className="portfolio-footer">{hero.eyebrow} · Dhaka, Bangladesh</footer>
    </main>
  );
}
