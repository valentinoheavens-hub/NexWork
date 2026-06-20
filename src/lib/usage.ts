// Lightweight client-side monthly usage counter for soft plan gating
// (e.g. the Free-tier "5 AI contracts / month" cap). Keyed per user + month
// so it resets automatically each month. This is a UX guardrail, not a hard
// security boundary — definitive enforcement would live server-side.

export const AI_CONTRACTS = "ai_contracts";

const monthKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

const storageKey = (userId: string, metric: string) =>
  `rendahq_usage_${metric}_${userId}_${monthKey()}`;

export const getUsage = (userId: string, metric: string): number => {
  try {
    return parseInt(localStorage.getItem(storageKey(userId, metric)) ?? "0", 10) || 0;
  } catch {
    return 0;
  }
};

export const incrementUsage = (userId: string, metric: string): number => {
  const next = getUsage(userId, metric) + 1;
  try {
    localStorage.setItem(storageKey(userId, metric), String(next));
  } catch {
    /* storage unavailable — ignore */
  }
  return next;
};
