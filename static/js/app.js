//Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
/*  const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);
 */
// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data.names);
  console.log(data.metadata);
  console.log(data.samples);
  let element = d3.select("#selDataset");
  for (let i in data.names) {
    let option = element.append("option")
      .text(data.names[i])
      .attr("values", data.names[i]);
  }  
});

