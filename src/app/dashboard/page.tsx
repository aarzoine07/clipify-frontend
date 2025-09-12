"use client";

import { HeroUpload } from "@/components/dashboard/HeroUpload";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ProjectFilters } from "@/components/dashboard/ProjectFilters";
import { ProjectsGrid } from "@/components/dashboard/ProjectsGrid";
import { StorageCredits } from "@/components/dashboard/StorageCredits";
import { LearningRow } from "@/components/dashboard/LearningRow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-slate-200">
      <div className="px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-200 mb-2">
              Dashboard
            </h1>
            <p className="text-slate-400">
              Welcome back! Here's what's happening with your clips.
            </p>
          </div>
          <StorageCredits />
        </div>

        {/* Hero Upload Section */}
        <div className="mb-8">
          <HeroUpload />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActions />
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <SectionTitle
            title="Your Projects"
            subtitle="Manage and review your video clips"
          />
          <div className="mb-6">
            <ProjectFilters />
          </div>
          <ProjectsGrid />
        </div>

        {/* Learning Section */}
        <div className="mb-8">
          <LearningRow />
        </div>

        {/* Help Button */}
        <div className="fixed bottom-6 right-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full w-12 h-12 bg-[#2A6CF6] hover:bg-[#2A6CF6]/90">
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">Help & Support</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0F172A] border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-slate-200">Questions?</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-slate-400">Get help with Cliply:</p>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-300"
                  >
                    📚 Documentation
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-300"
                  >
                    💬 Live Chat
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-300"
                  >
                    📧 Email Support
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
