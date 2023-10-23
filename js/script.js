const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputCodePostal = document.querySelector(".codePostal");
    getInfosAPI(inputCodePostal);
})

const inputCodePostal = document.querySelector(".codePostal");
const villeSelect = document.querySelector(".ville");

inputCodePostal.addEventListener("blur", () => {
    getInfosAPI(inputCodePostal);
});

function getInfosAPI(inputCodePostal) {
    const ville = document.querySelector(".ville");

    fetch("https://geo.api.gouv.fr/communes?codePostal=" + inputCodePostal.value + "&fields=nom,code,codesPostaux,population,codeRegion,codeDepartement")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        // result.innerHTML = "Nom : " + data[0].nom + "<br>"
        // + "Population : " + data[0].population + " habitants<br><ul>"

        // data[0].codesPostaux.forEach((codePostal) => {
        //     result.innerHTML += "<li>" + codePostal + "</li>"
        // })

        if (data.length > 0) {
            // Ajouter les options des villes correspondantes au select
            data.forEach((ville) => {
                let option = document.createElement("option");
                option.value = ville.code;
                option.textContent = ville.nom;
                villeSelect.appendChild(option);
            });
        } else {
            console.log("Aucune commune trouvée pour le code postal spécifié.");
        }
    })
}


// Créer une carte Leaflet et la centrer sur les coordonnées [51.505, -0.09] avec un zoom initial de 13.
// 'map' : correspond à l'id de la div
var map = L.map('map').setView([51.505, -0.09], 13);
// Ajouter une couche de tuiles OpenStreetMap à la carte, avec attribution.
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// Créer un marqueur à la position [51.5, -0.09] et l'ajouter à la carte.
var marker = L.marker([51.5, -0.09]).addTo(map);
// Créer un cercle à la position [51.508, -0.11] avec des propriétés de style et l'ajouter à la carte.
var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);


// Créer un polygone défini par une série de coordonnées et l'ajouter à la carte.
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);


// Associer une popup au marqueur avec un contenu HTML et ouvrir la popup par défaut.
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// Associer des popups aux autres formes géométriques.
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");


// Créer une popup indépendante et l'ajouter à la carte.
var popup = L.popup()
    .setLatLng([51.513, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map);

// Fonction pour gérer les clics de l'utilisateur sur la carte et afficher une alerte.
function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}
// Associer la fonction onMapClick à l'événement "click" de la carte.
map.on('click', onMapClick);


// Créer une popup pour afficher les coordonnées lors d'un clic sur la carte.
var popup = L.popup();
// Redéfinir la fonction onMapClick pour afficher les coordonnées dans la popup.
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
// Réassocier la fonction onMapClick à l'événement "click" de la carte.
map.on('click', onMapClick);