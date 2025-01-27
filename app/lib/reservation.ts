export interface Reservation {
  res_date: string;
  res_time: string;
  res_location: string;
  res_type: string;
  booking_ref: string;
  file_jointly: boolean;
  for_dependent: boolean;
  is_tce:boolean;
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

export interface DesciptiveReservation extends ModifiedReservation {
  file_jointly: boolean;
  for_dependent: boolean;
  is_tce: boolean;
}


export function getReservation(bookingRef: string) {
  return fetch(`http://localhost:8080/api/reservations/read/bookingRef/${bookingRef}`).then(response => {
    if (!response.ok) {
      throw new Error("Internal Server Error");
    }

    return response.json();
  }).then(data => {
    return data.body
  }).catch(error => {
    console.log(error);
    return error
  })
}

export function deleteReservation(bookingRef: string) {
  return fetch(`http://localhost:8080/api/reservations/delete/${bookingRef}`).then(response => {
    if (!response.ok) {
      throw new Error("Internal Server Error");
    }
    return response.json()
  }).then(data => {
    return data.body
  }).catch(error=> {
    console.log(error);
    return error
  })
}
export function getReservations() {
  return fetch("http://localhost:8080/api/reservations/read")
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
  return fetch(`http://localhost:8080/api/reservations/read/date/${date}`)
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
export function getReservationByAppId(id: number) {
  return fetch(`http://localhost:8080/api/reservations/read/id/${id}`)
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
