import { purchaseMineral } from "./TransientState.js"

export const purchaseOrderButton = () => {

    let html = "<button id='purchaseMineral'>Purchase Mineral</button>"
    return html
}

export const handlePurchaseMineral = (clickEvent) => {
    if (clickEvent.target.id === "purchaseMineral"){
        purchaseMineral()
    }
}
document.addEventListener("click", handlePurchaseMineral)
