'use client';
import { usePathname, useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import { Reservation, getReservation, deleteReservation } from "@/app/lib/reservation";

import NavButton from "@/app/components/utility/button";


const ReservationPage = () => {
    const pathname = usePathname();
    const router = useRouter()
    const parts = pathname.split("/");
    const booking_ref = parts[parts.length - 1];
    const [reservation, setReservation] = useState<Reservation>()
    
    const handleDelete = () => {
        deleteReservation(booking_ref)
        router.push('/dashboard')
    }


    useEffect(()=> {
        getReservation(booking_ref).then(fetchedReservation => {
            setReservation(fetchedReservation)
        }).catch(error => {
            console.error("Failed to fetch reservation:", error);

        })
    }, [])


    return (
        <>
          <NavButton
            text="Back to dashboard"
            url="dashboard"
            disabled={false}
          />
      
          <div className="bg-[#FDFDFD] p-6 max-w-2xl mx-auto border border-[#E0E0E0] rounded-lg shadow-md">
            <h2 className="text-[#212529] text-2xl font-semibold mb-4">
              Reservation for {reservation?.booking_ref}
            </h2>
            <p className="text-[#6C757D] text-lg font-medium mb-2">
              {reservation?.res_type} @{reservation?.res_location}
            </p>
            <p className="text-[#212529] text-base font-normal mb-6">
              {reservation?.res_time} on {reservation?.res_date}
            </p>
      
            {/* Actions Section */}
            <div className="border-t border-[#E0E0E0] pt-4">
              <span className="text-[#212529] font-semibold">Actions</span>
              <button
                onClick={handleDelete}
                className="ml-4 px-6 py-2 text-white bg-red-500 rounded-md shadow-md hover:bg-red-600 active:scale-95 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      );
      
};


export default ReservationPage;
