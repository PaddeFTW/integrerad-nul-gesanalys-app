# Startprompt – v0 / Cursor

Klistra in detta som första chat i Cursor eller v0 mot checkout av  
https://github.com/PaddeFTW/integrerad-nul-gesanalys-app

---

Bygg produktlagret för **Integrerad nulägesanalys – Kvalitet och miljö** ovanpå den här mallen. Ta inte bort app-template-foundation.

Läs först:
- docs/01_KRAVSPECIFIKATION.md
- docs/02_PRODUKTIONSPROMPT.md
- docs/SOURCE_OF_TRUTH.md
- DESIGN_SYSTEM.md + Neutral Minimal (bg #F9FAFB, accent #0EA5E9, radius 8px, Inter)

Gör i denna ordning, committa efter varje block:

1. Byt lib/site-config.ts till produktnamnet Integrerad nulägesanalys.
2. Lägg Supabase-klient (@supabase/ssr, @supabase/supabase-js), middleware, /login /signup /forgot /auth/callback.
   Inloggning: e-post+lösenord, skapa konto, magic link, knappar Google / Facebook / GitHub.
3. DashboardLayout: Översikt, Analyser, Gap, Register, Vägledning, Inställningar.
4. lib/catalog/questions.ts med alla frågor från SOURCE_OF_TRUTH (exakt text, scope K/M/KM).
5. Skapa analys + wizard för Företag + Avsnitt 1–3 med Ja/Nej/Delvis + anteckning + autosave (Supabase, fallback localStorage om env saknas).
6. Gaplista och täckning (andel besvarade – kalla det inte ISO-betyg).

Stoppa och visa preview-URL när block 1–6 fungerar. Fortsätt inte med PDF eller extra ISO-avsnitt.

Regler:
- Next.js App Router, TypeScript strict, Tailwind, shadcn/ui
- Dokumentet är Source of Truth – ändra inte frågetext
- Digitalisera till UX, återskapa inte blanketten som PDF
- Mobil-first, låg kognitiv belastning
- Inget Laser-tema, ingen ERP-känsla
