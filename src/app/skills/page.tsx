export default function SkillsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Kỹ năng chuyên môn
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Các box kỹ năng */}
        <div className="p-4 border rounded-lg shadow-sm text-center font-semibold bg-white">
          HTML & CSS
        </div>
        <div className="p-4 border rounded-lg shadow-sm text-center font-semibold bg-white">
          JavaScript / TypeScript
        </div>
        <div className="p-4 border rounded-lg shadow-sm text-center font-semibold bg-white">
          React & Next.js
        </div>
        <div className="p-4 border rounded-lg shadow-sm text-center font-semibold bg-white">
          Tailwind CSS
        </div>
        <div className="p-4 border rounded-lg shadow-sm text-center font-semibold bg-white">
          Git & GitHub
        </div>
      </div>
    </div>
  );
}
