"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const IMAGE_URL =
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-uR__S5GX8Io-unsplash.jpg";

export function Feature209() {
  return (
    <section className="pt-20 pb-0">
      <div className="container mx-auto max-w-3xl text-center">
        <h1 className="text-foreground mx-auto mb-8 max-w-3xl text-center text-4xl font-normal tracking-tight text-balance md:text-5xl lg:text-6xl">
          Automate at scale.
          <br />
          Accelerate with AI.
        </h1>

        <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-center text-base leading-normal font-normal text-balance md:text-lg">
          From warehouses and models to copilots and agents, we engineer the backbone that powers
          enterprise decisions and closed-loop automation.
        </p>
        <div className="mb-16">
          <Button
            variant="default"
            className="group relative z-10 w-fit rounded-full! px-10 tracking-tight shadow-none!"
          >
            Schedule a discovery call
            <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
          </Button>
        </div>
      </div>

      <div className="container">
        <div className="border-border/60 relative mx-auto border-[0.5px] p-2 md:p-4">
          <div className="relative h-80 sm:h-[560px]">
            <img src={IMAGE_URL} alt="feature" className="h-full w-full rounded-lg object-cover" />
          </div>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/tiny-checkers.svg')] bg-size-[4px_4px] bg-repeat opacity-10" />
        </div>
      </div>
    </section>
  );
}
