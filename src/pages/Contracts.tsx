"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Sparkles, 
  FileText, 
  Search, 
  Plus, 
  MoreVertical,
  CheckCircle2,
  Clock,
  History,
  ArrowRight,
  Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { showSuccess } from "@/utils/toast";

const Contracts = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [description, setDescription] = useState("");
  const [serviceType, setServiceType] = useState("Design Services");

  const contracts = [
    { id: 1, title: "Brand Identity Agreement", client: "Acme Corp", status: "Signed", date: "Oct 01, 2023", value: "$5,000" },
    { id: 2, title: "UI/UX Design Services", client: "Global Tech", status: "Sent", date: "Oct 28, 2023", value: "$8,500" },
    { id: 3, title: "Marketing Advisory", client: "Zest Foods", status: "Draft", date: "Nov 02, 2023", value: "$2,000" },
  ];

  const handleGenerate = () => {
    if (!description) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      setIsGenerating(false);
      showSuccess("AI Draft Generated! Opening editor...");
      // In a real app, we'd pass the generated content to the editor
      navigate("/contract/edit/new-draft");
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Contracts</h1>
            <p className="text-slate-500">Manage agreements and generate new ones with AI.</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            New Contract
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Generator Tool */}
          <Card className="lg:col-span-1 border-none shadow-sm bg-indigo-50 border-indigo-100 relative overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-2 text-indigo-600 mb-1">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">AI Contract Builder</span>
              </div>
              <CardTitle className="text-lg font-bold">Generate from Scope</CardTitle>
              <CardDescription>
                Describe your project scope in plain English and our AI will draft a professional contract.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Project Description</label>
                <Textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. I'm designing a 5-page website for a law firm. Includes brand guidelines, 2 rounds of revisions, and delivery in 4 weeks."
                  className="min-h-[150px] bg-white border-slate-200 focus:ring-indigo-500 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Service Type</label>
                <select 
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Design Services</option>
                  <option>Software Development</option>
                  <option>Consulting</option>
                  <option>Legal Advisory</option>
                </select>
              </div>
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-xl font-bold group"
                onClick={handleGenerate}
                disabled={isGenerating || !description}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing Scope...
                  </>
                ) : (
                  <>
                    Generate Contract Draft
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </CardContent>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-200/20 rounded-full blur-3xl" />
          </Card>

          {/* Contract List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Search contracts..." className="pl-10 bg-white border-slate-200 rounded-xl" />
              </div>
              <Button variant="outline" className="border-slate-200 rounded-xl">Filter</Button>
            </div>

            {contracts.map((contract) => (
              <Card key={contract.id} className="border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        contract.status === "Signed" ? "bg-emerald-50 text-emerald-600" : 
                        contract.status === "Sent" ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-400"
                      )}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{contract.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-slate-500">{contract.client}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-sm text-slate-500">{contract.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <p className="font-bold text-slate-900">{contract.value}</p>
                        <Badge className={cn(
                          "border-none",
                          contract.status === "Signed" ? "bg-emerald-50 text-emerald-700" : 
                          contract.status === "Sent" ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-600"
                        )}>
                          {contract.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-slate-400">
                          <History className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-400">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Contracts;