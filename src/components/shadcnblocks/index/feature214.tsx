"use client";

import type { LucideIcon } from "lucide-react";
import { Activity, Brain, GitBranch, Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface card {
  image: string;
  Icon: LucideIcon;
  title: string;
  link: string;
  summary: string;
}

const List: Array<card> = [
  {
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/artistic-portrait-glitch-yqp6z.png",
    Icon: Activity,
    title: "KPI Tracking",
    link: "#",
    summary: "Decision-grade dashboards surface trends, drivers, and exceptions.",
  },
  {
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/artistic-portrait-glitch-yqp6z.png",
    Icon: Zap,
    title: "Real-Time Sync",
    link: "#",
    summary: "Auto-sync source systems so metrics stay consistent real time.",
  },
  {
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/artistic-portrait-glitch-yqp6z.png",
    Icon: GitBranch,
    title: "Process Design",
    link: "#",
    summary: "Standardise workflows with approvals, controls, and audit trails.",
  },
  {
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/artistic-portrait-glitch-yqp6z.png",
    Icon: Brain,
    title: "AI Execution",
    link: "#",
    summary: "Permissioned agents automate tasks and escalate exceptions for review.",
  },
];

const CarouselCard = ({ image, Icon, title, link, summary }: card) => {
  return (
    <a
      href={link}
      aria-label={title}
      className="group focus-visible:ring-ring focus-visible:ring-offset-background block h-full rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <Card className="border-border/60 group-hover:bg-muted/40 rounded-lg border p-6 shadow-none transition-colors">
        <CardContent className="p-0">
          <div className="relative">
            <div className="aspect-4/3 w-full overflow-hidden rounded-lg">
              <img
                src={image}
                alt={`${title} illustration`}
                className="block size-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="ring-border/40 flex size-12 items-center justify-center rounded-lg bg-white">
                <Icon className="size-6 text-black" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <CardTitle className="text-muted-foreground text-sm font-medium text-balance md:text-base">
              {title}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm font-normal text-balance">
              {summary}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

interface Feature214Props {
  className?: string;
}

const Feature214 = ({ className }: Feature214Props) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setShowControls(api.canScrollPrev() || api.canScrollNext());
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <section className={cn("py-0", className)}>
      <div className="container">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 py-0">
            {List.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <CarouselCard {...item} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {showControls && (
            <div className="mt-4 flex w-full items-center justify-end gap-3 xl:hidden">
              <CarouselPrevious className="static! top-auto! right-auto! bottom-auto! left-auto! size-11 translate-x-0! translate-y-0! rounded-full" />
              <CarouselNext className="static! top-auto! right-auto! bottom-auto! left-auto! size-11 translate-x-0! translate-y-0! rounded-full" />
            </div>
          )}
        </Carousel>
      </div>
    </section>
  );
};

export { Feature214 };
