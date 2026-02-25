"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { ArrowRight, Pause, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SOFT_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const TEXT_ENTER_DURATION_SEC = 0.4;
const IMAGE_ENTER_DURATION_SEC = 0.46;
const SLIDE_SWAP_DURATION_SEC = 0.32;

const AUTOPLAY_INTERVAL_MS = 3200;
const DOT_FILL_DURATION_SEC = AUTOPLAY_INTERVAL_MS / 1000;

interface Visual {
  eyebrow: string;
  heading: string;
  description: string;
  className?: string;
  images?: Partial<Hero39Images>;
}

type Hero39Images = {
  one: string;
  two: string;
  three: string;
  four: string;
};

const HERO39_DEFAULT_IMAGES: Hero39Images = {
  one: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/fabian-centeno-njeVb6E3XB8-unsplash.jpg",
  two: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/redd-f-5U_28ojjgms-unsplash.jpg",
  three:
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/nubelson-fernandes-tAJYoec13xk-unsplash.jpg",
  four: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/israel-andrade-YI_9SivVt_s-unsplash.jpg",
};

const mergeHero39Images = (images?: Partial<Hero39Images>): Hero39Images => ({
  ...HERO39_DEFAULT_IMAGES,
  ...(images ?? {}),
});

function AnimationWrapper({
  children,
  delay = 0,
  className,
  duration = TEXT_ENTER_DURATION_SEC,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -6, opacity: 0 }}
      transition={{
        type: "tween",
        duration,
        delay,
        ease: SOFT_EASE,
      }}
      className={className}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
    >
      {children}
    </motion.div>
  );
}

function ImageWrapper({
  children,
  delay = 0.06,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ y: 12, opacity: 0, scale: 0.995 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -8, opacity: 0, scale: 0.998 }}
      transition={{ type: "tween", duration: IMAGE_ENTER_DURATION_SEC, ease: SOFT_EASE, delay }}
      className={cn("transform-gpu", className)}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
    >
      {children}
    </motion.div>
  );
}

function TileReveal({
  delay,
  className,
  children,
}: {
  delay: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={{ y: 4, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -3, opacity: 0 }}
      transition={{ type: "tween", duration: 0.44, delay, ease: SOFT_EASE }}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
    >
      {children}
    </motion.div>
  );
}

function Hero39Visual({ images }: { images?: Partial<Hero39Images> }) {
  const merged = mergeHero39Images(images);

  const shell = "group relative overflow-hidden rounded-lg bg-background";
  const imgClass = "absolute inset-0 h-full w-full object-cover object-center";

  return (
    <div
      className={cn(
        "relative w-full transform-gpu",
        "max-w-[18rem] sm:max-w-88 md:max-w-md lg:max-w-136 xl:max-w-xl",
      )}
      style={{ transform: "translateZ(0)" }}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <TileReveal delay={0.04} className="w-[72%] self-end">
            <div className={cn("relative aspect-square", shell)}>
              <img
                src={merged.one}
                alt=""
                draggable={false}
                loading="eager"
                decoding="async"
                className={cn(imgClass, "block")}
              />
            </div>
          </TileReveal>

          <TileReveal delay={0.12} className="w-full">
            <div className={cn("relative aspect-5/6", shell)}>
              <img
                src={merged.two}
                alt=""
                draggable={false}
                loading="eager"
                decoding="async"
                className={cn(imgClass, "block")}
              />
            </div>
          </TileReveal>
        </div>

        <div className="flex flex-col gap-4">
          <TileReveal delay={0.08} className="w-full">
            <div className={cn("relative aspect-5/6", shell)}>
              <img
                src={merged.three}
                alt=""
                draggable={false}
                loading="eager"
                decoding="async"
                className={cn(imgClass, "block")}
              />
            </div>
          </TileReveal>

          <TileReveal delay={0.16} className="w-[72%] self-start">
            <div className={cn("relative aspect-square", shell)}>
              <img
                src={merged.four}
                alt=""
                draggable={false}
                loading="eager"
                decoding="async"
                className={cn(imgClass, "block")}
              />
            </div>
          </TileReveal>
        </div>
      </div>
    </div>
  );
}

function StickyControls({
  total,
  activeIndex,
  isPlaying,
  onTogglePlay,
  onRestart,
  onGoTo,
}: {
  total: number;
  activeIndex: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onRestart: () => void;
  onGoTo: (idx: number) => void;
}) {
  const isLast = activeIndex === total - 1;
  const fillControls = useAnimationControls();

  React.useEffect(() => {
    fillControls.stop();
    fillControls.set({ width: "0%" });

    if (!isPlaying) return;

    const id = window.requestAnimationFrame(() => {
      void fillControls.start({
        width: "100%",
        transition: { duration: DOT_FILL_DURATION_SEC, ease: "linear" },
      });
    });

    return () => window.cancelAnimationFrame(id);
  }, [activeIndex, isPlaying, fillControls]);

  return (
    <div
      className={cn(
        "relative z-20 mt-4 mb-4 ml-4 flex items-center gap-3 sm:mt-5 sm:mb-6 sm:ml-6",
        "lg:absolute lg:bottom-6 lg:left-6 lg:mt-0 lg:mb-0 lg:ml-0",
      )}
    >
      <div className="bg-muted/40 flex h-12 items-center gap-2 rounded-full px-4 backdrop-blur-xl sm:h-14 sm:gap-3 sm:px-6">
        {Array.from({ length: total }).map((_, idx) => {
          const isActive = idx === activeIndex;

          return (
            <button
              key={`dot-${idx}`}
              type="button"
              onClick={() => onGoTo(idx)}
              className={cn(
                "relative h-2 rounded-full transition-colors duration-200 outline-none focus-visible:ring-0 focus-visible:outline-none",
                isActive ? "bg-foreground/40" : "bg-foreground/40 hover:bg-foreground/40",
              )}
              style={{ width: isActive ? 42 : 6 }}
              aria-label={`Go to slide ${idx + 1}`}
            >
              {isPlaying && isActive && (
                <motion.span
                  key={`fill-${activeIndex}`}
                  initial={false}
                  animate={fillControls}
                  className="bg-foreground absolute top-0 left-0 h-full rounded-full"
                  style={{ width: "0%" }}
                />
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={isLast && !isPlaying ? onRestart : onTogglePlay}
        className={cn(
          "bg-muted/40 hover:bg-muted/40 flex h-12 items-center justify-center rounded-full px-5",
          "backdrop-blur-xl transition-colors duration-200 sm:h-14 sm:px-6",
          "[&>svg]:fill-foreground/50 [&>svg]:stroke-foreground/10 outline-none focus-visible:ring-0 focus-visible:outline-none",
        )}
        aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
      >
        {isLast && !isPlaying ? (
          <RotateCcw
            strokeWidth={2.2}
            className="stroke-foreground/50! size-5 fill-none! sm:size-6"
          />
        ) : isPlaying ? (
          <Pause className="size-5 sm:size-6" />
        ) : (
          <Play className="size-5 sm:size-6" />
        )}
      </button>
    </div>
  );
}

function StickyVisualCard({ visual, controls }: { visual: Visual; controls: React.ReactNode }) {
  return (
    <div
      className={cn(
        "border-border/60 bg-background relative w-full overflow-hidden rounded-lg border",
        visual.className,
      )}
    >
      <div className="relative z-10 flex h-full items-start">
        <div className="w-full p-4 sm:p-6 lg:p-6">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:items-start">
            <div className="max-w-[62ch]">
              <AnimationWrapper delay={0.0}>
                <p className="text-muted-foreground mb-4 text-xs font-normal tracking-[0.16em] uppercase">
                  {visual.eyebrow}
                </p>
              </AnimationWrapper>

              <AnimationWrapper delay={0.08}>
                <h3 className="text-foreground mx-auto mb-8 text-2xl font-normal tracking-tight text-balance md:text-3xl lg:text-4xl">
                  {visual.heading}
                </h3>
              </AnimationWrapper>

              <AnimationWrapper delay={0.16}>
                <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-sm leading-normal font-normal text-balance md:text-base">
                  {visual.description}
                </p>
              </AnimationWrapper>
            </div>

            <ImageWrapper className="flex justify-center lg:justify-end">
              <Hero39Visual images={visual.images} />
            </ImageWrapper>
          </div>
        </div>
      </div>

      {controls}
    </div>
  );
}

interface Gallery35Props {
  visuals?: Visual[];
  className?: string;
}

const GALLERY35_IMAGE_SETS: Hero39Images[] = [
  {
    one: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/fabian-centeno-njeVb6E3XB8-unsplash.jpg",
    two: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/israel-andrade-YI_9SivVt_s-unsplash.jpg",
    three:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/alvin-engler-bIhpiQA009k-unsplash.jpg",
    four: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/redd-f-5U_28ojjgms-unsplash.jpg",
  },
  {
    one: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/nubelson-fernandes-tAJYoec13xk-unsplash.jpg",
    two: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/artistic-portrait-glitch-yqp6z.png",
    three: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img2.png",
    four: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img11.png",
  },
  {
    one: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img5.jpeg",
    two: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-uR__S5GX8Io-unsplash.jpg",
    three: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw15.jpeg",
    four: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img23.jpeg",
  },
  {
    one: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img4.jpeg",
    two: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/christopher-gower-vjMgqUkS8q8-unsplash.jpg",
    three:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/daniel-leone-g30P1zcOzXo-unsplash.jpg",
    four: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jason-leung-6uoj7DL6BFk-unsplash.jpg",
  },
  {
    one: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-Kj2tYAl4HZg-unsplash.jpg",
    two: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    three: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    four: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    one: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img1.png",
    two: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jason-goodman-ZJlfUi5rTDU-unsplash.jpg",
    three:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jeremy-bishop-iEjCQtcsVPY-unsplash.jpg",
    four: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/carles-rabada-f7UprkNqi08-unsplash.jpg",
  },
];

const DEFAULT_VISUALS: Visual[] = [
  {
    eyebrow: "Data & AI Center",
    heading: "Build your in-house Data & AI hub in India",
    description:
      "We help you define the platform blueprint, data domains, and governance so analytics and AI run as an owned capability. We set metric definitions, data-access controls, and an operating cadence, then support hiring and ramp. Outcome: reusable datasets, accountable ownership, and insight delivery built for scrutiny.",
    images: GALLERY35_IMAGE_SETS[0],
  },
  {
    eyebrow: "Customer Experience & Operations Center",
    heading: "Build customer operations in India - under your brand",
    description:
      "We help you establish a captive CX and operations center - service charters, playbooks, tooling, quality loops, and escalation paths - so performance scales without drifting from your standards. We align KPIs to customer and revenue outcomes, then build the leadership and talent ramp to operate across channels and time zones.",
    images: GALLERY35_IMAGE_SETS[1],
  },
  {
    eyebrow: "Finance & Risk Control Center",
    heading: "Build a finance control hub in India - within your enterprise perimeter",
    description:
      "We help you establish a finance and risk hub with clear RACI, control objectives, and evidence standards. We design close, forecasting, and issue-management routines; set governance forums; and support hiring for controllership, FP&A, and compliance roles - so decisions stay inside your perimeter and reporting remains defensible.",
    images: GALLERY35_IMAGE_SETS[2],
  },
  {
    eyebrow: "Innovation Lab",
    heading: "Build a disciplined innovation lab in India - with clear risk gates",
    description:
      "We help you set up an innovation lab with a defined thesis, portfolio governance, and stage-gates for funding, risk, and security review. We design ways of working for rapid pilots, measurable impact, and clean handoffs to product or operations teams - so experimentation is disciplined and scalable, not ad hoc.",
    images: GALLERY35_IMAGE_SETS[3],
  },
  {
    eyebrow: "Enterprise Shared Services Center",
    heading: "Build a shared-services backbone in India - GBS-ready",
    description:
      "We help you build a shared-services backbone with a service catalogue, SLAs, and end-to-end process ownership - GBS-ready from the start. We standardize workflows, controls, and tooling, define cost-to-serve and performance dashboards, then support hiring and steady-state governance so finance, HR, IT, and procurement run predictably, transparently, and at scale.",
    images: GALLERY35_IMAGE_SETS[4],
  },
  {
    eyebrow: "Product & Engineering Center",
    heading: "Build your product engineering hub in India",
    description:
      "We help you launch a product engineering hub with durable pods, clear ownership, and modern delivery governance. We define the org, roles, architecture guardrails, and DevSecOps standards, then support hiring and ramp - so teams ship continuously while IP, security, and quality remain under your control.",
    images: GALLERY35_IMAGE_SETS[5],
  },
];

export function Gallery35({ className, visuals = DEFAULT_VISUALS }: Gallery35Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);
  const [lockedHeight, setLockedHeight] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const uniqueUrls = Array.from(
      new Set(
        visuals.flatMap((visual) => {
          const merged = mergeHero39Images(visual.images);
          return [merged.one, merged.two, merged.three, merged.four];
        }),
      ),
    );

    uniqueUrls.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      if (typeof img.decode === "function") {
        void img.decode().catch(() => undefined);
      }
    });
  }, [visuals]);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const update = () => {
      const next = Math.ceil(el.getBoundingClientRect().height);
      if (!next) return;
      setLockedHeight((prev) => {
        if (!prev) return next;
        return Math.max(prev, next);
      });
    };

    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    return () => ro.disconnect();
  }, [activeIndex]);

  useEffect(() => {
    if (!isPlaying || visuals.length <= 1) return;

    const id = window.setInterval(() => {
      setActiveIndex((prev) => {
        if (prev >= visuals.length - 1) {
          setIsPlaying(false);
          return prev;
        }

        return prev + 1;
      });
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [isPlaying, activeIndex, visuals.length]);

  const restart = () => {
    setActiveIndex(0);
    setIsPlaying(true);
  };

  const heightStyle = useMemo(() => {
    return lockedHeight ? { minHeight: `${lockedHeight}px` } : undefined;
  }, [lockedHeight]);

  return (
    <section className={cn("bg-background pt-20 pb-0 md:pt-24 lg:pt-28", className)}>
      <div className="container">
        <div className="flex flex-col gap-8 md:gap-10 lg:gap-12">
          <div className="flex flex-col">
            <p className="text-muted-foreground mb-4 text-center text-xs font-normal tracking-[0.16em] uppercase">
              <span className="inline-flex items-center gap-2">
                <span className="bg-border h-px w-8" />
                Global Capability Center
                <span className="bg-border h-px w-8" />
              </span>
            </p>
            <h2 className="text-foreground mx-auto mb-8 max-w-3xl text-center text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
              Launch and scale your India GCC
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-center text-base leading-normal font-normal text-balance md:text-lg">
              We orchestrate the GCC build across workstreams with clear decision rights, aligned
              partners, and fast handoffs. We set governance and operating cadence for controlled
              launch and sustainable scale.
            </p>
            <div className="mt-0 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
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
                  Review GCC build options
                  <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
                </a>
              </Button>
              <Button variant="link" className="text-muted-foreground text-sm" asChild>
                <a href="/global-capability-center" target="_blank" rel="noopener noreferrer">
                  Explore
                </a>
              </Button>
            </div>
          </div>

          <div className="w-full">
            <div className="relative w-full transform-gpu" style={heightStyle}>
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={`sticky-${activeIndex}`}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "tween", duration: SLIDE_SWAP_DURATION_SEC, ease: SOFT_EASE }}
                  style={{ willChange: "opacity" }}
                >
                  <div ref={measureRef}>
                    <StickyVisualCard
                      visual={visuals[activeIndex]}
                      controls={
                        <StickyControls
                          total={visuals.length}
                          activeIndex={activeIndex}
                          isPlaying={isPlaying}
                          onTogglePlay={() => setIsPlaying((v) => !v)}
                          onRestart={restart}
                          onGoTo={(idx) => {
                            setActiveIndex(idx);
                          }}
                        />
                      }
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {!lockedHeight && (
                <div className="pointer-events-none opacity-0">
                  <StickyVisualCard
                    visual={visuals[activeIndex]}
                    controls={
                      <StickyControls
                        total={visuals.length}
                        activeIndex={activeIndex}
                        isPlaying={isPlaying}
                        onTogglePlay={() => setIsPlaying((v) => !v)}
                        onRestart={restart}
                        onGoTo={(idx) => {
                          setActiveIndex(idx);
                        }}
                      />
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
