import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type PageProps = { params: { id: string } };

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = params;

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white px-6 py-6">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Project {id}</h1>
          <p className="text-sm text-gray-400">
            Project detail stub (placeholders).
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm rounded-lg bg-[#2A6CF6] hover:bg-[#1E5BB8]">
            Edit
          </button>
          <button className="px-3 py-1.5 text-sm rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700">
            Duplicate
          </button>
          <button className="px-3 py-1.5 text-sm rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700">
            Add to Compilation
          </button>
        </div>
      </header>

      {/* Tabs (UI only) */}
      <Tabs defaultValue="transcript" className="w-full">
        <TabsList className="bg-[#0F172A] border border-gray-800">
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="clips">Clips</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <TabsContent value="transcript" className="outline-none">
            <section aria-label="Transcript" className="space-y-2">
              <h2 className="text-base font-semibold">Transcript</h2>
              <div className="h-48 rounded-lg border border-dashed border-gray-700 bg-[#0F172A] grid place-items-center text-gray-500">
                (Transcript placeholder)
              </div>
            </section>
          </TabsContent>

          <TabsContent value="clips" className="outline-none">
            <section aria-label="Clips" className="space-y-2">
              <h2 className="text-base font-semibold">Clips</h2>
              <div className="h-48 rounded-lg border border-dashed border-gray-700 bg-[#0F172A] grid place-items-center text-gray-500">
                (Clips placeholder)
              </div>
            </section>
          </TabsContent>

          <TabsContent value="timeline" className="outline-none">
            <section aria-label="Timeline" className="space-y-2">
              <h2 className="text-base font-semibold">Timeline</h2>
              <div className="h-48 rounded-lg border border-dashed border-gray-700 bg-[#0F172A] grid place-items-center text-gray-500">
                (Timeline placeholder)
              </div>
            </section>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
