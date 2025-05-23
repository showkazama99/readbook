import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReadBook",
  description: "Track your reading progress",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold text-gray-800">
                ReadBook
              </Link>
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                >
                  本棚
                </Link>
                <Link
                  href="/statistics"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                >
                  統計
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
