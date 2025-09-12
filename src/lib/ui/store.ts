import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIStore {
  view: "grid" | "list";
  gridDensity: "cozy" | "compact";
  autoImport: boolean;
  setView: (view: "grid" | "list") => void;
  setGridDensity: (density: "cozy" | "compact") => void;
  setAutoImport: (enabled: boolean) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      view: "grid",
      gridDensity: "cozy",
      autoImport: false,
      setView: (view) => set({ view }),
      setGridDensity: (gridDensity) => set({ gridDensity }),
      setAutoImport: (autoImport) => set({ autoImport }),
    }),
    {
      name: "cliply-ui-store",
    }
  )
);
