"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/lang-context";

export default function Navbar() {
  const { t, toggle } = useLang();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/kisr-logo.png"
            alt="KISR Logo"
            width={120}
            height={40}
            style={{ width: "auto", height: "40px" }}
            className="object-contain"
            priority
          />
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/" className="hidden sm:block">
            <Button variant="ghost" size="sm" className="text-[#2b3992] hover:text-[#2b3992] hover:bg-[#2b3992]/10">
              {t.nav.home}
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="bg-[#52d3aa] hover:bg-[#3bbf97] text-white font-medium">
              {t.nav.register}
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={toggle}
            className="border-[#2b3992] text-[#2b3992] hover:bg-[#2b3992] hover:text-white"
          >
            {t.nav.switchLang}
          </Button>
        </div>
      </div>
    </nav>
  );
}
