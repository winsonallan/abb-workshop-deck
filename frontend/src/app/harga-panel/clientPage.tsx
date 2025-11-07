"use client";

import AOS from "aos";
import { useEffect } from "react";
import LoremIpsum from "@/components/LoremIpsum";
import PageTitle from "@/components/PageTitle";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";

function Content() {
  const { isOpen } = useSidebar();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 80 });
  });

  return (
    <div className="flex">
      <Sidebar />
      <main
        className={`transition-all duration-300 ${
          isOpen ? "mt-1 px-4" : "mt-10 px-10"
        } py-6`}
        data-aos="fade-right"
      >
        <PageTitle text="Harga Panel"></PageTitle>
        <div
          className={`mainContent ${isOpen ? "px-4" : "px-0 pt-4"}`}
          data-aos="fade-up"
        ></div>
      </main>
    </div>
  );
}

export default function HargaPanelClient() {
  return (
    <SidebarProvider>
      <Content />
    </SidebarProvider>
  );
}
