import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const Timeline13 = () => {
  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="flex flex-col">
          <h2 className="text-foreground mb-8 max-w-3xl text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
            Delivery model
          </h2>
          <p className="text-muted-foreground max-w-3xl text-base leading-normal font-normal text-balance md:text-lg">
            Every engagement follows a disciplined three-phase delivery model. We begin with your
            finance brief, sharpen objectives and constraints, and map the current data and process
            landscape. We then architect and implement an integrated operating model across systems,
            controls, and teams, culminating in a live stack of models, reports, and workflows that
            deliver measurable business value.
          </p>
        </div>
        <div className="border-border/60 bg-background mt-8 flex flex-col gap-8 rounded-lg border px-4 pt-4 pb-0 sm:px-8 sm:pt-8 sm:pb-0">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="text-muted-foreground text-lg font-medium text-balance md:text-xl">
              From brief to business value
            </h3>
            <Button className="group relative z-10 w-fit rounded-full! px-10 tracking-tight shadow-none!">
              <span>Request a demo</span>
              <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="border-border/60 bg-background flex h-full flex-col gap-4 rounded-lg border p-4">
              <div className="flex flex-col gap-3">
                <div className="border-border/60 bg-background text-muted-foreground flex h-8 w-fit items-center gap-2 rounded-lg border px-2 text-xs font-medium text-balance md:text-sm">
                  <span>01</span>
                  <span>Ideation</span>
                </div>
                <h4 className="text-muted-foreground text-sm font-medium text-balance md:text-base">
                  Clarify and stress-test your brief
                </h4>
                <p className="text-muted-foreground text-sm font-normal text-balance">
                  Work with your finance and business leaders to sharpen the question we are
                  solving, surface constraints, and align on success metrics. We map your current
                  data, systems, and processes to identify quick wins and the right scope for the
                  first release.
                </p>
              </div>
              <p className="text-muted-foreground mt-auto text-xs">
                ~2 weeks - Problem framed and roadmap agreed
              </p>
            </div>
            <div className="border-border/60 bg-background flex h-full flex-col gap-4 rounded-lg border p-4">
              <div className="flex flex-col gap-3">
                <div className="border-border/60 bg-background text-muted-foreground flex h-8 w-fit items-center gap-2 rounded-lg border px-2 text-xs font-medium text-balance md:text-sm">
                  <span>02</span>
                  <span>Development</span>
                </div>
                <h4 className="text-muted-foreground text-sm font-medium text-balance md:text-base">
                  Design and build the operating stack
                </h4>
                <p className="text-muted-foreground text-sm font-normal text-balance">
                  Translate the brief into a working finance operating model: data structures,
                  calculation logic, controls, reports, and workflows. We build in short,
                  review-driven cycles using your real data, so stakeholders can see, test, and
                  refine the solution as it takes shape.
                </p>
              </div>
              <p className="text-muted-foreground mt-auto text-xs">
                ~6 weeks - Models, reports, and workflows live in pilot
              </p>
            </div>
            <div className="border-border/60 bg-background flex h-full flex-col gap-4 rounded-lg border p-4">
              <div className="flex flex-col gap-3">
                <div className="border-border/60 bg-background text-muted-foreground flex h-8 w-fit items-center gap-2 rounded-lg border px-2 text-xs font-medium text-balance md:text-sm">
                  <span>03</span>
                  <span>Launch & Maintain</span>
                </div>
                <h4 className="text-muted-foreground text-sm font-medium text-balance md:text-base">
                  Embed, support, and continuously improve
                </h4>
                <p className="text-muted-foreground text-sm font-normal text-balance">
                  Move from pilot to business-as-usual, with us alongside your team. We harden the
                  stack for production, train users, and put in place governance, documentation, and
                  KPIs. After launch, we stay involved to monitor performance, resolve issues, and
                  evolve the model as your business and data change.
                </p>
              </div>
              <p className="text-muted-foreground mt-auto text-xs">
                Launch complete - Ongoing optimization and support
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Timeline13 };
