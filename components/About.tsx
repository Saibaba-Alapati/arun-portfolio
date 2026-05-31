"use client";
import { useEffect, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";

function animateCount(el: HTMLElement) {
  const raw = el.dataset.count ?? "0";
  const sfx = el.dataset.suffix ?? "";
  const isRs = el.textContent?.startsWith("₹") ?? false;
  const end = parseFloat(raw);
  const dur = 1400;
  const start = performance.now();
  function tick(now: number) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = end * ease;
    el.textContent =
      (isRs ? "₹" : "") +
      (Number.isInteger(end) ? Math.round(val) : val.toFixed(1)) +
      sfx;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

export default function About() {
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counters = statRef.current?.querySelectorAll<HTMLElement>("[data-count]");
    if (!counters) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target as HTMLElement);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => obs.observe(el));

    // Also trigger scroll reveal on the stat stack div
    const statDiv = statRef.current;
    if (statDiv) {
      const revealObs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { statDiv.classList.add("in"); revealObs.unobserve(statDiv); } },
        { threshold: 0.07 }
      );
      revealObs.observe(statDiv);
      return () => { obs.disconnect(); revealObs.disconnect(); };
    }

    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="s2"
      style={{ minHeight: "100vh", padding: "120px 0", background: "var(--ink)", position: "relative" }}
    >
      <div className="wrap">
        <ScrollReveal className="stag" tag="div">My Lens</ScrollReveal>

        {/* Two-column: story + stats */}
        <div
          className="lens-g"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "88px", marginBottom: "96px", alignItems: "start" }}
        >
          <div>
            <ScrollReveal className="sh d1" tag="h2" style={{ fontSize: "clamp(28px,3.8vw,50px)", marginBottom: "32px" }}>
              I didn&rsquo;t learn this<br />in a classroom.<br />
              I learned it <em>by building.</em>
            </ScrollReveal>
            <ScrollReveal className="bt d2">
              <p>
                After graduating from IIIT Surat in 2022, I had a choice: take a stable software
                engineering path, or bet on something I believed in. I chose the latter.
              </p>
              <p>
                I co-founded Blackbird, a content and branding company, and built it from zero.
                We grew to ₹1.3 crore in annual revenue, trained 75+ creators through Blackbird
                Academy, and worked with founders across a dozen industries.
              </p>
              <p>
                But somewhere along the way, one question eclipsed every other:{" "}
                <strong>Why do people stop scrolling?</strong>
              </p>
              <p>
                Not as a growth hack. As a window into how identity, emotion and culture drive
                behaviour far more than any algorithm ever could.
              </p>
            </ScrollReveal>
          </div>

          {/* Stat stack */}
          <div ref={statRef} className="r d2 stat-stack">
            <div className="sr">
              <div className="sn" data-count="1.3" data-suffix="Cr">₹1.3Cr</div>
              <div className="sl">Annual revenue at Blackbird</div>
            </div>
            <div className="sr">
              <div className="sn" data-count="75" data-suffix="+">75+</div>
              <div className="sl">Creators trained through Blackbird Academy</div>
            </div>
            <div className="sr">
              <div className="sn" data-count="3" data-suffix=" yrs">3 yrs</div>
              <div className="sl">Building brands from the ground up</div>
            </div>
          </div>
        </div>

        {/* Beliefs */}
        <div className="beliefs">
          <ScrollReveal className="beliefs-cap">What I believe</ScrollReveal>
          <ScrollReveal className="blf d1">
            <span className="blfi">01</span>
            <span className="blft">Audience before content.</span>
          </ScrollReveal>
          <ScrollReveal className="blf d2">
            <span className="blfi">02</span>
            <span className="blft">Story before product.</span>
          </ScrollReveal>
          <ScrollReveal className="blf d3">
            <span className="blfi">03</span>
            <span className="blft">Culture before campaigns.</span>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
