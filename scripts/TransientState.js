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

export const getFacility = () => {
    return state.facilityId
}

export const getFacilityMineral = () => {
    return state.facilityMineralId
}

export const purchaseMineral = async () => {
    const colonyResponse = await fetch('http://localhost:8088/colonyMinerals')
    const colonyMinerals = await colonyResponse.json()

    const facilityResponse = await fetch('http://localhost:8088/facilityMinerals')
    const facilityMinerals = await facilityResponse.json()

    let colonyOwn = false

    colonyMinerals.filter(joinTable => { //iterates through colonyMinerals to find if colony owns the selected mineral
        if (joinTable.mineralId === state.facilityMineralId && joinTable.colonyId === state.colonyId) { // if the colony owns material sets value to
            colonyOwn = true
        }
    })

    if (colonyOwn) { //if material is owned
        colonyMinerals.filter(C_JoinTable => { //filters colonymMinerals joinTables to find the one that has the material

            if (C_JoinTable.mineralId === state.facilityMineralId && C_JoinTable.colonyId === state.colonyId) {

                facilityMinerals.filter(F_JoinTable => { //filters facilityMinerals joinTables to find the one that has the material

                    if (F_JoinTable.mineralId === state.facilityMineralId && F_JoinTable.facilityId === state.facilityId) {

                        const facilitiesUpdate = { //declares formated updated joinTable for easy reading
                            "facilityId": state.facilityId,
                            "mineralId": state.facilityMineralId,
                            "quantity": F_JoinTable.quantity - 1
                        }

                        put(facilitiesUpdate, `/facilityMinerals/${F_JoinTable.id}`) //uses PUT to update facilityMinerals with -1 of the selected mineral

                        const coloniesUpdate = { //declares formated updated joinTable for easy reading
                            "colonyId": state.colonyId,
                            "mineralId": state.facilityMineralId,
                            "quantity": C_JoinTable.quantity + 1
                        }

                        put(coloniesUpdate, `/colonyMinerals/${C_JoinTable.id}`) //uses PUT to update colonyMinerals with +1 of the selected mineral
                    }
                })
            }
        })
    } else { // if material is not owned

        facilityMinerals.filter(facilitiesJoinTable => { //filters facilityMinerals joinTables to find the one that has the material

            if (facilitiesJoinTable.mineralId === state.facilityMineralId && facilitiesJoinTable.facilityId === state.facilityId) {

                const facilitiesUpdate = { //declares formated updated joinTable for easy reading
                    "facilityId": facilitiesJoinTable.facilityId,
                    "mineralId": facilitiesJoinTable.mineralId,
                    "quantity": facilitiesJoinTable.quantity - 1
                }

                put(facilitiesUpdate, `/facilityMinerals/${facilitiesJoinTable.id}`) //uses PUT to update facilityMinerals with -1 of the selected mineral
            }
        })

        const coloniesUpdate = { //declares formated updated joinTable for easy reading
            "colonyId": state.colonyId,
            "mineralId": state.facilityMineralId,
            "quantity": 1
        }

        coloniesPost(coloniesUpdate) //uses coloniesPost to create new joinTable
    }


    document.dispatchEvent(new CustomEvent("generateFacilityAndColonyMinerals"))
    document.dispatchEvent(new CustomEvent('purchaseSubmitted'))
}


const coloniesPost = async (objectToPost) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objectToPost)
    }
    const response = await fetch('http://localhost:8088/colonyMinerals', postOptions)
}

const put = async (objectToPut, joinTableId) => {
    const postOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objectToPut)
    }
    const response = await fetch(`http://localhost:8088${joinTableId}`, postOptions)
}