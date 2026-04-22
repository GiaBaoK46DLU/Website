import { NextRequest, NextResponse } from "next/server";
import { guestbookEntries } from "@/data/guestbook";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  const index = guestbookEntries.findIndex((entry) => entry.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: "Khong tim thay loi nhan" },
      { status: 404 },
    );
  }

  const deleted = guestbookEntries.splice(index, 1)[0];

  return NextResponse.json(deleted);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();

  const name = String(body.name ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (name.length < 2 || name.length > 50) {
    return NextResponse.json(
      { error: "Ten phai tu 2 den 50 ky tu" },
      { status: 400 },
    );
  }

  if (message.length < 1 || message.length > 500) {
    return NextResponse.json(
      { error: "Loi nhan phai tu 1 den 500 ky tu" },
      { status: 400 },
    );
  }

  const entry = guestbookEntries.find((item) => item.id === id);
  if (!entry) {
    return NextResponse.json(
      { error: "Khong tim thay loi nhan" },
      { status: 404 },
    );
  }

  entry.name = name;
  entry.message = message;

  return NextResponse.json(entry);
}
