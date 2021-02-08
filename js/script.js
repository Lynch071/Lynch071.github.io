"use strict";
// RADAR CHART

let data = [
  {
    HTML: 9.5,
    CSS: 8,
    JavaScript: 7.5,
    React: 6,
    PHP: 6,
  },
];
let features = ["HTML", "CSS", "JavaScript", "React", "PHP"];

// generate the data

// add blank SVG

let svg = d3
  .select(".radar")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);

// plotting the gridlines

let radialScale = d3.scaleLinear().domain([0, 10]).range([0, 150]);
let ticks = [2, 4, 6, 8, 10];

ticks.forEach((t) =>
  svg
    .append("circle")
    .attr("cx", 300)
    .attr("cy", 300)
    .attr("fill", "none")
    .attr("stroke", "gray")
    .attr("r", radialScale(t))
);

ticks.forEach((t) =>
  svg
    .append("text")
    .attr("x", 305)
    .attr("y", 300 - radialScale(t))
    .text(t.toString())
);

// plotting the axes

function angleToCoordinate(angle, value) {
  let x = Math.cos(angle) * radialScale(value);
  let y = Math.sin(angle) * radialScale(value);
  return { x: 300 + x, y: 300 - y };
}

for (let i = 0; i < features.length; i++) {
  let ft_name = features[i];
  let angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
  let line_coordinate = angleToCoordinate(angle, 10);
  let label_coordinate = angleToCoordinate(angle, 13);

  //draw axis line
  svg
    .append("line")
    .attr("x1", 300)
    .attr("y1", 300)
    .attr("x2", line_coordinate.x)
    .attr("y2", line_coordinate.y)
    .attr("stroke", "black");

  //draw axis label
  svg
    .append("text")
    .attr("x", label_coordinate.x)
    .attr("y", label_coordinate.y)
    .text(ft_name);
}

// data plotting

let line = d3
  .line()
  .x((d) => d.x)
  .y((d) => d.y);
let colors = ["#37fb9cff"];

function getPathCoordinates(data_point) {
  let coordinates = [];
  for (var i = 0; i < features.length; i++) {
    let ft_name = features[i];
    let angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
    coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
  }
  return coordinates;
}

for (var i = 0; i < data.length; i++) {
  let d = data[i];
  let color = colors[i];
  let coordinates = getPathCoordinates(d);

  //draw the path element
  svg
    .append("path")
    .datum(coordinates)
    .attr("d", line)
    .attr("stroke-width", 3)
    .attr("stroke", color)
    .attr("fill", color)
    .attr("stroke-opacity", 1)
    .attr("opacity", 0.5);
}
