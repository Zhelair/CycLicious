import {NextResponse} from "next/server";

import {getSupabaseServerClient} from "../../../lib/supabase/server";
import type {SharedMeetupRecord} from "../../../lib/supabase/meetups";

type CreateMeetupPayload = {
  title?: string;
  note?: string;
  visibility?: "public" | "unlisted" | "private";
  paceLabel?: string;
  scheduledFor?: string;
  areaLabel?: string;
  coordinates?: [number, number];
};

const MEETUP_VISIBILITY = new Set(["public", "unlisted", "private"]);

function isCoordinates(value: unknown): value is [number, number] {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    typeof value[0] === "number" &&
    typeof value[1] === "number"
  );
}

function isMeetupVisibility(value: unknown): value is "public" | "unlisted" | "private" {
  return typeof value === "string" && MEETUP_VISIBILITY.has(value);
}

export async function GET() {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({available: false, data: []});
  }

  const {data, error} = await supabase
    .from("meetups")
    .select(
      "id, title, note, visibility, pace_label, scheduled_for, area_label, latitude, longitude, created_at"
    )
    .gte("scheduled_for", new Date().toISOString())
    .order("scheduled_for", {ascending: true})
    .limit(20);

  if (error) {
    return NextResponse.json({error: error.message}, {status: 500});
  }

  return NextResponse.json({
    available: true,
    data: (data ?? []) as SharedMeetupRecord[]
  });
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const accessToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : "";
  const supabase = getSupabaseServerClient(accessToken);

  if (!supabase) {
    return NextResponse.json(
      {error: "Supabase is not configured for meetups yet."},
      {status: 503}
    );
  }

  if (!accessToken) {
    return NextResponse.json(
      {error: "Sign in is required before creating a meetup.", code: "auth_required"},
      {status: 401}
    );
  }

  const payload = (await request.json()) as CreateMeetupPayload;
  const title = payload.title?.trim() ?? "";
  const note = payload.note?.trim() ?? "";
  const paceLabel = payload.paceLabel?.trim() ?? "";
  const areaLabel = payload.areaLabel?.trim() ?? "";
  const scheduledFor = payload.scheduledFor ?? "";

  if (title.length < 3 || title.length > 80) {
    return NextResponse.json(
      {error: "Meetup title must be between 3 and 80 characters."},
      {status: 400}
    );
  }

  if (!scheduledFor || Number.isNaN(new Date(scheduledFor).getTime())) {
    return NextResponse.json({error: "Invalid meetup time."}, {status: 400});
  }

  if (new Date(scheduledFor).getTime() <= Date.now()) {
    return NextResponse.json({error: "Meetup time must be in the future."}, {status: 400});
  }

  if (!isMeetupVisibility(payload.visibility)) {
    return NextResponse.json({error: "Invalid meetup visibility."}, {status: 400});
  }

  if (!isCoordinates(payload.coordinates)) {
    return NextResponse.json({error: "Invalid meetup coordinates."}, {status: 400});
  }

  if (note.length > 280) {
    return NextResponse.json({error: "Meetup note is too long."}, {status: 400});
  }

  if (paceLabel.length > 40 || areaLabel.length > 80) {
    return NextResponse.json({error: "Meetup pace or area is too long."}, {status: 400});
  }

  const {
    data: {user},
    error: userError
  } = await supabase.auth.getUser(accessToken);

  if (userError || !user) {
    return NextResponse.json(
      {error: "Your session could not be verified.", code: "auth_required"},
      {status: 401}
    );
  }

  const {data, error} = await supabase
    .from("meetups")
    .insert({
      owner_id: user.id,
      city_slug: "sofia",
      title,
      note,
      visibility: payload.visibility,
      pace_label: paceLabel,
      scheduled_for: new Date(scheduledFor).toISOString(),
      area_label: areaLabel,
      latitude: payload.coordinates[1],
      longitude: payload.coordinates[0]
    })
    .select(
      "id, title, note, visibility, pace_label, scheduled_for, area_label, latitude, longitude, created_at"
    )
    .single();

  if (error) {
    return NextResponse.json({error: error.message}, {status: 500});
  }

  return NextResponse.json({
    data: data as SharedMeetupRecord
  });
}
