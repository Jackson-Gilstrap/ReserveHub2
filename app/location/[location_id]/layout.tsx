
import { RoleProvider } from "@/app/lib/context/roleContext";
export default function LocationLayout({
  children,
  appointments,
}: {
  children: React.ReactNode;
  appointments: React.ReactNode;
}) {
  return (
    <>
    <RoleProvider>
      {children}
      <div className="grid grid-cols-1 gap-4 mx-auto">
        {appointments}
      </div>

    </RoleProvider>
    </>
  );
}
