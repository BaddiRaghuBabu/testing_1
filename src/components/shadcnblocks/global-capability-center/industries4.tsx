"use client";

import { CornerDownRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Contractor {
  id: string;
  category: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  learnMoreUrl: string;
}

interface Industries4Props {
  heading?: string;
  contractors?: Contractor[];
}

const DEFAULT_CONTRACTORS: Contractor[] = [
  {
    id: "GCC-as-a-Service",
    category: "GCC-as-a-Service",
    title:
      "GCC-as-a-Service provides India entry on an opex basis using our India entity and operating stack, without forming a subsidiary at the outset. We manage HR, facilities and local compliance under agreed policies, with IP and data protections and contractual options to transition to a standalone GCC or BOT as scale and strategy develop.",
    imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/industry/hydro.jpg",
    imageAlt: "GCC-as-a-Service",
    learnMoreUrl: "#",
  },
  {
    id: "Build-Operate-Transfer (BOT)",
    category: "Build-Operate-Transfer (BOT)",
    title:
      "Build-Operate-Transfer suits organizations that intend a captive GCC but prefer staged execution. Working to an agreed blueprint, we design the entity, office, core technology and leadership, operate the center to defined service and cost parameters, then transfer people, assignable contracts and IP under a structured, documented handover.",
    imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/industry/wind.jpg",
    imageAlt: "Build-Operate-Transfer (BOT)",
    learnMoreUrl: "#",
  },
  {
    id: "Managed Teams",
    category: "Managed Teams",
    title:
      "Managed Teams provide India-based capacity under your brand and direction without creating a local entity or real-estate footprint. You set objectives and KPIs; we manage hiring, HR and infrastructure so capacity can scale, run on a stand-alone basis or support existing GCCs with overflow work and early-stage pilots.",
    imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/industry/solar.jpg",
    imageAlt: "Managed Teams",
    learnMoreUrl: "#",
  },
];

const ENGAGEMENT_LABEL = "Engagement model";
const LEARN_MORE_LABEL = "Learn more";

const EngagementLabel = () => (
  <p className="text-muted-foreground text-xs font-normal tracking-[0.16em] uppercase">
    {ENGAGEMENT_LABEL}
  </p>
);

const LearnMoreLink = ({ url }: { url: string }) => (
  <Button
    variant="ghost"
    size="sm"
    className="text-muted-foreground hover:text-muted-foreground/80 w-fit p-0 text-sm font-medium"
    asChild
  >
    <a href={url}>
      <CornerDownRight className="mr-1 h-3 w-3" />
      {LEARN_MORE_LABEL}
    </a>
  </Button>
);

const Industries4 = ({
  heading = "Engagement models",
  contractors = DEFAULT_CONTRACTORS,
}: Industries4Props) => {
  const safeContractors = contractors.length ? contractors : DEFAULT_CONTRACTORS;

  const [activeContractorId, setActiveContractorId] = useState(safeContractors[0]?.id ?? "");

  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="mb-8 max-w-3xl text-left">
          <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="text-muted-foreground text-base leading-normal font-normal text-balance md:text-lg">
            We structure India entry through three engagement models that calibrate ownership,
            capital commitment and operational responsibility. Each can stand alone or be sequenced
            as the GCC matures, with specific terms and mechanics agreed case by case.
          </p>
        </div>

        <div className="space-y-2 lg:hidden" aria-label="Engagement models">
          {safeContractors.map((contractor) => (
            <article
              key={contractor.id}
              className="border-border/60 bg-background overflow-hidden rounded-lg border"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={contractor.imageSrc}
                  alt={contractor.imageAlt}
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
              </div>

              <div className="space-y-3 p-6">
                <EngagementLabel />
                <h3 className="text-muted-foreground text-base leading-snug font-medium text-balance md:text-lg">
                  {contractor.category}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed md:text-[0.95rem]">
                  {contractor.title}
                </p>

                <LearnMoreLink url={contractor.learnMoreUrl} />
              </div>
            </article>
          ))}
        </div>

        <div className="hidden gap-10 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
          <div className="space-y-2">
            {safeContractors.map((contractor, index) => {
              const isActive = contractor.id === activeContractorId;

              return (
                <button
                  key={contractor.id}
                  type="button"
                  onMouseEnter={() => setActiveContractorId(contractor.id)}
                  onFocus={() => setActiveContractorId(contractor.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors",
                    "focus-visible:ring-primary/70 focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                    isActive
                      ? "border-border/60 bg-muted/40"
                      : "border-border/60 bg-background hover:bg-muted/40",
                  )}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-muted-foreground text-xs font-normal tracking-[0.16em] uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted-foreground text-sm font-medium text-balance md:text-base">
                      {contractor.category}
                    </span>
                  </div>
                  <CornerDownRight className="text-muted-foreground h-3 w-3" />
                </button>
              );
            })}
          </div>

          <div className="relative h-[360px] md:h-[380px] lg:h-[420px]">
            {safeContractors.map((contractor) => {
              const isActive = contractor.id === activeContractorId;

              return (
                <article
                  key={contractor.id}
                  className={cn(
                    "border-border/60 bg-muted/40 absolute inset-0 flex h-full overflow-hidden rounded-lg border transition-opacity duration-300",
                    isActive ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                >
                  <div className="grid h-full items-stretch gap-0 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)]">
                    <div className="flex h-full flex-col gap-4 p-6 md:p-8">
                      <div className="space-y-4">
                        <EngagementLabel />
                        <h3 className="text-muted-foreground text-base font-medium text-balance md:text-lg">
                          {contractor.category}
                        </h3>
                        <p className="text-muted-foreground text-xs leading-relaxed font-normal text-balance md:text-sm">
                          {contractor.title}
                        </p>
                      </div>

                      <LearnMoreLink url={contractor.learnMoreUrl} />
                    </div>

                    <div className="relative hidden h-full overflow-hidden md:block">
                      <img
                        src={contractor.imageSrc}
                        alt={contractor.imageAlt}
                        className="h-full w-full object-cover"
                      />
                      <div className="from-background/70 via-background/10 pointer-events-none absolute inset-0 bg-linear-to-l to-transparent" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Industries4 };
