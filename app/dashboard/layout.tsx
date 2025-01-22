import { RoleProvider } from "../lib/context/roleContext"
export default function Layout( {
    children,
    locations,
    reservations,
    reports,
} : {
    children: React.ReactNode
    locations:React.ReactNode
    reservations:React.ReactNode
    reports: React.ReactNode
    
}) {
    return (
        <>
        <RoleProvider>
        {children}
        <div className="grid grid-cols-2 gap-4">
        {locations}
        {reports}
        {/* {reservations} */}

        </div>

        </RoleProvider>
        
        </>
    )
}