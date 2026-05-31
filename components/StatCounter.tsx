"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  suffix?: string;
  label: string;
};

function parseValue(val: string) {
  const num = parseFloat(val.replace(/[^0-9.]/g, ""));
  const prefix = val.match(/^[^0-9]*/)?.[0] ?? "";
  return { num, prefix };
}

export default function StatCounter({ value, suffix = "", label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState("0");
  const [triggered, setTriggered] = useState(false);

  const { num, prefix } = parseValue(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;
    const duration = 1400;
    const start = performance.now();
    const raf = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const current = ease * num;
      const isDecimal = num % 1 !== 0;
      setDisplay(isDecimal ? current.toFixed(1) : Math.floor(current).toString());
      if (t < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [triggered, num]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-bold text-4xl md:text-5xl text-cream stat-val">
        {prefix}{display}{suffix}
      </div>
      <div className="text-sm text-steel mt-2 font-sans">{label}</div>
    </div>
  );
}
