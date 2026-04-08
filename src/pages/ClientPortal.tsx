import React from "react";
import { useParams } from "react-router-dom";
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  MessageSquare, 
  Download,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ClientPortal = () => {
  const { clientId } = useParams();
  
  // Mock data for the client portal
  const clientBrand = {
    name: "Acme Corp",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=AC",
    primaryColor: "indigo",
  };

  const milestones = [
    { id: 1, title: "Discovery & Research", status: "Approved", date: "Oct 12, 2023" },
    { id: 2, title: "Initial Concepts", status: "Under Review", date: "Oct 28, 2023" },
    { id: 3, title: "Final Deliverables", status: "In Progress", date: "Nov 15, 2023" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Branded Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={clientBrand.logo} alt="Logo" className="w-10 h-10 rounded-lg" />
            <div>
              <h1 className="font-bold text-lg text-slate-900">Client Portal</h1>
              <p className="text-xs text-slate-500">Powered by NexWork</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-400">
              <MessageSquare className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
              JD
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
        {/* Welcome Section */}
        <div className="bg-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Welcome back, John</h2>
            <p className="text-indigo-100 max-w-md">
              Your project "Brand Identity Redesign" is currently 65% complete. 
              We're waiting for your feedback on the initial concepts.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="bg-white text-indigo-600 hover:bg-indigo-50 border-none">
                Review Deliverables
              </Button>
              <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10">
                View Contract
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Progress */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="milestones" className="w-full">
              <TabsList className="bg-white border border-slate-200 p-1 h-12">
                <TabsTrigger value="milestones" className="data-[state=active]:bg-slate-100">Milestones</TabsTrigger>
                <TabsTrigger value="files" className="data-[state=active]:bg-slate-100">Files & Assets</TabsTrigger>
                <TabsTrigger value="invoices" className="data-[state=active]:bg-slate-100">Invoices</TabsTrigger>
              </TabsList>
              
              <TabsContent value="milestones" className="mt-6 space-y-4">
                {milestones.map((m) => (
                  <Card key={m.id} className="border-none shadow-sm overflow-hidden">
                    <div className="flex items-center p-6">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0 mr-4",
                        m.status === "Approved" ? "bg-emerald-50 text-emerald-600" : 
                        m.status === "Under Review" ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-400"
                      )}>
                        {m.status === "Approved" ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-slate-900">{m.title}</h4>
                          <Badge variant="secondary" className={cn(
                            "border-none",
                            m.status === "Approved" ? "bg-emerald-50 text-emerald-700" : 
                            m.status === "Under Review" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"
                          )}>
                            {m.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-500">Target date: {m.date}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="ml-4 text-slate-400">
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="files" className="mt-6">
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6 text-center py-12">
                    <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="font-bold text-slate-900">No files shared yet</h3>
                    <p className="text-slate-500 max-w-xs mx-auto mt-2">
                      Once deliverables are uploaded, they will appear here for your review and download.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="invoices" className="mt-6 space-y-4">
                <Card className="border-none shadow-sm">
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Invoice #INV-2023-001</h4>
                        <p className="text-sm text-slate-500">Deposit Payment • Oct 01, 2023</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">$1,500.00</p>
                      <Badge className="bg-emerald-50 text-emerald-700 border-none">Paid</Badge>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Start Date</span>
                  <span className="font-medium text-slate-900">Oct 01, 2023</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Estimated End</span>
                  <span className="font-medium text-slate-900">Dec 15, 2023</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Total Budget</span>
                  <span className="font-medium text-slate-900">$5,000.00</span>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-amber-600 mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Scope Change Pending</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    A change order for "Additional Social Media Assets" is awaiting your approval.
                  </p>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white border-none">
                    Review Change Order
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-slate-900 text-white">
              <CardContent className="p-6">
                <h4 className="font-bold mb-2">Need help?</h4>
                <p className="text-slate-400 text-sm mb-4">
                  Message your project manager directly through the portal.
                </p>
                <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 border-none">
                  Open Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

import { cn } from "@/lib/utils";
export default ClientPortal;