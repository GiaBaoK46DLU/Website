import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Reveal from "@/components/ui/reveal";

const projects = [
  {
    title: "Website Portfolio",
    description:
      "Website portfolio cá nhân hiện đại với giao diện neon dark và animation mượt",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "Đang phát triển",
  },
  {
    title: "eParking quản lý bãi xe thông minh bằng AI",
    description: "Hệ thống eParking hỗ trợ quản lý bãi xe thông minh bằng AI",
    tech: ["AI", "Computer Vision", "Web"],
    status: "Hoàn thành",
  },
  {
    title:
      "Ứng dụng chỉ đường trong thư viện trường ĐHĐL bằng cách định vị trong nhà",
    description:
      "Ứng dụng hỗ trợ chỉ đường trong thư viện bằng công nghệ định vị trong nhà",
    tech: ["Indoor Positioning", "Mobile App", "Navigation"],
    status: "Hoàn thành",
  },
  {
    title: "Ứng dụng theo dõi mã chứng khoán bằng Python",
    description:
      "Ứng dụng theo dõi biến động mã chứng khoán và hiển thị dữ liệu trực quan",
    tech: ["Python", "Data Analysis", "Visualization"],
    status: "Hoàn thành",
  },
  {
    title: "Ứng dụng desktop quản lý sách",
    description:
      "Phần mềm desktop hỗ trợ quản lý sách và nghiệp vụ thư viện cơ bản",
    tech: ["Desktop App", "Database", "Management System"],
    status: "Hoàn thành",
  },
  {
    title: "Ứng dụng chẩn đoán bệnh về mắt bằng Java",
    description:
      "Ứng dụng hỗ trợ chẩn đoán bệnh về mắt được xây dựng bằng Java",
    tech: ["Java", "Medical Support", "Rule-based"],
    status: "Hoàn thành",
  },
];
export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <Reveal>
        <div className="surface-panel mb-6 p-6 md:p-8">
          <h1 className="text-3xl font-bold text-slate-100 md:text-4xl">
            Dự án <span className="neon-title">thực chiến</span>
          </h1>
          <p className="mt-2 text-slate-300/80">
            Một số sản phẩm tiêu biểu tôi đã và đang phát triển.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.08}>
            <Card className="h-full border-cyan-300/20 bg-slate-950/60 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-300/50 hover:shadow-[0_0_30px_-12px_rgba(217,70,239,0.8)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-slate-100">
                    {project.title}
                  </CardTitle>
                  <Badge
                    variant={
                      project.status === "Hoàn thành" ? "default" : "secondary"
                    }
                    className="border-cyan-300/35"
                  >
                    {project.status}
                  </Badge>
                </div>
                <CardDescription className="text-slate-300/80">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="border-fuchsia-300/35 text-fuchsia-100/95"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
