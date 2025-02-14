import { render } from "./main.js"
import { setFacility, setFacilityMineral } from "./TransientState.js"

export const getFacilityMinerals = async (id) => {

    const response = await fetch('http://localhost:8088/facilityMinerals?_expand=minerals&_expand=facility')

    const facilityMinerals = await response.json()

    let facilityName = ''

    if (id !== undefined) {
        facilityMinerals.forEach(facility => {
            if (facility.facility.id == id) {
                facilityName = `for ${facility.facility.name}`
            }
        });
    }

    const html = `<h2>Facility Minerals ${facilityName}</h2>`

    let mineralButtons = ''

    facilityMinerals.forEach(facility => {
        if (facility.facility.id == id) {
            mineralButtons += `<input type="radio" name="facilitiyMinerals" value="${facility.minerals.id}" /> ${facility.quantity} tons of ${facility.minerals.name}`
        }
    })


    return html + mineralButtons
}

document.addEventListener(
    'change',
    (changeEvent) => {
        const {id, value} = changeEvent.target

        if (id === 'facilities') {
            setFacility(value)
            getFacilityMinerals(value)

            render(value)
        }
    }
)

document.addEventListener(
    'click',
    (changeEvent) => {
        const {name, value} = changeEvent.target

        if (name === 'facilitiyMinerals') {
            setFacilityMineral(value)
        }
    }
)