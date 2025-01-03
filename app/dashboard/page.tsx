'use client';
import NavButton from "../components/utility/button";
import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
import { Reservation } from "../lib/reservation";



const Dashboard = () => {
  // const { data: session, status } = useSession(); // Google auth user
  const [reservation, setReservation] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [hasFetched, setHasFetched] = useState(false); // Track fetch completion

  return (
    <>
      <h1>Admin Dashboard</h1>
    </>
  );
};

export default Dashboard;
