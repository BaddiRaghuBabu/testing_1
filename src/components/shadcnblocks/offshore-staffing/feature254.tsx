"use client";

import { ArrowRight } from "lucide-react";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ORBIT_RINGS = [
  {
    radius: 120,
    speed: 0.2,
    reverse: false,
    className: "opacity-[0.6] [animation-delay:-6s] grayscale",
    images: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person4.jpeg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person5.jpeg",
    ],
  },
  {
    radius: 200,
    speed: 0.3,
    reverse: true,
    className: "opacity-[0.6] [animation-delay:-12s] grayscale",
    images: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw1.jpeg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw2.jpeg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw3.jpeg",
    ],
  },
  {
    radius: 280,
    speed: 0.3,
    reverse: false,
    className: "opacity-[0.8] [animation-delay:-18s]",
    images: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person1.jpeg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person2.jpeg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person3.jpeg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person4.jpeg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person5.jpeg",
    ],
  },
] as const;

const Feature254 = () => {
  return (
    <section className="pt-20 pb-0" aria-labelledby="offshore_staffing-hero-heading">
      <div className="container">
        <div className="relative flex w-full items-center justify-center overflow-x-hidden">
          <div
            className="relative flex h-[65vh] min-h-[640px] w-full flex-col items-center justify-center overflow-hidden md:h-[620px] md:min-h-0 md:overflow-hidden"
            aria-hidden="true"
          >
            <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true" />

            {ORBIT_RINGS.map(({ radius, speed, reverse, className, images }) => (
              <OrbitingCircles
                key={radius}
                iconSize={44}
                radius={radius}
                speed={speed}
                reverse={reverse}
                className={cn("pointer-events-none select-none", className)}
              >
                {images.map((src) => (
                  <div
                    key={src}
                    className="border-border/60 pointer-events-none size-11 overflow-hidden rounded-full border select-none"
                  >
                    <img
                      src={src}
                      alt=""
                      role="presentation"
                      width={44}
                      height={44}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="size-full object-cover"
                    />
                  </div>
                ))}
              </OrbitingCircles>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4">
            <div
              className="bg-background pointer-events-none absolute top-1/2 left-1/2 h-1/3 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 blur-2xl"
              aria-hidden="true"
            />
            <div className="pointer-events-auto relative z-20 mx-auto max-w-4xl text-center">
              <h1
                id="offshore_staffing-hero-heading"
                className="text-foreground mx-auto mb-8 max-w-3xl text-center text-4xl font-normal tracking-tight text-balance md:text-5xl lg:text-6xl"
              >
                Hire and manage top-tier
                <br />
                Indian talent
              </h1>

              <p className="text-muted-foreground mb-8 text-base leading-normal font-normal text-balance md:text-lg">
                Build your offshore team in India without the overhead of establishing a local
                entity. Scale from a single analyst to a full-scale division seamlessly.
              </p>

              <Button
                variant="default"
                className="group relative z-10 w-fit rounded-full! px-10 tracking-tight shadow-none!"
              >
                Schedule a discovery call
                <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature254 };
