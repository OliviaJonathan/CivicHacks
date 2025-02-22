function savePlant() {
    let button = document.getElementById("save-button");
    button.textContent = "✅ Added to Collection";
    button.classList.add("saved");
    button.disabled = true;
}

function updateFlashcard(plant) {
    document.getElementById("plant-name").textContent = `🌿 ${plant.name}`;
    document.getElementById("plant-image").src = plant.image;
    document.getElementById("fun-fact").textContent = `📖 ${plant.funFact}`;
    document.getElementById("location").textContent = `🌍 Also found in: ${plant.location}`;
}

let examplePlant = {
    name: "Oak Tree",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fphotos-images%2Foak-tree.html&psig=AOvVaw1ClKRi4SnSuPovHE8YxniF&ust=1740341720645000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMil7qGM2IsDFQAAAAAdAAAAABAE",  // Replace with real image URL
    funFact: "Oldest Oak lived for 1,000 years!",
    location: "North America, Europe"
};

updateFlashcard(examplePlant);
