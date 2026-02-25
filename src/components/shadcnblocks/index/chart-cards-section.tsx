"use client";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { ChartCard26 } from "@/components/shadcnblocks/index/chart-card26";
import { ChartCard6 } from "@/components/shadcnblocks/index/chart-card6";

interface ChartCardsSectionProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  className?: string;
}

const ChartCardsSection = ({
  eyebrow = "Finance Analytics",
  heading = "Unified finance data\nDecision-grade metrics\nGoverned AI automation",
  description = "We engineer financial models that unify data from disparate systems into a single, auditable source of truth; governed AI automates workflows and routes exceptions for review.",
  primaryCta = {
    label: "Discuss your finance workflows",
    href: "https://outlook.office365.com/book/Valuenode@valuenode.com/s/WVupA6gsR0KVVu36Q0-McA2?ismsaljsauthenabled=true",
  },
  secondaryCta = {
    label: "Explore",
    href: "/finance-analytics",
  },
  className,
}: ChartCardsSectionProps) => {
  return (
    <section className={cn("pt-20 pb-4 md:pt-24 lg:pt-28", className)}>
      <div className="container">
        <div className="flex flex-col gap-8 md:gap-10 lg:gap-12">
          <div className="flex flex-col">
            <p className="text-muted-foreground mb-4 text-center text-xs font-normal tracking-[0.16em] uppercase">
              <span className="inline-flex items-center gap-2">
                <span className="bg-border h-px w-8" />
                {eyebrow}
                <span className="bg-border h-px w-8" />
              </span>
            </p>
            <h2 className="text-foreground mx-auto mb-8 max-w-3xl text-center text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
              {heading.split("\n").map((line, index) => (
                <span key={line}>
                  {line}
                  {index < heading.split("\n").length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-center text-base leading-normal font-normal text-balance md:text-lg">
              {description}
            </p>
            <div className="mt-0 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
              <Button
                variant="default"
                className="group relative z-10 w-fit rounded-full! px-10 tracking-tight shadow-none!"
                asChild
              >
                <a href={primaryCta.href} target="_blank" rel="noopener noreferrer">
                  {primaryCta.label}
                  <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
                </a>
              </Button>
              <Button variant="link" className="text-muted-foreground text-sm" asChild>
                <a href={secondaryCta.href} target="_blank" rel="noopener noreferrer">
                  {secondaryCta.label}
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ChartCard26 className="w-full max-w-none" />
            <ChartCard6 className="w-full max-w-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export { ChartCardsSection };
