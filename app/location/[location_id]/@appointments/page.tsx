"use client";

import { Appointment, getAppointmentsByLocation } from "@/app/lib/appointments";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { formatDate } from "@/app/components/utility/functions/datetime";


interface fetchedDataProps {
  appointments: [];
  reservations: [];
}

export default function AppointmentsbyLocation() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = appointments.slice(indexOfFirstItem, indexOfLastItem);
  const pathname = usePathname();
  const parts = pathname.split("/");
  const location_id = parts[parts.length - 1];
  

  const handleClick = (e: any) => {
    console.log(e);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(appointments.length / itemsPerPage)) {
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
        if (Array.isArray(fetchedData.appointments)) {
          setAppointments(fetchedData.appointments);
          setCount(fetchedData.appointments.length);
        } else {
          console.error("Invalid appointments data:", fetchedData);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch appointments:", error);
      });

    //
  }, []);

  return (
    <section className="bg-[#FDFDFD] p-6 max-w-2xl mx-auto border border-[#E0E0E0] rounded-lg shadow-md mt-8">
  <span className="text-[#212529] text-lg font-semibold">
    Number of appointments: {count}
  </span>
  <div className="mt-4">
    <ul className="list-none p-0 m-0 grid grid-cols-4 gap-4">
      {currentItems.map((appointment) => (
        <li
          id={`${appointment.app_id}`}
          key={appointment.app_id}
          onClick={handleClick}
          className="bg-[#F8F9FA] text-[#212529] p-3 rounded-md border border-[#E0E0E0] cursor-pointer transition duration-300 hover:bg-[#4A90E2] hover:text-white active:bg-[#357ABD] active:scale-95"
        >
          <span className="font-semibold">{appointment.app_title}</span>
          <br />
          <span className="text-[#6C757D] text-sm">
            {formatDate(appointment.app_date)}
          </span>
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
        disabled={currentPage === Math.ceil(appointments.length / itemsPerPage)}
        className="bg-[#4A90E2] text-white px-4 py-2 rounded-md transition duration-300 hover:bg-[#357ABD] disabled:bg-[#E0E0E0] disabled:text-[#6C757D] disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
    <p className="text-[#6C757D] text-sm text-center mt-4">
      Page {currentPage} of {Math.ceil(appointments.length / itemsPerPage)}
    </p>
  </div>
</section>

  );
}
