"use client";

type Project = {
  id: string;
  title: string;
  status: string;
  duration: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="p-4 bg-neutral-800 rounded-lg mb-2">
      <h2 className="text-lg font-semibold">{project.title}</h2>
      <p className="text-sm text-gray-400">Status: {project.status}</p>
      <p className="text-sm text-gray-400">Duration: {project.duration}</p>
    </div>
  );
}
