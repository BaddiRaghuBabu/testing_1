"use client";

import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const images = [
  {
    id: 1,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random5.jpeg",
  },
  {
    id: 2,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
  },
  {
    id: 3,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random13.jpeg",
  },
  {
    id: 4,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
  },
  {
    id: 5,
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
  },
];

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

const Gallery23 = () => {
  const [activeImage, setActiveImage] = useState<number | null>(2);

  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="border-border/60 bg-muted/40 flex flex-col gap-6 rounded-lg border pb-0 shadow-none md:flex-row md:items-stretch md:px-6 md:py-6 md:pr-0">
          <div className="flex flex-1 flex-col justify-center p-6 text-left md:flex-[1.1] md:p-0 md:pr-8">
            <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
              Harness the potential of unified data
            </h2>
            <p className="text-muted-foreground mb-8 text-sm leading-normal font-normal text-balance md:text-base">
              We build bespoke financial data architectures that integrate disparate platforms into
              a single, authoritative record, enabling consolidated reporting across the business.
              Through data engineering, advanced modeling, and interactive dashboards, we streamline
              end-to-end finance workflows—from forecasting and budgeting through the financial
              close and reporting.
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
                    <div>Request an integration</div>
                  </div>
                  <ArrowRight />
                </a>
              </Button>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center px-6 pb-6 md:flex-[1.2] md:justify-end md:px-0 md:pr-6 md:pb-0">
            <div className="flex w-full max-w-[20rem] flex-col items-center justify-center gap-1 sm:max-w-[24rem]">
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="group border-border/60 bg-background relative w-full cursor-pointer overflow-hidden rounded-4xl border"
                  initial={{ height: "2.5rem" }}
                  animate={{
                    height: activeImage === index ? "24rem" : "2.5rem",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  onClick={() => setActiveImage(index)}
                  onHoverStart={() => setActiveImage(index)}
                >
                  <AnimatePresence>
                    {activeImage === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                      >
                        <div className="bg-muted/40 absolute inset-0" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.35)_1px,transparent_1px)] bg-size-[10px_10px] opacity-[0.03]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {activeImage === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute flex h-full w-full flex-col items-end justify-end px-4 pb-5"
                      ></motion.div>
                    )}
                  </AnimatePresence>
                  <img src={image.src} className="size-full object-cover" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Gallery23 };
