
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

export function getReservations () {
  return fetch("http://localhost:8080/api/get-reservations").then((response: any) => {
      if(!response.ok) {
          throw new Error("Internal server error")
      }

      return response.json()
  }).then(data => {
      return data.body
  }).catch(error => {
      console.log(error.message);
      return error
  })
}