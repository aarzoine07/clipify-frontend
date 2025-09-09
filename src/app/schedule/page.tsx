import { FadeIn, Stagger, Item, Shimmer } from "../components/anim";

export default function SchedulePage() {
  return (
    <div className="space-y-4">
      <FadeIn>
        <p className="text-sm text-zinc-300">
          Your scheduled TikTok posts will appear here.
        </p>
      </FadeIn>
      <Stagger>
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <Item key={i}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">
                      Scheduled post #{i + 1}
                    </div>
                    <div className="text-xs text-zinc-400">
                      Tomorrow · 3:00 PM • @account
                    </div>
                  </div>
                  <div className="rounded-full border border-white/10 px-2 py-1 text-xs opacity-80">
                    Queued
                  </div>
                </div>
              </div>
            </Item>
          ))}
        </div>
      </Stagger>
    </div>
  );
}
