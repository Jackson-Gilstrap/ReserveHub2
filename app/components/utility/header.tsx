"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session, status } = useSession();
  console.log("client session", session);
  const imgSrc = session?.user?.image;

  if (status === "loading") {
    return "Loading...";
  }

  if (session) {
    return (
      <>
        <div className="flex flex-row  items-center bg-[#FDFDFD] p-4 rounded-lg shadow-md border border-[#E0E0E0] max-w-md">
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
      <button
        className="px-6 py-3 font-semibold text-purple-500 bg-gray-700 rounded-md shadow-md transition-all duration-300 hover:bg-gray-500 active:scale-95"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </>
  );
}

const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-6 py-3 shadow-md bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">
  
      <Link href="/" className="text-2xl font-bold tracking-wide text-white">
        VITA
      </Link>

      
      <AuthButton />
    </header>
  );
};

export default Navbar;
