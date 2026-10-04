"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  ClipboardCheck,
  FileJson,
  FileText,
  LayoutDashboard,
  Network,
  Plus,
  Save,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { QUESTIONS, SECTIONS, type AnswerValue } from "@/lib/catalog/questions";

const navItems = [
  { id: "overview", label: "Översikt", icon: LayoutDashboard },
  { id: "wizard", label: "Frågekatalog", icon: BookOpenCheck },
  { id: "gaps", label: "Gaplista", icon: ClipboardCheck },
  { id: "register", label: "Register", icon: Network },
  { id: "review", label: "Granskning", icon: ShieldCheck },
];

const registerItems = [
  ["Kunder", "0 poster", BriefcaseBusiness],
  ["Leverantörer", "0 poster", Network],
  ["Medarbetare", "0 poster", Users],
  ["Arbetsdag", "0 poster", ClipboardCheck],
  ["Kompetens", "0 poster", ShieldCheck],
  ["Blanketter", "0 poster", FileText],
];

export function AnalysisWorkspace() {
  const [active, setActive] = useState("overview");
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({
    "1-3.scope-whole": "yes",
    "1-3.design": "partial",
    "4.1.processes": "yes",
    "5.3.q-policy": "no",
    "5.4.measurable": "partial",
    "6.matrix": "no",
    "7.4.assess": "yes",
    "8.internal-audit": "partial",
  });

  const answered = Object.keys(answers).length;
  const coverage = Math.round((answered / QUESTIONS.length) * 100);
  const gaps = Object.entries(answers).filter(([, value]) => value !== "yes");
  const currentSection = SECTIONS.find((section) => QUESTIONS.some((question) => question.sectionId === section.id && !answers[question.id])) ?? SECTIONS[0];
  const sectionQuestions = QUESTIONS.filter((question) => question.sectionId === currentSection.id).slice(0, 5);

  const summary = useMemo(() => [
    { label: "Besvarade", value: answered, note: `av ${QUESTIONS.length}`, tone: "text-primary" },
    { label: "Täckning", value: `${coverage}%`, note: "andel besvarade", tone: "text-emerald-700" },
    { label: "Gap", value: gaps.length, note: "nej + delvis", tone: "text-amber-700" },
  ], [answered, coverage, gaps.length]);

  function setAnswer(id: string, value: AnswerValue) {
    setAnswers((current) => ({ ...current, [id]: value }));
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><ShieldCheck className="size-5" /></div>
            <div><p className="text-sm font-semibold tracking-tight">Nuläge</p><p className="text-xs text-muted-foreground">Integrerad nulägesanalys</p></div>
          </div>
          <div className="hidden items-center gap-3 sm:flex"><Badge variant="outline" className="gap-2"><span className="size-2 rounded-full bg-emerald-500" />Preview READY</Badge><Button variant="outline" size="sm"><Save data-icon="inline-start" />Sparloop aktiv</Button><Button size="sm">Skapa konto <ArrowRight data-icon="inline-end" /></Button></div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px]">
        <aside className="hidden w-64 shrink-0 border-r bg-background px-4 py-6 lg:block">
          <p className="px-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">Analys</p>
          <nav className="mt-3 flex flex-col gap-1">
            {navItems.map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => setActive(item.id)} className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors", active === item.id ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")}><Icon className="size-4" />{item.label}{item.id === "gaps" && <Badge variant="secondary" className="ml-auto">{gaps.length}</Badge>}</button>; })}
          </nav>
          <div className="mt-10 rounded-xl border bg-muted/40 p-4"><p className="text-sm font-medium">Din analys</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Autosparad lokalt i preview. Koppla datalager i nästa steg för teamåtkomst.</p><Button variant="link" className="mt-2 h-auto p-0 text-xs">Läs om sparloop <ChevronRight data-icon="inline-end" /></Button></div>
        </aside>

        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-medium text-primary">Välkommen tillbaka</p><h1 className="mt-1 text-3xl font-semibold tracking-tight">Få koll på nuläget</h1><p className="mt-2 max-w-2xl text-muted-foreground">Besvara frågorna utifrån verksamheten. Du kan återkomma när som helst — analysen sparas efter varje svar.</p></div><Button onClick={() => setActive("wizard")}>Fortsätt analysen <ArrowRight data-icon="inline-end" /></Button></div>

            <div className="mb-8 grid gap-4 md:grid-cols-3">{summary.map((item) => <Card key={item.label}><CardContent className="flex items-end justify-between p-5"><div><p className="text-sm text-muted-foreground">{item.label}</p><p className={cn("mt-1 text-3xl font-semibold", item.tone)}>{item.value}</p><p className="mt-1 text-xs text-muted-foreground">{item.note}</p></div><div className="rounded-lg bg-muted p-2"><Check className="size-4 text-muted-foreground" /></div></CardContent></Card>)}</div>

            {active === "overview" && <div className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
              <Card><CardHeader><div className="flex items-start justify-between gap-4"><div><CardTitle>Din arbetsyta</CardTitle><CardDescription>Nästa steg baserat på dina svar</CardDescription></div><Badge variant="secondary">Avsnitt {currentSection.id}</Badge></div></CardHeader><CardContent><div className="rounded-xl border bg-muted/30 p-5"><div className="flex items-start justify-between gap-4"><div><p className="font-medium">{currentSection.title}</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{currentSection.lead}</p></div><span className="rounded-full bg-background px-3 py-1 text-xs font-medium">Pågår</span></div><Progress value={Math.min(100, Math.round((sectionQuestions.filter((q) => answers[q.id]).length / Math.max(1, sectionQuestions.length)) * 100))} className="mt-5" /><div className="mt-5 flex justify-between text-xs text-muted-foreground"><span>{sectionQuestions.filter((q) => answers[q.id]).length} av {sectionQuestions.length} besvarade i vyn</span><Button variant="link" className="h-auto p-0" onClick={() => setActive("wizard")}>Öppna frågorna <ChevronRight data-icon="inline-end" /></Button></div></div></CardContent></Card>
              <Card><CardHeader><CardTitle>Snabb åtkomst</CardTitle><CardDescription>Bygg underlaget parallellt</CardDescription></CardHeader><CardContent className="grid gap-2">{registerItems.slice(0, 4).map(([label, count, Icon]) => <button key={label as string} onClick={() => setActive("register")} className="flex items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted"><div className="rounded-md bg-primary/10 p-2 text-primary"><Icon className="size-4" /></div><span className="flex-1 text-sm font-medium">{label as string}</span><span className="text-xs text-muted-foreground">{count as string}</span><ChevronRight className="size-4 text-muted-foreground" /></button>)}</CardContent></Card>
            </div>}

            {active === "wizard" && <Card><CardHeader><div className="flex items-center justify-between gap-3"><div><CardTitle>Frågekatalog</CardTitle><CardDescription>Exakt frågekatalog från källa till sanning. Svara ja, nej eller delvis.</CardDescription></div><Badge variant="outline"><Save data-icon="inline-start" />Sparat nyss</Badge></div></CardHeader><CardContent><div className="mb-6 flex gap-1 overflow-x-auto pb-1">{SECTIONS.slice(0, 8).map((section) => <Button key={section.id} variant={activeSection === section.id ? "default" : "outline"} size="sm" className="shrink-0 rounded-full" onClick={() => setActiveSection(section.id)}>{section.id}</Button>)}</div>{(() => { const section = SECTIONS.find((item) => item.id === activeSection) ?? SECTIONS[0]; return <div><div className="mb-5"><h3 className="font-semibold">{section.title}</h3><p className="mt-1 text-sm text-muted-foreground">{section.lead}</p></div><div className="flex flex-col gap-3">{QUESTIONS.filter((q) => q.sectionId === section.id).map((question) => <div key={question.id} className="flex flex-col gap-3 rounded-xl border p-4 md:flex-row md:items-center"><div className="flex-1"><p className="text-sm font-medium">{question.label}</p><p className="mt-1 text-xs text-muted-foreground">Område: {question.scope === "KM" ? "Kvalitet + miljö" : question.scope === "K" ? "Kvalitet" : "Miljö"}</p></div><div className="flex shrink-0 gap-2">{([['yes','Ja'],['partial','Delvis'],['no','Nej']] as [AnswerValue,string][]).map(([value, label]) => <Button key={value} size="sm" variant={answers[question.id] === value ? value === "yes" ? "default" : "secondary" : "outline"} onClick={() => setAnswer(question.id, value)}>{answers[question.id] === value && <Check data-icon="inline-start" />}{label}</Button>)}</div></div>)}</div></div>; })()}</CardContent></Card>}

            {active === "gaps" && <Card><CardHeader><div className="flex items-center justify-between"><div><CardTitle>Gaplista</CardTitle><CardDescription>Nej och delvis — utan att blanda ihop gap med ISO-poäng.</CardDescription></div><Badge variant="secondary">{gaps.length} identifierade</Badge></div></CardHeader><CardContent><div className="flex flex-col gap-3">{gaps.map(([id, value]) => { const question = QUESTIONS.find((q) => q.id === id); return <div key={id} className="flex items-center gap-4 rounded-xl border p-4"><div className={cn("rounded-full p-2", value === "no" ? "bg-destructive/10 text-destructive" : "bg-amber-500/10 text-amber-700")}><ClipboardCheck className="size-4" /></div><div className="flex-1"><p className="text-sm font-medium">{question?.label}</p><p className="mt-1 text-xs text-muted-foreground">Avsnitt {question?.sectionId}</p></div><Badge variant={value === "no" ? "destructive" : "outline"}>{value === "no" ? "Nej" : "Delvis"}</Badge></div>})}</div></CardContent></Card>}

            {active === "register" && <div><div className="mb-5 flex items-end justify-between"><div><h2 className="text-xl font-semibold">Register</h2><p className="mt-1 text-sm text-muted-foreground">Samla underlaget som behövs för en användbar analys.</p></div><Button><Plus data-icon="inline-start" />Ny post</Button></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{registerItems.map(([label, count, Icon]) => <Card key={label as string} className="transition-shadow hover:shadow-sm"><CardHeader><div className="flex items-center justify-between"><div className="rounded-lg bg-primary/10 p-2 text-primary"><Icon className="size-4" /></div><ChevronRight className="size-4 text-muted-foreground" /></div><CardTitle className="text-base">{label as string}</CardTitle><CardDescription>{count as string}</CardDescription></CardHeader></Card>)}</div><Card className="mt-4"><CardContent className="flex items-center gap-4 p-5"><div className="rounded-lg bg-muted p-2"><Network className="size-4" /></div><div className="flex-1"><p className="text-sm font-medium">Organisationsschema</p><p className="mt-1 text-xs text-muted-foreground">Visualisera roller, ansvar och kommunikation.</p></div><Button variant="outline">Öppna</Button></CardContent></Card></div>}

            {active === "review" && <Card><CardHeader><CardTitle>Granskning</CardTitle><CardDescription>Kontrollera analysen innan du exporterar.</CardDescription></CardHeader><CardContent className="flex flex-col gap-4"><div className="rounded-xl border bg-muted/30 p-5"><div className="flex items-center gap-3"><div className="rounded-full bg-emerald-500/10 p-2 text-emerald-700"><Check className="size-4" /></div><div><p className="font-medium">Analysen är redo för granskning</p><p className="text-sm text-muted-foreground">Täckning {coverage}% · {gaps.length} gap identifierade</p></div></div></div><div className="flex flex-wrap gap-3"><Button variant="outline"><FileJson data-icon="inline-start" />Exportera JSON</Button><Button variant="outline"><FileText data-icon="inline-start" />Skriv ut</Button></div><p className="text-xs text-muted-foreground">PDF och DOCX planeras i v1. Exporten här är avsiktligt begränsad till JSON och utskrift.</p></CardContent></Card>}
          </div>
        </main>
      </div>
    </div>
  );
}
