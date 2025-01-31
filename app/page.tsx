"use client";
import NavButton from "./components/utility/button";
// import { authOptions } from "./api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRole } from "./lib/context/roleContext";
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const role = useRole()


  useEffect(() => {
    if (session && status === "authenticated" && role) {
      router.push("/dashboard");
    }
  }, [session, role]);

  return (
    <>
      <div className="h-screen">
        <h1 className="text-center text-6xl mt-8 leading-relaxed">
          Volunteer Income & Tax Assistance <br />
          <span className="text-4xl">&#40;VITA&#41;</span>
        </h1>

        <h2 className="text-center text-2xl mt-8">
          Begin Your Reservation Proccess Below
        </h2>
        <NavButton url="booking" text="Start" disabled={false} />
      </div>
    </>
  );
}
