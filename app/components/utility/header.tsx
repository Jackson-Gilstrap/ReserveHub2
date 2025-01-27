"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session, status } = useSession();
  console.log("client session", session);
  //  const imgSrc = session?.user?.image

  if (status === "loading") {
    return "Loading...";
  }

  if (session) {
    return (
      <>
        {/* <Image src={imgSrc} alt="User profile image"  /> */}
        <div className="flex flex-row  items-center bg-[#FDFDFD] p-4 rounded-lg shadow-md border border-[#E0E0E0] max-w-md mx-auto">
          <span className="text-[#212529] text-lg font-semibold mx-2">
            Hello, {session.user?.name}
          </span>
          <button
            onClick={() => signOut()}
            className="bg-[#4A90E2] text-white px-4 py-2  mx-2 rounded-md transition duration-300 hover:bg-[#357ABD] active:bg-[#357ABD] active:scale-95"
          >
            Sign Out
          </button>
        </div>
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
