import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Provider from "./Providers";
import { Session } from "next-auth";

interface RootLayoutProps {
  children: React.ReactNode;
  session: Session | null;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Netfilx",
  description: "You will find all of your favourite films and episode here",
};

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
