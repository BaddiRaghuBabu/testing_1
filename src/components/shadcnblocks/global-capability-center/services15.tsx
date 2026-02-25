"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type UseCase = {
  title: string;
  image: string;
  description: string;
  url: string;
  height: "tall" | "medium" | "short";
};

const useCases: UseCase[] = [
  {
    title: "Data & AI Center",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-6jEVl7xPH3E-unsplash.jpg",
    description:
      "Data engineering, analytics and AI/ML teams that convert fragmented data into decision-grade insight and reusable models, governed under a single taxonomy and controls framework.",
    url: "",
    height: "tall",
  },
  {
    title: "Customer Experience & Operations Center",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-gDmVqxZt1hg-unsplash.jpg",
    description:
      "Customer support, success and revenue-operations teams that sustain experience, retention and cash flow while operating under your brand, scripts and regulatory guardrails across channels and time zones.",
    url: "",
    height: "medium",
  },
  {
    title: "Finance & Risk Control Center",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9__Q24sJqKg-unsplash.jpg",
    description:
      "A finance and risk 'control tower' for controllership, FP&A and compliance, designed to strengthen visibility, forecasting and issue management from a single, scalable platform.",
    url: "",
    height: "short",
  },
  {
    title: "Innovation Lab",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg",
    description:
      "A controlled environment for testing new technologies, operating models and service lines, running disciplined pilots, measuring impact rigorously and scaling only what meets agreed risk and return thresholds.",
    url: "",
    height: "tall",
  },
  {
    title: "Enterprise Shared Services Center",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg",
    description:
      "Standardized finance, HR, IT and procurement operations that consolidate high-volume work, strengthen controls and reporting, and free business units to focus on growth and customers.",
    url: "",
    height: "tall",
  },
  {
    title: "Product & Engineering Center",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-h4H-6HQ2zog-unsplash.jpg",
    description:
      "Product, engineering and design pods that build and evolve digital products and platforms, from roadmap and architecture through delivery, experimentation and ongoing optimization.",
    url: "",
    height: "medium",
  },
];

const Services15 = () => {
  const [isHoverCapable, setIsHoverCapable] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateHoverCapability = () => setIsHoverCapable(mediaQuery.matches);

    updateHoverCapability();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateHoverCapability);
      return () => mediaQuery.removeEventListener("change", updateHoverCapability);
    }

    mediaQuery.addListener(updateHoverCapability);
    return () => mediaQuery.removeListener(updateHoverCapability);
  }, []);

  useEffect(() => {
    if (isHoverCapable) {
      setActiveIndex(null);
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }
      if (!(event.target instanceof Element)) {
        setActiveIndex(null);
        return;
      }
      if (!section.contains(event.target)) {
        setActiveIndex(null);
        return;
      }
      if (!event.target.closest("[data-card]")) {
        setActiveIndex(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isHoverCapable]);
  const getHeightClass = (height: UseCase["height"]) => {
    switch (height) {
      case "tall":
        return "h-96";
      case "medium":
        return "h-80";
      case "short":
        return "h-64";
      default:
        return "h-64";
    }
  };

  return (
    <section ref={sectionRef} className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="mb-8 max-w-3xl text-left">
          <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
            GCC archetypes
          </h2>
          <p className="text-muted-foreground text-base leading-normal font-normal text-balance md:text-lg">
            The scope of an India GCC depends on your strategy, risk appetite and stage of maturity.
            In practice, most boards converge on a blend of a few clear archetypes, sequenced over
            time as the center matures.
          </p>
        </div>

        <div className="columns-1 gap-2 sm:columns-2 lg:columns-3" aria-label="GCC archetype tiles">
          {useCases.map((useCase, index) => (
            <a
              key={useCase.title}
              href={useCase.url || "#"}
              className="group mb-2 block break-inside-avoid"
              data-card
              data-active={activeIndex === index}
              onClick={(event) => {
                if (isHoverCapable) {
                  return;
                }
                event.preventDefault();
                setActiveIndex((current) => (current === index ? null : index));
              }}
            >
              <div
                className={`relative ${getHeightClass(
                  useCase.height,
                )} border-border/60 bg-background overflow-hidden rounded-lg border`}
              >
                <div className="absolute inset-0">
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0 group-data-[active=true]:opacity-0"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-0 group-data-[active=true]:opacity-0" />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-end p-5 transition-opacity duration-500 group-hover:opacity-0 group-data-[active=true]:opacity-0 md:p-6">
                  <h3 className="text-background text-base font-medium text-balance md:text-lg">
                    {useCase.title}
                  </h3>
                </div>

                <div className="bg-muted/40 absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-data-[active=true]:opacity-100">
                  <div className="flex h-full flex-col justify-between p-5 md:p-6">
                    <div className="space-y-4">
                      <h3 className="text-foreground text-base font-medium text-balance md:text-lg">
                        {useCase.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed font-normal text-balance md:text-base">
                        {useCase.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-muted-foreground text-xs font-normal tracking-[0.16em] uppercase">
                        Explore this archetype
                      </span>
                      <span className="bg-foreground text-background inline-flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-[1.03] group-data-[active=true]:scale-[1.03]">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 z-30">
                  <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-black transition-transform duration-300 group-hover:rotate-45 group-data-[active=true]:rotate-45">
                    <Plus className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            variant="default"
            className="group relative z-10 w-fit rounded-full! px-10 tracking-tight shadow-none!"
          >
            Map your GCC scope
            <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Services15 };
