"use client";

import { useEffect, useState } from "react";
import {
  getReservationByAppId,
  DesciptiveReservation,
} from "@/app/lib/reservation";
import { usePathname } from "next/navigation";
import NavButton from "@/app/components/utility/button";

const AppointmentPage = () => {
  const [reservations, setReservations] = useState<DesciptiveReservation[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Track active dropdown

  const pathname = usePathname();
  const parts = pathname.split("/");
  const appointment_id = parts[parts.length - 1];

  useEffect(() => {
    getReservationByAppId(parseInt(appointment_id))
      .then((reservations) => {
        setReservations(reservations);
      })
      .catch((error) => {
        console.error("Failed to fetch reservations:", error);
      });
  }, [appointment_id]);

  const toggleDropdown = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <NavButton text="Back" url="dashboard" disabled={false} />
      <section className="bg-[#FDFDFD] p-6 max-w-2xl mx-auto border border-[#E0E0E0] rounded-lg shadow-md">
        <h3 className="text-[#212529] text-2xl font-semibold mb-4">
          Appointment Details
        </h3>

        {/* If no reservations */}
        {reservations.length === 0 ? (
          <div className="text-center text-[#212529] bg-[#F8F9FA] p-6 rounded-md shadow-sm">
            <p className="text-lg font-medium">
              No reservations for this appointment.
            </p>
            <p className="text-sm text-[#6C757D]">
              Please check back later or contact support for assistance.
            </p>
          </div>
        ) : (
          reservations.map((reservation, index) => (
            <div
              key={reservation.booking_ref}
              className={`mb-4 p-4 border border-[#E0E0E0] rounded-md shadow-sm ${
                reservation.is_tce ? "bg-orange-300" : "bg-[#F8F9FA]"
              }`}
            >
              
              <div
                className="flex justify-between items-center cursor-pointer text-[#212529] font-semibold hover:text-[#4A90E2] transition"
                onClick={() => toggleDropdown(index)}
              >
                <span>{`${reservation.client_given_name} ${reservation.client_surname}`}</span>
                <span className="text-sm text-[#6C757D]">
                  {activeIndex === index ? "▲ Hide Details" : "▼ Show Details"}
                </span>
              </div>

             
              {activeIndex === index && (
                <div className="mt-4 text-[#212529] text-sm space-y-2">
                  <p>
                    <strong>Time:</strong> {reservation.res_time}
                  </p>
                  <p>
                    <strong>Location:</strong> {reservation.res_location}
                  </p>
                  <p>
                    <strong>Phone Number:</strong>{" "}
                    {reservation.client_phone_number}
                  </p>
                  <p>
                    <strong>File Jointly:</strong>{" "}
                    {reservation.file_jointly ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>For Dependent:</strong>{" "}
                    {reservation.for_dependent ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Is TCE:</strong> {reservation.is_tce ? "Yes" : "No"}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </section>
    </>
  );
};

export default AppointmentPage;
