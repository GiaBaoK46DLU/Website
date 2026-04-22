import Link from "next/link";

export default function BlogNotFound() {
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold mb-4">Bai viet khong ton tai</h2>
      <p className="text-gray-600 mb-6">
        Bai viet ban tim kiem khong ton tai hoac da bi xoa.
      </p>
      <Link href="/blog" className="text-blue-600 hover:underline">
        ← Quay lai danh sach bai viet
      </Link>
    </div>
  );
}
