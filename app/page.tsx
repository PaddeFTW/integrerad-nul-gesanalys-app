"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ClipboardCheck, FilePlus2, Target, BarChart3, BookOpen, Settings, Gauge } from "lucide-react";
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

export default function HomePage() {
  const [analyses] = useState<Analysis[]>(() => loadAnalyses());
  const latest = analyses[0];
  return (
    <DashboardLayout title="Integrerad nulägesanalys" navigation={NAV_ITEMS}>
      <div className="mx-auto max-w-6xl">
        <section className="grid gap-6 py-10 md:grid-cols-[1.35fr_.65fr]">
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-sm font-medium text-primary">Översikt</p>
            <h2 className="mt-3 max-w-xl text-4xl font-semibold leading-tight tracking-tight">Se var verksamheten står – och vad som behöver göras härnäst.</h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">Besvara frågor inom kvalitet och miljö. Analysen sparas lokalt i preview och visar Täckning samt Gap utan fejkade poster.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/analysis/new">Skapa en analys <ArrowRight className="ml-2 size-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/gap">Visa Gap</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            <Metric icon={<Target />} label="Täckning" value={latest ? `${coverage(latest)}%` : "—"} />
            <Metric icon={<ClipboardCheck />} label="Gap" value={latest ? `${gaps(latest).length}` : "—"} />
          </div>
        </section>
        <section className="border-t border-border pt-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Senaste analyser</h2>
              <p className="mt-1 text-sm text-muted-foreground">Dina sparade analyser visas här.</p>
            </div>
          </div>
          {latest ? (
            <div className="mt-5 rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{latest.company || "Namnlös analys"}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Uppdaterad {new Date(latest.updatedAt).toLocaleDateString("sv-SE")}</p>
                </div>
                <Button asChild variant="secondary">
                  <Link href={`/analysis/${latest.id}/1`}>Fortsätt</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-border p-10 text-center">
              <p className="font-medium">Inga analyser ännu</p>
              <p className="mt-2 text-sm text-muted-foreground">Skapa en analys för att börja svara på frågorna.</p>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-3 text-muted-foreground">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <p className="mt-5 text-4xl font-semibold">{value}</p>
    </div>
  );
}
