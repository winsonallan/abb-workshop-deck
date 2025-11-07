import type { Metadata } from "next";
import OrdersClient from "./clientPage";

export const metadata: Metadata = {
  title: "Orders | Workshop Deck",
  description: "Etiqa E-Claim Workshop Deck",
};

export default function Orders() {
  return <OrdersClient />;
}
