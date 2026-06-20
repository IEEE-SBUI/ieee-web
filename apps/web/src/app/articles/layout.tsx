import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles | IEEE Student Branch Universitas Indonesia",
  description: "Read technical articles, academic insights, and updates written by IEEE SBUI members.",
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}