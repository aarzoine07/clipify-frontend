import Link from "next/link";

type Props = {
  id: string;
  title?: string;
  status?: "Draft" | "Ready" | "Posted";
};

export default function ProjectCard({
  id,
  title = `Project ${id}`,
  status = "Draft",
}: Props) {
  const statusClasses =
    status === "Posted"
      ? "text-emerald-300 bg-emerald-900/15"
      : status === "Ready"
      ? "text-yellow-300 bg-yellow-900/15"
      : "text-gray-300 bg-gray-800/40";

  return (
    <Link
      href={`/projects/${id}`}
      aria-label={`Open ${title}`}
      className={[
        // container: no border, subtle hover lift on dark bg
        "group block rounded-2xl bg-transparent transition-all",
        "hover:bg-gray-900/30 hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A6CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F1A]",
      ].join(" ")}
    >
      {/* Thumb */}
      <div className="aspect-video rounded-xl overflow-hidden relative bg-[#0F172A]">
        {/* soft gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-transparent to-[#1E293B] opacity-80" />
        {/* placeholder mark */}
        <div className="absolute inset-0 grid place-items-center text-gray-500 text-xs">
          (thumbnail)
        </div>
      </div>

      {/* Meta */}
      <div className="px-2.5 py-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-medium truncate">{title}</h3>
          <span
            className={[
              "text-[10px] px-2 py-0.5 rounded-full",
              "tracking-wide",
              statusClasses,
            ].join(" ")}
          >
            {status}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-gray-500">Updated —</p>
      </div>
    </Link>
  );
}
