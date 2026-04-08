import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Save, 
  Send, 
  Download, 
  Eye,
  Bold,
  Italic,
  List,
  Type
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const ContractEditor = () => {
  const navigate = useNavigate();
  const { contractId } = useParams();
  const [content, setContent] = useState(`
# SERVICE AGREEMENT

**Date:** October 28, 2023
**Provider:** NexWork Design Studio
**Client:** Acme Corp

## 1. Scope of Work
The Provider agrees to deliver a complete Brand Identity Redesign including:
- Primary and Secondary Logos
- Color Palette & Typography Guidelines
- Social Media Kit (5 platforms)
- 2 Rounds of Revisions

## 2. Payment Terms
The total project fee is $5,000.00. A 50% deposit is required before work commences. The remaining 50% is due upon final approval of deliverables.

## 3. Timeline
Work will commence on November 1, 2023, with an estimated completion date of December 15, 2023.
  `);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/contracts")}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Edit Contract</h1>
              <p className="text-slate-500">Brand Identity Agreement • Acme Corp</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Eye className="w-4 h-4" /> Preview
            </Button>
            <Button variant="outline" className="gap-2">
              <Save className="w-4 h-4" /> Save Draft
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
              <Send className="w-4 h-4" /> Send to Client
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card className="border-none shadow-sm min-h-[800px]">
              <div className="border-b border-slate-100 p-2 flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8"><Bold className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Italic className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><List className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Type className="w-4 h-4" /></Button>
              </div>
              <CardContent className="p-8">
                <Textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[700px] border-none focus-visible:ring-0 text-lg leading-relaxed font-serif resize-none"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">Contract Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-400">Status</p>
                  <p className="text-sm font-bold text-amber-600">Draft</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-400">Last Edited</p>
                  <p className="text-sm text-slate-900">2 minutes ago</p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="w-4 h-4" /> Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-indigo-50 border-indigo-100">
              <CardContent className="p-6">
                <h4 className="font-bold text-indigo-900 mb-2">AI Assistant</h4>
                <p className="text-sm text-indigo-700 mb-4">
                  I've reviewed your contract. Would you like me to add a standard "Intellectual Property" clause?
                </p>
                <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 border-none">
                  Add Clause
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContractEditor;