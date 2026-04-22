"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { guestbookEntries } from "@/data/guestbook";

const guestbookSchema = z.object({
  name: z
    .string()
    .min(2, "Ten phai co it nhat 2 ky tu")
    .max(50, "Ten khong duoc qua 50 ky tu"),
  message: z
    .string()
    .min(1, "Loi nhan khong duoc de trong")
    .max(500, "Loi nhan khong duoc qua 500 ky tu"),
});

export interface ActionState {
  success: boolean;
  errors?: {
    name?: string[];
    message?: string[];
    general?: string[];
  };
}

export async function createGuestbookEntry(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const rawData = {
    name: (formData.get("name") as string) ?? "",
    message: (formData.get("message") as string) ?? "",
  };

  const result = guestbookSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const now = Date.now();
  const duplicate = guestbookEntries.find((entry) => {
    const sameName =
      entry.name.trim().toLowerCase() === result.data.name.trim().toLowerCase();
    const sameMessage =
      entry.message.trim().toLowerCase() ===
      result.data.message.trim().toLowerCase();
    const withinOneMinute = now - new Date(entry.createdAt).getTime() < 60_000;

    return sameName && sameMessage && withinOneMinute;
  });

  if (duplicate) {
    return {
      success: false,
      errors: {
        general: ["Khong the gui trung loi nhan trong vong 1 phut"],
      },
    };
  }

  const newEntry = {
    id: Date.now().toString(),
    name: result.data.name,
    message: result.data.message,
    createdAt: new Date().toISOString(),
  };

  guestbookEntries.unshift(newEntry);
  revalidatePath("/guestbook");

  return { success: true };
}

export async function deleteGuestbookEntry(id: string): Promise<ActionState> {
  const index = guestbookEntries.findIndex((entry) => entry.id === id);

  if (index === -1) {
    return {
      success: false,
      errors: { message: ["Khong tim thay loi nhan"] },
    };
  }

  guestbookEntries.splice(index, 1);
  revalidatePath("/guestbook");

  return { success: true };
}
