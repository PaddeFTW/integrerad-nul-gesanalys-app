"use client";

import Link from "next/link";
import { useState } from "react";
import { BarChart3, BookOpen, ClipboardCheck, FilePlus2, Gauge, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Analysis, coverage, gaps, loadAnalyses } from "@/lib/analysis-store";
import type { NavItem } from "@/types";

const NAV_ITEMS: NavItem[] = [
  { title: "Översikt", href: "/", icon: <Gauge className="size-4" /> },
  { title: "Ny analys", href: "/analysis/new", icon: <FilePlus2 className="size-4" /> },
  { title: "Täckning & Gap", href: "/gap", icon: <BarChart3 className="size-4" /> },
  { title: "Register", href: "/registers", icon: <ClipboardCheck className="size-4" /> },
  { title: "Vägledning", href: "/guidance", icon: <BookOpen className="size-4" /> },
  { title: "Inställningar", href: "/settings", icon: <Settings className="size-4" /> },
];

export default function GapPage() {
  const [analysis] = useState<Analysis | undefined>(() => loadAnalyses()[0]);

  if (!analysis) {
    return (
      <DashboardLayout title="Täckning & Gap" navigation={NAV_ITEMS}>
        <div className="mx-auto max-w-3xl">
          <div className="mt-8 rounded-xl border border-dashed border-border p-10 text-center">
            <p className="font-medium">Ingen analys att visa</p>
            <p className="mt-2 text-sm text-muted-foreground">Skapa en analys och börja svara på frågorna.</p>
            <Button asChild className="mt-5">
              <Link href="/analysis/new">Skapa analys</Link>
            </Button>
          </div>
          <div className="mt-6">
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Tillbaka till översikt</Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const items = gaps(analysis);

  return (
    <DashboardLayout title="Täckning & Gap" navigation={NAV_ITEMS}>
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Analysöversikt</p>
            <h2 className="mt-2 text-3xl font-semibold">Täckning & Gap</h2>
          </div>
          <Button asChild variant="outline">
            <Link href={`/analysis/${analysis.id}/1`}>Fortsätt svara</Link>
          </Button>
        </div>
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Täckning</p>
              <p className="mt-2 text-5xl font-semibold">{coverage(analysis)}%</p>
            </div>
            <p className="text-sm text-muted-foreground">Besvarade synliga frågor</p>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${coverage(analysis)}%` }} />
          </div>
        </div>
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Gap ({items.length})</h2>
          <p className="mt-1 text-sm text-muted-foreground">Frågor besvarade med Nej eller Delvis.</p>
          {items.length ? (
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="rounded-xl border border-border bg-card p-5">
                  <p className="font-medium">{item.label}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.sectionId} · {item.scope}</p>
                  {analysis.notes[item.id] ? <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">{analysis.notes[item.id]}</p> : null}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-border p-10 text-center">
              <p className="font-medium">Inga gap</p>
              <p className="mt-2 text-sm text-muted-foreground">Alla synliga frågor är besvarade med Ja.</p>
            </div>
          )}
        </section>
        <div className="mt-8 border-t border-border pt-6">
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Tillbaka till översikt</Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
