import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

// Fonts configuration
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata configuration
export const metadata = {
  title: "Smart Pill Dispenser",
  description: "A smart way to manage your medications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header Section */}
        <header className="bg-primary text-white text-center py-4 text-xl font-bold">
          Smart Pill Dispenser
        </header>

        {/* Main Content */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}