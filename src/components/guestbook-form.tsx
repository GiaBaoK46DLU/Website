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
    <Card className="mb-8 border-cyan-300/25 bg-slate-950/60">
      <CardHeader>
        <CardTitle className="text-slate-100">Viet loi nhan</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-200">
              Ten cua ban
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Nhap ten cua ban"
              required
              className="border-cyan-300/30 bg-slate-900/60 text-slate-100"
            />
            {state.errors?.name && (
              <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-slate-200">
              Loi nhan
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Viet loi nhan cua ban..."
              required
              rows={3}
              className="border-fuchsia-300/30 bg-slate-900/60 text-slate-100"
            />
            {state.errors?.message && (
              <p className="text-red-500 text-sm">{state.errors.message[0]}</p>
            )}
          </div>

          <SubmitButton
            className="border border-cyan-300/45 bg-cyan-300/15 text-cyan-100 hover:bg-cyan-300/25"
            idleText="Gui loi nhan"
            pendingText="Dang gui..."
          />

          {state.errors?.general && (
            <p className="text-red-500 text-sm">{state.errors.general[0]}</p>
          )}

          {state.success && (
            <p className="text-green-300 text-sm">Gui loi nhan thanh cong!</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
