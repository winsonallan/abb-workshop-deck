"use client";

import Sidebar from "@/components/Sidebar";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";

export default function PageTitle({ text }: { text: string }) {
  const { isOpen } = useSidebar(); // ✅ Access context here

  return (
    <h1
      className={`font-bold text-3xl text-(--prussian-blue) mb-4 ${
        isOpen ? "mt-1 px-4 pt-6" : "mt-10 px-0 pt-0"
      }`}
    >
      {text}
    </h1>
  );
}
