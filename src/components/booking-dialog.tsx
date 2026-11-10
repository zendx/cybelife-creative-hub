import { lazy, Suspense, useState, type ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";

const BookingDialogContent = lazy(() =>
  import("./booking-dialog-content").then((module) => ({ default: module.BookingDialogContent })),
);

export function BookingDialog({
  trigger,
  initialService,
}: {
  trigger: ReactNode;
  initialService?: string;
}) {
  const [activated, setActivated] = useState(false);
  const button = (
    <Slot
      aria-haspopup="dialog"
      aria-expanded={false}
      onClick={(event) => {
        if (!event.defaultPrevented) setActivated(true);
      }}
    >
      {trigger}
    </Slot>
  );

  if (!activated) return button;
  return (
    <Suspense
      fallback={
        <>
          {button}
          <span role="status" className="sr-only">
            Opening booking form...
          </span>
        </>
      }
    >
      <BookingDialogContent trigger={trigger} {...(initialService ? { initialService } : {})} />
    </Suspense>
  );
}
