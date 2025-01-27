"use client";
import { usePathname, redirect } from "next/navigation";
import { useState, useEffect, useRef, FormEvent } from "react";
import { Location, getLocation, deleteLocation } from "@/app/lib/locations";
import { useSession } from "next-auth/react";
import { useRole } from "@/app/lib/context/roleContext";

export default function EditLocation() {
  const pathname = usePathname();
  const form_ref = useRef<HTMLFormElement>(null);
  const { data: session } = useSession(); // Google auth user will evntually check emails against a db to see roles
  const [location, setLocation] = useState<Location>();
  const {role} = useRole()

  const parts = pathname.split("/");
  const location_id = parts[parts.length - 1];

  //functions
  const submitChangedLocationData = (e: FormEvent) => {
    e.preventDefault();
    const formdata = new FormData(form_ref.current!);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);
  };

  const handleDelete = () => {
          deleteLocation(location_id)
      }

  if (!session) {
    redirect("/");
  }

  useEffect(() => {
    getLocation(location_id)
      .then((fetchedLocation) => {
        setLocation(fetchedLocation);
      })
      .catch((error) => {
        console.error("Failed to fetch locations:", error);
      });
  }, [location_id]);

  return (
    <form
      ref={form_ref}
      className="mx-6 mt-8 px-6 py-4 bg-[#FDFDFD] border-2 border-[#E0E0E0] rounded-lg shadow-md flex flex-col gap-4"
      onSubmit={submitChangedLocationData}
      method="POST"
    >
      <label
        htmlFor="location_name"
        className="text-[#212529] font-medium text-sm"
      >
        Location Name
      </label>
      <input
        required
        placeholder={location?.location_name}
        type="text"
        name="location_name"
        id="location_name"
        className="w-full px-3 py-2 border-2 border-[#E0E0E0] bg-[#FFFFFF] text-[#212529] rounded-md focus:border-[#4A90E2] focus:ring-[#4A90E2] focus:ring-1 focus:outline-none"
      />

      <label
        htmlFor="location_street_address"
        className="text-[#212529] font-medium text-sm"
      >
        Street Address
      </label>
      <input
        required
        placeholder={location?.location_street_address}
        type="text"
        name="location_street_address"
        id="location_street_address"
        className="w-full px-3 py-2 border-2 border-[#E0E0E0] bg-[#FFFFFF] text-[#212529] rounded-md focus:border-[#4A90E2] focus:ring-[#4A90E2] focus:ring-1 focus:outline-none"
      />

      <label
        htmlFor="location_city"
        className="text-[#212529] font-medium text-sm"
      >
        City
      </label>
      <input
        required
        placeholder={location?.location_city}
        type="text"
        name="location_city"
        id="location_city"
        className="w-full px-3 py-2 border-2 border-[#E0E0E0] bg-[#FFFFFF] text-[#212529] rounded-md focus:border-[#4A90E2] focus:ring-[#4A90E2] focus:ring-1 focus:outline-none"
      />

      <label
        htmlFor="location_state"
        className="text-[#212529] font-medium text-sm"
      >
        State
      </label>
      <input
        required
        placeholder={location?.location_state}
        type="text"
        name="location_state"
        id="location_state"
        className="w-full px-3 py-2 border-2 border-[#E0E0E0] bg-[#FFFFFF] text-[#212529] rounded-md focus:border-[#4A90E2] focus:ring-[#4A90E2] focus:ring-1 focus:outline-none"
      />

      <label
        htmlFor="location_zipcode"
        className="text-[#212529] font-medium text-sm"
      >
        Zipcode
      </label>
      <input
        required
        placeholder={location?.location_zipcode}
        type="text"
        name="location_zipcode"
        id="location_zipcode"
        className="w-full px-3 py-2 border-2 border-[#E0E0E0] bg-[#FFFFFF] text-[#212529] rounded-md focus:border-[#4A90E2] focus:ring-[#4A90E2] focus:ring-1 focus:outline-none"
      />
      <div className="border-t border-[#E0E0E0] mt-6 pt-4 flex flex-row gap-4">

      <button
        type="submit"
        className="px-6 py-3 mt-4 font-semibold rounded-md bg-[#4A90E2] text-white hover:bg-[#357ABD] transition duration-300"
      >
        Save
      </button>
      <button
        type="button"
        onClick={handleDelete}
        disabled = {role != "admin"}
        className="px-6 py-3 mt-4 font-semibold rounded-md bg-red-500 text-white hover:bg-red-300 transition duration-300"
        >
        delete{" "}
      </button>
      </div>
    </form>
  );
}
