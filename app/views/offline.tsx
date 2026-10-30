import type { Locale } from "@/app/i18n";

const copy = {
  en: {
    h1: "You seem to be offline",
    text: "Please check your internet connection and try again.",
  },
  nl: {
    h1: "Je lijkt offline te zijn",
    text: "Controleer je internetverbinding en probeer het opnieuw.",
  },
};

export function Offline({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">{c.h1}</h1>
      <p className="mb-4">{c.text}</p>
    </section>
  );
}
