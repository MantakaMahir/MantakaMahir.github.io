# Repository Notes

- This is a root-only Next.js app; there is no `src/` directory. App routes live in `app/`, shared UI lives in `components/`, and content loading lives in `data/loader.ts`.
- Use npm, not pnpm/yarn; `package-lock.json` is the committed lockfile.
- Commands: `npm run dev` starts Next on `http://localhost:3000`; `npm run build` verifies the static export; `npm run lint` runs ESLint.
- `next.config.ts` sets `output: "export"`, so avoid server-only Next features unless deployment changes away from static GitHub Pages.
- Public portfolio content is imported at build time from `data/content.json` through `data/loader.ts`.
- If editing portfolio copy, keep `data/content.json` and `public/content.json` in sync unless the content pipeline is changed.
- Styling uses Tailwind CSS v4 via `@tailwindcss/postcss` plus CSS variables in `app/globals.css`; preserve the existing `var(--background)`, `var(--foreground)`, `var(--muted)`, `var(--line)`, `var(--paper)`, and `var(--accent)` theme tokens.
- The `@/*` TypeScript path alias maps to the repository root, not `src`.
