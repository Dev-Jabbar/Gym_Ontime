import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

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
      <body className={`${inter.className} `}>
        <div className="md:px-16 md:py-4 px-4 py-1  bg-black md:block fixed w-screen z-20  space-y-16">
          <Header />
        </div>
        {children}
      </body>
    </html>
  );
}
