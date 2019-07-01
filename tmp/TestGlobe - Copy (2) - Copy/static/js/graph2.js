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

drawGlobe();    
drawGraticule();
enableRotation();    

var url = 'static/js/language_status_UNESCO.json'

d3.json(url, function(response) {

    console.log(response);
    console.log(response.Latitude)
    console.log(response.length) //response.length isn't a thing.  What should I use instead?
  
    var coordinateArray = [];
  
    for (var i = 0; i < response.length; i++) {
      var location = response[i];
  
      if (location) {
        coordinateArray.push([location.latitude, location.longitude]);
      }
    }

    console.log(coordinateArray)
});

function drawGlobe() {  
    d3.queue()
        .defer(d3.json, 'https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-110m.json')          
        .defer(d3.json, 'static/js/language_status_UNESCO.json')
        .await((error, worldData, UNESCOData) => { //names the two data sources - i think....
            svg.selectAll(".segment")
                .data(topojson.feature(worldData, worldData.objects.countries).features)
                .enter().append("path")
                .attr("class", "segment")
                .attr("d", path)
                .style("stroke", "#888")//outline of countries
                .style("stroke-width", "1px")
                .style("fill", (d, i) => '#e5e5e5') //fill color for countries
                .style("opacity", ".6");
                //locations = UNESCOData;
                //drawMarkers();                   
        });
}

function drawGraticule() {
    const graticule = d3.geoGraticule()
        .step([10, 10]);

    svg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path)
        .style("fill", "#fff") //background of globe - think this needs to be same color as overall background
        .style("stroke", "#ccc"); //latitude and longitude lines
}

function enableRotation() {
    d3.timer(function (elapsed) {
        projection.rotate([config.speed * elapsed - 120, config.verticalTilt, config.horizontalTilt]);
        svg.selectAll("path").attr("d", path);
        //drawMarkers();
    });
}        

// function drawMarkers() {
//     const markers = markerGroup.selectAll('circle')
//         .data(coordinateArray);
//     markers
//         .enter()
//         .append('circle')
//         .merge(markers)
//         .attr('cx', d => projection(data)[0]) //converts latitude and longitude to x and y values
//         .attr('cy', d => projection(data)[1]) //seems to require having the pair and then choosing which value in the array rather than just d.lon for cx and d.lat for cy
//         .attr('fill', d => {
//             const coordinate = [d.Longitude, d.Latitude];
//             gdistance = d3.geoDistance(coordinate, projection.invert(center)); //projection.invert converts x and y back to lat and lon
//             return gdistance > 1.57 ? 'none' : 'steelblue'; //color of dots
//         })
//         .attr('r', 7); //size of the dot
//     console.log([locations.Longitude, locations.Latitude])
//     markerGroup.each(function () {
//         this.parentNode.appendChild(this);
//     });
// }

