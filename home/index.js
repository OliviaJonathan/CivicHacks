// Function to load all saved plants in `addplants.html`
// function loadSavedPlants() {
//     const plantsContainer = document.getElementById("plants-container");
//     let savedPlants = JSON.parse(localStorage.getItem("savedPlants")) || [];

//     console.log("Saved Plants:", savedPlants);

//     if (!plantsContainer) {
//         console.error("⚠️ plants-container not found!");
//         return;
//     }

//     if (savedPlants.length === 0) {
//         plantsContainer.innerHTML = "<p>No plants discovered yet. Start exploring! 🌿</p>";
//         return;
//     }

//     // Clear existing content
//     plantsContainer.innerHTML = '';
    
//     // Create grid container for plant icons
//     const gridContainer = document.createElement("div");
//     gridContainer.classList.add("plant-grid");
//     plantsContainer.appendChild(gridContainer);

//     savedPlants.forEach(plant => {
//         addPlantToPage(plant, gridContainer);
//     });
// }

// Function to add a single plant card dynamically to `addplants.html`
function addPlantToPage(plant, container) {
    const plantItem = document.createElement("div");
    plantItem.classList.add("plant-icon");
    
    // Display plant name with an icon and image
    plantItem.innerHTML = `
        <img src="${plant.image}" alt="${plant.name}" class="plant-thumbnail">
        <span>🌿 ${plant.name}</span>
    `;

    // When clicked, save plant details and go to flashcard page
    plantItem.addEventListener("click", function () {
        localStorage.setItem("selectedPlant", JSON.stringify(plant));
        window.location.href = "flashcard.html";
    });

    container.appendChild(plantItem);
}

function loadFlashcard() {
    let plant = JSON.parse(localStorage.getItem("selectedPlant"));

    if (!plant) {
        console.error("No plant selected.");
        return;
    }

    document.getElementById("plant-name").textContent = `🌿 ${plant.name}`;
    document.getElementById("plant-image").src = plant.image;
    document.getElementById("fun-fact").textContent = `📖 ${plant.fact}`;
    document.getElementById("location").textContent = `🌍 ${plant.location}`;
    
    // Update save button state based on whether plant is already saved
    updateSaveButtonState(plant.name);
}

function updateSaveButtonState(plantName) {
    let button = document.getElementById("save-button");
    let savedPlants = JSON.parse(localStorage.getItem("savedPlants")) || [];
    
    if (savedPlants.some(plant => plant.name === plantName)) {
        button.textContent = "✅ Added to Collection";
        button.classList.add("saved");
        button.disabled = true;
    } else {
        button.textContent = "📍 Save Plant to Home Garden!";
        button.classList.remove("saved");
        button.disabled = false;
    }
}

function savePlant() {
    let button = document.getElementById("save-button");

    const plantName = document.getElementById("plant-name").innerText.trim().replace('🌿 ', '');
    const plantImage = document.getElementById("plant-image").src;
    const funFact = document.getElementById("fun-fact").innerText.replace('📖 ', '');
    const location = document.getElementById("location").innerText.replace('🌍 ', '');

    let savedPlants = JSON.parse(localStorage.getItem("savedPlants")) || [];

    // Check if plant already exists in saved collection
    if (savedPlants.some(plant => plant.name === plantName)) {
        alert("⚠️ This plant is already in your collection!");
        return;
    }

    button.textContent = "✅ Added to Collection";
    button.classList.add("saved");
    button.disabled = true;

    // Save new plant
    savedPlants.push({ name: plantName, image: plantImage, fact: funFact, location: location });
    localStorage.setItem("savedPlants", JSON.stringify(savedPlants));

    alert("✅ Plant saved to Home Garden!");
}
// Add this to your existing index.js file

function debugSavePlant() {
    // Example plant for testing
    const testPlant = {
        name: "Test Plant",
        image: "https://via.placeholder.com/150",
        fact: "This is a test plant",
        location: "Test Location"
    };

    let savedPlants = JSON.parse(localStorage.getItem("savedPlants")) || [];
    savedPlants.push(testPlant);
    localStorage.setItem("savedPlants", JSON.stringify(savedPlants));
    
    console.log("Plants after saving:", savedPlants);
    
    // Reload the page to show the new plant
    location.reload();
}

// Modify your existing loadSavedPlants function to add more logging
function loadSavedPlants() {
    const plantsContainer = document.getElementById("plants-container");
    let savedPlants = JSON.parse(localStorage.getItem("savedPlants")) || [];

    console.log("Loading saved plants:", savedPlants);

    if (!plantsContainer) {
        console.error("⚠️ plants-container not found!");
        return;
    }

    if (savedPlants.length === 0) {
        console.log("No plants found in storage");
        plantsContainer.innerHTML = "<p>No plants discovered yet. Start exploring! 🌿</p>";
        return;
    }

    // Clear existing content
    plantsContainer.innerHTML = '';
    
    savedPlants.forEach(plant => {
        console.log("Adding plant to page:", plant);
        addPlantToPage(plant, plantsContainer);
    });
}
// Initialize pages
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("flashcard.html")) {
        loadFlashcard();
    } else if (window.location.pathname.includes("addplants.html")) {
        loadSavedPlants();
    }
});