"use client";

import { ArrowLeft, ArrowRight, Code, Menu, TrendingUpDown, X } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import valuenodeLogo from "@/assets/navbar/navbar4/valuenode-logo.svg?url";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const gccServiceLinks = [
  {
    id: "gcc-strategy-blueprint",
    title: "Strategy & GCC Blueprint",
    href: "/global-capability-center",
  },
  {
    id: "gcc-entity-tax-regulatory-setup",
    title: "Entity, Tax & Regulatory Setup",
    href: "/global-capability-center",
  },
  {
    id: "gcc-workspace-infrastructure-security",
    title: "Workspace, Infrastructure & Security",
    href: "/global-capability-center",
  },
  {
    id: "gcc-talent-strategy-build-out",
    title: "Talent Strategy & Build-out",
    href: "/global-capability-center",
  },
  {
    id: "gcc-managed-operations-governance",
    title: "Managed Operations & Governance",
    href: "/global-capability-center",
  },
  {
    id: "gcc-scale-transformation-bot-exit",
    title: "Scale, Transformation & BOT / Exit",
    href: "/global-capability-center",
  },
];

const dataAiServiceGroups = [
  {
    title: "AI",
    capabilities: [
      {
        title: "Advanced Search and Retrieval",
        href: "/data-and-ai",
      },
      {
        title: "Generative AI",
        href: "/data-and-ai",
      },
      {
        title: "Agentic Process Automation",
        href: "/data-and-ai",
      },
    ],
  },
  {
    title: "Data Engineering",
    capabilities: [
      {
        title: "Data Strategy & Target Architecture",
        href: "/data-and-ai",
      },
      {
        title: "Data Platforms, Storage & Performance",
        href: "/data-and-ai",
      },
      {
        title: "Data Integration, Pipelines & DataOps",
        href: "/data-and-ai",
      },
      {
        title: "Data Governance, Quality & Security",
        href: "/data-and-ai",
      },
    ],
  },
  {
    title: "Data Modelling",
    capabilities: [
      {
        title: "Statistical Modelling & Inference",
        href: "/data-and-ai",
      },
      {
        title: "Machine Learning & Optimization",
        href: "/data-and-ai",
      },
      {
        title: "Experimentation & Model Lifecycle",
        href: "/data-and-ai",
      },
    ],
  },
  {
    title: "Data Visualization",
    capabilities: [
      {
        title: "Dashboards, Reports & Narratives",
        href: "/data-and-ai",
      },
      {
        title: "Self-Service Analytics & Storytelling",
        href: "/data-and-ai",
      },
      {
        title: "BI Platform, Standards & Governance",
        href: "/data-and-ai",
      },
    ],
  },
];

const financeAnalyticsSections = [
  {
    title: "Data Engineering & Analytics",
    topics: [
      {
        id: "finance-data-foundation",
        title: "Finance Data Foundation",
        href: "/finance-analytics",
      },
      {
        id: "finance-gl-reporting",
        title: "GL & Reporting",
        href: "/finance-analytics",
      },
      {
        id: "finance-planning-budgeting-forecasting",
        title: "Planning, Budgeting & Forecasting",
        href: "/finance-analytics",
      },
      {
        id: "finance-working-capital",
        title: "Working Capital",
        href: "/finance-analytics",
      },
      {
        id: "finance-cost-profitability",
        title: "Cost & Profitability",
        href: "/finance-analytics",
      },
      {
        id: "finance-capital-investments",
        title: "Capital Investments",
        href: "/finance-analytics",
      },
    ],
  },
  {
    title: "AI-Powered Workflow Automation",
    topics: [
      {
        id: "finance-procure-to-pay",
        title: "Procure-to-Pay (P2P)",
        href: "/finance-analytics",
      },
      {
        id: "finance-order-to-cash",
        title: "Order-to-Cash (O2C)",
        href: "/finance-analytics",
      },
      {
        id: "finance-acquire-to-retire",
        title: "Acquire-to-Retire (A2R)",
        href: "/finance-analytics",
      },
      {
        id: "finance-hire-to-retire",
        title: "Hire-to-Retire (H2R)",
        href: "/finance-analytics",
      },
      {
        id: "finance-record-to-report",
        title: "Record-to-Report (R2R)",
        href: "/finance-analytics",
      },
    ],
  },
  {
    title: "Low-Code Apps",
    topics: [
      {
        id: "finance-bespoke-apps",
        title: "Bespoke Finance Apps",
        href: "/finance-analytics",
      },
    ],
  },
];

const GlobalCapabilityCenterMenu = () => (
  <div className="grid gap-4 sm:grid-cols-2">
    <a
      href="/global-capability-center"
      className="group relative flex h-[300px] overflow-hidden rounded-lg"
    >
      <img
        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/artistic-portrait-glitch-yqp6z.png"
        alt="Global Capability Center"
        className="aspect-2/1 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 via-black/25 to-transparent" />
      <div className="text-primary-foreground absolute inset-0 flex items-end p-6 text-left">
        <div>
          <div className="flex items-center space-x-1 text-sm font-normal">
            Global Capability Center
            <ArrowRight className="ml-1 size-4" />
          </div>
          <p className="mt-2 text-sm">India GCCs, end-to-end: Blueprint - Build - Scale</p>
        </div>
      </div>
    </a>

    <div className="order-last mt-3 sm:order-0 sm:mt-0 sm:py-2 md:p-6">
      <div className="grid gap-4 lg:grid-cols-2">
        {gccServiceLinks.map((serviceLink) => (
          <NavigationMenuLink
            key={serviceLink.id}
            href="/global-capability-center"
            className="group text-foreground hover:text-foreground focus:text-foreground data-[active=true]:text-foreground flex flex-row items-center gap-4 hover:bg-transparent data-[active=true]:bg-transparent lg:items-start"
          >
            <div className="line-clamp-2 flex-1 text-sm leading-snug font-normal lg:min-h-10">
              {serviceLink.title}
            </div>
            <ArrowRight className="size-4 lg:mt-0.5 lg:hidden" />
          </NavigationMenuLink>
        ))}
      </div>
    </div>
  </div>
);

const DataAndAIMenu = () => (
  <div>
    <div className="space-y-4 lg:flex lg:items-start lg:space-y-0 lg:space-x-8">
      <div className="w-full shrink-0 lg:max-w-[18rem]">
        <a href="/data-and-ai" className="group relative flex h-[300px] overflow-hidden rounded-lg">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/artistic-portrait-glitch-yqp6z.png"
            alt="Data & AI"
            className="aspect-4/3 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 via-black/25 to-transparent" />
          <div className="text-primary-foreground absolute inset-0 flex items-end p-6 text-left">
            <div>
              <div className="flex items-center space-x-1 text-sm font-normal">
                Data & AI
                <ArrowRight className="ml-1 size-4" />
              </div>
              <p className="mt-2 text-sm">
                Precision data and AI engineering for trusted decisions and governed automation.
              </p>
            </div>
          </div>
        </a>
      </div>
      <div className="w-full">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {dataAiServiceGroups.map((serviceGroup) => (
            <div
              key={serviceGroup.title}
              className="border-border rounded-lg border p-6 lg:border-0 lg:p-0"
            >
              <div className="border-border mb-8 border-b pb-3 text-left">
                <div className="text-muted-foreground text-left text-xs font-medium tracking-[0.16em] uppercase">
                  {serviceGroup.title}
                </div>
              </div>
              <menu className="grid gap-y-6">
                {serviceGroup.capabilities.map((capability) => (
                  <NavigationMenuLink
                    key={capability.title}
                    href={capability.href}
                    className="group text-foreground hover:text-foreground focus:text-foreground data-[active=true]:text-foreground flex min-h-10 flex-row items-start space-x-4 text-left hover:bg-transparent data-[active=true]:bg-transparent md:min-h-18 lg:space-x-4 lg:border-0 lg:py-0"
                  >
                    <div className="line-clamp-2 flex-1 text-sm leading-snug font-normal md:line-clamp-3 lg:line-clamp-2">
                      {capability.title}
                    </div>
                    <ArrowRight className="size-4 lg:hidden" />
                  </NavigationMenuLink>
                ))}
              </menu>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const OffshoreStaffingMenu = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <div className="md:col-span-2">
      <a
        href="/offshore-staffing"
        className="group relative flex h-[300px] overflow-hidden rounded-lg"
      >
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/artistic-portrait-glitch-yqp6z.png"
          alt="Offshore Staffing"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 via-black/25 to-transparent" />
        <div className="text-primary-foreground absolute inset-0 flex items-end p-6 text-left">
          <div>
            <div className="flex items-center space-x-1 text-sm font-normal">
              Offshore Staffing
              <ArrowRight className="ml-1 size-4" />
            </div>
            <p className="mt-2 text-sm">
              India staffing, fully managed: hiring, onboarding, payroll, statutory compliance,
              offboarding.
            </p>
          </div>
        </div>
      </a>
    </div>
    <div className="flex flex-col gap-4 md:col-span-2">
      <a
        href="/offshore-staffing"
        className="bg-muted/40 border-border/60 flex h-[142px] flex-col justify-center gap-4 rounded-lg border p-6 text-left"
      >
        <Code className="text-muted-foreground size-5 shrink-0 self-start" aria-hidden="true" />
        <div className="text-foreground flex items-center space-x-1 text-sm leading-snug font-normal">
          Hire Tech & Product Talent
          <ArrowRight className="ml-1 size-4" />
        </div>
        <p className="text-muted-foreground text-xs">
          Solution Architect, Cloud/DevOps Engineer, Full-stack Developer, Product Manager, Data
          Engineer, Data Scientist, Database Administrator, UI/UX Designer, QA Engineer,
          Cybersecurity Specialist
        </p>
      </a>
      <a
        href="/offshore-staffing"
        className="bg-muted/40 border-border/60 flex h-[142px] flex-col justify-center gap-4 rounded-lg border p-6 text-left"
      >
        <TrendingUpDown
          className="text-muted-foreground size-5 shrink-0 self-start"
          aria-hidden="true"
        />
        <div className="text-foreground flex items-center space-x-1 text-sm leading-snug font-normal">
          Hire Accounting & Finance Talent
          <ArrowRight className="ml-1 size-4" />
        </div>
        <p className="text-muted-foreground text-xs">
          Finance Manager, Controller, Accountant, Auditor, Tax Consultant, AP/AR Specialist,
          Payroll Specialist, Financial Analyst, Treasury Analyst, Credit Analyst, Investment
          Analyst, Risk Manager
        </p>
      </a>
    </div>
  </div>
);

const FinanceAnalyticsMenu = () => (
  <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:flex lg:items-start lg:gap-8 lg:gap-y-0">
    <div className="col-span-1 w-full shrink-0 lg:max-w-[18rem]">
      <a
        href="/finance-analytics"
        className="group relative flex h-[300px] overflow-hidden rounded-lg"
      >
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/artistic-portrait-glitch-yqp6z.png"
          alt="Finance Analytics"
          className="aspect-4/3 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 via-black/25 to-transparent" />
        <div className="text-primary-foreground absolute inset-0 flex items-end p-6 text-left">
          <div>
            <div className="flex items-center space-x-1 text-sm font-normal">
              Finance Analytics
              <ArrowRight className="ml-1 size-4" />
            </div>
            <p className="mt-2 text-sm">
              Bespoke finance infrastructure: pipelines, models, dashboards, and AI agents.
            </p>
          </div>
        </div>
      </a>
    </div>
    <div className="col-span-1 space-y-6 md:col-span-2">
      {financeAnalyticsSections.map((section) => (
        <div key={section.title}>
          <div className="border-border mb-8 border-b pb-3 text-left">
            <div className="text-muted-foreground text-left text-xs font-medium tracking-[0.16em] uppercase">
              {section.title}
            </div>
          </div>
          <menu className="grid gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-4">
            {section.topics.map((topic) => (
              <NavigationMenuLink
                key={topic.id}
                href={topic.href}
                className="group text-foreground hover:text-foreground focus:text-foreground data-[active=true]:text-foreground flex min-h-10 flex-row items-start justify-between gap-2 text-left hover:bg-transparent data-[active=true]:bg-transparent lg:py-0"
              >
                <span className="line-clamp-2 text-sm leading-snug font-normal">{topic.title}</span>
                <ArrowRight className="mt-0.5 size-4 lg:hidden" />
              </NavigationMenuLink>
            ))}
          </menu>
        </div>
      ))}
    </div>
  </div>
);

const topNavItems = [
  {
    key: "dataAndAi",
    label: "Data & AI",
    component: DataAndAIMenu,
  },
  {
    key: "financeAnalytics",
    label: "Finance Analytics",
    component: FinanceAnalyticsMenu,
  },
  {
    key: "globalCapabilityCenter",
    label: "Global Capability Center",
    component: GlobalCapabilityCenterMenu,
  },
  {
    key: "offshoreStaffing",
    label: "Offshore Staffing",
    component: OffshoreStaffingMenu,
  },
] as const;

interface Navbar4Props {
  className?: string;
}

const Navbar4 = ({ className }: Navbar4Props) => {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState<
    "dataAndAi" | "financeAnalytics" | "globalCapabilityCenter" | "offshoreStaffing" | null
  >(null);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [open]);

  return (
    <section className={cn("bg-background sticky top-0 z-100 w-full", className)}>
      <div className="container">
        <NavigationMenu className="min-w-full **:data-[slot=navigation-menu-viewport]:w-full **:data-[slot=navigation-menu-viewport]:md:w-full [&>div:last-child]:right-0 [&>div:last-child]:left-0 [&>div:last-child]:w-full">
          <div className="flex w-full justify-between gap-2 py-4">
            <a
              href="/"
              className="flex items-center gap-2 border-0 shadow-none ring-0 outline-none focus:border-0 focus:shadow-none focus:ring-0 focus:outline-none focus-visible:border-0! focus-visible:shadow-none focus-visible:ring-0! focus-visible:outline-none!"
              aria-label="Valuenode Home"
            >
              <img
                src={valuenodeLogo}
                className="pointer-events-none h-6 w-auto border-0 shadow-none ring-0 outline-none select-none md:h-[26px] lg:h-7"
                alt="Valuenode"
                draggable={false}
              />
            </a>
            <div className="flex items-center gap-2 xl:gap-8">
              <NavigationMenuList className="hidden gap-0 lg:flex">
                {topNavItems.map((item) => (
                  <NavigationMenuItem key={item.key}>
                    <NavigationMenuTrigger className="text-foreground text-sm leading-snug font-normal">
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-full p-8 md:w-full">
                      <item.component />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                className={cn(
                  "group relative z-10 w-fit rounded-full! px-6 tracking-tight shadow-none!",
                  open ? "hidden" : "hidden md:flex",
                )}
                asChild
              >
                <a href="/contact">Contact</a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Main Menu"
                className="lg:hidden"
                onClick={() => {
                  if (open) {
                    setOpen(false);
                    setSubmenu(null);
                  } else {
                    setOpen(true);
                  }
                }}
              >
                {!open && <Menu className="size-4" />}
                {open && <X className="size-4" />}
              </Button>
            </div>
          </div>

          {open && (
            <div className="border-border bg-background fixed inset-0 top-16 container flex h-[calc(100vh-4rem)] w-full flex-col overflow-auto border-t lg:hidden">
              {submenu && (
                <div className="mt-3">
                  <Button
                    variant="link"
                    onClick={() => setSubmenu(null)}
                    className="relative -left-4"
                  >
                    <ArrowLeft className="size-4 text-xs" />
                    Go back
                  </Button>
                </div>
              )}
              {submenu === null && (
                <div>
                  {topNavItems.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className="border-border flex w-full items-center border-b py-6 text-left"
                      onClick={() => setSubmenu(item.key)}
                    >
                      <span className="flex-1 text-sm font-normal">{item.label}</span>
                      <span className="shrink-0">
                        <ArrowRight className="size-4" />
                      </span>
                    </button>
                  ))}
                </div>
              )}
              {topNavItems.map(
                (item) =>
                  submenu === item.key && (
                    <div key={item.key}>
                      <h2 className="pt-4 pb-6 text-lg font-normal">{item.label}</h2>
                      <item.component />
                    </div>
                  ),
              )}

              <div className="mx-8 mt-auto flex flex-col items-center gap-8 py-24">
                <Button
                  variant="default"
                  className="group relative z-10 w-fit rounded-full! px-10 tracking-tight shadow-none!"
                  asChild
                >
                  <a href="/contact">Contact</a>
                </Button>
              </div>
            </div>
          )}
        </NavigationMenu>
      </div>
    </section>
  );
};

export { Navbar4 };
