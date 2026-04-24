"use client";

import {useState} from "react";

import type {PlaceCategoryKey} from "../lib/data/places";

export type PlaceSaveResult = "submitted" | "auth-required" | "unavailable";

type PlaceComposerProps = {
  title: string;
  subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  notePlaceholder: string;
  submitLabel: string;
  savingLabel: string;
  savedLabel: string;
  categoryLabel: string;
  noteLabel: string;
  safetyNote: string;
  pickerLabels: {
    start: string;
    change: string;
    clear: string;
    active: string;
    picked: string;
    required: string;
  };
  resultLabels: {
    submitted: string;
    authRequired: string;
    unavailable: string;
  };
  selectedCoordinates: [number, number] | null;
  isPickingCoordinates: boolean;
  onStartCoordinatePick: () => void;
  onClearCoordinatePick: () => void;
  onCreatePlace: (payload: {
    title: string;
    categoryKey: PlaceCategoryKey;
    description: string;
    coordinates: [number, number];
  }) => Promise<PlaceSaveResult>;
  categories: {
    id: PlaceCategoryKey;
    label: string;
  }[];
};

export function PlaceComposer({
  title,
  subtitle,
  nameLabel,
  namePlaceholder,
  notePlaceholder,
  submitLabel,
  savingLabel,
  savedLabel,
  categoryLabel,
  noteLabel,
  safetyNote,
  pickerLabels,
  resultLabels,
  selectedCoordinates,
  isPickingCoordinates,
  onStartCoordinatePick,
  onClearCoordinatePick,
  onCreatePlace,
  categories
}: PlaceComposerProps) {
  const [placeName, setPlaceName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategoryKey>(
    categories[0]?.id ?? "bikeParking"
  );
  const [submitState, setSubmitState] = useState<"idle" | "saving" | "saved">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit() {
    if (!selectedCoordinates || !placeName.trim() || submitState === "saving") {
      if (!selectedCoordinates) {
        setFeedback(pickerLabels.required);
      }

      return;
    }

    setSubmitState("saving");
    const result = await onCreatePlace({
      title: placeName.trim(),
      categoryKey: selectedCategory,
      description: description.trim(),
      coordinates: selectedCoordinates
    });

    if (result === "submitted") {
      setSubmitState("saved");
      setPlaceName("");
      setDescription("");
      setFeedback(resultLabels.submitted);
      onClearCoordinatePick();
    } else if (result === "auth-required") {
      setSubmitState("idle");
      setFeedback(resultLabels.authRequired);
    } else {
      setSubmitState("idle");
      setFeedback(resultLabels.unavailable);
    }

    window.setTimeout(() => setSubmitState("idle"), 1800);
  }

  return (
    <section className="panel-card shell-card">
      <div className="panel-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="field-stack">
        <label className="composer-field">
          <span>{nameLabel}</span>
          <input
            className="composer-input"
            maxLength={80}
            placeholder={namePlaceholder}
            type="text"
            value={placeName}
            onChange={(event) => setPlaceName(event.target.value)}
          />
        </label>
      </div>

      <div className="field-stack">
        <span className="field-label">{categoryLabel}</span>
        <div className="chip-row">
          {categories.map((category) => (
            <button
              className={category.id === selectedCategory ? "active" : ""}
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="field-stack">
        <span className="field-label">{noteLabel}</span>
        <textarea
          maxLength={280}
          placeholder={notePlaceholder}
          rows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div className="field-foot">
        <p className="field-note">{safetyNote}</p>
        <span>{description.length}/280</span>
      </div>

      <div className="button-row inline-control-row">
        <button className="secondary-button" type="button" onClick={onStartCoordinatePick}>
          {selectedCoordinates ? pickerLabels.change : pickerLabels.start}
        </button>
        {selectedCoordinates ? (
          <button className="ghost-button" type="button" onClick={onClearCoordinatePick}>
            {pickerLabels.clear}
          </button>
        ) : null}
      </div>

      {isPickingCoordinates ? (
        <p className="field-note location-note">{pickerLabels.active}</p>
      ) : selectedCoordinates ? (
        <p className="field-note location-note">{pickerLabels.picked}</p>
      ) : null}

      {feedback ? <p className="field-note location-note">{feedback}</p> : null}

      <button className="primary-button" type="button" onClick={handleSubmit}>
        {submitState === "saving"
          ? savingLabel
          : submitState === "saved"
            ? savedLabel
            : submitLabel}
      </button>
    </section>
  );
}
