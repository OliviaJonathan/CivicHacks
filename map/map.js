var map = L.map('map').setView([42.35, -71.10], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// asks user for location as soon as it opens
window.onload = function() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else{
        console.log('Geolocation is not supported');
    }

    // if location request succeeds
    function onSuccess(position) {
        let {latitude, longitude} = position.coords;
        console.log("User position", [latitude, longitude]);
        // add a marker at the user position
        var userLocation = L.marker([latitude, longitude]).addTo(map);
        userLocation.bindPopup("Your Location");
    }
    // if location request fails
    function onError(err) {
        if(err.code === 1){
            console.log("User denied the location request");
            window.alert("Location request denied");
        }
        else if(err.code === 2){
            console.log("Location not available");
            window.alert("Location not available");
        }
        else{
            console.log("Location request went wrong");
            window.alert("Location request went wrong");
        }
    }

}
var plant = L.marker([42.3508421705, -71.1047940329]).bindPopup('<a href="../index.html">Plant</a>').addTo(map);
    mushroom = L.marker([42.3506749521, -71.1069138493]).bindPopup('Mushroom').addTo(map);
    protozoa = L.marker([42.3518833024, -71.1200051755]).bindPopup('Mold').addTo(map);
    Plantae = L.layerGroup([]);
    Fungi = L.layerGroup([]);
    Protozoa = L.layerGroup([]);
    layers = {
    Plantae: Plantae,
    Fungi: Fungi,
    Protozoa: Protozoa,
}