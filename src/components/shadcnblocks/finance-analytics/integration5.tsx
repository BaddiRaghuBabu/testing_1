const images = [
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-1.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-2.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-3.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-4.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-5.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-6.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-7.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-8.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-9.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-10.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-11.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-12.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-13.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-14.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-15.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-16.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-17.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/integration/integration-18.svg",
];

const Integration5 = () => {
  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-14 md:flex-row lg:gap-20">
          <div className="basis-1/2">
            <h2 className="text-foreground mb-8 max-w-3xl text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
              Platforms and tools in our stack
            </h2>
            <p className="text-muted-foreground max-w-3xl text-base leading-normal font-normal text-balance md:text-lg">
              We architect solutions on a modern mix of analytics and automation platforms, selected
              for their proven reliability, interoperability, and governance characteristics. For
              each client, we assemble a tailored stack-spanning warehouses, ELT pipelines, BI,
              workflow engines, and low-code frameworks-that integrates cleanly with existing
              systems, preserves clear ownership of data and controls, and can be sustained at scale
              over time.
            </p>
          </div>
          <div className="flex basis-1/2 flex-wrap justify-center gap-2 md:max-w-xl md:justify-end">
            {images.map((image, index) => (
              <div key={index} className="relative size-20">
                <div className="bg-muted/40 grid aspect-square size-16 place-items-center rounded-xl p-2 lg:size-20"></div>
                <svg viewBox="0 0 80 80" className="text-muted-foreground/40">
                  <path fill="currentColor" />
                </svg>
                <img
                  src={image}
                  alt="placeholder"
                  className="absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Integration5 };
