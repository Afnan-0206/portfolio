import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s — Afnan B.R.",
    default: "Work — Afnan B.R.",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
