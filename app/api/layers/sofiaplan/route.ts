import {NextRequest, NextResponse} from "next/server";

import {
  isSofiaplanLayerKey,
  SOFIAPLAN_LAYER_CONFIG
} from "../../../../lib/data/sofiaplan";

export const revalidate = 86400;

export async function GET(request: NextRequest) {
  const layer = request.nextUrl.searchParams.get("layer");

  if (!layer || !isSofiaplanLayerKey(layer)) {
    return NextResponse.json(
      {
        error: "Unknown layer. Try ?layer=bike-network."
      },
      {status: 400}
    );
  }

  const config = SOFIAPLAN_LAYER_CONFIG[layer];

  try {
    const response = await fetch(config.sourceUrl, {
      next: {
        revalidate
      },
      headers: {
        Accept: "application/geo+json, application/json;q=0.9"
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Sofiaplan returned ${response.status}.`,
          layer
        },
        {status: 502}
      );
    }

    const payload = await response.json();

    return NextResponse.json({
      layer,
      description: config.description,
      datasetId: config.datasetId,
      sourceUrl: config.sourceUrl,
      data: payload
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch Sofiaplan layer.",
        layer,
        detail: error instanceof Error ? error.message : "Unknown error"
      },
      {status: 502}
    );
  }
}
