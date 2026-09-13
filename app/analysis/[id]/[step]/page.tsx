"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Analysis, getAnalysis, saveAnalysis, SECTIONS, sectionQuestions, visibleSections } from "@/lib/analysis-store";
import { COMPANY_FIELDS, AnswerValue } from "@/lib/catalog/questions";

const labels: { value: AnswerValue; label: string }[] = [{ value: "yes", label: "Ja" }, { value: "no", label: "Nej" }, { value: "partial", label: "Delvis" }];

export default function SectionPage() {
  const params = useParams<{ id: string; step: string }>();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<Analysis>();
  const step = Number(params.step);

  useEffect(() => setAnalysis(getAnalysis(params.id)), [params.id]);

  const sections = useMemo(() => analysis ? visibleSections(analysis) : [], [analysis]);
  const section = sections[step - 1];
  const questions = useMemo(() => analysis && section ? sectionQuestions(analysis, section.id) : [], [analysis, section]);

  if (!analysis || !section) return <main className="min-h-screen bg-background p-10">Analysen kunde inte hittas.</main>;
  const current = analysis;

  function save(next: Analysis) { const saved = { ...next, updatedAt: new Date().toISOString() }; setAnalysis(saved); saveAnalysis(saved); }
  function updateAnswer(id: string, value: AnswerValue) {
    const next = { ...current, answers: { ...current.answers, [id]: value }, design: id === "1-3.design" ? value : current.design };
    save(next);
  }
  function updateNote(id: string, value: string) { save({ ...current, notes: { ...current.notes, [id]: value } }); }
  function updateCompanyField(field: (typeof COMPANY_FIELDS)[number], value: string) {
    const companyFields = { ...current.companyFields, [field]: value };
    save({ ...current, company: field === COMPANY_FIELDS[0] ? value : current.company, companyFields });
  }
  function goNext() { if (step < sections.length) router.push(`/analysis/${current.id}/${step + 1}`); else router.push("/gap"); }
  function goPrevious() { if (step > 1) router.push(`/analysis/${current.id}/${step - 1}`); else router.push("/analysis/new"); }

  return <main className="min-h-screen bg-background px-6 py-8"><div className="mx-auto max-w-4xl">
    <div className="flex items-center justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{step} av {sections.length}</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">{section.title}</h1></div><Button asChild variant="outline"><Link href="/gap">Täckning &amp; Gap</Link></Button></div>
    <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{section.lead}</p>
    {section.id === "company" ? <div className="mt-8 rounded-xl border border-border bg-card p-5"><div className="grid gap-5 sm:grid-cols-2">{COMPANY_FIELDS.filter((field) => field !== "System som ska ingå").map((field) => <label key={field} className="grid gap-2 text-sm font-medium">{field}<input value={current.companyFields[field] || ""} onChange={(event) => updateCompanyField(field, event.target.value)} className="h-11 rounded-lg border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring" /></label>)}</div><fieldset className="mt-6"><legend className="text-sm font-medium">System som ska ingå</legend><div className="mt-3 flex gap-3">{(["K", "M"] as const).map((system) => <button type="button" key={system} onClick={() => { const systems = current.systems.includes(system) ? current.systems.filter((item) => item !== system) : [...current.systems, system]; if (systems.length) save({ ...current, systems }); }} className={`rounded-lg border px-5 py-3 text-sm font-medium ${current.systems.includes(system) ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{system}</button>)}</div></fieldset></div> : <div className="mt-8 flex flex-col gap-4">{questions.map((question) => <article key={question.id} className="rounded-xl border border-border bg-card p-5"><p className="font-medium leading-6">{question.label}</p><p className="mt-1 text-xs text-muted-foreground">{question.scope}</p><div className="mt-4 flex flex-wrap gap-2">{labels.map((item) => <button key={item.value} type="button" onClick={() => updateAnswer(question.id, item.value)} className={`rounded-md border px-4 py-2 text-sm ${current.answers[question.id] === item.value ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{item.label}</button>)}</div><textarea aria-label={`Anteckning för ${question.label}`} value={current.notes[question.id] || ""} onChange={(event) => updateNote(question.id, event.target.value)} placeholder="Anteckning eller underlag (valfritt)" className="mt-4 min-h-20 w-full resize-y rounded-lg border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></article>)}</div>}
    <div className="mt-8 flex justify-between"><Button variant="outline" onClick={goPrevious}>Föregående</Button><Button onClick={goNext}>{step < sections.length ? "Nästa avsnitt" : "Visa Täckning"}</Button></div>
  </div></main>;
}
