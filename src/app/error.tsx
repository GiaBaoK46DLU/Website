"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log lỗi ra console để Gia Bảo dễ dàng debug trong quá trình phát triển
    console.error("Hệ thống ghi nhận lỗi:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-red-50 p-8 rounded-2xl shadow-sm border border-red-100 max-w-md">
        <div className="text-red-500 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Rất tiếc, đã có lỗi xảy ra!
        </h2>

        <p className="text-gray-600 mb-6">
          Hệ thống đang gặp sự cố ngoài ý muốn. Gia Bảo đang nỗ lực để khắc phục
          tình trạng này.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Thử tải lại trang
          </button>

          <Link
            href="/"
            className="w-full bg-white text-gray-700 font-semibold py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-400">
        Mã số sinh viên: 2212343 | Đinh Lâm Gia Bảo
      </p>
    </div>
  );
}
