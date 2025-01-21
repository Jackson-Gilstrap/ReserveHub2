import BookingModule from "../components/utility/booking/bookingModules";
const BookingPage = () => {
    return (
        <>
        <div className="px-4 py-6 mx-6 mt-8">
            <h1 className="text-3xl">Booking process</h1>
            <p className="text-xl">Complete our booking process to reserve your appointment today.</p>
        </div>
        <BookingModule title="Questionnaire" text="Find out if you are eligible for our services" url="booking/questionnaire"/>
        <section className="px-4 py-6 mx-6 mt-8">
            <h2 className="text-2xl font-bold text-red-500">
                Reminder:
            </h2>
            <p className="text-xl font-semibold">
                If you are returned to this screen due to not being eligible please call this number down below<br/><span className="text-blue-500">607-431-4338</span>
            </p>
        </section>
        </>
        //global state varible to track how many times the questionnaire was completed.
    )
}

export default BookingPage;