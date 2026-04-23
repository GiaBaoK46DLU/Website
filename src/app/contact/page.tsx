"use client";

import { useActionState, useEffect, useState } from "react";
import { sendContactMessage, ContactFormState } from "./actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/ui/reveal";

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
        <Label htmlFor="name" className="mb-1 text-slate-200">
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
        <Label htmlFor="email" className="mb-1 text-slate-200">
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
        <Label htmlFor="subject" className="mb-1 text-slate-200">
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
        <Label htmlFor="message" className="mb-1 text-slate-200">
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
    <div className="mx-auto w-full max-w-6xl">
      <Reveal>
        <div className="surface-panel mb-6 p-6 md:p-8">
          <h1 className="text-3xl font-bold text-slate-100 md:text-4xl">
            Contact <span className="neon-title">Channel</span>
          </h1>
          <p className="mt-2 text-slate-300/80">
            Ban co cau hoi hoac muon hop tac? Gui tin nhan cho toi tai day.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Reveal className="space-y-4" delay={0.06}>
          <div className="surface-panel p-4">
            <h3 className="mb-1 text-sm font-semibold text-cyan-200">Email</h3>
            <a
              href="mailto:2212343@dlu.edu.vn"
              className="text-sm text-slate-200 hover:text-fuchsia-200"
            >
              2212343@dlu.edu.vn
            </a>
          </div>
          <div className="surface-panel p-4">
            <h3 className="mb-1 text-sm font-semibold text-cyan-200">GitHub</h3>
            <a
              href="https://github.com/GiaBaoK46DLU"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-200 hover:text-fuchsia-200"
            >
              github.com/GiaBaoK46DLU
            </a>
          </div>
          <div className="surface-panel p-4">
            <h3 className="mb-1 text-sm font-semibold text-cyan-200">
              Dia chi
            </h3>
            <p className="text-sm text-slate-300/85">
              Đại học Đà Lạt, 01 Phù Đổng Thiên Vương, Đà Lạt
            </p>
          </div>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.12}>
          {successMessage ? (
            <Card className="border-cyan-300/30 bg-slate-950/60">
              <CardHeader>
                <CardTitle className="text-green-300">
                  Gui thanh cong!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-green-200">{successMessage}</p>
                <Button
                  variant="outline"
                  className="border-fuchsia-300/40 bg-fuchsia-400/10 text-fuchsia-100"
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
            <Card className="border-cyan-300/30 bg-slate-950/60">
              <CardHeader>
                <CardTitle className="text-slate-100">Gui lien he</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm key={formKey} onSuccess={setSuccessMessage} />
              </CardContent>
            </Card>
          )}
        </Reveal>
      </div>
    </div>
  );
}
