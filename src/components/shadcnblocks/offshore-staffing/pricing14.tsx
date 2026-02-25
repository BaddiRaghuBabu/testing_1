import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

const Pricing14 = () => {
  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="flex flex-col justify-between gap-0 md:flex-row md:gap-8">
          <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
            Scale capacity
            <br />
            Slash overhead
          </h2>
          <div className="md:text-right">
            <span className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
              Flat fee
            </span>
            <p className="text-muted-foreground mt-2 mb-8 text-xs font-normal tracking-[0.16em] uppercase">
              per resource per month
            </p>
          </div>
        </div>
        <Separator className="mb-8" />
        <div>
          <p className="text-muted-foreground mb-8 max-w-3xl text-base leading-normal font-normal text-balance md:text-lg">
            Transfer end-to-end offshore staffing to Valuenode and shed recruitment fees, training
            expense, infrastructure capital, HR administration, and statutory benefit overhead while
            retaining the agility to scale project teams up or down within weeks.
          </p>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:gap-16">
            <ul className="grid gap-x-16 gap-y-3 md:grid-cols-2">
              <li className="flex items-center gap-2">
                <div className="bg-muted-foreground/15 mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full">
                  <Check className="text-muted-foreground h-3 w-3 flex-none" />
                </div>
                <span className="text-muted-foreground text-sm leading-relaxed font-normal text-balance md:text-base">
                  Curated, top-tier talent
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-muted-foreground/15 mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full">
                  <Check className="text-muted-foreground h-3 w-3 flex-none" />
                </div>
                <span className="text-muted-foreground text-sm leading-relaxed font-normal text-balance md:text-base">
                  Verified, paperless onboarding
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-muted-foreground/15 mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full">
                  <Check className="text-muted-foreground h-3 w-3 flex-none" />
                </div>
                <span className="text-muted-foreground text-sm leading-relaxed font-normal text-balance md:text-base">
                  Placement in days, not months
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-muted-foreground/15 mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full">
                  <Check className="text-muted-foreground h-3 w-3 flex-none" />
                </div>
                <span className="text-muted-foreground text-sm leading-relaxed font-normal text-balance md:text-base">
                  IT equipment provisioning
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-muted-foreground/15 mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full">
                  <Check className="text-muted-foreground h-3 w-3 flex-none" />
                </div>
                <span className="text-muted-foreground text-sm leading-relaxed font-normal text-balance md:text-base">
                  Client-directed selection
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-muted-foreground/15 mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full">
                  <Check className="text-muted-foreground h-3 w-3 flex-none" />
                </div>
                <span className="text-muted-foreground text-sm leading-relaxed font-normal text-balance md:text-base">
                  Payroll, tax & benefits administration
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-muted-foreground/15 mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full">
                  <Check className="text-muted-foreground h-3 w-3 flex-none" />
                </div>
                <span className="text-muted-foreground text-sm leading-relaxed font-normal text-balance md:text-base">
                  Single, transparent fee
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-muted-foreground/15 mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full">
                  <Check className="text-muted-foreground h-3 w-3 flex-none" />
                </div>
                <span className="text-muted-foreground text-sm leading-relaxed font-normal text-balance md:text-base">
                  Statutory compliance
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-muted-foreground/15 mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full">
                  <Check className="text-muted-foreground h-3 w-3 flex-none" />
                </div>
                <span className="text-muted-foreground text-sm leading-relaxed font-normal text-balance md:text-base">
                  Scale teams up or down on demand
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-muted-foreground/15 mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full">
                  <Check className="text-muted-foreground h-3 w-3 flex-none" />
                </div>
                <span className="text-muted-foreground text-sm leading-relaxed font-normal text-balance md:text-base">
                  Orderly exit settlements
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              variant="default"
              className="group relative z-10 w-fit rounded-full! px-10 tracking-tight shadow-none!"
            >
              Get in touch
              <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
            </Button>
            <p className="text-muted-foreground text-[12px] md:text-xs">
              Up to 70% cost efficiency
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing14 };
