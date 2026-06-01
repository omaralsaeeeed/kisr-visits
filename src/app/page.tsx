"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLang } from "@/lib/lang-context";

export default function Home() {
  const { t } = useLang();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#00543D] via-[#006b4f] to-[#004d39] text-white px-4 py-20 sm:py-32 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-3xl mx-auto flex flex-col items-center gap-6">
          <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm px-4 py-1 rounded-full">
            {t.hero.badge}
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-xl leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link href="/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-white text-[#00543D] hover:bg-gray-100 font-semibold shadow-lg"
              >
                {t.hero.cta}
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/50 text-white hover:bg-white/10"
            >
              {t.hero.learnMore}
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {t.features.map((feature, i) => (
            <Card key={i} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00543D]/10 flex items-center justify-center text-[#00543D] font-bold text-lg">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#00543D]/5 border-t border-[#00543D]/10 px-4 py-12 text-center">
        <div className="max-w-xl mx-auto flex flex-col gap-4 items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t.hero.title}</h2>
          <p className="text-gray-500 text-sm">{t.hero.subtitle}</p>
          <Link href="/register">
            <Button className="bg-[#00543D] hover:bg-[#003d2d] text-white px-8">
              {t.hero.cta}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
