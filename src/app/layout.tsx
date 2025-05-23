import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Tracker",
  description: "Track your reading progress and manage your book collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold text-gray-800">
                Book Tracker
              </Link>
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Books
                </Link>
                <Link
                  href="/books/new"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Add Book
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
