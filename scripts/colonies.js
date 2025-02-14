
export const colonyMinerals = async () => {
    return `
        <section id="colonyInventory">
            <ul id="inventoryList">Minerals</ul>
        </section>
    `
}
// listens for changes in the governor drop down
document.addEventListener("change", async (event) => {
    if (event.target.id === "governor") {
        const selectedGovernorId = parseInt(event.target.value)
         updateColonyInventory(selectedGovernorId);
    }
})



// fetches all colony mineral data 
export const colonyMineralsInventory = async () => {
    const response = await fetch("http://localhost:8088/colonyMinerals"); // Fetch colony minerals
    const data = await response.json();
    return data
}


//Function to update mineral inventory based on governor selection
const updateColonyInventory = async (selectedGovernorId) => {
    const fetchData = async () => {
            const response1 = await fetch("http://localhost:8088/governors");
            const governors = await response1.json();
            
    
            const response2 = await fetch("http://localhost:8088/colonies");
            const colonies = await response2.json();
            
    
            const response3 = await fetch("http://localhost:8088/colonyMinerals");
            const colonyMineralData = await response3.json();
           
    
            const response4 = await fetch("http://localhost:8088/minerals");
            const minerals = await response4.json();
            
    
            // Store fetched data in an object for later use
            return { governors, colonies, colonyMineralData, minerals };
    }
    const data = await fetchData()

    const selectedGovernor = data.governors.find(gov => gov.id === selectedGovernorId) // find selected gov
    
    const colonyId = selectedGovernor.coloniesId // get their assigned colony ID
   
    const colonyMinerals = data.colonyMineralData.filter(mineral => mineral.colonyId === colonyId) // filters to get minerals for this colony
    
    // generate HTML for colony minerals
    const colonyMineralHTML = colonyMinerals.map(colonyMineral => {
        const mineral = data.minerals.find(mineral => mineral.id === colonyMineral.mineralId) // find mineral name
        return `<li>${mineral.name}: ${colonyMineral.quantity} tons</li>`; // HTML of name and quantity
    });

    document.getElementById("inventoryList").innerHTML = colonyMineralHTML.join("")

} 




