"use client";

import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ChevronLeft, 
  Mail, 
  Phone, 
  Globe, 
  MessageSquare, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  MoreVertical,
  FileSignature,
  Zap,
  Clock,
  CheckCircle2,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showSuccess } from "@/utils/toast";

const LeadDetails = () => {
  const { leadId } = useParams();
  const navigate = useNavigate();

  // Mock data for a specific lead
  const lead = {
    id: "1",
    name: "TechFlow Solutions",
    contact: "Alex Rivera",
    role: "CEO & Founder",
    email: "alex@techflow.io",
    phone: "+1 (555) 123-4567",
    website: "www.techflow.io",
    value: "$12,000",
    stage: "Discovery",
    source: "Referral",
    probability: 65,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TF",
    description: "Looking for a complete brand overhaul and a high-performance marketing site for their Series A launch.",
    timeline: [
      { date: "Oct 28", action: "Initial discovery call completed", type: "call" },
      { date: "Oct 26", action: "Lead captured via referral", type: "source" },
      { date: "Oct 27", action: "Sent introductory deck", type: "email" }
    ]
  };

  const handleSendProposal = () => {
    showSuccess("Redirecting to proposal builder...");
    navigate("/proposal/new");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link to="/leads">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 rounded-2xl border-2 border-white shadow-md">
              <AvatarImage src={lead.avatar} />
              <AvatarFallback>TF</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900">{lead.name}</h1>
                <Badge className="bg-blue-50 text-blue-700 border-none">{lead.stage}</Badge>
              </div>
              <p className="text-slate-500">{lead.contact} • {lead.role}</p>
            </div>
          </div>
          <div className="ml-auto flex gap-3">
            <Button variant="outline" className="border-slate-200 gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2" onClick={handleSendProposal}>
              <FileSignature className="w-4 h-4" />
              Create Proposal
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Deal Info */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Deal Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-medium">Estimated Value</span>
                  </div>
                  <span className="font-bold text-slate-900">{lead.value}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Win Probability</span>
                    <span className="text-slate-900">{lead.probability}%</span>
                  </div>
                  <Progress value={lead.probability} className="h-1.5 bg-slate-100 [&>div]:bg-indigo-500" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-slate-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">Source</span>
                  </div>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none">
                    {lead.source}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{lead.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{lead.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{lead.website}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-indigo-50 border-indigo-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-indigo-600 mb-2">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">AI Sales Assistant</span>
                </div>
                <p className="text-sm text-indigo-900 font-medium">
                  This lead has a high probability of closing if a proposal is sent within the next 48 hours.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Activity & Notes */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="bg-white border border-slate-200 p-1 h-12 mb-6">
                <TabsTrigger value="activity" className="gap-2">Activity Feed</TabsTrigger>
                <TabsTrigger value="notes" className="gap-2">Notes</TabsTrigger>
                <TabsTrigger value="files" className="gap-2">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="space-y-6">
                <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  {lead.timeline.map((item, i) => (
                    <div key={i} className="relative">
                      <div className={cn(
                        "absolute -left-8 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shadow-sm",
                        item.type === "call" ? "bg-blue-500" : item.type === "email" ? "bg-indigo-500" : "bg-slate-400"
                      )}>
                        {item.type === "call" ? <Phone className="w-2.5 h-2.5 text-white" /> : 
                         item.type === "email" ? <Mail className="w-2.5 h-2.5 text-white" /> : 
                         <Clock className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.action}</p>
                        <p className="text-xs text-slate-400">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full border-dashed border-2 border-slate-200 text-slate-500">
                  Log New Activity
                </Button>
              </TabsContent>

              <TabsContent value="notes" className="space-y-4">
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-slate-900 mb-2">Project Requirements</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {lead.description}
                    </p>
                  </CardContent>
                </Card>
                <Button className="w-full bg-slate-50 text-slate-600 hover:bg-slate-100 border-none">
                  Add Private Note
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LeadDetails;