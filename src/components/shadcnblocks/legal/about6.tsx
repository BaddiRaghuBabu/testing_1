"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CornerDownRight } from "lucide-react";

type LegalSection = {
  id: string;
  title: string;
  content: React.ReactNode;
};

function LegalPageLayout(props: {
  title: string;
  lastUpdated?: string;
  preamble?: React.ReactNode;
  sections: LegalSection[];
}) {
  const { title, lastUpdated, preamble, sections } = props;

  const firstId = sections[0]?.id ?? "";
  const [activeId, setActiveId] = React.useState<string>(firstId);
  const [mobileTocValue, setMobileTocValue] = React.useState<string>("");

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const applyHash = () => {
      const hash = window.location.hash || "";
      const id = hash.startsWith("#") ? hash.slice(1) : "";
      if (!id) return;
      if (sections.some((s) => s.id === id)) setActiveId(id);
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [sections]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof IntersectionObserver === "undefined") return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-legal-section='true']"));
    if (!nodes.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        const next = visible[0]?.target as HTMLElement | undefined;
        if (next?.id) setActiveId(next.id);
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0.1, 0.2, 0.35, 0.5, 0.75],
      },
    );

    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  const TocLinks = ({
    onNavigate,
    className = "",
  }: {
    onNavigate?: () => void;
    className?: string;
  }) => (
    <ul className={`space-y-1.5 ${className}`}>
      {sections.map((s) => {
        const isActive = s.id === activeId;
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={() => onNavigate?.()}
              aria-current={isActive ? "true" : undefined}
              className={[
                "block rounded-md px-2 py-2 text-sm transition-colors",
                "text-muted-foreground hover:text-foreground",
                "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                isActive ? "text-foreground font-medium" : "",
              ].join(" ")}
            >
              {s.title}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div id="top" className="container">
      <a
        href="#legal-content"
        className="focus:bg-background focus:text-foreground focus:ring-ring sr-only rounded-md px-3 py-2 text-sm focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none"
      >
        Skip to content
      </a>

      <div className="md:grid md:grid-cols-[260px_minmax(0,1fr)] md:gap-8">
        <aside className="hidden md:block print:hidden">
          <div className="pr-2 md:sticky md:top-24 md:max-h-[calc(100vh-8rem)] md:overflow-auto">
            <div className="text-muted-foreground mb-4 text-sm font-medium">On this page</div>
            <TocLinks />
          </div>
        </aside>

        <main id="legal-content" className="md:border-border/60 min-w-0 md:border-l md:pl-12">
          <header>
            <h1
              id="legal-page-title"
              className="text-foreground mb-8 scroll-mt-24 text-4xl font-normal tracking-tight text-balance md:text-5xl lg:text-6xl"
            >
              {title}
            </h1>

            {lastUpdated ? (
              <p className="text-muted-foreground mb-8 text-sm leading-relaxed font-normal text-balance md:text-base">
                Last updated: {lastUpdated}
              </p>
            ) : (
              <div className="mb-10" />
            )}

            <div className="md:hidden print:hidden">
              <Accordion
                type="single"
                collapsible
                value={mobileTocValue}
                onValueChange={setMobileTocValue}
                className="mb-10"
              >
                <AccordionItem
                  value="toc"
                  className="border-border/60 rounded-xl border px-3 last:border-b!"
                >
                  <AccordionTrigger className="text-sm">On this page</AccordionTrigger>
                  <AccordionContent>
                    <TocLinks onNavigate={() => setMobileTocValue("")} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </header>

          <div className="text-muted-foreground max-w-2xl text-base lg:text-lg print:text-black">
            {preamble ? <div className="space-y-5">{preamble}</div> : null}

            {sections.map((s, idx) => (
              <React.Fragment key={s.id}>
                <section id={s.id} data-legal-section="true" className="scroll-mt-24">
                  <h2 className="text-foreground mt-12 mb-4 text-lg font-medium tracking-tight">
                    {s.title}
                  </h2>
                  <div className="space-y-5">{s.content}</div>
                </section>

                {idx !== sections.length - 1 ? <Separator className="my-10" /> : null}
              </React.Fragment>
            ))}

            <div className="mt-12 flex items-center justify-between gap-4 print:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="bg-muted/40 text-muted-foreground hover:bg-muted/60 hover:text-muted-foreground/80 w-fit text-sm font-medium"
                asChild
              >
                <a href="#legal-page-title">
                  <CornerDownRight className="mr-1 h-3 w-3" />
                  Back to top
                </a>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function PrivacyPolicyContent() {
  const COMPANY_LEGAL_NAME = "Valuenode Private Limited";
  const BRAND_NAME = "Valuenode";
  const SITE_URL = "https://www.valuenode.com";
  const SITE_HOST = "www.valuenode.com";
  const LAST_UPDATED = "January 1, 2026";

  const CONTACT_EMAIL_DISPLAY = "contact [at] valuenode [dot] com";
  const CONTACT_PHONE = "+91 7337223434";
  const CONTACT_ADDRESS_LINES = [
    "WeWork Rajapushpa Summit",
    "Financial District",
    "Hyderabad 500032",
    "Telangana, India",
  ];

  const preamble = (
    <>
      <p className="text-muted-foreground text-base leading-relaxed font-normal tracking-tight md:text-lg">
        This Privacy Policy explains how{" "}
        <strong className="text-foreground">{COMPANY_LEGAL_NAME}</strong> ({BRAND_NAME}, we, us)
        collects, uses, and shares information when you visit{" "}
        <a className="hover:text-foreground underline underline-offset-4" href={SITE_URL}>
          {SITE_HOST}
        </a>{" "}
        (the Site) or interact with us.
      </p>
      <p className="text-muted-foreground text-base leading-relaxed font-normal tracking-tight md:text-lg">
        By using the Site, you understand and agree to the practices described in this Policy. If
        you do not agree, please do not use the Site.
      </p>
    </>
  );

  const sections: LegalSection[] = [
    {
      id: "collection",
      title: "Collection of your Personal Information",
      content: (
        <>
          <p className="text-muted-foreground text-base leading-relaxed font-normal tracking-tight md:text-lg">
            We collect information you choose to share with us, such as when you complete a form,
            request a resource, book a call, or email us.
          </p>
          <ul className="marker:text-muted-foreground text-muted-foreground my-4 list-disc space-y-2 pl-5 text-sm leading-relaxed font-normal tracking-tight md:text-base">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Organization / role</li>
            <li>Message content you submit</li>
          </ul>
          <p className="text-muted-foreground text-base leading-relaxed font-normal tracking-tight md:text-lg">
            Please avoid sharing sensitive personal information through the Site unless it is
            necessary and appropriate for your request.
          </p>
        </>
      ),
    },
    {
      id: "use",
      title: "Use of your Personal Information",
      content: (
        <>
          <p className="text-muted-foreground text-base leading-relaxed font-normal tracking-tight md:text-lg">
            We use personal information to:
          </p>
          <ul className="marker:text-muted-foreground text-muted-foreground my-4 list-disc space-y-2 pl-5 text-sm leading-relaxed font-normal tracking-tight md:text-base">
            <li>Respond to inquiries and provide requested information</li>
            <li>Deliver resources and services you request</li>
            <li>Improve Site performance and content</li>
            <li>Maintain security and prevent misuse</li>
            <li>Send marketing communications where permitted (you can opt out)</li>
          </ul>
        </>
      ),
    },
    {
      id: "sharing",
      title: "Sharing Information with Third Parties",
      content: (
        <>
          <p className="text-muted-foreground text-base leading-relaxed font-normal tracking-tight md:text-lg">
            We do not sell your personal information. We may share information with service
            providers that help us operate the Site or deliver services (such as hosting, email
            delivery, analytics, or support tools). We may also share information if required by law
            or to protect rights and safety.
          </p>
        </>
      ),
    },
    {
      id: "tracking",
      title: "Tracking User Behavior",
      content: (
        <>
          <p className="text-muted-foreground text-base leading-relaxed font-normal tracking-tight md:text-lg">
            We may measure how visitors use the Site (for example, pages viewed and resources
            downloaded) to improve our content and user experience.
          </p>
        </>
      ),
    },
    {
      id: "auto",
      title: "Automatically Collected Information",
      content: (
        <>
          <p className="text-muted-foreground text-base leading-relaxed font-normal tracking-tight md:text-lg">
            When you visit the Site, we may automatically receive information such as IP address,
            browser type, device information, pages visited, and referring pages. We use this
            information for operations, security, and analytics.
          </p>
        </>
      ),
    },
    {
      id: "cookies",
      title: "Use of Cookies",
      content: (
        <>
          <p className="text-muted-foreground text-base leading-relaxed font-normal tracking-tight md:text-lg">
            We may use cookies and similar technologies to enable functionality, remember
            preferences, and understand Site usage. You can manage cookies through your browser
            settings. Disabling cookies may impact Site functionality.
          </p>
        </>
      ),
    },
    {
      id: "links",
      title: "Links",
      content: (
        <p className="text-muted-foreground text-base leading-relaxed font-normal tracking-tight md:text-lg">
          The Site may link to third-party websites. We are not responsible for their content or
          privacy practices. Review their privacy policies before sharing information.
        </p>
      ),
    },
    {
      id: "security",
      title: "Security of your Personal Information",
      content: (
        <>
          <p className="text-muted-foreground text-base leading-relaxed font-normal tracking-tight md:text-lg">
            We use reasonable safeguards to protect personal information, including encryption in
            transit where appropriate. No system is 100% secure, and we cannot guarantee absolute
            security.
          </p>
        </>
      ),
    },
    {
      id: "children",
      title: "Children Under 18",
      content: (
        <p className="text-muted-foreground text-base leading-relaxed font-normal tracking-tight md:text-lg">
          The Site is not intended for children under 18, and we do not knowingly collect personal
          information from them. If you believe a child has provided us information, please contact
          us so we can delete it.
        </p>
      ),
    },
    {
      id: "email",
      title: "Email Communications",
      content: (
        <>
          <p className="text-muted-foreground text-base leading-relaxed font-normal tracking-tight md:text-lg">
            We send emails to respond to requests and provide service-related updates. Marketing
            emails are sent only if you opt in, and you can unsubscribe at any time.
          </p>
        </>
      ),
    },
    {
      id: "storage",
      title: "External Data Storage Sites",
      content: (
        <p className="text-muted-foreground text-base leading-relaxed font-normal tracking-tight md:text-lg">
          We may use third-party service providers for hosting or support services. We expect them
          to safeguard information and use it only to provide their services.
        </p>
      ),
    },
    {
      id: "changes",
      title: "Changes to this Policy",
      content: (
        <p className="text-muted-foreground text-base leading-relaxed font-normal tracking-tight md:text-lg">
          We may update this Policy from time to time. We will revise the "Last updated" date when
          changes are made.
        </p>
      ),
    },
    {
      id: "contact",
      title: "Contact Information",
      content: (
        <>
          <p className="text-muted-foreground text-base leading-relaxed font-normal tracking-tight md:text-lg">
            If you have questions about this Policy, contact:
          </p>
          <ul className="marker:text-muted-foreground text-muted-foreground my-4 list-disc space-y-2 pl-5 text-sm leading-relaxed font-normal tracking-tight md:text-base">
            <li>
              Website:{" "}
              <a className="underline underline-offset-4" href={SITE_URL}>
                {SITE_HOST}
              </a>
            </li>
            <li>Email: {CONTACT_EMAIL_DISPLAY}</li>
            <li>Phone: {CONTACT_PHONE}</li>
          </ul>

          <address className="text-muted-foreground text-sm leading-relaxed font-normal tracking-tight not-italic md:text-base">
            <div>{COMPANY_LEGAL_NAME}</div>
            {CONTACT_ADDRESS_LINES.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </address>
        </>
      ),
    },
  ];

  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      preamble={preamble}
      sections={sections}
    />
  );
}

export const About6 = () => {
  return (
    <section className="pt-20 pb-0">
      <PrivacyPolicyContent />
    </section>
  );
};
