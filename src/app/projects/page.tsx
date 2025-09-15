"use client";

import { useState } from "react";

import ProjectCard from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// ----- mock data (keep until API is ready) -----
type ProjectStatus = "processing" | "draft" | "ready";
type StatusFilter = "all" | ProjectStatus;

type Project = {
  id: string;
  title: string;
  status: ProjectStatus;
  duration: string;
};

const MOCK_PROJECTS: Project[] = [
  { id: "1", title: "Podcast Ep. 12", status: "processing", duration: "01:20:33" },
  { id: "2", title: "Livestream AMA", status: "draft",       duration: "00:48:05" },
  { id: "3", title: "Tutorial | React Hooks", status: "ready", duration: "00:12:44" },
];

// ----- page -----
export default function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const filteredProjects = MOCK_PROJECTS.filter((p) => {
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === "all" || p.status === status;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      {/* Controls */}
      <div className="mb-6 flex gap-3 max-w-xl">
        <Input
          placeholder="Search projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-slate-900 border-slate-700"
        />

        <Select value={status} onValueChange={(v: StatusFilter) => setStatus(v)}>
          <SelectTrigger className="w-40 bg-slate-900 border-slate-700">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
