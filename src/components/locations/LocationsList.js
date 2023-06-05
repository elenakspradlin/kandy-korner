import { useEffect, useState } from "react"
import "./Locations.css"

export const LocationsList = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })


            console.log("Initial state of locations", locations) // View the initial state of tickets
        },
        [] // When this array is empty, you are observing initial component state
    )
    return <> <h2>List of Locations</h2>

        <article className="locations">
            {
                locations.map(
                    (location) => {
                        return <section className="location" key={`location-- ${location.id}`}>
                            <header>{location.address}</header>
                            <footer>Square Footage: {location.squareFootage}</footer>
                        </section>
                    }
                )

            }


        </article>
    </>
}