import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import ScrollReveal from "@/components/ScrollReveal";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) return {};
  return { title: `${p.title} — Arun`, description: p.tagline };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  const isNavy = idx % 2 === 0;
  const bg = isNavy ? "var(--navy)" : "var(--ink)";
  const ghostNum = String(idx + 1).padStart(2, "0");

  return (
    <section
      className="sec-main"
      style={{
        minHeight: "100vh", padding: "120px 0",
        background: bg, position: "relative", overflow: "hidden",
      }}
    >
      {/* Top divider */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg,transparent,var(--bd2) 30%,var(--bd2) 70%,transparent)" }} />

      {/* Ghost number */}
      <div
        aria-hidden
        style={{
          position: "absolute", right: "-40px", top: "40px",
          fontFamily: "var(--font-display)", fontSize: "240px", fontWeight: 800,
          color: "rgba(255,255,255,.022)", lineHeight: 1, letterSpacing: "-.06em",
          pointerEvents: "none", userSelect: "none",
        }}
      >
        {ghostNum}
      </div>

      <div className="wrap">
        {/* Back breadcrumb */}
        <div style={{ marginBottom: "32px" }}>
          <Link
            href="/projects"
            style={{
              fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase",
              color: "var(--steel)", fontFamily: "var(--font-display)", fontWeight: 700,
              display: "inline-flex", alignItems: "center", gap: "8px",
              transition: "color .25s",
            }}
          >
            ← All Work
          </Link>
        </div>

        <ScrollReveal className="stag">{project.caseNumber}</ScrollReveal>

        {/* Case study header: heading + context */}
        <div
          className="cs-hd"
          style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "72px", alignItems: "end", marginBottom: "52px" }}
        >
          <div>
            <div className="bstrip r d1">
              <span className="bname">{project.title}</span>
              <span className="bsep" />
              <span className="bcat">{project.category}</span>
              {project.externalLink && (
                <a href={project.externalLink.url} target="_blank" rel="noopener noreferrer" className="ext-tag">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  {project.externalLink.label}
                </a>
              )}
            </div>
            <h1
              className="sh r d2"
              style={{ fontSize: "clamp(30px,4vw,54px)" }}
              dangerouslySetInnerHTML={{
                __html: project.heading.replace(/\n/g, "<br/>") + " <em>" + project.headingEm + "</em>",
              }}
            />
          </div>
          {project.context && (
            <ScrollReveal className="ctx d3">
              <div className="ctx-l">Context</div>
              <div className="ctx-b">{project.context}</div>
            </ScrollReveal>
          )}
        </div>

        {/* Framework grid */}
        <ScrollReveal>
          <div className="fw" style={{ gridTemplateColumns: project.framework.length === 2 ? "1fr 1fr" : "1fr 1fr" }}>
            {project.framework.map((card) => (
              <div
                key={card.label}
                className="fwc"
                style={card.fullWidth ? { gridColumn: "1/3" } : undefined}
              >
                <div className="fwl">{card.label}</div>
                <div className="fwb" dangerouslySetInnerHTML={{ __html: card.body }} />
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Campaign link (Keventers style) */}
        {project.campaignLink && (
          <ScrollReveal className="d2">
            <a className="camp-link" href={project.campaignLink.url} target="_blank" rel="noopener noreferrer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--coral)">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              {project.campaignLink.label}
              <span className="camp-link-arrow">↗</span>
            </a>
          </ScrollReveal>
        )}

        {/* Images */}
        <ScrollReveal
          className={`d3 cs-imgs cs-imgs-${project.images.length}`}
          style={{
            display: "grid",
            gridTemplateColumns: project.images.length === 3 ? "1fr 1fr 1fr" : "1fr 1fr",
            gap: "10px",
            margin: "28px 0 52px",
          }}
        >
          {project.images.map((src, i) => (
            <div key={i} className="mbox" style={{ height: "240px", position: "relative" }}>
              <Image src={src} alt={`${project.title} image ${i + 1}`} fill style={{ objectFit: "cover" }} sizes="400px" />
            </div>
          ))}
        </ScrollReveal>

        {/* Stats */}
        {project.stats && project.stats.length > 0 && (
          <ScrollReveal style={{ display: "flex", flexWrap: "wrap", gap: "16px", margin: "0 0 40px" }}>
            {project.stats.map((s) => (
              <div key={s.label} className="stat-hi" style={{ flex: 1 }}>
                <div className="shin">{s.value}</div>
                <div className="shil">{s.label}</div>
              </div>
            ))}
          </ScrollReveal>
        )}

        {/* Learning card */}
        <ScrollReveal className="d3">
          <div className="lcard">
            <div className="lcard-l">Learning</div>
            <div
              className="lcard-q"
              dangerouslySetInnerHTML={{ __html: project.learning.replace(/\n/g, "<br/>") }}
            />
          </div>
        </ScrollReveal>

        {/* Next project */}
        <div style={{ marginTop: "96px", paddingTop: "48px", borderTop: "1px solid var(--bd)" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--steel)", marginBottom: "20px" }}>
            Next Case Study
          </div>
          <Link
            href={`/projects/${next.slug}`}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <div>
              <div style={{ fontSize: "11px", color: "var(--steel)", marginBottom: "6px" }}>{next.category}</div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(28px,4vw,52px)",
                  lineHeight: 1.1,
                  color: "var(--cream)",
                  transition: "color .25s",
                }}
                className="next-proj-title"
              >
                {next.title}
              </div>
            </div>
            <div style={{
              width: "52px", height: "52px", borderRadius: "50%",
              border: "1px solid var(--dim)", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--steel)", transition: "border-color .25s, color .25s",
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
