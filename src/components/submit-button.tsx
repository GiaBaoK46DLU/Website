"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  idleText: string;
  pendingText: string;
  className?: string;
}

export default function SubmitButton({
  idleText,
  pendingText,
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={className}>
      {pending ? pendingText : idleText}
    </Button>
  );
}
