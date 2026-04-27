import {NextResponse} from "next/server";

import type {PlaceCategoryKey} from "../../../lib/data/places";
import {getSupabaseServerClient} from "../../../lib/supabase/server";
import type {SharedPlaceRecord} from "../../../lib/supabase/places";

type CreatePlacePayload = {
  title?: string;
  categoryKey?: PlaceCategoryKey;
  description?: string;
  coordinates?: [number, number];
};

const PLACE_CATEGORY_KEYS = new Set<PlaceCategoryKey>([
  "bikeParking",
  "repairStop",
  "coffeeStop",
  "waterPoint",
  "quietConnector"
]);

function isCoordinates(value: unknown): value is [number, number] {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    typeof value[0] === "number" &&
    typeof value[1] === "number"
  );
}

function isPlaceCategoryKey(value: unknown): value is PlaceCategoryKey {
  return typeof value === "string" && PLACE_CATEGORY_KEYS.has(value as PlaceCategoryKey);
}

export async function GET() {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({available: false, data: []});
  }

  const {data, error} = await supabase
    .from("places")
    .select(
      "id, title, category_key, description, source_kind, latitude, longitude, status, created_at"
    )
    .eq("status", "approved")
    .order("created_at", {ascending: false})
    .limit(100);

  if (error) {
    return NextResponse.json({error: error.message}, {status: 500});
  }

  return NextResponse.json({
    available: true,
    data: (data ?? []) as SharedPlaceRecord[]
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
      {error: "Supabase is not configured for places yet."},
      {status: 503}
    );
  }

  if (!accessToken) {
    return NextResponse.json(
      {error: "Sign in is required before submitting places.", code: "auth_required"},
      {status: 401}
    );
  }

  const payload = (await request.json()) as CreatePlacePayload;
  const title = payload.title?.trim() ?? "";
  const description = payload.description?.trim() ?? "";

  if (title.length < 3 || title.length > 80) {
    return NextResponse.json({error: "Place title must be between 3 and 80 characters."}, {status: 400});
  }

  if (!isPlaceCategoryKey(payload.categoryKey)) {
    return NextResponse.json({error: "Invalid place category."}, {status: 400});
  }

  if (!isCoordinates(payload.coordinates)) {
    return NextResponse.json({error: "Invalid coordinates."}, {status: 400});
  }

  if (description.length > 280) {
    return NextResponse.json({error: "Place note is too long."}, {status: 400});
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
    .from("places")
    .insert({
      user_id: user.id,
      city_slug: "sofia",
      title,
      category_key: payload.categoryKey,
      description,
      source_kind: "community",
      latitude: payload.coordinates[1],
      longitude: payload.coordinates[0],
      status: "pending"
    })
    .select(
      "id, title, category_key, description, source_kind, latitude, longitude, status, created_at"
    )
    .single();

  if (error) {
    return NextResponse.json({error: error.message}, {status: 500});
  }

  return NextResponse.json({
    data: data as SharedPlaceRecord
  });
}
