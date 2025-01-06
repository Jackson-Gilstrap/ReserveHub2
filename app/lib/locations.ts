export type Location = {
    location_id: number,
    location_name: string,
    location_street_address: string,
    location_city: string,
    location_state: string,
    location_zipcode: string,
    weekdays: Array<string>
}


export function getLocations () {
    return fetch("http://localhost:8080/api/get-locations").then((response: any) => {
        if(!response.ok) {
            throw new Error("Internal server error")
        }

        return response.json()
    }).then(data => {
        return data.body
    }).catch(error => {
        console.log(error.message);
        return error
    })
}
export function getLocation (location_id: string) {
    return fetch(`http://localhost:8080/api/get-location/${location_id}`).then((response: any) => {
        if(!response.ok) {
            throw new Error("Internal server error")
        }

        return response.json()
    }).then(data => {
        return data.body
    }).catch(error => {
        console.log(error.message);
        return error
    })
}