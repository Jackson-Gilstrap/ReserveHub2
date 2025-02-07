import { useEffect, useState, useMemo, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Appointment, getAppointments } from "@/app/lib/appointments";
import { Location, getLocations } from "@/app/lib/locations";
import { formattedISOnoTime, formatDate } from "../functions/datetime";

export default function AppointmentForm() {
  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>();
  const form_ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSelection = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    console.log(selectedAppointment);
  };

  const filteredAppointments = useMemo(() => {
    console.log(formattedISOnoTime(date));
    return appointments
      .filter((appointment) =>
        date
          ? formatDate(appointment.app_date) === formattedISOnoTime(date)
          : true
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
      file_jointly: form_ref.current!.file_jointly.checked || false,
      has_dependent: form_ref.current!.has_dependent.checked || false,
      is_tce: form_ref.current!.is_tce.checked || false,
    };

    const final_data = { ...data, ...checkboxes };

    console.log(final_data);
    console.log(selectedAppointment);
    try {
      const response = await fetch(
        "https://jacksongilstrap.codes/api/reservations/create",
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
        router.push(`/booking/${result.booking_ref}`);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useEffect(() => {
    getAppointments()
      .then((fetchedAppointments) => {
        if (Array.isArray(fetchedAppointments)) {
          console.log(fetchedAppointments);
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
    <div className="px-6 py-8">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md p-6 text-center">
        <h1 className="text-3xl font-extrabold tracking-wide">
          Pick Your Appointment
        </h1>
      </div>

      <div className="border border-gray-300 bg-white rounded-lg p-6 shadow-md mx-auto mt-8 max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="date"
              className="block text-md font-medium text-gray-600 mb-2"
            >
              Pick a date
            </label>
            <input
              type="date"
              id="date"
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label
              htmlFor="locations"
              className="block text-md font-medium text-gray-600 mb-2"
            >
              Pick a location
            </label>
            <select
              id="locations"
              defaultValue={""}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value="">Show All</option>
              {locations.map((location) => (
                <option
                  key={location.location_id}
                  value={location.location_name}
                >
                  {location.location_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <form
        ref={form_ref}
        onSubmit={handleSubmit}
        method="POST"
        className="mx-auto mt-8 max-w-4xl bg-white border border-gray-300 rounded-lg shadow-md p-6"
      >
        {filteredAppointments && filteredAppointments.length > 0 ? (
          <section className="border border-gray-300 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Select an appointment
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.app_id}
                  onClick={() => handleSelection(appointment)}
                  className={`p-4 rounded-md text-center cursor-pointer transition-all duration-300 ${
                    appointment.app_status === 0
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : selectedAppointment?.app_id === appointment.app_id
                      ? "bg-green-400 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600"
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
          <section className="border border-gray-300 bg-gray-50 rounded-lg p-6 text-center">
            <p className="font-bold text-gray-800">
              No appointments at selected location!
            </p>
          </section>
        )}

        {selectedAppointment ? (
          <section className="border border-gray-300 bg-green-500 rounded-lg p-6 mt-8 text-center">
            <h4 className="font-bold text-gray-800">
              {selectedAppointment.app_title}
            </h4>
            <p>{`${selectedAppointment.app_date} at ${selectedAppointment.app_time}`}</p>
            <p>{selectedAppointment.app_location}</p>
          </section>
        ) : (
          <section className="border border-gray-300 bg-gray-50 rounded-lg p-6 mt-8 text-center">
            <p className="font-bold text-gray-800">No appointment selected!</p>
          </section>
        )}

        <section className="border border-gray-300 bg-gray-50 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            Enter Your Information Below
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {[
              { label: "First Name", name: "f_name", type: "text" },
              { label: "Last Name", name: "l_name", type: "text" },
              {
                label: "Phone Number",
                name: "phone_number",
                type: "tel",
                placeholder: "i.e. 111-111-111",
                pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
              },
              {
                label: "Zipcode",
                name: "zipcode",
                type: "text",
                maxLength: 5,
                minLength: 5,
              },
            ].map((input) => (
              <div key={input.name}>
                <label htmlFor={input.name} className="block text-gray-600">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  name={input.name}
                  id={input.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  {...(input.placeholder
                    ? { placeholder: input.placeholder }
                    : {})}
                  {...(input.pattern ? { pattern: input.pattern } : {})}
                  {...(input.maxLength ? { maxLength: input.maxLength } : {})}
                  {...(input.minLength ? { minLength: input.minLength } : {})}
                  required
                />
              </div>
            ))}
          </div>
        </section>
        <section className="border border-gray-300 bg-gray-50 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            Other Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="file_jointly"
                id="file_jointly"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="file_jointly" className="ml-2 text-gray-800">
                Filing Jointly?
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="has_dependent"
                id="has_dependent"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="has_dependent" className="ml-2 text-gray-800">
                Do you have any dependents?
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_tce"
                id="is_tce"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="is_tce" className="ml-2 text-gray-800">
                Are you 60 yrs old as of December 31st, 2024?
              </label>
            </div>
          </div>
        </section>

        <div className="mt-8 text-center">
          <button
            disabled={!selectedAppointment?.app_id}
            type="submit"
            className={`px-6 py-3 font-semibold rounded-md transition-all duration-300 ${
              !selectedAppointment?.app_id
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Reserve Appointment
          </button>
        </div>
      </form>
    </div>
  );
}
