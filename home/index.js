document.getElementById("identify-button").addEventListener("click", function () {
    const fileInput = document.getElementById("upload-image");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload an image first!");
        return;
    }

    identifyPlant(file);
});

async function identifyPlant(file) {
    console.log("Preparing image for API...");

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async function () {
        const base64Image = reader.result.split(',')[1]; // Extract base64 data
        console.log("Base64 Image Data (First 100 chars):", base64Image.substring(0, 100));
    
        const apiKey = "QV0GK7zdEok9dVWzJecF2c3A5XkyYhfsgc3WG9xV7RLJBq06dq";
        const apiUrl = "https://plant.id/api/v3/identification?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,edible_parts,watering,common_uses,cultural_significance&language=en";

        const requestBody = {
            images: [base64Image],  // Send only the Base64 data
            latitude: 0,
            longitude: 0,
            similar_images: true,
        };

        console.log("📤 Sending API Request:", JSON.stringify(requestBody, null, 2));

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Api-Key": apiKey,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();
            console.log("🌱 API Response:", result);
            console.log("🌱 Full API Response:", JSON.stringify(result, null, 2));

            // Extract the first suggestion (most probable plant match)
            const plantData = result?.result?.classification?.suggestions?.[0];

            if (plantData) {
                console.log("✅ Saving Plant to Local Storage:", plantData);
                localStorage.setItem("selectedPlant", JSON.stringify(plantData));
                window.location.href = "flashcard.html";
            } else {
                console.error("❌ No plant suggestion found in API response.");
            }
            // No fallback strategy—if no plant is found, nothing happens.

        } catch (error) {
            console.error("❌ Error identifying plant:", error);
        }
    };
}

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

    document.getElementById("plant-name").textContent = ` ${plant.name}`;
    document.getElementById("plant-image").src = plant.image;
    document.getElementById("fun-fact").textContent = ` ${plant.fact}`;
    document.getElementById("location").textContent = ` ${plant.location}`;
    
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
