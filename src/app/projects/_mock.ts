export type Project = {
  id: string;
  title: string;
  createdAt: string;
  status: "draft" | "processing" | "ready";
};

export type UploadItem = {
  id: string;
  name: string;
  size: number;
  progress?: number;
  state: "queued" | "uploading" | "done" | "error";
};

export type Transcript = {
  language: string;
  segments: { start: number; end: number; text: string }[];
};

export type Highlight = {
  id: string;
  start: number;
  end: number;
  score: number; // 0..1
  reason: string;
};

export type Clip = {
  id: string;
  thumb: string;
  start: number;
  end: number;
  duration: string;
  status: "rendering" | "ready" | "failed";
};

export const MOCK_PROJECT: Project = {
  id: "1",
  title: "Podcast Ep. 12",
  createdAt: new Date().toISOString(),
  status: "draft",
};

export const MOCK_UPLOADS: UploadItem[] = [
  {
    id: "u1",
    name: "podcast-ep12.mp4",
    size: 1_234_567_890,
    progress: 100,
    state: "done",
  },
  {
    id: "u2",
    name: "b-roll.mov",
    size: 456_000_000,
    progress: 42,
    state: "uploading",
  },
];

export const MOCK_TRANSCRIPT: Transcript = {
  language: "en",
  segments: [
    {
      start: 0,
      end: 6,
      text: "Welcome back to the show. Today we cover editing faster with AI.",
    },
    {
      start: 7,
      end: 14,
      text: "We’ll look at highlight detection and auto reframing to 9:16.",
    },
    {
      start: 15,
      end: 22,
      text: "Plus, how to post and schedule to TikTok with one click.",
    },
  ],
};

export const MOCK_HIGHLIGHTS: Highlight[] = [
  {
    id: "h1",
    start: 12,
    end: 24,
    score: 0.84,
    reason: "High speech energy + laughter",
  },
  {
    id: "h2",
    start: 61,
    end: 77,
    score: 0.78,
    reason: "Keyword match: 'viral' + audience reaction",
  },
];

export const MOCK_CLIPS: Clip[] = [
  {
    id: "c1",
    thumb: "",
    start: 12,
    end: 24,
    duration: "00:12",
    status: "ready",
  },
  {
    id: "c2",
    thumb: "",
    start: 61,
    end: 77,
    duration: "00:16",
    status: "rendering",
  },
];
