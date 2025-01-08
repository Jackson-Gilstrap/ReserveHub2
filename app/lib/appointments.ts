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
  return fetch("http://localhost:8080/api/get-appointments")
    .then((response: any) => {
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
  //fetch from backend
  return fetch(`http://localhost:8080/api/location/get-appointments/${location_id}`)
    .then((response: any) => {
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
