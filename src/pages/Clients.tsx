import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Mail, 
  MoreHorizontal, 
  ExternalLink,
  UserPlus,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const Clients = () => {
  const clients = [
    { 
      id: "c1", 
      name: "Acme Corp", 
      contact: "John Doe", 
      email: "john@acme.com", 
      status: "Active", 
      onboarding: "Completed",
      projects: 2,
      revenue: "$12,500"
    },
    { 
      id: "c2", 
      name: "Global Tech", 
      contact: "Sarah Smith", 
      email: "sarah@global.io", 
      status: "Active", 
      onboarding: "Pending Contract",
      projects: 1,
      revenue: "$8,200"
    },
    { 
      id: "c3", 
      name: "Zest Foods", 
      contact: "Mike Ross", 
      email: "mike@zest.com", 
      status: "Onboarding", 
      onboarding: "Questionnaire Sent",
      projects: 0,
      revenue: "$0"
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
            <p className="text-slate-500">Manage your client relationships and onboarding flows.</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
            <UserPlus className="w-4 h-4" />
            Invite New Client
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search by company or contact..." className="pl-10 bg-white border-slate-200" />
          </div>
          <Button variant="outline" className="border-slate-200">Filter</Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {clients.map((client) => (
            <Card key={client.id} className="border-none shadow-sm hover:shadow-md transition-all group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 rounded-xl">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${client.name}`} />
                      <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        {client.name}
                        {client.status === "Active" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      </h3>
                      <p className="text-sm text-slate-500">{client.contact} • {client.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="hidden md:block">
                      <p className="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Onboarding</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={cn(
                          "border-none",
                          client.onboarding === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                        )}>
                          {client.onboarding}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Total Revenue</p>
                      <p className="font-bold text-slate-900">{client.revenue}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link to={`/portal/${client.id}`}>
                        <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50 gap-2">
                          <ExternalLink className="w-4 h-4" />
                          Portal
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="text-slate-400">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

import { cn } from "@/lib/utils";
export default Clients;