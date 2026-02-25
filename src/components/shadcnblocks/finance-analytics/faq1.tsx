"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq1Props {
  heading?: string;
  items?: FaqItem[];
}

const Faq1 = ({
  heading = "FAQ",
  items = [
    {
      id: "faq-1",
      question: "What kinds of finance teams do you typically work with?",
      answer:
        "We work primarily with CFOs, finance leaders, controllers, and FP&A teams who already have a functioning finance operation, but lack the data infrastructure and automation to support the next stage of growth. Typical clients are multi-entity or multi-division organisations, often with several source systems (ERP, billing, banking, payroll, CRM) and a proliferation of spreadsheets. In short, we are most useful where the accounting is under control, but reporting, planning, and operational workflows are creaking under the weight of manual effort and fragmented data.",
    },
    {
      id: "faq-2",
      question:
        "Do you only build dashboards, or do you also redesign finance processes and workflows?",
      answer:
        'Dashboards are usually the visible tip of the work, not the work itself. Our engagements typically combine data engineering, finance-specific data modelling, and the redesign and automation of key workflows across P2P, O2C, A2R, H2R, and R2R. That can mean anything from standardising how the GL and subledgers feed a management P&L, to automating approvals, reconciliations, or cash-application steps that previously lived in email and Excel. The objective is not "prettier charts," but a more reliable, auditable, and less manual finance operation that happens to surface its outputs in well-designed reports.',
    },
    {
      id: "faq-3",
      question: "How does a typical engagement with you work from brief to go-live?",
      answer:
        "Every engagement follows the same underlying structure, adapted to the client's context. We begin by clarifying the brief: agreeing on the questions we are trying to answer, the decisions they will inform, the constraints we must respect, and the current landscape of systems, data, and processes. We then design and build the operating stack-data structures, calculation logic, controls, reports, and workflows-working in short, review-heavy cycles using real data rather than idealised samples. Finally, we harden the solution for production use, support rollout and training, and put in place governance and documentation for its ongoing operation and evolution.",
    },
    {
      id: "faq-4",
      question:
        "Can you work with our existing tools and data stack, and what platforms do you typically use?",
      answer:
        "Yes. As a matter of principle, we start from your existing estate-ERP, CRM, billing, banking, payroll, data warehouse, and BI tools-and only introduce additional platforms where there is a clear gap or economic case. In practice, we most often work with mainstream databases and warehouses, ELT and integration tools, BI platforms such as Power BI, and low-code environments including the Microsoft Power Platform for apps, automations, and portals. The specific combination is tailored to your environment, support model, and risk posture; our role is to assemble a coherent finance data and workflow architecture rather than to impose a particular vendor catalogue.",
    },
    {
      id: "faq-5",
      question: "What do you need from our internal team to make a project successful?",
      answer:
        "We do not require a large internal task force, but we do need a small, stable group of counterparts. Typically this includes a finance lead (CFO, controller, or FP&A head), a business stakeholder who feels the pain of the current process, and someone with access to systems and data (often from finance ops or IT). We handle the design and build, but we rely on your team for three things: authoritative definitions of metrics and edge cases, timely feedback during reviews, and the internal sponsorship needed to ensure that new tools and workflows are actually adopted.",
    },
    {
      id: "faq-6",
      question: "How long does it take to see tangible value from a project?",
      answer:
        'Timeframes depend on scope and complexity, but we design engagements so that clients see concrete value early rather than waiting for an all-or-nothing "go-live." For many projects, a first wave of usable outputs-such as a critical management report, a working capital or margin view, or an automated workflow that removes a painful manual step-emerges within roughly 6-8 weeks. Larger programmes may extend beyond that, but the intent is always to deliver a sequence of increments that stand on their own, rather than a single, monolithic deliverable at the end.',
    },
    {
      id: "faq-7",
      question: "How do you handle data security, access control, and confidentiality?",
      answer:
        "We work within the security perimeter you define, typically using your own cloud tenant and approved tools so that sensitive data remains under your organisation's control. Access is granted on a least-privilege basis, with clear separation between production and non-production environments, and we design solutions with role-based access, logging, and auditability as first-order concerns rather than afterthoughts. Confidentiality obligations are governed by contract and NDA, and are reflected in our day-to-day working practices, including how we structure environments, manage permissions, and handle project artefacts and documentation.",
    },
  ],
}: Faq1Props) => {
  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="mb-8 max-w-3xl text-left">
          <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="text-muted-foreground text-base leading-normal font-normal text-balance md:text-lg">
            The questions below reflect the themes clients most often raise about our Finance
            Analytics work-its scope, operating model and governance. For a mandate-specific view,
            we typically work through your context in a structured discovery session.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {items.map((item, index) => (
            <AccordionItem key={item.id} value={item.id} className="group border-none">
              <div className="border-border/60 bg-background group-hover:bg-muted/40 group-data-[state=open]:bg-muted/40 rounded-lg border transition-colors">
                <AccordionTrigger className="flex w-full items-center justify-between px-4 py-4 text-left hover:bg-transparent hover:no-underline">
                  <div className="flex flex-1 items-baseline gap-2">
                    <span className="text-muted-foreground text-xs font-normal tracking-[0.16em] uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted-foreground text-sm font-medium text-balance md:text-base">
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 pt-0 pb-4">
                  <div className="border-border/60 text-muted-foreground mt-2 border-l pr-2 pl-4 text-xs leading-relaxed font-normal text-balance md:pr-3 md:pl-6 md:text-sm">
                    {item.answer}
                  </div>
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export { Faq1 };
