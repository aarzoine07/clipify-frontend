import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Background } from "./components/Background";
import { AppShell } from "./components/AppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clipify",
  description: "AI clipping + TikTok posting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0b1020] text-zinc-100`}>
        {/* Top navbar stays as-is */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b1020]/60 backdrop-blur">
          <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
            <div className="font-semibold tracking-tight">Clipify</div>
            <nav className="text-sm opacity-90 space-x-6">
              <a href="/dashboard" className="hover:opacity-100">
                Dashboard
              </a>
              <a href="/projects" className="hover:opacity-100">
                Projects
              </a>
              <a href="/account" className="hover:opacity-100">
                Account
              </a>
            </nav>
          </div>
        </header>

        <Background />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
