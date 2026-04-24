import {NextResponse} from "next/server";

import {getReportPreset} from "../../../lib/data/report-presets";
import {SharedReportRecord, isReportTypeKey} from "../../../lib/supabase/reports";
import {getSupabaseServerClient} from "../../../lib/supabase/server";

type CreateReportPayload = {
  reportTypeKey?: string;
  note?: string;
  coordinates?: [number, number];
};

function isCoordinates(value: unknown): value is [number, number] {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    typeof value[0] === "number" &&
    typeof value[1] === "number"
  );
}

export async function GET() {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json(
      {error: "Supabase is not configured for public reads yet."},
      {status: 503}
    );
  }

  const {data, error} = await supabase
    .from("reports")
    .select("id, report_type, category_key, severity, note, latitude, longitude, created_at, status")
    .eq("status", "active")
    .order("created_at", {ascending: false})
    .limit(100);

  if (error) {
    return NextResponse.json({error: error.message}, {status: 500});
  }

  return NextResponse.json({
    data: (data ?? []) as SharedReportRecord[]
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
      {error: "Supabase is not configured for shared report sync yet."},
      {status: 503}
    );
  }

  if (!accessToken) {
    return NextResponse.json(
      {error: "Sign in is required before publishing shared reports.", code: "auth_required"},
      {status: 401}
    );
  }

  const payload = (await request.json()) as CreateReportPayload;

  if (!payload.reportTypeKey || !isReportTypeKey(payload.reportTypeKey)) {
    return NextResponse.json({error: "Invalid report type."}, {status: 400});
  }

  if (!isCoordinates(payload.coordinates)) {
    return NextResponse.json({error: "Invalid coordinates."}, {status: 400});
  }

  const preset = getReportPreset(payload.reportTypeKey);

  if (!preset) {
    return NextResponse.json({error: "Unknown report preset."}, {status: 400});
  }

  const note = (payload.note ?? "").trim();

  if (note.length > 280) {
    return NextResponse.json({error: "Report note is too long."}, {status: 400});
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
    .from("reports")
    .insert({
      user_id: user.id,
      city_slug: "sofia",
      report_type: preset.id,
      category_key: preset.categoryKey,
      severity: preset.severity,
      note,
      latitude: payload.coordinates[1],
      longitude: payload.coordinates[0],
      status: "active"
    })
    .select("id, report_type, category_key, severity, note, latitude, longitude, created_at, status")
    .single();

  if (error) {
    return NextResponse.json({error: error.message}, {status: 500});
  }

  return NextResponse.json({
    data: data as SharedReportRecord
  });
}
