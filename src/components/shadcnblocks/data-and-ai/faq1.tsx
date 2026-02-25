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
      question: "What Data & AI services do you offer, in plain terms?",
      answer:
        "We deliver end-to-end Data & AI solutions—from cloud-based ETL and real-time data integration to BI layers, data lakes, and production-ready analytics. On top of that foundation, we implement predictive analytics and machine learning to automate operations and improve decision-making. In short: we help you unify data, trust it, and use it to drive outcomes.",
    },
    {
      id: "faq-2",
      question: "Do you support cloud-based ETL and large-scale data transformation?",
      answer:
        "Yes. We build cloud-based ETL pipelines designed for scalability and flexibility—extracting, transforming, and loading data efficiently while handling large data volumes securely. The focus is on performance, reliability, and maintainability so the platform grows with your business without becoming fragile or overly manual.",
    },
    {
      id: "faq-3",
      question: "Can you enable real-time data processing for faster decisions?",
      answer:
        "Yes. Where the use case requires it, we design real-time integration and processing so data is available as events happen—supporting faster decision-making and more responsive operations. This is especially useful for operational reporting, customer experience triggers, anomaly detection, and time-sensitive workflows.",
    },
    {
      id: "faq-4",
      question: "How do you ensure data quality and compliance?",
      answer:
        "We bake quality and compliance into the data lifecycle—validation checks, standardized definitions, monitoring, and auditability. That means cleaner inputs, consistent business logic, and traceable outputs. We also align access controls and governance to your internal policies so data is managed with high standards and confidence.",
    },
    {
      id: "faq-5",
      question: "Can you integrate both cloud-to-cloud and on-premise data sources?",
      answer:
        "Absolutely. We support real-time data integration across cloud applications and on-premise systems, bringing them together into a unified data view. The goal is to remove silos and create a dependable, organization-wide data landscape that teams can rely on for reporting, analytics, and automation.",
    },
    {
      id: "faq-6",
      question: "What AI capabilities do you implement beyond dashboards and reporting?",
      answer:
        "We implement predictive analytics and machine learning to turn data into intelligent action—such as forecasting, anomaly detection, classification, and recommendation. These models can automate customer experiences and internal operations, helping teams make smarter decisions with less manual effort.",
    },
    {
      id: "faq-7",
      question: "How customizable are your Data & AI solutions for different industries and needs?",
      answer:
        "Highly customizable. We adapt the platform and delivery approach to your specific requirements—industry scenarios, data sources, operating constraints, and desired outcomes. Whether you need a transformation engine, BI and semantic layers, a data lake, or an AI platform for operational efficiency, we tailor the solution to fit rather than forcing a one-size model.",
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
            The questions below reflect the themes clients most often raise about our Data & AI
            work-its scope, operating model and governance. For a mandate-specific view, we
            typically work through your context in a structured discovery session.
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
