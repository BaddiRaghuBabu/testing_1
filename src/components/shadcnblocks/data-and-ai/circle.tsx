"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";

type CircleProps = {
  className?: string;
  containerClassName?: string;
  embedded?: boolean;
};

const f6 = (n: number) => (Number.isFinite(n) ? n.toFixed(6) : "0");
const p6 = (n: number) => (Number.isFinite(n) ? +n.toFixed(6) : 0);

const GRADIENT_COLORS = ["#00B389", "#00B389", "#00B389", "#00B389", "#00B389"] as const;

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

const degToRad = (d: number) => (d * Math.PI) / 180;

const polar = (cx: number, cy: number, r: number, deg: number) => ({
  x: cx + r * Math.cos(degToRad(deg)),
  y: cy + r * Math.sin(degToRad(deg)),
});

function arcPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
  sweep: 0 | 1,
) {
  const s = polar(cx, cy, r, startDeg);
  const e = polar(cx, cy, r, endDeg);
  return `M ${s.x} ${s.y} A ${r} ${r} 0 0 ${sweep} ${e.x} ${e.y}`;
}

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const COLORS = {
  baseRing: "var(--border)",
  greyHeadFill: "var(--muted-foreground)",
};

const STROKES = {
  base: 1,
  green: 1,
  arrow: 1,
};

const ARROW = { tailPx: 18 };
const GREY_MARKS = { topDeg: 252, bottomDeg: 75 };

type FlipState = {
  opacity: number;
  progress: number;
};

function LabelCard({
  children,
  style,
  className,
  wrapperClassName,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
  className?: string;
  wrapperClassName?: string;
}) {
  const wrap = wrapperClassName ?? "-translate-x-1/2 -translate-y-1/2";

  return (
    <div className={["absolute z-30", wrap].join(" ")} style={style}>
      <div
        className={[
          "inline-flex flex-col items-center justify-center rounded-lg",
          "text-foreground text-center text-[11px] leading-none font-normal tracking-[0.16em] uppercase",
          className ?? "",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}

function MarkerDef({
  id,
  fill,
  size = 10,
  stroke = "none",
  strokeWidth = 0,
  opacity = 1,
  refXRatio = 0.9,
}: {
  id: string;
  fill: string;
  size?: number;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  refXRatio?: number;
}) {
  const s = size;
  const mid = s * 0.5;

  return (
    <marker
      id={id}
      markerWidth={s}
      markerHeight={s}
      refX={s * refXRatio}
      refY={mid}
      orient="auto"
      markerUnits="userSpaceOnUse"
    >
      <path
        d={`M 0 0 L ${s} ${mid} L 0 ${s} Z`}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
        strokeLinejoin="round"
      />
    </marker>
  );
}

function RingWrap({
  className,
  style,
  children,
}: {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

function GradientStops() {
  return (
    <>
      <stop offset="0%" stopColor={GRADIENT_COLORS[0]} />
      <stop offset="25%" stopColor={GRADIENT_COLORS[1]} />
      <stop offset="50%" stopColor={GRADIENT_COLORS[2]} />
      <stop offset="75%" stopColor={GRADIENT_COLORS[3]} />
      <stop offset="100%" stopColor={GRADIENT_COLORS[4]} />
    </>
  );
}

function ArcGradientDef({
  id,
  start,
  end,
}: {
  id: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
}) {
  return (
    <linearGradient
      id={id}
      x1={f6(start.x)}
      y1={f6(start.y)}
      x2={f6(end.x)}
      y2={f6(end.y)}
      gradientUnits="userSpaceOnUse"
    >
      <GradientStops />
    </linearGradient>
  );
}

function useSyncedFlipFade({
  fadeInMs = 180,
  holdMs = 900,
  fadeOutMs = 220,
  gapMs = 170,
}: {
  fadeInMs?: number;
  holdMs?: number;
  fadeOutMs?: number;
  gapMs?: number;
}) {
  const [t, setT] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      setT(now - start);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  const per = fadeInMs + holdMs + fadeOutMs + gapMs;
  const cycle = Math.floor(t / per);
  const u = t - cycle * per;

  let opacity = 0;
  if (u < fadeInMs) opacity = easeInOutCubic(clamp(u / fadeInMs, 0, 1));
  else if (u < fadeInMs + holdMs) opacity = 1;
  else if (u < fadeInMs + holdMs + fadeOutMs) {
    opacity = 1 - easeInOutCubic(clamp((u - fadeInMs - holdMs) / fadeOutMs, 0, 1));
  }

  const visibleSpan = fadeInMs + holdMs + fadeOutMs;
  const progressRaw = clamp(u / Math.max(1, visibleSpan), 0, 1);
  const progress = easeInOutCubic(progressRaw);

  return { opacity, progress } satisfies FlipState;
}

function useRafClockMs() {
  const [ms, setMs] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      setMs(now - start);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  return ms;
}

function useRingGeometry({
  boxRef,
  humanSide,
  ringScale = 0.7,
}: {
  boxRef: React.RefObject<HTMLDivElement | null>;
  humanSide: "left" | "right";
  ringScale?: number;
}) {
  const [size, setSize] = useState(530);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const initial = el.getBoundingClientRect().width || 530;
    setSize(initial);

    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width ?? 530;
      setSize((prev) => (Math.abs(prev - w) > 0.75 ? w : prev));
    });

    ro.observe(el);

    return () => ro.disconnect();
  }, [boxRef]);

  const geo = useMemo(() => {
    const VB = 420;
    const cx = VB / 2;
    const cy = VB / 2;

    const baseR = clamp((size / 720) * 230, 165, 290);
    const ringR = baseR * ringScale;

    const baseHub = clamp((size / 720) * 150, 110, 190);
    const hub = baseHub * (0.86 + ringScale * 0.14);

    const cardR = ringR;

    return { VB, cx, cy, ringR, hub, cardR };
  }, [size, ringScale]);

  const cardPos = useMemo(() => {
    const toPct = (x: number, y: number) => ({
      left: `${(x / geo.VB) * 100}%`,
      top: `${(y / geo.VB) * 100}%`,
    });

    const top = polar(geo.cx, geo.cy, geo.cardR, 270);
    const human = polar(geo.cx, geo.cy, geo.cardR, humanSide === "right" ? 0 : 180);
    const bottom = polar(geo.cx, geo.cy, geo.cardR, 90);
    const rightDummy = polar(geo.cx, geo.cy, geo.cardR, 0);

    return {
      top: toPct(top.x, top.y),
      human: toPct(human.x, human.y),
      bottom: toPct(bottom.x, bottom.y),
      rightDummy: toPct(rightDummy.x, rightDummy.y),
    };
  }, [geo, humanSide]);

  return { geo, cardPos };
}

function TeachRingOne({
  widthStyle,
  humanSide = "left",
  rightDummyLabel,
  centerLabel = "TEACH",
  topLabel = <>FILTER&nbsp;&nbsp;DATA</>,
  humanLabel = (
    <>
      HUMAN <br />
      VALUES
    </>
  ),
  bottomLabel = (
    <>
      OPENAI <br />
      POLICIES
    </>
  ),
  anchorLabelsOutward = false,
  ringScale = 0.7,
  labelCardClassName,
  centerTextClassName,
  hubClassName,
  markerSize = 10,
  clockMs = 0,
  phaseDelayMs = 0,
  loopMs = 4800,
  startAngleDegOverride,
}: {
  widthStyle: string;
  humanSide?: "left" | "right";
  rightDummyLabel?: React.ReactNode;
  centerLabel?: string;
  topLabel?: React.ReactNode | null;
  humanLabel?: React.ReactNode;
  bottomLabel?: React.ReactNode | null;
  anchorLabelsOutward?: boolean;
  ringScale?: number;
  labelCardClassName?: string;
  centerTextClassName?: string;
  hubClassName?: string;
  markerSize?: number;
  clockMs?: number;
  phaseDelayMs?: number;
  loopMs?: number;
  startAngleDegOverride?: number;
}) {
  const uid = useId();
  const boxRef = useRef<HTMLDivElement | null>(null);

  const { geo, cardPos } = useRingGeometry({
    boxRef,
    humanSide,
    ringScale,
  });

  const circumference = useMemo(() => 2 * Math.PI * geo.ringR, [geo.ringR]);

  const headingAngles = useMemo(() => {
    const set = new Set<number>();
    if (topLabel !== null) set.add(270);
    if (humanLabel !== null) set.add(humanSide === "right" ? 0 : 180);
    if (bottomLabel !== null) set.add(90);
    if (rightDummyLabel) set.add(0);
    return Array.from(set).sort((a, b) => a - b);
  }, [topLabel, humanLabel, humanSide, bottomLabel, rightDummyLabel]);

  const startAngleDeg = useMemo(() => {
    if (typeof startAngleDegOverride === "number" && Number.isFinite(startAngleDegOverride)) {
      const n = ((startAngleDegOverride % 360) + 360) % 360;
      return n;
    }
    if (headingAngles.includes(270)) return 270;
    return headingAngles[0] ?? 270;
  }, [headingAngles, startAngleDegOverride]);

  const segments = useMemo(() => {
    if (headingAngles.length < 2) {
      return [] as Array<{
        startDegAbs: number;
        spanDeg: number;
        kind: "solid" | "broken";
        cumStart: number;
        cumEnd: number;
      }>;
    }

    const unwrapped = headingAngles
      .map((a) => (a < startAngleDeg ? a + 360 : a))
      .sort((a, b) => a - b);

    const loop = [...unwrapped, unwrapped[0] + 360];
    let cum = 0;

    return loop.slice(0, -1).map((start, i) => {
      const next = loop[i + 1];
      const spanDeg = next - start;
      const kind: "solid" | "broken" = spanDeg >= 179 ? "solid" : "broken";
      const seg = { startDegAbs: start, spanDeg, kind, cumStart: cum, cumEnd: cum + spanDeg };
      cum += spanDeg;
      return seg;
    });
  }, [headingAngles, startAngleDeg]);

  const totalDeg = useMemo(() => segments.reduce((acc, s) => acc + s.spanDeg, 0), [segments]);

  const localMs = useMemo(() => {
    const m = (clockMs + phaseDelayMs) % loopMs;
    return m < 0 ? m + loopMs : m;
  }, [clockMs, phaseDelayMs, loopMs]);

  const loopT = localMs / Math.max(1, loopMs);
  const travelledDeg = loopT * Math.max(1, totalDeg);

  const activeSegmentIndex = useMemo(() => {
    if (!segments.length) return null;
    const idx = segments.findIndex((s) => travelledDeg >= s.cumStart && travelledDeg < s.cumEnd);
    return idx === -1 ? segments.length - 1 : idx;
  }, [segments, travelledDeg]);

  const activeSegment = useMemo(() => {
    if (activeSegmentIndex === null) return null;
    return segments[activeSegmentIndex] ?? null;
  }, [segments, activeSegmentIndex]);

  const brokenChainStartDegAbs = useMemo(() => {
    if (activeSegmentIndex === null || !activeSegment || activeSegment.kind !== "broken") {
      return null;
    }

    let i = activeSegmentIndex;
    while (i > 0 && segments[i - 1]?.kind === "broken") i -= 1;
    return segments[i]?.startDegAbs ?? activeSegment.startDegAbs;
  }, [activeSegmentIndex, activeSegment, segments]);

  const localSegDeg = activeSegment
    ? clamp(travelledDeg - activeSegment.cumStart, 0, activeSegment.spanDeg)
    : 0;

  const arcStartDegAbs = activeSegment?.startDegAbs ?? startAngleDeg;
  const arcEndDegAbs = arcStartDegAbs + localSegDeg;

  const solidPathD =
    activeSegment && activeSegment.kind === "solid"
      ? arcPath(geo.cx, geo.cy, geo.ringR, arcStartDegAbs, arcEndDegAbs, 1)
      : "";

  const brokenPathD =
    activeSegment && activeSegment.kind === "broken" && brokenChainStartDegAbs !== null
      ? arcPath(geo.cx, geo.cy, geo.ringR, brokenChainStartDegAbs, arcEndDegAbs, 1)
      : "";

  const brokenDashLen = clamp(geo.ringR * 0.12, 10, 18);
  const brokenGapLen = clamp(geo.ringR * 0.08, 7, 12);

  const tailDegDelta = clamp((ARROW.tailPx / Math.max(1, circumference)) * 360, 3, 8);
  const headPt = polar(geo.cx, geo.cy, geo.ringR, arcEndDegAbs);
  const tailPt = polar(geo.cx, geo.cy, geo.ringR, arcEndDegAbs - tailDegDelta);

  const arrowPathD =
    activeSegment && localSegDeg > 1 ? `M ${tailPt.x} ${tailPt.y} L ${headPt.x} ${headPt.y}` : "";

  const greenMarkerId = `gradArrowHead-${uid}`;

  const hubPx = useMemo(() => clamp(geo.hub * 1.25, 132, 132), [geo.hub]);

  const activeArcGradientId = `arcGrad-${uid}`;
  const arrowGradientId = `arrowGrad-${uid}`;

  const arcStart = polar(geo.cx, geo.cy, geo.ringR, 270);
  const arcEnd = polar(geo.cx, geo.cy, geo.ringR, 90);

  const wrapCenter = "-translate-x-1/2 -translate-y-1/2";
  const wrapTop = "-translate-x-1/2 -translate-y-full";
  const wrapBottom = "-translate-x-1/2 translate-y-0";
  const wrapLeft = "-translate-x-full -translate-y-1/2";
  const wrapRight = "translate-x-0 -translate-y-1/2";

  const topWrap = anchorLabelsOutward ? wrapTop : wrapCenter;
  const bottomWrap = anchorLabelsOutward ? wrapBottom : wrapCenter;

  const humanWrap = anchorLabelsOutward
    ? humanSide === "right"
      ? wrapRight
      : wrapLeft
    : wrapCenter;

  const rightDummyWrap = anchorLabelsOutward ? wrapRight : wrapCenter;

  const labelInsetPx = 4;

  const topStyle = anchorLabelsOutward
    ? {
        left: cardPos.top.left,
        top: `calc(${cardPos.top.top} + ${labelInsetPx}px)`,
      }
    : {
        left: cardPos.top.left,
        top: cardPos.top.top,
      };

  const humanStyle = anchorLabelsOutward
    ? {
        left:
          humanSide === "right"
            ? `calc(${cardPos.human.left} - ${labelInsetPx}px)`
            : `calc(${cardPos.human.left} + ${labelInsetPx}px)`,
        top: cardPos.human.top,
      }
    : {
        left: cardPos.human.left,
        top: cardPos.human.top,
      };

  const bottomStyle = anchorLabelsOutward
    ? {
        left: cardPos.bottom.left,
        top: `calc(${cardPos.bottom.top} - ${labelInsetPx}px)`,
      }
    : {
        left: cardPos.bottom.left,
        top: cardPos.bottom.top,
      };

  const rightDummyStyle = anchorLabelsOutward
    ? {
        left: `calc(${cardPos.rightDummy.left} - ${labelInsetPx}px)`,
        top: cardPos.rightDummy.top,
      }
    : {
        left: cardPos.rightDummy.left,
        top: cardPos.rightDummy.top,
      };

  const perimeterLabelClassName = [
    "h-6 w-[92px] rounded-full bg-muted border border-border/40 !font-normal",
    labelCardClassName ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={boxRef} className="relative" style={{ width: widthStyle, aspectRatio: "1 / 1" }}>
      <svg
        viewBox={`0 0 ${geo.VB} ${geo.VB}`}
        className="absolute inset-0 z-0 h-full w-full"
        style={{ shapeRendering: "geometricPrecision" }}
      >
        <circle
          cx={geo.cx}
          cy={geo.cy}
          r={geo.ringR}
          fill="none"
          stroke={COLORS.baseRing}
          strokeWidth={STROKES.base}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        <defs>
          <ArcGradientDef id={activeArcGradientId} start={arcStart} end={arcEnd} />
          <ArcGradientDef id={arrowGradientId} start={arcStart} end={arcEnd} />
          <MarkerDef id={greenMarkerId} fill={GRADIENT_COLORS[2]} size={markerSize} />
        </defs>

        <g style={{ pointerEvents: "none" }}>
          {brokenPathD ? (
            <path
              d={brokenPathD}
              fill="none"
              stroke={`url(#${activeArcGradientId})`}
              strokeWidth={STROKES.green}
              strokeLinecap="round"
              strokeDasharray={`${brokenDashLen} ${brokenGapLen}`}
              opacity={1}
              vectorEffect="non-scaling-stroke"
            />
          ) : null}

          {solidPathD ? (
            <path
              d={solidPathD}
              fill="none"
              stroke={`url(#${activeArcGradientId})`}
              strokeWidth={STROKES.green}
              strokeLinecap="round"
              opacity={1}
              vectorEffect="non-scaling-stroke"
            />
          ) : null}

          {arrowPathD ? (
            <path
              d={arrowPathD}
              fill="none"
              stroke={`url(#${arrowGradientId})`}
              strokeWidth={STROKES.arrow}
              strokeLinecap="round"
              markerEnd={`url(#${greenMarkerId})`}
              vectorEffect="non-scaling-stroke"
            />
          ) : null}
        </g>
      </svg>

      {topLabel !== null ? (
        <LabelCard style={topStyle} wrapperClassName={topWrap} className={perimeterLabelClassName}>
          {topLabel}
        </LabelCard>
      ) : null}

      <LabelCard
        style={humanStyle}
        wrapperClassName={humanWrap}
        className={perimeterLabelClassName}
      >
        {humanLabel}
      </LabelCard>

      {bottomLabel !== null ? (
        <LabelCard
          style={bottomStyle}
          wrapperClassName={bottomWrap}
          className={perimeterLabelClassName}
        >
          {bottomLabel}
        </LabelCard>
      ) : null}

      {rightDummyLabel ? (
        <LabelCard
          style={rightDummyStyle}
          wrapperClassName={rightDummyWrap}
          className={perimeterLabelClassName}
        >
          {rightDummyLabel}
        </LabelCard>
      ) : null}

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div
          className={[
            "c12-hub bg-muted flex items-center justify-center rounded-full",
            hubClassName ?? "",
          ].join(" ")}
          style={{ width: hubPx, height: hubPx }}
        >
          <div
            className={[
              "text-foreground inline-flex items-center justify-center px-4 text-center text-xs leading-tight font-normal! tracking-[0.16em] whitespace-nowrap uppercase sm:px-5",
              centerTextClassName ?? "",
            ].join(" ")}
          >
            {centerLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

function BetweenArrowPx({
  x,
  y,
  lengthPx,
  flip,
  markerSize = 10,
}: {
  x: number;
  y: number;
  lengthPx: number;
  flip: FlipState;
  markerSize?: number;
}) {
  const { opacity, progress } = flip;

  const padL = 10;
  const padR = 18;

  const xL = padL;
  const xR = Math.max(padL + 6, lengthPx - padR);
  const yy = 11;

  const maxTravelPx = 34;
  const naturalSpan = Math.max(1, xR - xL);
  const span = Math.min(naturalSpan, maxTravelPx);

  const mid = (xL + xR) / 2;
  const moveL = mid - span / 2;
  const moveR = mid + span / 2;

  const head = moveL + progress * span;
  const bX = clamp(head, Math.min(moveL, moveR), Math.max(moveL, moveR));
  const tipX = bX;
  const tipY = yy;
  const tailLen = markerSize * 0.95;
  const halfW = markerSize * 0.45;
  const p1X = tipX - tailLen;
  const p1Y = tipY - halfW;
  const p2X = tipX - tailLen;
  const p2Y = tipY + halfW;

  return (
    <div
      className="absolute z-20"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        opacity,
        transition: "opacity 200ms ease",
        pointerEvents: "none",
      }}
    >
      <svg width={lengthPx} height={22} viewBox={`0 0 ${lengthPx} 22`}>
        <polygon
          points={`${p6(tipX)},${p6(tipY)} ${p6(p1X)},${p6(p1Y)} ${p6(p2X)},${p6(p2Y)}`}
          fill={COLORS.greyHeadFill}
          opacity={0.4}
        />
      </svg>
    </div>
  );
}

function ForkArrowsStageSameLogic({
  stageW,
  stageH,
  flip,
  ringScale,
  ringWidthPx,
  posLeft,
  posRight,
  posBottom,
  markerSizeRingUnits = 10,
}: {
  stageW: number;
  stageH: number;
  flip: FlipState;
  ringScale: number;
  ringWidthPx: number;
  posLeft: { x: number; y: number };
  posRight: { x: number; y: number };
  posBottom: { x: number; y: number };
  markerSizeRingUnits?: number;
}) {
  const { opacity, progress } = flip;

  const VB = 420;
  const baseR = clamp((ringWidthPx / 720) * 230, 165, 290);
  const ringRView = baseR * ringScale;
  const ringRStage = (ringRView / VB) * ringWidthPx;

  const markerSizeStage = (markerSizeRingUnits / VB) * ringWidthPx;
  const maxTravelPx = 34;

  const buildLine = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const vx = to.x - from.x;
    const vy = to.y - from.y;
    const dist = Math.hypot(vx, vy) || 1;
    const ux = vx / dist;
    const uy = vy / dist;

    const start = { x: from.x + ux * ringRStage, y: from.y + uy * ringRStage };
    const end = { x: to.x - ux * ringRStage, y: to.y - uy * ringRStage };

    const L = Math.hypot(end.x - start.x, end.y - start.y) || 1;

    const padL = Math.min(18, L * 0.18);
    const padR = Math.min(28, L * 0.22);

    const xL = padL;
    const xR = Math.max(padL + 6, L - padR);

    const naturalSpan = Math.max(1, xR - xL);
    const span = Math.min(naturalSpan, maxTravelPx);

    const mid = (xL + xR) / 2;
    const moveL = mid - span / 2;
    const moveR = mid + span / 2;

    return { start, ux, uy, moveL, moveR, span };
  };

  const leftLine = buildLine(posBottom, posLeft);
  const rightLine = buildLine(posRight, posBottom);

  const segOnLine = (line: ReturnType<typeof buildLine>) => {
    const headS = line.moveL + progress * line.span;
    const bS = clamp(headS, Math.min(line.moveL, line.moveR), Math.max(line.moveL, line.moveR));
    const B = { x: line.start.x + line.ux * bS, y: line.start.y + line.uy * bS };
    const U = { x: line.ux, y: line.uy };
    return { B, U };
  };

  const leftSeg = segOnLine(leftLine);
  const rightSeg = segOnLine(rightLine);

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-25 h-full w-full"
      viewBox={`0 0 ${stageW} ${stageH}`}
      style={{ opacity, transition: "opacity 200ms ease" }}
    >
      {(() => {
        const tip = leftSeg.B;
        const ux = leftSeg.U.x;
        const uy = leftSeg.U.y;
        const nx = -uy;
        const ny = ux;
        const tailLen = markerSizeStage * 0.95;
        const halfW = markerSizeStage * 0.45;
        const bx = tip.x - ux * tailLen;
        const by = tip.y - uy * tailLen;
        const p1x = bx + nx * halfW;
        const p1y = by + ny * halfW;
        const p2x = bx - nx * halfW;
        const p2y = by - ny * halfW;

        return (
          <polygon
            points={`${p6(tip.x)},${p6(tip.y)} ${p6(p1x)},${p6(p1y)} ${p6(p2x)},${p6(p2y)}`}
            fill={COLORS.greyHeadFill}
            opacity={0.4}
          />
        );
      })()}

      {(() => {
        const tip = rightSeg.B;
        const ux = rightSeg.U.x;
        const uy = rightSeg.U.y;
        const nx = -uy;
        const ny = ux;
        const tailLen = markerSizeStage * 0.95;
        const halfW = markerSizeStage * 0.45;
        const bx = tip.x - ux * tailLen;
        const by = tip.y - uy * tailLen;
        const p1x = bx + nx * halfW;
        const p1y = by + ny * halfW;
        const p2x = bx - nx * halfW;
        const p2y = by - ny * halfW;

        return (
          <polygon
            points={`${p6(tip.x)},${p6(tip.y)} ${p6(p1x)},${p6(p1y)} ${p6(p2x)},${p6(p2y)}`}
            fill={COLORS.greyHeadFill}
            opacity={0.4}
          />
        );
      })()}
    </svg>
  );
}

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  const [w, setW] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf1 = 0;
    let raf2 = 0;

    const measure = () => {
      const next = el.clientWidth || 0;
      setW((prev) => (Math.abs(prev - next) > 0.5 ? next : prev));
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          measure();
        });
      });
    };

    scheduleMeasure();

    const ro = new ResizeObserver(() => scheduleMeasure());
    ro.observe(el);

    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("orientationchange", scheduleMeasure);

    const vv = window.visualViewport;
    vv?.addEventListener("resize", scheduleMeasure);
    vv?.addEventListener("scroll", scheduleMeasure);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      ro.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("orientationchange", scheduleMeasure);
      vv?.removeEventListener("resize", scheduleMeasure);
      vv?.removeEventListener("scroll", scheduleMeasure);
    };
  }, [ref]);

  return w;
}

export default function Circle({
  className,
  containerClassName = "w-full bg-white overflow-hidden",
  embedded = false,
}: CircleProps) {
  const STAGE_W = embedded ? 740 : 1060;
  const STAGE_H = embedded ? 620 : 700;
  const ringScale = 0.7;
  const ringWidthPx = embedded ? 510 : 500;
  const markerSizeRingUnits = 10;

  const POS = useMemo(() => {
    const VB = 420;
    const baseR = clamp((ringWidthPx / 720) * 230, 165, 290);
    const ringRView = baseR * ringScale;
    const ringRadiusPx = (ringRView / VB) * ringWidthPx;

    const centerX = STAGE_W * 0.5;
    const sideTarget = STAGE_W * (embedded ? 0.47 : 0.34);
    const maxSideByWidth = STAGE_W - ringRadiusPx * 2 - (embedded ? 88 : 120);
    const maxSideByHeight =
      ((STAGE_H - ringRadiusPx * 2 - (embedded ? 24 : 32)) * 2) / Math.sqrt(3);
    const side = clamp(sideTarget, 260, Math.min(maxSideByWidth, maxSideByHeight));

    const topHalfSpan = side * 0.5;
    const triHeight = side * (Math.sqrt(3) / 2);

    const topY = (STAGE_H - triHeight) * 0.5;
    const bottomY = topY + triHeight;
    const betweenLen = clamp(
      side - ringRadiusPx * 2 - (embedded ? 12 : 20),
      embedded ? 46 : 52,
      embedded ? 68 : 76,
    );
    const midLabelY = topY + triHeight / 3;

    return {
      r1: { x: centerX - topHalfSpan, y: topY },
      r2: { x: centerX + topHalfSpan, y: topY },
      r3: { x: centerX, y: bottomY },
      between: { x: centerX, y: topY, len: betweenLen },
      midLabel: { x: centerX, y: midLabelY },
    };
  }, [STAGE_W, STAGE_H, embedded, ringWidthPx, ringScale]);

  const outerRef = useRef<HTMLDivElement | null>(null);
  const outerW = useElementWidth(outerRef);

  const scale = useMemo(() => {
    if (!outerW) return 1;
    return clamp(outerW / STAGE_W, 0.58, 1);
  }, [outerW, STAGE_W]);

  const clockMs = useRafClockMs();
  const ringLoopMs = outerW > 0 && outerW < 768 ? 11200 : 9600;

  const flip = useSyncedFlipFade({
    fadeInMs: 180,
    holdMs: 900,
    fadeOutMs: 220,
    gapMs: 170,
  });

  const stageHeightPx = Math.ceil(STAGE_H * scale);

  return (
    <section className={`${containerClassName} ${className ?? ""}`}>
      <div
        className={
          embedded
            ? "mx-auto w-full p-0"
            : "mx-auto w-full max-w-[1500px] px-6 py-12 sm:px-10 lg:px-14 lg:py-16"
        }
      >
        <div className={embedded ? "mx-auto w-full" : "mx-auto w-full max-w-[1060px]"}>
          <div
            ref={outerRef}
            className="relative w-full"
            style={{
              height: stageHeightPx,
            }}
          >
            <div
              className="absolute top-1/2 left-1/2"
              style={{
                width: STAGE_W,
                height: STAGE_H,
                transform: `translate(-50%, -50%) scale(${scale})`,
                transformOrigin: "center center",
              }}
            >
              <ForkArrowsStageSameLogic
                stageW={STAGE_W}
                stageH={STAGE_H}
                flip={flip}
                ringScale={ringScale}
                ringWidthPx={ringWidthPx}
                posLeft={POS.r1}
                posRight={POS.r2}
                posBottom={POS.r3}
                markerSizeRingUnits={markerSizeRingUnits}
              />

              <RingWrap
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: POS.r1.x, top: POS.r1.y }}
              >
                <TeachRingOne
                  widthStyle={`${ringWidthPx}px`}
                  ringScale={ringScale}
                  markerSize={markerSizeRingUnits}
                  humanSide="left"
                  centerLabel="Design"
                  topLabel={<>Connect</>}
                  humanLabel={<>Constrain</>}
                  bottomLabel={<>Compose</>}
                  clockMs={clockMs}
                  phaseDelayMs={0}
                  loopMs={ringLoopMs}
                  startAngleDegOverride={270}
                />
              </RingWrap>

              <BetweenArrowPx
                x={POS.between.x}
                y={POS.between.y}
                lengthPx={POS.between.len}
                flip={flip}
                markerSize={(markerSizeRingUnits / 420) * ringWidthPx}
              />

              <RingWrap
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: POS.r2.x, top: POS.r2.y }}
              >
                <TeachRingOne
                  widthStyle={`${ringWidthPx}px`}
                  ringScale={ringScale}
                  markerSize={markerSizeRingUnits}
                  humanSide="right"
                  centerLabel="Orchestrate"
                  topLabel={<>Route</>}
                  humanLabel={<>Gate</>}
                  bottomLabel={<>Execute</>}
                  clockMs={clockMs}
                  phaseDelayMs={0}
                  loopMs={ringLoopMs}
                  startAngleDegOverride={270}
                />
              </RingWrap>

              <LabelCard
                style={{ left: POS.midLabel.x, top: POS.midLabel.y }}
                className="h-[84px] w-[104px] bg-transparent leading-relaxed font-medium"
              >
                <>
                  Agentic <br />
                  Process <br />
                  Automation
                </>
              </LabelCard>

              <RingWrap
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: POS.r3.x, top: POS.r3.y }}
              >
                <TeachRingOne
                  widthStyle={`${ringWidthPx}px`}
                  ringScale={ringScale}
                  markerSize={markerSizeRingUnits}
                  humanSide="left"
                  topLabel={null}
                  centerLabel="Optimize"
                  humanLabel={<>Refine</>}
                  bottomLabel={<>Evaluate</>}
                  rightDummyLabel={<>Observe</>}
                  clockMs={clockMs}
                  phaseDelayMs={0}
                  loopMs={ringLoopMs}
                  startAngleDegOverride={270}
                />
              </RingWrap>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
