"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {useLocale, useTranslations} from "next-intl";

import {appDb} from "../lib/db/app-db";

export function LegalConsentGate() {
  const legalT = useTranslations("legal");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdultChecked, setIsAdultChecked] = useState(false);
  const [isMeetupChecked, setIsMeetupChecked] = useState(false);
  const [isNavigationChecked, setIsNavigationChecked] = useState(false);
  const canAccept = isAdultChecked && isMeetupChecked && isNavigationChecked;

  useEffect(() => {
    let isCancelled = false;

    const loadConsent = async () => {
      const accepted = await appDb.uiPreferences.get("legal-accepted");

      if (!isCancelled && accepted?.value !== "true") {
        setIsOpen(true);
      }
    };

    void loadConsent();

    return () => {
      isCancelled = true;
    };
  }, []);

  async function handleAccept() {
    if (!canAccept) {
      return;
    }

    await appDb.uiPreferences.put({
      key: "legal-accepted",
      value: "true",
      updatedAt: Date.now()
    });

    setIsOpen(false);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="legal-gate">
      <section className="legal-card shell-card" role="dialog" aria-modal="true">
        <div className="panel-header legal-header">
          <div>
            <h2>{legalT("title")}</h2>
            <p>{legalT("subtitle")}</p>
          </div>
          <span className="status-chip accent-chip">{legalT("badge")}</span>
        </div>

        <div className="legal-points">
          <label className="legal-check">
            <input
              checked={isAdultChecked}
              type="checkbox"
              onChange={(event) => setIsAdultChecked(event.target.checked)}
            />
            <span>{legalT("adult")}</span>
          </label>
          <label className="legal-check">
            <input
              checked={isMeetupChecked}
              type="checkbox"
              onChange={(event) => setIsMeetupChecked(event.target.checked)}
            />
            <span>{legalT("meetup")}</span>
          </label>
          <label className="legal-check">
            <input
              checked={isNavigationChecked}
              type="checkbox"
              onChange={(event) => setIsNavigationChecked(event.target.checked)}
            />
            <span>{legalT("navigation")}</span>
          </label>
        </div>

        <p className="legal-note">{legalT("note")}</p>
        <div className="button-row">
          <button
            className="primary-button"
            disabled={!canAccept}
            type="button"
            onClick={handleAccept}
          >
            {legalT("accept")}
          </button>
          <Link className="ghost-button legal-link-button" href={`/${locale}/privacy`}>
            {legalT("learnMore")}
          </Link>
        </div>
      </section>
    </div>
  );
}
