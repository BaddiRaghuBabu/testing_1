"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { useRef, type ReactNode } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  content: string;
};

const testimonials1: Testimonial[] = [
  {
    name: "Full Stack Developer",
    role: "Work Experience: 7+ years",
    avatar: "https://shadcnblocks.com/images/block/avatar-1.webp",
    content:
      "JavaScript, React, Python, Postgres, MySQL, Apigee API Management, RESTful API Design, CI/CD tools (Jenkins, Git, Azure DevOps, GitLab CI), Docker, Kubernetes",
  },
  {
    name: "Enterprise Security Engineer",
    role: "Work Experience: 5+ years",
    avatar: "https://shadcnblocks.com/images/block/avatar-2.webp",
    content:
      "Azure AD, G Suite, macOS Fleet Management, EDR Deployment, AWS, IAM (SAML/OAuth/SCIM), DLP, Zero Trust, Python/Bash Scripting, Cloud Security",
  },
  {
    name: "Machine Learning Engineer",
    role: "Work Experience: 2+ years",
    avatar: "https://shadcnblocks.com/images/block/avatar-3.webp",
    content:
      "PyTorch, TensorFlow, Transformer Models, Deep Learning, LLM Fine-Tuning (Distillation, Policy Optimization), Model Deployment, Search Relevance",
  },
  {
    name: "Analytics Data Engineer",
    role: "Work Experience: 8+ years",
    avatar: "https://shadcnblocks.com/images/block/avatar-4.webp",
    content:
      "Python, Spark, Hadoop, Airflow, Tableau, ETL Pipelines, Data Warehouse, Distributed Systems, S3, Canonical Datasets, Metric Definition, Dashboard Design",
  },
  {
    name: "Product Manager, Search",
    role: "Work Experience: 6+ years",
    avatar: "https://shadcnblocks.com/images/block/avatar-5.webp",
    content:
      "Search Ranking, Indexing, Retrieval, RAG Models, Relevance Metrics, Web Crawling, Search API, User Experience, Information Retrieval, Model Quality",
  },
  {
    name: "Software Engineer, Infrastructure",
    role: "Work Experience: 4+ years",
    avatar: "https://shadcnblocks.com/images/block/avatar-6.webp",
    content:
      "Python, Go, Rust, Kubernetes, Terraform, Distributed Systems, Observability Tooling, CI/CD Pipelines, Cloud Infrastructure, Reliability Engineering",
  },
];

const testimonials2: Testimonial[] = [
  {
    name: "Finance Controller",
    role: "Work Experience: 8+ years",
    avatar: "https://shadcnblocks.com/images/block/avatar-1.webp",
    content:
      "US-GAAP/IFRS, ERP, Budgeting, Forecasting, Variance Reporting, Internal Controls, Compliance, FP&A, Investment Analysis, Treasury Operations",
  },
  {
    name: "AP/AR Specialist",
    role: "Work Experience: 2+ years",
    avatar: "https://shadcnblocks.com/images/block/avatar-2.webp",
    content:
      "AR Collections, AP Processing, Bank Reconciliations, Invoice Application, Payment Posting, GAAP-compliance, Inventory Control, Audit Preparation",
  },
  {
    name: "Senior Financial Analyst",
    role: "Work Experience: 4+ years",
    avatar: "https://shadcnblocks.com/images/block/avatar-3.webp",
    content:
      "Financial-Modeling, Month-End Close, Forecasting, Budgeting, Variance Analysis, Headcount Tracking, KPIs, Dashboard Reporting, Liquidity Management",
  },
  {
    name: "Senior Credit Analyst",
    role: "Work Experience: 5+ years",
    avatar: "https://shadcnblocks.com/images/block/avatar-4.webp",
    content:
      "High Yield Research, Distressed Debt, Valuation Analysis, DCF, Waterfall Modeling, Fixed Income Metrics, Bankruptcy Process, Z-spread, Credit Memos",
  },
  {
    name: "Head of FP&A",
    role: "Work Experience: 10+ years",
    avatar: "https://shadcnblocks.com/images/block/avatar-5.webp",
    content:
      "Three Statement Modelling, Trend Analysis, KPI Monitoring, Cost Optimization, Debt Equity Structuring, Capital Investments, Stakeholder Alignment",
  },
  {
    name: "Investment Analyst",
    role: "Work Experience: 3+ years",
    avatar: "https://shadcnblocks.com/images/block/avatar-6.webp",
    content:
      "Python, SQL, MS Excel, Valuation, Scenario Planning, Market Research, Deal Sourcing, Due Diligence, Portfolio Monitoring, Investment Reports",
  },
];

const GRADIENT_COLORS = ["#CCFBF1", "#72E3AD", "#00B389", "#06B6D4", "#0EA5E9"];

function GradientRule() {
  return (
    <div
      aria-hidden="true"
      className="h-px w-full opacity-90"
      style={{
        backgroundImage: `linear-gradient(90deg, ${GRADIENT_COLORS.join(",")})`,
      }}
    />
  );
}

function FadeEdges({ children }: { children: ReactNode }) {
  return (
    <div
      className={[
        "relative w-full overflow-hidden",

        "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10",
        "before:w-16 md:before:w-44 lg:before:w-60",
        "before:from-background before:bg-linear-to-r before:to-transparent",

        "after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10",
        "after:w-16 md:after:w-44 lg:after:w-60",
        "after:from-background after:bg-linear-to-l after:to-transparent",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function ProfileCard({ t }: { t: Testimonial }) {
  return (
    <Card className="bg-background text-accent-foreground max-w-96 rounded-lg border-none p-4 shadow-none select-none">
      <div className="flex items-start gap-4">
        <Avatar className="ring-input h-10 w-10 shrink-0 rounded-full ring-1">
          <AvatarImage src={t.avatar} alt={t.name} loading="lazy" />
        </Avatar>

        <div className="min-w-0">
          <p className="text-muted-foreground text-sm font-medium text-balance md:text-base">
            {t.name}
          </p>
          <p className="text-muted-foreground text-xs leading-relaxed font-normal text-balance md:text-sm">
            {t.role}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <GradientRule />
      </div>

      <q className="text-muted-foreground text-xs leading-relaxed font-normal text-balance md:text-sm">
        {t.content}
      </q>
    </Card>
  );
}

const Testimonial7 = () => {
  const plugin1 = useRef(
    AutoScroll({
      startDelay: 500,
      speed: 0.35,
    }),
  );

  const plugin2 = useRef(
    AutoScroll({
      startDelay: 500,
      speed: 0.35,
      direction: "backward",
    }),
  );

  return (
    <section className="pt-4 pb-0">
      <div className="container">
        <div className="space-y-4">
          <h2 className="sr-only">Featured candidate profiles</h2>

          <FadeEdges>
            <Carousel
              opts={{ loop: true }}
              plugins={[plugin1.current]}
              onMouseLeave={() => plugin1.current.play()}
            >
              <CarouselContent className="-ml-2">
                {testimonials1.map((t, index) => (
                  <CarouselItem key={index} className="basis-auto pl-2">
                    <ProfileCard t={t} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </FadeEdges>

          <FadeEdges>
            <Carousel
              opts={{ loop: true }}
              plugins={[plugin2.current]}
              onMouseLeave={() => plugin2.current.play()}
            >
              <CarouselContent className="-ml-2">
                {testimonials2.map((t, index) => (
                  <CarouselItem key={index} className="basis-auto pl-2">
                    <ProfileCard t={t} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </FadeEdges>
        </div>
      </div>
    </section>
  );
};

export { Testimonial7 };
