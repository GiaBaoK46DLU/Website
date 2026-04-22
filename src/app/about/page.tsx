import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-6">
        <Avatar size="lg">
          <AvatarFallback>GB</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">Giới thiệu</h1>
          <p className="text-gray-500">Sinh viên CNTT - Dai hoc Da Lat</p>
        </div>
      </div>
      <div className="space-y-4 text-gray-700">
        <p>
          Xin chào! Tôi là <strong>Đinh Lâm Gia Bảo</strong>, sinh viên năm 4
          ngành Công nghệ Thông tin tại Đại học Đà Lạt.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Kỹ năng</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>JavaScript / TypeScript</li>
          <li>React & Next.JS</li>
          <li>Tailwind CSS</li>
          <li>Git & GitHub</li>
          <li>SQL & PostgreSQL</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Học vấn</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="font-medium">Đại học Đà Lạt</p>
          <p className="text-gray-500">
            Cử nhân Công nghệ Thông tin (2022-2026)
          </p>
        </div>
      </div>
    </div>
  );
}
