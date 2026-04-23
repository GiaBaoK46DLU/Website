import Reveal from "@/components/ui/reveal";

const skillGroups = [
  {
    title: "Phát triển giao diện",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    title: "Kỹ thuật UI",
    items: [
      "Tailwind CSS",
      "Responsive Design",
      "Component Architecture",
      "Animation",
    ],
  },
  {
    title: "Nền tảng backend",
    items: ["Node.js", "REST API", "SQL", "PostgreSQL"],
  },
  {
    title: "Quy trình làm việc",
    items: ["Git", "GitHub", "Deployment", "Code Review"],
  },
];

export default function SkillsPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <Reveal>
        <section className="surface-panel p-6 md:p-8">
          <h1 className="text-3xl font-bold text-slate-100 md:text-4xl">
            Hệ <span className="neon-title">kỹ năng</span>
          </h1>
          <p className="mt-2 text-slate-300/80">
            Tập hợp các kỹ năng theo nhóm để dễ dàng quét nhanh khi xem
            portfolio.
          </p>
        </section>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((group, idx) => (
          <Reveal key={group.title} delay={idx * 0.08}>
            <section className="surface-panel h-full p-6">
              <h2 className="text-lg font-semibold text-cyan-200">
                {group.title}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-cyan-300/30 bg-slate-950/55 px-3 py-1 text-xs text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/55 hover:text-fuchsia-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
