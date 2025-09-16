"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function UploadPage() {
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const startLinkProcessing = async () => {
    if (!url.trim()) {
      toast.error("Paste a YouTube link first.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/uploads/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceType: "youtube",
          url,
          options: {
            language: "en",
            clipCount: 5,
            subtitleStyle: "default",
            exportSize: "1080x1920",
            generateTrailer: false,
            indexForCompilations: true,
          },
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data?.error || data?.message || `Init failed (${res.status})`;
        throw new Error(msg);
      }

      toast.success("Processing started");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.message ?? JSON.stringify(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Upload</h1>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste a YouTube / Twitch / Rumble link"
        className="w-full p-2 rounded bg-gray-800 mb-2"
      />
      <button
        onClick={startLinkProcessing}
        disabled={isSubmitting}
        className="bg-blue-600 px-4 py-2 rounded text-white disabled:opacity-60"
      >
        {isSubmitting ? "Starting..." : "Start Processing"}
      </button>

      {/* File path will be wired next step */}
      <div className="mt-8 text-sm opacity-70">
        File uploads wired next step…
      </div>
    </div>
  );
}
