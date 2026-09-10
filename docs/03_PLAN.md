# Plan – Integrerad nulägesanalys-app

Kort byggplan. Repo: https://github.com/PaddeFTW/integrerad-nul-gesanalys-app  
Mall: https://github.com/PaddeFTW/app-template  
Design: Neutral Minimal  
Regel: v0 först. Merga inte till produktion förrän preview READY och sparloop fungerar.

## Läget nu

- Repo skapat som kopia av app-template (foundation, inget produktlager ännu).
- SoT och produktunderlag ligger i artifacts/nulagesanalys-app/ och i docs/ i detta repo.

## Steg

### 0. Foundation (klart som klon)
Behåll layout, tokens, primitives. Uppdatera lib/site-config.ts, README, PROJECT_BRIEF.

### 1. Auth (v0-block 1)
- Supabase-projekt + env
- E-post/lösenord, signup, magic link
- Provider-knappar Google / Facebook / GitHub
- Middleware + callback
- Acceptans: skapa konto och komma till tom dashboard

### 2. Datamodell
- SQL-migrationer för org, memberships, analyses, answers, register
- RLS
- Frågekatalog som TS-konstant

### 3. Wizard-skal
- Skapa analys (K/M)
- Stegnav + autosave
- Företagsinformation
- Ett komplett avsnitt (1–3) som mall för resten

### 4. Alla avsnitt
- Katalog → RequirementRow för 4–8
- Villkor: dölj M om bara K, dölj 7.3, hoppa org-schema

### 5. Gap + dashboard
- Täckning % = besvarade / synliga frågor
- Gaplista Nej/Delvis
- Status draft → in_progress → review

### 6. Register
- Kunder, leverantörer, medarbetare, arbetsdag, kompetens, blanketter, org-träd
- Befattningsblankett enligt originalfält

### 7. Granskning + export
- Saknade svar
- Utskriftsvy + JSON
- PDF/DOCX i v1

### 8. V1
- Flera org, bilagor, versioner, roller, riktig PDF

## Definition of Ready för preview

- Inloggning med e-post fungerar
- En analys kan skapas och återöppnas
- Minst 2 avsnitt sparas
- Gap speglar sparade Nej/Delvis
- Inga dummy-ISO-texter

## Risker

- Original .dot är ofullständigt i extraktet kring mitten – använd MD som komplett katalog.
- OAuth-providers kräver konsolkonfig; knappar ska finnas även om de failar tydligt i dev.
- Personuppgifter i register – RLS från dag ett.
