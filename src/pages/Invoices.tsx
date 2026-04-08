import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Search, 
  Download, 
  ExternalLink,
  CreditCard,
  DollarSign,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const Invoices = () => {
  const invoices = [
    { id: "INV-001", client: "Acme Corp", amount: "$1,500.00", status: "Paid", date: "Oct 12, 2023", method: "Stripe" },
    { id: "INV-002", client: "Global Tech", amount: "$3,200.00", status: "Overdue", date: "Oct 28, 2023", method: "Paystack" },
    { id: "INV-003", client: "Zest Foods", amount: "$850.00", status: "Sent", date: "Nov 01, 2023", method: "Flutterwave" },
    { id: "INV-004", client: "Acme Corp", amount: "$2,100.00", status: "Draft", date: "Nov 05, 2023", method: "-" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
            <p className="text-slate-500">Track payments and manage multi-currency billing.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-slate-200 gap-2">
              <Download className="w-4 h-4" />
              Export Tax Summary
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
              <Plus className="w-4 h-4" />
              Create Invoice
            </Button>
          </div>
        </div>

        {/* Payment Rails Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm bg-slate-900 text-white">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Global Payments</p>
                <h3 className="text-xl font-bold">Stripe Connected</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-indigo-600 text-white">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">African Rails</p>
                <h3 className="text-xl font-bold">Paystack Active</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm border-dashed border-2 border-slate-200 bg-transparent">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Mobile Money</p>
                <h3 className="text-xl font-bold text-slate-400">Connect M-Pesa</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50">Setup</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search invoices..." className="pl-10 bg-slate-50 border-none" />
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-slate-500">All</Button>
              <Button variant="ghost" size="sm" className="text-slate-500">Paid</Button>
              <Button variant="ghost" size="sm" className="text-slate-500">Pending</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="font-bold text-slate-900">Invoice ID</TableHead>
                  <TableHead className="font-bold text-slate-900">Client</TableHead>
                  <TableHead className="font-bold text-slate-900">Amount</TableHead>
                  <TableHead className="font-bold text-slate-900">Status</TableHead>
                  <TableHead className="font-bold text-slate-900">Due Date</TableHead>
                  <TableHead className="font-bold text-slate-900">Method</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="font-medium text-slate-900">{invoice.id}</TableCell>
                    <TableCell className="text-slate-600">{invoice.client}</TableCell>
                    <TableCell className="font-bold text-slate-900">{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "border-none",
                        invoice.status === "Paid" ? "bg-emerald-50 text-emerald-700" : 
                        invoice.status === "Overdue" ? "bg-rose-50 text-rose-700" : 
                        invoice.status === "Sent" ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-600"
                      )}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-500">{invoice.date}</TableCell>
                    <TableCell className="text-slate-500">{invoice.method}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-slate-400">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

import { cn } from "@/lib/utils";
export default Invoices;