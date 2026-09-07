import { lazy, Suspense, useState, type ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const BookingForm = lazy(() =>
  import("@/components/booking-form").then((module) => ({ default: module.BookingForm })),
);

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
        {open && (
          <Suspense
            fallback={
              <p role="status" className="py-8 text-sm text-muted-foreground">
                Loading the enquiry form…
              </p>
            }
          >
            <BookingForm
              onDone={() => setOpen(false)}
              {...(initialService ? { initialService } : {})}
            />
          </Suspense>
        )}
      </DialogContent>
    </Dialog>
  );
}
