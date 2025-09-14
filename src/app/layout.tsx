// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "../components/Sidebar";

export const metadata: Metadata = {
  title: "Cliply",
  description: "Cliply MVP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0B0F1A] text-white">
        <div className="flex">
          {/* Sidebar fixed on the left */}
          <Sidebar />

          {/* Page content */}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
