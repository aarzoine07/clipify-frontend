"use client";

import { useState } from "react";
import MiniCalendar from "@/components/MiniCalendar";

export default function DashboardPage() {
  const [url, setUrl] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("URL submitted: " + url);
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      {/* Top Header with Storage/Credits */}
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-400 text-sm">
              Welcome back! Here's what's happening with your clips.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-[#2A6CF6] text-white px-3 py-1 rounded text-sm font-medium">
                ⚡ 90
              </div>
              <button className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded border border-gray-600">
                + Add more credits
              </button>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>0 GB / 100 GB</span>
              <div className="w-16 h-2 bg-gray-800 rounded-full">
                <div className="w-0 h-full bg-[#2A6CF6] rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <label className="flex items-center gap-2 text-gray-400">
                <input type="checkbox" disabled className="rounded" />
                Auto-save
              </label>
              <label className="flex items-center gap-2 text-gray-400">
                <input type="checkbox" className="rounded" />
                Auto-import{" "}
                <span className="bg-orange-600 text-orange-200 px-1 rounded text-xs">
                  Beta
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Hero Upload Card */}
        <div className="bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-[#1E293B] border border-gray-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
          <div className="relative z-10 text-center space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Drop a Zoom/YouTube link"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#2A6CF6] focus:outline-none focus:ring-1 focus:ring-[#2A6CF6]"
                />
              </div>
              <div className="flex gap-4 justify-center mt-6">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-800/70 border border-gray-600 rounded-lg text-gray-200 hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  📤 Upload
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-800/70 border border-gray-600 rounded-lg text-gray-200 hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  💾 Google Drive
                </button>
              </div>
              <button
                type="submit"
                className="mt-6 px-8 py-3 bg-[#2A6CF6] text-white rounded-lg hover:bg-[#1E5BB8] font-semibold transition-colors text-lg"
              >
                Get clips in 1 click
              </button>
            </form>
            <button className="text-gray-400 hover:text-gray-300 underline text-sm">
              Click here to try a sample project
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {[
              { icon: "✨", label: "Long to shorts" },
              { icon: "CC", label: "AI Captions" },
              { icon: "✂️", label: "Video editor" },
              { icon: "🎵", label: "Enhance speech" },
              { icon: "📺", label: "AI Reframe" },
              { icon: "🎬", label: "AI B-Roll" },
              { icon: "🎯", label: "AI hook" },
            ].map((action, i) => (
              <button
                key={i}
                className="flex flex-col items-center gap-2 p-4 bg-gray-800/30 border border-gray-700 rounded-xl hover:bg-gray-700/50 hover:border-[#2A6CF6] hover:scale-105 transition-all duration-200 min-w-[100px]"
              >
                <div className="text-2xl">{action.icon}</div>
                <span className="text-xs text-center font-medium">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <section aria-label="Projects management" className="mb-8">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "all"
                  ? "bg-[#2A6CF6] text-white"
                  : "bg-gray-800 text-gray-400 hover:text-gray-200"
              }`}
            >
              All projects (0)
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "saved"
                  ? "bg-[#2A6CF6] text-white"
                  : "bg-gray-800 text-gray-400 hover:text-gray-200"
              }`}
            >
              Saved projects (0)
            </button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-sm text-white placeholder-gray-400 focus:border-[#2A6CF6] focus:outline-none"
              />
              <select className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-sm text-white">
                <option>Newest</option>
                <option>Oldest</option>
                <option>A-Z</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-[#2A6CF6] rounded">
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                </div>
              </button>
              <button className="p-2 bg-gray-800 rounded hover:bg-gray-700">
                <div className="w-4 h-4 flex flex-col gap-1">
                  <div className="h-1 bg-gray-400 rounded"></div>
                  <div className="h-1 bg-gray-400 rounded"></div>
                  <div className="h-1 bg-gray-400 rounded"></div>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-12 text-center">
            <div className="text-gray-500 mb-4">
              <div className="w-16 h-16 mx-auto bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                📤
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-200 mb-2">
              No projects yet
            </h3>
            <p className="text-gray-400 mb-2">
              Upload your first video to get started with AI-powered clips
            </p>
            <p className="text-gray-500 text-xs">
              New uploads in progress will appear here automatically.
            </p>
            <button className="mt-4 px-6 py-2 bg-[#2A6CF6] text-white rounded-lg hover:bg-[#1E5BB8] font-medium">
              Upload Video
            </button>
          </div>
        </section>

        {/* Learning Section */}
        <section aria-label="Learning resources" className="mb-8">
          <h2 className="text-sm font-semibold mb-4 uppercase tracking-wider text-gray-400">
            Master Cliply
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Turn Any Video Into Viral Shorts in Minutes",
              "5 Top Features You Didn't Know About",
              "Make 40 YouTube Shorts In 1 Hour",
              "Edit Faster with Keyboard Shortcuts",
            ].map((title, i) => (
              <div
                key={i}
                className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-gray-600 hover:scale-105 transition-all duration-200 cursor-pointer group"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative">
                  <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-l-4 border-l-white border-y-2 border-y-transparent ml-1"></div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-medium leading-tight">{title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Processing Status Cards - Polished + Responsive */}
        <section aria-label="Processing status overview" className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">
            Processing Status
          </h2>

          {/* Single column <1024px, two columns ≥1280px */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Continue Processing */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <h2 className="text-sm font-medium">Continue Processing</h2>
                </div>
                <span className="text-xs bg-yellow-900/30 text-yellow-300 px-2 py-1 rounded">
                  0
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-3">
                Videos being processed by AI
              </p>
              <div className="text-center text-gray-500">
                <div className="w-6 h-6 border border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-xs">
                  No videos processing yet — new uploads will show here.
                </p>
              </div>
            </div>

            {/* Ready to Review */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <h2 className="text-sm font-medium">Ready to Review</h2>
                </div>
                <span className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded">
                  0
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-3">
                Clips waiting for review
              </p>
              <div className="text-center text-gray-500">
                <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center mx-auto mb-2">
                  ✓
                </div>
                <p className="text-xs">
                  No clips ready — processed clips will appear here.
                </p>
              </div>
            </div>

            {/* Trailer Ready */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <h2 className="text-sm font-medium">Trailer Ready</h2>
                </div>
                <span className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded">
                  0
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-3">
                Trailers ready to publish
              </p>
              <div className="text-center text-gray-500">
                <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center mx-auto mb-2">
                  🎬
                </div>
                <p className="text-xs">
                  No trailers yet — generated trailers will list here.
                </p>
              </div>
            </div>

            {/* Upcoming Schedule */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <h2 className="text-sm font-medium">Upcoming Schedule</h2>
                </div>
                <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded">
                  0
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-3">Publishing calendar</p>
              {/* MiniCalendar goes here */}
              <MiniCalendar />
              <p className="text-[11px] text-gray-500 mt-3">
                No scheduled posts — schedule from Projects or the Editor.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Questions Button */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-[#2A6CF6] rounded-full flex items-center justify-center hover:bg-[#1E5BB8] transition-colors shadow-lg">
        <span className="text-white text-lg font-bold">?</span>
      </button>
    </div>
  );
}
