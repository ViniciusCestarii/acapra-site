import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { TanstackQueryProvider } from "./context/tanstack-query";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "700"],
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
          className={`${nunito.variable} antialiased text-foreground bg-background`}
        >
          {children}
        </body>
      </TanstackQueryProvider>
    </html>
  );
}
