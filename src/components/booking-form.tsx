import { useId, useState } from "react";
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
import { contactMethods, meetingTimes } from "@/lib/enquiry-schema";
import { submitEnquiry } from "@/lib/submit-enquiry";
import { Link } from "@tanstack/react-router";
import { useCurrency } from "@/hooks/use-currency";

const times = meetingTimes;

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
  const fieldId = useId();
  const { currency } = useCurrency();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>();
  const [service, setService] = useState<string>(initialService ?? services[0].title);
  const [submitting, setSubmitting] = useState(false);
  const [methods, setMethods] = useState<string[]>(["Email"]);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError("");
    const formElement = event.currentTarget;
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
    try {
      await submitEnquiry({
        ...Object.fromEntries(form),
        kind: "project",
        currency,
        name,
        email,
        service,
        date: format(date, "yyyy-MM-dd"),
        time,
        contactMethods: methods,
      });
      toast.success(`Meeting requested for ${format(date, "EEEE, d MMM yyyy")} at ${time} WAT`, {
        description: "We'll confirm by email within one business day.",
      });
      formElement.reset();
      setDate(undefined);
      setTime(undefined);
      setMethods(["Email"]);
      onDone?.();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Please try again or email cyberlifeng@gmail.com.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[auto_1fr]">
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
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
                aria-pressed={time === t}
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
            {services
              .filter((s) => s.slug !== "website-maintenance")
              .map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setService(s.title)}
                  aria-pressed={service === s.title}
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
          <Link
            to="/website-maintenance"
            className="mt-3 inline-block text-sm font-semibold text-primary"
          >
            Looking for ongoing website care? Explore maintenance plans.
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={`${fieldId}-name`}>Full name</Label>
            <Input
              id={`${fieldId}-name`}
              name="name"
              placeholder="Amara Okafor"
              autoComplete="name"
              required
              maxLength={150}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${fieldId}-email`}>Work email</Label>
            <Input
              id={`${fieldId}-email`}
              name="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              required
              maxLength={254}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor={`${fieldId}-company`}>Company</Label>
            <Input
              id={`${fieldId}-company`}
              name="company"
              placeholder="Company name"
              autoComplete="organization"
              required
              maxLength={150}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor={`${fieldId}-brief`}>Project brief</Label>
            <Textarea
              id={`${fieldId}-brief`}
              name="brief"
              rows={3}
              required
              minLength={10}
              maxLength={5000}
              placeholder="Tell us about your business and what you want to launch."
            />
          </div>
        </div>

        <fieldset>
          <legend className="text-sm font-semibold">How would you like us to contact you?</legend>
          <p className="mt-1 text-xs text-muted-foreground">
            Choose all that work for you. Meeting links will be arranged after confirmation.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {contactMethods.map((method) => (
              <label
                key={method}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${methods.includes(method) ? "border-primary bg-primary/5" : "border-border"}`}
              >
                <input
                  type="checkbox"
                  name="contactMethods"
                  value={method}
                  className="size-4 accent-primary"
                  checked={methods.includes(method)}
                  onChange={(event) =>
                    setMethods((current) =>
                      event.target.checked
                        ? [...current, method]
                        : current.filter((item) => item !== method),
                    )
                  }
                />
                {method}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="space-y-2">
          <Label htmlFor={`${fieldId}-project-phone`}>Phone / WhatsApp number</Label>
          <Input
            id={`${fieldId}-project-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="e.g. +234 803 197 5415 or +44 7700 900123"
            required
            maxLength={40}
          />
          <p className="text-xs text-muted-foreground">
            Include your country code so we can reach you.
          </p>
        </div>
        {error && (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
          >
            {error}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" variant="signal" size="lg" disabled={submitting}>
            <CalendarCheck2 />
            {submitting ? "Sending…" : "Request meeting"}
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
