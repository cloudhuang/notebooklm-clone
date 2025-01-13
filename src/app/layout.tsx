import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "@/provider/app-provider";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenSource NotebookLM",
  description: "An open-source notebooklm forked from the google notebooklm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Header />
          <main className="p-4 mt-16 calc(100vh - 4rem) overflow-auto">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
