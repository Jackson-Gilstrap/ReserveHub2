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

      <div className="grid grid-cols-2 gap-4">
        {appointments}
        {reservations}
      </div>
    </>
  );
}
