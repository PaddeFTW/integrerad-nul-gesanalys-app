"use client";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Analysis, getAnalysis, saveAnalysis, SECTIONS, sectionQuestions } from "@/lib/analysis-store";
import type { AnswerValue } from "@/lib/catalog/questions";
const labels: { value: AnswerValue; label: string }[] = [{ value: "yes", label: "Ja" }, { value: "no", label: "Nej" }, { value: "partial", label: "Delvis" }];
export default function SectionPage() {
  const params = useParams<{ id: string; step: string }>(); const router = useRouter(); const [analysis, setAnalysis] = useState<Analysis>(); const step = Number(params.step); const section = SECTIONS[step - 1];

  const questions = useMemo(() => analysis && section ? sectionQuestions(analysis, section.id) : [], [analysis, section]);
  if (!analysis || !section) return <main className="p-10">Analysen kunde inte hittas.</main>;
  const current = analysis;
  function update(id: string, value: AnswerValue) { const next: Analysis = { ...current, answers: { ...current.answers, [id]: value }, updatedAt: new Date().toISOString() }; setAnalysis(next); saveAnalysis(next); }
  function note(id: string, value: string) { const next: Analysis = { ...current, notes: { ...current.notes, [id]: value }, updatedAt: new Date().toISOString() }; setAnalysis(next); saveAnalysis(next); }
  const nextStep = step + 1;
  return <main className="min-h-screen bg-background px-6 py-8"><div className="mx-auto max-w-4xl"><div className="flex items-center justify-between"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{step} av {SECTIONS.length}</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">{section.title}</h1></div><Button variant="outline" onClick={() => router.push("/gap")}>Täckning & Gap</Button></div><p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{section.lead}</p><div className="mt-8 space-y-4">{questions.map((question) => <article key={question.id} className="rounded-xl border border-border bg-card p-5"><p className="font-medium leading-6">{question.label}</p><p className="mt-1 text-xs text-muted-foreground">{question.scope === "KM" ? "Kvalitet + miljö" : question.scope === "K" ? "Kvalitet" : "Miljö"}</p><div className="mt-4 flex flex-wrap gap-2">{labels.map((item) => <button key={item.value} type="button" onClick={() => update(question.id, item.value)} className={`rounded-md border px-4 py-2 text-sm ${analysis.answers[question.id] === item.value ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{item.label}</button>)}</div><textarea aria-label={`Anteckning för ${question.label}`} value={analysis.notes[question.id] || ""} onChange={(event) => note(question.id, event.target.value)} placeholder="Anteckning eller underlag (valfritt)" className="mt-4 min-h-20 w-full resize-y rounded-lg border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></article>)}</div><div className="mt-8 flex justify-between"><Button variant="outline" disabled={step === 1} onClick={() => router.push(`/analysis/${analysis.id}/${step - 1}`)}>Föregående</Button><Button onClick={() => nextStep <= SECTIONS.length ? router.push(`/analysis/${analysis.id}/${nextStep}`) : router.push("/gap")}>{nextStep <= SECTIONS.length ? "Nästa avsnitt" : "Visa Täckning"}</Button></div></div></main>;
}
