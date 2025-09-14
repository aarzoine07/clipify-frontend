'use client'

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-[#0F172A] text-white flex flex-col p-4">
      <h1 className="text-xl font-bold mb-6">Sidebar</h1>
      <nav className="flex flex-col space-y-2">
        <Link href="/dashboard" className="hover:bg-white/10 rounded px-3 py-2">
          Dashboard
        </Link>
        <Link href="/projects" className="hover:bg-white/10 rounded px-3 py-2">
          Projects
        </Link>
        <Link href="/upload" className="hover:bg-white/10 rounded px-3 py-2">
          Upload
        </Link>
        <Link href="/schedule" className="hover:bg-white/10 rounded px-3 py-2">
          Schedule
        </Link>
        <Link href="/tutorials" className="hover:bg-white/10 rounded px-3 py-2">
          Tutorials
        </Link>
      </nav>
    </div>
  );
}
