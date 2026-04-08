import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Globe, 
  Palette, 
  Shield, 
  CreditCard, 
  Bell,
  Upload,
  Check
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500">Configure your workspace and white-labeling options.</p>
        </div>

        <Tabs defaultValue="branding" className="w-full">
          <TabsList className="bg-white border border-slate-200 p-1 h-12">
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="domain">Custom Domain</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="branding" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Visual Identity</CardTitle>
                    <CardDescription>These settings will be applied to all your client portals.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Agency Name</Label>
                        <Input defaultValue="NexWork Design Studio" />
                      </div>
                      <div className="space-y-2">
                        <Label>Primary Brand Color</Label>
                        <div className="flex gap-2">
                          <Input defaultValue="#4F46E5" className="flex-1" />
                          <div className="w-10 h-10 rounded-md bg-indigo-600 border border-slate-200" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Agency Logo</Label>
                      <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-indigo-300 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-sm font-medium text-slate-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG up to 2MB</p>
                      </div>
                    </div>

                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Branding Changes</Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-none shadow-sm bg-slate-900 text-white">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Portal Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-white rounded-lg overflow-hidden border border-white/10 p-2">
                      <div className="h-4 w-full bg-slate-50 border-b border-slate-100 flex items-center px-2 gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-indigo-600 rounded" />
                          <div className="h-2 w-20 bg-slate-200 rounded" />
                        </div>
                        <div className="h-12 w-full bg-indigo-50 rounded-lg" />
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-16 bg-slate-50 rounded-lg" />
                          <div className="h-16 bg-slate-50 rounded-lg" />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-4 text-center">
                      This is how your clients will see their workspace.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="domain" className="mt-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Custom Domain</CardTitle>
                <CardDescription>Remove NexWork branding and use your own domain.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 flex items-start gap-4">
                  <Shield className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-indigo-900">Agency Plan Required</p>
                    <p className="text-sm text-indigo-700">Custom domains are available on the Agency and Scale plans.</p>
                    <Button variant="link" className="p-0 h-auto text-indigo-600 font-bold mt-2">Upgrade now to enable</Button>
                  </div>
                </div>

                <div className="space-y-4 opacity-50 pointer-events-none">
                  <div className="space-y-2">
                    <Label>Your Domain</Label>
                    <Input placeholder="portal.youragency.com" />
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">DNS Configuration</p>
                    <div className="flex justify-between text-sm">
                      <span className="font-mono">Type: CNAME</span>
                      <span className="font-mono">Value: cname.nexwork.io</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;