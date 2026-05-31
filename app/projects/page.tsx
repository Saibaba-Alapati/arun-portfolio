import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Work — Arun",
  description: "Brand strategy and storytelling projects across FMCG, lifestyle, architecture, and fashion.",
};

export default function ProjectsPage() {
  return (
    <section style={{ minHeight: "100vh", padding: "120px 0", background: "var(--ink)" }}>
      <div className="wrap">
        {/* Header */}
        <div style={{ marginBottom: "72px", paddingTop: "20px" }}>
          <div className="stag">Work</div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(36px,5.2vw,72px)",
              lineHeight: 0.96,
              letterSpacing: "-.025em",
              marginBottom: "24px",
            }}
          >
            Case Studies
          </h1>
          <p style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--steel)", maxWidth: "480px" }}>
            Brand strategy, content systems, and storytelling campaigns for brands that want
            to mean something.
          </p>
        </div>

        {/* 2-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px 40px" }}>
          {projects.map((project, i) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="pcard">
              <div className="pcard-thumb" style={{ aspectRatio: "4/3", position: "relative" }}>
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 940px) 100vw, 50vw"
                  priority={i < 2}
                />
                <div className="pcard-over" />
              </div>
              <div className="pcard-meta">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <div className="pcard-cat">{project.category}</div>
                  <span style={{ fontSize: "11px", color: "var(--dim)" }}>{project.year}</span>
                </div>
                <div className="pcard-title">{project.title}</div>
                <div className="pcard-line">{project.tagline}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "12px" }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "10px", padding: "4px 10px",
                        border: "1px solid var(--dim)", borderRadius: "100px",
                        color: "var(--steel)", fontFamily: "var(--font-display)", letterSpacing: ".06em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
