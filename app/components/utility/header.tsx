"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

function AuthButton() {
  const { data: session, status } = useSession();
  console.log("client session", session)
  //  const imgSrc = session?.user?.image

  if(status === "loading") {
    return "Loading..."
  }

  if (session) {
    return (
      <>
        {/* <Image src={imgSrc} alt="User profile image"  /> */}
        <button onClick={() => signOut()}>SignOut</button>
      </>
    );
  }

  return (
    <>
      <button onClick={() => signIn()}>Sign In</button>
    </>
  );
}

const Navbar = () => {
  return (
    <header className="flex flex-row justify-between items-center px-4 py-2">
      <Link href={"/"}>
        <div>
          <h1 className="text-2xl ml-6">VITA</h1>
        </div>
      </Link>
      <div className="mx-6">
        <AuthButton />
      </div>
    </header>
  );
};

export default Navbar;
