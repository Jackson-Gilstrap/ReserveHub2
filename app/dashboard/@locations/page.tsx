
import LocationList from "@/app/components/utility/dashboard/locationsList"


const Locations = () => {
    return (
        <>
        <section className="flex flex-col bg-[#FDFDFD] p-6 rounded-lg border border-[#E0E0E0] shadow-md max-w-2xl mx-auto">

        <h3 className="text-[#212529] text-2xl font-semibold mb-2">Locations</h3>
        <span className="text-[#6C757D] mb-4">Click on a location to view details</span>
        <LocationList/>
        </section>
        </>
    )
}

export default Locations