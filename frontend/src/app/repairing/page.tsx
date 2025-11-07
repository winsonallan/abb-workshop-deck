import type { Metadata } from "next";
import RepairingClient from "./clientPage";

export const metadata: Metadata = {
  title: "Repairing | Workshop Deck",
  description: "Etiqa E-Claim Workshop Deck",
};

export default function Repairing() {
  return <RepairingClient />;
}
