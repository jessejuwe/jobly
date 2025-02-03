import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import MainLayout from "@/components/layouts/main-layout";
import Providers from "@/providers/providers";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });

export const metadata: Metadata = {
  appleWebApp: { capable: true, title: "Jobly", statusBarStyle: "default" },
  applicationName: "Jobly",
  keywords: ["Job", "Board", "Dashboard"],
  title: {
    default: "Jobly - Find Your Next Remote Job",
    template: " %s | Jobly",
  },
  description: "Discover remote job opportunities from top companies worldwide",
  creator: "Jesse Juwe",
  publisher: "Jesse Juwe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` ${outfit.className} antialiased`}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
