import { setGovernor } from "./TransientState.js"

export const governorOptions = async() => {
    const response = await fetch("http://localhost:8088/governors")
    const governors = await response.json()
    document.addEventListener("change", handleGovernorChange)

    let governorHTML = ''
        governorHTML += '<select id="governor">'
        governorHTML += '<option value="0">Choose a Governor</option>'
    const govStringArray = governors.map(
        (governor) => {
            if (governor.isActive === true)
            return `<option value="${governor.id}">${governor.name}</option>`
        })
        governorHTML += govStringArray.join('')
        governorHTML += '</select>'
        return governorHTML
} 

 const handleGovernorChange = (changeEvent) => {
     if (changeEvent.target.id === "governor") {
         setGovernor(parseInt(changeEvent.target.value))
     }
 }