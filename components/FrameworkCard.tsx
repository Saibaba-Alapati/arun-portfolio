type Props = {
  problem: string;
  insight: string;
  idea: string;
  shift: string;
};

export default function FrameworkCard({ problem, insight, idea, shift }: Props) {
  const cards = [
    { label: "The Problem", body: problem, accent: "border-steel" },
    { label: "The Insight", body: insight, accent: "border-coral" },
    { label: "The Idea", body: idea, accent: "border-amber" },
    { label: "The Shift", body: shift, accent: "border-cream" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`bg-lift border-t-2 ${c.accent} p-6 rounded-sm hover:bg-dim transition-colors duration-300 hoverable`}
        >
          <div className="text-xs font-display tracking-widest uppercase text-steel mb-3">{c.label}</div>
          <p className="text-sm text-cream leading-relaxed font-sans">{c.body}</p>
        </div>
      ))}
    </div>
  );
}
