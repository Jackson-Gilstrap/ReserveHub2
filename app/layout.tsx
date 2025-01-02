import type { Metadata } from "next";
import Navbar from "./components/utility/header";
import SessionProvider from "./components/utility/SessionProvider";
import { getServerSession } from "next-auth";
import "./globals.css";


export const metadata: Metadata = {
  title: "Reserve Hub v2",
  description: "Reservation system for vita",
};
metadata.description;
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Navbar />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
