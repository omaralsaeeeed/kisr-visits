"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLang } from "@/lib/lang-context";
import { supabase } from "@/lib/supabase";

type Visit = {
  school_name: string;
  grade_level: string;
  student_count: number;
  supervisor_count: number;
  visit_date: string;
  visit_time: string;
  department: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
};

function ConfirmationContent() {
  const { t } = useLang();
  const params = useSearchParams();
  const id = params.get("id");
  const [visit, setVisit] = useState<Visit | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) { setNotFound(true); setLoading(false); return; }
    supabase
      .from("visits")
      .select("school_name,grade_level,student_count,supervisor_count,visit_date,visit_time,department,contact_name,contact_phone,contact_email")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) setNotFound(true);
        else setVisit(data as Visit);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#52d3aa] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !visit) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">{t.lang === "ar" ? "لم يُعثر على الطلب." : "Request not found."}</p>
        <Link href="/register"><Button className="mt-4 bg-[#2b3992] text-white">{t.confirmation.newVisit}</Button></Link>
      </div>
    );
  }

  const details = [
    { label: t.form.schoolName, value: visit.school_name },
    { label: t.form.gradeLevel, value: visit.grade_level },
    { label: t.form.studentCount, value: String(visit.student_count) },
    { label: t.form.supervisorCount, value: String(visit.supervisor_count) },
    { label: t.form.visitDate, value: visit.visit_date },
    { label: t.form.visitTime, value: visit.visit_time },
    { label: t.form.department, value: visit.department },
    { label: t.form.contactName, value: visit.contact_name },
    { label: t.form.contactPhone, value: visit.contact_phone },
    { label: t.form.contactEmail, value: visit.contact_email },
  ];

  return (
    <div className="max-w-xl mx-auto px-4 py-16 flex flex-col items-center gap-6">
      <div className="w-20 h-20 rounded-full bg-[#52d3aa]/15 flex items-center justify-center">
        <svg className="w-10 h-10 text-[#52d3aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div className="text-center flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-[#2b3992]">{t.confirmation.title}</h1>
        <p className="text-gray-500">{t.confirmation.subtitle}</p>
      </div>

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
          <Button variant="outline" className="w-full border-[#2b3992] text-[#2b3992]">{t.confirmation.backHome}</Button>
        </Link>
        <Link href="/register" className="flex-1">
          <Button className="w-full bg-[#52d3aa] hover:bg-[#3bbf97] text-white border-0">{t.confirmation.newVisit}</Button>
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return <Suspense><ConfirmationContent /></Suspense>;
}
