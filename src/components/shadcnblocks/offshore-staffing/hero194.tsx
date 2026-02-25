"use client";
import AutoScroll from "embla-carousel-auto-scroll";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const teamImages = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jeremy-bishop-iEjCQtcsVPY-unsplash.jpg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/carles-rabada-f7UprkNqi08-unsplash.jpg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-hqnUYXsN5oY-unsplash.jpg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/kevin-charit-1fL2Q1JcbNc-unsplash.jpg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/sam-wermut-FiUuNWxnb3k-unsplash.jpg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ines-alvarez-fdez-VjRc6HDXJ5s-unsplash.jpg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-Kj2tYAl4HZg-unsplash.jpg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/vasilis-karkalas-qOaeVSKyhhE-unsplash.jpg",
    alt: "",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pat-whelen-gWfpmH0H2bM-unsplash.jpg",
    alt: "",
  },
];

const teamColumns = [0, 1, 2].map((columnIndex) => {
  const columnImages = teamImages.filter((_, index) => index % 3 === columnIndex);
  return [...columnImages, ...columnImages];
});

const TeamCarousel = () => {
  return (
    <div className="w-full">
      <div className="relative -top-4 -right-[37%] hidden gap-2 lg:flex">
        {teamColumns.map((columnImages, index) => (
          <Carousel
            opts={{
              loop: true,
              align: "center",
              axis: "y",
            }}
            plugins={[
              AutoScroll({
                speed: 0.5,
                direction: index % 2 ? "backward" : "forward",
              }),
            ]}
            orientation="vertical"
            className="rotate-[8deg]"
            key={`carousel-1-team-${index}`}
          >
            <CarouselContent className="h-full max-h-[25.325rem] w-fit">
              {columnImages.map((t, i) => (
                <CarouselItem key={`team-image-${i}`} className="-mt-2">
                  <div className="h-32 w-32 overflow-hidden rounded-lg">
                    <img
                      src={t.src}
                      alt={t.alt}
                      role="presentation"
                      loading="lazy"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ))}
      </div>

      <div className="flex flex-col gap-4 pb-12 lg:hidden">
        {[...Array(2)].map((_, i) => (
          <Carousel
            opts={{
              loop: true,
              align: "center",
            }}
            plugins={[
              AutoScroll({
                speed: 0.5,
                direction: i % 2 ? "backward" : "forward",
              }),
            ]}
            key={`carousel-2-team-${i}`}
          >
            <CarouselContent>
              {teamImages.map((t, i) => (
                <CarouselItem key={`team-image-${i}`} className="h-36 w-full max-w-32 pl-2">
                  <div className="h-full w-full overflow-hidden rounded-lg">
                    <img
                      src={t.src}
                      alt={t.alt}
                      role="presentation"
                      loading="lazy"
                      className="block h-full w-full object-cover object-center"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ))}
      </div>
    </div>
  );
};

const Hero194 = () => {
  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="border-border/60 bg-muted/40 overflow-hidden rounded-lg border">
          <div className="grid h-full w-full grid-cols-1 lg:max-h-142 lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 text-left md:p-8 lg:max-w-3xl lg:p-8">
              <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
                Build better, ship faster
              </h2>
              <p className="text-muted-foreground mb-8 text-sm leading-relaxed font-normal text-balance md:text-base">
                Deploy seasoned AI engineers, data scientists, and MLOps experts to accelerate model
                development, streamline pipelines, and fortify production systems, turning sprint
                backlogs into release-grade code at startup velocity.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="default"
                  className="group relative z-10 w-fit rounded-full! px-10 tracking-tighter shadow-none!"
                >
                  <span>Book a blueprint session</span>
                  <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
                </Button>
                <p className="text-muted-foreground text-[12px] md:text-xs">
                  30-minute video call | No cost, no obligation.
                </p>
              </div>
            </div>
            <div>
              <TeamCarousel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero194 };
