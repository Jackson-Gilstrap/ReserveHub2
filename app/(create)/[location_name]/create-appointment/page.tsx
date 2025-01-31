"use client";
import { redirect } from "next/navigation";
import { useRef, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";


export default function CreateAppointment () {
    const form_ref = useRef<HTMLFormElement>(null);
    const { data: session } = useSession();
    const pathname = usePathname();
    const parts = pathname.split("/");
    const newparts = parts[1].split("%20")
    const location_name = newparts.join(' ');    

    const createAppointment = async (e: FormEvent) => {
        e.preventDefault();
        const formdata = new FormData(form_ref.current!);
        const data = Object.fromEntries(formdata.entries());
        console.log(data)

        if(!session) {
            //submit data to db and then redirect
           const response = await fetch(`https://jacksongilstrap.site/api/appointments/create`, {
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

  return (
    <form
        ref={form_ref}
        className="mx-6 mt-8 px-6 py-4 bg-[#FDFDFD] border-2 border-[#E0E0E0] rounded-lg shadow-md flex flex-col gap-4"
        onSubmit={createAppointment}
        method="POST"
      >
        <label
          htmlFor="app_title"
          className="text-[#212529] font-medium text-sm"
        >
          Appoitment Title
        </label>
        <input
          required
          
          type="text"
          name="app_title"
          id="app_title"
          className="w-full px-3 py-2 border-2 border-[#E0E0E0] bg-[#FFFFFF] text-[#212529] rounded-md focus:border-[#4A90E2] focus:ring-[#4A90E2] focus:ring-1 focus:outline-none"
        />
  
        <label
          htmlFor="app_type"
          className="text-[#212529] font-medium text-sm"
        >
          Type
        </label>
        <select required name="app_type" id="app_type" className="w-full px-3 py-2 border-2 border-[#E0E0E0] bg-[#FFFFFF] text-[#212529] rounded-md focus:border-[#4A90E2] focus:ring-[#4A90E2] focus:ring-1 focus:outline-none"
        >
            <option value="Tax Service">Tax Service</option>
        </select>
  
        <label
          htmlFor="app_date"
          className="text-[#212529] font-medium text-sm"
        >
          Date
        </label>
        <input
          required
          type="date"
          name="app_date"
          id="app_date"
          className="w-full px-3 py-2 border-2 border-[#E0E0E0] bg-[#FFFFFF] text-[#212529] rounded-md focus:border-[#4A90E2] focus:ring-[#4A90E2] focus:ring-1 focus:outline-none"
        />
  
        <label
          htmlFor="app_time"
          className="text-[#212529] font-medium text-sm"
        >
          Time
        </label>
        <input
          required
          type="time"
          name="app_time"
          id="app_time"
          className="w-full px-3 py-2 border-2 border-[#E0E0E0] bg-[#FFFFFF] text-[#212529] rounded-md focus:border-[#4A90E2] focus:ring-[#4A90E2] focus:ring-1 focus:outline-none"
        />
  
        <label
          htmlFor="app_location"
          className="text-[#212529] font-medium text-sm"
        >
          Location
        </label>
        <select name="app_location" id="app_location" className="w-full px-3 py-2 border-2 border-[#E0E0E0] bg-[#FFFFFF] text-[#212529] rounded-md focus:border-[#4A90E2] focus:ring-[#4A90E2] focus:ring-1 focus:outline-none">
            <option value={location_name}>{location_name}</option>
        </select>

        <label htmlFor="max_slots">Max Slots</label>
        <input type="number" name="max_slots" id="max_slots" min={1} max={12} className="w-full px-3 py-2 border-2 border-[#E0E0E0] bg-[#FFFFFF] text-[#212529] rounded-md focus:border-[#4A90E2] focus:ring-[#4A90E2] focus:ring-1 focus:outline-none" />

  
        <button
          type="submit"
          className="px-6 py-3 mt-4 font-semibold rounded-md bg-[#4A90E2] text-white hover:bg-[#357ABD] transition duration-300"
        >
          Save
        </button>
      </form>
  )
}