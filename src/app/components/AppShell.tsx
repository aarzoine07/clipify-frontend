"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  Folder,
  Upload,
  Calendar,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
} from "lucide-react";
import { RouteTransition } from "./RouteTransition";
import { motion } from "framer-motion";

type NavItem = { href: string; label: string; icon: React.ElementType };

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/projects", label: "Projects", icon: Folder },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/account", label: "Account", icon: User },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [collapsed, setCollapsed] = useState(false);

  // Sidebar "open" controls visibility (hidden by default on home)
  const [open, setOpen] = useState(!isHome);

  // hovering the edge reveals the sidebar
  const [hoveringEdge, setHoveringEdge] = useState(false);

  useEffect(() => {
    // When navigating away from home, show sidebar by default
    setOpen(!isHome);
  }, [isHome]);

  // Cmd/Ctrl + B toggles sidebar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setOpen((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const title = useMemo(() => {
    const hit = NAV.find((n) => pathname?.startsWith(n.href));
    return hit ? hit.label : "Clipify";
  }, [pathname]);

  // widths for animation
  const expandedW = 220;
  const collapsedW = 64;

  return (
    <>
      {/* Hover edge to reveal sidebar when hidden */}
      <div
        onMouseEnter={() => setHoveringEdge(true)}
        onMouseLeave={() => setHoveringEdge(false)}
        className={cn(
          "fixed left-0 top-[5.5rem] z-40 h-[calc(100dvh-5.5rem)]",
          "transition-[width,opacity]",
          open ? "w-0 opacity-0" : "w-2 opacity-100"
        )}
      />

      {/* Floating button to toggle sidebar when hidden */}
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          className="fixed left-4 bottom-6 z-40 bg-purple-600 hover:bg-purple-700"
          size="sm"
        >
          <Menu className="mr-2 h-4 w-4" />
          Menu
        </Button>
      )}

      {/* Click backdrop (home only) when sidebar is open as an overlay */}
      {isHome && open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px]"
        />
      )}

      <div className="relative mx-auto flex min-h-[calc(100dvh-3.5rem)] w-full max-w-6xl gap-4 px-4 py-6">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{
            width: open ? (collapsed ? collapsedW : expandedW) : 0,
            opacity: open ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className={cn(
            "sticky top-[5.5rem] z-40 h-fit overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur",
            isHome && open ? "shadow-2xl ring-1 ring-purple-500/30" : ""
          )}
          onMouseLeave={() => hoveringEdge && setOpen(false)}
        >
          <div className="flex items-center justify-between px-2 py-1">
            {!collapsed && (
              <div className="text-sm font-semibold opacity-90">Navigation</div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setCollapsed((s) => !s)}
              aria-label="Toggle collapse"
              title="Collapse/expand"
            >
              {collapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </Button>
          </div>

          <nav className="mt-1 space-y-1">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = pathname?.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "group flex items-center rounded-xl px-2 py-2 text-sm transition-all",
                    "hover:bg-white/10",
                    active ? "bg-purple-500/15 ring-1 ring-purple-500/30" : ""
                  )}
                >
                  <Icon className="mr-2 h-4 w-4 text-zinc-300 group-hover:text-zinc-100" />
                  {!collapsed && <span>{label}</span>}
                </Link>
              );
            })}
          </nav>

          {!collapsed && (
            <div className="mt-3 px-1">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                New Project
              </Button>
            </div>
          )}
        </motion.aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {/* Topbar */}
          <header className="sticky top-[5.5rem] z-10 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold">{title}</h1>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <span className="hidden sm:inline">Workspace</span>
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-500" />
              </div>
            </div>
          </header>

          {/* Page body with transition */}
          <RouteTransition>{children}</RouteTransition>
        </div>
      </div>
    </>
  );
}
