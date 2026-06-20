import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

// Reusable nudge shown when a Free-tier user hits a plan limit.
export const UpgradeBanner = ({
  title,
  message,
  cta = "Upgrade",
}: {
  title: string;
  message: string;
  cta?: string;
}) => (
  <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-amber-50 border border-amber-200 px-5 py-4">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
        <Sparkles className="w-5 h-5 text-amber-600" />
      </div>
      <div>
        <p className="font-bold text-amber-900">{title}</p>
        <p className="text-sm text-amber-700">{message}</p>
      </div>
    </div>
    <Link to="/billing" className="shrink-0">
      <button className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold px-4 py-2">
        {cta} <ArrowRight className="w-4 h-4" />
      </button>
    </Link>
  </div>
);

export default UpgradeBanner;
