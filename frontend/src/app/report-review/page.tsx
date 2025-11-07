import type { Metadata } from "next";
import ReportReviewClient from "./clientPage";

export const metadata: Metadata = {
  title: "Report & Review | Workshop Deck",
  description: "Etiqa E-Claim Workshop Deck",
};

export default function ReportReview() {
  return <ReportReviewClient />;
}
