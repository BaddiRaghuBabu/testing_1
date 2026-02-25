"use client";

import { motion } from "framer-motion";
import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

const MARQUEE_CONFIGS: {
  showCard: number;
  reverse?: boolean;
  src: string[];
}[] = [
  {
    showCard: 1,
    reverse: true,
    src: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nextjs-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vue-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/typescript-icon.svg",
    ],
  },
  {
    showCard: 2,
    src: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/remix-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vite-icon.svg",
    ],
  },
  {
    showCard: 3,
    reverse: true,
    src: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/github-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/laravel-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/gatsby-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vscode-icon.svg",
    ],
  },
  {
    showCard: 2,
    src: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vite-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/sketch-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/brave-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/dropbox-icon.svg",
    ],
  },
  {
    showCard: 3,
    reverse: true,
    src: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nike-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/spotify-icon.svg",
    ],
  },
  {
    showCard: 2,
    src: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/slack-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/linkedin-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/instagram-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/facebook-icon.svg",
    ],
  },
  {
    showCard: 1,
    reverse: true,
    src: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/notion-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/twitter-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/google-icon.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/google-play-icon.svg",
    ],
  },
];

const Hero219 = () => {
  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="max-w-3xl min-w-0 text-left">
            <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
              Platforms and tools we deliver on
            </h2>
            <p className="text-muted-foreground text-base leading-normal font-normal text-balance md:text-lg">
              We build on production-grade platforms across cloud, data engineering, governance,
              analytics, and AI. Technology-agnostic by design, we align to your security,
              compliance, and operating standards—integrating with your existing estate where
              possible, and implementing the best-fit stack where modernization is required.
            </p>
          </div>

          <div className="max-w-xl min-w-0 space-y-5 text-left lg:max-w-none">
            <div className="relative flex flex-col items-center justify-start gap-4 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1 }}
                className="relative z-20 mt-0 flex items-center justify-center gap-4"
              >
                {MARQUEE_CONFIGS.map((config, index) => (
                  <SkiperUiMarquee key={index} {...config} />
                ))}
              </motion.div>

              <div
                className="bg-background absolute right-0 bottom-20 left-0 h-92 w-full blur-xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero219 };

interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
  vertical?: boolean;
  repeat?: number;
  children: ReactNode;
}

function Marquee({
  className,
  reverse,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex gap-(--gap) overflow-hidden p-2 [--gap:1rem]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "animation-duration-[12s]! play-state-[running] group-hover:play-state-[paused] flex shrink-0 justify-around gap-(--gap)",
            vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
            reverse && "[animation-direction:reverse]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

interface SkiperUiMarqueeProps {
  showCard: number;
  reverse?: boolean;
  className?: string;
  src: string[];
}

function SkiperUiMarquee({ showCard, reverse = false, className, src }: SkiperUiMarqueeProps) {
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ height: showCard * 113 }}>
      <Marquee reverse={reverse} vertical>
        {src.map((item) => (
          <Card key={item} src={item} />
        ))}
      </Marquee>

      <div
        className="from-background pointer-events-none absolute top-0 z-10 h-8 w-full bg-linear-to-b to-transparent"
        aria-hidden="true"
      />
      <div
        className="from-background pointer-events-none absolute bottom-0 z-10 h-8 w-full bg-linear-to-t to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

interface CardProps {
  src?: string;
}

function Card({ src }: CardProps) {
  return (
    <div
      className={cn(
        "border-muted/40 relative flex size-24 items-center justify-center overflow-hidden rounded-3xl border p-4",
        "from-muted/50 to-background bg-linear-to-b",
        "dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <img
        src={src ?? "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/notion-icon.svg"}
        alt="Logo"
        className="size-8 object-cover"
        loading="lazy"
      />
    </div>
  );
}
