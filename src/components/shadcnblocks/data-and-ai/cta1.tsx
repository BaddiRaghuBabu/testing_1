"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Cta1 = () => {
  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <Card className="border-border/60 bg-muted/40 flex flex-col gap-8 rounded-lg border p-8 shadow-none md:flex-row md:items-stretch">
          <div className="flex flex-1 flex-col justify-center text-left md:flex-[1.1]">
            <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
              Build a decision-grade data and AI foundation
            </h2>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed font-normal text-balance md:text-base">
              In a short discovery call, we'll identify priority decisions, confirm readiness across
              data quality, security, and governance, and deliver a phased roadmap from pipelines
              and metric standards to production AI workflows.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="default"
                className="group relative z-10 w-fit rounded-full! px-10 tracking-tighter shadow-none!"
              >
                <span>Book a blueprint session</span>
                <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
              </Button>
              <p className="text-muted-foreground text-[12px] md:text-xs">
                30-minute video call | No cost, no obligation.
              </p>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end md:flex-[1.2]">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="India GCC illustration"
              className="aspect-video w-full max-w-md object-cover md:max-w-lg"
            />
          </div>
        </Card>
      </div>
    </section>
  );
};

export { Cta1 };
