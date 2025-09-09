import { FadeIn, Stagger, Item, Counter, LiftHover } from "../components/anim";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <FadeIn>
        <p className="text-sm text-zinc-300">
          Welcome back — here’s a snapshot of your workspace.
        </p>
      </FadeIn>

      <Stagger>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Item>
            <LiftHover>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-zinc-400">Total Projects</div>
                <div className="mt-1 text-2xl font-semibold">
                  <Counter to={0} />
                </div>
              </div>
            </LiftHover>
          </Item>
          <Item>
            <LiftHover>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-zinc-400">Queued Clips</div>
                <div className="mt-1 text-2xl font-semibold">
                  <Counter to={0} />
                </div>
              </div>
            </LiftHover>
          </Item>
          <Item>
            <LiftHover>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-zinc-400">Published</div>
                <div className="mt-1 text-2xl font-semibold">
                  <Counter to={0} />
                </div>
              </div>
            </LiftHover>
          </Item>
        </div>
      </Stagger>
    </div>
  );
}
