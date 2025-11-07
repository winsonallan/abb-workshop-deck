"use client";

import { useSidebar } from "@/context/SidebarContext";

export default function PageTitle({ text }: { text: string }) {
  const { isOpen } = useSidebar(); // ✅ Access context here

  return (
    <h1
      className={`font-bold text-3xl text-(--prussian-blue) mb-4 ${
        isOpen ? "mt-1 px-4 pt-6" : "mt-0 px-0 pt-0"
      }`}
    >
      {text}
    </h1>
  );
}
