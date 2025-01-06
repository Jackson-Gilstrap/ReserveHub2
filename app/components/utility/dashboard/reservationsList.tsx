"use client";
import { useState, useEffect } from "react";
import { Reservation, getReservations } from "@/app/lib/reservation";


export default function ReservationList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reservations.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (e: any) => {
    console.log(e.target.id);
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
      <section className="bg-[#FDFDFD] p-6 max-w-2xl mx-auto border border-[#E0E0E0] rounded-lg shadow-md mt-8">
      <span className="text-[#212529] text-lg font-semibold">
        Number of reservations: {count}
      </span>
      <div className="mt-4">
        <ul className="list-none p-0 m-0 grid grid-cols-5 gap-4 ">
          {currentItems.map((reservation) => (
            <li
              id={`${reservation.booking_ref}`}
              key={reservation.booking_ref}
              onClick={handleClick}
              className="bg-[#F8F9FA] text-[#212529] p-3 mx-auto  rounded-md border border-[#E0E0E0] cursor-pointer transition duration-300 hover:bg-[#4A90E2] hover:text-white active:bg-[#357ABD] active:scale-95"
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
    )
}
