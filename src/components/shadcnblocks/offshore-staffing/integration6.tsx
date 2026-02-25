"use client";
import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

const BUTTON_LOGOS = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-1.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-3.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-4.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-5.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-6.svg",
    alt: "",
  },
];

const LOGOS = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-1.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-2.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-3.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-4.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-5.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-6.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-7.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-8.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-9.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-10.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-11.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-13.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-14.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-15.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-16.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-17.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-18.svg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-8.svg",
    alt: "",
  },
];

const Integration6 = () => {
  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="border-border/60 bg-muted/40 flex flex-col gap-8 overflow-hidden rounded-lg border px-8 py-8 md:px-8 md:py-8">
          <div className="flex w-full flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="flex-1">
              <div className="w-full max-w-3xl space-y-4 text-left">
                <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
                  Engineers for every
                  <br />
                  modern tech stack
                </h2>
                <p className="text-muted-foreground text-sm leading-normal font-normal text-balance md:text-base">
                  We map your tech stack, pair you with elite engineers, and serve as your
                  Employer-of-Record (EOR), so code ships faster, cleaner, and audit-ready.
                </p>
              </div>
            </div>
            <div className="lg:self-end">
              <Button
                asChild
                className="bg-muted text-foreground hover:bg-muted/80 h-fit w-full justify-between gap-4 rounded-full p-2.5 pr-5 transition-colors sm:w-fit sm:gap-28"
                variant="secondary"
              >
                <a href="#">
                  <div className="flex items-center gap-2.5">
                    <Carousel
                      plugins={[
                        Autoplay({
                          delay: 2000,
                        }),
                      ]}
                      className="size-8 shrink-0 overflow-hidden rounded-full border border-white/20"
                    >
                      <CarouselContent className="ml-0 size-8">
                        {BUTTON_LOGOS.map((logo, index) => (
                          <CarouselItem
                            key={index}
                            className="flex size-8 overflow-hidden rounded-full p-0"
                          >
                            <img
                              src={logo.src}
                              alt={logo.alt}
                              className="m-auto block size-8 object-contain object-center"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                    <div>Request a vetted talent slate</div>
                  </div>
                  <ArrowRight />
                </a>
              </Button>
            </div>
          </div>

          <Separator />

          <Carousel
            opts={{
              loop: true,
              watchDrag: false,
              container: "nav",
            }}
            plugins={[
              AutoScroll({
                speed: 0.35,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {LOGOS.map((logo, index) => (
                <CarouselItem key={index} className="h-8 basis-20 pl-8">
                  <img
                    src={logo.src}
                    alt=""
                    role="presentation"
                    loading="lazy"
                    className="block h-full w-full object-contain object-center"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <Separator />
        </div>
      </div>
    </section>
  );
};

export { Integration6 };
