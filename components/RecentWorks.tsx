import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import ScrollReveal from "@/components/ScrollReveal";

export default function RecentWorks() {
  return (
    <section
      style={{
        padding: "120px 0",
        background: "var(--navy)",
        position: "relative",
        borderTop: "1px solid var(--bd)",
      }}
    >
      {/* Ghost background text */}
      <div
        aria-hidden
        style={{
          position: "absolute", right: "-20px", top: "40px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px,18vw,240px)", fontWeight: 800,
          color: "rgba(255,255,255,.018)", lineHeight: 1, letterSpacing: "-.06em",
          pointerEvents: "none", userSelect: "none",
        }}
      >
        WORK
      </div>

      <div className="wrap">
        <ScrollReveal className="stag">Recent Work</ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", marginBottom: "16px", alignItems: "end" }}>
          <ScrollReveal className="sh d1" tag="h2" style={{ fontSize: "clamp(28px,3.8vw,50px)" }}>
            Stories I helped<br />
            brands <em>tell well.</em>
          </ScrollReveal>
          <ScrollReveal className="bt d2" tag="p" style={{ maxWidth: "420px" }}>
            Four brands. Four different emotional territories. One consistent belief: the strongest
            marketing doesn&rsquo;t feel like marketing at all.
          </ScrollReveal>
        </div>

        {/* 2×2 project grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px 32px",
            marginTop: "56px",
          }}
        >
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={`d${(i % 2) + 1}` as "d1" | "d2"}>
              <Link href={`/projects/${project.slug}`} className="pcard">
                <div className="pcard-thumb">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 940px) 100vw, 50vw"
                  />
                  <div className="pcard-over" />
                </div>
                <div className="pcard-meta">
                  <div className="pcard-cat">{project.category}</div>
                  <div className="pcard-title">{project.title}</div>
                  <div className="pcard-line">{project.tagline}</div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* View all link */}
        <ScrollReveal style={{ marginTop: "56px", borderTop: "1px solid var(--bd)", paddingTop: "32px" }}>
          <Link
            href="/projects"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 700,
              letterSpacing: ".14em", textTransform: "uppercase", color: "var(--steel)",
              transition: "color .25s",
            }}
            className="hover-cream"
          >
            View all case studies
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
