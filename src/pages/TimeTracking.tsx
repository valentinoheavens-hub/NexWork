import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Square, 
  Clock, 
  Calendar, 
  Download, 
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TimeTracking = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isTracking) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (s: number) => {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const logs = [
    { id: 1, project: "Brand Identity", client: "Acme Corp", date: "Today", duration: "02:45:00", status: "Unbilled" },
    { id: 2, project: "Mobile App UI", client: "Global Tech", date: "Yesterday", duration: "04:20:00", status: "Billed" },
    { id: 3, project: "Marketing Strategy", client: "Zest Foods", date: "Nov 01", duration: "01:15:00", status: "Billed" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Time Tracking</h1>
            <p className="text-slate-500">Log hours and auto-generate invoices from your work.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-slate-200 gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
              <Plus className="w-4 h-4" />
              Manual Entry
            </Button>
          </div>
        </div>

        {/* Active Timer */}
        <Card className={cn(
          "border-none shadow-lg transition-all duration-500",
          isTracking ? "bg-indigo-600 text-white ring-4 ring-indigo-100" : "bg-white"
        )}>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center",
                  isTracking ? "bg-white/20" : "bg-indigo-50 text-indigo-600"
                )}>
                  <Clock className="w-8 h-8" />
                </div>
                <div>
                  <p className={cn("text-sm font-medium mb-1", isTracking ? "text-indigo-100" : "text-slate-500")}>
                    {isTracking ? "Currently tracking time for..." : "Ready to start working?"}
                  </p>
                  <h2 className="text-2xl font-bold">
                    {isTracking ? "Brand Identity Redesign" : "Select a project to begin"}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className={cn("text-xs font-bold uppercase tracking-widest mb-1", isTracking ? "text-indigo-200" : "text-slate-400")}>Duration</p>
                  <p className="text-4xl font-mono font-bold tabular-nums">{formatTime(seconds)}</p>
                </div>
                <Button 
                  size="lg" 
                  onClick={() => setIsTracking(!isTracking)}
                  className={cn(
                    "h-16 w-16 rounded-full shadow-xl transition-transform active:scale-95",
                    isTracking ? "bg-white text-indigo-600 hover:bg-slate-100" : "bg-indigo-600 text-white hover:bg-indigo-700"
                  )}
                >
                  {isTracking ? <Square className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-bold">Recent Logs</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="w-4 h-4" /></Button>
                <span className="text-sm font-medium">Oct 30 - Nov 05</span>
                <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="w-4 h-4" /></Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-indigo-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{log.project}</h4>
                        <p className="text-sm text-slate-500">{log.client} • {log.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <p className="font-mono font-bold text-slate-900">{log.duration}</p>
                      <Badge className={cn(
                        "border-none",
                        log.status === "Billed" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                      )}>
                        {log.status}
                      </Badge>
                      <Button variant="ghost" size="icon" className="text-slate-400">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Weekly Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-2xl bg-slate-50">
                <p className="text-sm text-slate-500 mb-1">Total Hours</p>
                <p className="text-3xl font-bold text-slate-900">24.5 hrs</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50">
                <p className="text-sm text-emerald-600 mb-1">Billable Amount</p>
                <p className="text-3xl font-bold text-emerald-700">$1,837.50</p>
              </div>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Generate Invoice from Time
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

import { cn } from "@/lib/utils";
export default TimeTracking;