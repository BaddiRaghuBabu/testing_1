import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DataItem {
  title: string;
  content: string;
}

const DATA: DataItem[] = [
  {
    title: "Diagnostic drill paths",
    content:
      "Drill paths from KPIs into transaction-level detail, so every number is explainable on demand.",
  },
  {
    title: "Semantic metric layer",
    content:
      "A governed metric layer standardises KPI logic across dashboards, tools, and business units.",
  },
  {
    title: "Scenario & forecast views",
    content:
      "Side-by-side views of actuals, plan and what-ifs for scenario testing and forecast alignment.",
  },
  {
    title: "Exception & risk monitors",
    content:
      "Thresholds, alerts and anomaly detection that surface risks and outliers before they hit the P&L.",
  },
];

const Blog22 = () => {
  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="border-border/60 bg-muted/40 relative flex flex-col gap-10 overflow-hidden rounded-lg border px-6 py-6 md:px-10 md:py-10">
          <div className="bg-background pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-lg blur-3xl" />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
                Decision-grade data visualization
              </h2>
              <p className="text-muted-foreground text-sm leading-normal font-normal text-balance md:text-base">
                We design executive and operating dashboards that turn fragmented, multi-source data
                into a single, decision-grade view of the firm. Each canvas is engineered from the
                decision backwards: clarifying the question at stake, foregrounding the few metrics,
                trends and exceptions that matter, and relegating the rest to the background.
              </p>
            </div>

            <div className="mt-2 flex">
              <Button
                variant="default"
                className="group relative z-10 w-fit rounded-full! px-10 tracking-tight shadow-none!"
              >
                Discover more!
                <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
              </Button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12">
            <article className="space-y-6">
              <div className="border-border/60 bg-background relative overflow-hidden rounded-lg border">
                <img
                  className="aspect-video w-full object-cover"
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg"
                  alt="Example analytics dashboard canvas"
                />
                <div className="bg-muted/40 pointer-events-none absolute inset-0" />
              </div>
            </article>

            <aside className="space-y-6 lg:space-y-8">
              {DATA.map((item) => (
                <div
                  key={item.title}
                  className="group border-border/60 flex gap-4 border-b pb-6 last:border-b-0 last:pb-0"
                >
                  <div className="bg-background relative mt-1 h-14 w-14 shrink-0 overflow-hidden rounded-lg lg:h-16 lg:w-16">
                    <img
                      className="h-full w-full object-cover object-center opacity-80 mix-blend-luminosity group-hover:opacity-100"
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-8-wide.svg"
                      alt={item.title}
                    />
                    <div className="bg-muted/40 pointer-events-none absolute inset-0" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-muted-foreground text-sm font-medium text-balance md:text-base">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground space-y-4 text-xs leading-relaxed font-normal text-balance md:text-sm">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Blog22 };
