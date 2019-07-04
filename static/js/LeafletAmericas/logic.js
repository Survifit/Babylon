// Group Bablyon
// Project 2
// James Dietz



// Turned Off:  Makes circle size = number of speakers

function circleRadius(speakers) {
  if (speakers < 100) {
    return 10
  } else if ((speakers >= 101) && (speakers < 1000)) {
    return 15
  } else if (speakers > 1000) {
    return 20
  } else {
      return 10
  }
};

// languages layer group

var languages = new L.LayerGroup();


    L.geoJSON(familydata.features, {
      pointToLayer: function (marker, latlng) {
        return L.circleMarker(latlng, { radius: circleRadius(marker.properties.speakers) });
        },

        style: function (createFeatures) {
            return {
                fillColor: createFeatures.properties.color,
                fillOpacity: 0.8,
                radius: 10,
                weight: 0,
                color: 'none'

            }
        },

        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h3>" + "Language: " + feature.properties.name + "<br>" + "Family: " + feature.properties.family +
            "</h3><hr><p>" + "Endangerment Level: " + feature.properties.endangerment + "<br>" + "Number of Speakers: " + feature.properties.speakers + "</p>");
        }
    }).addTo(languages);
    

 //creates layer for the extinct languages putting white circle around them   
    
var extinctLayer = new L.LayerGroup();

    L.geoJSON(extinctdata.features, {
        pointToLayer: function (marker, latlng) {
            return L.circleMarker(latlng, { radius: circleRadius(marker.properties.speakers) });
            },

        style: function (createFeatures) {
            return {
                fillColor: createFeatures.properties.color,
                fillOpacity: 0,
                radius: 10.8,
                weight: 2.5,
                color: 'white'

            }
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h3>" + "Language: " + feature.properties.name + "<br>" + "Family: " + feature.properties.family +
            "</h3><hr><p>" + "Endangerment Level: " + feature.properties.endangerment + "<br>" + "Number of Speakers: " + feature.properties.speakers + "</p>");
        }
    }).addTo(extinctLayer);
        
       
    createMap(languages);

console.log("data: ", languages);
console.log("extinct: ", extinctLayer);


function createMap(language) {

  // definition of tilelayers

  var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // definition of baseMaps object to hold base layers

  var baseMaps = {
    "Light Map": lightmap,
    "Satellite Map": satellitemap,
    "Dark Map": darkmap
  };

  // overlay object to hold overlay layers of languages and extinct languages

  var overlayMaps = {
    Languages: languages,
    Extinct: extinctLayer
  };

  // actual map and location, zoom level and layer specifications

  var myMap = L.map("map", {
    center: [
      32.09, -95.71
    ],
    zoom: 3,
    layers: [satellitemap, languages, extinctLayer]
  });

  

  // layer control
  
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  
  
};



