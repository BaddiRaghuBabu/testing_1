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
      question:
        "What is a Global Capability Center (GCC), and how is it different from outsourcing?",
      answer:
        "A Global Capability Center (GCC) is a captive or captive-like platform, typically in India, that delivers defined functions such as engineering, finance, analytics and operations under your own brand, policies and control framework. It is structured as an extension of your enterprise: you set strategy, risk appetite and standards, and retain decision rights over talent, IP and data, while a partner may help design, set up and operate the center. Traditional outsourcing places more of this control and governance with an external provider operating from its own organization and environment.",
    },
    {
      id: "faq-2",
      question: "How long does it take to set up a GCC in India?",
      answer:
        "Timelines depend on engagement model, scope, location choices and regulatory steps. Where we use existing licensed entities and infrastructure, clients can often reach an initial day-one capability within a few months, subject to approvals and hiring. Standalone GCCs that require a new entity, core registrations and bespoke space typically follow a longer, phased path. For each mandate we agree a realistic critical path, milestones and assumptions up front so expectations on timing, dependencies and responsibilities are clear.",
    },
    {
      id: "faq-3",
      question: "What engagement models do you offer, and who owns what in each?",
      answer:
        "Broadly we work across three constructs: GCC-as-a-Service, Build-Operate-Transfer (BOT) and Managed Teams. Together they span the spectrum from using our licensed entities and operating stack to standing up a wholly owned GCC, or adding dedicated India-based capacity alongside your existing footprint. For any mandate we set out in writing how ownership of entities, assets, data, IP and contracts is allocated, and how service, pricing, change and exit will be handled.",
    },
    {
      id: "faq-4",
      question: "How do you handle compliance, data protection and intellectual property?",
      answer:
        "We design and operate each GCC within the legal, tax, employment and data-protection frameworks agreed with you and your advisers. In practice this means mapping your policies into local processes and controls, defining data and IP treatment in the contracts, and configuring access, logging and segregation so roles and responsibilities are clear. We also work to provide the reporting and audit trails your internal risk, legal and compliance teams need to oversee the India platform.",
    },
    {
      id: "faq-5",
      question: "What are the main risks in establishing a GCC, and how are they managed?",
      answer:
        "The risk profile of a GCC varies by industry and footprint, but typically spans regulatory compliance, culture and leadership, talent attraction and retention, and delivery against cost and timeline expectations. Our approach is to surface these issues early through structured assessment and business casing, then manage them through clear governance, accountable owners, documented policies and SLAs, and deliberate investment in culture and retention. Engagement models are built to allow scaling, pausing or reshaping scope without unnecessary disruption to the underlying platform.",
    },
    {
      id: "faq-6",
      question: "What functions and talent profiles can we build into an India GCC?",
      answer:
        "In practice, India GCCs often host a mix of technology and data roles (for example software and platform engineering, DevOps, data engineering, analytics, AI/ML), business and finance operations (for example F&A, controllership support, FP&A, procurement, HR and customer operations) and specialist capabilities such as product management, design, analytics centers of Excellence and R&D or experimentation pods. For each client we work from strategy and risk appetite to define which activities fit the GCC, which remain onshore, and where hybrid or vendor models are more appropriate.",
    },
    {
      id: "faq-7",
      question: "What do you need from us to get started, and how are commitments documented?",
      answer:
        "To begin, we usually ask for clarity on intent (target functions, locations, headcount, time horizon and risk appetite), a senior sponsor and a small cross-functional working team, and access to relevant group policies and standards. On that foundation we develop a written blueprint and commercial proposal that sets out indicative scope, timelines, responsibilities, service levels, pricing, data and IP treatment, and options for scale-up or change, which then form the basis for the formal engagement.",
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
            The questions below reflect the themes clients most often raise about our India GCC
            work-its scope, operating model and governance. For a mandate-specific view, we
            typically work through your context in a structured discovery session.
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
