"use client";

import React from "react";
import {
  ArrowRight,
  ChevronDown,
  Target,
  Layout,
  ChartArea,
  TrendingUp,
  ChartNoAxesCombined,
  Monitor,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type RevealCardItem = {
  id: string;
  icon: LucideIcon;
  revealText: string;
  revealDesc: string;
  hoverGradientClassName: string;
};

const revealCards: RevealCardItem[] = [
  {
    id: "causal-insight",
    icon: Target,
    revealText: "Causal insight",
    revealDesc:
      "Separate cause from correlation to identify the material levers that create value.",
    hoverGradientClassName: "from-emerald-500",
  },
  {
    id: "decision-optimisation",
    icon: TrendingUp,
    revealText: "Decision optimisation",
    revealDesc:
      "Optimise decisions and resource allocation under real-world economic, risk and capacity constraints.",
    hoverGradientClassName: "from-fuchsia-500",
  },
  {
    id: "behavioural-segments",
    icon: Layout,
    revealText: "Behavioural segments",
    revealDesc:
      "Map populations into stable, behaviour-led segments that inform strategy and design.",
    hoverGradientClassName: "from-sky-500",
  },
  {
    id: "incremental-experiments",
    icon: ChartNoAxesCombined,
    revealText: "Incremental experiments",
    revealDesc: "Run controlled experiments and uplift models to estimate true incremental impact.",
    hoverGradientClassName: "from-red-500",
  },
  {
    id: "dynamic-forecasts",
    icon: ChartArea,
    revealText: "Dynamic forecasts",
    revealDesc:
      "Translate observed patterns into calibrated forecasts that guide capacity, risk and planning.",
    hoverGradientClassName: "from-pink-500",
  },
  {
    id: "model-governance",
    icon: Monitor,
    revealText: "Model governance",
    revealDesc:
      "Track drift, bias and stability with governed metrics, documentation, alerts and approvals.",
    hoverGradientClassName: "from-amber-500",
  },
];

const Feature104 = () => {
  const [activeCardId, setActiveCardId] = React.useState<string | null>(null);
  const [canHover, setCanHover] = React.useState(false);

  React.useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateHoverCapability = () => setCanHover(hoverQuery.matches);

    updateHoverCapability();
    hoverQuery.addEventListener("change", updateHoverCapability);

    return () => {
      hoverQuery.removeEventListener("change", updateHoverCapability);
    };
  }, []);

  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="text-left">
          <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
            Advanced data modelling
            <br />
            for inference, forecasting,
            <br />
            and optimisation
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24.5rem] lg:gap-16 xl:grid-cols-[minmax(0,1.1fr)_26rem]">
          <div className="max-w-3xl space-y-6 text-left md:max-w-none lg:max-w-xl">
            <p className="text-muted-foreground text-base leading-normal font-normal text-balance md:text-lg">
              We design advanced statistical, machine-learning, and optimisation models on top of
              your governed data foundation - translating governed data into decision-grade
              forecasts, risk signals, and recommendations. Each model is validated through
              back-testing and disciplined experimentation, then managed across its lifecycle with
              versioning, drift monitoring, and retraining triggers.
            </p>

            <div className="pt-2">
              <Button
                variant="default"
                className="group relative z-10 w-fit rounded-full! px-10 tracking-tight shadow-none!"
                asChild
              >
                <a
                  href="https://outlook.office365.com/book/Valuenode@valuenode.com/s/WVupA6gsR0KVVu36Q0-McA2?ismsaljsauthenabled=true"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discover more!
                  <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-2 text-left lg:w-98 xl:w-104">
            {revealCards.map((card) => (
              <RevealCard
                key={card.id}
                icon={card.icon}
                revealText={card.revealText}
                revealDesc={card.revealDesc}
                hoverGradientClassName={card.hoverGradientClassName}
                isActive={activeCardId === card.id}
                onActivate={() => setActiveCardId(card.id)}
                onDeactivate={() =>
                  setActiveCardId((current) => (current === card.id ? null : current))
                }
                onToggle={() =>
                  setActiveCardId((current) => (current === card.id ? null : card.id))
                }
                canHover={canHover}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature104 };

const RevealCard = ({
  icon: Icon,
  revealText,
  revealDesc,
  hoverGradientClassName = "from-emerald-500",
  isActive,
  onActivate,
  onDeactivate,
  onToggle,
  canHover,
}: {
  icon: LucideIcon;
  revealText: string;
  revealDesc: string;
  hoverGradientClassName?: string;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  onToggle: () => void;
  canHover: boolean;
}) => {
  return (
    <button
      type="button"
      onMouseEnter={() => {
        if (canHover) onActivate();
      }}
      onMouseLeave={() => {
        if (canHover) onDeactivate();
      }}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          onDeactivate();
        }
      }}
      aria-expanded={isActive}
      className={`group/canvas-card relative isolate mx-auto w-full overflow-hidden rounded-lg text-left transition-[height,background-color] duration-300 ease-out ${
        isActive ? "bg-muted h-66" : "bg-muted/70 h-11"
      }`}
    >
      <ChevronDown
        className={`pointer-events-none absolute right-4 z-30 h-4 w-4 transition-all duration-300 ease-out ${
          isActive
            ? "top-4 translate-y-0 rotate-180 text-white"
            : "text-muted-foreground top-1/2 -translate-y-1/2 rotate-0"
        }`}
      />

      <div
        className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-200 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        {isActive && (
          <>
            <div
              className={`pointer-events-none absolute inset-0 bg-radial-[at_80%_14%] ${hoverGradientClassName} from-[-50%] via-zinc-950 via-75% to-zinc-950`}
            />
            <div className="pointer-events-none absolute inset-0 h-full w-full bg-[radial-gradient(white_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_80%_14%,#000,transparent_40%)] bg-size-[3px_3px] opacity-35" />
          </>
        )}
      </div>

      <div className="relative z-20 h-full w-full">
        <div
          className={`absolute inset-0 flex items-center gap-8 px-4 transition duration-200 ${
            isActive ? "opacity-0" : "opacity-100"
          }`}
        >
          <Icon className="text-muted-foreground h-5 w-5 shrink-0" />
          <p className="text-muted-foreground text-sm font-medium text-balance md:text-base">
            {revealText}
          </p>
        </div>

        <div
          className={`pointer-events-none absolute inset-0 z-10 flex flex-col p-7 tracking-tight transition duration-200 dark:text-white ${
            isActive
              ? "-translate-y-2 text-white opacity-100"
              : "translate-y-0 text-black opacity-0"
          }`}
        >
          <Icon className="h-5 w-5 shrink-0" />
          <div className="mt-auto flex max-w-[75%] flex-col items-start gap-2 text-left">
            <p className="text-left text-base font-medium">{revealText}</p>
            <p className="text-left text-sm leading-relaxed opacity-90">{revealDesc}</p>
          </div>
        </div>
      </div>
    </button>
  );
};
