"use client";

import { getAppointmentsByLocation } from "@/app/lib/appointments";
import { Reservation } from "@/app/lib/reservation";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface fetchedDataProps {
  appointments: [],
  reservations:[]
}

export default function reservationsbyLocation() {
  const [reservations, setreservations] = useState<Reservation[]>([]);
  const [count, setCount] = useState(0);
  const pathname = usePathname();
  const parts = pathname.split("/");
  const location_id = parts[parts.length - 1];

  const handleClick = (e: any) => {
    console.log(e);
  };
  useEffect(() => {
    getAppointmentsByLocation(location_id)
      .then((fetchedData: fetchedDataProps) => {
        // console.log(fetchedData)
        if (Array.isArray(fetchedData.reservations)) {
          setreservations(fetchedData.reservations);
          setCount(fetchedData.reservations.length);
        } else {
          console.error("Invalid appointments data:", fetchedData);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch appointments:", error);
      });

    //
  }, [location]);

  return (
    <section className=" p-6 max-w-2xl mx-auto">
      <span>Number of appointments: {count}</span>
      <ul className="list-none p-0 m-0">
        {reservations.map((reservation) => (
          <li
            id={`${reservation.booking_ref}`}
            key={reservation.booking_ref}
            onClick={handleClick}
            className="bg-[#F8F9FA] text-[#212529] p-3 mb-3 rounded-md border border-[#E0E0E0] cursor-pointer transition duration-300 hover:bg-[#4A90E2] hover:text-white active:bg-[#357ABD] active:scale-95"
          >
            #{reservation.booking_ref}
          </li>
        ))}
      </ul>
    </section>
  );
}
