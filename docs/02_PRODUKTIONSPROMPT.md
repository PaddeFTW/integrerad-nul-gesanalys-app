# Produktionsprompt – Integrerad nulägesanalys
**För Cursor / v0 / Lovable / Claude / Windsurf**

Kopiera hela prompten som första meddelande. Bygg ovanpå den klonade mallen. Bygg inte från noll.

---

Du är en senior Next.js + TypeScript + Tailwind + shadcn/ui + Supabase-utvecklare 2026.

Bygg SaaS-appen **Integrerad nulägesanalys – Kvalitet och miljö**.

### Startgrund (obligatorisk)
Repo: https://github.com/PaddeFTW/integrerad-nul-gesanalys-app
Mall: https://github.com/PaddeFTW/app-template

Återanvänd layout-skal, tokens, shadcn-primitives, sidebar, topbar, empty/loading/error. Ta inte bort foundation.

### Source of Truth
- docs/SOURCE_OF_TRUTH.md
- Extra fält från originalblanketten .dot enligt kravspec
- docs/01_KRAVSPECIFIKATION.md

Bevara 100 % av frågetexterna. Hitta inte på ISO-krav.

### Teknik
Next.js App Router, TypeScript strict, Tailwind, Neutral Minimal tokens
(#F9FAFB, #0EA5E9, #10B981, #D1D5DB, radius 8px, Inter),
shadcn/ui, Supabase Auth + Postgres + RLS, @supabase/ssr, lucide-react.

### Auth från början
/login /signup /forgot /auth/callback
E-post + lösenord, skapa konto, magic link, Google, Facebook, GitHub.

### Navigation
/dashboard /analysis/new /analysis/[id]/[step] /review /export
/registers/* /guidance /settings

Sidebar: Översikt · Analyser · Gap · Kunder · Leverantörer · Medarbetare · Blanketter · Organisation · Vägledning · Inställningar

### Wizard
Företag, 1–3, 4.1–4.2, 4.2.3–4.2.4, 5.1–5.6, 6, 7.1–7.6 (hoppa 7.3 om Nej), 8, granskning, export.
Frågerad: originaltext | K/M | Ja · Nej · Delvis | anteckning.

### Icke-mål
Inte återskapa .dot som PDF. Inte 45001/AFS. Inte ISO-mognadsbetyg.

Bygg v0 så preview kan logga in, skapa analys, svara i företag + ett avsnitt, se gap och spara.
