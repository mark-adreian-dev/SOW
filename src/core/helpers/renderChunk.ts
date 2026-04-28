import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";

export function renderChunk(chunk: ReactNode) {
  const wrapper = document.createElement("div");
  const root = createRoot(wrapper);
  root.render(`<div className="block">${chunk}</div>`);
  return wrapper;
}