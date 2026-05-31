import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
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
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-display tracking-widest uppercase text-steel">{project.category}</span>
          <span className="text-xs text-dim font-sans">{project.year}</span>
        </div>
        <h3 className="font-serif text-2xl text-cream mb-2 group-hover:text-coral transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-sm text-steel leading-relaxed font-sans">{project.tagline}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 rounded-full border border-dim text-steel font-sans">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
