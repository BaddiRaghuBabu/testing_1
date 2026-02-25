"use client";

import { BadgeCheck, Clock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface DataItem {
  id: string;
  name: string;
  username: string;
  date: string;
  avatar: string;
  content: string;
}

const DATA: DataItem[] = [
  {
    id: "1",
    name: "Lead Backend Engineer",
    username: "Python, Microservices",
    date: "Work Experience: 8+ years",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    content:
      "Python, RESTful APIs, OpenAPI, PostgreSQL, Redis, AWS, Kafka, Distributed Systems, Microservices, CI/CD, Go, Rust, System Architecture, API Design, Monitoring, Scalability, FastAPI, WebSockets, Docker, Kubernetes",
  },
  {
    id: "2",
    name: "System Administrator",
    username: "Linux System Administration",
    date: "Work Experience: 3+ years",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    content:
      "Linux System Administration, Troubleshooting, Debugging, Problem Solving, Multi-tier Application Support, Network Troubleshooting, Python, JavaScript, Core Java, Load Balancing (F5, Avi), Cloud Technologies (GCP, AWS, Azure), Configuration Management (Puppet, Ansible), GitOps, Infrastructure as Code (IaC), Terraform, Jenkins, Artifactory, Incident Management, Shell Scripting, Perl, OS Patching, Root Cause Analysis",
  },
  {
    id: "3",
    name: "Finance Manager",
    username: "Financial Modeling",
    date: "Work Experience: 4+ years",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    content: "Excel, SQL, Power BI, Financial Modeling, FP&A",
  },
  {
    id: "4",
    name: "Frontend Developer",
    username: "Svelte, TypeScript",
    date: "Work Experience: 2+ years",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    content: "Svelte, TypeScript, TailwindCSS, Figma, Node.js, REST API Integration, Python",
  },
  {
    id: "5",
    name: "Equity Research Analyst",
    username: "Valuation",
    date: "Work Experience: 3+ years",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    content: "Financial Modeling, Valuation, Market Research",
  },
  {
    id: "6",
    name: "UI/UX Designer",
    username: "Figma, User Research",
    date: "Work Experience: 5+ years",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    content:
      "Figma, Axure, Human-Centered Design, User Research, HTML/CSS, JavaScript, USWDS, 508 Compliance, Wireframing, Prototyping, VR, AR, WebGL, Miro, Instructional Design, Wireflows, Technical Content, Usability, Cross-Platform Design, Sketch, Adobe XD, Mobile Apps, Web Apps, User-Centered Design, Visual Design",
  },
  {
    id: "7",
    name: "Senior Business Analyst",
    username: "Agile SDLC",
    date: "Work Experience: 5+ years",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-7.webp",
    content:
      "Requirements Gathering, BRD Documentation, Gap and Impact Analysis, Process Modeling, Solution Design, Agile SDLC, Data Analysis, Stakeholder Management & Communication, Change Management, Testing Coordination",
  },
  {
    id: "8",
    name: "Data Engineer",
    username: "Python",
    date: "Work Experience: 4+ years",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-8.webp",
    content: "Python, PySpark, SQL, Databricks, ETL, Automation",
  },
  {
    id: "9",
    name: "DevOps Engineer",
    username: "Docker, Kubernetes",
    date: "Work Experience: 3+ years",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    content:
      "AWS, Kubernetes, Terraform, Docker, CI/CD, Python Scripting, Monitoring, Security Governance, Automation, Linux Administration",
  },
];

const GRADIENT_COLORS = ["#CCFBF1", "#72E3AD", "#00B389", "#06B6D4", "#0EA5E9"];

function GradientRule() {
  return (
    <div
      aria-hidden="true"
      className="h-px w-full opacity-90"
      style={{
        backgroundImage: `linear-gradient(90deg, ${GRADIENT_COLORS.join(",")})`,
      }}
    />
  );
}

const TestimonialCard = ({ testimonial }: { testimonial: DataItem }) => (
  <Card className="border-border/60 relative mb-2 break-inside-avoid rounded-lg border p-6 shadow-none md:p-7">
    <div className="flex items-center gap-4">
      <Avatar className="ring-muted h-10 w-10 rounded-full ring-1">
        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
      </Avatar>

      <div className="min-w-0">
        <div className="inline-flex items-center gap-2 leading-none">
          <span className="text-muted-foreground line-clamp-1 text-sm font-medium md:text-base">
            {testimonial.name}
          </span>
          <BadgeCheck className="fill-muted-foreground h-4 w-4 shrink-0 translate-y-px stroke-white" />
        </div>

        <p className="text-muted-foreground mt-1 text-xs leading-snug font-normal md:text-sm">
          {testimonial.username}
        </p>
      </div>
    </div>

    <div className="mt-4">
      <GradientRule />
    </div>

    <div className="text-muted-foreground mt-4 min-h-[3.2em] text-xs leading-relaxed font-normal md:text-sm">
      {testimonial.content}
    </div>

    <div className="text-muted-foreground mt-4 flex items-center gap-2 text-xs leading-snug font-normal md:text-sm">
      <Clock className="h-4 w-4" />
      <span>{testimonial.date}</span>
    </div>
  </Card>
);

const Testimonial23 = () => {
  const [columnCount, setColumnCount] = useState(3);

  useEffect(() => {
    const getColumnCount = () => {
      if (typeof window === "undefined") return 3;
      const width = window.innerWidth;
      if (width < 768) return 1;
      if (width < 1024) return 2;
      return 3;
    };

    const updateColumnCount = () => setColumnCount(getColumnCount());

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  const reorderForColumns = (items: DataItem[], columns: number) => {
    const itemsPerColumn = Math.ceil(items.length / columns);
    const reordered: DataItem[] = [];

    for (let col = 0; col < columns; col++) {
      for (let row = 0; row < itemsPerColumn; row++) {
        const originalIndex = row * columns + col;
        if (originalIndex < items.length) reordered.push(items[originalIndex]);
      }
    }
    return reordered;
  };

  const reorderedData = useMemo(() => reorderForColumns(DATA, columnCount), [columnCount]);

  return (
    <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="after:from-background relative mt-0 w-full after:absolute after:inset-x-0 after:-bottom-2 after:h-96 after:bg-linear-to-t">
          <div className="columns-1 gap-2 md:columns-2 lg:columns-3">
            {reorderedData.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Testimonial23 };
