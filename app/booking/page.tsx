import BookingModule from "../components/utility/booking/bookingModules";
const BookingPage = () => {
    return (
        <>
        <div className="px-4 py-6 mx-6 mt-8">
            <h1 className="text-3xl">Booking process</h1>
            <p className="text-xl">Complete our booking process to reserve your appointment today.</p>
        </div>
        <BookingModule title="Questionnaire" text="Find out if you are eligible for our services" url="booking/questionnaire"/>

        </>
    )
}

export default BookingPage;