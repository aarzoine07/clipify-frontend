"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Upload, HardDrive } from "lucide-react";
import { toast } from "sonner";

export function HeroUpload() {
  const [url, setUrl] = useState("");

  const handleGetClips = () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }
    toast.success("Queued! Check Ready to Review soon.");
    setUrl("");
  };

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = () => {
      toast.success("Upload queued! Processing will begin shortly.");
    };
    input.click();
  };

  const handleGoogleDrive = () => {
    toast.info("Google Drive integration coming soon!");
  };

  const handleSampleProject = () => {
    toast.info("Loading sample project...");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGetClips();
    }
  };

  return (
    <Card className="bg-[#0F172A] border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        {/* URL Input */}
        <div className="w-full max-w-md">
          <div className="relative">
            <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Drop a Zoom/YouTube link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 bg-slate-800/50 border-slate-600 text-slate-200 placeholder:text-slate-400 focus:border-[#2A6CF6] focus:ring-[#2A6CF6] h-12"
              aria-label="Video URL input"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button
            variant="outline"
            onClick={handleUpload}
            className="bg-slate-800/50 border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-slate-500"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>

          <Button
            variant="outline"
            onClick={handleGoogleDrive}
            className="bg-slate-800/50 border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-slate-500"
          >
            <HardDrive className="mr-2 h-4 w-4" />
            Google Drive
          </Button>
        </div>

        {/* Primary CTA */}
        <Button
          onClick={handleGetClips}
          className="bg-[#2A6CF6] hover:bg-[#2A6CF6]/90 text-white font-medium px-8 py-3 text-lg h-auto"
        >
          Get clips in 1 click
        </Button>

        {/* Sample Project Link */}
        <button
          onClick={handleSampleProject}
          className="text-slate-400 hover:text-slate-300 underline text-sm transition-colors"
        >
          Click here to try a sample project
        </button>
      </div>
    </Card>
  );
}
