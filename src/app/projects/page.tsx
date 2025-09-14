"use client";

export default function ProjectsPage() {
  const MOCK_PROJECTS = [
    {
      id: "1",
      title: "Podcast Ep. 12",
      status: "processing",
      duration: "01:20:33",
    },
    {
      id: "2",
      title: "Livestream AMA",
      status: "draft",
      duration: "00:48:05",
    },
    {
      id: "3",
      title: "Tutorial | React Hooks",
      status: "ready",
      duration: "00:12:44",
    },
  ];

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <ul>
        {MOCK_PROJECTS.map((project) => (
          <li key={project.id} className="mb-2">
            {project.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
