import { contact } from "@/data/content";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let's connect">
      <p className="max-w-2xl text-xl leading-9 text-[var(--muted)]">{contact.cta}</p>
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
