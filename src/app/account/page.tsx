"use client";
import { FadeIn, Stagger, Item, LiftHover } from "../components/anim";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AccountPage() {
  return (
    <div className="space-y-4">
      <Stagger>
        {/* Profile */}
        <Item>
          <LiftHover>
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-semibold">Profile</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Display name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="mt-1 bg-white/5"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@domain.com"
                    className="mt-1 bg-white/5"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Save changes
                </Button>
              </div>
            </section>
          </LiftHover>
        </Item>

        {/* Connected Accounts */}
        <Item>
          <LiftHover>
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-semibold">Connected accounts</h2>
              <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
                <div>
                  <div className="text-sm font-medium">TikTok</div>
                  <div className="text-xs text-zinc-400">Not connected</div>
                </div>
                <Button variant="secondary">Connect</Button>
              </div>
            </section>
          </LiftHover>
        </Item>

        {/* Billing */}
        <Item>
          <LiftHover>
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-semibold">Billing</h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-zinc-400">Plan</div>
                  <div className="text-base font-medium">Starter</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-zinc-400">Renewal</div>
                  <div className="text-base font-medium">—</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-zinc-400">Seats</div>
                  <div className="text-base font-medium">1</div>
                </div>
              </div>
              <div className="mt-4">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Manage billing
                </Button>
              </div>
            </section>
          </LiftHover>
        </Item>
      </Stagger>
    </div>
  );
}
