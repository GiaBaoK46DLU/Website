import { listGuestbookEntries } from "@/lib/guestbook-repository";
import GuestbookForm from "@/components/guestbook-form";
import DeleteButton from "@/components/delete-button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";

interface GuestbookPageProps {
  searchParams: Promise<{ page?: string }>;
}

const PAGE_SIZE = 5;

export default async function GuestbookPage({
  searchParams,
}: GuestbookPageProps) {
  const params = await searchParams;
  const entries = await listGuestbookEntries();
  const currentPage = Math.max(1, Number(params.page ?? "1") || 1);
  const totalPages = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const paginatedEntries = entries.slice(start, start + PAGE_SIZE);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <Reveal>
        <div className="surface-panel mb-6 p-6 md:p-8">
          <h1 className="text-3xl font-bold text-slate-100 md:text-4xl">
            Sổ lưu bút <span className="neon-title">Signal</span>
          </h1>
          <p className="mt-2 text-slate-300/80">
            Hãy để lại lời nhắn cho tôi nhé.
          </p>
        </div>
      </Reveal>

      <GuestbookForm />

      <Separator className="my-8 bg-cyan-300/20" />

      <div className="space-y-4">
        <p className="text-sm text-slate-400">{entries.length} lời nhắn</p>

        {paginatedEntries.map((entry) => (
          <Card
            key={entry.id}
            className="border-cyan-300/20 bg-slate-950/55 transition-all duration-300 hover:border-fuchsia-300/45 hover:shadow-[0_0_28px_-16px_rgba(217,70,239,0.95)]"
          >
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Avatar size="sm" className="ring-1 ring-cyan-300/45">
                    <AvatarFallback>
                      {entry.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-slate-100">
                    {entry.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">
                    {new Date(entry.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                  <DeleteButton id={entry.id} />
                </div>
              </div>
              <p className="text-slate-300/85">{entry.message}</p>
            </CardContent>
          </Card>
        ))}

        {entries.length === 0 && (
          <p className="py-8 text-center text-slate-400">
            Chưa có lời nhắn nào. Hãy là người đầu tiên!
          </p>
        )}

        {entries.length > PAGE_SIZE && (
          <div className="flex items-center justify-between pt-2">
            <Link
              href={`/guestbook?page=${Math.max(1, safePage - 1)}`}
              className={`text-sm ${safePage === 1 ? "pointer-events-none opacity-40" : "text-cyan-200 hover:text-cyan-100 hover:underline"}`}
            >
              Trang trước
            </Link>
            <span className="text-xs text-slate-400">
              Trang {safePage}/{totalPages}
            </span>
            <Link
              href={`/guestbook?page=${Math.min(totalPages, safePage + 1)}`}
              className={`text-sm ${safePage === totalPages ? "pointer-events-none opacity-40" : "text-fuchsia-200 hover:text-fuchsia-100 hover:underline"}`}
            >
              Trang sau
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
