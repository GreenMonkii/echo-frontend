import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SignalRProvider } from "@/contexts/signalr.context";

export const metadata: Metadata = {
  title: "Echo - Anonymous Chat",
  description: "A simple anonymous chat application",
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <SignalRProvider>{children}</SignalRProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "var(--secondary)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
            },
          }}
        />
      </body>
    </html>
  );
}
