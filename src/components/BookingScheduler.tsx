"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/components/auth/AuthProvider";
import { BOOKING_TIME_SLOTS } from "@/lib/validation";

type BookingResult = {
  id: string;
  booking_date: string;
  booking_time: string;
  status: "pending" | "confirmed" | "cancelled";
};

type UnavailableSlot = {
  bookingDate: string;
  bookingTime: string;
};

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Europe/Sarajevo"
});

function toLocalDateInput(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Europe/Sarajevo"
  }).format(date);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function isWeekend(dateValue: string) {
  if (!dateValue) return false;
  const day = new Date(`${dateValue}T12:00:00Z`).getUTCDay();
  return day === 0 || day === 6;
}

function formatBookingDate(dateValue: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Sarajevo"
  }).format(new Date(`${dateValue}T12:00:00Z`));
}

export function BookingScheduler() {
  const { user, loading } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [notes, setNotes] = useState("");
  const [unavailable, setUnavailable] = useState<Set<string>>(new Set());
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<BookingResult | null>(null);

  const today = useMemo(() => new Date(), []);
  const minDate = useMemo(() => toLocalDateInput(addDays(today, 1)), [today]);
  const maxDate = useMemo(() => toLocalDateInput(addDays(today, 90)), [today]);

  const loadAvailability = useCallback(async () => {
    if (!user) return;

    setAvailabilityLoading(true);
    try {
      const response = await fetch("/api/bookings", { cache: "no-store" });
      if (!response.ok) return;

      const payload = (await response.json()) as { unavailable?: UnavailableSlot[] };
      setUnavailable(
        new Set(
          (payload.unavailable || []).map(
            (slot) => `${slot.bookingDate}:${slot.bookingTime.slice(0, 5)}`
          )
        )
      );
    } finally {
      setAvailabilityLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void loadAvailability();
  }, [loadAvailability]);

  useEffect(() => {
    if (!showLoginPrompt) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setShowLoginPrompt(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [showLoginPrompt]);

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!bookingDate || !bookingTime) {
      setError("Choose a consultation date and time.");
      return;
    }

    if (isWeekend(bookingDate)) {
      setError("Consultations are available Monday through Friday.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingDate, bookingTime, notes })
      });
      const payload = (await response.json().catch(() => ({}))) as {
        booking?: BookingResult;
        error?: string;
      };

      if (!response.ok || !payload.booking) {
        setError(payload.error || "Could not save your request. Please try again.");
        if (response.status === 409) await loadAvailability();
        return;
      }

      setBooking(payload.booking);
      setUnavailable((current) => {
        const next = new Set(current);
        next.add(`${bookingDate}:${bookingTime}`);
        return next;
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="grid min-h-[520px] place-items-center rounded-lg border border-slate-200 bg-white p-8 shadow-card lg:border-white/20">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-gold" />
          <p className="mt-4 text-sm font-bold text-slate-600">Preparing consultation access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="relative grid min-h-[590px] place-items-center overflow-hidden rounded-lg border border-slate-200 bg-navy p-7 shadow-card lg:border-white/20 md:p-10">
          <div className="hero-boardroom-motion absolute inset-0 opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/25 via-navy/70 to-navy" />
          <div className="relative max-w-md text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-lg border border-gold/45 bg-white/10 text-gold shadow-lg backdrop-blur-md">
              <Icon name="Calendar" className="h-7 w-7" />
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Secure Booking
            </p>
            <h3 className="mt-3 font-display text-4xl leading-tight text-white">
              Request a consultation directly.
            </h3>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-200">
              Sign in to choose an available weekday and send a private consultation request.
            </p>
            <button
              type="button"
              onClick={() => setShowLoginPrompt(true)}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg border border-gold bg-gold px-6 py-3 text-sm font-extrabold text-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              <Icon name="Calendar" className="h-4 w-4" />
              Book Consultation
            </button>
          </div>
        </div>

        {showLoginPrompt ? (
          <div
            className="fixed inset-0 z-[110] grid place-items-center bg-navy/75 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-login-title"
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) setShowLoginPrompt(false);
            }}
          >
            <div className="relative w-full max-w-md rounded-lg border border-white/15 bg-white p-6 shadow-premium md:p-8">
              <button
                type="button"
                onClick={() => setShowLoginPrompt(false)}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-gold/60 hover:bg-porcelain hover:text-navy"
                aria-label="Close login prompt"
              >
                <Icon name="X" className="h-4 w-4" />
              </button>
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-navy text-gold">
                <Icon name="UserRound" className="h-5 w-5" />
              </div>
              <h3 id="booking-login-title" className="mt-5 font-display text-3xl leading-tight text-navy">
                Log in to request a consultation.
              </h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                Your account keeps booking details private and prevents anonymous spam.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link href="/login" className="inline-flex items-center justify-center rounded-lg border border-navy bg-navy px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800">
                  Login
                </Link>
                <Link href="/register" className="inline-flex items-center justify-center rounded-lg border border-gold/70 bg-porcelain px-5 py-3 text-sm font-extrabold text-navy transition hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }

  if (booking) {
    return (
      <div className="grid min-h-[590px] place-items-center rounded-lg border border-white/20 bg-white p-6 shadow-card md:p-10">
        <div className="max-w-lg text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-700">
            <Icon name="CheckCircle2" className="h-8 w-8" />
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-gold">Request received</p>
          <h3 className="mt-3 font-display text-4xl leading-tight text-navy">
            Your consultation is pending confirmation.
          </h3>
          <p className="mt-5 text-base font-semibold leading-7 text-slate-700">
            {formatBookingDate(booking.booking_date)} at {booking.booking_time.slice(0, 5)} Europe/Sarajevo time.
          </p>
          <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
            The request has been stored securely. The advisor can review it in the booking dashboard and contact you using your account email.
          </p>
          <button
            type="button"
            onClick={() => {
              setBooking(null);
              setBookingDate("");
              setBookingTime("");
              setNotes("");
            }}
            className="mt-7 inline-flex items-center justify-center rounded-lg border border-navy bg-navy px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Request another time
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submitBooking} className="rounded-lg border border-white/20 bg-white p-5 shadow-card md:p-7">
      <div className="flex items-start gap-4 border-b border-slate-200 pb-5">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-navy text-gold">
          <Icon name="Calendar" className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Live availability</p>
          <h3 className="mt-1 font-display text-3xl leading-tight text-navy">Choose a consultation time</h3>
          <p className="mt-2 text-sm font-semibold text-slate-600">30 minutes · Europe/Sarajevo time</p>
        </div>
      </div>

      <label className="mt-6 block text-sm font-extrabold text-navy" htmlFor="booking-date">
        Date
      </label>
      <input
        id="booking-date"
        type="date"
        min={minDate}
        max={maxDate}
        value={bookingDate}
        onChange={(event) => {
          setBookingDate(event.target.value);
          setBookingTime("");
          setError("");
        }}
        required
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
      />
      {isWeekend(bookingDate) ? (
        <p className="mt-2 text-sm font-semibold text-amber-700">Choose a weekday between Monday and Friday.</p>
      ) : null}

      <fieldset className="mt-6" disabled={!bookingDate || isWeekend(bookingDate)}>
        <legend className="text-sm font-extrabold text-navy">Available start times</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {BOOKING_TIME_SLOTS.map((time) => {
            const taken = unavailable.has(`${bookingDate}:${time}`);
            const selected = bookingTime === time;
            return (
              <button
                key={time}
                type="button"
                disabled={taken}
                onClick={() => {
                  setBookingTime(time);
                  setError("");
                }}
                className={`rounded-lg border px-3 py-3 text-sm font-extrabold transition ${
                  taken
                    ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 line-through"
                    : selected
                      ? "border-navy bg-navy text-white shadow-md"
                      : "border-slate-300 bg-white text-navy hover:-translate-y-0.5 hover:border-gold"
                }`}
                aria-pressed={selected}
              >
                {timeFormatter.format(new Date(`2020-01-01T${time}:00+01:00`))}
              </button>
            );
          })}
        </div>
        {availabilityLoading ? (
          <p className="mt-3 text-xs font-bold text-slate-500">Refreshing availability...</p>
        ) : null}
      </fieldset>

      <label className="mt-6 block text-sm font-extrabold text-navy" htmlFor="booking-notes">
        What would you like to discuss? <span className="font-semibold text-slate-500">(optional)</span>
      </label>
      <textarea
        id="booking-notes"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        maxLength={1000}
        rows={5}
        placeholder="Briefly describe the challenge, desired outcome, and relevant context."
        className="mt-2 w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold leading-6 text-navy outline-none transition placeholder:text-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/20"
      />
      <p className="mt-1 text-right text-xs font-semibold text-slate-500">{notes.length}/1000</p>

      {error ? (
        <div role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting || !bookingDate || !bookingTime || isWeekend(bookingDate)}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-navy bg-navy px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
      >
        <Icon name="Send" className="h-4 w-4" />
        {submitting ? "Sending request..." : "Request consultation"}
      </button>
      <p className="mt-3 text-center text-xs font-semibold leading-5 text-slate-500">
        Your time is reserved as pending until the advisor confirms it.
      </p>
    </form>
  );
}
