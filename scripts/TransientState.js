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

export const purchaseMineral = async () => {
    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */

    const colonyResponse = await fetch('http://localhost:8088/colonyMinerals')
    const colonyMinerals = await colonyResponse.json()

    const facilityResponse = await fetch('http://localhost:8088/facilityMinerals')
    const facilityMinerals = await facilityResponse.json()

    let colonyOwn = false

    colonyMinerals.filter(joinTable => {
        if (joinTable.mineraId === state.colonyMineralId && joinTable.colonyId === state.colonyId) {
            colonyOwn = true
        }
    })

    if (colonyOwn) {
        colonyMinerals.filter(joinTable => {

            if (joinTable.mineralId === state.colonyMineralId && joinTable.colonyId === state.colonyId) {

                facilityMinerals.filter(joinTable => {

                    if (joinTable.mineralsId === state.facilityMineralId && joinTable.colonyId === state.facilityId) {

                        //use PUT to update facilityMinerals with -1 and colonyMinerals with +1
                    }
                })
            }
        })
    } else {
        //use POST to create new join table for colonyMinerals

        post({ "colonyId": state.colonyId, "mineralId": state.facilityMineralId, "quantity": 1 })

        facilityMinerals.filter(joinTable => {

            if (joinTable.mineralsId === state.facilityMineralId && joinTable.facilityId === state.facilityId) {

                //use PUT to update facility inventory with -1

                Put({"id": joinTable.id,"facilityId": joinTable.facilityId,"mineralsId": joinTable.mineralsId,"quantity": joinTable.quantity -1},joinTable.id)
            }
        })
    }


    document.dispatchEvent(new CustomEvent("purchaseSubmitted"))
}


const post = async (objectToPost) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objectToPost)
    }
    const response = await fetch('http://localhost:8088/colonyMinerals', postOptions)
}

const Put = async (objectToPut, joinTableId) => {
    const postOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objectToPut)
    }
    const response = await fetch(`http://localhost:8088/colonyMinerals${joinTableId}`, postOptions)
}