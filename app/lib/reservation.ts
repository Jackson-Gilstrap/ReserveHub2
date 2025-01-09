export interface Reservation {
  res_date: string;
  res_time: string;
  res_location: string;
  res_type: string;
  booking_ref: string;
  file_jointly: boolean;
  for_dependent: boolean;
  client_id: string;
}

export interface ModifiedReservation {
  booking_ref: string;
  res_time: string;
  res_location: string;
  client_given_name: string;
  client_surname: string;
  client_phone_number: string;
}

export function getReservations() {
  return fetch("http://localhost:8080/api/get-reservations")
    .then((response: any) => {
      if (!response.ok) {
        throw new Error("Internal server error");
      }

      return response.json();
    })
    .then((data) => {
      return data.body;
    })
    .catch((error) => {
      console.log(error.message);
      return error;
    });
}

export function getReservationByDate(date: string) {
  return fetch(`http://localhost:8080/api/reservations/get-reservations/${date}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Internal Server Error");
      }

      return response.json();
    })
    .then((data) => {
      return data.body;
    })
    .catch((error) => {
      console.log(error.message);
      return error;
    });
}
