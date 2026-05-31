import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import ScrollReveal from "@/components/ScrollReveal";

export default function WorkTeaser() {
  const featured = projects.slice(0, 2);

  return (
    <section className="px-6 md:px-16 py-24 border-t border-dim">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-steel" />
              <span className="text-xs font-display tracking-widest uppercase text-steel">Selected Work</span>
            </div>
            <h2 className="font-serif text-4xl text-cream">A few things I&rsquo;m proud of</h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:inline-flex items-center gap-2 text-sm text-steel hover:text-cream transition-colors duration-200 font-sans"
          >
            All projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {featured.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i === 0 ? "d1" : "d2"}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="overflow-hidden rounded-sm bg-lift aspect-[4/3] relative">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-300" />
                </div>
                <div className="mt-4">
                  <span className="text-xs font-display tracking-widest uppercase text-steel">{project.category}</span>
                  <h3 className="font-serif text-2xl text-cream mt-1 mb-2 group-hover:text-coral transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-sm text-steel font-sans">{project.tagline}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center md:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-steel hover:text-cream transition-colors duration-200 font-sans"
          >
            View all projects →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
