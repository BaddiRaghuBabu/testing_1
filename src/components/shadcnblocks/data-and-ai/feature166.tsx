import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import Circle from "@/components/shadcnblocks/data-and-ai/circle";
import { Button } from "@/components/ui/button";

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface Feature166Props {
  title?: string;
  description?: string;
  feature1?: Feature;
  feature2?: Feature;
  feature3?: Feature;
  feature4?: Feature;
  className?: string;
}

const Feature166 = ({
  title = "Turnkey AI for real workflows",
  description = "We build production AI grounded in your enterprise data and built to operate within your controls. Every system ships with evaluation, security, monitoring, and cost governance.",
  feature2 = {
    title: "Generative AI",
    description:
      "We design and build copilots and GenAI applications that turn governed enterprise context into clear, policy-aligned outputs-answers, summaries, drafts, and analyses-embedded in the tools teams already use. We harden them with disciplined evaluation and operating controls (safety, monitoring, cost, and change governance) so performance holds in production.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  feature3 = {
    title: "Agentic Process Automation",
    description:
      "We automate multi-step workflows with agents that can plan, call tools, and execute actions-within strict permissions, budgets, and human approval gates for higher-risk steps. We implement durable execution (checkpoints, retries) and end-to-end observability so every action is traceable and improves over time for quality, cost, and compliance.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  feature4 = {
    title: "Advanced Search & Retrieval",
    description:
      "We build the evidence layer behind AI: ingest and index business content, run hybrid keyword + semantic retrieval, and apply reranking so the right sources surface first. Results are permission-aware and source-linked, with document-level access control (security trimming) so users and systems only retrieve what they're authorized to see.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  className,
}: Feature166Props) => {
  const leftSections = [
    { eyebrow: "synthesis layer", feature: feature2 },
    { eyebrow: "execution layer", feature: feature3 },
    { eyebrow: "evidence layer", feature: feature4 },
  ];

  return (
    <section className={cn("pt-20 pb-0 md:pt-24 lg:pt-28", className)}>
      <div className="container">
        <div className="max-w-3xl text-left">
          <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="text-muted-foreground mb-8 text-base leading-normal font-normal text-balance md:text-lg">
            {description}
          </p>

          <div className="mb-8">
            <Button
              variant="default"
              className="group relative z-10 w-fit rounded-full! px-10 tracking-tight shadow-none!"
              asChild
            >
              <a
                href="https://outlook.office365.com/book/Valuenode@valuenode.com/s/WVupA6gsR0KVVu36Q0-McA2?ismsaljsauthenabled=true"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discover more!
                <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
              </a>
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="border-border/60 bg-background relative grid w-full overflow-hidden border lg:grid-cols-[minmax(0,1fr)_740px]">
            <div className="border-border/60 flex flex-col lg:border-r">
              {leftSections.map((section, index) => (
                <div
                  key={section.eyebrow}
                  className={cn(
                    "flex flex-col gap-3 p-6 md:p-8",
                    index < leftSections.length - 1 ? "border-border/60 border-b" : "",
                  )}
                >
                  <p className="text-muted-foreground text-xs font-normal tracking-[0.16em] uppercase">
                    {section.eyebrow}
                  </p>
                  <h2 className="text-muted-foreground text-lg font-medium text-balance md:text-xl">
                    {section.feature.title}
                  </h2>
                  <p className="text-muted-foreground text-xs leading-normal md:text-sm">
                    {section.feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-border/60 flex items-center justify-center border-t p-3 lg:border-t-0">
              <div className="mx-auto w-full overflow-hidden">
                <Circle
                  embedded={true}
                  containerClassName="w-full overflow-hidden bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature166 };
