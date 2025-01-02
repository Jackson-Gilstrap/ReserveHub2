'use client';
import NavButton from "../components/utility/button";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Reservation {
  res_date: string;
  res_time: string;
  res_location: string;
  res_type: string;
  booking_ref: string;
  file_jointly: boolean;
  for_dependent: boolean;
  client_id: string;
}

const Dashboard = () => {
  const { data: session, status } = useSession(); // Google auth user
  const [reservation, setReservation] = useState<Reservation | any>(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [hasFetched, setHasFetched] = useState(false); // Track fetch completion

  // Fetch reservation from backend
  const getUserFromDB = async (id: string): Promise<Reservation | null> => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8080/api/get-reservation?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch reservation: ${response.statusText}`);
        return null;
      }

      const data = await response.json();
      return data.body as Reservation;
    } catch (error) {
      console.error("Error fetching reservation:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger data fetching only once per user
  useEffect(() => {
    console.log(session)
    if (status === "authenticated" && session.user?.email && !hasFetched) {
      setHasFetched(true); // Prevent redundant fetches
      // getUserFromDB(user.id)
      //   .then((data) => setReservation(data))
      //   .catch((error) => console.error("Error setting reservation:", error));
    }
  }, [status, session?.user, hasFetched]);

  const hasReservation = !!reservation;

  console.log(reservation)

  return (
    <>
      <div className="mx-6 mt-6 border-b-4 border-slate-400">
        <h2 className="text-4xl font-bold">Welcome {session?.user?.name || "Guest"}</h2>
      </div>

      <div className="flex flex-row justify-between items-center mx-6 py-6">
        <h2 className="text-xl">Upcoming Reservations</h2>
        <NavButton url="booking" text="&#43; New Reservation" disabled={hasReservation} />
      </div>

      {status ? (
        <div>
          {isLoading ? (
            <p>Loading your reservation...</p>
          ) : hasReservation ? (
            <div className="flex flex-row justify-center items-center border-y-4 border-x-4 border-slate-400 mx-6 divide-x-2 divide-slate-500 h-36 w-19/20">
              <div className="flex flex-col basis-1/3 justify-evenly items-center py-1 px-2 h-full">
                <span className="text-center my-1">{new Date(reservation[0].res_date).toLocaleDateString('en-US', { weekday: 'long' })}</span>
                <span className="text-center my-1">{new Date(reservation[0].res_date).toLocaleString('en-US', { month: 'short' })}</span>
                <span className="text-center my-1">{new Date(reservation[0].res_date).toLocaleString('en-US', { day: 'numeric' })}</span>
              </div>

              <div className="flex flex-col basis-1/3 justify-evenly items-center py-1 h-full divide-y-2 divide-slate-400">
                <span className="text-center w-full basis-1/2">Time: {reservation[0].res_time}</span>
                <span className="text-center w-full basis-1/2">Location: {reservation[0].res_location}</span>
              </div>

              <div className="flex flex-col basis-1/3 justify-evenly items-center py-1 h-full divide-y-2 divide-slate-400">
                <span className="text-center w-full basis-1/2">Service: {reservation[0].res_type}</span>
                <span className="text-center w-full basis-1/2">Booking Reference: {reservation[0].booking_ref}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center border-y-4 border-x-4 border-slate-400 mx-6 divide-x-2 divide-slate-500 h-36 w-19/20">
              <h3 className="text-center w-full basis-1/2">No reservation found</h3>
              <p className="text-center w-full basis-1/2">Please schedule an appointment to see your upcoming reservation.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center border-y-4 border-x-4 border-slate-400 mx-6 divide-x-2 divide-slate-500 h-36 w-19/20">
          <p className="text-center w-full">Please Login to see upcoming reservations</p>
        </div>
      )}
    </>
  );
};

export default Dashboard;
