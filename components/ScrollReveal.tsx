"use client";
import { useEffect, useRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: "d1" | "d2" | "d3" | "d4" | "d5" | "";
  tag?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
  id?: string;
};

export default function ScrollReveal({
  children,
  className = "",
  delay = "",
  tag: Tag = "div",
  style,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          obs.unobserve(el);
        }
      },
      { threshold: 0.07, rootMargin: "0px 0px -24px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} id={id} className={`r ${delay} ${className}`} style={style}>
      {children}
    </Tag>
  );
}
