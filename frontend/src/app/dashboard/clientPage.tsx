"use client";

import LoremIpsum from "@/components/LoremIpsum";
import PageTitle from "@/components/PageTitle";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";

function DashboardContent() {
  const { isOpen } = useSidebar(); // ✅ Access context here

  return (
    <div className="flex">
      <Sidebar />
      <main
        className={`transition-all duration-300 ${
          isOpen ? "mt-1 px-4" : "mt-10 px-10"
        } py-6`}
      >
        <PageTitle text="Dashboard"></PageTitle>
        <div className={`mainContent ${isOpen ? "px-4" : "px-0 pt-4"}`}>
          <LoremIpsum />
          <LoremIpsum />
          <LoremIpsum />
          <LoremIpsum />
          <LoremIpsum />
        </div>
      </main>
    </div>
  );
}

export default function DashboardClient() {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  );
}
