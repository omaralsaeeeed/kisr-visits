"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLang } from "@/lib/lang-context";

function ConfirmationContent() {
  const { t } = useLang();
  const params = useSearchParams();

  const details = [
    { label: t.form.schoolName, value: params.get("schoolName") },
    { label: t.form.gradeLevel, value: params.get("gradeLevel") },
    { label: t.form.studentCount, value: params.get("studentCount") },
    { label: t.form.supervisorCount, value: params.get("supervisorCount") },
    { label: t.form.visitDate, value: params.get("visitDate") },
    { label: t.form.visitTime, value: params.get("visitTime") },
    { label: t.form.department, value: params.get("department") },
    { label: t.form.contactName, value: params.get("contactName") },
    { label: t.form.contactPhone, value: params.get("contactPhone") },
    { label: t.form.contactEmail, value: params.get("contactEmail") },
  ].filter((d) => d.value);

  return (
    <div className="max-w-xl mx-auto px-4 py-16 flex flex-col items-center gap-6">
      {/* Success Icon */}
      <div className="w-20 h-20 rounded-full bg-[#52d3aa]/15 flex items-center justify-center">
        <svg className="w-10 h-10 text-[#52d3aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div className="text-center flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-[#2b3992]">{t.confirmation.title}</h1>
        <p className="text-gray-500">{t.confirmation.subtitle}</p>
      </div>

      {/* Details Card */}
      <Card className="w-full border border-gray-100 shadow-md">
        <CardHeader className="pb-2 border-b border-gray-50">
          <CardTitle className="text-base text-[#2b3992]">{t.confirmation.details}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 pt-4">
          {details.map((d, i) => (
            <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0">
              <span className="text-sm text-gray-500">{d.label}</span>
              <span className="text-sm font-medium text-gray-900">{d.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Link href="/" className="flex-1">
          <Button variant="outline" className="w-full border-[#2b3992] text-[#2b3992]">
            {t.confirmation.backHome}
          </Button>
        </Link>
        <Link href="/register" className="flex-1">
          <Button className="w-full bg-[#52d3aa] hover:bg-[#3bbf97] text-white border-0">
            {t.confirmation.newVisit}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  );
}
