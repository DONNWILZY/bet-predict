import type { Metadata } from "next";
import {DM_Sans} from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Bet-Predict",
  description: "Greatest place to bet on your favorite sports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
  <body className={`${dmSans.className} antialiased`} suppressHydrationWarning>
    {children}
  </body>
</html>

  );
}
