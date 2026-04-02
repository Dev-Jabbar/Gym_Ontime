import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";

import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.className} bg-gray-300`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
