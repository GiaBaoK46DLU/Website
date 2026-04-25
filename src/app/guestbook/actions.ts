"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createGuestbookEntryData,
  deleteGuestbookEntryData,
  findRecentDuplicateGuestbookEntry,
  GuestbookNotFoundError,
} from "@/lib/guestbook-repository";

const guestbookSchema = z.object({
  name: z
    .string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(50, "Tên không được quá 50 ký tự"),
  message: z
    .string()
    .min(1, "Lời nhắn không được để trống")
    .max(500, "Lời nhắn không được quá 500 ký tự"),
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

  const duplicate = await findRecentDuplicateGuestbookEntry({
    name: result.data.name,
    message: result.data.message,
    withinMs: 60_000,
  });

  if (duplicate) {
    return {
      success: false,
      errors: {
        general: ["Không thể gửi trùng lời nhắn trong vòng 1 phút"],
      },
    };
  }

  try {
    await createGuestbookEntryData({
      name: result.data.name,
      message: result.data.message,
    });
    revalidatePath("/guestbook");
    return { success: true };
  } catch {
    return {
      success: false,
      errors: {
        general: ["Không thể lưu lời nhắn. Vui lòng thử lại."],
      },
    };
  }
}

export async function deleteGuestbookEntry(id: string): Promise<ActionState> {
  try {
    await deleteGuestbookEntryData(id);
    revalidatePath("/guestbook");
    return { success: true };
  } catch (error) {
    if (error instanceof GuestbookNotFoundError) {
      return {
        success: false,
        errors: { message: ["Không tìm thấy lời nhắn"] },
      };
    }

    return {
      success: false,
      errors: { general: ["Không thể xóa lời nhắn. Vui lòng thử lại."] },
    };
  }
}
