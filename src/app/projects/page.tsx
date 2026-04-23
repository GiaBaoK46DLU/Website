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
    description: "Website cá nhân xây dựng bằng Next.JS và Tailwind CSS",
    tech: ["Next.JS", "Tailwind CSS", "TypeScript"],
    status: "Đang phát triển",
  },
  {
    title: "Ứng dụng Quản lý Công việc",
    description: "Ứng dụng Todo App với React và Local Storage",
    tech: ["React", "CSS Modules", "JavaScript"],
    status: "Hoàn thành",
  },
  {
    title: "API RESTful",
    description: "API quản lý sản phẩm với Node.js và Express",
    tech: ["Node.js", "Express", "MongoDB"],
    status: "Hoàn thành",
  },
  {
    title: "Chat Realtime",
    description: "Ứng dụng chat realtime với Socket.IO",
    tech: ["React", "Socket.IO", "Node.js"],
    status: "Đang phát triển",
  },
];
export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <Reveal>
        <div className="surface-panel mb-6 p-6 md:p-8">
          <h1 className="text-3xl font-bold text-slate-100 md:text-4xl">
            Du an <span className="neon-title">thuc chien</span>
          </h1>
          <p className="mt-2 text-slate-300/80">
            Mot so san pham tieu bieu toi da va dang phat trien.
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
