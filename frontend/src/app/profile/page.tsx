import type { Metadata } from "next";
import ProfileClient from "./clientPage";

export const metadata: Metadata = {
  title: "Profile | Workshop Deck",
  description: "Etiqa E-Claim Workshop Deck",
};

export default function Profile() {
  return <ProfileClient />;
}
