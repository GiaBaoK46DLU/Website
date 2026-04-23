"use client";

import { useState } from "react";
import useSWR from "swr";
import { GuestbookEntry } from "@/data/guestbook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/ui/reveal";

const PAGE_SIZE = 5;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GuestbookClientPage() {
  const { data, error, isLoading, mutate } = useSWR<GuestbookEntry[]>(
    "/api/guestbook",
    fetcher,
  );

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const entries = data ?? [];
  const totalPages = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const visibleEntries = entries.slice(start, start + PAGE_SIZE);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    const res = await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), message: message.trim() }),
    });
    setSubmitting(false);

    if (!res.ok) {
      alert("Không thể gửi lời nhắn");
      return;
    }

    setName("");
    setMessage("");
    await mutate();
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    const res = await fetch(`/api/guestbook/${id}`, { method: "DELETE" });
    setDeletingId(null);

    if (!res.ok) {
      alert("Không thể xóa lời nhắn");
      return;
    }

    await mutate();
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <Reveal>
        <div className="surface-panel mb-6 p-6 md:p-8">
          <h1 className="text-3xl font-bold text-slate-100 md:text-4xl">
            Sổ lưu bút <span className="neon-title">SWR Live</span>
          </h1>
          <p className="mt-2 text-slate-300/80">
            Phiên bản client-side fetch với useSWR, cập nhật dữ liệu linh hoạt.
          </p>
        </div>
      </Reveal>

      <Card className="mb-8 border-cyan-300/25 bg-slate-950/60">
        <CardHeader>
          <CardTitle className="text-slate-100">Viết lời nhắn</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-cyan-300/30 bg-slate-900/60 px-3 py-2 text-slate-100"
              placeholder="Tên"
              required
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-lg border border-fuchsia-300/30 bg-slate-900/60 px-3 py-2 text-slate-100"
              placeholder="Lời nhắn"
              rows={3}
              required
            />
            <Button
              type="submit"
              disabled={submitting}
              className="border border-cyan-300/45 bg-cyan-300/15 text-cyan-100 hover:bg-cyan-300/25"
            >
              {submitting ? "Đang gửi..." : "Gửi lời nhắn"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && <p className="text-slate-400">Đang tải...</p>}
      {error && (
        <p className="text-red-500">Không thể tải dữ liệu sổ lưu bút</p>
      )}

      {!isLoading && !error && (
        <div className="space-y-4">
          {visibleEntries.map((entry) => (
            <Card
              key={entry.id}
              className="border-cyan-300/20 bg-slate-950/55 transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/45 hover:shadow-[0_0_28px_-16px_rgba(217,70,239,0.95)]"
            >
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-slate-100">{entry.name}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(entry.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={deletingId === entry.id}
                    onClick={() => handleDelete(entry.id)}
                    className="bg-rose-500/20 text-rose-200 hover:bg-rose-500/30"
                  >
                    {deletingId === entry.id ? "Đang xóa..." : "Xóa"}
                  </Button>
                </div>
                <p className="text-slate-300/85">{entry.message}</p>
              </CardContent>
            </Card>
          ))}

          {entries.length > PAGE_SIZE && (
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
              >
                Trang trước
              </Button>
              <span className="text-xs text-slate-400">
                Trang {safePage}/{totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="border-fuchsia-300/40 bg-fuchsia-300/10 text-fuchsia-100"
              >
                Trang sau
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
