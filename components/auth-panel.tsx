"use client";

import {useEffect, useMemo, useState} from "react";
import {useTranslations} from "next-intl";

import {getSupabaseBrowserClient} from "../lib/supabase/browser";

function formatAccountLabel(email: string | null, fallback: string) {
  if (!email) {
    return fallback;
  }

  const [localPart] = email.split("@");

  return localPart.length > 14 ? `${localPart.slice(0, 14)}...` : localPart;
}

export function AuthPanel() {
  const authT = useTranslations("auth");
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let isCancelled = false;

    void supabase.auth.getSession().then(({data}) => {
      if (!isCancelled) {
        setSessionEmail(data.session?.user.email ?? null);
      }
    });

    const {
      data: {subscription}
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSessionEmail(session?.user.email ?? null);

      if (event === "SIGNED_IN") {
        setStatusMessage(authT("signedIn"));
        setIsOpen(false);
      }

      if (event === "SIGNED_OUT") {
        setStatusMessage(authT("signedOut"));
      }
    });

    return () => {
      isCancelled = true;
      subscription.unsubscribe();
    };
  }, [authT, supabase]);

  async function handleSendLink() {
    if (!supabase || !email.trim() || isSending) {
      return;
    }

    setIsSending(true);
    setStatusMessage("");

    const {error} = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo:
          typeof window === "undefined" ? undefined : window.location.href
      }
    });

    if (error) {
      setStatusMessage(error.message);
    } else {
      setStatusMessage(authT("checkInbox"));
      setEmail("");
    }

    setIsSending(false);
  }

  async function handleSignOut() {
    if (!supabase || isSigningOut) {
      return;
    }

    setIsSigningOut(true);
    const {error} = await supabase.auth.signOut();

    if (error) {
      setStatusMessage(error.message);
    }

    setIsSigningOut(false);
  }

  const accountLabel = formatAccountLabel(sessionEmail, authT("account"));

  return (
    <div className="auth-panel">
      <button
        aria-expanded={isOpen}
        className={`header-link auth-trigger ${sessionEmail ? "is-active" : ""}`}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
      >
        {sessionEmail ? accountLabel : authT("signIn")}
      </button>

      {isOpen ? (
        <section className="auth-card shell-card">
          <div className="panel-header">
            <div>
              <h2>{authT("title")}</h2>
              <p>{authT("subtitle")}</p>
            </div>
            <span className="status-chip accent-chip">
              {sessionEmail ? authT("live") : authT("magicLink")}
            </span>
          </div>

          {!supabase ? (
            <p className="field-note auth-note">{authT("unavailable")}</p>
          ) : sessionEmail ? (
            <>
              <div className="auth-session-card">
                <span>{authT("signedInAs")}</span>
                <strong>{sessionEmail}</strong>
              </div>
              <div className="button-row auth-actions">
                <button
                  className="primary-button"
                  disabled={isSigningOut}
                  type="button"
                  onClick={handleSignOut}
                >
                  {isSigningOut ? authT("signingOut") : authT("signOut")}
                </button>
              </div>
            </>
          ) : (
            <>
              <label className="auth-field">
                <span>{authT("emailLabel")}</span>
                <input
                  autoComplete="email"
                  className="auth-input"
                  placeholder={authT("emailPlaceholder")}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <div className="button-row auth-actions">
                <button
                  className="primary-button"
                  disabled={!email.trim() || isSending}
                  type="button"
                  onClick={handleSendLink}
                >
                  {isSending ? authT("sendingLink") : authT("sendLink")}
                </button>
              </div>
            </>
          )}

          {statusMessage ? <p className="field-note auth-note">{statusMessage}</p> : null}
        </section>
      ) : null}
    </div>
  );
}
