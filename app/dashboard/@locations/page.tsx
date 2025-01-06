import LocationList from "@/app/components/utility/dashboard/locationsList";
import NavButton from "@/app/components/utility/button";

const Locations = () => {
  return (
    <>
      <section className="flex flex-col bg-[#FDFDFD] p-6 rounded-lg border border-[#E0E0E0] shadow-md max-w-2xl mx-auto">
        <div className="flex flex-col justify-between items-center p-4 mx-auto">
          <NavButton url="#" text="Create" disabled={true} />
          <h3 className="text-[#212529] text-2xl font-semibold my-2">
            Locations
          </h3>
        </div>
        <span className="text-[#6C757D] mb-4">
          Click on a location to view details
        </span>
        <LocationList />
      </section>
    </>
  );
};

export default Locations;
