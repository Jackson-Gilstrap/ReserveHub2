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
  
  //check if use role returns something before
  
  
  useEffect(() => {
    if (role.role ==='admin' || role.role === 'volunteer') {
      router.refresh()
      router.push(`/dashboard`)
    }
  }, [session, role]);

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center px-6 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md z-[-1]"></div>

     

      
      <h1 className="text-center text-5xl md:text-6xl font-extrabold text-white leading-snug tracking-wide drop-shadow-md">
        Volunteer Income & Tax Assistance
      </h1>

      <p className="text-white text-2xl space-y-3 font-medium mt-4">Currently serving in 8 locations across NY state</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-48 mt-6  p-6 rounded-lg ">
        <ul className="text-white text-lg space-y-3 font-medium">
        <li className="odd:bg-blue-500 even:bg-orange-500 px-4 py-2 rounded-md my-4">Hartwick College</li>
          <li className="odd:bg-blue-500 even:bg-orange-500 px-4 py-2 rounded-md my-4">Huntington Memorial Library</li>
          <li className="odd:bg-blue-500 even:bg-orange-500 px-4 py-2 rounded-md my-4">Richfield Springs Community Center</li>
          <li className="odd:bg-blue-500 even:bg-orange-500 px-4 py-2 rounded-md my-4">GHS FCU Norwich</li>
        </ul>
        <ul className="text-white text-lg space-y-3 font-medium">
        <li className="odd:bg-blue-500 even:bg-orange-500 px-4 py-2 rounded-md my-4">GHS FCU Binghamton</li>
          <li className="odd:bg-blue-500 even:bg-orange-500 px-4 py-2 rounded-md my-4">Tabernacle Baptist Church</li>
          <li className="odd:bg-blue-500 even:bg-orange-500 px-4 py-2 rounded-md my-4">Charlotte Valley Central School</li>
          <li className="odd:bg-blue-500 even:bg-orange-500 px-4 py-2 rounded-md my-4">Laurens Central School</li>
        </ul>
      </div>

      <h2 className="text-center text-2xl text-white font-semibold mt-12">
        Begin Your Reservation Process Below
      </h2>

      <div className="mt-6">
        <NavButton
          url="booking"
          text="Start"
          disabled={false}
          
        />
      </div>
    </div>
  );
}
