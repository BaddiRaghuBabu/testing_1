import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

const steps = [
  {
    value: "tab-1",
    num: "1",
    title: "Discovery",
    desc: "Align headcount, competencies, timelines, and engagement model.",
  },
  {
    value: "tab-2",
    num: "2",
    title: "Select",
    desc: "Valuenode submits a vetted slate; you interview and render the hiring decision.",
  },
  {
    value: "tab-3",
    num: "3",
    title: "Engage",
    desc: "Valuenode drafts offer, executes EOR, and completes compliant onboarding.",
  },
  {
    value: "tab-4",
    num: "4",
    title: "Deploy",
    desc: "Talent joins within weeks, synced to your in-house workflows from day one.",
  },
];

const Feature95 = () => (
  <section className="pt-20 pb-0 md:pt-24 lg:pt-28">
    <div className="container">
      <div className="mb-12 flex flex-col justify-between gap-6 text-left md:flex-row md:items-start">
        <h2 className="text-foreground mb-8 text-3xl font-normal tracking-tight text-balance md:text-4xl lg:text-5xl">
          Seamless
          <br />
          talent pipeline
        </h2>
        <p className="text-muted-foreground text-base leading-normal font-normal text-balance md:w-1/2 md:text-lg">
          We open by scoping your mandate, calibrating roles, headcount, timelines, and governance.
          Our talent desk then delivers a pre-vetted slate for your interview and final selection.
          Upon approval, Valuenode, through its Indian entity, issues compliant offers and completes
          onboarding. Within weeks, your new team is operational, fully equipped, and seamlessly
          embedded in your workflows.
        </p>
      </div>

      <Tabs defaultValue="tab-1">
        <TabsList className="relative mt-2 grid items-start gap-6 lg:grid-cols-4">
          <div className="bg-input absolute top-8 right-0 left-4 -z-10 hidden h-px lg:block" />
          {steps.map(({ value, num, title, desc }) => (
            <TabsTrigger key={value} value={value} className="group pointer-events-auto">
              <div className="hover:border-border/60 hover:bg-muted/40 flex gap-4 rounded-md border border-transparent px-6 py-4 text-left lg:block lg:px-4">
                <div className="flex flex-col items-center lg:contents">
                  <span className="bg-background text-muted-foreground group-data-[state=active]:bg-background group-data-[state=active]:text-muted-foreground flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-normal tracking-[0.16em] uppercase">
                    {num}
                  </span>
                  <span className="bg-input h-full w-px lg:hidden" />
                </div>
                <div>
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium text-balance md:text-base lg:mt-4">
                    {title}
                  </h3>
                  <div className="text-muted-foreground mt-4 space-y-4 text-sm leading-relaxed"></div>
                  <p className="text-muted-foreground text-sm leading-relaxed font-normal text-balance md:text-base">
                    {desc}
                  </p>
                </div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  </section>
);

export { Feature95 };
