import { NextRequest, NextResponse } from "next/server";
import {
  deleteGuestbookEntryData,
  GuestbookNotFoundError,
  updateGuestbookEntryData,
} from "@/lib/guestbook-repository";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  try {
    const deleted = await deleteGuestbookEntryData(id);
    return NextResponse.json(deleted);
  } catch (error) {
    if (error instanceof GuestbookNotFoundError) {
      return NextResponse.json(
        { error: "Không tìm thấy lời nhắn" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { error: "Không thể xóa lời nhắn" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
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
