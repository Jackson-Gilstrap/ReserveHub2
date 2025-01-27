"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Reservations = () => {
  const [searchInput, setSearchInput] = useState<string>();
  const router = useRouter()

  const handleSearch = () => {
    console.log(searchInput);
    router.push(`reservation/${searchInput}`)
    
  };
  return (
    <>
      <section className="flex flex-col bg-[#FDFDFD] p-6 rounded-lg border border-[#E0E0E0] shadow-md max-w-2xl mx-auto">
        {/* Heading */}
        <h3 className="text-[#212529] text-2xl font-semibold mb-2">
          Search Reservation
        </h3>
        
        {/* Instructions */}
        <span className="text-[#6C757D] mb-4">
          Input a booking reference code <br />
          <strong className="text-[#212529] font-semibold">No hashtag</strong>
          <br />
          <strong className="text-[#212529] font-semibold">Case sensitive</strong>
        </span>
        
        {/* Input Section */}
        <div className="flex flex-row items-center gap-4">
          <label
            htmlFor="search-booking-ref"
            className="text-[#212529] font-medium"
          >
            Booking Reference
          </label>
          <input
            type="text"
            name="search-booking-ref"
            id="search-booking-ref"
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 px-3 py-2 border border-[#E0E0E0] rounded-md bg-[#FFFFFF] text-[#212529] focus:border-[#4A90E2] focus:ring-[#4A90E2] focus:ring-1 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 text-white bg-[#4A90E2] rounded-md shadow-md hover:bg-[#357ABD] active:bg-[#357ABD] active:scale-95 transition duration-300"
          >
            Search
          </button>
        </div>
      </section>
    </>
  );
  
    
  
};

export default Reservations;
