import Link from "next/link";
import Reveal from "@/components/ui/reveal";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 pb-4">
      <Reveal>
        <section className="surface-panel relative overflow-hidden p-8 md:p-12">
          <div className="pointer-events-none absolute -top-16 right-0 h-56 w-56 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-16 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />

          <p className="mb-4 text-xs font-semibold tracking-[0.24em] text-cyan-200/85">
            FRONTEND DEVELOPER // ANIME CYBER INTERFACE
          </p>

          <h1 className="text-balance text-4xl font-bold leading-tight md:text-6xl">
            Xin chao, toi la{" "}
            <span className="neon-title">Dinh Lam Gia Bao</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base text-slate-300/85 md:text-lg">
            Xay dung website hien dai voi Next.js, toi uu trai nghiem nguoi dung
            va tao ra giao dien mang chat rieng: gon, muot, de scan.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="neon-button bg-cyan-300/90 text-slate-950"
            >
              Xem du an
            </Link>
            <Link
              href="/contact"
              className="neon-button border border-fuchsia-300/50 bg-fuchsia-300/10 text-fuchsia-100"
            >
              Lien he ngay
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="surface-panel p-6 md:p-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-100">
              Skill Matrix
            </h2>
            <Link
              href="/skills"
              className="text-sm text-cyan-200 hover:text-fuchsia-200"
            >
              Xem chi tiet
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "JavaScript",
              "TypeScript",
              "React",
              "Next.js",
              "Tailwind CSS",
              "Node.js",
              "Git/GitHub",
              "SQL",
            ].map((skill, index) => (
              <div
                key={skill}
                className="rounded-xl border border-cyan-300/20 bg-slate-950/55 px-4 py-3 text-center text-sm font-medium text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-300/55 hover:shadow-[0_0_28px_-12px_rgba(217,70,239,0.8)]"
                style={{ transitionDelay: `${index * 45}ms` }}
              >
                {skill}
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.2}>
        <section className="surface-panel p-6 text-center md:p-8">
          <h2 className="text-2xl font-semibold text-slate-100">
            Blog Engineering Notes
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300/80">
            Chia se kinh nghiem hoc tap, ky thuat frontend va cach toi xay dung
            giao dien dep ma van de maintain.
          </p>
          <Link
            href="/blog"
            className="mt-5 inline-block text-sm font-semibold text-cyan-200 hover:text-fuchsia-200"
          >
            Kham pha bai viet {"->"}
          </Link>
        </section>
      </Reveal>
    </div>
  );
}
