"use client";

import { useActionState } from "react";
import { createGuestbookEntry, ActionState } from "@/app/guestbook/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SubmitButton from "@/components/submit-button";

const initialState: ActionState = {
  success: false,
};

export default function GuestbookForm() {
  const [state, formAction] = useActionState(
    createGuestbookEntry,
    initialState,
  );

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Viet loi nhan</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ten cua ban</Label>
            <Input
              id="name"
              name="name"
              placeholder="Nhap ten cua ban"
              required
            />
            {state.errors?.name && (
              <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Loi nhan</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Viet loi nhan cua ban..."
              required
              rows={3}
            />
            {state.errors?.message && (
              <p className="text-red-500 text-sm">{state.errors.message[0]}</p>
            )}
          </div>

          <SubmitButton idleText="Gui loi nhan" pendingText="Dang gui..." />

          {state.errors?.general && (
            <p className="text-red-500 text-sm">{state.errors.general[0]}</p>
          )}

          {state.success && (
            <p className="text-green-600 text-sm">Gui loi nhan thanh cong!</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
