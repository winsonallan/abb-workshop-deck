import type { Metadata } from "next";
import DashboardClient from "./clientPage";

export const metadata: Metadata = {
  title: "Dashboard | Workshop Deck",
  description: "Etiqa E-Claim Workshop Deck",
};

export default function Dashboard() {
  return <DashboardClient />;
}
