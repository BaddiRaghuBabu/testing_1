"use client";

import { ArrowRight, AudioLines, Mic, Globe, Plus, Settings2 } from "lucide-react";
import { motion } from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";

const Feature290: React.FC = () => {
  const [value, setValue] = useState("");
  const [toggle, setToggle] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <section className="pt-20 pb-0">
      <div className="container flex h-full w-full flex-col gap-6">
        <div>
          <p className="text-muted-foreground mb-4 text-center text-xs font-normal tracking-[0.16em] uppercase">
            <span className="inline-flex items-center gap-2">
              <span className="bg-border h-px w-8" />
              Data & AI
              <span className="bg-border h-px w-8" />
            </span>
          </p>
          <h1 className="text-foreground mx-auto mb-8 max-w-3xl text-center text-4xl font-normal tracking-tight text-balance md:text-5xl lg:text-6xl">
            All your data
            <br /> One trusted AI layer
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-center text-base leading-normal font-normal text-balance md:text-lg">
            We turn proprietary data into governed knowledge, then ship guardrailed agents that
            answer questions, automate workflows, and remain auditable.
          </p>
          <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
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
                Scope your use case
                <ArrowRight className="-rotate-45 rounded-full transition-all ease-in-out group-hover:rotate-0" />
              </a>
            </Button>
            <Button variant="link" className="text-muted-foreground text-sm" asChild>
              <a href="/data-and-ai" target="_blank" rel="noopener noreferrer">
                Explore
              </a>
            </Button>
          </div>
        </div>
        <div className="mt-0 flex w-full justify-center">
          <div className="flex h-full w-full max-w-2xl flex-col justify-center gap-6">
            <div className="relative w-full">
              <Marquee
                vertical
                pauseOnHover
                className="text-muted-foreground relative h-32 w-full gap-3"
              >
                {[
                  "What drove this month's revenue and margin variance?",
                  "Summarize this contract; highlight risks and key obligations.",
                  "Which campaigns drive pipeline, and where should budget shift?",
                  "What bottlenecks delay our order-to-delivery cycle?",
                  "Build a weekly ops dashboard for OTIF and backlog.",
                  "Draft a Senior Data Engineer role and interview plan.",
                  "Forecast cash flow; flag near-term liquidity risks.",
                  "Draft a compliant NDA and non-negotiable redline checklist.",
                  "Define our ICP and draft launch messaging pillars.",
                  "Write an incident SOP with SLAs, owners, and escalation.",
                  "Summarize engagement survey results; propose three prioritized actions.",
                  "Reconcile transactions; explain unmatched items and anomalies.",
                ].map((item, index) => (
                  <p
                    key={index}
                    onClick={() => setValue(item)}
                    className="hover:text-foreground cursor-pointer rounded-full px-4 text-sm transition-colors duration-100 ease-in-out"
                  >
                    {item}
                  </p>
                ))}
              </Marquee>
              <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-10 bg-linear-to-b" />
              <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t" />
            </div>

            <div className="bg-muted w-full space-y-2 rounded-4xl px-6 py-4">
              <PlaceholdersAndVanishInput
                placeholder="Ask anything"
                className="mb-4 h-12 w-full max-w-full bg-transparent shadow-none"
                onChange={handleChange}
                onSubmit={onSubmit}
                value={value}
                setValue={setValue}
              />

              <div className="flex h-10 w-full items-center justify-between">
                <div className="flex items-center gap-4">
                  <Plus className="size-4 cursor-pointer" />
                  <span className="flex cursor-pointer items-center gap-2 text-sm">
                    <Settings2 className="size-4 cursor-pointer" />
                    Tools
                  </span>
                  <span
                    onClick={() => setToggle((prev) => !prev)}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-full px-2 py-1 text-sm",
                      toggle && "bg-[#00b389]/10 text-[#00b389]",
                    )}
                  >
                    <motion.span
                      animate={{
                        rotate: toggle ? 90 : 0,
                      }}
                    >
                      <Globe className="size-4 cursor-pointer" />
                    </motion.span>
                    Search
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Mic className="size-4 cursor-pointer" />
                  <span className="bg-muted hover:bg-muted flex size-8 cursor-pointer items-center justify-center gap-2 rounded-full text-sm">
                    <AudioLines className="size-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {["Finance", "Legal", "Marketing", "Operations", "Human Resources"].map((item, index) => (
            <span
              key={index}
              onClick={() => setValue(item)}
              className="bg-muted text-muted-foreground inline-flex cursor-pointer rounded-full px-4 py-1 text-xs"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature290 };

// Original source: npx shadcn@latest add https://ui.aceternity.com/registry/placeholders-and-vanish-input.json

function PlaceholdersAndVanishInput({
  className,
  placeholder,
  onChange,
  onSubmit,
  value,
  setValue,
}: {
  className?: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  setValue: (value: string) => void;
}) {
  type Particle = {
    x: number;
    y: number;
    r: number;
    alpha: number;
    sx: number;
    sy: number;
    progress: number;
    speed: number;
    phase: number;
    amplitude: number;
    baseR: number;
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newDataRef = useRef<Particle[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const [animating, setAnimating] = useState(false);

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const inputRect = inputRef.current.getBoundingClientRect();
    const canvasWidth = Math.max(1, Math.floor(inputRect.width));
    const canvasHeight = Math.max(1, Math.floor(inputRect.height));

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    const computedStyles = getComputedStyle(inputRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size")) || 16;
    ctx.font = `${fontSize}px ${computedStyles.fontFamily}`;
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#00B389";
    ctx.fillText(value, 12, canvasHeight * 0.56);

    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const pixelData = imageData.data;
    const newData: {
      x: number;
      y: number;
    }[] = [];

    for (let t = 0; t < canvasHeight; t += 2) {
      const i = 4 * t * canvasWidth;
      for (let n = 0; n < canvasWidth; n += 2) {
        const e = i + 4 * n;
        if (pixelData[e + 3] > 0) {
          newData.push({
            x: n,
            y: t,
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y }) => ({
      x,
      y,
      sx: x,
      sy: y,
      progress: 0,
      speed: 0.042 + Math.random() * 0.028,
      phase: Math.random() * Math.PI * 2,
      amplitude: 1.2 + Math.random() * 2.2,
      baseR: 0.9 + Math.random() * 1.3,
      r: 0.9 + Math.random() * 1.3,
      alpha: 1,
    }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sendTargetX = canvas.width - 18;
    const sendTargetY = canvas.height / 2;

    const clearAnimationCanvas = () => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      newDataRef.current = [];
    };

    const animateFrame = () => {
      requestAnimationFrame(() => {
        const newArr: Particle[] = [];
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          current.progress = Math.min(1, current.progress + current.speed);
          const t = current.progress;
          const easeOut = 1 - Math.pow(1 - t, 3);
          const wave = Math.sin(t * 10 + current.phase) * current.amplitude * (1 - t);

          current.x = current.sx + (sendTargetX - current.sx) * easeOut;
          current.y = current.sy + (sendTargetY - current.sy) * easeOut + wave;
          current.r = Math.max(0.12, current.baseR * (1 - t * 0.75));
          current.alpha = Math.max(0, 1 - t * 1.08);

          if (t < 1 && current.alpha > 0.02) {
            newArr.push(current);

            ctx.globalAlpha = current.alpha;
            ctx.beginPath();
            ctx.arc(current.x, current.y, current.r, 0, Math.PI * 2);
            ctx.fillStyle = "#00B389";
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
        newDataRef.current = newArr;

        if (newDataRef.current.length > 0) {
          animateFrame();
        } else {
          clearAnimationCanvas();
          setValue("");
          setAnimating(false);
        }
      });
    };
    animateFrame();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !animating) {
      vanishAndSubmit();
    }
  };

  const vanishAndSubmit = () => {
    setAnimating(true);
    draw();

    const currentValue = inputRef.current?.value?.trim() || "";
    if (currentValue && inputRef.current) {
      animate();
    } else {
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      setAnimating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    vanishAndSubmit();
    onSubmit(e);
  };

  return (
    <form
      className={cn(
        "bg-muted relative mx-auto h-12 w-full max-w-xl overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
        className,
      )}
      onSubmit={handleSubmit}
    >
      <canvas
        className={cn(
          "pointer-events-none absolute inset-0",
          !animating ? "opacity-0" : "opacity-100",
        )}
        ref={canvasRef}
      />
      <input
        placeholder={placeholder}
        onChange={(e) => {
          if (!animating) {
            setValue(e.target.value);
            onChange(e);
          }
        }}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={value}
        type="text"
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        className={cn(
          "relative z-50 h-full w-full border-none bg-transparent pr-20 text-sm text-black focus:ring-0 focus:outline-none sm:text-base dark:text-white",
          animating && "text-transparent dark:text-transparent",
        )}
      />

      <button
        disabled={!value}
        type="submit"
        className={cn(
          "absolute top-1/2 right-0 z-50 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition duration-200",
          value ? "bg-black" : "bg-muted",
        )}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("h-4 w-4", value ? "text-white" : "text-black")}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path
            d="M5 12l14 0"
            initial={{
              strokeDasharray: "50%",
              strokeDashoffset: "50%",
            }}
            animate={{
              strokeDashoffset: value ? 0 : "50%",
            }}
            transition={{
              duration: 0.3,
              ease: "linear",
            }}
          />
          <path d="M13 18l6 -6" />
          <path d="M13 6l6 6" />
        </motion.svg>
      </button>
    </form>
  );
}
