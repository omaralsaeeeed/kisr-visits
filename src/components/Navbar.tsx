"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/lang-context";

export default function Navbar() {
  const { t, lang, toggle } = useLang();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#00543D] flex items-center justify-center text-white text-xs font-bold">
            K
          </div>
          <span className="font-semibold text-[#00543D] text-sm hidden sm:block">
            {t.hero.badge}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm">{t.nav.home}</Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="bg-[#00543D] hover:bg-[#003d2d] text-white">
              {t.nav.register}
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={toggle}>
            {t.nav.switchLang}
          </Button>
        </div>
      </div>
    </nav>
  );
}
