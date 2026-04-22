import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="text-center space-y-6 relative">
        {/* Ánh sáng nền phía sau (Hiệu ứng chớp nháy nhẹ) */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-72 h-72 bg-blue-300 rounded-full blur-[80px] opacity-40 animate-pulse"></div>
        </div>

        {/* Cụm hình ảnh hoạt hình SVG */}
        <div className="flex justify-center mb-8 relative">
          <div className="relative animate-bounce">
            {/* Khuôn mặt bối rối */}
            <svg
              className="w-40 h-40 text-blue-600 drop-shadow-2xl"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {/* Ký hiệu ngôi sao bay lơ lửng */}
            <div className="absolute -top-2 -right-4 w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-2xl animate-spin shadow-lg">
              ✨
            </div>
          </div>
        </div>

        {/* Số 404 hiển thị dạng màu Gradient */}
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 drop-shadow-sm">
          404
        </h1>

        <h2 className="text-3xl font-bold text-gray-800">
          Trang web đi lạc rồi!
        </h2>

        <p className="text-gray-500 max-w-md mx-auto text-lg leading-relaxed">
          Đường dẫn này không tồn tại hoặc đã bị Gia Bảo dọn dẹp đi nơi khác mất
          rồi. Chúng ta quay về thôi nhé!
        </p>

        {/* Nút bấm có hiệu ứng phình to khi di chuột vào (hover) */}
        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:scale-110 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Đưa tôi về trang chủ
          </Link>
        </div>

        {/* Chữ ký cá nhân để nộp báo cáo */}
        <div className="mt-12 text-sm text-gray-400 font-medium tracking-wide">
          © 2026 Đinh Lâm Gia Bảo - 2212343
        </div>
      </div>
    </div>
  );
}
