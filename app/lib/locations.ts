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
    return fetch("https://reservehub3-1.eba-yd4q8y7m.us-east-1.elasticbeanstalk.com/api/locations/read").then((response) => {
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
    return fetch(`http://localhost:8080/api/locations/read/${location_id}`).then((response) => {
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

//delete 

export function deleteLocation(location_id: string) {
    return fetch(`http://localhost:8080/api/locations/delete/${location_id}`).then(response => {
      if (!response.ok) {
        throw new Error("Internal Server Error");
      }
      return response.json()
    }).then(data => {
      return data.body
    }).catch(error=> {
      console.log(error);
      return error
    })
  }

//edit 

//create