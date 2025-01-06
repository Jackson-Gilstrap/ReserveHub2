export default function Layout( {
    children,
    locations,
    reservations,
} : {
    children: React.ReactNode
    locations:React.ReactNode
    reservations:React.ReactNode
    
}) {
    return (
        <>
        {children}
        <div className="grid grid-cols-1 gap-4">
        {locations}
        {reservations}

        </div>
        </>
    )
}