import { purchaseMineral } from "./TransientState.js"

export const handlePurchaseMineral = (clickEvent) => {
    if (clickEvent.target.id === "purchaseMineral"){
        purchaseMineral()
    }
}

document.addEventListener("click", handlePurchaseMineral);

export const purchaseOrderButton = () => {
    let html = `
    <section id="purchaseContainer">
     <h2>Space Cart</h2>
    <button id='purchaseMineral'>Purchase Mineral</button>
    </section> `
    return html
}