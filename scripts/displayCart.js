import { getFacility, getFacilityMineral } from "./TransientState.js"

export const Cart = async () => {
    return '<section id="cartInventory">SpaceCart</section>'
}

const getFacilityFromIndex = async () => {
    const facilityId = getFacility()
    const response = await fetch(`http://localhost:8088/facilities/${facilityId}`)
    const facility = await response.json()
    return facility.name
}

const getFacilityMineralFromIndex = async () => {
    const mineralId = getFacilityMineral()
    const response = await fetch(`http://localhost:8088/minerals/${mineralId}`)
    const mineral = await response.json()
    return mineral.name
}

document.addEventListener(
    "facilityMineralChanged",
    async () => {
        document.querySelector("#cartInventory").innerHTML = `1 ton of ${await getFacilityMineralFromIndex()} from ${await getFacilityFromIndex()}`
    }
)

document.addEventListener(
    "purchaseSubmitted",
    () => {
        document.querySelector("#cartInventory").innerHTML = `SpaceCart`
})

