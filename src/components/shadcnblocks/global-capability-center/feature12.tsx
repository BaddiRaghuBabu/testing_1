"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";

const services = [
  {
    title: "01 Mandate",
    description:
      "Set the GCC's purpose, value and limits so leaders align on scope, risk appetite and success metrics before any design, location or hiring decisions.",
    items: ["Purpose and scope", "Risk and guardrails", "Success metrics agreed"],
  },
  {
    title: "02 Blueprint",
    description:
      "Turn GCC intent into a signable design: engagement model, operating model, locations, ramp plan and economics tied to clear owners.",
    items: ["Engagement choice", "Operating design", "Ramp and economics"],
  },
  {
    title: "03 Foundation",
    description:
      "Set the legal and regulatory base: entity design, core registrations, intercompany terms and a compliance calendar, before scaling hiring or transitioning work.",
    items: ["Entity and licenses", "Regulatory filings", "Intercompany terms"],
  },
  {
    title: "04 Workspace",
    description:
      "Set the physical and digital environment: location, office, IT and security, so GCC teams operate to group standards from day one.",
    items: ["Location choice", "Office and fit-out", "IT and security"],
  },
  {
    title: "05 Launch",
    description:
      "Put GCC leadership and seed teams in place, run phased work transitions, and standardise core SOPs so day-one operations are stable and auditable.",
    items: ["Leadership hiring", "Seed teams", "Phased transitions"],
  },
  {
    title: "06 Scale",
    description:
      "Run the GCC as a stable platform, extend scope into new service lines and locations, and, where agreed, execute structured transfers or exits under defined mechanics.",
    items: ["Stable operations", "Scope expansion", "Transfer or exit"],
  },
];

const Feature12 = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const total = services.length;
  const [current, setCurrent] = useState(1);
  const [progress, setProgress] = useState((1 / total) * 100);

  useEffect(() => {
    if (!api) return;

    const updateFromApi = () => {
      const selected = api.selectedScrollSnap() + 1;
      setCurrent(selected);
      setProgress((selected / total) * 100);
    };

    updateFromApi();
    api.on("select", updateFromApi);

    return () => {
      api.off("select", updateFromApi);
    };
  }, [api, total]);

  const currentLabel = String(current).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="mb-8 max-w-3xl text-left">
          <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
            From mandate to scale
          </h2>
          <p className="text-muted-foreground text-base leading-normal font-normal text-balance md:text-lg">
            Building an India GCC is a staged reconfiguration of your operating model across cost,
            talent, risk and technology. The steps below set out a typical journey from mandate to
            scaled operations, clarifying how strategy, design and execution progress in sequence.
            Each program is calibrated to your footprint, regulatory context and governance
            requirements.
          </p>
        </div>

        <div className="text-left">
          <Carousel
            className="w-full"
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            aria-label="GCC build stages from mandate to scale"
          >
            <div className="mb-8 flex justify-start">
              <div className="flex w-full max-w-xl flex-wrap items-center gap-4">
                <div className="text-muted-foreground flex items-center gap-3 text-xs">
                  <span className="text-muted-foreground">Step</span>
                  <span className="text-foreground font-medium tabular-nums">{currentLabel}</span>
                  <span className="text-muted-foreground">of</span>
                  <span className="tabular-nums">{totalLabel}</span>
                  <Progress
                    value={progress}
                    className="ml-3 h-0.5 w-20 sm:w-32 lg:w-64"
                    aria-hidden="true"
                  />
                </div>

                <div className="flex flex-none items-center gap-2">
                  <CarouselPrevious className="border-border/60 bg-background text-foreground/80 hover:bg-muted/40 static h-9 w-9 translate-x-0 translate-y-0 rounded-full border" />
                  <CarouselNext className="border-border/60 bg-background text-foreground/80 hover:bg-muted/40 static h-9 w-9 translate-x-0 translate-y-0 rounded-full border" />
                </div>
              </div>
            </div>

            <CarouselContent className="-ml-2">
              {services.map((service, index) => {
                const [, ...restTitle] = service.title.split(" ");
                const stepTitle = restTitle.join(" ");
                const stepNumber = String(index + 1).padStart(2, "0");

                return (
                  <CarouselItem
                    key={service.title}
                    className="basis-[90%] pl-2 sm:basis-[65%] lg:basis-[32%] xl:basis-[30%]"
                  >
                    <div className="group border-border/60 bg-background hover:bg-muted/40 flex h-full min-h-[260px] flex-col border p-7 md:min-h-[280px] md:p-8">
                      <div className="flex h-full flex-col">
                        <div className="mb-2 space-y-2.5">
                          <div className="flex items-baseline gap-2">
                            <span className="text-muted-foreground text-xs font-normal tracking-[0.16em] uppercase">
                              {stepNumber}
                            </span>
                            <h3 className="text-muted-foreground text-sm font-medium text-balance md:text-base">
                              {stepTitle}
                            </h3>
                          </div>
                          <p className="text-muted-foreground text-xs leading-relaxed font-normal text-balance md:text-sm">
                            {service.description}
                          </p>
                        </div>

                        <ul className="mt-auto space-y-4">
                          {service.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-2 text-xs md:text-[13px]"
                            >
                              <div className="bg-muted-foreground/15 flex h-4 w-4 flex-none items-center justify-center rounded-full">
                                <Check className="text-muted-foreground h-2.5 w-2.5" />
                              </div>
                              <span className="text-muted-foreground text-xs font-normal text-balance md:text-sm">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          <div className="mt-8">
            <Button
              variant="default"
              className="group relative z-10 w-fit rounded-full! px-10 tracking-tight shadow-none!"
            >
              <span>Design your GCC roadmap</span>
              <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature12 };
