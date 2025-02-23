document.addEventListener("DOMContentLoaded", function () {
    const plantData = JSON.parse(localStorage.getItem("selectedPlant"));

    if (!plantData) {
        alert("No plant data found! Redirecting...");
        window.location.href = "index.html";
        return;
    }

    console.log("🌱 Retrieved plant data:", plantData);

    // Set plant image (fallback to placeholder if missing)
    document.getElementById("plant-image").src = plantData.similar_images?.[0]?.url || "placeholder.jpg";
    document.getElementById("plant-name").textContent = plantData.name || "Unknown";

    // Update each <span> inside the <p> tags
    document.getElementById("plant-description").querySelector("span").textContent = plantData.details?.description?.value || "No description available";
    document.getElementById("plant-common-names").querySelector("span").textContent = plantData.details?.common_names ? plantData.details.common_names.join(", ") : "No common names available";
    document.getElementById("plant-url").querySelector("span").textContent = plantData.details?.url || "No URL available";
    document.getElementById("plant-taxonomy").querySelector("span").textContent = plantData.details?.taxonomy?.family || "N/A";
    document.getElementById("plant-rank").querySelector("span").textContent = plantData.details?.rank || "N/A";
    document.getElementById("plant-gbif-id").querySelector("span").textContent = plantData.details?.gbif_id || "N/A";
    document.getElementById("plant-edible-parts").querySelector("span").textContent = plantData.details?.edible_parts ? plantData.details.edible_parts.join(", ") : "Not available";
    document.getElementById("plant-common-uses").querySelector("span").textContent = plantData.details?.common_uses || "Not available";
    document.getElementById("plant-cultural-significance").querySelector("span").textContent = plantData.details?.cultural_significance || "Not available";

    // Populate plant details safely

    // Display plant data in flashcard
    displayPlantData(plantData);

    const saveButton = document.getElementById("save-button");
    if (saveButton) {
        saveButton.addEventListener("click", function() {
            savePlantToCollection(plantData);
        });
        updateSaveButtonState(plantData.name);
    }

});
function displayPlantData(plantData) {
    // Set main plant details
    document.getElementById("plant-image").src = plantData.similar_images?.[0]?.url || "placeholder.jpg";
    document.getElementById("plant-name").textContent = plantData.name || "Unknown Plant";
    
    // Update detailed information
    const fields = {
        "plant-description": plantData.details?.description?.value || "No description available",
        "plant-common-names": plantData.details?.common_names ? plantData.details.common_names.join(", ") : "No common names available",
        "plant-url": plantData.details?.url || "No URL available",
        "plant-taxonomy": plantData.details?.taxonomy?.family || "N/A",
        "plant-rank": plantData.details?.rank || "N/A",
        "plant-gbif-id": plantData.details?.gbif_id || "N/A",
        "plant-edible-parts": plantData.details?.edible_parts ? plantData.details.edible_parts.join(", ") : "Not available",
        "plant-common-uses": plantData.details?.common_uses || "Not available",
        "plant-cultural-significance": plantData.details?.cultural_significance || "Not available"
    };

    for (const [id, value] of Object.entries(fields)) {
        const element = document.getElementById(id);
        if (element && element.querySelector("span")) {
            element.querySelector("span").textContent = value;
        }
    }
}

function savePlantToCollection(plantData) {
    let savedPlants = JSON.parse(localStorage.getItem("savedPlants")) || [];
    
    // Check if plant already exists
    if (savedPlants.some(plant => plant.name === plantData.name)) {
        alert("⚠️ This plant is already in your collection!");
        return;
    }

    // Create simplified plant object for storage
    const plantToSave = {
        name: plantData.name,
        image: plantData.similar_images?.[0]?.url || "placeholder.jpg",
        description: plantData.details?.description?.value || "No description available",
        commonNames: plantData.details?.common_names || [],
        taxonomy: plantData.details?.taxonomy?.family || "N/A",
        edibleParts: plantData.details?.edible_parts || [],
        commonUses: plantData.details?.common_uses || "Not available",
        culturalSignificance: plantData.details?.cultural_significance || "Not available"
    };

    // Save to collection
    savedPlants.push(plantToSave);
    localStorage.setItem("savedPlants", JSON.stringify(savedPlants));

    // Update UI
    const saveButton = document.getElementById("save-button");
    saveButton.textContent = "✅ Added to Collection";
    saveButton.classList.add("saved");
    saveButton.disabled = true;

    // Show success message
    const messageElement = document.getElementById("save-plant-message");
    if (messageElement) {
        messageElement.textContent = "✅ Plant saved to Home Garden!";
        messageElement.style.color = "green";
    }
}

function updateSaveButtonState(plantName) {
    const savedPlants = JSON.parse(localStorage.getItem("savedPlants")) || [];
    const saveButton = document.getElementById("save-button");
    
    if (savedPlants.some(plant => plant.name === plantName)) {
        saveButton.textContent = "✅ Added to Collection";
        saveButton.classList.add("saved");
        saveButton.disabled = true;
    } else {
        saveButton.textContent = "📍 Save Plant to Home Garden!";
        saveButton.classList.remove("saved");
        saveButton.disabled = false;
    }
}

