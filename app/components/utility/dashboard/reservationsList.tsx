"use client";
import { useState, useEffect } from "react";
import { Reservation, getReservations } from "@/app/lib/reservation";

export default function ReservationList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [count, setCount] = useState(0);

  const handleClick = (e: any) => {
    console.log(e.target.id);
  };

  useEffect(() => {
    getReservations()
      .then((fetchedReservations) => {
        if (Array.isArray(fetchedReservations)) {
          setReservations(fetchedReservations);
          setCount(fetchedReservations.length)
        } else {
          console.error("Invalid locations data:", fetchedReservations);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch locations:", error);
      });
    }, [reservations]);
    
    return (
        <section className=" p-6 max-w-2xl mx-auto">
          <span>Number of reservations made: {count}</span>
            <ul className="list-none p-0 m-0 grid grid-cols-5 gap-4">
                {reservations.map(reservations => (
                    <li  id={`${reservations.booking_ref}`} key={reservations.booking_ref} onClick={handleClick} className="bg-[#F8F9FA] text-[#212529] p-3 mb-3 mx-auto rounded-md border border-[#E0E0E0] cursor-pointer transition duration-300 hover:bg-[#4A90E2] hover:text-white active:bg-[#357ABD] active:scale-95">Reservation:<br/> #{reservations.booking_ref}</li>
                ))}
            </ul>
        </section>
    )
}
