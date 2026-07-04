"use client";

import { useEffect } from "react";

export default function ContentGuard() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      const target = e.target;
      if (target instanceof Element && target.closest("input,textarea")) return;
      e.preventDefault();
    };
    const onDragStart = (e: DragEvent) => e.preventDefault();

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}
