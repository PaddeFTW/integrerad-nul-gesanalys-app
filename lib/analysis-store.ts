import { AnswerValue, CatalogQuestion, QUESTIONS, SECTIONS, Scope } from "@/lib/catalog/questions";

export type SystemScope = "K" | "M" | "KM";
export type Analysis = {
  id: string;
  company: string;
  systems: SystemScope[];
  design: AnswerValue | null;
  answers: Record<string, AnswerValue>;
  notes: Record<string, string>;
  createdAt: string;
  updatedAt: string;
};

const key = "nulagesanalys:analyses";

export function visibleQuestions(analysis: Analysis): CatalogQuestion[] {
  const hasK = analysis.systems.includes("K");
  const hasM = analysis.systems.includes("M");
  return QUESTIONS.filter((question) => {
    const scopeVisible = question.scope === "KM" || (question.scope === "K" && hasK) || (question.scope === "M" && hasM);
    return scopeVisible && !(question.sectionId === "7.3" && analysis.design === "no");
  });
}

export function sectionQuestions(analysis: Analysis, sectionId: string) {
  return visibleQuestions(analysis).filter((question) => question.sectionId === sectionId);
}

export function coverage(analysis: Analysis) {
  const visible = visibleQuestions(analysis);
  const answered = visible.filter((question) => analysis.answers[question.id]).length;
  return visible.length ? Math.round((answered / visible.length) * 100) : 0;
}

export function gaps(analysis: Analysis) {
  return visibleQuestions(analysis).filter((question) => ["no", "partial"].includes(analysis.answers[question.id]));
}

export function loadAnalyses(): Analysis[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(window.localStorage.getItem(key) || "[]"); } catch { return []; }
}

export function saveAnalysis(analysis: Analysis) {
  if (typeof window === "undefined") return;
  const all = loadAnalyses().filter((item) => item.id !== analysis.id);
  window.localStorage.setItem(key, JSON.stringify([analysis, ...all]));
}

export function newAnalysis(company = "") : Analysis {
  const now = new Date().toISOString();
  return { id: crypto.randomUUID(), company, systems: ["K", "M"], design: null, answers: {}, notes: {}, createdAt: now, updatedAt: now };
}

export function getAnalysis(id: string) { return loadAnalyses().find((analysis) => analysis.id === id); }
export { SECTIONS };
export const scopeLabel: Record<Scope, string> = { K: "Kvalitet", M: "Miljö", KM: "Kvalitet + miljö" };
