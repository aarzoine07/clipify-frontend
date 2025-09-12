import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/providers/query-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cliply - AI-Powered Video Clipping",
  description: "Transform long videos into engaging vertical clips with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
        <Toaster theme="dark" />
      </body>
    </html>
  );
}
