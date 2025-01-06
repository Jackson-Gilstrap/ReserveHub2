"use client";
import NavButton from "../components/utility/button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const { data: session, status } = useSession(); // Google auth user will evntually check emails against a db to see roles

  if(!session) {
    redirect("/")
  }

  
  return (
    <>
      <div className=" px-4 py-6 mt-8 mx-6">
        <h2 className="text-xl font-semibold text-[#212529] text-center">
          Admin Dashboard
        </h2>
        <NavButton url="booking" text="Create reservation" disabled={false} />
      </div>
    </>
  );
};

export default Dashboard;
