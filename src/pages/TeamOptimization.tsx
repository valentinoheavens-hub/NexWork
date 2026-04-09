"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Target, 
  HeartPulse, 
  Briefcase, 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2,
  MoreHorizontal,
  Plus,
  Compass,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

const TeamOptimization = () => {
  const team = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior UI/UX Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      alignment: 92,
      engagement: 88,
      vitality: 75,
      status: "Peak Performance",
      currentFocus: "Fintech Brand Identity",
      burnoutRisk: "Low"
    },
    {
      id: 2,
      name: "Marcus T.",
      role: "Full-stack Developer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      alignment: 85,
      engagement: 95,
      vitality: 42,
      status: "High Output / At Risk",
      currentFocus: "API Integration",
      burnoutRisk: "High"
    },
    {
      id: 3,
      name: "Elena Moss",
      role: "Project Manager",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
      alignment: 98,
      engagement: 90,
      vitality: 82,
      status: "Strategic Lead",
      currentFocus: "Q4 Planning",
      burnoutRisk: "Low"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Team Optimization & Vitality</h1>
            <p className="text-slate-500">Aligning human potential with organizational vision and well-being.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-slate-200">Vitality Report</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg shadow-indigo-100">
              <Plus className="w-4 h-4" />
              Add Team Member
            </Button>
          </div>
        </div>

        {/* Team Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm bg-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-white/10">
                  <Compass className="w-5 h-5" />
                </div>
                <Badge className="bg-white/20 text-white border-none">92% Avg</Badge>
              </div>
              <p className="text-indigo-100 text-sm font-medium">Vision Alignment</p>
              <h3 className="text-2xl font-bold">Strategic Synergy</h3>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <Zap className="w-5 h-5" />
                </div>
                <Badge className="bg-emerald-50 text-emerald-700 border-none">High</Badge>
              </div>
              <p className="text-sm font-medium text-slate-500">JD Engagement</p>
              <h3 className="text-2xl font-bold text-slate-900">Role Mastery</h3>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <Badge className="bg-rose-50 text-rose-700 border-none">1 At Risk</Badge>
              </div>
              <p className="text-sm font-medium text-slate-500">Team Vitality</p>
              <h3 className="text-2xl font-bold text-slate-900">Balance Score</h3>
            </CardContent>
          </Card>
        </div>

        {/* Staff Visualization Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Performance & Vitality Matrix</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-slate-500">All Staff</Button>
                <Button variant="ghost" size="sm" className="text-slate-500">At Risk</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {team.map((member) => (
                <Card key={member.id} className="border-none shadow-sm hover:shadow-md transition-all group">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Profile Info */}
                      <div className="flex items-center gap-4 min-w-[240px]">
                        <Avatar className="w-16 h-16 rounded-2xl border-2 border-slate-50">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{member.name}</h4>
                          <p className="text-xs text-slate-500 mb-2">{member.role}</p>
                          <Badge className={cn(
                            "border-none text-[10px]",
                            member.burnoutRisk === "High" ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"
                          )}>
                            {member.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="flex-1 grid grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span>Alignment</span>
                            <span className="text-slate-900">{member.alignment}%</span>
                          </div>
                          <Progress value={member.alignment} className="h-1.5 bg-slate-100 [&>div]:bg-indigo-500" />
                          <p className="text-[10px] text-slate-400">Vision Synergy</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span>Engagement</span>
                            <span className="text-slate-900">{member.engagement}%</span>
                          </div>
                          <Progress value={member.engagement} className="h-1.5 bg-slate-100 [&>div]:bg-emerald-500" />
                          <p className="text-[10px] text-slate-400">JD Fulfillment</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span>Vitality</span>
                            <span className={cn(
                              "font-bold",
                              member.vitality < 50 ? "text-rose-600" : "text-slate-900"
                            )}>{member.vitality}%</span>
                          </div>
                          <Progress value={member.vitality} className={cn(
                            "h-1.5 bg-slate-100",
                            member.vitality < 50 ? "[&>div]:bg-rose-500" : "[&>div]:bg-blue-500"
                          )} />
                          <p className="text-[10px] text-slate-400">Work-Life Balance</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-slate-400">
                          <Activity className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-400">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Current Workflow Footer */}
                    <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs text-slate-600">Current Focus: <span className="font-bold text-slate-900">{member.currentFocus}</span></span>
                      </div>
                      {member.burnoutRisk === "High" && (
                        <div className="flex items-center gap-1.5 text-rose-600 animate-pulse">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Intervention Recommended</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Strategic Insights Sidebar */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Organizational Alignment</CardTitle>
                <CardDescription>How the team maps to the company vision.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <div className="flex gap-3 mb-3">
                    <Target className="w-5 h-5 text-indigo-600 shrink-0" />
                    <p className="text-sm font-bold text-indigo-900">Vision: "Global Design Leader"</p>
                  </div>
                  <p className="text-xs text-indigo-700 leading-relaxed">
                    85% of current team tasks are directly contributing to this vision. 15% are administrative overhead.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Top Contributors</h4>
                  {[
                    { name: "Elena Moss", impact: "Strategic", score: 98 },
                    { name: "Sarah Chen", impact: "Creative", score: 92 },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        <span className="text-sm font-medium text-slate-700">{item.name}</span>
                      </div>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none text-[10px]">
                        {item.impact}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-slate-900 text-white">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-rose-500/20">
                  <HeartPulse className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Vitality Alert</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Marcus T. has exceeded 50 hours/week for 3 consecutive weeks. Vitality score has dropped by 30%.
                  </p>
                </div>
                <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold py-6 rounded-xl">
                  Schedule 1-on-1
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeamOptimization;