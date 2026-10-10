import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { BackendGate } from "@/components/BackendGate";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gym Ontime",
  description: "Never miss a day of Gym again",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-300`}>
        <BackendGate>
          <LayoutWrapper>{children}</LayoutWrapper>
        </BackendGate>
      </body>
    </html>
  );
}
