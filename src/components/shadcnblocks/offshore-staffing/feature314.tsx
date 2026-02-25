"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";

const smallCards = [
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    topNote: "01",
    title: "Cost Efficiency",
    summary:
      "Convert fixed payroll into variable spend-eliminating recruitment, training, infrastructure, administrative, and benefit overhead by design, structurally.",
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    topNote: "02",
    title: "Time Efficiency",
    summary:
      "Delegate routine tasks to offshore specialists so your core team can focus on high-value initiatives that accelerate innovation and growth.",
  },
];

const bigCard = {
  image:
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/artistic-portrait-glitch-yqp6z.png",
  topNote: "03",
  title: "Scalability",
  summary:
    "Ramp capacity up or down within weeks, aligning talent to backlog priorities while preserving expertise, workflow continuity, and budget control.",
};

const Feature314 = () => {
  const [useClick, setUseClick] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => {
      setUseClick(media.matches);
    };

    update();
    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!useClick) {
      setActiveCard(null);
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!cardsRef.current) return;
      if (!cardsRef.current.contains(event.target as Node)) {
        setActiveCard(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [useClick]);

  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="flex flex-col">
          <div className="mb-8 max-w-3xl text-left">
            <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
              Benefits
            </h2>
            <p className="text-muted-foreground text-base leading-normal font-normal text-balance md:text-lg">
              Offshore staffing is most effective when it unlocks structural value, not just cheaper
              headcount. The levers below show how the right India-based team can reduce run-rate
              cost, free leadership time, and give you a scalable bench that grows or contracts with
              demand.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-4" ref={cardsRef}>
            {smallCards.map((card, id) => {
              const cardId = `small-${id}`;
              const isActive = useClick && activeCard === cardId;

              return (
                <Card
                  key={id}
                  data-active={isActive ? "true" : "false"}
                  className="group border-border/60 relative col-span-1 overflow-hidden rounded-lg border p-4 shadow-none"
                  onClick={
                    useClick
                      ? () => {
                          setActiveCard(cardId);
                        }
                      : undefined
                  }
                >
                  <div className="flex h-full w-full flex-col justify-between gap-4 transition-opacity duration-300 ease-in-out group-hover:opacity-0 group-data-[active=true]:opacity-0">
                    <div className="relative w-full">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="size-24 rounded-lg lg:size-32"
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <span className="text-muted-foreground text-xs font-normal tracking-[0.16em] uppercase">
                        {card.topNote}
                      </span>
                      <h3 className="text-muted-foreground text-base font-medium text-balance md:text-lg">
                        {card.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                        {card.summary}
                      </p>
                    </div>
                  </div>
                  <div className="bg-background pointer-events-none absolute inset-0 flex flex-col gap-4 p-4 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-data-[active=true]:opacity-100">
                    <span className="text-muted-foreground text-xs font-normal tracking-[0.16em] uppercase">
                      {card.topNote}
                    </span>
                    <h3 className="text-muted-foreground text-base font-medium text-balance md:text-lg">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{card.summary}</p>
                  </div>
                </Card>
              );
            })}
            <Card
              data-active={useClick && activeCard === "big" ? "true" : "false"}
              className="group relative rounded-lg border-0 bg-white py-0 pt-0 shadow-none lg:col-span-2"
              onClick={
                useClick
                  ? () => {
                      setActiveCard("big");
                    }
                  : undefined
              }
            >
              <div className="relative h-full w-full overflow-hidden rounded-lg">
                <motion.img
                  src={bigCard.image}
                  alt={bigCard.title}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="aspect-4/3 h-full w-full object-cover"
                />
                <div className="absolute top-0 left-0 flex w-full justify-start bg-linear-to-b from-black/60 via-black/20 to-black/0 p-4 text-left">
                  <div className="flex w-full max-w-sm min-w-0 flex-col items-start gap-4">
                    <span className="text-background text-xs font-normal tracking-[0.16em] uppercase">
                      {bigCard.topNote}
                    </span>
                    <h3 className="text-background text-base font-medium text-balance md:text-lg">
                      {bigCard.title}
                    </h3>
                    <div className="relative h-24 overflow-hidden">
                      <p className="text-background line-clamp-2 w-full max-w-[28ch] text-sm leading-relaxed transition-opacity duration-300 ease-in-out group-hover:opacity-0 group-data-[active=true]:opacity-0 sm:max-w-[34ch] md:max-w-[40ch] lg:max-w-[50ch]">
                        {bigCard.summary}
                      </p>
                      <p className="text-background pointer-events-none absolute inset-0 w-full max-w-[28ch] text-sm leading-relaxed opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-data-[active=true]:opacity-100 sm:max-w-[34ch] md:max-w-[40ch] lg:max-w-[50ch]">
                        {bigCard.summary}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature314 };
