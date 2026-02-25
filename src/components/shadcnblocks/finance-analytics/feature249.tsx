"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import faHomeImageUrl from "@/assets/finance-analytics/feature249/fa-index-landing.jpeg?url";

const Feature249 = () => {
  return (
    <section className="pt-20 pb-0">
      <div className="container">
        <ContainerScroll
          titleComponent={
            <div className="mx-auto max-w-4xl text-center">
              <h1
                id="fa-hero-heading"
                className="text-foreground mb-8 text-4xl font-normal tracking-tight text-balance md:text-5xl lg:text-6xl"
              >
                Finance analytics and AI workflow automation for CFO teams
              </h1>

              <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-base lg:text-lg">
                We unify data from your ERP, billing, banking and spreadsheets into a governed
                model, then use AI to automate month-end close, reconciliations and forecasting -
                delivering trusted metrics, audit-proof reporting and board-level insights.
              </p>

              <div className="mb-4">
                <Button
                  asChild
                  variant="default"
                  className="group relative z-10 w-fit rounded-full! px-10 tracking-tight shadow-none!"
                >
                  <a
                    href="https://outlook.office365.com/book/Valuenode@valuenode.com/s/WVupA6gsR0KVVu36Q0-McA2?ismsaljsauthenabled=true"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Schedule a discovery call
                    <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
                  </a>
                </Button>
              </div>
            </div>
          }
        >
          <img
            src={faHomeImageUrl}
            alt="Finance analytics dashboard overview"
            height={720}
            width={1400}
            className="mx-auto h-full w-full rounded-lg object-contain object-center"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </section>
  );
};

export { Feature249 };

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) => {
  const isMobileViewport = () => (typeof window !== "undefined" ? window.innerWidth <= 768 : false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(isMobileViewport);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const onChange = (event?: MediaQueryListEvent) => {
      setIsMobile(event ? event.matches : mediaQuery.matches);
    };
    setIsMobile(mediaQuery.matches);
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onChange);
    } else {
      mediaQuery.addListener(onChange);
    }
    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", onChange);
      } else {
        mediaQuery.removeListener(onChange);
      }
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 1] : [1.05, 1];
  };

  // Smooth progress to avoid stepped wheel-driven updates on desktop.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.5,
  });

  // Compact screens get a slightly longer reveal range to avoid fast completion.
  const revealEnd = isMobile ? 0.8 : 0.65;
  const rotate = useTransform(
    smoothProgress,
    [0, revealEnd],
    shouldReduceMotion ? [0, 0] : [36, 0],
  );
  const scale = useTransform(
    smoothProgress,
    [0, revealEnd],
    shouldReduceMotion ? [1, 1] : scaleDimensions(),
  );
  const translate = useTransform(
    smoothProgress,
    [0, revealEnd],
    shouldReduceMotion ? [0, 0] : [0, -100],
  );

  return (
    <div
      className="relative flex h-auto min-h-136 items-start justify-center md:min-h-176 lg:h-240 lg:min-h-0"
      ref={containerRef}
    >
      <div
        className="relative w-full"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="mx-auto max-w-5xl transform-gpu text-center will-change-transform"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
      }}
      className="mx-auto -mt-12 aspect-4665/3215 w-full max-w-5xl transform-gpu rounded-lg will-change-transform"
    >
      <div className="h-full w-full overflow-hidden rounded-lg">{children}</div>
    </motion.div>
  );
};
