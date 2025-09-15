import "./globals.css";
import type { ReactNode } from "react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <div className="flex min-h-screen">
          {/* Left column: sidebar */}
          <aside className="w-64 shrink-0 border-r border-slate-800 bg-slate-900">
            <Sidebar />
          </aside>

          {/* Right column: topbar + page */}
          <div className="flex-1 flex flex-col">
            <Topbar title="Home" />
            <main className="flex-1">{children}</main>
          </div>
        </div>

        {/* toast provider */}
        <Toaster />
      </body>
    </html>
  );
}
