import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  FileUp, 
  MessageSquare,
  History,
  ArrowRight,
  MoreVertical
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [showScopeModal, setShowScopeModal] = useState(false);

  const project = {
    name: "Brand Identity Redesign",
    client: "Acme Corp",
    progress: 65,
    status: "In Progress",
    budget: "$5,000",
    spent: "$3,250",
    milestones: [
      { id: 1, title: "Discovery & Moodboards", status: "Approved", date: "Oct 12", revisions: "1/2" },
      { id: 2, title: "Logo Concepts", status: "Under Review", date: "Oct 28", revisions: "2/2" },
      { id: 3, title: "Brand Guidelines", status: "In Progress", date: "Nov 15", revisions: "0/2" },
      { id: 4, title: "Final Assets", status: "Not Started", date: "Nov 30", revisions: "0/2" },
    ]
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Project Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link to="/dashboard" className="text-slate-400 hover:text-slate-600 text-sm">Projects</Link>
              <ArrowRight className="w-3 h-3 text-slate-300" />
              <span className="text-sm font-medium text-slate-600">{project.client}</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-slate-200 gap-2" onClick={() => setShowScopeModal(true)}>
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Request Scope Change
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
              <Plus className="w-4 h-4" />
              Add Milestone
            </Button>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-slate-500 mb-4">Overall Progress</p>
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold text-slate-900">{project.progress}%</span>
                <span className="text-sm text-slate-500">2/4 Milestones</span>
              </div>
              <Progress value={project.progress} className="h-2 bg-slate-100" />
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-slate-500 mb-4">Budget Utilization</p>
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold text-slate-900">{project.spent}</span>
                <span className="text-sm text-slate-500">of {project.budget}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: '65%' }} />
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-indigo-600 text-white">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-indigo-100 mb-4">Next Deadline</p>
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-indigo-200" />
                <div>
                  <p className="text-xl font-bold">Nov 15, 2023</p>
                  <p className="text-sm text-indigo-100">Brand Guidelines</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="milestones" className="w-full">
          <TabsList className="bg-white border border-slate-200 p-1 h-12">
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
            <TabsTrigger value="scope">Scope History</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="milestones" className="mt-6 space-y-4">
            {project.milestones.map((m) => (
              <Card key={m.id} className="border-none shadow-sm overflow-hidden group">
                <div className="flex items-center p-6">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 mr-4",
                    m.status === "Approved" ? "bg-emerald-50 text-emerald-600" : 
                    m.status === "Under Review" ? "bg-amber-50 text-amber-600" : 
                    m.status === "In Progress" ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-400"
                  )}>
                    {m.status === "Approved" ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-slate-900">{m.title}</h4>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-medium text-slate-400">Revisions: {m.revisions}</span>
                        <Badge className={cn(
                          "border-none",
                          m.status === "Approved" ? "bg-emerald-50 text-emerald-700" : 
                          m.status === "Under Review" ? "bg-amber-50 text-amber-700" : 
                          m.status === "In Progress" ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-600"
                        )}>
                          {m.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500">Due {m.date}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-6">
                    <Button variant="ghost" size="sm" className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Upload Deliverable
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-400">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="scope" className="mt-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Scope Audit Trail</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  {[
                    { title: "Original Contract Signed", date: "Oct 01, 2023", desc: "Initial scope for Brand Identity Redesign.", type: "contract" },
                    { title: "Change Order #1 Approved", date: "Oct 15, 2023", desc: "Added 3 social media templates. +$450", type: "change" },
                    { title: "Change Order #2 Pending", date: "Nov 02, 2023", desc: "Request for additional business card designs.", type: "pending" },
                  ].map((item, i) => (
                    <div key={i} className="relative pl-10">
                      <div className={cn(
                        "absolute left-0 top-1 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center z-10",
                        item.type === "contract" ? "bg-indigo-600" : 
                        item.type === "change" ? "bg-emerald-500" : "bg-amber-500"
                      )}>
                        {item.type === "contract" ? <FileUp className="w-3 h-3 text-white" /> : <History className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-bold text-slate-900">{item.title}</h5>
                          <span className="text-xs text-slate-400">{item.date}</span>
                        </div>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
export default ProjectDetail;