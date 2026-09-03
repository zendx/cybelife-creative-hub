import { useState } from "react";
import { format } from "date-fns";
import { CalendarCheck2, Clock } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { services } from "@/data/site";

const times = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

function isUnavailable(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const day = date.getDay();
  return date < today || day === 0 || day === 6;
}

export function BookingForm({
  onDone,
  initialService,
}: {
  onDone?: () => void;
  initialService?: string;
}) {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>();
  const [service, setService] = useState<string>(initialService ?? services[0].title);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();

    if (!name || !email) {
      toast.error("Please add your name and email.");
      return;
    }
    if (!date || !time) {
      toast.error("Pick a date and a time slot for your call.");
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      toast.success(`Meeting requested for ${format(date, "EEEE, d MMM yyyy")} at ${time} WAT`, {
        description: "We'll confirm by email within one business day.",
      });
      onDone?.();
    }, 600);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[auto_1fr]">
      <div className="rounded-lg border border-border bg-surface/60 p-4">
        <p className="eyebrow mb-3">Choose a date</p>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={isUnavailable}
          className={cn("pointer-events-auto p-0")}
        />
        <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="size-3.5" /> Weekdays only · West Africa Time (GMT+1)
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <p className="eyebrow mb-3">Available slots</p>
          <div className="flex flex-wrap gap-2">
            {times.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTime(t)}
                className={cn(
                  "rounded-md border px-3.5 py-2 text-sm transition-colors",
                  time === t
                    ? "border-signal bg-signal text-signal-foreground"
                    : "border-border bg-surface/50 text-muted-foreground hover:border-brand-soft/60 hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow mb-3">What do you need?</p>
          <div className="flex flex-wrap gap-2">
            {services.map((s) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => setService(s.title)}
                className={cn(
                  "rounded-md border px-3.5 py-2 text-sm transition-colors",
                  service === s.title
                    ? "border-brand-soft bg-primary/25 text-foreground"
                    : "border-border bg-surface/50 text-muted-foreground hover:text-foreground",
                )}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" placeholder="Amara Okafor" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Work email</Label>
            <Input id="email" name="email" type="email" placeholder="you@company.com" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" name="company" placeholder="Company name" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="brief">Project brief</Label>
            <Textarea
              id="brief"
              name="brief"
              rows={3}
              placeholder="Tell us about your business and what you want to launch."
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" variant="signal" size="lg" disabled={submitting}>
            <CalendarCheck2 />
            {submitting ? "Booking…" : "Confirm meeting"}
          </Button>
          <p className="text-xs text-muted-foreground">
            {date && time
              ? `${format(date, "EEE, d MMM")} · ${time} WAT · ${service}`
              : "45-minute discovery call, free of charge."}
          </p>
        </div>
      </div>
    </form>
  );
}
