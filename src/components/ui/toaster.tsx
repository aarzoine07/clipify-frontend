// src/components/ui/toaster.tsx
"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Simple wrapper so we can drop a <Toaster /> in layout.
// We'll swap to shadcn's Toast later if desired; this is zero-config.
export function Toaster() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
}

// Export a tiny helper for future use:
// toast.success("Saved!"); toast.error("Oops"); etc.
export { toast };
