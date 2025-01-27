"use client";
import { redirect } from "next/navigation";
import { useRef, FormEvent } from "react";
import { useSession } from "next-auth/react";

export default function CreateLocation() {
    const form_ref = useRef<HTMLFormElement>(null);
    const { data: session, status } = useSession(); // Google auth user will evntually check emails against a db to see roles
   
  
    //functions
    const createLocation = async (e: FormEvent) => {
      e.preventDefault();
      const formdata = new FormData(form_ref.current!);
      const data = Object.fromEntries(formdata.entries());
      console.log(data)
  
      if(status ==='authenticated') {
          //submit data to db and then redirect
         const response = await fetch(`http://localhost:8080/api/locations/create`, {
          method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
         })
  
         if (!response.ok) {
          throw new Error(response.statusText);
        }
  
        setTimeout(()=> {
          redirect('/dashboard')
        },1500)
    };
}
  
    console.log(status)
    if (!session) {
      redirect("/");
    }
  

  
    return (
      <form
        ref={form_ref}
        className="mx-6 mt-8 px-6 py-4 bg-[#FDFDFD] border-2 border-[#E0E0E0] rounded-lg shadow-md flex flex-col gap-4"
        onSubmit={createLocation}
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
          type="text"
          name="location_zipcode"
          id="location_zipcode"
          className="w-full px-3 py-2 border-2 border-[#E0E0E0] bg-[#FFFFFF] text-[#212529] rounded-md focus:border-[#4A90E2] focus:ring-[#4A90E2] focus:ring-1 focus:outline-none"
        />
  
        <button
          type="submit"
          className="px-6 py-3 mt-4 font-semibold rounded-md bg-[#4A90E2] text-white hover:bg-[#357ABD] transition duration-300"
        >
          Save
        </button>
      </form>
    );
}
  

