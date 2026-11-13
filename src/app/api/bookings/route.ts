import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { enforceRateLimit } from "@/lib/security/rateLimit";
import { bookingSchema, dateInSarajevo, isBookingWeekday } from "@/lib/validation";

export async function GET(request: Request) {
  const limited = enforceRateLimit(request, "booking-availability", {
    limit: 30,
    windowMs: 60_000
  });

  if (limited) return limited;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Please log in to view availability." }, { status: 401 });
  }

  const startDate = dateInSarajevo();
  const end = new Date();
  end.setUTCDate(end.getUTCDate() + 90);
  const endDate = dateInSarajevo(end);
  const { data, error } = await supabase.rpc("get_unavailable_booking_slots", {
    p_start_date: startDate,
    p_end_date: endDate
  });

  if (error) {
    return NextResponse.json({ error: "Could not load availability." }, { status: 500 });
  }

  const unavailable = (data || []).map((slot: { booking_date: string; booking_time: string }) => ({
    bookingDate: slot.booking_date,
    bookingTime: slot.booking_time.slice(0, 5)
  }));

  return NextResponse.json({ unavailable });
}

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "booking-create", {
    limit: 8,
    windowMs: 60_000
  });

  if (limited) {
    return limited;
  }

  const body = await request.json().catch(() => null);
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Please choose a valid date and time." }, { status: 400 });
  }

  const today = dateInSarajevo();
  const bookingLimit = new Date();
  bookingLimit.setUTCDate(bookingLimit.getUTCDate() + 90);
  const latestDate = dateInSarajevo(bookingLimit);

  if (parsed.data.bookingDate <= today || parsed.data.bookingDate > latestDate) {
    return NextResponse.json(
      { error: "Please choose a date within the next 90 days." },
      { status: 400 }
    );
  }

  if (!isBookingWeekday(parsed.data.bookingDate)) {
    return NextResponse.json({ error: "Consultations are available Monday through Friday." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Please log in before requesting a consultation." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .eq("id", user.id)
    .maybeSingle();

  const email = profile?.email || user.email || "";
  const fullName =
    profile?.full_name ||
    (typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : "") ||
    email.split("@")[0] ||
    "User";

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      user_id: user.id,
      full_name: fullName,
      email,
      booking_date: parsed.data.bookingDate,
      booking_time: parsed.data.bookingTime,
      notes: parsed.data.notes || null,
      status: "confirmed"
    })
    .select("id, booking_date, booking_time, status")
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "That time was just reserved. Please choose another available time." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Could not save your consultation request. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ booking: data }, { status: 201 });
}
