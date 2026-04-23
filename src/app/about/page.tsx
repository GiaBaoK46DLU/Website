import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Reveal from "@/components/ui/reveal";

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <Reveal>
        <section className="surface-panel p-6 md:p-8">
          <div className="flex items-center gap-4">
            <Avatar size="lg" className="ring-2 ring-cyan-300/50">
              <AvatarFallback>GB</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-slate-100">Gioi thieu</h1>
              <p className="text-sm text-cyan-200/85">
                Sinh vien CNTT - Dai hoc Da Lat
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-3xl leading-relaxed text-slate-300/90">
            Xin chao! Toi la{" "}
            <strong className="text-fuchsia-200">Dinh Lam Gia Bao</strong>, sinh
            vien nam 4 nganh Cong nghe Thong tin. Toi tap trung vao frontend
            engineering, animation UI va cai thien UX de website vua dep vua de
            su dung.
          </p>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="grid gap-4 md:grid-cols-2">
          <article className="surface-panel p-6">
            <h2 className="text-xl font-semibold text-slate-100">Tech Stack</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300/90">
              <li>JavaScript / TypeScript</li>
              <li>React / Next.js</li>
              <li>Tailwind CSS / UI systems</li>
              <li>Git / GitHub / CI workflow</li>
              <li>SQL / PostgreSQL</li>
            </ul>
          </article>

          <article className="surface-panel p-6">
            <h2 className="text-xl font-semibold text-slate-100">Hoc van</h2>
            <div className="mt-4 rounded-lg border border-fuchsia-300/25 bg-slate-950/50 p-4">
              <p className="font-medium text-slate-100">Dai hoc Da Lat</p>
              <p className="mt-1 text-sm text-slate-300/80">
                Cu nhan Cong nghe Thong tin (2022-2026)
              </p>
            </div>
          </article>
        </section>
      </Reveal>
    </div>
  );
}
