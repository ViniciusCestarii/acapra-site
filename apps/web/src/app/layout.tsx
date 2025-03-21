import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TanstackQueryProvider } from "./context/tanstack-query";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Acapra Adoção",
  description: "Adote animais de estimação!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TanstackQueryProvider>
        <body
          className={`${nunito.variable} antialiased text-foreground bg-background font-nunito`}
        >
          {children}
          <Toaster />
        </body>
      </TanstackQueryProvider>
    </html>
  );
}
