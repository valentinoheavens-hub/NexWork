"use client";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff, Loader2, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { showError, showSuccess } from "@/utils/toast";

type Phase = "checking" | "ready" | "invalid" | "done";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [phase, setPhase] = useState<Phase>("checking");

  // supabase-js auto-parses the recovery token from the URL hash on load and
  // fires PASSWORD_RECOVERY with a temporary session. We confirm a session
  // exists before showing the form.
  useEffect(() => {
    let settled = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") && session) {
        settled = true;
        setPhase("ready");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        settled = true;
        setPhase("ready");
        return;
      }
      // Give the client a moment to process the URL hash, then decide.
      setTimeout(() => {
        if (settled) return;
        supabase.auth.getSession().then(({ data: { session } }) => {
          setPhase(session ? "ready" : "invalid");
        });
      }, 2000);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { showError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { showError("Passwords don't match."); return; }

    setIsSaving(true);
    const { error } = await supabase.auth.updateUser({ password });
    setIsSaving(false);

    if (error) { showError(error.message); return; }
    setPhase("done");
    showSuccess("Password updated!");
    setTimeout(() => navigate("/dashboard", { replace: true }), 1400);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-10">
          <img src="/rendahq-logo.png" alt="RendaHQ" className="h-10 w-auto" />
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          {phase === "checking" && (
            <div className="py-10 flex flex-col items-center text-center">
              <Loader2 className="w-7 h-7 text-emerald-600 animate-spin mb-3" />
              <p className="text-slate-500 text-sm">Verifying your reset link…</p>
            </div>
          )}

          {phase === "invalid" && (
            <div className="py-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-rose-500" />
              </div>
              <h1 className="text-xl font-black text-slate-900 mb-2">Link expired or invalid</h1>
              <p className="text-slate-500 text-sm mb-6">
                This password reset link is no longer valid. Request a new one from the sign-in page.
              </p>
              <Link to="/signin">
                <Button className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl">
                  Back to sign in
                </Button>
              </Link>
            </div>
          )}

          {phase === "done" && (
            <div className="py-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <h1 className="text-xl font-black text-slate-900 mb-2">Password updated</h1>
              <p className="text-slate-500 text-sm">Taking you to your dashboard…</p>
            </div>
          )}

          {phase === "ready" && (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-black text-slate-900 mb-1">Set a new password</h1>
                <p className="text-slate-500 text-sm">Choose a strong password for your RendaHQ account.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-slate-700 font-medium text-sm">New password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pl-10 pr-10 border-slate-200 focus-visible:ring-emerald-500"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirm" className="text-slate-700 font-medium text-sm">Confirm password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="confirm"
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      className="h-11 pl-10 border-slate-200 focus-visible:ring-emerald-500"
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSaving}
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl mt-2 gap-2"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Update password <ArrowRight className="w-4 h-4" /></>}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
