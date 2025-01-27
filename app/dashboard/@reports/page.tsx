"use client";
import { formatDate } from "@/app/components/utility/functions/datetime";
import { useState, useEffect } from "react";
import {
  ModifiedReservation,
  getReservationByDate,
} from "@/app/lib/reservation";
//@ts-expect-error this error is because html2pdf doesn't have type file modules
import html2pdf from 'html2pdf.js'

export default function DailyReports() {
  const [reservations, setReservations] = useState<ModifiedReservation[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 7;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reservations.slice(indexOfFirstItem, indexOfLastItem);
  const pdfWidth = 297; // A4 width in mm (landscape: 297)
  const pdfHeight = 297;
  const generatePdf = async () => {
    // const html2pdf = await require("html2pdf.js");
    const element = document.getElementById("report");
    html2pdf(element, {
      margin: 2,
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "landscape", // Change to 'landscape' if needed
      },
      html2canvas: {
        scale: 2, // Adjust scale for higher quality
        width: pdfWidth * 3.7795275591, // Convert mm to pixels (1mm = 3.7795275591px)
        height: pdfHeight * 3.7795275591,
      },
      filename: `VITA Daily Reservation Report`,
      pagebreak: { mode: ["auto"] },
    });
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
    if (date) {
      getReservationByDate(formatDate(date.toISOString())).then(
        (fetchedReservations) => {
          if (Array.isArray(fetchedReservations)) {
            setReservations(fetchedReservations);
          } else {
            console.error(
              "Invalid reservation query data:",
              fetchedReservations
            );
          }
        }
      );
    }
  }, [date]);
  return (
    <section
      className="mx-auto max-w-6xl max-h-max bg-[#FDFDFD] p-6 rounded-lg border border-[#E0E0E0] shadow-md"
      id="report"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-[#212529] text-2xl font-semibold mb-4">Reports</h3>
        <button
          onClick={generatePdf}
          className="bg-black text-white px-4 py-2 border-white border-2 cursor-pointer"
          data-html2canvas-ignore
        >
          Download report
        </button>
      </div>
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
          onChange={(e) => setDate(new Date(e.target.value))}
          className="px-3 py-2 border-2 border-[#E0E0E0] rounded-md bg-[#FFFFFF] text-[#212529] focus:border-[#4A90E2] focus:ring-[#4A90E2] focus:ring-1 focus:outline-none"
          data-html2canvas-ignore
        />
      </div>
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-[#4A90E2] text-white px-4 py-2 rounded-md transition duration-300 hover:bg-[#357ABD] disabled:bg-[#E0E0E0] disabled:text-[#6C757D] disabled:cursor-not-allowed"
          data-html2canvas-ignore
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={
            currentPage === Math.ceil(reservations.length / itemsPerPage)
          }
          className="bg-[#4A90E2] text-white px-4 py-2 rounded-md transition duration-300 hover:bg-[#357ABD] disabled:bg-[#E0E0E0] disabled:text-[#6C757D] disabled:cursor-not-allowed"
          data-html2canvas-ignore
        >
          Next
        </button>
      </div>
      <p className="text-[#6C757D] text-sm text-center mt-4">
        Page {currentPage} of {Math.ceil(reservations.length / itemsPerPage)}
      </p>

      <table className="w-full border-collapse bg-[#FDFDFD] border border-[#E0E0E0] rounded-lg shadow-md text-[#212529]">
        <thead className="bg-[#F8F9FA]">
          <tr>
            <th className="p-4 text-left border-b border-[#E0E0E0]">Time</th>
            <th className="p-4 text-left border-b border-[#E0E0E0]">Name</th>
            <th className="p-4 text-left border-b border-[#E0E0E0]">
              Contact Information
            </th>
            <th className="p-4 text-left border-b border-[#E0E0E0]">
              Comments
            </th>
            <th className="p-4 text-left border-b border-[#E0E0E0]">
              Preparer
            </th>
            <th className="p-4 text-left border-b border-[#E0E0E0]">
              Quality Reviewer
            </th>
            <th className="p-4 text-left border-b border-[#E0E0E0]">File</th>
          </tr>
        </thead>
        {currentItems.length < 1 ? (
          <tbody>
            <tr className="hover:bg-[#F8F9FA] transition duration-200">
              <td className="p-4 border-b border-[#E0E0E0]">
                No Reservations Today!
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {currentItems.map((reservation) => (
              <tr
                key={reservation.booking_ref}
                className="hover:bg-[#F8F9FA] transition duration-200"
              >
                <td className="p-4 border-b border-[#E0E0E0]">
                  {reservation.res_time}
                </td>
                <td className="p-4 border-b border-[#E0E0E0]">
                  {reservation.client_given_name} {reservation.client_surname}
                </td>
                <td className="p-4 border-b border-[#E0E0E0]">
                  {reservation.client_phone_number}
                </td>
                <td className="p-4 border-b border-[#E0E0E0]">
                  <div
                    contentEditable={true}
                    className="textarea-like whitespace-pre-wrap break-words w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                  ></div>{" "}
                </td>
                <td className="p-4 border-b border-[#E0E0E0]">
                  <div
                    contentEditable={true}
                    className="textarea-like whitespace-pre-wrap break-words w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                  ></div>{" "}
                </td>
                <td className="p-4 border-b border-[#E0E0E0]">
                  <div
                    contentEditable={true}
                    className="textarea-like whitespace-pre-wrap break-words w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                  ></div>{" "}
                </td>
                <td className="p-4 border-b border-[#E0E0E0]">
                  <div
                    contentEditable={true}
                    className="textarea-like whitespace-pre-wrap break-words w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                  ></div>{" "}
                </td>
            
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </section>
  );
}

// we need to pull reservations from the db that include the date but we need to query
// sort the reservations that come through by time from earliest to lastest preferalbly put them in groups // each location doesn't overlap days execpt the march 7th
