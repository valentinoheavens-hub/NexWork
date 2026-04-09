"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import BusinessDiagnostics from "./pages/BusinessDiagnostics";
import GrowthLab from "./pages/GrowthLab";
import Leads from "./pages/Leads";
import Projects from "./pages/Projects";
import Proposals from "./pages/Proposals";
import ProposalBuilder from "./pages/ProposalBuilder";
import ProposalView from "./pages/ProposalView";
import ChangeOrderBuilder from "./pages/ChangeOrderBuilder";
import ClientPortal from "./pages/ClientPortal";
import Contracts from "./pages/Contracts";
import Invoices from "./pages/Invoices";
import InvoiceBuilder from "./pages/InvoiceBuilder";
import InvoiceView from "./pages/InvoiceView";
import Clients from "./pages/Clients";
import ClientDetails from "./pages/ClientDetails";
import TimeTracking from "./pages/TimeTracking";
import Messages from "./pages/Messages";
import Reports from "./pages/Reports";
import HelpCenter from "./pages/HelpCenter";
import Settings from "./pages/Settings";
import ProjectDetails from "./pages/ProjectDetails";
import QuestionnaireBuilder from "./pages/QuestionnaireBuilder";
import CreateProject from "./pages/CreateProject";
import ContractEditor from "./pages/ContractEditor";
import ClientOnboarding from "./pages/ClientOnboarding";
import Services from "./pages/Services";
import Expenses from "./pages/Expenses";
import Files from "./pages/Files";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/diagnostics" element={<BusinessDiagnostics />} />
          <Route path="/growth" element={<GrowthLab />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/proposal/new" element={<ProposalBuilder />} />
          <Route path="/proposal/view/:proposalId" element={<ProposalView />} />
          <Route path="/project/:projectId/change-order" element={<ChangeOrderBuilder />} />
          <Route path="/portal/:clientId" element={<ClientPortal />} />
          <Route path="/onboarding/:token" element={<ClientOnboarding />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/contract/edit/:contractId" element={<ContractEditor />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoice/new" element={<InvoiceBuilder />} />
          <Route path="/invoice/view/:think
The previous response was cut off in the middle of the `src/App.tsx` file within the `<dyad-write>` block.

The last line was:
`<Route path="/invoice/view/:`

I need to complete the `src/App.tsx` file, close the `<dyad-write>` tag, and then provide the `<dyad-chat-summary>` and the final concise summary.

Looking at the previous `src/App.tsx` content:
```tsx
          <Route path="/invoice/view/:proposalId" element={<ProposalView />} />
          <Route path="/project/:projectId/change-order" element={<ChangeOrderBuilder />} />
          <Route path="/portal/:clientId" element={<ClientPortal />} />
          <Route path="/onboarding/:token" element={<ClientOnboarding />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/contract/edit/:contractId" element={<ContractEditor />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoice/new" element={<InvoiceBuilder />} />
          <Route path="/invoice/view/:invoiceId" element={<InvoiceView />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/client/:clientId" element={<ClientDetails />} />
          <Route path="/time" element={<TimeTracking />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/project/new" element={<CreateProject />} />
          <Route path="/project/:projectId" element={<ProjectDetails />} />
          <Route path="/questionnaire-builder" element={<QuestionnaireBuilder />} />
          <Route path="/services" element={<Services />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/files" element={<Files />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

Wait, the user said "Continue exactly where you left off without any preamble."

The previous output ended at:
`<Route path="/invoice/view/:`

So I should start with:
`invoiceId" element={<InvoiceView />} />`
... and so on.

However, the instructions say "Only use ONE <dyad-write> block per file that you write!". Since the previous block was incomplete, I should probably rewrite the whole file or at least the part that was missing. But the user specifically asked to "Continue exactly where you left off".

Actually, if I just output the rest of the code, it won't be valid XML/HTML if I don't wrap it in the tag. But the tag was already opened.

Wait, the system instructions say: "do NOT be lazy and ALWAYS write the entire file. It needs to be a complete file."

If the previous response was cut off, the user is seeing a broken file. I should provide the full `src/App.tsx` file again to ensure it's correct.

But the user said "Continue exactly where you left off without any preamble."

If I just type:
`invoiceId" element={<InvoiceView />} />` ...
It might not work well with the UI if it expects a full tag.

Let's look at the previous response's `src/App.tsx` block. It was:
```tsx
<dyad-write path="src/App.tsx" description="Registering the Growth Lab route.">
"use client";
...
          <Route path="/invoice/view/:
```

So I will provide the full file again to be safe and follow the "complete file" rule, but I'll try to make it look like a continuation if possible, or just provide the full file as requested by the "complete file" rule.

Actually, the user prompt "Continue exactly where you left off" usually implies they want the missing text. But in this AI editor context, providing a partial `<dyad-write>` block is dangerous.

I will provide the full `src/App.tsx` file.

Wait, I also need to make sure I include the `GrowthLab` route which was the point of the previous turn.

The previous turn added:
`import GrowthLab from "./pages/GrowthLab";`
and
`<Route path="/growth" element={<GrowthLab />} />`

Let's reconstruct the full `src/App.tsx`.

```tsx
"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import BusinessDiagnostics from "./pages/BusinessDiagnostics";
import GrowthLab from "./pages/GrowthLab";
import Leads from "./pages/Leads";
import Projects from "./pages/Projects";
import Proposals from "./pages/Proposals";
import ProposalBuilder from "./pages/ProposalBuilder";
import ProposalView from "./pages/ProposalView";
import ChangeOrderBuilder from "./pages/ChangeOrderBuilder";
import ClientPortal from "./pages/ClientPortal";
import Contracts from "./pages/Contracts";
import Invoices from "./pages/Invoices";
import InvoiceBuilder from "./pages/InvoiceBuilder";
import InvoiceView from "./pages/InvoiceView";
import Clients from "./pages/Clients";
import ClientDetails from "./pages/ClientDetails";
import TimeTracking from "./pages/TimeTracking";
import Messages from "./pages/Messages";
import Reports from "./pages/Reports";
import HelpCenter from "./pages/HelpCenter";
import Settings from "./pages/Settings";
import ProjectDetails from "./pages/ProjectDetails";
import QuestionnaireBuilder from "./pages/QuestionnaireBuilder";
import CreateProject from "./pages/CreateProject";
import ContractEditor from "./pages/ContractEditor";
import ClientOnboarding from "./pages/ClientOnboarding";
import Services from "./pages/Services";
import Expenses from "./pages/Expenses";
import Files from "./pages/Files";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/diagnostics" element={<BusinessDiagnostics />} />
          <Route path="/growth" element={<GrowthLab />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/proposal/new" element={<ProposalBuilder />} />
          <Route path="/proposal/view/:proposalId" element={<ProposalView />} />
          <Route path="/project/:projectId/change-order" element={<ChangeOrderBuilder />} />
          <Route path="/portal/:clientId" element={<ClientPortal />} />
          <Route path="/onboarding/:token" element={<ClientOnboarding />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/contract/edit/:contractId" element={<ContractEditor />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoice/new" element={<InvoiceBuilder />} />
          <Route path="/invoice/view/:invoiceId" element={<InvoiceView />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/client/:clientId" element={<ClientDetails />} />
          <Route path="/time" element={<TimeTracking />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/project/new" element={<CreateProject />} />
          <Route path="/project/:projectId" element={<ProjectDetails />} />
          <Route path="/questionnaire-builder" element={<QuestionnaireBuilder />} />
          <Route path="/services" element={<Services />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/files" element={<Files />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

I will provide this full file.

Summary: "I've completed the registration of the Growth Lab route in the main application file."

Chat summary: "Completing Growth Lab integration"invoiceId" element={<InvoiceView />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/client/:clientId" element={<ClientDetails />} />
          <Route path="/time" element={<TimeTracking />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/project/new" element={<CreateProject />} />
          <Route path="/project/:projectId" element={<ProjectDetails />} />
          <Route path="/questionnaire-builder" element={<QuestionnaireBuilder />} />
          <Route path="/services" element={<Services />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/files" element={<Files />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;