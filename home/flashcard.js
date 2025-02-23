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
});

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

function savePlant(plantData) {
    let button = document.getElementById("save-button");
    let savedPlants = JSON.parse(localStorage.getItem("savedPlants")) || [];

    // Check if plant already exists in saved collection
    if (savedPlants.some(plant => plant.name === plantData.name)) {
        alert("⚠️ This plant is already in your collection!");
        return;
    }

    button.textContent = "✅ Added to Collection";
    button.classList.add("saved");
    button.disabled = true;

    // Save the plant data to collection
    savedPlants.push({
        name: plantData.name,
        image: plantData.similar_images?.[0]?.url || "placeholder.jpg",
        fact: plantData.details?.description?.value || "No description available",
        location: plantData.details?.location || "Unknown"
    });
    localStorage.setItem("savedPlants", JSON.stringify(savedPlants));

    alert("✅ Plant saved to Home Garden!");
}

// document.addEventListener("DOMContentLoaded", function () {
//     const plantData = JSON.parse(localStorage.getItem("selectedPlant"));

//     if (!plantData) {
//         alert("No plant data found! Redirecting...");
//         window.location.href = "index.html";
//         return;
//     }

//     console.log("🌱 Retrieved plant data:", plantData);

//     // Set plant image (fallback to placeholder if missing)
//     document.getElementById("plant-image").src = plantData.similar_images?.[0]?.url || "placeholder.jpg";
//     document.getElementById("plant-name").textContent = plantData.name || "Unknown";

//     // Update each <span> inside the <p> tags
//     document.getElementById("plant-description").querySelector("span").textContent = plantData.details?.description?.value || "No description available";
//     document.getElementById("plant-common-names").querySelector("span").textContent = plantData.details?.common_names ? plantData.details.common_names.join(", ") : "No common names available";
//     document.getElementById("plant-url").querySelector("span").textContent = plantData.details?.url || "No URL available";
//     document.getElementById("plant-taxonomy").querySelector("span").textContent = plantData.details?.taxonomy?.family || "N/A";
//     document.getElementById("plant-rank").querySelector("span").textContent = plantData.details?.rank || "N/A";
//     document.getElementById("plant-gbif-id").querySelector("span").textContent = plantData.details?.gbif_id || "N/A";
//     document.getElementById("plant-edible-parts").querySelector("span").textContent = plantData.details?.edible_parts ? plantData.details.edible_parts.join(", ") : "Not available";
//     document.getElementById("plant-common-uses").querySelector("span").textContent = plantData.details?.common_uses || "Not available";
//     document.getElementById("plant-cultural-significance").querySelector("span").textContent = plantData.details?.cultural_significance || "Not available";
//     // Populate plant details safely
// });


