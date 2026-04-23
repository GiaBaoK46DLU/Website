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
              <h1 className="text-3xl font-bold text-slate-100">Giới thiệu</h1>
              <p className="text-sm text-cyan-200/85">
                Sinh viên khoa Công Nghệ Thông Tin - Đại học Đà Lạt
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-3xl leading-relaxed text-slate-300/90">
            Xin chào! Tôi là{" "}
            <strong className="text-fuchsia-200">Đinh Lâm Gia Bảo</strong>, sinh
            viên năm 4 ngành Công Nghệ Thông Tin. Tôi tập trung vào phát triển
            frontend, hoạt ảnh giao diện và cải thiện UX để website vừa đẹp vừa
            dễ sử dụng.
          </p>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="grid gap-4 md:grid-cols-2">
          <article className="surface-panel p-6">
            <h2 className="text-xl font-semibold text-slate-100">
              Công nghệ sử dụng
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300/90">
              <li>JavaScript / TypeScript</li>
              <li>React / Next.js</li>
              <li>Tailwind CSS / UI systems</li>
              <li>Git / GitHub / CI workflow</li>
              <li>SQL / PostgreSQL</li>
            </ul>
          </article>

          <article className="surface-panel p-6">
            <h2 className="text-xl font-semibold text-slate-100">Học vấn</h2>
            <div className="mt-4 rounded-lg border border-fuchsia-300/25 bg-slate-950/50 p-4">
              <p className="font-medium text-slate-100">Đại học Đà Lạt</p>
              <p className="mt-1 text-sm text-slate-300/80">
                Cử nhân Công Nghệ Thông Tin (2022-2026)
              </p>
            </div>
          </article>
        </section>
      </Reveal>

      <Reveal delay={0.18}>
        <section className="surface-panel p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-100 md:text-2xl">
            Thành tích học thuật
          </h2>

          <div className="mt-4 grid gap-3">
            <article className="rounded-xl border border-cyan-300/25 bg-slate-950/55 p-4 transition-all duration-300 hover:border-cyan-200/55 hover:shadow-[0_0_26px_-14px_rgba(34,211,238,0.95)]">
              <p className="text-sm font-semibold text-cyan-100">Năm 2024</p>
              <p className="mt-1 text-sm text-slate-300/90">
                Nghiên cứu khoa học sinh viên đạt thành tích Giỏi.
              </p>
            </article>

            <article className="rounded-xl border border-fuchsia-300/25 bg-slate-950/55 p-4 transition-all duration-300 hover:border-fuchsia-200/60 hover:shadow-[0_0_26px_-14px_rgba(232,121,249,0.95)]">
              <p className="text-sm font-semibold text-fuchsia-100">Năm 2025</p>
              <p className="mt-1 text-sm text-slate-300/90">
                Nghiên cứu khoa học sinh viên đạt thành tích Xuất sắc.
              </p>
            </article>

            <article className="rounded-xl border border-cyan-300/25 bg-slate-950/55 p-4 transition-all duration-300 hover:border-cyan-200/55 hover:shadow-[0_0_26px_-14px_rgba(34,211,238,0.95)]">
              <p className="text-sm font-semibold text-cyan-100">ICT 2025</p>
              <p className="mt-1 text-sm text-slate-300/90">
                Đồng tác giả 1 bài báo khoa học được đăng tại hội thảo ICT 2025.
              </p>
            </article>

            <article className="rounded-xl border border-fuchsia-300/25 bg-slate-950/55 p-4 transition-all duration-300 hover:border-fuchsia-200/60 hover:shadow-[0_0_26px_-14px_rgba(232,121,249,0.95)]">
              <p className="text-sm font-semibold text-fuchsia-100">ICT 2025</p>
              <p className="mt-1 text-sm text-slate-300/90">
                Tác giả 1 bài báo khoa học được đăng tại hội thảo ICT 2025.
              </p>
            </article>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
