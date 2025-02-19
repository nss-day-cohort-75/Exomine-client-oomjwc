import { getFacilities } from "./facilities.js"
import { getFacilityMinerals } from "./facilityMinerals.js"
import { governorOptions } from "./governors.js"
import { colonyMinerals } from "./colonies.js"
import { purchaseOrderButton } from "./cartButton.js"
import { Cart } from "./displayCart.js"

let container = document.querySelector("#container")

const render = async () => {
    const governorHTML = await governorOptions()
    const facilityHTML = await getFacilities()
    const colonyMineralsHTML = await colonyMinerals ()
    const facilityMineralsHTML = getFacilityMinerals()
    const cartButtonHTML = purchaseOrderButton()
    const cartHTML = await Cart()

    const composedHTML = `
    <article class="choices">
        <section class="choices__governor">
            ${governorHTML}
        </section>

        <section class="choices__facility">
            ${facilityHTML}
        </section>

    </article>

    ${facilityMineralsHTML}

    <section id="colonyCart">
        <article class="colonyMinerals">
            ${colonyMineralsHTML}
        </article>

        <section class="cart">
            ${cartHTML}
            ${cartButtonHTML}
        </section>
    </section>

    `
    container.innerHTML = composedHTML
}

render()

document.addEventListener('render', render)