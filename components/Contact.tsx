import { contact } from "@/data/loader";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let's connect">
      <p className="max-w-3xl text-2xl leading-10 tracking-[-0.015em] text-[var(--foreground)] text-pretty">{contact.cta}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {contact.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
            className="border border-[var(--line)] bg-[var(--paper)] px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[var(--foreground)]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </Section>
  );
}
