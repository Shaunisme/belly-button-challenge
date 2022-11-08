//Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

/* const dataPromise = d3.json(url);
console.log("dataPromise: ",dataPromise);
//console.log("dataPromise name: ",dataPromise.all(value));

const dataset=d3.json(url).then(function(data) {
  return data;
})
console.log("dataset",dataset.data);

const data = dataset.then(function(value) {
  return Promise.all(value.map(function(results){
  return results;
   }))});
console.log("data: ",data);

console.log(data.names);
console.log(data.metadata);
console.log(data.samples); */

// Fetch the JSON data
d3.json(url).then(function(data) {

  let element = d3.select("#selDataset");
  // Make dropdwon select option from names
  for (let i in data.names) {
    let option = element.append("option")
      .text(data.names[i])
      .attr("values", data.names[i]);
  }  

  //Select change
  //d3.selectAll("#selDataset").on("change", updatePlotly);


  barChart(data.samples[0]);
  bubbleChart(data.samples[0]);
});


//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function barChart(sample) {

    let first10Otu = sample.otu_ids.slice(0,10).map((object)=>"OTU "+object).reverse();
    let first10Labels = sample.otu_labels.slice(0,10).reverse();
    let first10Values= sample.sample_values.slice(0,10);
    first10Values.sort((a,b) => a-b);
    //console.log("first10 :",first10Otu,first10Labels,first10Values);
    let plotData = [{
      x: first10Values,
      y: first10Otu,
      text: first10Labels,
      orientation:'h',
      type:"bar"}];

    let layout = {
/*         height: 600,
        width: 400 */
      }; 
    config={responsive:true};

    graphDiv = document.getElementById('bar');
    Plotly.newPlot("bar", plotData, layout,config);
  }

  //Create a bubble chart that displays each sample.
function bubbleChart(sample){
  let bubbleData = [{
    x: sample.otu_ids,
    y: sample.sample_values,
    mode:"markers",
    marker: {
      size: sample.sample_values,
      color: sample.otu_ids
    },
    text:sample.otu_labels,
    type:"scatter"
  }];

  console.log("bubbleData: ", bubbleData);
  layout = {
/*     title: 'Bubble Chart Hover Text', */
    showlegend: false
/*     height: 600,
    width: 1000 */
  }
  config={responsive:true};
  
  graphDiv = document.getElementById('bubble');
  Plotly.newPlot(graphDiv, bubbleData, layout,config);
}

// Change when dropdown menu
function optionChanged(value){

  //console.log("value: ",value)

  d3.json(url).then(function(data) {
    let sample = [];
    for ( let i in data.samples){
      sample = data.samples[i];

      if ( sample.id == value ) {
        break;
      }
    }
  barChart(sample);
  bubbleChart(sample);
  })

}