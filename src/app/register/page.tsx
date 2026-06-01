"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLang } from "@/lib/lang-context";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const { t } = useLang();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    schoolName: "",
    gradeLevel: "",
    studentCount: "",
    supervisorCount: "",
    visitDate: "",
    visitTime: "",
    department: "",
    purpose: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  });

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await supabase
        .from("visits")
        .insert({
          school_name: form.schoolName,
          grade_level: form.gradeLevel,
          student_count: parseInt(form.studentCount),
          supervisor_count: parseInt(form.supervisorCount),
          visit_date: form.visitDate,
          visit_time: form.visitTime,
          department: form.department,
          purpose: form.purpose,
          contact_name: form.contactName,
          contact_phone: form.contactPhone,
          contact_email: form.contactEmail,
        })
        .select("id")
        .single();
      if (dbError) throw dbError;
      router.push(`/confirmation?id=${data.id}`);
    } catch (err) {
      console.error("[KISR] Visit submission error:", (err as Error)?.message ?? "unknown");
      setError(t.lang === "ar" ? "حدث خطأ، يرجى المحاولة مجدداً." : "An error occurred, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#0d1b4b] via-[#1a2d6b] to-[#0a3d5c] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">

        {/* Left Panel — KISR Branding */}
        <div className="relative lg:w-2/5 bg-gradient-to-br from-[#2b3992] via-[#1a5fa8] to-[#00a0c6] p-8 sm:p-12 flex flex-col justify-between overflow-hidden">
          {/* Geometric pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.3) 20px, rgba(255,255,255,0.3) 21px),
                repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.15) 20px, rgba(255,255,255,0.15) 21px)
              `,
            }}
          />
          {/* Teal circle decoration */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#52d3aa]/20 blur-2xl" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-[#00a0c6]/20 blur-3xl" />

          <div className="relative z-10">
            <Image
              src="/kisr-logo.png"
              alt="KISR"
              width={150}
              height={50}
              className="h-12 w-auto object-contain brightness-0 invert mb-10"
            />
            <h2 className="text-white text-2xl sm:text-3xl font-bold leading-snug mb-4">
              {t.hero.title}
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Bottom stats */}
          <div className="relative z-10 mt-10 flex gap-6">
            {[
              { num: "٧", label: t.lang === "ar" ? "أقسام بحثية" : "Research Depts" },
              { num: "٥٠+", label: t.lang === "ar" ? "سنة خبرة" : "Years of Research" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-[#52d3aa] text-2xl font-bold">{s.num}</p>
                <p className="text-white/60 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-[85vh] lg:max-h-none">
          <h1 className="text-xl font-bold text-[#2b3992] mb-1">{t.form.title}</h1>
          <p className="text-gray-400 text-sm mb-6">{t.form.subtitle}</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-gray-600">{t.form.schoolName} *</Label>
                <Input required maxLength={200} placeholder={t.form.schoolNamePlaceholder} value={form.schoolName} onChange={set("schoolName")} className="h-10 text-sm border-gray-200 focus-visible:ring-[#52d3aa]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-gray-600">{t.form.gradeLevel} *</Label>
                <Select required value={form.gradeLevel} onValueChange={(v) => setForm((p) => ({ ...p, gradeLevel: v }))}>
                  <SelectTrigger className="h-10 text-sm border-gray-200">
                    <SelectValue placeholder={t.form.gradeLevelPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">{t.form.grades.primary}</SelectItem>
                    <SelectItem value="middle">{t.form.grades.middle}</SelectItem>
                    <SelectItem value="high">{t.form.grades.high}</SelectItem>
                    <SelectItem value="university">{t.form.grades.university}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-gray-600">{t.form.studentCount} *</Label>
                <Input type="number" min="1" max="1000" required placeholder={t.form.studentCountPlaceholder} value={form.studentCount} onChange={set("studentCount")} className="h-10 text-sm border-gray-200" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-gray-600">{t.form.supervisorCount} *</Label>
                <Input type="number" min="1" max="200" required placeholder={t.form.supervisorCountPlaceholder} value={form.supervisorCount} onChange={set("supervisorCount")} className="h-10 text-sm border-gray-200" />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-gray-600">{t.form.visitDate} *</Label>
                <Input type="date" required min={new Date().toISOString().split("T")[0]} value={form.visitDate} onChange={set("visitDate")} className="h-10 text-sm border-gray-200" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-gray-600">{t.form.visitTime} *</Label>
                <Input type="time" required value={form.visitTime} onChange={set("visitTime")} className="h-10 text-sm border-gray-200" />
              </div>
            </div>

            {/* Department */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-gray-600">{t.form.department} *</Label>
              <Select required value={form.department} onValueChange={(v) => setForm((p) => ({ ...p, department: v }))}>
                <SelectTrigger className="h-10 text-sm border-gray-200">
                  <SelectValue placeholder={t.form.departmentPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(t.form.departments).map(([key, val]) => (
                    <SelectItem key={key} value={key}>{val}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Purpose */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-gray-600">{t.form.purpose} *</Label>
              <Textarea required maxLength={1000} rows={2} placeholder={t.form.purposePlaceholder} value={form.purpose} onChange={set("purpose")} className="text-sm border-gray-200 resize-none" />
            </div>

            {/* Contact row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-gray-600">{t.form.contactName} *</Label>
                <Input required maxLength={100} placeholder={t.form.contactNamePlaceholder} value={form.contactName} onChange={set("contactName")} className="h-10 text-sm border-gray-200" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-gray-600">{t.form.contactPhone} *</Label>
                <Input type="tel" required maxLength={15} pattern="[0-9+\-\s]{8,15}" placeholder={t.form.contactPhonePlaceholder} value={form.contactPhone} onChange={set("contactPhone")} className="h-10 text-sm border-gray-200" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-gray-600">{t.form.contactEmail} *</Label>
              <Input type="email" required maxLength={100} placeholder={t.form.contactEmailPlaceholder} value={form.contactEmail} onChange={set("contactEmail")} className="h-10 text-sm border-gray-200" />
            </div>

            <p className="text-xs text-gray-400">{t.form.required}</p>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-11 bg-[#2b3992] hover:bg-[#1e2d7a] text-white font-semibold border-0 rounded-lg mt-1"
            >
              {loading ? t.form.submitting : t.form.submit}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
