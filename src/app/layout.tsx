import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cat gallery",
  description: "Simple app for fetching and displaying cat images",
};

type Props = {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
