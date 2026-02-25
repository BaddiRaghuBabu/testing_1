"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import React, { useRef } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Integration13 = () => {
  const integrations = [
    {
      title: "Framer",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/integration1.png",
      href: "#framer",
      icon: (
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/integration1.png"
          alt="Framer"
          className="h-8 w-8 object-cover"
        />
      ),
    },
    {
      title: "MongoDB",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/integration2.png",
      href: "#mongodb",
      icon: (
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/integration2.png"
          alt="MongoDB"
          className="h-8 w-8 object-cover"
        />
      ),
    },
    {
      title: "VSCode",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/integration3.png",
      href: "#vscod3",
      icon: (
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/integration3.png"
          alt="VSCode"
          className="h-8 w-8 object-cover"
        />
      ),
    },
    {
      title: "Notion",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/integration4.png",
      href: "#notion",
      icon: (
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/integration4.png"
          alt="Notion"
          className="h-8 w-8 object-cover"
        />
      ),
    },
    {
      title: "Figma",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/integration5.png",
      href: "#figma",
      icon: (
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/integration5.png"
          alt="Figma"
          className="h-8 w-8 object-cover"
        />
      ),
    },
    {
      title: "Discord",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/integration6.png",
      href: "#discord",
      icon: (
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/integration6.png"
          alt="Discord"
          className="h-8 w-8 object-cover"
        />
      ),
    },
    {
      title: "GitHub",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/integration7.png",
      href: "#github",
      icon: (
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/integration7.png"
          alt="GitHub"
          className="h-8 w-8 object-cover"
        />
      ),
    },
    {
      title: "Chrome",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/integration8.png",
      href: "#chrome",
      icon: (
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/integration8.png"
          alt="Chrome"
          className="h-8 w-8 object-cover"
        />
      ),
    },
    {
      title: "Postman",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/integration9.png",
      href: "#postman",
      icon: (
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/integration9.png"
          alt="Postman"
          className="h-8 w-8 object-cover"
        />
      ),
    },
  ];

  return (
    <section className="overflow-hidden pt-4 pb-0">
      <div className="container flex w-full flex-col items-center justify-center px-7">
        <div className="relative w-fit rounded-lg bg-transparent">
          <DockIntegrations integrations={integrations} className="hidden md:flex" />
          <div className="flex flex-wrap items-center justify-center gap-4 py-4 md:hidden">
            {integrations.map((integration) => (
              <a
                key={integration.title}
                href={integration.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-transform hover:scale-105"
              >
                <img
                  src={integration.src}
                  alt={integration.title}
                  className="h-16 w-16 rounded-xl object-cover"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const DockIntegrations = ({
  integrations,
  className,
}: {
  integrations: {
    title: string;
    src: string;
    href: string;
    icon: React.ReactNode;
  }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <div
      className={cn("flex items-end gap-2 px-6 py-6", className)}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {integrations.map((integration) => (
        <DockIcon key={integration.title} integration={integration} mouseX={mouseX} />
      ))}
    </div>
  );
};

const DockIcon = ({
  integration,
  mouseX,
}: {
  integration: { title: string; src: string; href: string };
  mouseX: MotionValue<number>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const width = useSpring(useTransform(distance, [-100, 0, 100], [64, 85, 64]), {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(useTransform(distance, [-100, 0, 100], [64, 94, 64]), {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const y = useSpring(useTransform(distance, [-150, 0, 150], [0, -12, 0]), {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <div ref={ref} className="relative flex h-16 w-16 flex-col items-center justify-end">
      <motion.div
        style={{ width, height, y, transformOrigin: "bottom center" }}
        className="absolute bottom-0 flex items-center justify-center rounded-xl"
      >
        <a
          href={integration.href}
          target="_blank"
          rel="noopener noreferrer"
          className="h-full w-full"
        >
          <img
            src={integration.src}
            alt={integration.title}
            className="h-full w-full rounded-xl object-cover"
          />
        </a>
      </motion.div>
    </div>
  );
};

export { Integration13 };
