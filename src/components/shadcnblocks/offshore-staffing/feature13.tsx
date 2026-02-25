"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { CornerDownRight } from "lucide-react";

interface Feature {
  id: string;
  title: ReactNode;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
}

interface Feature13Props {
  features?: Feature[];
}

const Feature13 = ({
  features = [
    {
      id: "feature-1",
      title: (
        <>
          Powering <br /> tech innovators
        </>
      ),
      subtitle: "TECH & PRODUCT",
      description:
        "Solution Architect, Cloud/DevOps Engineer, Full-stack Developer, Product Manager, Data Engineer, Data Scientist, Database Administrator, UI/UX Designer, QA Engineer, Cybersecurity Specialist",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      cta: "Explore Tech & Product Talent",
    },
    {
      id: "feature-2",
      title: (
        <>
          Powering <br /> the CFO&apos;s office
        </>
      ),
      subtitle: "ACCOUNTING & FINANCE",
      description:
        "Finance Manager, Controller, Accountant, Auditor, Tax Consultant, AP/AR Specialist, Payroll Specialist, Financial Analyst, Treasury Analyst, Credit Analyst, Investment Analyst, Risk Manager",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
      cta: "Explore Accounting & Finance Talent",
    },
  ],
}: Feature13Props) => {
  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="grid gap-4 lg:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="border-border/60 bg-background flex flex-col justify-between rounded-lg border"
            >
              <div className="border-border/60 flex justify-between border-b">
                <div className="flex flex-col justify-between gap-2 py-8 pl-4 md:py-8 md:pl-8 lg:justify-start">
                  <p className="text-muted-foreground mb-2 text-xs font-normal tracking-[0.16em] uppercase">
                    {feature.subtitle}
                  </p>
                  <h2 className="text-foreground mx-auto mb-8 max-w-3xl text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
                    {feature.title}
                  </h2>
                </div>
                <div className="border-border/60 bg-background w-2/5 shrink-0 rounded-r-lg border-l md:w-1/3">
                  <img
                    src={feature.image}
                    alt=""
                    role="presentation"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="text-muted-foreground max-w-3xl p-4 text-sm leading-relaxed font-normal tracking-tight md:p-8 md:text-base">
                {feature.description}
              </div>

              <div className="flex items-start pt-4 pb-4 pl-4 md:pt-0 md:pb-8 md:pl-8">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-muted-foreground/80 mt-4 w-fit p-0 text-sm font-medium"
                  asChild
                >
                  <a href="#">
                    <CornerDownRight className="mr-1 h-3 w-3" />
                    Learn more
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature13 };
