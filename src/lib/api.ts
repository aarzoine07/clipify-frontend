import { useQuery } from "@tanstack/react-query";
import { Project } from "./types";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<Project[]> => {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json();
    },
  });
};

export const useSavedProjects = () => {
  return useQuery({
    queryKey: ["saved-projects"],
    queryFn: async (): Promise<Project[]> => {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const projects: Project[] = await response.json();
      return projects.filter((p) => p.saved);
    },
  });
};
