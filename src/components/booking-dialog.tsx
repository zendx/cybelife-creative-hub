import { useState, type ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookingForm } from "@/components/booking-form";

export function BookingDialog({
  trigger,
  initialService,
}: {
  trigger: ReactNode;
  initialService?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Book a discovery meeting</DialogTitle>
          <DialogDescription>
            Pick a date and time that works for you. Our Lagos team will confirm by email.
          </DialogDescription>
        </DialogHeader>
        <BookingForm
          onDone={() => setOpen(false)}
          {...(initialService ? { initialService } : {})}
        />
      </DialogContent>
    </Dialog>
  );
}
