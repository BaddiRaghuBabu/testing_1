"use client";

import { CornerDownRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Structural economics, by design",
    description:
      "A well-structured India GCC is designed to reshape your cost base, consolidating fragmented offshore spend into a single, auditable cost pool and creating capacity that flexes with demand. Operating costs can be materially lower than comparable onshore hubs, while vendor margins are reduced, contracts simplified, and savings redeployed into product, digital and growth investments within a transparent economic model your board can scrutinize and explain.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/daria-nepriakhina-zoCDWPuiRuA-unsplash.jpg",
    categories: [
      "Structural cost advantage",
      "Lower run-rate cost",
      "Consolidated offshore spend",
      "Auditable cost pool",
      "Reduced vendor margins",
      "Flexible capacity model",
      "Growth reinvestment focus",
      "Board-ready economics",
    ],
    learnMoreUrl: "#",
  },
  {
    title: "Access to deep talent and differentiated capabilities",
    description:
      "An India GCC, built as a talent platform rather than a back office, can provide depth and diversity of skills that are hard to replicate in a single home market. Multidisciplinary teams across engineering, data, finance and operations sit alongside Centers of Excellence in data and AI, led by 'seed pod' leaders and sustained by university and lateral pipelines tuned to your brand, culture and long-term capability needs.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/daria-nepriakhina-zoCDWPuiRuA-unsplash.jpg",
    categories: [
      "Deep talent pools",
      "Specialist capabilities",
      "Multidisciplinary teams",
      "AI and analytics",
      "Automation expertise",
      "Centers of Excellence",
      "Leadership seed pods",
      "Brand-aligned hiring",
    ],
    learnMoreUrl: "#",
  },
  {
    title: "Governance, risk and control within your enterprise perimeter",
    description:
      "A GCC structured as part of your enterprise, rather than as a loose vendor network, is intended to give boards clearer sightlines on governance, risk and control. Data, IP and critical workflows remain within your legal and contractual perimeter, and group policies on information security, privacy, finance, HR and ethics are implemented locally through defined approvals, logs and documented evidence. Regulatory, tax and labor compliance run to documented calendars with named owners, supported by resilience plans calibrated to group thresholds and designed to withstand regulatory and audit scrutiny.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/daria-nepriakhina-zoCDWPuiRuA-unsplash.jpg",
    categories: [
      "Enterprise-aligned governance",
      "Defined risk appetite",
      "Policy-led controls",
      "Data/IP perimeter",
      "Documented accountabilities",
      "Compliance calendars",
      "Audit-ready evidence",
      "Resilience thresholds",
    ],
    learnMoreUrl: "#",
  },
  {
    title: "Speed to value, engineered",
    description:
      "GCC economics are realized when work is transitioned, stabilized and running to agreed service levels. Pre-structured playbooks for entity, workspace, technology and hiring can compress the gap between board approval and first productive teams to months, subject to regulatory timelines. Seed-pod launches, phased transitions and standardized methods limit disruption to business units, while KPIs on cost, service, risk and innovation show clearly whether the center is delivering against its business case.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/daria-nepriakhina-zoCDWPuiRuA-unsplash.jpg",
    categories: [
      "Faster time-to-value",
      "Pre-built playbooks",
      "Phased transitions",
      "Seed-pod starts",
      "Reduced disruption",
      "Defined SLAs",
      "Outcome KPIs",
      "Lifecycle governance",
    ],
    learnMoreUrl: "#",
  },
  {
    title: "One GCC partner across design, build and day-to-day operations",
    description:
      "Many firms can describe the India opportunity; fewer are structured to assume defined operational responsibilities across entity, workspace, talent and ongoing delivery. Where agreed, we act as a single accountable counterpart from blueprint through GCC-as-a-Service, BOT or Managed Teams constructs, with governance routines, dashboards and predefined adjustment and exit mechanics built into the engagement so that scaling, recalibration or an orderly unwind can proceed in a controlled way.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/daria-nepriakhina-zoCDWPuiRuA-unsplash.jpg",
    categories: [
      "Single accountable partner",
      "GCCaaS / BOT / Teams",
      "End-to-end coverage",
      "Governance dashboards",
      "Phased execution risk",
      "Documented exit options",
      "Scale-ready flexibility",
      "On-the-ground execution",
    ],
    learnMoreUrl: "#",
  },
];

const Services16 = () => {
  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="mb-8 max-w-3xl text-left">
          <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
            Benefits
          </h2>
          <p className="text-muted-foreground text-base leading-normal font-normal text-balance md:text-lg">
            A well-designed India GCC can deliver structural cost advantage, deeper talent pools and
            tighter control when it is treated as a governed operating platform.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {services.map((service, index) => (
            <AccordionItem key={service.title} value={service.title} className="group border-none">
              <div className="border-border/60 bg-background group-hover:bg-muted/40 group-data-[state=open]:bg-muted/40 rounded-lg border transition-colors">
                <AccordionTrigger className="flex w-full items-center justify-between px-5 py-4 text-left hover:no-underline">
                  <div className="flex flex-1 items-baseline gap-3">
                    <span className="text-muted-foreground text-xs font-normal tracking-[0.16em] uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted-foreground text-sm font-medium text-balance md:text-base">
                      {service.title}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-5 pt-0 pb-6">
                  <div className="mt-4 grid items-start gap-6 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.4fr)]">
                    <div className="flex gap-4 md:gap-6">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="hidden h-20 w-24 rounded-lg object-cover md:block"
                      />
                      <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">
                        {service.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-muted-foreground text-xs font-normal tracking-[0.16em] uppercase">
                        Value levers
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.categories.map((category) => (
                          <Badge
                            key={category}
                            className="bg-background text-muted-foreground rounded-full px-3 py-1 text-[12px] font-medium"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-muted-foreground/80 mt-4 w-fit p-0 text-sm font-medium"
                    asChild
                  >
                    <a href={service.learnMoreUrl}>
                      <CornerDownRight className="mr-1 h-3 w-3" />
                      Learn more
                    </a>
                  </Button>
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export { Services16 };
