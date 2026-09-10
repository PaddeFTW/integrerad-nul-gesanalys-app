# Integrerad nulägesanalys – Kvalitet och miljö

Digital produkt för gemensam nulägesanalys inför kvalitets- och miljömanual enligt ISO 9001 och ISO 14001.

Startgrund: [app-template](https://github.com/PaddeFTW/app-template). Bygg aldrig från noll.

## Source of Truth

- `docs/SOURCE_OF_TRUTH.md`
- Originalblankett: Nulägesanalys Kvalitet och Miljö (.dot)
- `docs/01_KRAVSPECIFIKATION.md`

Dokumentet är Source of Truth. Ändra inte frågetexterna.

## Stack

Next.js App Router · TypeScript · Tailwind · shadcn/ui · Supabase

Design: Neutral Minimal (Notion / Linear / Apple / Arc / Raycast)

## Auth

E-post + lösenord, skapa konto, magic link, Google, Facebook, GitHub.

## Docs

- `docs/01_KRAVSPECIFIKATION.md`
- `docs/02_PRODUKTIONSPROMPT.md`
- `docs/03_PLAN.md`
- `docs/04_STARTPROMPT.md`

## Dev

```bash
npm install
npm run dev
```

v0 först. Merga inte till produktion förrän preview READY och sparloop fungerar.
