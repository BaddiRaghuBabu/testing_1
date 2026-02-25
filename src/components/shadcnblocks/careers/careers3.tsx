import { ArrowRight, MapPin } from "lucide-react";
import { Badge } from "../../ui/badge";

const jobs = [
  {
    category: "Technology",
    openings: [
      {
        title: "Cloud Engineer - Azure Logic Apps",
        location: "Hyderabad, India or Remote",
        link: "https://www.valuenode.com/",
      },
      {
        title: "Full Stack Developer (Ruby on Rails & React)",
        location: "Hyderabad, India or Remote",
        link: "https://www.valuenode.com/",
      },
      {
        title: "Data Engineer",
        location: "Hyderabad, India or Remote",
        link: "https://www.valuenode.com/",
      },
    ],
  },
  {
    category: "Accounting & Finance",
    openings: [
      {
        title: "Senior Accountant",
        location: "Hyderabad, India or Remote",
        link: "https://www.valuenode.com/",
      },
      {
        title: "Financial Analyst",
        location: "Hyderabad, India or Remote",
        link: "https://www.valuenode.com/",
      },
    ],
  },
];

export const Careers3 = () => (
  <section className="pt-20 pb-0">
    <div className="container">
      <h1 className="text-foreground mb-8 text-center text-4xl font-normal tracking-tight text-balance md:text-5xl lg:text-6xl">
        Join us
      </h1>

      <div className="mt-10 flex flex-col gap-10">
        {jobs.map(({ category, openings }) => (
          <div key={category}>
            <Badge
              key={category}
              className="bg-foreground text-background rounded-full px-3 py-1 text-[12px] font-medium"
            >
              {category}
            </Badge>

            <div className="mt-6">
              {openings.map(({ title, location, link }) => (
                <a
                  key={title}
                  href={link}
                  className={[
                    "group relative block py-4 md:py-5",
                    "border-border/60 border-b",
                    "hover:bg-muted/40 transition-colors",
                    "rounded-lg px-4 pr-16",
                    "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                  ].join(" ")}
                >
                  <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="bg-foreground text-background inline-flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105">
                      <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-200" />
                    </span>
                  </span>

                  <h3 className="text-foreground max-w-[46ch] text-base font-medium">{title}</h3>

                  <div className="text-muted-foreground mt-1.5 flex gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <p className="text-sm">{location}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
