import { guestbookEntries } from "@/data/guestbook";
import GuestbookForm from "@/components/guestbook-form";
import DeleteButton from "@/components/delete-button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

interface GuestbookPageProps {
  searchParams: Promise<{ page?: string }>;
}

const PAGE_SIZE = 5;

export default async function GuestbookPage({
  searchParams,
}: GuestbookPageProps) {
  const params = await searchParams;
  const entries = guestbookEntries;
  const currentPage = Math.max(1, Number(params.page ?? "1") || 1);
  const totalPages = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const paginatedEntries = entries.slice(start, start + PAGE_SIZE);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">So luu but</h1>
      <p className="text-gray-500 mb-8">Hay de lai loi nhan cho toi nhe!</p>

      <GuestbookForm />

      <Separator className="my-8" />

      <div className="space-y-4">
        <p className="text-sm text-gray-400">{entries.length} loi nhan</p>

        {paginatedEntries.map((entry) => (
          <Card key={entry.id}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Avatar size="sm">
                    <AvatarFallback>
                      {entry.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-gray-800">
                    {entry.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">
                    {new Date(entry.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                  <DeleteButton id={entry.id} />
                </div>
              </div>
              <p className="text-gray-600">{entry.message}</p>
            </CardContent>
          </Card>
        ))}

        {entries.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            Chua co loi nhan nao. Hay la nguoi dau tien!
          </p>
        )}

        {entries.length > PAGE_SIZE && (
          <div className="flex items-center justify-between pt-2">
            <Link
              href={`/guestbook?page=${Math.max(1, safePage - 1)}`}
              className={`text-sm ${safePage === 1 ? "pointer-events-none opacity-40" : "text-blue-600 hover:underline"}`}
            >
              Trang truoc
            </Link>
            <span className="text-xs text-gray-500">
              Trang {safePage}/{totalPages}
            </span>
            <Link
              href={`/guestbook?page=${Math.min(totalPages, safePage + 1)}`}
              className={`text-sm ${safePage === totalPages ? "pointer-events-none opacity-40" : "text-blue-600 hover:underline"}`}
            >
              Trang sau
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
