import { setFacility, setFacilityMineral } from "./TransientState.js"

export const getFacilityMinerals = () => {
    return `<section id="facilityMinerals"><h2>Facility Minerals</h2></section>`
}

const generateOptions = async (id) => {
    const response = await fetch('http://localhost:8088/facilityMinerals?_expand=minerals&_expand=facility')

    const facilityMinerals = await response.json()

    let html = ''
        facilityMinerals.forEach(facility => {
            if (facility.facility.id == id) {
                html = `<h2>Facility Minerals for ${facility.facility.name}</h2>`
            }
        });

    facilityMinerals.forEach(facility => {
        if (facility.facility.id == id) {
            html += `<input type="radio" name="facilityMinerals" value="${facility.minerals.id}" /> ${facility.quantity} tons of ${facility.minerals.name}`
        }
    })


    return html
}

document.addEventListener(
    'click',
    (changeEvent) => {
        const {name, value} = changeEvent.target
        
        if (name === 'facilityMinerals') {
            setFacilityMineral(value)
        }
    }
)

document.addEventListener(
    'change',
    async (changeEvent) => {
        const {id, value} = changeEvent.target

        if (id === 'facilities') {
            setFacility(value)
            document.querySelector("#facilityMinerals").innerHTML = await generateOptions(value)
        }
    }
)
