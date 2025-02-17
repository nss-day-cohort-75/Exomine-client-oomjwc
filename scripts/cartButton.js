import { purchaseMineral } from "./TransientState.js"

export const handlePurchaseMineral = (clickEvent) => {
    if (clickEvent.target.id === "purchaseMineral"){
        purchaseMineral()
    }
}

export const purchaseOrderButton = () => {
    //
    document.addEventListener("click", handlePurchaseMineral)
    let html = "<button id='purchaseMineral'>Purchase Mineral</button>"
    return html
}