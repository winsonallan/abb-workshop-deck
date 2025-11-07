import type { Metadata } from "next";
import InvoiceClient from "./clientPage";

export const metadata: Metadata = {
  title: "Invoice | Workshop Deck",
  description: "Etiqa E-Claim Workshop Deck",
};

export default function Invoice() {
  return <InvoiceClient />;
}
