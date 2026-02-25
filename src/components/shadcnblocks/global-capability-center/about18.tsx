"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type About18Card = {
  image: string;
  imageAlt: string;
};

type About18Props = {
  cards?: About18Card[];
};

const DEFAULT_CARDS: About18Card[] = [
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img2.png",
    imageAlt: "GCC blueprint workspace",
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img1.png",
    imageAlt: "GCC governance view",
  },
];

const About18 = ({ cards }: About18Props) => {
  const cardData = cards && cards.length > 0 ? cards : DEFAULT_CARDS;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (cardData.length <= 1) return;

    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % cardData.length),
      3000,
    );

    return () => clearInterval(interval);
  }, [cardData.length]);

  const activeCard = cardData[currentIndex];

  const CardInner = ({ card }: { card: About18Card }) => (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
      <img
        src={card.image}
        alt={card.imageAlt}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </div>
  );

  return (
    <section className="pt-20 pb-0" aria-labelledby="gcc-hero-heading">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            id="gcc-hero-heading"
            className="text-foreground mb-8 text-4xl font-normal tracking-tight text-balance md:text-5xl lg:text-6xl"
          >
            Your end-to-end GCC build partner in India
          </h1>

          <p className="text-muted-foreground mx-auto mb-8 text-base leading-normal font-normal text-balance md:text-lg">
            From business case, entity design and office build-out to hiring and governance, we help
            de-risk each step so your India Global Capability Center (GCC) can go live quickly,
            remain compliant, and deliver durable value over time.
          </p>

          <Button
            variant="default"
            className="group relative z-10 w-fit rounded-full! px-10 tracking-tight shadow-none!"
          >
            Schedule a discovery call
            <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
          </Button>
        </div>

        <div className="mt-16 lg:hidden" aria-label="GCC visual">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeCard.image}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group border-border/60 bg-background hover:bg-muted/40 relative overflow-hidden rounded-lg border"
              >
                <CardInner card={activeCard} />
              </motion.article>
            </AnimatePresence>
          </div>

          {cardData.length > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {cardData.map((_, index) => {
                const isCurrent = currentIndex === index;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "border-border/70 h-2.5 w-2.5 rounded-full border transition",
                      "hover:bg-foreground/70 focus-visible:ring-primary/60 focus-visible:ring-2 focus-visible:outline-none",
                      isCurrent ? "bg-foreground" : "bg-muted",
                    )}
                    aria-label={`Show visual ${index + 1}`}
                    aria-pressed={isCurrent}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-16 hidden lg:grid lg:grid-cols-2 lg:gap-2" aria-label="GCC visual strip">
          {cardData.map((card) => (
            <article
              key={card.image}
              className="group border-border/60 bg-background hover:bg-muted/40 relative overflow-hidden rounded-lg border transition-transform duration-200 hover:-translate-y-0.5"
            >
              <CardInner card={card} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export { About18 };
