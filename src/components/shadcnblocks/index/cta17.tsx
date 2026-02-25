import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Cta17Props {
  className?: string;
}

const CirclesPattern = () => (
  <svg
    className="absolute inset-0 size-full"
    viewBox="0 0 1984 1984"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <rect
      x="0.5"
      y="0.5"
      width="1983"
      height="1983"
      rx="991.5"
      className="fill-muted/30 stroke-border"
    />
    <rect
      x="100.5"
      y="100.5"
      width="1783"
      height="1783"
      rx="891.5"
      className="fill-muted/30 stroke-border"
    />
    <rect
      x="200.5"
      y="200.5"
      width="1583"
      height="1583"
      rx="791.5"
      className="fill-muted/30 stroke-border"
    />
    <rect
      x="300.5"
      y="300.5"
      width="1383"
      height="1383"
      rx="691.5"
      className="fill-muted/30 stroke-border"
    />
    <rect
      x="400.25"
      y="400.25"
      width="1183.5"
      height="1183.5"
      rx="591.75"
      strokeWidth="0.5"
      className="fill-muted/30 stroke-border"
    />
    <rect
      x="500.25"
      y="500.25"
      width="983.5"
      height="983.5"
      rx="491.75"
      strokeWidth="0.5"
      className="fill-muted/30 stroke-border"
    />
    <rect
      x="600.25"
      y="600.25"
      width="783.5"
      height="783.5"
      rx="391.75"
      strokeWidth="0.5"
      className="fill-muted/50 stroke-border"
    />
    <rect
      x="700.25"
      y="700.25"
      width="583.5"
      height="583.5"
      rx="291.75"
      strokeWidth="0.5"
      className="fill-muted/30 stroke-border"
    />
  </svg>
);

const Cta17 = ({ className }: Cta17Props) => {
  return (
    <section className={cn("pt-20 pb-0 md:pt-24 lg:pt-28", className)}>
      <div className="container">
        <div className="border-border/60 bg-muted/40 relative flex items-center justify-center overflow-hidden border py-20 text-center md:p-20">
          <CirclesPattern />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-foreground mx-auto mb-8 max-w-3xl text-center text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
              Ready to talk? <br /> Get in touch
            </h2>
            <div className="mt-0 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
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
                  Schedule a discovery call
                  <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
                </a>
              </Button>
              <Button variant="link" className="text-muted-foreground text-sm" asChild>
                <a href="/contact" target="_blank" rel="noopener noreferrer">
                  Submit Inquiry
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta17 };
