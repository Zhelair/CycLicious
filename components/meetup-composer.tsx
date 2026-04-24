"use client";

import {useState} from "react";

export type MeetupSaveResult = "submitted" | "auth-required" | "unavailable";

type MeetupComposerProps = {
  title: string;
  subtitle: string;
  meetupTitleLabel: string;
  meetupTitlePlaceholder: string;
  whenLabel: string;
  areaLabel: string;
  areaPlaceholder: string;
  paceLabel: string;
  pacePlaceholder: string;
  noteLabel: string;
  notePlaceholder: string;
  visibilityLabel: string;
  visibilityOptions: {
    id: "public" | "unlisted" | "private";
    label: string;
  }[];
  submitLabel: string;
  savingLabel: string;
  savedLabel: string;
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
  onCreateMeetup: (payload: {
    title: string;
    note: string;
    visibility: "public" | "unlisted" | "private";
    paceLabel: string;
    scheduledFor: string;
    areaLabel: string;
    coordinates: [number, number];
  }) => Promise<MeetupSaveResult>;
};

function getDefaultMeetupTime() {
  const date = new Date(Date.now() + 4 * 60 * 60 * 1000);
  date.setMinutes(0, 0, 0);
  const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
}

export function MeetupComposer({
  title,
  subtitle,
  meetupTitleLabel,
  meetupTitlePlaceholder,
  whenLabel,
  areaLabel,
  areaPlaceholder,
  paceLabel,
  pacePlaceholder,
  noteLabel,
  notePlaceholder,
  visibilityLabel,
  visibilityOptions,
  submitLabel,
  savingLabel,
  savedLabel,
  safetyNote,
  pickerLabels,
  resultLabels,
  selectedCoordinates,
  isPickingCoordinates,
  onStartCoordinatePick,
  onClearCoordinatePick,
  onCreateMeetup
}: MeetupComposerProps) {
  const [meetupTitle, setMeetupTitle] = useState("");
  const [scheduledFor, setScheduledFor] = useState(getDefaultMeetupTime);
  const [area, setArea] = useState("");
  const [pace, setPace] = useState("");
  const [note, setNote] = useState("");
  const [visibility, setVisibility] = useState<"public" | "unlisted" | "private">("unlisted");
  const [submitState, setSubmitState] = useState<"idle" | "saving" | "saved">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit() {
    if (!selectedCoordinates || !meetupTitle.trim() || submitState === "saving") {
      if (!selectedCoordinates) {
        setFeedback(pickerLabels.required);
      }

      return;
    }

    setSubmitState("saving");
    const result = await onCreateMeetup({
      title: meetupTitle.trim(),
      note: note.trim(),
      visibility,
      paceLabel: pace.trim(),
      scheduledFor,
      areaLabel: area.trim(),
      coordinates: selectedCoordinates
    });

    if (result === "submitted") {
      setSubmitState("saved");
      setMeetupTitle("");
      setArea("");
      setPace("");
      setNote("");
      setScheduledFor(getDefaultMeetupTime());
      setVisibility("unlisted");
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
          <span>{meetupTitleLabel}</span>
          <input
            className="composer-input"
            maxLength={80}
            placeholder={meetupTitlePlaceholder}
            type="text"
            value={meetupTitle}
            onChange={(event) => setMeetupTitle(event.target.value)}
          />
        </label>
      </div>

      <div className="field-stack">
        <label className="composer-field">
          <span>{whenLabel}</span>
          <input
            className="composer-input"
            type="datetime-local"
            value={scheduledFor}
            onChange={(event) => setScheduledFor(event.target.value)}
          />
        </label>
      </div>

      <div className="field-stack">
        <label className="composer-field">
          <span>{areaLabel}</span>
          <input
            className="composer-input"
            maxLength={80}
            placeholder={areaPlaceholder}
            type="text"
            value={area}
            onChange={(event) => setArea(event.target.value)}
          />
        </label>
      </div>

      <div className="field-stack">
        <label className="composer-field">
          <span>{paceLabel}</span>
          <input
            className="composer-input"
            maxLength={40}
            placeholder={pacePlaceholder}
            type="text"
            value={pace}
            onChange={(event) => setPace(event.target.value)}
          />
        </label>
      </div>

      <div className="field-stack">
        <span className="field-label">{visibilityLabel}</span>
        <div className="chip-row">
          {visibilityOptions.map((option) => (
            <button
              className={visibility === option.id ? "active" : ""}
              key={option.id}
              type="button"
              onClick={() => setVisibility(option.id)}
            >
              {option.label}
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
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </div>

      <div className="field-foot">
        <p className="field-note">{safetyNote}</p>
        <span>{note.length}/280</span>
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
