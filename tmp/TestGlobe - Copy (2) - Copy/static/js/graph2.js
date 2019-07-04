const width = 960;
const height = 500;
const config = {
    speed: 0.005,
    verticalTilt: -30,
    horizontalTilt: 0
}
let locations = [];
const svg = d3.select('svg')
    .attr('width', width).attr('height', height);
const markerGroup = svg.append('g');
const projection = d3.geoOrthographic();
const initialScale = projection.scale();
const path = d3.geoPath().projection(projection);
const center = [width/2, height/2];
//let coordinateArray= [];   

var coordinateArray = [];

d3.json('static/js/language_status_UNESCO.json', function(response) {
    
    console.log(response);
    console.log(response.Latitude);
    console.log(response.Latitude[1]);
    //console.log(response.length)
    //response.Latitude.forEach(function(d) {
    for (var i = 0; i < 2721; i++) { //response[0].length?
        //total response 2721
        //var location = response[i];

        if (response) {
            coordinateArray.push([response.Longitude[i], response.Latitude[i], response.Degreeofendangerment[i]]);
        }
    }
    console.log('cooordinate array has been created');
    //return coordinateArray;
    console.log(coordinateArray);
});



console.log('Hello');
drawGlobe();    
drawGraticule();
enableRotation();


function drawGlobe() {  
    d3.queue()
        .defer(d3.json, 'https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-110m.json')          
        //.defer(d3.json, 'static/js/language_status_UNESCO.json')
        .await((error, worldData) => { //names the two data sources - i think....
            svg.selectAll(".segment")
                .data(topojson.feature(worldData, worldData.objects.countries).features)
                .enter().append("path")
                .attr("class", "segment")
                .attr("d", path)
                .style("stroke", "#888")//outline of countries
                .style("stroke-width", "1px")
                .style("fill", (d, i) => 'white') //fill color for countries
                .style("opacity", ".8");
                //locations = UNESCOData;
                drawMarkers();                   
        });
}

function drawGraticule() {
    const graticule = d3.geoGraticule()
        .step([10, 10]);

    svg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path)
        .style("fill", "black") //background of globe - think this needs to be same color as overall background
        .style("stroke", "white"); //latitude and longitude lines
}

function enableRotation() {
    d3.timer(function (elapsed) {
        projection.rotate([config.speed * elapsed - 120, config.verticalTilt, config.horizontalTilt]);
        svg.selectAll("path").attr("d", path);
        drawMarkers();
    });
}        

function drawMarkers() {

    console.log("Draw markers reached")
    console.log(coordinateArray)
    const markers = markerGroup.selectAll('circle')
        .data(coordinateArray);
    markers
        .enter()
        .append('circle')
        .merge(markers)
        .attr('cx', d => projection(d)[0]) //converts latitude and longitude to x and y values
        .attr('cy', d => projection(d)[1]) //seems to require having the pair and then choosing which value in the array rather than just d.lon for cx and d.lat for cy
        .attr('fill', d => {
            //console.log(data)
            const coordinate = [d[0], d[1]];
            gdistance = d3.geoDistance(coordinate, projection.invert(center)); //projection.invert converts x and y back to lat and lon
            return gdistance > 1.57 ? 'none' : chooseColor(d[2]); //color of dots
        })
        .attr('r', 3); //size of the dot
    //console.log([locations.Longitude, locations.Latitude])
    markerGroup.each(function () {
        this.parentNode.appendChild(this);
    });
}

//function to choose the color of the dots
function chooseColor(endangermentLevel) {
if (endangermentLevel == "Extinct") {
    return "#DA5526";
}
else if (endangermentLevel == "Critically endangered") {
    return "#F6893D";
}
else if (endangermentLevel == "Severely endangered") {
    return "#FEBC38";
}
else if (endangermentLevel == "Definitely endangered") {
    return "#DBC684";
}
else {
    return "#697F90";
};
}

// Create a legend to display information about our map
var colorList = {"Extinct": "#DA5526", "Critically Endangered": "#F6893D", "Severely Endangered": "#FEBC38", "Definitely Endangered": "#DBC684", "Vulnerable": "#697F90"};

colorize = function(colorList) {
    var globeLegend = document.getElementById('globeLegend');
  
    for (var key in colorList) {
        var boxContainer = document.createElement("DIV");
        var box = document.createElement("DIV");
        var label = document.createElement("SPAN");

        label.innerHTML = key;
        label.className = "label";
        box.className = "box";
        box.style.backgroundColor = colorList[key];

        boxContainer.appendChild(box);
        boxContainer.appendChild(label);

        globeLegend.appendChild(boxContainer);

   }
}

colorize(colorList);