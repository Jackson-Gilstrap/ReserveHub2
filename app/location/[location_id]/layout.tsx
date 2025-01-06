import { LocationProvider } from "@/app/lib/context/locationContext";

export default function LocationLayout({
  children,
  appointments,
  reservations,
}: {
  children: React.ReactNode;
  appointments: React.ReactNode;
  reservations: React.ReactNode;
}) {
  return (
    <>
      {children}
      <LocationProvider>
        <div className="grid grid-cols-2 gap-4">
          {appointments}
          {reservations}
        </div>
      </LocationProvider>
    </>
  );
}
