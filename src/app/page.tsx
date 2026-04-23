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
            LẬP TRÌNH FRONTEND // GIAO DIỆN ANIME CYBER
          </p>

          <h1 className="text-balance text-4xl font-bold leading-tight md:text-6xl">
            Xin chào, tôi là{" "}
            <span className="neon-title">Đinh Lâm Gia Bảo</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base text-slate-300/85 md:text-lg">
            Xây dựng website hiện đại với Next.js, tối ưu trải nghiệm người dùng
            và tạo ra giao diện mang chất riêng: gọn, mượt, dễ quan sát.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="neon-button bg-cyan-300/90 text-slate-950"
            >
              Xem dự án
            </Link>
            <Link
              href="/contact"
              className="neon-button border border-fuchsia-300/50 bg-fuchsia-300/10 text-fuchsia-100"
            >
              Liên hệ ngay
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="surface-panel p-6 md:p-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-100">
              Ma trận kỹ năng
            </h2>
            <Link
              href="/skills"
              className="text-sm text-cyan-200 hover:text-fuchsia-200"
            >
              Xem chi tiết
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
            Ghi chú kỹ thuật blog
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300/80">
            Chia sẻ kinh nghiệm học tập, kỹ thuật frontend và cách tôi xây dựng
            giao diện đẹp mà vẫn dễ bảo trì.
          </p>
          <Link
            href="/blog"
            className="mt-5 inline-block text-sm font-semibold text-cyan-200 hover:text-fuchsia-200"
          >
            Khám phá bài viết {"->"}
          </Link>
        </section>
      </Reveal>
    </div>
  );
}
