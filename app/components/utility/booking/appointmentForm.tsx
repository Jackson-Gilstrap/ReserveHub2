import { useEffect, useState, useMemo, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Appointment, getAppointments } from "@/app/lib/appointments";
import { Location, getLocations } from "@/app/lib/locations";

export default function AppointmentForm() {
  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>();
  const [loading, setLoading] = useState<boolean>(false);
  const form_ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const formatDate = (date: string) => {
    let tempArr = date.split("T");
    return tempArr[0];
  };

  const handleSelection = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    console.log(selectedAppointment);
  };

  const filteredAppointments = useMemo(() => {
    return appointments
      .filter((appointment) =>
        date ? formatDate(appointment.app_date) === date : true
      )
      .filter((appointment) =>
        location ? appointment.app_location === location : true
      );
  }, [appointments, date, location]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newFormData = new FormData(form_ref.current!);
    const data = Object.fromEntries(newFormData.entries());

    const checkboxes = {
      file_jointly: form_ref.current!.file_jointly.checked,
      has_dependent: form_ref.current!.has_dependent.checked,
    };

    const final_data = { ...data, ...checkboxes };

    console.log(final_data);
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:8080/api/create-reservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ final_data, selectedAppointment }),
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();
      console.log(result);

      setTimeout(() => {
        setLoading(false);
        router.push(`/booking/${result.booking_ref}`);
      }, 3000);
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch appointments when component mounts
    getAppointments()
      .then((fetchedAppointments) => {
        if (Array.isArray(fetchedAppointments)) {
          setAppointments(fetchedAppointments);
        } else {
          console.error("Invalid appointments data:", fetchedAppointments);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch appointments:", error);
      });
  }, []);

  useEffect(() => {
    //fetch locations when component loads
    getLocations()
      .then((fetchedLocations) => {
        if (Array.isArray(fetchedLocations)) {
          setLocations(fetchedLocations);
        } else {
          console.error("Failed to fetch locations");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="ml-8">
        <h2 className="text-xl font-semibold text-[#212529]">
          Pick your Appointment
        </h2>
      </div>
      <div className="border-2 border-[#E0E0E0] bg-[#FDFDFD] rounded-lg p-6 shadow-[0_4px_8px_rgba(0,0,0,0.05)] mx-16 mt-8">
        <p className="text-lg font-semibold text-[#212529] mb-4">Filters</p>

        <div className="grid grid-cols-2 gap-2">
          <section className="mb-8">
            <label
              htmlFor="date"
              className="block text-md font-medium text-[#6C757D] mb-2"
            >
              Pick a date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border-2 border-[#E0E0E0] bg-[#FFFFFF] text-[#212529] rounded-md focus:border-[#4A90E2] focus:outline-none"
            />
          </section>

          <section>
            <label
              htmlFor="locations"
              className="block text-md font-medium text-[#6C757D] mb-2"
            >
              Pick a location
            </label>
            <select
              name="locations"
              id="locations"
              defaultValue={""}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border-2 border-[#E0E0E0] bg-[#FFFFFF] text-[#212529] rounded-md focus:border-[#4A90E2] focus:outline-none"
            >
              <option value={""}>Show All</option>
              {locations.map((location) => (
                <option
                  key={location.location_id}
                  value={`${location.location_name}`}
                >
                  {location.location_name}
                </option>
              ))}
            </select>
          </section>
        </div>
      </div>

      <form
        ref={form_ref}
        className="mx-6 mt-8 px-6 py-4 bg-[#FDFDFD] border-2 border-[#E0E0E0] rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.05)] flex flex-col justify-around items-center"
        onSubmit={handleSubmit}
        method="POST"
      >
        {filteredAppointments && filteredAppointments.length > 0 ? (
          <section className="px-4 py-4 border-2 border-[#E0E0E0] bg-[#FDFDFD] rounded-lg mt-8">
            <p className="text-lg font-semibold text-[#212529] mb-4">
              Select an appointment
            </p>

            <div className="grid grid-cols-3 gap-4">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.app_id}
                  onClick={() => handleSelection(appointment)}
                  className={`p-4 rounded-md ${
                    appointment.app_status === 0
                      ? "bg-[#F8F9FA] text-[#6C757D] cursor-not-allowed"
                      : "bg-[#4A90E2] text-white hover:cursor-pointer hover:bg-[#357ABD]"
                  } ${
                    selectedAppointment?.app_id === appointment.app_id
                      ? "bg-[#50E3C2]"
                      : ""
                  }`}
                >
                  <h4 className="font-bold">{appointment.app_title}</h4>
                  <p>{`${appointment.app_date} at ${appointment.app_time}`}</p>
                  <p>{appointment.app_location}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="px-4 py-4 border-2 border-[#E0E0E0] bg-[#FDFDFD] rounded-lg mt-8">
            <p className="font-bold">No appointments at selected location!</p>
          </section>
        )}

        {selectedAppointment ? (
          <section className="px-4 py-4 border-2 border-[#E0E0E0] bg-[#FDFDFD] rounded-lg mt-8">
            <h4 className="font-bold">{selectedAppointment.app_title}</h4>
            <p>{`${selectedAppointment.app_date} at ${selectedAppointment.app_time}`}</p>
            <p>{selectedAppointment.app_location}</p>
          </section>
        ) : (
          <section className="px-4 py-4 border-2 border-[#E0E0E0] bg-[#FDFDFD] rounded-lg mt-8">
            <p className="font-bold">No appointment selected!</p>
          </section>
        )}

        <section className="px-4 py-4 mt-8 bg-[#FDFDFD] rounded-lg border-2 border-[#E0E0E0]">
          <p className="text-lg font-semibold text-center text-[#212529]">
            Enter Your Information Below
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <label htmlFor="f_name" className="text-[#212529]">
              First Name
            </label>
            <input
              type="text"
              name="f_name"
              id="f_name"
              className="px-3 py-2 bg-[#FFFFFF] border-2 border-[#E0E0E0] rounded-md focus:border-[#4A90E2] focus:outline-none"
            />

            <label htmlFor="l_name" className="text-[#212529]">
              Last Name
            </label>
            <input
              type="text"
              name="l_name"
              id="l_name"
              className="px-3 py-2 bg-[#FFFFFF] border-2 border-[#E0E0E0] rounded-md focus:border-[#4A90E2] focus:outline-none"
            />

            <label htmlFor="phone_number" className="text-[#212529]">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone_number"
              id="phone_number"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              className="px-3 py-2 bg-[#FFFFFF] border-2 border-[#E0E0E0] rounded-md focus:border-[#4A90E2] focus:outline-none"
            />

            <label htmlFor="zipcode" className="text-[#212529]">
              Zipcode
            </label>
            <input
              type="text"
              name="zipcode"
              id="zipcode"
              className="px-3 py-2 bg-[#FFFFFF] border-2 border-[#E0E0E0] rounded-md focus:border-[#4A90E2] focus:outline-none"
            />
          </div>
        </section>

        <section className="px-4 py-4 mt-8 bg-[#FDFDFD] rounded-lg border-2 border-[#E0E0E0]">
          <p className="text-lg font-semibold text-center text-[#212529]">
            Other Information
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="file_jointly" className="text-[#212529]">
                Filing Jointly?
              </label>
              <input
                type="checkbox"
                name="file_jointly"
                id="file_jointly"
                className="ml-2"
              />
            </div>
            <div>
              <label htmlFor="has_dependent" className="text-[#212529]">
                Do you have any dependents?
              </label>
              <input
                type="checkbox"
                name="has_dependent"
                id="has_dependent"
                className="ml-2"
              />
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            disabled={filteredAppointments.length === 0}
            type="submit"
            className={`px-6 py-3 font-semibold rounded-md transition-all ${
              filteredAppointments.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#4A90E2] text-white hover:bg-[#357ABD]"
            }`}
          >
            Reserve
          </button>
        </div>
      </form>
    </>
  );
}
