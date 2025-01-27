import LocationList from "@/app/components/utility/dashboard/locationsList";
import NavButton from "@/app/components/utility/button";
import { useRole } from "@/app/lib/context/roleContext";

const Locations = () => {
  const {role} = useRole()
  return (
    <>
      <section className="flex flex-col bg-[#FDFDFD] p-6 rounded-lg border border-[#E0E0E0] shadow-md max-w-2xl max-h-max mx-auto">
        <div className="flex flex-col justify-between items-center p-4 mx-auto">
          <NavButton url="create-location" text="Create" disabled={role != 'admin'} />
          <h3 className="text-[#212529] text-2xl font-semibold my-2">
            Locations
          </h3>
        </div>
        <span className="text-[#6C757D] mb-4 ml-6">
          Click on a location to view details
        </span>
        <LocationList />
      </section>
    </>
  );
};

export default Locations;
