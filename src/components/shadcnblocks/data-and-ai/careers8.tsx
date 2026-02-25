"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Solution = {
  category: string;
  subcategories: {
    title: string;
    micro: string[];
  }[];
};

const SOLUTIONS: Solution[] = [
  {
    category: "AI",
    subcategories: [
      {
        title: "Generative AI (synthesis layer)",
        micro: [
          "Problem framing & KPI definition",
          "Copilot / assistant experience design (intents, UX patterns, interaction flows)",
          "Prompt & response composition (templates, structure, tone, controlled outputs)",
          'Evidence-use behavior (citation rules, source quoting policy, "answer only from evidence" patterns)',
          "LLM application engineering & integration",
          "Model selection & adaptation (fine-tuning, adapters, routing)",
          "Evaluation & LLMOps (test suites, safety review, deploy, monitor, cost, change control)",
        ],
      },
      {
        title: "Agentic Process Automation (execution layer)",
        micro: [
          "Workflow selection & autonomy levels (assist -> supervised -> lights-out)",
          "Agent architecture & orchestration patterns",
          "Tool/action layer & access controls",
          "State, memory & durable execution",
          "Human oversight & approval gates",
          "Safety, security & compliance guardrails",
          "AgentOps & continuous evaluation (observability, quality, cost, impact, drift)",
        ],
      },
      {
        title: "Advanced Search & Retrieval (evidence layer)",
        micro: [
          "Use-case mapping & retrieval strategy (query taxonomy, success metrics, operating model)",
          "Corpus onboarding & access model (systems of record, ownership, freshness, permissions)",
          "Ingestion, parsing & enrichment (formats, chunking, metadata, structure extraction)",
          "Index & schema design (lexical + vector fields, filters/facets, data contracts)",
          "Retrieval execution (hybrid search, query rewriting/expansion, recall controls)",
          "Ranking pipeline & relevance tuning (fusion + reranking, judgment sets, iteration loop)",
          "Permission-aware results & traceability (security trimming, citations, source linking, auditability)",
        ],
      },
    ],
  },
  {
    category: "Data Engineering",
    subcategories: [
      {
        title: "Data Strategy & Target Architecture",
        micro: [
          "Current-state assessment and gap analysis",
          "Value thesis, use-case portfolio & KPI definition",
          "Target architecture blueprint (cloud / hybrid / mesh)",
          "Operating model & decision rights (ownership, standards)",
          "Modernization roadmap & migration waves (modernize, retire, introduce)",
        ],
      },
      {
        title: "Data Platforms, Storage & Performance",
        micro: [
          "Platform selection & reference architecture (warehouse / lake / lakehouse)",
          "Logical + physical data design (star/snowflake, partitioning, file formats)",
          "Compute & runtime foundations (Spark, engines, clustering/autoscaling)",
          "Performance + cost engineering (workload tuning, query/db optimization)",
        ],
      },
      {
        title: "Data Integration, Pipelines & DataOps",
        micro: [
          "Source connectivity & ingestion (apps, SaaS, APIs, files)",
          "Pipeline engineering (batch, CDC, streaming)",
          "Transformation & curation framework (standardization, reusable models)",
          "Orchestration & reliability (scheduling, retries, backfills, SLAs)",
          "DataOps automation (CI/CD, testing, monitoring, alerting)",
        ],
      },
      {
        title: "Data Governance, Quality & Security",
        micro: [
          "Governance operating model (ownership, stewardship, controls)",
          "Metadata & lineage management (catalog, glossary)",
          "Data quality & observability (rules, checks, monitoring)",
          "Security & privacy controls (access, encryption, masking)",
          "Regulatory compliance & audit readiness (GDPR, CCPA)",
        ],
      },
    ],
  },
  {
    category: "Data Modelling",
    subcategories: [
      {
        title: "Statistical Modelling & Inference",
        micro: [
          "Regression models (linear, GLM)",
          "Time-series models (ARIMA, state-space)",
          "Bayesian & hierarchical models",
          "Survival & longitudinal models",
          "Causal inference & identification (propensity, DiD, IV)",
        ],
      },
      {
        title: "Machine Learning & Optimization",
        micro: [
          "Supervised learning (classification, regression)",
          "Unsupervised learning (clustering, representation learning)",
          "Recommender systems & personalization",
          "Forecasting (demand, churn, time-dependent prediction)",
          "Optimization & decision intelligence (constraints, prescriptive analytics)",
          "Reinforcement learning (sequential decisioning)",
        ],
      },
      {
        title: "Experimentation & Model Lifecycle",
        micro: [
          "Experiment design & measurement (A/B, holdouts)",
          "Pre-deploy validation (cross-validation, benchmarks)",
          "Model risk & fairness assessment",
          "Drift detection & performance monitoring",
          "Lifecycle operations (release, versioning, retraining, rollback)",
        ],
      },
    ],
  },
  {
    category: "Data Visualization",
    subcategories: [
      {
        title: "Dashboards, Reports & Narratives",
        micro: [
          "Monitoring dashboards (operational performance)",
          "Decision dashboards (analytical insight)",
          "KPI frameworks & metric governance",
          "Executive & board reporting packs",
          "Paginated / pixel-perfect reporting",
          "Narrative reporting & exception alerts",
        ],
      },
      {
        title: "Self-Service Analytics & Storytelling",
        micro: [
          "Governed self-service enablement (semantic layer, curated datasets)",
          "Certified metrics & data products (reusable, versioned)",
          "Enablement & adoption (training, publishing standards)",
          "Storytelling & insight narrative playbooks",
          "Exploratory analysis patterns & reusable templates",
        ],
      },
      {
        title: "BI Platform, Standards & Governance",
        micro: [
          "BI platform architecture & operating model (Power BI / Tableau / Looker)",
          "Visual design system & standards",
          "Security, access controls & governance workflows",
          "Performance & reliability engineering",
          "Release, testing & lifecycle management",
        ],
      },
    ],
  },
];

const options = [
  { label: "All", value: "all" },
  { label: "AI", value: "ai" },
  { label: "Data Engineering", value: "data_engineering" },
  { label: "Data Modelling", value: "data_modelling" },
  { label: "Data Visualization", value: "data_visualization" },
];

const Careers8 = () => {
  const [filterValue, setFilterValue] = useState(options[0].value);

  const filterSolutionsByCategory = (category: string) => {
    if (category === "All") return SOLUTIONS;
    return SOLUTIONS.filter((s) => s.category === category);
  };

  const renderSolutions = () => {
    const option = options.find((opt) => opt.value === filterValue)!;
    const solutions = filterSolutionsByCategory(option.label);

    return (
      <Accordion type="single" collapsible className="space-y-8">
        {solutions.map((solution, i) => (
          <div
            key={`solution-${solution.category}-${i}`}
            className="flex w-full flex-col justify-start gap-8"
          >
            <div className="text-muted-foreground text-base font-medium text-balance md:text-lg">
              {solution.category}
            </div>
            <div className="text-muted-foreground text-base leading-snug font-semibold md:text-lg">
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {solution.subcategories.map((sub) => (
                  <AccordionItem
                    key={`subcat-${solution.category}-${sub.title}`}
                    value={`${solution.category}-${sub.title}`}
                    className="group border-none"
                  >
                    <div className="border-border/60 bg-background group-hover:bg-muted/40 group-data-[state=open]:bg-muted/40 rounded-lg border transition-colors">
                      <AccordionTrigger className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-transparent hover:no-underline">
                        <span className="text-muted-foreground text-sm font-medium text-balance md:text-base">
                          {sub.title}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pt-0 pb-5">
                        <div className="text-muted-foreground mt-4 space-y-4 text-xs font-normal text-balance md:text-sm">
                          <div className="border-border/60 border-l pl-4 md:pl-6">
                            <div className="space-y-2">
                              {sub.micro.map((m) => (
                                <div key={m} className="flex items-start gap-3">
                                  <div className="bg-muted-foreground/15 mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full">
                                    <Check className="text-muted-foreground h-3 w-3 flex-none" />
                                  </div>
                                  <span>{m}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Accordion>
    );
  };

  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="flex w-full flex-col">
          <div className="mb-8 max-w-3xl text-left">
            <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
              Services
            </h2>
            <p className="text-muted-foreground text-base leading-normal font-normal text-balance md:text-lg">
              From operations to board-level planning, we orchestrate pipelines that capture data
              and warehouse it into a governed foundation. Then AI standardizes metrics, automates
              workflows, and surfaces forward-looking insights for faster, better decisions.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap items-center justify-start gap-4">
            <Label htmlFor="terms" className="text-muted-foreground text-base font-normal">
              Filter
            </Label>
            <Select value={filterValue} onValueChange={(value) => setFilterValue(value)}>
              <SelectTrigger className="border-border/60 bg-background text-muted-foreground hover:bg-muted/40 focus-visible:border-border/60 data-[state=open]:border-border/60 data-[state=open]:bg-muted/40 w-[16rem] border shadow-none focus-visible:ring-0 focus-visible:ring-offset-0">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="border-border/60 bg-background border">
                <SelectGroup>
                  {options.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="bg-background text-muted-foreground focus:bg-muted/40 data-[state=checked]:bg-muted/40"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-12">{renderSolutions()}</div>
        </div>
      </div>
    </section>
  );
};

export { Careers8 };
