import Link from "next/link";

import {locales, type Locale} from "../lib/i18n/config";

type LocaleSwitcherProps = {
  locale: Locale;
};

export function LocaleSwitcher({locale}: LocaleSwitcherProps) {
  return (
    <nav className="locale-switcher" aria-label="Language switcher">
      {locales.map((item) => (
        <Link
          className={item === locale ? "active" : ""}
          href={`/${item}`}
          key={item}
        >
          {item.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
