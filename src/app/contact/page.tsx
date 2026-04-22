"use client";

import { useActionState, useEffect, useState } from "react";
import { sendContactMessage, ContactFormState } from "./actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";

const initialState: ContactFormState = {
  success: false,
};

function ContactForm({
  onSuccess,
}: {
  onSuccess: (message: string | undefined) => void;
}) {
  const [state, formAction] = useActionState(sendContactMessage, initialState);

  useEffect(() => {
    if (state.success) {
      onSuccess(state.message);
    }
  }, [state.success, state.message, onSuccess]);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="name" className="mb-1">
          Ho va ten
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Nguyen Van A"
          required
        />
        {state.errors?.name && (
          <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="mb-1">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="email@example.com"
          required
        />
        {state.errors?.email && (
          <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <Label htmlFor="subject" className="mb-1">
          Tieu de
        </Label>
        <Input
          id="subject"
          name="subject"
          type="text"
          placeholder="Chu de ban muon trao doi"
          required
        />
        {state.errors?.subject && (
          <p className="text-red-500 text-sm mt-1">{state.errors.subject[0]}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message" className="mb-1">
          Noi dung
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Viet noi dung tin nhan..."
          required
          rows={5}
        />
        {state.errors?.message && (
          <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>
        )}
      </div>

      <SubmitButton
        className="w-full"
        idleText="Gui tin nhan"
        pendingText="Dang gui..."
      />
    </form>
  );
}

export default function ContactPage() {
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const [formKey, setFormKey] = useState(0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Liên hệ</h1>
      <p className="text-gray-500 mb-8">
        Bạn có câu hỏi hoặc muốn hợp tác? Hãy gửi tin nhắn cho tôi!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-1">Email</h3>
            <a
              href="mailto:2212343@dlu.edu.vn"
              className="text-blue-600 hover:underline text-sm"
            >
              2212343@dlu.edu.vn
            </a>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-1">GitHub</h3>
            <a
              href="https://github.com/GiaBaoK46DLU"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              github.com/GiaBaoK46DLU
            </a>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-1">Địa chỉ</h3>
            <p className="text-sm text-gray-600">
              Đại học Đà Lạt, 01 Phù Đổng Thiên Vương, Đà Lạt
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          {successMessage ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">
                  Gui thanh cong!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-green-700 text-sm">{successMessage}</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSuccessMessage(undefined);
                    setFormKey((prev) => prev + 1);
                  }}
                >
                  Gui tin nhan khac
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Gui lien he</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm key={formKey} onSuccess={setSuccessMessage} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
