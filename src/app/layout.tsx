import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";
import ClientLayout from "@/components/ClientLayout";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "تسجيل الزيارات المدرسية | معهد الكويت للأبحاث العلمية",
  description: "سجّل زيارتك المدرسية لمعهد الكويت للأبحاث العلمية",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-gray-50 antialiased">
        <LangProvider>
          <ClientLayout>{children}</ClientLayout>
        </LangProvider>
      </body>
    </html>
  );
}
