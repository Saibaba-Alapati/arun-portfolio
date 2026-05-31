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
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", marginBottom: "96px", alignItems: "start" }}
        >
          {/* Photos grid */}
          <ScrollReveal>
            <div
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

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg,transparent,var(--bd2) 30%,var(--bd2) 70%,transparent)",
            marginBottom: "96px",
          }}
        />

        {/* Why Scapia */}
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "96px", alignItems: "start" }}>
          <div>
            <ScrollReveal>
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "7px 14px",
                  background: "rgba(236,167,40,.1)", border: "1px solid rgba(236,167,40,.28)",
                  borderRadius: "100px",
                  fontSize: "10px", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase",
                  color: "var(--amber)", marginBottom: "24px",
                }}
              >
                <svg width="7" height="7" viewBox="0 0 8 8" fill="var(--amber)"><circle cx="4" cy="4" r="4" /></svg>
                Why Scapia
              </div>
            </ScrollReveal>
            <ScrollReveal
              tag="h2"
              className="d1"
              style={{
                fontFamily: "var(--font-serif)", fontSize: "clamp(28px,3.5vw,46px)",
                lineHeight: 1.15, fontWeight: 400,
              }}
            >
              A brand that sells<br />the{" "}
              <em style={{ fontStyle: "italic", color: "var(--amber)" }}>feeling,</em>
              <br />not the feature.
            </ScrollReveal>
          </div>

          <ScrollReveal className="d2" style={{ fontSize: "16px", lineHeight: 1.9, color: "var(--steel)" }}>
            <p style={{ marginBottom: "20px" }}>Most financial products lead with what you get. Scapia leads with where you could <strong style={{ color: "var(--cream)", fontWeight: 500 }}>go.</strong></p>
            <p style={{ marginBottom: "20px" }}>That shift from benefit to experience, from feature to feeling, is what separates good marketing from great brand building. The Scapia card doesn&rsquo;t market rewards. It markets the version of you that&rsquo;s already at the airport, already booking the next trip, already living a life not defined by limitations.</p>
            <p style={{ marginBottom: "20px" }}>That&rsquo;s not product marketing. That&rsquo;s <strong style={{ color: "var(--cream)", fontWeight: 500 }}>identity marketing.</strong> And it&rsquo;s the most honest form of brand building I&rsquo;ve seen, because it doesn&rsquo;t pretend the product is the point. The person is the point. The experience is the point.</p>
            <p style={{ marginBottom: "20px" }}>The strongest brands don&rsquo;t ask people to care. They reflect people back to themselves in ways that feel aspirational but real. They <strong style={{ color: "var(--cream)", fontWeight: 500 }}>enable the story rather than becoming it.</strong></p>
            <p>I want to work on a brand that treats storytelling as strategy, not decoration. One that believes the best marketing doesn&rsquo;t feel like marketing at all.</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
