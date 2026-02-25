"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    tabName: "Schema",
    title: "Domain-driven analytic schemas",
    description:
      "We structure your warehouse and lakehouse around real business domains, not just source systems, using star and snowflake schemas that stay fast, testable and easy to reason about. Slowly changing dimensions and well-governed conformed entities preserve full history, while a semantic metrics layer keeps KPIs consistent across BI tools, planning models and AI applications. The result is an auditable, shared language for the business rather than a tangle of one-off reports.",
    features: [
      "Domain-driven canonical models",
      "Star / snowflake schemas",
      "SCD handling & audit history",
      "Semantic metrics / business layer",
    ],
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    id: 2,
    tabName: "Storage",
    title: "Open, optimised lakehouse storage",
    description:
      "We unify warehouses, lakes and lakehouses behind an open, columnar storage layer so data stays portable, ACID-reliable and AI-ready. Modern table formats and indexing strategies are chosen to match real query patterns, while partitioning, clustering and zoning minimise scan costs without sacrificing flexibility. Tiering and lifecycle policies automatically move colder history to cheaper storage, so hot paths stay fast, bills stay predictable, and the lakehouse remains structured instead of drifting into a swamp of unmanaged files.",
    features: [
      "Cloud warehouses, lakes & lakehouses",
      "Open table formats & columnar storage",
      "Partitioning, clustering & zoning",
      "Tiering, lifecycle management & retention",
    ],
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    id: 3,
    tabName: "Pipelines",
    title: "Source-to-gold data pipelines",
    description:
      "We build ingestion and ELT pipelines that bring in data continuously from operational systems, SaaS platforms and event streams, using change data capture so only deltas move while sources stay in sync. Batch and streaming workloads flow through a medallion-style bronze–silver–gold architecture, progressively refining raw feeds into clean, business-ready tables with clear contracts and predictable SLAs. Along the way we enforce lineage, quality checks and schema expectations so the same pipelines can serve analytics, operations and AI models with confidence.",
    features: [
      "Ingestion & ELT from sources",
      "Streaming / micro-batch pipelines",
      "Change data capture (CDC) patterns",
      "Bronze–silver–gold (medallion) layers",
    ],
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    id: 4,
    tabName: "DataOps",
    title: "DataOps for reliable, cost-aware pipelines",
    description:
      "We apply DataOps and DevOps practices so data pipelines behave like well-engineered software systems. Every change is versioned in Git, validated with automated tests and promoted through CI/CD, reducing breakages when new models, sources or transformations are deployed. Embedded data-quality checks and regression suites run inside the pipelines, while end-to-end observability tracks freshness, latency, SLAs and anomalies so issues are caught before stakeholders feel them. Usage and performance telemetry feeds continuous tuning and FinOps routines, keeping platforms responsive and resilient while optimising cloud spend.",
    features: [
      "Git-based CI/CD for pipelines",
      "Automated data quality checks & tests",
      "Observability, SLAs & runtime alerts",
      "Cost & performance (FinOps) optimisation",
    ],
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  {
    id: 5,
    tabName: "Governance",
    title: "Governance that keeps sensitive data usable",
    description:
      "We put a data catalog, business glossary and end-to-end lineage at the centre of your platform so teams can see where data came from, how it was transformed and which definitions and owners apply before they ever query it. Fine-grained, role- and attribute-based access control, combined with masking, tokenisation and PII tagging, ensures the right people see the right level of detail—nothing more—across warehouses, lakes and AI workloads. Compliance policies are enforced in the platform rather than in scattered spreadsheets, with audit-ready logs and controls that make regulations such as GDPR and CCPA easier to meet and simpler to prove.",
    features: [
      "Data catalog, glossary & end-to-end lineage",
      "Fine-grained, role- / attribute-based access",
      "Masking, tokenisation & PII controls",
      "Compliance & audit-ready policies",
    ],
    link: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  },
];

const Feature19 = () => {
  const [activeTab, setActiveTab] = useState(slides[0].id.toString());

  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="flex max-w-3xl flex-col text-left">
          <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
            Robust data engineering
            <br />
            for analytics and AI
          </h2>

          <p className="text-muted-foreground text-base leading-normal font-normal text-balance md:text-lg">
            We design and operate governed data foundations that modern enterprises run on. From
            platform architecture and integrations to data quality, lineage, security, and
            compliance, we build reliable pipelines that turn raw, multi-source feeds into trusted,
            analysis-ready datasets.
          </p>
        </div>

        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="hidden lg:block">
              <div className="flex w-full">
                <TabsList
                  className={cn(
                    "border-border/60 bg-background flex h-auto w-fit items-center justify-start",
                    "rounded-full border px-2 py-2",
                    "overflow-x-auto whitespace-nowrap",
                    "gap-2",
                  )}
                >
                  {slides.map((slide) => (
                    <TabsTrigger
                      key={slide.id}
                      value={slide.id.toString()}
                      className={cn(
                        "rounded-full px-2 py-2 text-[12px] leading-none font-normal 2xl:px-4 2xl:text-sm",
                        "text-foreground",
                        "data-[state=inactive]:bg-background data-[state=inactive]:shadow-none",
                        "data-[state=active]:bg-muted",
                        "data-[state=active]:shadow-none data-[state=inactive]:shadow-none",
                        "shadow-none ring-0 transition-colors outline-none",
                        "focus:ring-0 focus:outline-none active:ring-0 active:outline-none",
                        "focus-visible:border-transparent focus-visible:ring-0 focus-visible:outline-none",
                        "data-[state=inactive]:hover:bg-muted/40",
                        "data-[state=inactive]:focus-visible:bg-muted/40",
                      )}
                    >
                      {slide.tabName}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
            <div className="lg:hidden">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger
                  className={cn(
                    "border-border/60 bg-background",
                    "h-12 w-full rounded-full border px-4",
                    "shadow-none focus-visible:ring-0",
                  )}
                >
                  <SelectValue placeholder="Select a tab" />
                </SelectTrigger>
                <SelectContent className="border-border/60 bg-background border shadow-none">
                  {slides.map((slide) => (
                    <SelectItem
                      key={slide.id}
                      value={slide.id.toString()}
                      className="bg-background focus:bg-muted/40 data-highlighted:bg-muted/40"
                    >
                      {slide.tabName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {slides.map((slide) => (
              <TabsContent
                key={slide.id}
                value={slide.id.toString()}
                className="data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-1 w-full pt-2 data-[state=active]:duration-300"
              >
                <div className="border-border/60 bg-muted/40 grid grid-cols-1 items-center gap-10 rounded-lg border p-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:p-10">
                  <div className="space-y-8">
                    <div className="space-y-8">
                      <h3 className="text-muted-foreground text-lg font-medium text-balance md:text-xl">
                        {slide.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed font-normal text-balance">
                        {slide.description}
                      </p>
                    </div>

                    <div className="text-muted-foreground text-sm font-medium text-balance">
                      <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        {slide.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <div className="bg-muted-foreground/15 mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full">
                              <Check className="text-muted-foreground h-3 w-3 flex-none" />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      variant="default"
                      className="group relative z-10 w-fit rounded-full! px-10 tracking-tight shadow-none!"
                    >
                      Discover more!
                      <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
                    </Button>
                  </div>

                  <div className="order-first md:order-last">
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="max-h-[420px] w-full rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export { Feature19 };
