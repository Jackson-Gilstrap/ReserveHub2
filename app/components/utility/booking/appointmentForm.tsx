import { useEffect, useState, useMemo, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Appointment, getAppointments } from "@/app/lib/appointments";
import { Location, getLocations } from "@/app/lib/locations";
import { formattedISOnoTime } from "../functions/datetime";

// create a quick button selection for filing single or jointly
export default function AppointmentForm() {
  const [date, setDate] = useState<string>("");
  const [file_jointly_switch, setFileJointly] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const form_ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSelection = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    console.log(selectedAppointment);
  };

  const handlePhoneNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    e.target.value = formatted; // 
  };

  const formatPhoneNumber = (value: string) => {
    const numbersOnly = value.replace(/\D/g, ""); 
    if (numbersOnly.length <= 3) {
      return numbersOnly;
    } else if (numbersOnly.length <= 6) {
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    } else {
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(
        3,
        6
      )}-${numbersOnly.slice(6, 10)}`;
    }
  };

  const handleJointSelection = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.innerHTML;
    console.log(value);
    if (value === "Yes") {
      setFileJointly(true);
    } else if (value === "No") {
      setFileJointly(false);
    }
  };

  const filteredAppointments = useMemo(() => {
    return appointments.reduce((filtered: Appointment[], appointment) => {
      const matchesDate = date
        ? appointment.app_date === formattedISOnoTime(date)
        : true;
      const matchesLocation = location
        ? appointment.app_location === location
        : true;

      if (matchesDate && matchesLocation) {
        filtered.push(appointment);
        console.log("not formatted: ", appointment.app_date);
        console.log(appointment.app_date === formattedISOnoTime(date));
      }

      return filtered;
    }, []);
  }, [appointments, date, location]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true)
    setError("")

    const newFormData = new FormData(form_ref.current!);
    const data = Object.fromEntries(newFormData.entries());

    const checkboxes = {
      file_jointly: file_jointly_switch,
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error.name === "TypeError") {
        errorMessage =
          "Network error: Unable to connect to the server. Please check your internet connection.";
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false)
      
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
    <>
      <div className="px-6 py-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-3xl font-extrabold tracking-wide">
            Make a Reservation
          </h1>
        </div>

        <div className="flex flex-col items-center px-6 mt-8 relative">
          <h3>Are going to doing a joint return?</h3>
          <div className="mt-8 flex flex-col w-full max-w-md gap-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 px-2 py-1 text-sm font-semibold text-white rounded-sm shadow-lg"
              onClick={(e) => handleJointSelection(e)}
            >
              Yes
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 px-2 py-1 text-sm font-semibold text-white rounded-sm shadow-lg"
              onClick={(e) => handleJointSelection(e)}
            >
              No
            </button>
          </div>
        </div>

        {file_jointly_switch ? (
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 mt-8 p-4 rounded-md shadow-md">
            <span className="font-medium">
              You are making a reservation for a <strong>joint return</strong>
            </span>
          </div>
        ) : (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 mt-8 p-4 rounded-md shadow-md">
            <span className="font-medium">
              You are making a reservation for a <strong>single return</strong>
            </span>
          </div>
        )}

        <form
          ref={form_ref}
          onSubmit={handleSubmit}
          method="POST"
          className="mx-auto mt-8 max-w-4xl bg-white border border-gray-300 rounded-lg shadow-md p-6"
        >
          {file_jointly_switch && file_jointly_switch ? (
            <div>
              <section className="border border-gray-300 bg-gray-50 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  Enter Your Information Below
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {[
                    { label: "First Name", name: "f_name", type: "text" },
                    { label: "Last Name", name: "l_name", type: "text" },
                    {
                      label: "Phone Number (Primary)",
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
                      <label
                        htmlFor={input.name}
                        className="block text-gray-600"
                      >
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
                        {...(input.maxLength
                          ? { maxLength: input.maxLength }
                          : {})}
                        {...(input.minLength
                          ? { minLength: input.minLength }
                          : {})}
                        {...(input.name === "phone_number"
                          ? { onChange: handlePhoneNumChange }
                          : {})}
                        {...(input.name === "phone_number"
                          ? { ref: phoneNumberRef }
                          : {})}
                        required
                      />
                    </div>
                  ))}
                </div>
              </section>
              <section className="border border-gray-300 bg-gray-50 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  Enter who will be filing jointly with you below
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {[
                    { label: "First Name", name: "j_f_name", type: "text" },
                    { label: "Last Name", name: "j_l_name", type: "text" },
                  ].map((input) => (
                    <div key={input.name}>
                      <label
                        htmlFor={input.name}
                        className="block text-gray-600"
                      >
                        {input.label}
                      </label>
                      <input
                        type={input.type}
                        name={input.name}
                        id={input.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        required
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <div>
              <section className="border border-gray-300 bg-gray-50 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  Enter Your Information Below
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {[
                    { label: "First Name", name: "f_name", type: "text" },
                    { label: "Last Name", name: "l_name", type: "text" },
                    {
                      label: "Phone Number (Primary)",
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
                      <label
                        htmlFor={input.name}
                        className="block text-gray-600"
                      >
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
                        {...(input.maxLength
                          ? { maxLength: input.maxLength }
                          : {})}
                        {...(input.minLength
                          ? { minLength: input.minLength }
                          : {})}
                        {...(input.name === "phone_number"
                          ? { onChange: handlePhoneNumChange }
                          : {})}
                        {...(input.name === "phone_number"
                          ? { ref: phoneNumberRef }
                          : {})}
                        required
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
          <div className="border border-gray-300 bg-white rounded-lg p-6 shadow-md mx-auto mt-8 max-w-4xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Filters
            </h2>

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
              <p className="font-bold text-gray-800">
                No appointment selected!
              </p>
            </section>
          )}

          <section className="border border-gray-300 bg-gray-50 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              Other Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
            >{loading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0a12 12 0 00-12 12h4z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Make Reservation"
            )}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}

      </div>
    </>
  );
}
