"use client";

import AOS from "aos";
import {
  CheckCircle2,
  ClipboardList,
  DollarSign,
  FileText,
  ReceiptText,
  Wrench,
  XCircle,
} from "lucide-react";
import { useEffect } from "react";
import BarTrend from "@/components/dashboard/charts/BarTrend";
import OrderBreakdown from "@/components/dashboard/OrderBreakdown";
import RecentOrders from "@/components/dashboard/RecentOrders";
import SmallCard from "@/components/dashboard/SmallCard";
import StatsCard from "@/components/dashboard/StatsCards";
import PageTitle from "@/components/PageTitle";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";

function Content() {
  const { isOpen } = useSidebar(); // ✅ Access context here

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 80 });
  });

  return (
    <div className="flex">
      <Sidebar />
      <main
        className={`w-full transition-all duration-300 ${
          isOpen ? "mt-1 px-4" : "mt-10 px-10"
        } py-6`}
        data-aos="fade-right"
      >
        <PageTitle text="Dashboard"></PageTitle>
        <div className={`mainContent ${isOpen ? "px-4" : "px-0 pt-0"} w-full`}>
          <div className="DashboardStats w-full mt-8" data-aos="fade-right">
            <section className="DashboardStatsCards grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full mt-4 gap-x-8 gap-y-8">
              <StatsCard
                title="Total Orders"
                number="56"
                icon=<ClipboardList size={48} />
              />
              <StatsCard
                title="Repairing"
                number="4"
                icon=<Wrench size={48} />
              />
              <StatsCard
                title="Orders Finished"
                number="49"
                icon=<CheckCircle2 size={48} />
              />
              <StatsCard
                title="Orders Rejected"
                number="3"
                icon=<XCircle size={48} />
              />
            </section>

            <h2
              className="text-xl font-bold mt-8"
              style={{ color: "var(--dark-reseda-green)" }}
            >
              November Financial Snapshot
            </h2>
            <section className="FinancialSnapshotCards grid grid-cols-1 xl:grid-cols-3 w-full mt-4 gap-x-8 gap-y-8">
              <SmallCard
                title="Total Realized Revenue"
                number="IDR 110 291 222"
                icon=<DollarSign size={48} />
              />
              <SmallCard
                title="Average Revenue / Order"
                number="IDR 2 058 231"
                icon=<ReceiptText size={48} />
              />
              <SmallCard
                title="Total Invoiced"
                number="IDR 115 260 936"
                icon=<FileText size={48} />
              />
            </section>
          </div>

          <div className="orderTrends mt-4 w-full">
            <section className="trendsLine overflow-x-auto overflow-y-visible pt-4">
              <BarTrend />
            </section>
          </div>
        </div>
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 ${isOpen ? "px-4" : "px-0 pt-0"}`}
        >
          <RecentOrders />
          <OrderBreakdown />
        </div>
      </main>
    </div>
  );
}

export default function DashboardClient() {
  return (
    <SidebarProvider>
      <Content />
    </SidebarProvider>
  );
}
