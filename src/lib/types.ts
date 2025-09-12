export type ProcessingStatus = "processing" | "ready" | "failed";

export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  thumbnailUrl: string;
  status: ProcessingStatus;
  saved?: boolean;
  badges?: string[];
  stats?: Array<{ label: string; value: string }>;
  createdAt: string;
};
