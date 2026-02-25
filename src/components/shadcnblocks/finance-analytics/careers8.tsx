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
    category: "Data Engineering & Analytics",
    subcategories: [
      {
        title: "Finance Data Foundation",
        micro: ["Data pipelines", "Data modeling", "Data governance"],
      },
      {
        title: "GL & Reporting",
        micro: ["Cashflow mapping", "Flux analysis", "Segment reporting"],
      },
      {
        title: "Planning, Budgeting & Forecasting",
        micro: ["Driver planning", "Rolling forecast", "Scenario modeling"],
      },
      {
        title: "Working Capital",
        micro: ["Cash conversion cycle", "Receivables & payables aging", "Inventory turns"],
      },
      {
        title: "Cost & Profitability",
        micro: ["Unit Economics", "Margin Waterfall", "Price-Mix-Volume"],
      },
      {
        title: "Capital Investments",
        micro: ["NPV & IRR", "Scenarios & simulation", "Portfolio optimization"],
      },
    ],
  },

  {
    category: "AI-Powered Workflow Automation",
    subcategories: [
      {
        title: "Procure-to-Pay (P2P)",
        micro: ["Invoice capture", "3-way match", "Vendor onboarding"],
      },
      {
        title: "Order-to-Cash (O2C)",
        micro: ["E-invoicing", "Cash application", "Collections"],
      },
      {
        title: "Acquire-to-Retire (A2R)",
        micro: ["Asset capitalization", "Depreciation runs", "Transfers & retirements"],
      },
      {
        title: "Hire-to-Retire (H2R)",
        micro: ["Time & attendance", "Expense management", "Payroll postings"],
      },
      {
        title: "Record-to-Report (R2R)",
        micro: ["Close orchestration", "Account reconciliations", "Consolidation & reporting"],
      },
    ],
  },

  {
    category: "Low-Code Apps",
    subcategories: [
      {
        title: "Bespoke Finance Apps",
        micro: ["Schema-driven forms", "API & webhooks", "Routing & rules"],
      },
    ],
  },
];

const options = [
  { label: "All", value: "all" },
  {
    label: "Data Engineering & Analytics",
    value: "data_engineering_analytics",
  },
  {
    label: "AI-Powered Workflow Automation",
    value: "ai_powered_workflow_automation",
  },
  { label: "Low-Code Apps", value: "low_code_apps" },
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
              From daily execution to board-level planning, our solutions work as one connected
              finance system. Each module shares consistent KPI logic, workflow orchestration, and
              control visibility—so analytics, AI automation, and apps reinforce each other and
              compound in value over time.
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
