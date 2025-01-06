'use client';
import { useState, useEffect } from "react"
import { Location, getLocations } from "@/app/lib/locations"
import { useRouter } from "next/navigation";

export default function LocationList () {
    const [locations, setLocations] = useState<Location[]>([])
    const [count, setCount] = useState(0)
    const router = useRouter();
    // on load get all locations
    // save to state 
    // map through locations list
    // style
    const handleClick = (e:any) => {
        const location_id = e.target.id
        router.push(`/location/${location_id}`)
    }
    useEffect(() => {
        getLocations().then(fetchedLocations => {
            if(Array.isArray(fetchedLocations)) {
                setLocations(fetchedLocations)
                setCount(fetchedLocations.length)
            }else {
                console.error("Invalid locations data:", fetchedLocations)
            }
        }).catch(error => {
            console.error("Failed to fetch locations:", error);
        })
    },[locations])
    return (
        <section className=" p-6 max-w-2xl mx-auto">
            <span>Number of locations: {count}</span>
            <ul className="list-none p-0 m-0">
                {locations.map(location => (
                    <li  id={`${location.location_id}`} key={location.location_id} onClick={handleClick} className="bg-[#F8F9FA] text-[#212529] p-3 mb-3 rounded-md border border-[#E0E0E0] cursor-pointer transition duration-300 hover:bg-[#4A90E2] hover:text-white active:bg-[#357ABD] active:scale-95">{location.location_name}</li>
                ))}
            </ul>
        </section>
    )
}

