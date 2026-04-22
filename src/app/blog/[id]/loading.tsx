export default function PostLoading() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-8" />

      <article>
        <div className="h-10 bg-gray-200 rounded animate-pulse mb-8 w-full" />
        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mb-6" />

        <div className="space-y-4">
          <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
          <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
          <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
        </div>
      </article>
    </div>
  );
}
