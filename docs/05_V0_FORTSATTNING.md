# Fortsättningsprompt till v0

Klistra in detta efter pull av latest main.

---

Blockeringen är löst. Source of Truth och kravspec finns i repot. Använd dem.

Godkänn och genomför din plan för block 1–6 oförändrat, med dessa låsningar:

1. Frågetext får bara komma från docs/SOURCE_OF_TRUTH.md eller den färdiga lib/catalog/questions.ts. Hitta inte på frågor.
2. Svar: yes | no | partial visas som Ja / Nej / Delvis.
3. Scope: K, M, KM. Dölj rena M-frågor om bara kvalitet är valt, och tvärtom. KM visas alltid när minst ett system är valt.
4. Dölj avsnitt 7.3 om svaret på 1-3.design är Nej.
5. Täckning = besvarade synliga frågor / synliga frågor. Kalla det Täckning, aldrig ISO-betyg.
6. Gap = Nej + Delvis.
7. Auth-routes och provider-knappar ska finnas. Om Supabase-env saknas: fallback localStorage, krascha inte.
8. Register/Vägledning/Inställningar: tomma states, inga fejkade poster.
9. Stoppa efter block 1–6. Ingen PDF/DOCX.

När preview är uppe: visa URL och hur man skapar en analys, svarar i företag + 1–3, ser Täckning och Gap.
