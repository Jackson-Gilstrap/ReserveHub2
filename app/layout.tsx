import Navbar from "./components/utility/header";
import SessionProvider from "./components/utility/SessionProvider";
import { RoleProvider } from "./lib/context/roleContext";
import { getServerSession } from "next-auth";
import "./globals.css";


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
          <RoleProvider>
            <Navbar />
            <main>{children}</main>
          </RoleProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
