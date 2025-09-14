// src/app/tutorials/page.tsx
export default function TutorialsPage() {
  const topics = [
    "Intro to Cliply",
    "Uploading videos",
    "Library & search",
    "Projects overview",
    "Light clip editor",
    "Captions & presets",
    "Narrative Trailer",
    "Theme Compilations",
    "Scheduling calendar",
    "Analytics basics",
    "Queue health",
    "TikTok connect",
    "Brand presets",
    "Workspace & billing",
  ];

  return (
    <section className="space-y-6">
      <h1 className="text-xl font-semibold">Help / Tutorials</h1>
      <p className="text-sm text-slate-400">
        14 topics — video walkthroughs coming soon.
      </p>

      <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((t) => (
          <li
            key={t}
            className="rounded-2xl border border-slate-800/60 bg-[#0F172A] p-4 text-sm text-slate-200"
          >
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}
