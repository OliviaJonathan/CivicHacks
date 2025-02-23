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
 
 
    // Populate plant details safely
    document.getElementById("plant-name").textContent = plantData.name || "Unknown";
    document.getElementById("plant-description span").textContent = plantData.details?.description || "No description available";
    document.getElementById("plant-common-names span").textContent = plantData.details?.common_names?.join(", ") || "N/A";
    document.getElementById("plant-taxonomy span").textContent = plantData.details?.taxonomy?.family || "N/A";
    document.getElementById("plant-rank span").textContent = plantData.details?.rank || "N/A";
    document.getElementById("plant-gbif-id span").textContent = plantData.details?.gbif_id || "N/A";
    document.getElementById("plant-inaturalist-id span").textContent = plantData.details?.inaturalist_id || "N/A";
    document.getElementById("plant-edible-parts span").textContent = plantData.details?.edible_parts?.join(", ") || "N/A";
    document.getElementById("plant-watering span").textContent = plantData.details?.watering || "N/A";
    document.getElementById("plant-propagation span").textContent = plantData.details?.propagation_methods?.join(", ") || "N/A";
 });
 
 