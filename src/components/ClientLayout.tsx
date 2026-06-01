"use client";

import { useLang } from "@/lib/lang-context";
import Navbar from "./Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { lang, t } = useLang();

  return (
    <div dir={t.dir} lang={lang} className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="bg-[#00543D] text-white py-6 px-4 text-center text-sm">
        <p>© {new Date().getFullYear()} {t.footer.kisr} — {t.footer.rights}</p>
      </footer>
    </div>
  );
}
