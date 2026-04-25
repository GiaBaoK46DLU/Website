import { NextRequest, NextResponse } from "next/server";
import {
  createGuestbookEntryData,
  GuestbookNotFoundError,
  listGuestbookEntries,
  updateGuestbookEntryData,
} from "@/lib/guestbook-repository";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get("limit");

  if (!limitParam) {
    const entries = await listGuestbookEntries();
    return NextResponse.json(entries);
  }

  const limit = Number(limitParam);
  if (!Number.isInteger(limit) || limit <= 0) {
    return NextResponse.json(
      { error: "limit phải là số nguyên dương" },
      { status: 400 },
    );
  }

  const entries = await listGuestbookEntries(limit);
  return NextResponse.json(entries);
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

  try {
    const newEntry = await createGuestbookEntryData({ name, message });
    return NextResponse.json(newEntry, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Không thể tạo lời nhắn" },
      { status: 500 },
    );
  }
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

  try {
    const entry = await updateGuestbookEntryData(id, { name, message });
    return NextResponse.json(entry);
  } catch (error) {
    if (error instanceof GuestbookNotFoundError) {
      return NextResponse.json(
        { error: "Không tìm thấy lời nhắn" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { error: "Không thể cập nhật lời nhắn" },
      { status: 500 },
    );
  }
}
