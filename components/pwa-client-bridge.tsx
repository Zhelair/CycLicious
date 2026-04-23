"use client";

import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";

import {appDb} from "../lib/db/app-db";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{outcome: "accepted" | "dismissed"; platform: string}>;
};

export function PwaClientBridge() {
  const installT = useTranslations("installPrompt");
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(
    null
  );
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const isLocalDevHost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if ("serviceWorker" in navigator) {
      if (isLocalDevHost) {
        void navigator.serviceWorker
          .getRegistrations()
          .then((registrations) =>
            Promise.all(registrations.map((registration) => registration.unregister()))
          );
      } else {
        void navigator.serviceWorker.register("/sw.js");
      }
    }

    const standaloneMatch = window.matchMedia("(display-mode: standalone)");

    const syncInstalledState = () => {
      setIsInstalled(standaloneMatch.matches);
    };

    syncInstalledState();

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setInstallEvent(null);
    };

    const loadDismissal = async () => {
      const saved = await appDb.uiPreferences.get("install-prompt-dismissed");

      if (saved?.value === "true") {
        setIsDismissed(true);
      }
    };

    void loadDismissal();
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);
    standaloneMatch.addEventListener("change", syncInstalledState);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
      standaloneMatch.removeEventListener("change", syncInstalledState);
    };
  }, []);

  async function dismissPrompt() {
    setIsDismissed(true);
    await appDb.uiPreferences.put({
      key: "install-prompt-dismissed",
      value: "true",
      updatedAt: Date.now()
    });
  }

  async function triggerInstall() {
    if (!installEvent) {
      return;
    }

    await installEvent.prompt();
    const result = await installEvent.userChoice;

    if (result.outcome === "accepted") {
      setIsInstalled(true);
      setInstallEvent(null);
      return;
    }

    await dismissPrompt();
  }

  if (!installEvent || isDismissed || isInstalled) {
    return null;
  }

  return (
    <aside className="install-card shell-card">
      <div>
        <strong>{installT("title")}</strong>
        <p>{installT("body")}</p>
      </div>
      <div className="button-row">
        <button className="primary-button" type="button" onClick={triggerInstall}>
          {installT("install")}
        </button>
        <button className="ghost-button" type="button" onClick={dismissPrompt}>
          {installT("later")}
        </button>
      </div>
    </aside>
  );
}
