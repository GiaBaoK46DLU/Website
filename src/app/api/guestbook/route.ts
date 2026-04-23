import { NextRequest, NextResponse } from "next/server";
import { guestbookEntries } from "@/data/guestbook";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get("limit");

  if (!limitParam) {
    return NextResponse.json(guestbookEntries);
  }

  const limit = Number(limitParam);
  if (!Number.isInteger(limit) || limit <= 0) {
    return NextResponse.json(
      { error: "limit phải là số nguyên dương" },
      { status: 400 },
    );
  }

  return NextResponse.json(guestbookEntries.slice(0, limit));
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const name = String(body.name ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (name.length < 2 || name.length > 50) {
    return NextResponse.json(
      { error: "Tên phải từ 2 đến 50 ký tự" },
      { status: 400 },
    );
  }

  if (message.length < 1 || message.length > 500) {
    return NextResponse.json(
      { error: "Lời nhắn phải từ 1 đến 500 ký tự" },
      { status: 400 },
    );
  }

  const newEntry = {
    id: Date.now().toString(),
    name,
    message,
    createdAt: new Date().toISOString(),
  };

  guestbookEntries.unshift(newEntry);

  return NextResponse.json(newEntry, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const id = String(body.id ?? "").trim();
  const name = String(body.name ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!id) {
    return NextResponse.json({ error: "id là bắt buộc" }, { status: 400 });
  }
  if (name.length < 2 || name.length > 50) {
    return NextResponse.json(
      { error: "Tên phải từ 2 đến 50 ký tự" },
      { status: 400 },
    );
  }
  if (message.length < 1 || message.length > 500) {
    return NextResponse.json(
      { error: "Lời nhắn phải từ 1 đến 500 ký tự" },
      { status: 400 },
    );
  }

  const entry = guestbookEntries.find((item) => item.id === id);
  if (!entry) {
    return NextResponse.json(
      { error: "Không tìm thấy lời nhắn" },
      { status: 404 },
    );
  }

  entry.name = name;
  entry.message = message;

  return NextResponse.json(entry);
}
