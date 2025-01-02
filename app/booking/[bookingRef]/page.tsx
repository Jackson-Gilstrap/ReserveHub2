"use client";
import NavButton from "@/app/components/utility/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


interface ReservationProps {
  booking_ref: string;
  res_date: string;
  res_time: string;
  res_location: string;
  res_type: string;
  created_at: string;
  file_jointly: boolean;
  for_dependent: boolean;
}
const ConfirmationPage = () => {
  const params = useParams() as { bookingRef: string };
  const [loading, setLoading] = useState(false);
  const [reservationDetails, setReservationDetails] =
    useState<ReservationProps>();
  const { bookingRef } = params;

  const  handleClick = async() => {
    const html2pdf = await require("html2pdf.js")
    const element = document.getElementById("confirmation")
    html2pdf(element,{
        margin: 20,
        filename: `VITA Reservation Confirmation ${bookingRef} ${reservationDetails?.created_at}`
    })
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(()=> {
        if (bookingRef) {
            fetch(`http://localhost:8080/api/get-reservation/${bookingRef}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Internal server error");
                }
      
                return response.json();
              })
              .then((data) => {
                console.log("Reservation Confirmation: ", data.body);
                setReservationDetails(data.body);
                setLoading(false);
              })
              .catch((error) => {
                console.log(error.message);
              });}
    },2000)
    
    
  }, [bookingRef]);
  return (
    <>
      {loading ? (
        <div className="ml-10">
          <h3 className="text-xl font-semibold text-[#212529]">Loading Confirmation details...</h3>
        </div>
      ) : (
        <div className="max-w-md mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg" id="confirmation">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4 text-center">
            Reservation Confirmation
          </h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium text-gray-600">
                Booking Reference:
              </span>{" "}
              {reservationDetails?.booking_ref}
            </p>
            <p>
              <span className="font-medium text-gray-600">Date:</span>{" "}
              {reservationDetails?.res_date}
            </p>
            <p>
              <span className="font-medium text-gray-600">Time:</span>{" "}
              {reservationDetails?.res_time}
            </p>
            <p>
              <span className="font-medium text-gray-600">Location:</span>{" "}
              {reservationDetails?.res_location}
            </p>
            <p>
              <span className="font-medium text-gray-600">Type:</span>{" "}
              {reservationDetails?.res_type}
            </p>
            <p>
              <span className="font-medium text-gray-600">Created At:</span>{" "}
              {reservationDetails?.created_at}
            </p>
            <p>
              <span className="font-medium text-gray-600">File Jointly:</span>{" "}
              {reservationDetails?.file_jointly ?  "Yes" : "No"}
            </p>
            <p>
              <span className="font-medium text-gray-600">For Dependent:</span>{" "}
              {reservationDetails?.for_dependent ?  "Yes" : "No"}
            </p>
          </div>
          <div className="mt-8">
            <p>Any questions regarding your reservation call <br/><strong>607-431-4338</strong></p> 
          </div>
          <div className= "mt-8" data-html2canvas-ignore>
            <p className="font-bold">It is highly recommended to download and save a copy of your reservation</p>
          <button onClick={handleClick} className="bg-black text-white px-4 py-2 border-white border-2 mt-8 cursor-pointer" >
            Download Confirmation
          </button>
          </div>
        </div>
      )}
      <NavButton url="/" text="Finish" disabled={false} />
    </>
  );
};

export default ConfirmationPage;

// maybe update the number listed based on the location.
