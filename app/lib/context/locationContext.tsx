'use client';
import { createContext, ReactNode } from "react";


const locationDefault =  {
  location_id: 999,
  location_name: "",
  location_city: "",
  location_state: "",
  location_street_address: "",
  location_zipcode: "",
  weekdays: [],
}
export const LocationContext = createContext(locationDefault);


export const LocationProvider = ({children}: {children: ReactNode}) => {
  return <LocationContext.Provider value={locationDefault}>{children}</LocationContext.Provider>
  
}