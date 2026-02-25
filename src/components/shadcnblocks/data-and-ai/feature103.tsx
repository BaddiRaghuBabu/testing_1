"use client";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Feature103Props {
  className?: string;
}

type Step = {
  id: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: "01",
    title: "Mobilize and align",
    description:
      "Confirm sponsorship, decision rights, and ways of working. Define the value thesis, success metrics, and delivery cadence - then stand up the governance needed to make decisions quickly and track outcomes.",
  },
  {
    id: "02",
    title: "Scope and readiness",
    description:
      "Prioritize use cases and define service levels (freshness, latency, reliability). Assess the end-to-end source-to-consumption path - systems, schemas, volumes, data quality, and ownership - so delivery starts from a realistic baseline.",
  },
  {
    id: "03",
    title: "Architecture and data contracts",
    description:
      "Design the target architecture for batch/CDC/streaming ingestion, orchestration, and lakehouse/warehouse layers. Establish data contracts, domain/dimensional models, semantic metrics, catalog/lineage, access controls (RBAC/ABAC), and environment strategy (dev/test/prod).",
  },
  {
    id: "04",
    title: "Build and industrialise",
    description:
      "Deliver pipelines, quality gates, transformations, and curated data products (marts, APIs, dashboards, operational outputs). Implement the AI layer (ML feature pipelines + training/inference, or GenAI with retrieval/tool use and guardrails), and industrialise delivery with CI/CD and release controls.",
  },
  {
    id: "05",
    title: "Run, govern, and scale",
    description:
      "Operate what ships: observability, alerting, incident workflows, and evaluation for models and prompts. Implement auditability, access-aware retrieval, retraining/reindex triggers, and cost controls - then replicate the pattern across domains while keeping risk and compliance governance current.",
  },
];

const Feature103 = ({ className }: Feature103Props) => {
  return (
    <section className={cn("pt-20 pb-0 md:pt-24 lg:pt-28", className)}>
      <div className="container">
        <div className="mb-8 max-w-2xl text-left">
          <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
            From priority use cases to production at scale
          </h2>
          <p className="text-muted-foreground text-base leading-normal font-normal text-balance md:text-lg">
            We sequence work to deliver impact early, build iteratively, and institutionalise
            governance - so the platform and AI services scale safely across domains.
          </p>
        </div>

        <Accordion type="single" collapsible className="grid items-start gap-2 md:grid-cols-2">
          <StepCard step={steps[0]} />
          <StepCard step={steps[1]} />

          <div className="grid items-start gap-2 md:col-span-2 md:grid-cols-3">
            <StepCard step={steps[2]} />
            <StepCard step={steps[3]} />
            <StepCard step={steps[4]} />
          </div>
        </Accordion>
      </div>
    </section>
  );
};

export { Feature103 };

function StepCard({ step }: { step: Step }) {
  return (
    <AccordionItem value={`step-${step.id}`} className="group border-none">
      <div className="border-border/60 bg-background group-hover:bg-muted/40 group-data-[state=open]:bg-muted/40 rounded-lg border transition-colors">
        <AccordionTrigger className="flex w-full items-center justify-between px-4 py-4 text-left hover:bg-transparent hover:no-underline">
          <div className="flex flex-1 items-baseline gap-2">
            <span className="text-muted-foreground text-xs font-normal tracking-[0.16em] uppercase">
              {step.id}
            </span>
            <span className="text-muted-foreground text-sm font-medium text-balance md:text-base">
              {step.title}
            </span>
          </div>
        </AccordionTrigger>

        <AccordionContent className="px-4 pt-0 pb-4">
          <div className="border-border/60 text-muted-foreground mt-2 border-l pr-2 pl-4 text-xs leading-relaxed font-normal text-balance md:pr-3 md:pl-6 md:text-sm">
            {step.description}
          </div>
        </AccordionContent>
      </div>
    </AccordionItem>
  );
}
