"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function UploadPage() {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleProcess = async () => {
    try {
      const res = await fetch("/api/uploads/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: url }),
      });

      const data = await res.json();
      if (!res.ok) throw data;

      toast.success("Processing started!");
    } catch (err: any) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(JSON.stringify(err));
      }
    }
  };

  const handleFileUpload = async () => {
    if (!file) return toast.error("No file selected");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/uploads/complete", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw data;

      toast.success("File uploaded successfully!");
    } catch (err: any) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(JSON.stringify(err));
      }
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Upload</h1>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube URL"
        className="w-full p-2 rounded bg-gray-800 mb-2"
      />
      <button
        onClick={handleProcess}
        className="bg-blue-600 px-4 py-2 rounded text-white mb-4"
      >
        Start Processing
      </button>

      <div>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-2"
        />
        <button
          onClick={handleFileUpload}
          className="bg-green-600 px-4 py-2 rounded text-white"
        >
          Upload File
        </button>
      </div>
    </div>
  );
}
