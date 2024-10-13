import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SignalRProvider } from "@/contexts/signalr.context";

export const metadata: Metadata = {
  title: "Echo - Anonymous Chat",
  description: "A simple anonymous chat application",
};

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${space_grotesk.className} antialiased`}>
        <SignalRProvider>{children}</SignalRProvider>
        <Toaster />
      </body>
    </html>
  );
}
