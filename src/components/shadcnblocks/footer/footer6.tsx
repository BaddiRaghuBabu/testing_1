const Footer6 = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="pt-20 pb-10 md:pt-24 md:pb-12 lg:pt-28 lg:pb-14">
      <div className="container">
        <footer>
          <div className="border-border flex flex-col items-baseline justify-between gap-8 border-t pt-8 md:flex-row md:gap-16">
            <div className="text-muted-foreground font-mono text-xs sm:text-sm">
              &copy; Valuenode Private Limited {currentYear}
            </div>
            <div className="text-muted-foreground flex flex-col items-start gap-4 text-xs sm:text-sm md:flex-row lg:items-center">
              <a
                href="/careers"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-foreground font-mono"
              >
                Careers
              </a>
              <a
                href="/legal"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-foreground font-mono"
              >
                Legal
              </a>
              <a
                href="/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-foreground font-mono"
              >
                Resources
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer6 };
