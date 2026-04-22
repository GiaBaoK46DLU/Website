"use client";

import { useState } from "react";
import { deleteGuestbookEntry } from "@/app/guestbook/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DeleteButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    await deleteGuestbookEntry(id);
    setDeleting(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-xs text-red-400 hover:text-red-600 transition-colors">
          Xoa
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xac nhan xoa loi nhan</DialogTitle>
          <DialogDescription>
            Hanh dong nay khong the hoan tac. Ban co chac muon xoa loi nhan nay?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deleting}
          >
            Huy
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Dang xoa..." : "Xoa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
