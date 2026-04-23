export type SofiaplanLayerKey = "bike-network";

export type SofiaplanLayerConfig = {
  description: string;
  datasetId: number;
  sourceUrl: string;
};

export const SOFIAPLAN_LAYER_CONFIG: Record<
  SofiaplanLayerKey,
  SofiaplanLayerConfig
> = {
  "bike-network": {
    description: "Built and planned cycling network seed from Sofiaplan open data.",
    datasetId: 606,
    sourceUrl: "https://api.sofiaplan.bg/datasets/606"
  }
};

export function isSofiaplanLayerKey(value: string): value is SofiaplanLayerKey {
  return value in SOFIAPLAN_LAYER_CONFIG;
}
