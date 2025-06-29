import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import Providers from "@/components/Providers";
import ToolbarServer from "@/components/ToolbarServer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Redditacular",
  description: "The front page of the internet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //posts: upvoted, downvoted, saved,
  //filters: top: day,week,month,year,all-time | new,
  //show all subreddits
  //profile: settings, logout btn
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <Providers>
          <Navbar />
          <ToolbarServer />
          <main className="max-w-7xl mx-auto  px-2">
            {/* <div className="w-[300px] bg-black"></div> */}
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
