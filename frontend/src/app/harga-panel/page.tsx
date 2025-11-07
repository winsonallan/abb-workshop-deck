import type { Metadata } from "next";
import HargaPanelClient from "./clientPage";

export const metadata: Metadata = {
  title: "Harga Panel | Workshop Deck",
  description: "Etiqa E-Claim Workshop Deck",
};

export default function HargaPanel() {
  return <HargaPanelClient />;
}
