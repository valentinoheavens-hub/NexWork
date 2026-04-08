import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  Clock, 
  AlertCircle,
  ArrowUpRight,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const stats = [
    { title: "Total Revenue", value: "$12,450", change: "+12.5%", icon: TrendingUp, color: "text-emerald-600" },
    { title: "Active Clients", value: "8", change: "+2", icon: Users, color: "text-blue-600" },
    { title: "Pending Invoices", value: "$3,200", change: "4 total", icon: Clock, color: "text-amber-600" },
    { title: "Scope Changes", value: "3", change: "Awaiting approval", icon: AlertCircle, color: "text-rose-600" },
  ];

  const recentProjects = [
    { id: 1, name: "Brand Identity", client: "Acme Corp", status: "In Progress", health: "Healthy", progress: 65 },
    { id: 2, name: "Mobile App UI", client: "Global Tech", status: "Under Review", health: "At Risk", progress: 90 },
    { id: 3, name: "Marketing Strategy", client: "Zest Foods", status: "Completed", health: "Healthy", progress: 100 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, Felix</h1>
          <p className="text-slate-500">Here's what's happening with your business today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-2 rounded-lg bg-slate-50", stat.color)}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none">
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Projects */}
          <Card className="lg:col-span-2 border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-bold">Active Projects</CardTitle>
              <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-indigo-100 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                        {project.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{project.name}</h4>
                        <p className="text-sm text-slate-500">{project.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="hidden md:block">
                        <p className="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Status</p>
                        <Badge className={cn(
                          "border-none",
                          project.status === "Completed" ? "bg-emerald-50 text-emerald-700" : 
                          project.status === "Under Review" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"
                        )}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="w-32 hidden sm:block">
                        <p className="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Progress</p>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-600 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-slate-400 group-hover:text-slate-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { user: "Sarah M.", action: "signed the contract", time: "2h ago", type: "contract" },
                  { user: "Acme Corp", action: "paid invoice #INV-001", time: "5h ago", type: "payment" },
                  { user: "Global Tech", action: "requested a scope change", time: "1d ago", type: "scope" },
                ].map((activity, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-900">
                        <span className="font-bold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-slate-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6 border-slate-200 text-slate-600">
                View Full Audit Log
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

import { cn } from "@/lib/utils";
export default Dashboard;