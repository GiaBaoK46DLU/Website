"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/skills", label: "Kỹ năng" },
  { href: "/projects", label: "Dự án" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Liên hệ" },
  { href: "/guestbook", label: "Lưu bút" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-40 mb-4">
      <div className="surface-panel mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="neon-title text-lg font-bold tracking-wider"
          >
            GBAO//PORTFOLIO
          </Link>

          <button
            className="rounded-lg border border-fuchsia-400/40 px-3 py-1.5 text-sm text-cyan-200 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Mở menu điều hướng"
          >
            Menu
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm transition-all ${
                  isActive(item.href)
                    ? "bg-cyan-300/15 text-cyan-100 shadow-[0_0_18px_-10px_rgba(34,211,238,0.9)]"
                    : "text-slate-200/90 hover:bg-fuchsia-400/10 hover:text-cyan-200"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {open && (
          <div className="mt-3 grid gap-1 rounded-lg border border-cyan-300/20 bg-slate-950/70 p-2 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm ${
                  isActive(item.href)
                    ? "bg-cyan-300/15 text-cyan-100"
                    : "text-slate-200 hover:bg-fuchsia-400/10"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/guestbook-client"
              className="rounded-md px-3 py-2 text-sm text-cyan-200 hover:bg-cyan-300/10"
              onClick={() => setOpen(false)}
            >
              Lưu bút SWR
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
