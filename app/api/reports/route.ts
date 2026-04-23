import {NextResponse} from "next/server";

import {getReportPreset} from "../../../lib/data/report-presets";
import {getSupabaseAdminClient} from "../../../lib/supabase/admin";
import {SharedReportRecord, isReportTypeKey} from "../../../lib/supabase/reports";

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
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      {error: "Supabase is not configured for server access."},
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
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      {error: "Supabase is not configured for server access."},
      {status: 503}
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

  const {data, error} = await supabase
    .from("reports")
    .insert({
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
