
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