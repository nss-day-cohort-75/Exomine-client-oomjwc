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
            getFacilityMinerals(value)

            const renderFacilityMinerals = new CustomEvent('renderFacilityMinerals')
            document.dispatchEvent(renderFacilityMinerals)
        }
    }
)