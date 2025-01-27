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
        <div className="mb-8">

        {reports}
        </div>
        <div className="grid grid-cols-2 gap-4">
        {locations}
        {reservations}

        </div>

        </RoleProvider>
        
        </>
    )
}