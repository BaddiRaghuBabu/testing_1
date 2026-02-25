"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock, X } from "lucide-react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface TeamMember {
  image: string;
  role: string;
  experienceYears: number;
  skillsets: string[];
}

interface Team11Props {
  heading?: string;
  description?: string;
  members?: TeamMember[];
  className?: string;
}

const GRADIENT_COLORS = ["#CCFBF1", "#72E3AD", "#00B389", "#06B6D4", "#0EA5E9", "#00B389"];

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar14.jpg",
    role: "FP&A Lead",
    experienceYears: 10,
    skillsets: [
      "3-Statement Models",
      "Budgeting",
      "Forecasting",
      "Scenario Planning",
      "Variance Analysis",
      "KPI Design",
      "Cost Optimization",
      "Capital Planning",
      "Board Packs",
      "Stakeholder Reporting",
      "SQL + BI",
      "Cash Flow",
    ],
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar8.jpg",
    role: "Backend Engineer",
    experienceYears: 8,
    skillsets: [
      "Python",
      "Go",
      "API Design",
      "REST APIs",
      "gRPC",
      "AuthN/AuthZ (OAuth2/JWT)",
      "Microservices",
      "PostgreSQL",
      "Redis",
      "Kafka",
      "Docker",
      "CI/CD",
      "Observability (metrics/logs/traces)",
      "Scaling",
      "Testing",
    ],
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar4.jpg",
    role: "Equity Analyst",
    experienceYears: 3,
    skillsets: [
      "Industry Analysis",
      "Market Research",
      "Equity Valuation (DCF + Comps)",
      "Earnings & KPI Models",
      "Earnings Calls",
      "Sector Coverage",
      "Investment Memos",
      "Risk Analysis",
      "Portfolio Review",
    ],
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar13.jpg",
    role: "Platform Engineer",
    experienceYears: 4,
    skillsets: [
      "Kubernetes",
      "IaC (Terraform)",
      "CI/CD",
      "GitOps",
      "Observability (metrics/logs/traces)",
      "Service Mesh",
      "Networking",
      "Security",
      "Python/Go",
      "Reliability Engineering",
      "Cloud (AWS/Azure)",
    ],
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar23.jpg",
    role: "DevOps Engineer",
    experienceYears: 3,
    skillsets: [
      "AWS",
      "Terraform",
      "CI/CD",
      "Docker",
      "Kubernetes",
      "Monitoring",
      "Logging",
      "Incident Response",
      "Linux",
      "Python/Bash",
      "Networking",
      "Config Mgmt (Ansible/Chef/Puppet)",
    ],
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar18.jpg",
    role: "Credit Analyst",
    experienceYears: 5,
    skillsets: [
      "Credit Memos",
      "Financial Spreads",
      "Cash Flow Modeling",
      "Debt Capacity / Coverage Modeling",
      "Recovery Analysis",
      "Covenant Analysis",
      "Liquidity Analysis",
      "Fixed Income Metrics",
      "Ratings",
      "Distressed Debt",
      "Risk Monitoring",
      "Industry Research",
    ],
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar2.jpg",
    role: "AI Engineer",
    experienceYears: 4,
    skillsets: [
      "LLM Apps",
      "RAG",
      "Prompt Engineering",
      "Python",
      "LangChain",
      "LLM APIs (OpenAI/Anthropic/etc.)",
      "Vector Databases",
      "Embeddings",
      "Fine-tuning",
      "Evaluation",
      "Guardrails",
      "Model Monitoring",
      "FastAPI",
      "Docker",
      "CI/CD",
      "Cloud (AWS/Azure)",
    ],
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar11.jpg",
    role: "Security Engineer",
    experienceYears: 5,
    skillsets: [
      "IAM (SAML/OAuth/SCIM)",
      "Zero Trust",
      "EDR",
      "SIEM",
      "DLP",
      "Cloud Security",
      "Network Security",
      "Incident Response",
      "Vulnerability Management",
      "SOC 2 / ISO 27001",
      "Python/Bash",
      "Microsoft Entra ID / Google Workspace",
    ],
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar6.jpg",
    role: "ML Engineer",
    experienceYears: 2,
    skillsets: [
      "PyTorch",
      "Transformers",
      "Feature Engineering",
      "Model Training",
      "Experiment Tracking",
      "Evaluation",
      "Model Serving",
      "MLOps",
      "Model Monitoring",
      "Data Pipelines",
      "Python",
    ],
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar5.jpg",
    role: "UI/UX Designer",
    experienceYears: 2,
    skillsets: [
      "User Research",
      "Information Architecture",
      "Wireframing",
      "Prototyping",
      "Interaction Design",
      "Visual Design",
      "Design Systems",
      "Accessibility",
      "Usability Testing",
      "Figma",
      "Product Strategy",
    ],
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar19.jpg",
    role: "PE Associate",
    experienceYears: 3,
    skillsets: [
      "LBO Modeling",
      "Valuation",
      "Comps",
      "Deal Sourcing",
      "Due Diligence",
      "Investment Memos",
      "Investment Committee Decks",
      "Data Room Management",
      "Sensitivity Analysis",
      "Portfolio Monitoring",
      "Market Research",
    ],
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar22.jpg",
    role: "Data Engineer",
    experienceYears: 8,
    skillsets: [
      "Python",
      "Spark",
      "Airflow",
      "ETL Pipelines",
      "Data Warehouse",
      "SQL",
      "Object Storage (S3/ADLS/GCS)",
      "Data Modeling",
      "Streaming",
      "Quality Checks",
      "BI Enablement (Tableau/Power BI)",
      "Governance",
    ],
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar12.jpg",
    role: "Product Manager",
    experienceYears: 6,
    skillsets: [
      "Product Strategy",
      "Roadmaps",
      "Discovery",
      "OKRs",
      "Analytics",
      "A/B Testing",
      "Agile",
      "Prioritization",
      "Stakeholder Management",
      "User Research",
      "GTM",
    ],
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar20.jpg",
    role: "Financial Analyst",
    experienceYears: 4,
    skillsets: [
      "Management Reporting",
      "Forecasting",
      "Budgeting",
      "Variance Analysis",
      "Headcount Planning",
      "KPI Reporting",
      "Dashboarding",
      "Liquidity",
      "SQL",
      "Excel",
      "Power BI",
    ],
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar9.jpg",
    role: "Systems Architect",
    experienceYears: 9,
    skillsets: [
      "System Design",
      "Distributed Systems",
      "API Design",
      "Integration Architecture",
      "Event-driven Architecture",
      "Data Modeling",
      "PostgreSQL",
      "Security Architecture",
      "Reliability & SLOs",
      "Performance & Scalability",
      "Cloud Architecture (AWS/Azure)",
      "Observability (metrics/logs/traces)",
      "CI/CD",
    ],
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar3.jpg",
    role: "Finance Controller",
    experienceYears: 8,
    skillsets: [
      "US GAAP/IFRS",
      "ERP",
      "GL/Close & Consolidation",
      "Month-end Close",
      "Reconciliations",
      "Revenue Recognition",
      "Internal Controls",
      "SOX",
      "Audit",
      "Compliance",
      "Cash Management",
    ],
  },
];

function useMediaQuery(query: string) {
  const [v, setV] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setV(m.matches);
    onChange();
    if (m.addEventListener) m.addEventListener("change", onChange);
    else m.addListener(onChange);
    return () => {
      if (m.removeEventListener) m.removeEventListener("change", onChange);
      else m.removeListener(onChange);
    };
  }, [query]);
  return v;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function SkillChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-muted text-muted-foreground inline-flex items-center rounded-full px-4 py-1 text-xs">
      {children}
    </span>
  );
}

function GradientRule() {
  return (
    <div
      aria-hidden="true"
      className="h-px w-full opacity-90"
      style={{ backgroundImage: `linear-gradient(90deg, ${GRADIENT_COLORS.join(",")})` }}
    />
  );
}

type PopPos = {
  top: number;
  left: number;
  width: number;
  placement: "top" | "bottom";
  skillsMax: number;
};

function SkillsContent({
  member,
  onClose,
  skillsMax,
  showClose,
}: {
  member: TeamMember;
  onClose: () => void;
  skillsMax: number;
  showClose: boolean;
}) {
  return (
    <div className="bg-background border-border/60 rounded-lg border">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <img
            src={member.image}
            alt={`${member.role} profile`}
            loading="lazy"
            decoding="async"
            className="border-border/60 h-12 w-12 shrink-0 rounded-lg border object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <p className="min-w-0 truncate text-base font-normal tracking-tight">{member.role}</p>
              {showClose ? (
                <button
                  type="button"
                  className="bg-background text-muted-foreground hover:text-foreground border-border/60 inline-flex h-8 w-8 items-center justify-center rounded-lg border"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>
            <div className="mt-0 flex items-center gap-2 md:mt-2">
              <Clock className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
              <span className="text-muted-foreground text-center text-xs font-normal">
                {member.experienceYears}+ yrs
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <GradientRule />
        </div>

        <div className="mt-4 pr-1" style={{ maxHeight: skillsMax, overflow: "auto" }}>
          <div className="flex flex-wrap gap-2">
            {member.skillsets.map((s, idx) => (
              <SkillChip key={`${s}-${idx}`}>{s}</SkillChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Team11 = ({
  className,
  heading = "Turnkey India team, fully managed",
  description = "Hire in India—without setting up a local entity. Our Employer of Record (EOR) service sources and vets talent, then manages onboarding, payroll, compliance, and HR operations.",
  members = DEFAULT_MEMBERS,
}: Team11Props) => {
  const data = React.useMemo(() => members.slice(0, 16), [members]);

  const isSmUp = useMediaQuery("(min-width: 640px)");
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const isLgUp = useMediaQuery("(min-width: 1024px)");
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const tileRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const popRef = React.useRef<HTMLDivElement | null>(null);
  const closeT = React.useRef<number | null>(null);
  const hoveringTile = React.useRef(false);
  const hoveringPop = React.useRef(false);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [pos, setPos] = React.useState<PopPos | null>(null);
  const [locked, setLocked] = React.useState(false);

  const activeMember = openIndex !== null ? data[openIndex] : null;

  const cardsPerPage = isSmUp ? 8 : 4;
  const pages = React.useMemo(() => {
    const next: TeamMember[][] = [];
    for (let i = 0; i < data.length; i += cardsPerPage) {
      next.push(data.slice(i, i + cardsPerPage));
    }
    return next;
  }, [data, cardsPerPage]);
  const pageCount = pages.length;
  const [pageIndex, setPageIndex] = React.useState(0);

  React.useEffect(() => {
    setPageIndex(0);
    setOpenIndex(null);
  }, [cardsPerPage, isLgUp]);

  React.useEffect(() => {
    if (isLgUp || pageCount <= 1) return;
    const id = window.setInterval(() => {
      if (openIndex !== null) return;
      setPageIndex((prev) => (prev + 1) % pageCount);
    }, 4500);
    return () => window.clearInterval(id);
  }, [isLgUp, pageCount, openIndex]);

  const clearClose = React.useCallback(() => {
    if (closeT.current) window.clearTimeout(closeT.current);
    closeT.current = null;
  }, []);

  const scheduleClose = React.useCallback(() => {
    clearClose();
    closeT.current = window.setTimeout(() => {
      if (!locked && !hoveringTile.current && !hoveringPop.current) {
        setOpenIndex(null);
        setLocked(false);
      }
    }, 80);
  }, [clearClose, locked]);

  const computePos = React.useCallback((index: number, preferHeight?: number) => {
    const el = tileRefs.current[index];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    const margin = 12;

    const width = Math.round(rect.width);
    const left = Math.round(rect.left);
    const top = Math.round(rect.top);

    const spaceBelow = vh - top - margin;
    const skillsMax = Math.round(clamp(spaceBelow - 140, 160, 420));

    setPos({ top, left, width, placement: "bottom", skillsMax });
  }, []);

  const openHover = React.useCallback(
    (i: number) => {
      if (!isMdUp || !canHover || locked) return;
      clearClose();
      hoveringTile.current = true;
      setOpenIndex(i);
      setPos(null);
      computePos(i);
    },
    [isMdUp, canHover, locked, clearClose, computePos],
  );

  const openLocked = React.useCallback(
    (i: number) => {
      clearClose();
      setLocked(true);
      setOpenIndex(i);
      setPos(null);
      computePos(i);
    },
    [clearClose, computePos],
  );

  React.useLayoutEffect(() => {
    if (openIndex === null) return;

    const tick = () => {
      const h = popRef.current?.getBoundingClientRect().height;
      computePos(openIndex, h ? Math.round(h) : undefined);
    };

    const raf = window.requestAnimationFrame(tick);

    const onWin = () => tick();
    window.addEventListener("resize", onWin, { passive: true });
    window.addEventListener("scroll", onWin, true);

    const ro = new ResizeObserver(() => tick());
    if (popRef.current) ro.observe(popRef.current);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onWin);
      window.removeEventListener("scroll", onWin, true);
      ro.disconnect();
    };
  }, [openIndex, computePos]);

  React.useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenIndex(null);
        setLocked(false);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node | null;
      if (!t) return;
      const pop = popRef.current;
      const tile = openIndex !== null ? tileRefs.current[openIndex] : null;
      if (pop?.contains(t)) return;
      if (tile?.contains(t)) return;
      setOpenIndex(null);
      setLocked(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openIndex]);

  const sheetMode = !canHover;

  const renderCard = (member: TeamMember, index: number) => {
    const isOpen = openIndex === index;

    return (
      <li key={`team-11-member-${index}`}>
        <button
          ref={(n) => {
            tileRefs.current[index] = n;
          }}
          type="button"
          className={cn(
            "group relative w-full rounded-lg text-left outline-none",
            "p-4",
            "transition-[transform] duration-200",
            "focus-visible:ring-primary/40 focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2",
            isOpen && "bg-muted/5",
          )}
          aria-expanded={isOpen}
          onMouseEnter={() => openHover(index)}
          onMouseLeave={() => {
            hoveringTile.current = false;
            if (canHover) scheduleClose();
          }}
          onFocus={() => {
            if (!sheetMode) openHover(index);
          }}
          onBlur={() => {
            hoveringTile.current = false;
            if (!sheetMode) scheduleClose();
          }}
          onClick={() => {
            if (sheetMode) {
              setOpenIndex((v) => (v === index ? null : index));
              setLocked(true);
              setPos(null);
              return;
            }
            if (!canHover && isOpen && locked) {
              setOpenIndex(null);
              setLocked(false);
              return;
            }
            if (canHover) {
              openHover(index);
              return;
            }
            openLocked(index);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (sheetMode) {
                setOpenIndex((v) => (v === index ? null : index));
                setLocked(true);
                return;
              }
              if (!canHover && isOpen && locked) {
                setOpenIndex(null);
                setLocked(false);
                return;
              }
              if (canHover) {
                openHover(index);
                return;
              }
              openLocked(index);
            }
            if (e.key === "Escape") {
              setOpenIndex(null);
              setLocked(false);
            }
          }}
        >
          <div className="flex items-start gap-3">
            <img
              src={member.image}
              alt={`${member.role} profile`}
              loading="lazy"
              decoding="async"
              className="border-border/60 h-12 w-12 shrink-0 rounded-lg border object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-foreground line-clamp-2 text-sm font-normal text-balance md:text-base">
                {member.role}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Clock className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
                <span className="text-muted-foreground text-center text-xs font-normal tracking-[0.16em]">
                  {member.experienceYears}+ yrs
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <GradientRule />
          </div>
        </button>
      </li>
    );
  };

  return (
    <section className={cn("pt-20 pb-0 md:pt-24 lg:pt-28", className)}>
      <div className="container">
        <div className="flex flex-col gap-8 md:gap-10 lg:gap-12">
          <div className="flex flex-col">
            <p className="text-muted-foreground mb-4 text-center text-xs font-normal tracking-[0.16em] uppercase">
              <span className="inline-flex items-center gap-2">
                <span className="bg-border h-px w-8" />
                Offshore Staffing
                <span className="bg-border h-px w-8" />
              </span>
            </p>
            <h2 className="text-foreground mx-auto mb-8 max-w-3xl text-center text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
              {heading}
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-center text-base leading-normal font-normal text-balance md:text-lg">
              {description}
            </p>
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
                  Request a vetted talent slate
                  <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
                </a>
              </Button>
              <Button variant="link" className="text-muted-foreground text-sm" asChild>
                <a href="/offshore-staffing" target="_blank" rel="noopener noreferrer">
                  Explore
                </a>
              </Button>
            </div>
          </div>

          {isLgUp ? (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {data.map(renderCard)}
            </ul>
          ) : (
            <div>
              <div className="overflow-hidden">
                <div
                  className="flex w-full transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${pageIndex * 100}%)` }}
                >
                  {pages.map((page, pageIdx) => (
                    <ul
                      key={`team11-page-${pageIdx}`}
                      className="grid w-full shrink-0 grid-cols-1 gap-4 sm:grid-cols-2"
                    >
                      {page.map((member, idx) => renderCard(member, pageIdx * cardsPerPage + idx))}
                    </ul>
                  ))}
                </div>
              </div>
              {pageCount > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                  {pages.map((_, index) => {
                    const isCurrent = pageIndex === index;
                    return (
                      <button
                        key={`team11-page-dot-${index}`}
                        type="button"
                        onClick={() => {
                          setOpenIndex(null);
                          setLocked(false);
                          setPageIndex(index);
                        }}
                        className={cn(
                          "border-border/70 h-2.5 w-2.5 rounded-full border transition",
                          "hover:bg-foreground/70 focus-visible:ring-primary/60 focus-visible:ring-2 focus-visible:outline-none",
                          isCurrent ? "bg-foreground" : "bg-muted",
                        )}
                        aria-label={`Show team group ${index + 1}`}
                        aria-pressed={isCurrent}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mounted && activeMember && openIndex !== null && sheetMode && locked && (
          <>
            {createPortal(
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-background/60 fixed inset-0 z-50 backdrop-blur-sm"
                  onClick={() => {
                    setOpenIndex(null);
                    setLocked(false);
                  }}
                />
                <motion.div
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 24, opacity: 0 }}
                  transition={{ duration: 0.2, type: "spring", bounce: 0.06 }}
                  className="fixed top-1/2 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 p-3"
                >
                  <div ref={popRef}>
                    <SkillsContent
                      member={activeMember}
                      onClose={() => {
                        setOpenIndex(null);
                        setLocked(false);
                      }}
                      skillsMax={Math.round(clamp(window.innerHeight * 0.36, 180, 360))}
                      showClose
                    />
                  </div>
                </motion.div>
              </>,
              document.body,
            )}
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mounted && activeMember && openIndex !== null && pos && !sheetMode && (
          <>
            {createPortal(
              <motion.div
                key={`team11-pop-${openIndex}`}
                initial={{ opacity: 0, y: pos.placement === "bottom" ? 10 : -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: pos.placement === "bottom" ? 10 : -10, scale: 0.98 }}
                transition={{ duration: 0.18, type: "spring", bounce: 0.08 }}
                className="fixed z-50"
                style={{ top: pos.top, left: pos.left, width: pos.width }}
                onMouseEnter={() => {
                  hoveringPop.current = true;
                  clearClose();
                }}
                onMouseLeave={() => {
                  hoveringPop.current = false;
                  scheduleClose();
                }}
              >
                <div ref={popRef}>
                  <SkillsContent
                    member={activeMember}
                    onClose={() => {
                      setOpenIndex(null);
                      setLocked(false);
                    }}
                    skillsMax={pos.skillsMax}
                    showClose={false}
                  />
                </div>
              </motion.div>,
              document.body,
            )}
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export { Team11 };
