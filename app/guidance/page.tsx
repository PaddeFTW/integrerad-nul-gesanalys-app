import Link from "next/link";
import { BarChart3, BookOpen, ClipboardCheck, FilePlus2, Gauge, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import type { NavItem } from "@/types";

const NAV_ITEMS: NavItem[] = [
  { title: "Översikt", href: "/", icon: <Gauge className="size-4" /> },
  { title: "Ny analys", href: "/analysis/new", icon: <FilePlus2 className="size-4" /> },
  { title: "Täckning & Gap", href: "/gap", icon: <BarChart3 className="size-4" /> },
  { title: "Register", href: "/registers", icon: <ClipboardCheck className="size-4" /> },
  { title: "Vägledning", href: "/guidance", icon: <BookOpen className="size-4" /> },
  { title: "Inställningar", href: "/settings", icon: <Settings className="size-4" /> },
];

export default function GuidancePage() {
  return (
    <DashboardLayout title="Vägledning" navigation={NAV_ITEMS}>
      <div className="mx-auto max-w-3xl">
        <p className="mt-3 text-muted-foreground">Vägledning kopplas till analysens frågor när innehållet är tillgängligt.</p>
        <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
          <p className="font-medium">Ingen vägledning ännu</p>
          <p className="mt-2 text-sm text-muted-foreground">Det finns inget innehåll att visa.</p>
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
