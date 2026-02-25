"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq1Props {
  heading?: string;
  items?: FaqItem[];
}

const Faq1 = ({
  heading = "FAQ",
  items = [
    {
      id: "faq-1",
      question: "How does Valuenode's end-to-end offshore-staffing model operate?",
      answer:
        "We assume full stewardship of the talent lifecycle, from discovery and role architecture through compliant onboarding, payroll, and exit settlements, via our Indian entity. You direct the work; we shoulder the statutory burden.",
    },
    {
      id: "faq-2",
      question: "Which engagement structures can Valuenode accommodate?",
      answer:
        "Fractional, project-bounded, or dedicated teams. Each mandate is contract-crafted to reflect your cadence, governance thresholds, and commercial objectives.",
    },
    {
      id: "faq-3",
      question: "How quickly can Valuenode place talent on assignment?",
      answer:
        "In most cases, a fully vetted specialist can be at your disposal within 14 days; multi-seat squads typically mobilise inside four weeks.",
    },
    {
      id: "faq-4",
      question: "Is there a minimum or maximum headcount Valuenode will support?",
      answer:
        "No. We serve single-seat needs and enterprise-scale roll-outs with equal rigour, expanding or contracting as your roadmap dictates.",
    },
    {
      id: "faq-5",
      question: "May we interview and confirm every candidate before engagement?",
      answer:
        "Absolutely. We present a curated slate; you exercise final selection authority. No resource is deployed without your explicit consent.",
    },
    {
      id: "faq-6",
      question: "How does Valuenode source and curate specialised talent?",
      answer:
        "We draw from a proprietary talent graph-augmented by referral guilds, discreet partnerships, and calibrated market sweeps. Each prospect advances through multi-layer skills and culture screens before reaching your desk.",
    },
    {
      id: "faq-7",
      question: "How are working hours and time-zone overlap handled with India-based teams?",
      answer:
        "Shift architecture is client-led: we can mirror your local day, operate on IST, or adopt a hybrid schedule that guarantees live collaboration windows and continuous delivery coverage.",
    },
  ],
}: Faq1Props) => {
  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="mb-8 max-w-3xl text-left">
          <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="text-muted-foreground text-base leading-normal font-normal text-balance md:text-lg">
            The questions below reflect the themes clients most often raise about our Offshore
            Staffing work, its scope, operating model, and governance. For a mandate-specific view,
            we typically work through your context in a structured discovery session.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {items.map((item, index) => (
            <AccordionItem key={item.id} value={item.id} className="group border-none">
              <div className="border-border/60 bg-background group-hover:bg-muted/40 group-data-[state=open]:bg-muted/40 rounded-lg border transition-colors">
                <AccordionTrigger className="flex w-full items-center justify-between px-4 py-4 text-left hover:bg-transparent hover:no-underline">
                  <div className="flex flex-1 items-baseline gap-2">
                    <span className="text-muted-foreground text-xs font-normal tracking-[0.16em] uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted-foreground text-sm font-medium text-balance md:text-base">
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 pt-0 pb-4">
                  <div className="border-border/60 text-muted-foreground mt-2 border-l pr-2 pl-4 text-xs leading-relaxed font-normal text-balance md:pr-3 md:pl-6 md:text-sm">
                    {item.answer}
                  </div>
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export { Faq1 };
