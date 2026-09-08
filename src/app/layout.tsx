import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://afnan-portfolio-eta.vercel.app"),
  title: "Afnan B.R. — AI Product Builder & Full-Stack Developer",
  description:
    "Portfolio of Afnan B.R., an AI and full-stack product builder creating multi-agent automation systems, client platforms and machine-learning applications.",
  keywords: [
    "AI product builder",
    "multi-agent systems",
    "full-stack developer",
    "Gemini",
    "Anthropic",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Supabase",
    "LightGBM",
    "Bengaluru",
  ],
  authors: [{ name: "Afnan B.R.", url: "https://afnan-portfolio-eta.vercel.app" }],
  creator: "Afnan B.R.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://afnan-portfolio-eta.vercel.app",
  },
  openGraph: {
    type: "website",
    url: "https://afnan-portfolio-eta.vercel.app",
    title: "Afnan B.R. — AI Product Builder & Full-Stack Developer",
    description:
      "Portfolio of Afnan B.R., an AI and full-stack product builder creating multi-agent automation systems, client platforms and machine-learning applications.",
    siteName: "Afnan B.R. Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Afnan B.R. — AI Product Builder & Full-Stack Developer",
    description:
      "Portfolio of Afnan B.R., an AI and full-stack product builder creating multi-agent automation systems, client platforms and machine-learning applications.",
    creator: "@AfnanBR",
  },
  // Icons are served from /public/ — do NOT put icon.png/favicon.ico in src/app/ as
  // Next.js App Router tries to process them as dynamic image route handlers (→ 500 errors).
  icons: {
    icon: [
      { url: "/images/afnan-avatar.png", type: "image/png" },
    ],
    apple: [
      { url: "/images/afnan-avatar.png" },
    ],
    shortcut: ["/images/afnan-avatar.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#050817" />
        {/* favicon — served from /public/images/ to avoid App Router 500 errors */}
        <link rel="icon" href="/images/afnan-avatar.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/afnan-avatar.png" />
      </head>
      <body className="bg-[#050817] antialiased">
        {children}
      </body>
    </html>
  );
}
