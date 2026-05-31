"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        document.querySelectorAll(".hero-r").forEach((el) => el.classList.add("in"));
      })
    );
  }, []);

  return (
    <section
      id="s1"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 80% 20%, rgba(14,16,40,.9) 0%, var(--ink) 65%)",
      }}
    >
      {/* Warm coral glow top-right */}
      <div
        style={{
          position: "absolute", top: "-5%", right: "-10%",
          width: "60vw", height: "60vw",
          background: "radial-gradient(ellipse, rgba(229,93,30,.09) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Horizon line */}
      <div
        style={{
          position: "absolute", bottom: "15%", left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg,transparent 5%,rgba(255,255,255,.05) 30%,rgba(255,255,255,.05) 70%,transparent 95%)",
        }}
      />

      {/* Flight path dots — right side */}
      <div
        style={{
          position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
          display: "flex", flexDirection: "column", gap: "7px", paddingRight: "18px",
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            style={{
              display: "block", width: "3px", height: "3px", borderRadius: "50%",
              background: "rgba(229,93,30,.35)",
            }}
          />
        ))}
      </div>

      {/* Bottom divider */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg,transparent,var(--bd2) 30%,var(--bd2) 70%,transparent)",
        }}
      />

      {/* Content */}
      <div
        className="wrap hero-g"
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "72px",
          alignItems: "center",
          paddingTop: "76px",
        }}
      >
        {/* Left */}
        <div>
          <div className="stag r hero-r" style={{ marginBottom: "44px" }}>
            Portfolio
          </div>

          <h1 className="h1 r hero-r d1">
            Understanding people,<br />
            stories and <em>why<br />content spreads.</em>
          </h1>

          <div className="hero-roles r hero-r d2">
            <span className="role">Entrepreneur</span>
            <span className="rdot" />
            <span className="role">Storyteller</span>
            <span className="rdot" />
            <span className="role">Creative Strategist</span>
          </div>

          <p className="hero-intro r hero-r d3">
            Three years of building brands taught me one thing: the strongest stories
            don&rsquo;t start from briefs. They come from understanding what people feel,
            what they share, and why they stop scrolling.
          </p>

          {/* Boarding pass easter egg */}
          <div className="bpass r hero-r d4">
            <span className="bp-route">DEPARTURE →  IIIT SURAT  |  2022</span><br />
            <span className="bp-route">ARRIVAL   →  SCAPIA      |  NOW</span><br />
            PASSENGER  :  ARUNTHEJA VAKULABHARANAM<br />
            SEAT       :  CREATIVE STRATEGY LEAD<br />
            STATUS     :  BOARDING
          </div>
        </div>

        {/* Right — photo */}
        <div
          className="r hero-r d2 hero-photo"
          style={{
            borderRadius: "6px", overflow: "hidden",
            background: "var(--lift)", border: "1px solid var(--bd)",
            aspectRatio: "3/4", position: "relative",
          }}
        >
          <Image
            src="/assets/hero.jpg"
            alt="Arun"
            fill
            className="object-cover"
            style={{ objectPosition: "30% 10%" }}
            priority
            sizes="380px"
          />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="scue">
        <div className="scue-l" />
        <span className="scue-t">Scroll</span>
      </div>
    </section>
  );
}
