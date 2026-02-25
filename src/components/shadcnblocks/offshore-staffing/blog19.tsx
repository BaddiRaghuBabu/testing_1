import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const data = [
  {
    id: 1,
    title: "Discovery",
    description: "Define headcount goals, capability needs, and delivery timelines.",
    category: "01",
  },
  {
    id: 2,
    title: "Role Profiling",
    description:
      "Translate objectives into precise job descriptions, competency maps, and resourcing forecasts.",
    category: "02",
  },
  {
    id: 3,
    title: "Candidate Sourcing",
    description:
      "Mine India's talent market, perform preliminary vetting, and furnish an annotated shortlist.",
    category: "03",
  },
  {
    id: 4,
    title: "Skills Vetting",
    description:
      "Conduct proprietary skill appraisals, ethos-fit interviews, and credential verifications.",
    category: "04",
  },
  {
    id: 5,
    title: "Interview Facilitation",
    description:
      "Orchestrate client interviews, compile feedback, and memorialize hiring determinations.",
    category: "05",
  },
  {
    id: 6,
    title: "Offer Drafting",
    description: "Negotiate terms and draft compliant Indian employment instruments for execution.",
    category: "06",
  },
  {
    id: 7,
    title: "EOR Set-Up",
    description:
      "Engage personnel through our Indian entity and secure all requisite statutory registrations.",
    category: "07",
  },
  {
    id: 8,
    title: "Employee Onboarding",
    description: "Complete KYC formalities, execute agreements, and deliver structured induction.",
    category: "08",
  },
  {
    id: 9,
    title: "IT Hardware Provisioning",
    description: "Procure, deploy, and steward IT hardware across its lifecycle.",
    category: "09",
  },
  {
    id: 10,
    title: "Payroll Remittance",
    description:
      "Compute net remuneration, remit salaries on schedule, and issue tax-ready payslips.",
    category: "10",
  },
  {
    id: 11,
    title: "Tax Administration",
    description: "Withhold and remit statutory taxes (e.g., TDS, PT) and lodge requisite returns.",
    category: "11",
  },
  {
    id: 12,
    title: "Benefits Administration",
    description:
      "Administer provident fund, insured benefits, and contractually agreed allowances.",
    category: "12",
  },
  {
    id: 13,
    title: "Expense Management",
    description: "Validate, approve, and settle employee expense claims under auditable controls.",
    category: "13",
  },
  {
    id: 14,
    title: "Leave Administration",
    description: "Establish and administer statutory-compliant leave and holiday policies.",
    category: "14",
  },
  {
    id: 15,
    title: "HR Support",
    description: "Provide day-to-day HR advisory and periodic performance liaison.",
    category: "15",
  },
  {
    id: 16,
    title: "Exit Settlements",
    description: "Conduct compliant separations, recover assets, and disburse final dues.",
    category: "16",
  },
];

const Blog19 = () => {
  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="mb-8 max-w-3xl text-left">
          <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
            Services
          </h2>
          <p className="text-muted-foreground text-base leading-normal font-normal text-balance md:text-lg">
            From strategic discovery through compliant exit settlements, we deliver a fully governed
            talent pipeline-tuned to your operating cadence and precision-engineered for India's
            regulatory landscape.
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4"
        >
          {data.map((item) => (
            <AccordionItem key={item.id} value={item.category} className="group border-none">
              <div className="border-border/60 bg-background group-hover:bg-muted/40 group-data-[state=open]:bg-muted/40 rounded-lg border transition-colors">
                <AccordionTrigger className="flex w-full items-center justify-between px-4 py-4 text-left hover:bg-transparent hover:no-underline">
                  <div className="flex flex-1 items-baseline gap-3">
                    <span className="text-muted-foreground text-xs font-normal tracking-[0.16em] uppercase">
                      {item.category}
                    </span>
                    <span className="text-muted-foreground text-sm font-medium text-balance md:text-base">
                      {item.title}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 pt-0 pb-4">
                  <div className="border-border/60 text-muted-foreground mt-2 border-l pr-2 pl-4 text-xs leading-relaxed md:pr-3 md:pl-6 md:text-sm">
                    {item.description}
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

export { Blog19 };
