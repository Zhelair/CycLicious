"use client";

import {useState} from "react";

type MeetupCardProps = {
  actionFeedbackLabels: {
    joined: string;
    maybe: string;
    shared: string;
    shareUnavailable: string;
  };
  labels: {
    when: string;
    pace: string;
    people: string;
  };
  title: string;
  visibility: string;
  when: string;
  pace: string;
  attendees: string;
  note: string;
  safetyNote: string;
  joinLabel: string;
  maybeLabel: string;
  shareLabel: string;
};

export function MeetupCard({
  actionFeedbackLabels,
  labels,
  title,
  visibility,
  when,
  pace,
  attendees,
  note,
  safetyNote,
  joinLabel,
  maybeLabel,
  shareLabel
}: MeetupCardProps) {
  const [response, setResponse] = useState<"join" | "maybe" | null>(null);
  const [feedback, setFeedback] = useState("");

  async function handleShare() {
    if (typeof window === "undefined") {
      return;
    }

    const shareUrl = `${window.location.origin}${window.location.pathname}#meetup`;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setFeedback(actionFeedbackLabels.shared);
        return;
      }
    } catch {
      // Fall through to the unsupported message.
    }

    setFeedback(actionFeedbackLabels.shareUnavailable);
  }

  return (
    <section className="panel-card meetup-card shell-card">
      <div className="panel-header">
        <h2>{title}</h2>
        <span className="status-chip">{visibility}</span>
      </div>
      <dl className="meetup-grid">
        <div>
          <dt>{labels.when}</dt>
          <dd>{when}</dd>
        </div>
        <div>
          <dt>{labels.pace}</dt>
          <dd>{pace}</dd>
        </div>
        <div>
          <dt>{labels.people}</dt>
          <dd>{attendees}</dd>
        </div>
      </dl>
      <p className="meetup-note">{note}</p>
      <p className="field-note meetup-safety">{safetyNote}</p>
      <div className="button-row">
        <button
          aria-pressed={response === "join"}
          className={response === "join" ? "primary-button" : "secondary-button"}
          type="button"
          onClick={() => {
            setResponse("join");
            setFeedback(actionFeedbackLabels.joined);
          }}
        >
          {joinLabel}
        </button>
        <button
          aria-pressed={response === "maybe"}
          className={response === "maybe" ? "primary-button" : "secondary-button"}
          type="button"
          onClick={() => {
            setResponse("maybe");
            setFeedback(actionFeedbackLabels.maybe);
          }}
        >
          {maybeLabel}
        </button>
        <button className="ghost-button" type="button" onClick={() => void handleShare()}>
          {shareLabel}
        </button>
      </div>
      {feedback ? <p className="action-feedback">{feedback}</p> : null}
    </section>
  );
}
