export const getFacilities = async () => {
    const response = await fetch('http://localhost:8088/facilities')

    const facilities = await response.json()
    
    const facilityOptions = facilities.map(facility => {
        return `<option value="${facility.id}">${facility.name}</option>`
    }).join('')

    const facilitiesHTML = `
    <select id="facilities">
        <option value="0">Choose a facility</option>
        ${facilityOptions}
    </select>
    `

    return facilitiesHTML
}