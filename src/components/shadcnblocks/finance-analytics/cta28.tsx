"use client";

import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

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

const Cta28 = () => {
  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="border-border/60 bg-muted/40 text-foreground relative grid gap-12 overflow-hidden rounded-lg border px-6 py-8 md:grid-cols-2 md:px-8 md:py-16">
          <div className="flex max-w-xl flex-col justify-center gap-8">
            <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
              Governed AI automation for finance workflows
            </h2>

            <p className="text-muted-foreground text-sm leading-normal font-normal text-balance md:text-base">
              We build bespoke AI agents for autonomous finance teams. These agents operate inside
              your existing systems and control framework: they can interpret invoices, emails, and
              contracts; query databases and APIs; initiate approvals and postings; and return edge
              cases to human reviewers with full context. Applied across P2P, O2C, R2R, and FP&A,
              they convert long chains of manual handoffs into governed, observable automations-so
              the finance function sets direction and exercises oversight, rather than pushing every
              transaction forward by hand.
            </p>

            <div className="mt-0">
              <Button
                asChild
                className="bg-muted text-foreground hover:bg-muted/80 h-fit w-full justify-between gap-4 rounded-full p-2.5 pr-5 transition-colors sm:w-fit sm:gap-28"
                variant="secondary"
              >
                <a href="#contact">
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
                              role="presentation"
                              loading="lazy"
                              className="m-auto block size-8 object-contain object-center"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                    <div>Dicuss your finance workflows</div>
                  </div>
                  <ArrowRight />
                </a>
              </Button>
            </div>
          </div>

          <div className="md:max-w-md md:justify-self-end xl:hidden">
            <div className="grid gap-3 sm:gap-4">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/fabian-centeno-njeVb6E3XB8-unsplash.jpg"
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="aspect-4/3 overflow-hidden rounded-lg">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jason-goodman-ZJlfUi5rTDU-unsplash.jpg"
                    alt=""
                    className="size-full object-cover object-center"
                  />
                </div>
                <div className="aspect-4/3 overflow-hidden rounded-lg">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/redd-f-5U_28ojjgms-unsplash.jpg"
                    alt=""
                    className="size-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden xl:block">
            <div className="absolute top-0 right-0 h-163.75 w-147.5">
              <div className="absolute top-0 right-0 aspect-[1.15] w-57.5 overflow-hidden opacity-75">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/fabian-centeno-njeVb6E3XB8-unsplash.jpg"
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>

              <div className="absolute top-50 right-0 z-10 aspect-[0.709248555] w-70 overflow-hidden opacity-100">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jason-goodman-ZJlfUi5rTDU-unsplash.jpg"
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>

              <div className="absolute top-60 right-0 aspect-[1.353211009] w-147.5 overflow-hidden opacity-50">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/redd-f-5U_28ojjgms-unsplash.jpg"
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta28 };
