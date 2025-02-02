import BookingModule from "../components/utility/booking/bookingModules";
const BookingPage = () => {
    return (
        <div className="px-6 py-10">
          {/* Gradient Title Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md p-6 text-center">
            <h1 className="text-4xl font-extrabold tracking-wide">Booking Process</h1>
            <p className="text-lg mt-2 opacity-90">
              Complete our booking process to reserve your appointment today.
            </p>
          </div>
    
          {/* Booking Module */}
          <div className="mt-10 flex justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Questionnaire</h2>
              <p className="text-gray-600 mt-2">Find out if you are eligible for our services.</p>
              <div className="mt-4 flex justify-end">
                <a
                  href="booking/questionnaire"
                  className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
    
          {/* Reminder Section */}
          <section className="mt-12 text-center bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Reminder:</h2>
            <p className="text-lg mt-2">
              If you are returned to this screen due to not being eligible, please call this number:
            </p>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              <a href="tel:6074314338" className="hover:underline">
                607-431-4338
              </a>
            </p>
          </section>
        </div>
      );
}

export default BookingPage;