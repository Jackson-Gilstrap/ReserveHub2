"use client";
import { formatDate } from "@/app/components/utility/functions/datetime";
import { useState, useEffect } from "react";
import {
  DesciptiveReservation,
  getReservationByDate,
} from "@/app/lib/reservation";
//@ts-expect-error this error is because html2pdf doesn't have type file modules
import html2pdf from "html2pdf.js";

export default function DailyReports() {
  const [reservations, setReservations] = useState<DesciptiveReservation[]>([]);
  const uniqueTimes = [
    ...new Set(reservations.map((reservation) => reservation.res_time)),
  ];
  const [date, setDate] = useState<Date>(new Date());
  const [desiredTime, setDesiredTime] = useState(uniqueTimes[0]);
  const filteredReservations = reservations.filter(
    (res) => res.res_time === desiredTime
  );
  const pdfWidth = 297; // A4 width in mm (landscape: 297)
  const pdfHeight = 297;
  const generatePdf = async () => {
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

  useEffect(() => {
    if (date) {
      getReservationByDate(formatDate(date.toISOString())).then(
        (fetchedReservations) => {
          if (Array.isArray(fetchedReservations)) {
            setReservations(fetchedReservations);
            console.log(fetchedReservations)
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

  useEffect(() => {
    if (!uniqueTimes.includes(desiredTime)) {
      setDesiredTime(uniqueTimes[0]);
    }
  }, [reservations]);

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
      <div>
        <ul className="flex gap-4" data-html2canvas-ignore>
          {uniqueTimes.map((time, index) => (
            <li
              key={index}
              onClick={() => setDesiredTime(time)}
              className={`cursor-pointer px-3 py-1 rounded-md ${
                desiredTime === time ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {time}
            </li>
          ))}
        </ul>
      </div>

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
        {reservations.length < 1 ? (
          <tbody>
            <tr className="hover:bg-[#F8F9FA] transition duration-200">
              <td className="p-4 border-b border-[#E0E0E0]">
                No Reservations Today!
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr
                key={reservation.booking_ref}
                className="hover:bg-[#F8F9FA] transition duration-200"
              >
                <td className="p-4 border-b border-[#E0E0E0]">
                  {reservation.res_time}
                </td>
                <td className="p-4 border-b border-[#E0E0E0]">
                  {reservation.client_given_name} {reservation.client_surname}
                  <br /> &#40;{reservation.booking_ref}&#41;
                </td>
                <td className="p-4 border-b border-[#E0E0E0]">
                  {reservation.client_phone_number}
                </td>
                <td className="p-4 border-b border-[#E0E0E0]">
                    <ul className=" list-disc pl-4">
                      {reservation.has_w2 === true  && <li>W2</li>}
                      {reservation.has_1099NEC && <li>1099-NEC</li>}
                      {reservation.has_1099MISC && <li>1099-MISC</li>}
                      {reservation.has_w2_os && <li>W2&#40;Out of state&#41;</li>}
                      {reservation.multi_year && <li>Multi-Year Filing</li>}
                    </ul>
                  {/* <div className="textarea-like whitespace-pre-wrap break-words w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1">
                  </div>{" "} */}
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
