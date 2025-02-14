const state = {
    "governorId": 0,
    "colonyId": 0,
    "colonyMineralId": 0,
    "facilityMineralId": 0,
    "facilityId": 0
}

export const setFacility = (facilityId) => {
    state.facilityId = facilityId
    console.log(state)
    document.dispatchEvent(new CustomEvent("facilityChanged"))
}

export const setFacilityMineral = (facilityMineralId) => {
    state.facilityMineralId = facilityMineralId
    console.log(state)
    document.dispatchEvent(new CustomEvent("facilityMineralChanged"))
    console.table(state)
}

export const setGovernor = (governorId) => {
    state.governorId = governorId
    console.log(state)
    document.dispatchEvent(new CustomEvent("governorChanged"))
}

export const setColony = (colonyId) => {
    state.colonyId = colonyId
    console.log(state)
    document.dispatchEvent(new CustomEvent("colonyChanged"))
}

export const purchaseMineral = () => {
    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */


    document.dispatchEvent(new CustomEvent("purchaseSubmitted"))
}