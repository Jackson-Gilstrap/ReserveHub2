"use client";

import { Appointment, getAppointmentsByLocation } from "@/app/lib/appointments";
import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { formatDate } from "@/app/components/utility/functions/datetime";
import { useRouter } from "next/navigation";

interface fetchedDataProps {
  appointments: [];
  reservations: [];
}

export default function AppointmentsbyLocation() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [date, setDate] = useState<Date | null>(null);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const location_id = parts[parts.length - 1];
  console.log(location_id)

  // Filter appointments based on selected date
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      // If no date is selected, show all appointments
      if (!date) return true;
      // Compare the formatted date
      return formatDate(appointment.app_date) === formatDate(date.toISOString());
    });
  }, [appointments, date]);

  // Paginate filtered appointments
  const currentItems = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (appointment_id: number) => {
    console.log(appointment_id);
    router.push(`/appointment/${appointment_id}`);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredAppointments.length / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const inputDate = e.target.value ? new Date(e.target.value) : null;
    console.log(inputDate)
    if (inputDate && !isNaN(inputDate.getTime())) {
      setDate(inputDate); // Valid date
    } else {
      setDate(null); // Reset to null if invalid or empty
    }
  };

  useEffect(() => {
    console.log("useeffect: ",location_id)
    getAppointmentsByLocation(location_id)
      .then((fetchedData: fetchedDataProps) => {
        if (Array.isArray(fetchedData.appointments)) {
          setAppointments(fetchedData.appointments);
        } else {
          console.error("Invalid appointments data:", fetchedData);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch appointments:", error);
      });
  }, [location_id]);

  return (
    <section className="bg-[#FDFDFD] p-6 max-w-2xl mx-auto border border-[#E0E0E0] rounded-lg shadow-md mt-8">
      <span className="text-[#212529] text-lg font-semibold">
        Number of appointments: {filteredAppointments.length}
      </span>
      <div className="mb-6">
        <label
          htmlFor="date"
          className="text-[#212529] font-medium mr-4"
          data-html2canvas-ignore
        >
          Select Date:
        </label>
        <input
          type="date"
          name="date"
          id="date"
          onChange={handleDateChange}
          className="px-3 py-2 border-2 border-[#E0E0E0] rounded-md bg-[#FFFFFF] text-[#212529] focus:border-[#4A90E2] focus:ring-[#4A90E2] focus:ring-1 focus:outline-none"
          data-html2canvas-ignore
        />
      </div>
      <div className="mt-4">
        <ul className="list-none p-0 m-0 grid grid-cols-4 gap-4">
          {currentItems.map((appointment) => (
            <li
              id={`${appointment.app_id}`}
              key={appointment.app_id}
              onClick={() => handleClick(appointment.app_id)}
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
            disabled={currentPage === Math.ceil(filteredAppointments.length / itemsPerPage)}
            className="bg-[#4A90E2] text-white px-4 py-2 rounded-md transition duration-300 hover:bg-[#357ABD] disabled:bg-[#E0E0E0] disabled:text-[#6C757D] disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <p className="text-[#6C757D] text-sm text-center mt-4">
          Page {currentPage} of {Math.ceil(filteredAppointments.length / itemsPerPage)}
        </p>
      </div>
    </section>
  );
}
