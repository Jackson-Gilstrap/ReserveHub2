export type Appointment = {
  app_id: number;
  app_title: string;
  app_date: string;
  app_time: string;
  app_type: string;
  app_location: string;
  app_status: number;
  cur_slot: number;
  max_slot: number;
};

//get appointments

export function getAppointments() {
  //fetch from backend
  return fetch("http://localhost:8080/api/appointments/read")
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error");
      }
      return response.json();
    })
    .then((data) => {
      return data.body;
    })
    .catch((error) => {
      console.log(error.message);
      return error
    });
}


export function getAppointmentsByLocation(location_id: string) {
  console.log("in the function: ", location_id)
  //fetch from backend
  return fetch(`http://localhost:8080/api/appointments/read/location/${location_id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.body)
      return data.body;
    })
    .catch((error) => {
      console.log(error.message);
      return error
    });
}
