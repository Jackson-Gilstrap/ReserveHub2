"use client";

import { getAppointmentsByLocation } from "@/app/lib/appointments";
import { Reservation } from "@/app/lib/reservation";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface fetchedDataProps {
  appointments: [],
  reservations:[]
}

const ReservationsByLocation = () => {
  const [reservations, setreservations] = useState<Reservation[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reservations.slice(indexOfFirstItem, indexOfLastItem);
  const pathname = usePathname();
  const parts = pathname.split("/");
  const location_id = parts[parts.length - 1];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e: any) => {
    console.log(e);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(reservations.length / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  useEffect(() => {
    getAppointmentsByLocation(location_id)
      .then((fetchedData: fetchedDataProps) => {
        // console.log(fetchedData)
        if (Array.isArray(fetchedData.reservations)) {
          setreservations(fetchedData.reservations);
          setCount(fetchedData.reservations.length);
        } else {
          console.error("Invalid reservations data:", fetchedData);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch reservations:", error);
      });

    //
  }, [location_id]);

  return (
    <section className="bg-[#FDFDFD] p-6 max-w-2xl mx-auto border border-[#E0E0E0] rounded-lg shadow-md mt-8">
    <span className="text-[#212529] text-lg font-semibold">
      Number of reservations: {count}
    </span>
    <div className="mt-4">
      <ul className="list-none p-0 m-0 grid grid-cols-4 gap-4">
        {currentItems.map((reservation) => (
          <li
            id={`${reservation.booking_ref}`}
            key={reservation.booking_ref}
            onClick={handleClick}
            className="bg-[#F8F9FA] text-[#212529] p-3 rounded-md border border-[#E0E0E0] cursor-pointer transition duration-300 hover:bg-[#4A90E2] hover:text-white active:bg-[#357ABD] active:scale-95"
          >
            #{reservation.booking_ref}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-[#4A90E2] text-white px-4 py-2 rounded-md transition duration-300 hover:bg-[#357ABD] disabled:bg-[#E0E0E0] disabled:text-[#6C757D] disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(reservations.length / itemsPerPage)}
          className="bg-[#4A90E2] text-white px-4 py-2 rounded-md transition duration-300 hover:bg-[#357ABD] disabled:bg-[#E0E0E0] disabled:text-[#6C757D] disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <p className="text-[#6C757D] text-sm text-center mt-4">
        Page {currentPage} of {Math.ceil(reservations.length / itemsPerPage)}
      </p>
    </div>
  </section>
  
  );
}


export default ReservationsByLocation