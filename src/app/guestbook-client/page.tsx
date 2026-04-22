"use client";

import { useState } from "react";
import useSWR from "swr";
import { GuestbookEntry } from "@/data/guestbook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      alert("Khong the gui loi nhan");
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
      alert("Khong the xoa loi nhan");
      return;
    }

    await mutate();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">So luu but (SWR)</h1>
      <p className="text-gray-500 mb-8">
        Phien ban bai tap tu lam: client-side fetch voi useSWR.
      </p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Viet loi nhan</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Ten"
              required
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Loi nhan"
              rows={3}
              required
            />
            <Button type="submit" disabled={submitting}>
              {submitting ? "Dang gui..." : "Gui loi nhan"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && <p className="text-gray-500">Dang tai...</p>}
      {error && <p className="text-red-500">Khong the tai du lieu guestbook</p>}

      {!isLoading && !error && (
        <div className="space-y-4">
          {visibleEntries.map((entry) => (
            <Card key={entry.id}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">{entry.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(entry.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={deletingId === entry.id}
                    onClick={() => handleDelete(entry.id)}
                  >
                    {deletingId === entry.id ? "Dang xoa..." : "Xoa"}
                  </Button>
                </div>
                <p className="text-gray-700">{entry.message}</p>
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
              >
                Trang truoc
              </Button>
              <span className="text-xs text-gray-500">
                Trang {safePage}/{totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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
