# Kravspecifikation – Integrerad nulägesanalys Kvalitet & Miljö

Version: 1.0 · 2026-09-10
SoT: docs/SOURCE_OF_TRUTH.md + lib/catalog/questions.ts
Startgrund: https://github.com/PaddeFTW/app-template
Design: Neutral Minimal

Dokumentet är Source of Truth. Ändra aldrig frågetext. Inga påhittade ISO-krav.

## Vision
Hjälpverktyg före kvalitets- och miljömanualen. Visa vad som redan finns och vilka gap (Nej / Delvis) som finns. Inte en PDF-kopia av blanketten. Inte ett ISO-betyg.

## v0-scope (block 1–6)
- Produktidentitet + sidebar: Översikt, Analyser, Gap, Register, Vägledning, Inställningar
- Auth: /login /signup /forgot /auth/callback · e-post+lösenord · magic link · Google, Facebook, GitHub
- Fallback localStorage om Supabase-env saknas. Krascha inte.
- Katalog från lib/catalog/questions.ts (exakt label + scope K|M|KM)
- Wizard: företagsinfo + avsnitt. Svar Ja/Nej/Delvis + anteckning. Autosave.
- Dölj rena M om bara K valt (och tvärtom). KM alltid synlig när minst ett system valt.
- Dölj 7.3 om 1-3.design = Nej.
- Täckning = besvarade synliga / synliga. Aldrig kalla det ISO-betyg.
- Gap = Nej + Delvis.
- Register/Vägledning/Inställningar: tomma states, inga fejkade poster.
- Stoppa före PDF/DOCX.

## Företagsfält
Företagets namn, Organisationsnummer, Adress, Postnummer och ort, Besöksadress, Mobil, Hemsida, E-post, Kommun / län, Kontaktperson i kvalitets- och miljöfrågor, Mobil / e-post kontaktperson, Antal anställda (män / kvinnor), System som ska ingå (K/M), Certifiering idag / mål.

## Compliance som får synas
ISO 9001, ISO 14001, GDPR för personregister, WCAG 2.2. Inte 45001, AFS, AML, BankID.
