"use client";
import { Location, getLocation } from "@/app/lib/locations";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NavButton from "@/app/components/utility/button";
const LocationPage = () => {
  const [location, setLocation] = useState<Location>();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const location_id = parts[parts.length - 1];

  useEffect(() => {
    getLocation(location_id)
      .then((fetchedLocation) => {
        setLocation(fetchedLocation);
      })
      .catch((error) => {
        console.error("Failed to fetch locations:", error);
      });

      
  }, []);
  return (
    <>
      <NavButton url="dashboard" text="Dashboard" disabled={false}/>
      <section className="bg-[#FDFDFD] border border-[#E0E0E0] rounded-lg p-6 shadow-md max-w-lg mx-auto">
        <h3 className="text-[#212529] text-2xl font-semibold mb-4">
          {location?.location_name}
        </h3>
        <p className="text-[#6C757D] text-lg font-medium mb-2">
          Location details
        </p>
    
        <div className="grid grid-cols-2 gap-4">
          <div className="text-[#212529] space-y-2">
            <span>Address: </span>
            <p>
              <span className="font-medium">
                {location?.location_street_address}
              </span>
            </p>
            <p>
              <span className="font-medium">{location?.location_city}</span>,{" "}
              <span className="font-medium">{location?.location_state}</span>{" "}
              <span className="font-medium">{location?.location_zipcode}</span>
            </p>
          </div>
          <div>
            <h4>Weekdays: </h4>

            {location?.weekdays.map((day, index) => (
              <span key={index}>{day}{" "}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LocationPage;
