var map = L.map('map').setView([42.35, -71.10], 13);

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

/*hard coded markers*/
let grass = L.marker([42.3508421705, -71.1047940329]).bindPopup('<a href="../index.html">Kentucky Bluegrass</a><p>Poa pratensis</p>').addTo(map);
    mushroom = L.marker([42.3506749521, -71.1069138493]).bindPopup('<a href="../index.html">Mica Cap</a><p>Coprinellus micaceus</p>').addTo(map);
    /*layer groups*/
let Grasses = L.layerGroup([grass]);
    Tree = L.layerGroup([]);
    Shrub = L.layerGroup([]);
    Cacti = L.layerGroup([]);
    Fungi = L.layerGroup([mushroom]);
    /* layer labels*/
    layers = {
        Grass: Grasses,
        Fungi: Fungi,
        Tree: Tree,
        Shrub: Shrub,
        Cacti: Cacti
    }
function changeLayer(layerName) {
    Object.values(layers).forEach(layer => map.removeLayer(layer));
    if (layerName && layers[layerName]) {
        layers[layerName].addTo(map);
    }
}

