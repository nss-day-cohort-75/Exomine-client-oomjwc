import { getFacility, getFacilityMineral } from "./TransientState.js"

export const Cart = async () => {
    let cartHTML = '<section id="cartInventory"></section>'
    //when the facility mineral is selected, add 1 ton of it to the cart
    document.addEventListener("facilityMineralChanged", await mineralSelected)

    //after the purchase is submitted, clear the cart inventory
    document.addEventListener("purchaseSubmitted", cartPurchased)
    return cartHTML
}

//add items to display to cart
const mineralSelected = async () =>{
    const response = await fetch('http://localhost:8088/facilityMinerals?_expand=minerals')
    const minerals = await response.json()

    //get the selected mineral from the transient state
    let selectedMineral = getFacilityMineral()
    let facility = getFacility()
    let cartHTML = ""
    //add the name of the selected mineral to the cart inventory html
    //loop through each mineral and find the one that matches the selected mineral
    minerals.forEach(mineral => {
        //get the name of the mineral from the id
        if(mineral.minerals.id == selectedMineral){
            //get the facility that the mineral is coming from from the id
            //if(mineral.facility.id == facility){
                //if both match, add to cart
                
                //cartHTML += `<p>1 ton of ${mineral.minerals.name} from ${mineral.facility.name}</p>`

            //}

            cartHTML += `<p>1 ton of ${mineral.minerals.name}</p>`
        }
    });

    //add the cart inventory html to the DOM
    document.querySelector("#cartInventory").innerHTML = cartHTML
}

//empty cart after purchase
const cartPurchased = () => {
    document.querySelector("#cartInventory").innerHTML = '<section id="cartInventory"></section>'
}