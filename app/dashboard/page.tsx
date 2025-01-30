"use client";
import NavButton from "../components/utility/button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRole } from "../lib/context/roleContext";


const Dashboard = () => {
  const {data: session, status} = useSession()
  const userRole = useRole()

  if(!session) {
    redirect("/")
  }
  


  
  return (
    <>
      <div className=" px-4 py-6 mt-8 mx-6">
        <h2 className="text-xl font-semibold text-[#212529] text-center">
         Admin Dashboard | Role: {userRole.role}
        </h2>
        <NavButton url="booking" text="Create reservation" disabled={status != "authenticated"} />
      </div>
    </>
  );
};

export default Dashboard;
