"use client";

import { Check, CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  {
    id: "strategy-gcc-blueprint",
    indexLabel: "01",
    title: "Strategy & GCC Blueprint",
    shortDescription:
      "We define the strategic, legal and economic case for your India GCC, and translate it into a structure, scope and governance model suitable for board consideration and approval.",
    items: [
      "Define GCC vision, scope and measurable success criteria.",
      "Build the investment case and 3- to 5-year financial model, with board-ready materials.",
      "Design the operating and legal model (captive, BOT, hybrid, EOR perimeter) aligned to risk and tax priorities.",
      "Compare locations and talent markets across tier-1 and tier-2 cities.",
      "Map a phased transition roadmap sequenced by function, risk and dependencies.",
    ],
    learnMoreUrl: "#",
  },
  {
    id: "entity-tax-regulatory",
    indexLabel: "02",
    title: "Entity, Tax & Regulatory Setup",
    shortDescription:
      "We design and oversee the legal, tax and regulatory foundation with a focus on a clean, well-documented subsidiary from the outset.",
    items: [
      "Advise on entity form and coordinate incorporation with local and global counsel.",
      "Coordinate applications for RBI / FEMA, MCA and banking approvals, and document capital infusions and related-party flows.",
      "Register for direct and indirect taxes and help implement payroll, withholding and statutory contributions.",
      "Support the design of intercompany pricing, permanent establishment (PE) and IP ownership frameworks in collaboration with group tax and external advisers.",
      "Establish a compliance calendar and control framework aligned to group policies and audit expectations.",
    ],
    learnMoreUrl: "#",
  },
  {
    id: "workspace-infra-security",
    indexLabel: "03",
    title: "Workspace, Infrastructure & Security",
    shortDescription:
      "We design, build and help secure the physical and digital environment your GCC needs to operate reliably at scale.",
    items: [
      "Select city, micro-market and building based on talent access, cost, risk and regulatory profile.",
      "Design and oversee office fit-out, facilities management and managed services (SEZ and non-SEZ).",
      "Align network, identity and endpoint architecture with group IT standards and security posture.",
      "Establish an information-security baseline: access controls, logging, data-handling policies and vendor due diligence.",
      "Define and test business-continuity and disaster-recovery arrangements for critical teams and systems.",
    ],
    learnMoreUrl: "#",
  },
  {
    id: "talent-strategy-build-out",
    indexLabel: "04",
    title: "Talent Strategy & Build-out",
    shortDescription:
      "We define your GCC talent model and then build the team end-to-end leadership, seed pods and scaled hiring under your own brand and standards.",
    items: [
      "Develop workforce plans by function, level and hiring channel, tied to the 3- to 5-year ramp.",
      "Run leadership search and seed pod build-out for priority capabilities and critical roles.",
      "Orchestrate employer-branding, campus and lateral hiring campaigns in target talent markets.",
      "Benchmark compensation and benefits; shape offers and draft local HR policies consistent with group frameworks.",
      "Design onboarding, culture induction and manager enablement so India teams operate as one with your global organization.",
    ],
    learnMoreUrl: "#",
  },
  {
    id: "managed-operations-governance",
    indexLabel: "05",
    title: "Managed Operations & Governance",
    shortDescription:
      "Where you retain an ongoing partner, we can run the center under your standards-owning day-to-day operations while giving leadership clear line of sight.",
    items: [
      "Run day-to-day HR, payroll, benefits administration and employee relations within agreed policies.",
      "Manage vendors, leases and local services against defined SLAs and performance thresholds.",
      "Establish governance rhythms: dashboards, reviews and escalation paths with group leaders.",
      "Operate internal controls over data access, approvals, delegations and statutory compliance.",
      "Provide operating metrics on cost, productivity and risk for group finance, risk and audit.",
    ],
    learnMoreUrl: "#",
  },
  {
    id: "scale-transformation-bot-exit",
    indexLabel: "06",
    title: "Scale, Transformation & BOT / Exit",
    shortDescription:
      "As the GCC matures, we help you scale and reposition it as a strategic platform-and, when strategy changes, design and execute Build-Operate-Transfer (BOT) or exit structures intended to minimise value leakage and control gaps.",
    items: [
      "Expand scope into new service lines and centers of Excellence under clear mandates.",
      "Redesign and standardise processes, using automation and lift-and-rebuild rather than simple lift-and-shift.",
      "Install continuous-improvement programs and talent-development pathways for future leadership and critical skills.",
      "Structure and execute Build-Operate-Transfer, rebadging or carve-out / exit transactions, including risk, people and IP treatment, in coordination with your legal and tax advisers.",
      "Lead change management and stakeholder communications across India and global teams to support continuity, culture and retention.",
    ],
    learnMoreUrl: "#",
  },
];

const Services8 = () => {
  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="text-left">
          <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
            Services
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="max-w-xl space-y-6 text-left md:max-w-none lg:max-w-xl">
            <p className="text-muted-foreground text-base leading-normal font-normal text-balance md:text-lg">
              Once you've decided India is the right move, we lead and coordinate every stage of the
              GCC lifecycle-pressure-testing the business case, shaping the legal and location
              model, securing space and infrastructure, and standing up leadership and core teams.
            </p>

            <p className="text-muted-foreground text-sm leading-relaxed font-normal text-balance md:text-base">
              On the ground, we help you design and operate the HR, payroll, benefits, vendor and
              lease management, and information-security frameworks your board and control functions
              would expect of a regulated subsidiary.
            </p>

            <div className="border-border/60 space-y-4 border-l pl-4 md:pl-6">
              <p className="text-muted-foreground text-xs leading-relaxed font-normal text-balance md:text-sm">
                Over time, we support the center's evolution from a basic delivery hub into a
                trusted in-house platform for talent, innovation and scaled execution across your
                business-anchored in economics, governance and risk standards that are designed to
                withstand scrutiny.
              </p>
            </div>
          </div>

          <div className="max-w-xl space-y-5 text-left md:max-w-none lg:max-w-none">
            <Accordion type="single" collapsible className="space-y-2">
              {services.map((service) => (
                <AccordionItem key={service.id} value={service.id} className="group border-none">
                  <div className="border-border/60 bg-background group-hover:bg-muted/40 group-data-[state=open]:bg-muted/40 rounded-lg border transition-colors">
                    <AccordionTrigger className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-transparent hover:no-underline">
                      <div className="flex flex-1 items-baseline gap-3">
                        <span className="text-muted-foreground text-xs font-normal tracking-[0.16em] uppercase">
                          {service.indexLabel}
                        </span>
                        <span className="text-muted-foreground text-sm font-medium text-balance md:text-base">
                          {service.title}
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-5 pt-0 pb-5">
                      <div className="text-muted-foreground mt-4 space-y-4 text-xs leading-relaxed md:text-sm">
                        <div className="border-border/60 border-l pl-4 md:pl-6">
                          <p>{service.shortDescription}</p>
                        </div>

                        <ul className="space-y-2 pl-4 md:pl-6">
                          {service.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="bg-muted-foreground/15 mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full">
                                <Check className="text-muted-foreground h-3 w-3 flex-none" />
                              </div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-muted-foreground/80 mt-4 w-fit p-0 text-sm font-medium"
                          asChild
                        >
                          <a href={service.learnMoreUrl}>
                            <CornerDownRight className="mr-1 h-3 w-3" />
                            Learn more
                          </a>
                        </Button>
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Services8 };
