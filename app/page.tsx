"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ClipboardCheck, FilePlus2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Analysis, coverage, gaps, loadAnalyses } from "@/lib/analysis-store";

export default function HomePage() {
  const [analyses] = useState<Analysis[]>(() => loadAnalyses());
  const latest = analyses[0];
  return <main className="min-h-screen bg-background text-foreground"><div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
    <header className="flex items-center justify-between border-b border-border pb-6"><div><p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Kvalitetsgruppen</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Integrerad nulägesanalys</h1></div><nav className="flex gap-2"><Button asChild variant="ghost"><Link href="/guidance">Vägledning</Link></Button><Button asChild><Link href="/analysis/new"><FilePlus2 className="mr-2 size-4" />Ny analys</Link></Button></nav></header>
    <section className="grid gap-6 py-10 md:grid-cols-[1.35fr_.65fr]"><div className="rounded-2xl border border-border bg-card p-8"><p className="text-sm font-medium text-primary">Översikt</p><h2 className="mt-3 max-w-xl text-4xl font-semibold leading-tight tracking-tight">Se var verksamheten står – och vad som behöver göras härnäst.</h2><p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">Besvara frågor inom kvalitet och miljö. Analysen sparas lokalt i preview och visar Täckning samt Gap utan fejkade poster.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg"><Link href="/analysis/new">Skapa en analys <ArrowRight className="ml-2 size-4" /></Link></Button><Button asChild size="lg" variant="outline"><Link href="/gap">Visa Gap</Link></Button></div></div><div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1"><Metric icon={<Target />} label="Täckning" value={latest ? `${coverage(latest)}%` : "—"} /><Metric icon={<ClipboardCheck />} label="Gap" value={latest ? `${gaps(latest).length}` : "—"} /></div></section>
    <section className="border-t border-border pt-8"><div className="flex items-center justify-between"><div><h2 className="text-xl font-semibold">Senaste analyser</h2><p className="mt-1 text-sm text-muted-foreground">Dina sparade analyser visas här.</p></div><Button asChild variant="outline"><Link href="/registers">Register</Link></Button></div>{latest ? <div className="mt-5 rounded-xl border border-border bg-card p-5"><div className="flex items-center justify-between"><div><p className="font-medium">{latest.company || "Namnlös analys"}</p><p className="mt-1 text-sm text-muted-foreground">Uppdaterad {new Date(latest.updatedAt).toLocaleDateString("sv-SE")}</p></div><Button asChild variant="secondary"><Link href={`/analysis/${latest.id}/1`}>Fortsätt</Link></Button></div></div> : <div className="mt-5 rounded-xl border border-dashed border-border p-10 text-center"><p className="font-medium">Inga analyser ännu</p><p className="mt-2 text-sm text-muted-foreground">Skapa en analys för att börja svara på frågorna.</p></div>}</section>
  </div></main>
}
function Metric({icon,label,value}:{icon:React.ReactNode;label:string;value:string}) { return <div className="rounded-2xl border border-border bg-card p-6"><div className="flex items-center gap-3 text-muted-foreground">{icon}<span className="text-sm">{label}</span></div><p className="mt-5 text-4xl font-semibold">{value}</p></div> }
