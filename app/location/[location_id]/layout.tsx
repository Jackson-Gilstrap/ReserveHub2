
import { RoleProvider } from "@/app/lib/context/roleContext";
export default function LocationLayout({
  children,
  appointments,
  // reservations,
}: {
  children: React.ReactNode;
  appointments: React.ReactNode;
  // reservations: React.ReactNode;
}) {
  return (
    <>
    <RoleProvider>
      {children}

      <div className="grid grid-cols-1 gap-4 mx-auto">
        {appointments}
        {/* {reservations} */}
      </div>

    </RoleProvider>
    </>
  );
}
