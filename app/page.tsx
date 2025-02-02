"use client";
import NavButton from "./components/utility/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRole } from "./lib/context/roleContext";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const role = useRole();

  useEffect(() => {
    if (role.role === "admin" || role.role === "volunteer") {
      router.refresh();
      router.push(`/dashboard`);
    }
  }, [session, role]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-12 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">
      {/* Overlay for Readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md z-[-1]"></div>

      {/* Title Section */}
      <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-snug tracking-wide drop-shadow-md">
        Volunteer Income & Tax Assistance
      </h1>

      <p className="text-white text-lg md:text-2xl font-medium mt-4 text-center max-w-3xl">
        Currently serving in 8 locations across NY state
      </p>

      {/* Location Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mt-6 p-6 max-w-4xl w-full">
        <ul className="text-white text-lg space-y-3 font-medium">
          <li className="odd:bg-blue-500 even:bg-orange-500 px-6 py-3 rounded-md text-center">
            Hartwick College
          </li>
          <li className="odd:bg-blue-500 even:bg-orange-500 px-6 py-3 rounded-md text-center">
            Huntington Memorial Library
          </li>
          <li className="odd:bg-blue-500 even:bg-orange-500 px-6 py-3 rounded-md text-center">
            Richfield Springs Community Center
          </li>
          <li className="odd:bg-blue-500 even:bg-orange-500 px-6 py-3 rounded-md text-center">
            GHS FCU Norwich
          </li>
        </ul>
        <ul className="text-white text-lg space-y-3 font-medium">
          <li className="odd:bg-blue-500 even:bg-orange-500 px-6 py-3 rounded-md text-center">
            GHS FCU Binghamton
          </li>
          <li className="odd:bg-blue-500 even:bg-orange-500 px-6 py-3 rounded-md text-center">
            Tabernacle Baptist Church
          </li>
          <li className="odd:bg-blue-500 even:bg-orange-500 px-6 py-3 rounded-md text-center">
            Charlotte Valley Central School
          </li>
          <li className="odd:bg-blue-500 even:bg-orange-500 px-6 py-3 rounded-md text-center">
            Laurens Central School
          </li>
        </ul>
      </div>

      {/* Reservation Section */}
      <h2 className="text-center text-2xl md:text-3xl text-white font-semibold mt-12">
        Begin Your Reservation Process Below
      </h2>

      <div className="mt-6">
        <NavButton url="booking" text="Start" disabled={false} />
      </div>
    </div>
  );
}
