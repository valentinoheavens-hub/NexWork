import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Trash2, 
  Calendar,
  Users,
  Target,
  DollarSign
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const CreateProject = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [milestones, setMilestones] = useState([
    { id: 1, title: "Discovery & Research", date: "" },
  ]);

  const addMilestone = () => {
    setMilestones([...milestones, { id: Date.now(), title: "", date: "" }]);
  };

  const removeMilestone = (id: number) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Create New Project</h1>
            <p className="text-slate-500">Step {step} of 3: {step === 1 ? "Basic Info" : step === 2 ? "Scope & Milestones" : "Financials"}</p>
          </div>
          <div className="flex gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                <ChevronLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            )}
            {step < 3 ? (
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setStep(step + 1)}>
                Next <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => navigate("/dashboard")}>
                Create Project
              </Button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Project Basics</CardTitle>
              <CardDescription>Identify the project and the client it belongs to.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input placeholder="e.g. Q4 Marketing Campaign" />
              </div>
              <div className="space-y-2">
                <Label>Client</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acme">Acme Corp</SelectItem>
                    <SelectItem value="global">Global Tech</SelectItem>
                    <SelectItem value="zest">Zest Foods</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Project Description</Label>
                <Textarea placeholder="Briefly describe the project goals..." className="min-h-[100px]" />
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Scope & Milestones</CardTitle>
              <CardDescription>Define the key deliverables and their target dates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {milestones.map((m, index) => (
                  <div key={m.id} className="flex gap-4 items-end p-4 bg-slate-50 rounded-xl relative group">
                    <div className="flex-1 space-y-2">
                      <Label>Milestone {index + 1} Title</Label>
                      <Input defaultValue={m.title} placeholder="e.g. Initial Concepts" />
                    </div>
                    <div className="w-40 space-y-2">
                      <Label>Target Date</Label>
                      <Input type="date" />
                    </div>
                    {milestones.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-slate-400 hover:text-rose-500"
                        onClick={() => removeMilestone(m.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" className="w-full border-dashed border-2" onClick={addMilestone}>
                  <Plus className="w-4 h-4 mr-2" /> Add Milestone
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Financial Details</CardTitle>
              <CardDescription>Set the budget and billing preferences for this project.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Total Budget</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input className="pl-10" placeholder="0.00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="ngn">NGN (₦)</SelectItem>
                      <SelectItem value="kes">KES (KSh)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Billing Method</Label>
                <Select defaultValue="fixed">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Price</SelectItem>
                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                    <SelectItem value="retainer">Monthly Retainer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CreateProject;