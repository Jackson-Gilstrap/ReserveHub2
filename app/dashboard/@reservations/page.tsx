import ReservationList from "@/app/components/utility/dashboard/reservationsList";
const Reservations = () => {
  return (
    <>
      <section className="flex flex-col bg-[#FDFDFD] p-6 rounded-lg border border-[#E0E0E0] shadow-md max-w-2xl mx-auto">
        <h3 className="text-[#212529] text-2xl font-semibold mb-2">
          Reservations
        </h3>
        <span className="text-[#6C757D] mb-4">
          Click on a reservation to view details
        </span>
        <span className="text-[#6C757D] mb-4">
          Shows the most recently made reservations first
        </span>
        <ReservationList/>
      </section>
    </>
  );
};

export default Reservations;
