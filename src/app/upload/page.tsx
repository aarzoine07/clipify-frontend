"use client";
import { FadeIn, LiftHover } from "../components/anim";
import { useState } from "react";
import { Upload } from "lucide-react";

export default function UploadPage() {
  const [hover, setHover] = useState(false);

  return (
    <FadeIn>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setHover(true);
        }}
        onDragLeave={() => setHover(false)}
        className="rounded-2xl border border-dashed border-white/15 p-10 text-center"
      >
        <LiftHover>
          <div
            className={`mx-auto grid max-w-xl place-items-center gap-3 rounded-xl p-8 ${
              hover ? "ring-2 ring-purple-500/50 bg-purple-500/5" : "bg-white/5"
            }`}
          >
            <Upload className="h-7 w-7 opacity-80" />
            <div className="text-sm text-zinc-300">
              Drag & drop a long-form video here
            </div>
            <div className="text-xs text-zinc-400">
              MP4 / MOV up to 2GB • We’ll transcode to 1080×1920
            </div>
          </div>
        </LiftHover>
      </div>
    </FadeIn>
  );
}
