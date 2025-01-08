"use client";
import { Location, getLocation } from "@/app/lib/locations";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NavButton from "@/app/components/utility/button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
const LocationPage = () => {
  const [location, setLocation] = useState<Location>();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const location_id = parts[parts.length - 1];
  const { data: session, status } = useSession(); // Google auth user will evntually check emails against a db to see roles

  if(!session) {
    redirect("/")
  }
  

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
      <NavButton url="dashboard" text="Dashboard" disabled={false} />
      <section className="bg-[#FDFDFD] border border-[#E0E0E0] rounded-lg p-6  mt-4 shadow-md max-w-2xl mx-auto">
        <div className="flex flex-row justify-between items-center p-4 mx-auto">
          <h3 className="text-[#212529] text-2xl font-semibold mb-4">
            {location?.location_name}
          </h3>
          <NavButton url={`edit-location/${location_id}`} text="Edit" disabled={false} />
        </div>
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
          
        </div>
        <div>
          <NavButton url={`${location?.location_name}/create-appointment`} text="Create Appointment" disabled={false}/>
        </div>
      </section>
    </>
  );
};

export default LocationPage;
