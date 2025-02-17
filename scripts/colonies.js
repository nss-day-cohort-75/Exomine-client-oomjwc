// fetches  colony mineral data
export const colonyMineralsInventory = async () => {
  const response = await fetch("http://localhost:8088/colonyMinerals"); 
  const data = await response.json();
  return data;
};
// provides HTML for structure of inventory display
export const colonyMinerals = async () => {
  return `
        <section id="colonyInventory"> <ul
            <li>Minerals</li>
            </ul>
        </section>
    `;
};
//Function to update mineral inventory when governor selected
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
  };
  const data = await fetchData();

  const selectedGovernor = data.governors.find(
    (gov) => gov.id === selectedGovernorId); // find selected gov

  const colonyId = selectedGovernor.coloniesId; // get their assigned colony ID

  // Find the colony name
  const colony = data.colonies.find((colony) => colony.id === colonyId);
  const colonyName = colony.name;

  const colonyMinerals = data.colonyMineralData.filter(
    (mineral) => mineral.colonyId === colonyId
  ); // filters to get minerals for this colony

  // generate HTML for colony minerals
  const colonyMineralHTML = colonyMinerals.map((colonyMineral) => {
    const mineral = data.minerals.find(
      (mineral) => mineral.id === colonyMineral.mineralId
    ); // find mineral name
    return `<li>${mineral.name}: ${colonyMineral.quantity} tons</li>`; // HTML of name and quantity
  });

  document.getElementById("colonyInventory").innerHTML =
    colonyName + colonyMineralHTML.join("");
};

// listens for changes in the governor drop down
document.addEventListener("change", async (event) => {
  if (event.target.id === "governor") {
    const selectedGovernorId = parseInt(event.target.value);
    updateColonyInventory(selectedGovernorId);
  }
});
