"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLang } from "@/lib/lang-context";

export default function RegisterPage() {
  const { t } = useLang();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    try {
      const params = new URLSearchParams(form as Record<string, string>);
      router.push(`/confirmation?${params.toString()}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-[#00543D]">{t.form.title}</CardTitle>
          <CardDescription>{t.form.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* School Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="schoolName">{t.form.schoolName} *</Label>
                <Input
                  id="schoolName"
                  required
                  placeholder={t.form.schoolNamePlaceholder}
                  value={form.schoolName}
                  onChange={set("schoolName")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>{t.form.gradeLevel} *</Label>
                <Select
                  required
                  value={form.gradeLevel}
                  onValueChange={(v) => setForm((p) => ({ ...p, gradeLevel: v }))}
                >
                  <SelectTrigger>
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

            {/* Counts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="studentCount">{t.form.studentCount} *</Label>
                <Input
                  id="studentCount"
                  type="number"
                  min="1"
                  required
                  placeholder={t.form.studentCountPlaceholder}
                  value={form.studentCount}
                  onChange={set("studentCount")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="supervisorCount">{t.form.supervisorCount} *</Label>
                <Input
                  id="supervisorCount"
                  type="number"
                  min="1"
                  required
                  placeholder={t.form.supervisorCountPlaceholder}
                  value={form.supervisorCount}
                  onChange={set("supervisorCount")}
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="visitDate">{t.form.visitDate} *</Label>
                <Input
                  id="visitDate"
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={form.visitDate}
                  onChange={set("visitDate")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="visitTime">{t.form.visitTime} *</Label>
                <Input
                  id="visitTime"
                  type="time"
                  required
                  value={form.visitTime}
                  onChange={set("visitTime")}
                />
              </div>
            </div>

            {/* Department */}
            <div className="flex flex-col gap-2">
              <Label>{t.form.department} *</Label>
              <Select
                required
                value={form.department}
                onValueChange={(v) => setForm((p) => ({ ...p, department: v }))}
              >
                <SelectTrigger>
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
            <div className="flex flex-col gap-2">
              <Label htmlFor="purpose">{t.form.purpose} *</Label>
              <Textarea
                id="purpose"
                required
                rows={3}
                placeholder={t.form.purposePlaceholder}
                value={form.purpose}
                onChange={set("purpose")}
              />
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="contactName">{t.form.contactName} *</Label>
                <Input
                  id="contactName"
                  required
                  placeholder={t.form.contactNamePlaceholder}
                  value={form.contactName}
                  onChange={set("contactName")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contactPhone">{t.form.contactPhone} *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  required
                  placeholder={t.form.contactPhonePlaceholder}
                  value={form.contactPhone}
                  onChange={set("contactPhone")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="contactEmail">{t.form.contactEmail} *</Label>
              <Input
                id="contactEmail"
                type="email"
                required
                placeholder={t.form.contactEmailPlaceholder}
                value={form.contactEmail}
                onChange={set("contactEmail")}
              />
            </div>

            <p className="text-xs text-gray-400">{t.form.required}</p>

            <Button
              type="submit"
              disabled={loading}
              className="bg-[#00543D] hover:bg-[#003d2d] text-white w-full py-6 text-base font-semibold"
            >
              {loading ? t.form.submitting : t.form.submit}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
