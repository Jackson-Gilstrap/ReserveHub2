"use client";
import NavButton from "@/app/components/utility/button";
import AppointmentForm from "@/app/components/utility/booking/appointmentForm";

const AppointmentPage = () => {
  
  return (
    <>
      <AppointmentForm/>
      <NavButton url="booking" text="Back" disabled={false}/>
    </>
  );
};

export default AppointmentPage;
