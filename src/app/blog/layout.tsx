export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">{children}</div>
        <aside className="hidden lg:block">
          <div className="surface-panel sticky top-24 p-4">
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-cyan-200">
              Danh muc
            </h3>
            <ul className="space-y-2 text-sm text-slate-300/85">
              <li className="cursor-pointer rounded-md px-2 py-1 hover:bg-fuchsia-400/10 hover:text-fuchsia-100">
                Cong nghe
              </li>
              <li className="cursor-pointer rounded-md px-2 py-1 hover:bg-fuchsia-400/10 hover:text-fuchsia-100">
                Hoc tap
              </li>
              <li className="cursor-pointer rounded-md px-2 py-1 hover:bg-fuchsia-400/10 hover:text-fuchsia-100">
                Du an ca nhan
              </li>
              <li className="cursor-pointer rounded-md px-2 py-1 hover:bg-fuchsia-400/10 hover:text-fuchsia-100">
                Cuoc song
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
