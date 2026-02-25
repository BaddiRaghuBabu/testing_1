"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { BrainCircuit, ChartNoAxesCombined, Grid2x2Check, Play, DatabaseZap } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";

const testimonials = [
  {
    company: "AI",
    icon: BrainCircuit,
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/portraits/nima-motaghian-nejad-_omdf_EgRUo-unsplash.jpg",
    description:
      "We build enterprise AI systems grounded in your proprietary data—integrated into the tools your teams already use. From advanced retrieval and RAG to evaluation, deployment, monitoring, and change control, we take solutions from pilot to production with safety and traceability built in.",
    tags: [
      "Advanced Retrieval",
      "RAG & Grounding",
      "Generative AI",
      "Agentic Workflows",
      "LLMOps & Evaluation",
    ],
  },
  {
    company: "Data Engineering",
    icon: DatabaseZap,
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/portraits/alexander-hipp-iEEBWgY_6lA-unsplash.jpg",
    description:
      "We engineer end-to-end data foundations: target architecture, platform design, and production pipelines that convert raw feeds into secure, analysis-ready datasets. With data contracts, testing, lineage, and observability, we keep pipelines reliable as analytics and AI scale across domains.",
    tags: [
      "Target Architecture",
      "Platform Engineering",
      "Production Pipelines",
      "DataOps & Observability",
      "Security & Governance",
    ],
  },
  {
    company: "Data Modelling",
    icon: Grid2x2Check,
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/portraits/alexander-hipp-iEEBWgY_6lA-unsplash.jpg",
    description:
      "We translate business domains into canonical schemas and a semantic metrics layer—so KPIs stay consistent across BI, planning, and AI. On top, we build statistical, ML, and optimisation models framed around decisions, validated rigorously, and managed for drift and reliability.",
    tags: [
      "Canonical Schemas",
      "Semantic Metrics Layer",
      "Forecasting & Inference",
      "Decision Optimisation",
      "Model Governance",
    ],
  },
  {
    company: "Data Visualization",
    icon: ChartNoAxesCombined,
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/portraits/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg",
    description:
      "We build decision-first dashboards that surface the few metrics, trends, and exceptions that matter—then provide drill paths to the underlying transactions. With consistent standards and self-serve enablement, teams move faster while staying aligned on one version of the truth.",
    tags: [
      "Decision-First Dashboards",
      "Explainable Drill Paths",
      "Scenario & What-If Views",
      "Self-Serve Analytics",
      "Design & BI Standards",
    ],
  },
];

const logos = [
  {
    id: "logo-1",
    description: "Astro",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
    className: "h-7 w-auto",
  },
  {
    id: "logo-2",
    description: "Logo 2",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
    className: "h-7 w-auto",
  },
  {
    id: "logo-3",
    description: "Logo 3",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
    className: "h-7 w-auto",
  },
  {
    id: "logo-4",
    description: "Logo 4",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
    className: "h-7 w-auto",
  },
  {
    id: "logo-5",
    description: "Logo 5",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
    className: "h-7 w-auto",
  },
  {
    id: "logo-6",
    description: "Logo 6",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
    className: "h-5 w-auto",
  },
  {
    id: "logo-7",
    description: "Logo 7",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
    className: "h-7 w-auto",
  },
  {
    id: "logo-8",
    description: "Logo 8",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-7.svg",
    className: "h-7 w-auto",
  },

  {
    id: "logo-1b",
    description: "Astro",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
    className: "h-7 w-auto",
  },
  {
    id: "logo-2b",
    description: "Logo 2",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
    className: "h-7 w-auto",
  },
  {
    id: "logo-3b",
    description: "Logo 3",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
    className: "h-7 w-auto",
  },
  {
    id: "logo-4b",
    description: "Logo 4",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
    className: "h-7 w-auto",
  },
  {
    id: "logo-5b",
    description: "Logo 5",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
    className: "h-7 w-auto",
  },
  {
    id: "logo-6b",
    description: "Logo 6",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
    className: "h-5 w-auto",
  },
  {
    id: "logo-7b",
    description: "Logo 7",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
    className: "h-7 w-auto",
  },
  {
    id: "logo-8b",
    description: "Logo 8",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-7.svg",
    className: "h-7 w-auto",
  },
];

interface Testimonial30Props {
  className?: string;
}

const Testimonial30 = ({ className }: Testimonial30Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimers();
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setProgress(0);
    }, 5000);

    progressTimerRef.current = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 2));
    }, 100);
  }, [clearTimers, isPaused]);

  useEffect(() => {
    startTimer();
    return clearTimers;
  }, [startTimer, clearTimers]);

  const togglePlayback = useCallback(() => {
    setIsPaused((prev) => {
      const next = !prev;
      if (!next) setProgress(0);
      return next;
    });
  }, []);

  return (
    <section className={cn("pt-16 pb-0", className)}>
      <div className="container max-w-7xl">
        <Accordion
          type="single"
          collapsible
          value={currentIndex.toString()}
          onValueChange={(value) => {
            if (!value) return;
            const idx = parseInt(value, 10);
            setCurrentIndex(idx);
            setProgress(0);
            setIsPaused(true);
          }}
        >
          {testimonials.map((t, index) => (
            <AccordionItem key={index} value={index.toString()}>
              <AccordionTrigger className="py-5 hover:no-underline focus-visible:border-transparent focus-visible:ring-0 focus-visible:outline-none md:py-6">
                <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg md:size-9">
                    <t.icon className="text-foreground size-5" />
                  </span>
                  <p className="text-lg font-medium tracking-tight">{t.company}</p>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-0 pt-0 pb-0">
                <div className="px-0">
                  <div className="grid items-start gap-6 pb-6 md:grid-cols-[240px_minmax(0,1fr)] md:gap-8 md:pb-8 lg:grid-cols-[256px_minmax(0,1fr)] lg:gap-6">
                    <div className="flex justify-center pt-2 md:block md:pt-0 md:pb-0">
                      <img
                        src={t.avatar}
                        alt={t.company}
                        width={256}
                        height={256}
                        className="aspect-square w-full max-w-[320px] rounded-xl object-cover md:w-64 md:max-w-none"
                        loading="lazy"
                      />
                    </div>

                    <div className="relative flex min-w-0 flex-col gap-4 md:min-h-64">
                      <div className="relative h-12 w-full overflow-hidden sm:h-14 md:h-16">
                        <Carousel
                          plugins={[
                            AutoScroll({
                              playOnInit: true,
                              speed: 0.75,
                              stopOnInteraction: false,
                            }),
                          ]}
                          opts={{ loop: true, align: "start" }}
                          className="h-12 w-full sm:h-14 md:h-16"
                        >
                          <CarouselContent className="h-12 items-start sm:h-14 md:h-16">
                            {logos.map((logo, i) => (
                              <CarouselItem key={`${logo.id}-${i}`} className="basis-auto">
                                <div className="flex h-12 items-start justify-center px-2 pt-1 opacity-25 sm:h-14 sm:px-3 md:h-16 md:px-4">
                                  <img
                                    src={logo.image}
                                    alt={logo.description}
                                    className={cn(logo.className, "max-h-8 md:max-h-9")}
                                    loading="lazy"
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                        </Carousel>

                        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r to-transparent sm:w-12 md:w-16" />
                        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l to-transparent sm:w-12 md:w-16" />
                      </div>

                      <div className="max-w-none min-w-0 pr-1 md:max-w-2xl">
                        <p className="text-muted-foreground mx-auto max-w-3xl text-left text-sm font-normal md:text-base">
                          {t.description}
                        </p>
                      </div>

                      <div>
                        <Button
                          variant="link"
                          className="text-muted-foreground h-auto justify-start px-0 py-0 text-sm"
                          asChild
                        >
                          <a href="/data-and-ai" target="_blank" rel="noopener noreferrer">
                            Explore
                          </a>
                        </Button>
                      </div>

                      <div className="mt-auto pt-2">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div className="flex flex-wrap gap-2 sm:gap-3">
                            {t.tags.map((tag) => (
                              <span
                                key={tag}
                                className="bg-muted text-muted-foreground inline-flex cursor-pointer rounded-full px-4 py-1 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-end gap-4 md:shrink-0">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={togglePlayback}
                              aria-label={isPaused ? "Play autoplay" : "Pause autoplay"}
                              className="h-auto w-auto border-0 bg-transparent p-0 shadow-none hover:bg-transparent focus-visible:ring-0"
                            >
                              {isPaused ? (
                                <Play className="size-4 fill-current stroke-0" />
                              ) : (
                                <span
                                  className="inline-flex items-center gap-[3px]"
                                  aria-hidden="true"
                                >
                                  <span className="h-3.5 w-0.5 rounded-sm bg-current" />
                                  <span className="h-3.5 w-0.5 rounded-sm bg-current" />
                                </span>
                              )}
                            </Button>
                            <Progress value={progress} className="h-1 w-20" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export { Testimonial30 };
