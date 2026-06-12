import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export default function BehindWork() {
  return (
    <section
      id="s6"
      style={{ minHeight: "100vh", padding: "120px 0", background: "var(--ink)", position: "relative", overflow: "hidden" }}
    >
      {/* Amber glow bottom-right */}
      <div
        style={{
          position: "absolute", bottom: "-10%", right: "-10%",
          width: "60vw", height: "60vh",
          background: "radial-gradient(ellipse,rgba(236,167,40,.07) 0%,transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="wrap">
        <ScrollReveal className="stag">Behind The Work</ScrollReveal>

        {/* Photos + copy */}
        <div
          className="btw-g"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", marginBottom: "96px", alignItems: "start" }}
        >
          {/* Photos grid */}
          <ScrollReveal>
            <div
              className="btw-photos"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "260px 180px", gap: "8px" }}
            >
              <div className="mbox" style={{ gridRow: "1/3", position: "relative" }}>
                <Image src="/assets/bts1.png" alt="Arun presenting" fill style={{ objectFit: "cover" }} sizes="300px" />
              </div>
              <div className="mbox" style={{ position: "relative", height: "260px" }}>
                <Image src="/assets/bts2.png" alt="Content shoot BTS" fill style={{ objectFit: "cover" }} sizes="200px" />
              </div>
              <div className="mbox" style={{ position: "relative", height: "180px" }}>
                <Image src="/assets/bts3.png" alt="On location shoot" fill style={{ objectFit: "cover" }} sizes="200px" />
              </div>
            </div>
          </ScrollReveal>

          {/* Copy */}
          <div>
            <ScrollReveal tag="h2" className="sh d1" style={{ fontSize: "clamp(24px,3vw,42px)", marginBottom: "28px" }}>
              Most of what I learned,<br />I learned by <em>doing.</em>
            </ScrollReveal>
            <ScrollReveal className="bt d2">
              <p>Not from classrooms or courses. From shooting content in bedrooms. From talking to founders who were figuring things out in real time.</p>
              <p>From testing ideas with no budget, no playbook, no safety net. From watching some things go viral and others disappear into silence.</p>
              <p>Every insight I carry came from that process. Every belief I hold was earned through execution, not theory.</p>
              <p>That&rsquo;s what Blackbird gave me. And it&rsquo;s the only education I&rsquo;d trade for the one I didn&rsquo;t take.</p>
            </ScrollReveal>
          </div>
        </div>

      </div>
    </section>
  );
}
