//1.Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

document.getElementsByClassName("jumbotron")[0].style.background = "url('static/img/BBB.png') repeat-x center";
document.getElementsByClassName("jumbotron")[0].style.color = "white";
document.getElementsByClassName("jumbotron")[0].style.textShadow = "4px 6px 5px #000000";
document.getElementsByClassName("jumbotron")[0].style.fontWeight = "bold";
document.getElementsByClassName("jumbotron")[0].style.fontVariant = "small-caps";

// Fetch the JSON data
d3.json(url).then(function(data) {
  
  let element = document.getElementById("selDataset");
  // Make dropdwon select option from names
/*   for (let i in data.names) {
    let option = element.append("option")
      .text(data.names[i])
      .attr("values", data.names[i]);
  }   */

for (let i in data.names) {
    var subjectList = document.createElement("option");
    subjectList.text = parseInt(data.names[i]);
    subjectList.value = data.names[i];
    element.append(subjectList, element[null]);
};

  barChart(data.samples[0]);
  bubbleChart(data.samples[0]);
  metadataDisplay(data.metadata[0]);
  gaugeChart(data.metadata[0]);
});


//2.Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function barChart(sample) {

    let first10Otu = sample.otu_ids.slice(0,10).map((object)=>"OTU "+object).reverse();
    let first10Labels = sample.otu_labels.slice(0,10).reverse();
    let first10Values= sample.sample_values.slice(0,10);
    first10Values.sort((a,b) => a-b);

    let plotData = [{
      x: first10Values,
      y: first10Otu,
      text: first10Labels,
      orientation:'h',
      type:"bar"}];

    let layout = {
      height: 500,
      width: 500
      }; 
    config={responsive:true};

    graphDiv = document.getElementById('bar');
    Plotly.newPlot("bar", plotData, layout,config);
  }

//3.Create a bubble chart that displays each sample.
function bubbleChart(sample){
  let bubbleData = [{
    x: sample.otu_ids,
    y: sample.sample_values,
    mode:"markers",
    marker: {
      size: sample.sample_values,
      color: sample.otu_ids,
      colorscale: "Earth"
    },
    text:sample.otu_labels,
    type:"scatter"
  }];

  layout = {
    showlegend: false
  }
  config={responsive:true};
  
  graphDiv = document.getElementById('bubble');
  Plotly.newPlot(graphDiv, bubbleData, layout,config);
}

//4.Display the sample metadata, i.e., an individual's demographic information.
//5.Display each key-value pair from the metadata JSON object somewhere on the page.
function metadataDisplay(metadata) {
  let element = d3.select("#sample-metadata");
  d3.selectAll('p').remove();
  // Display Metadata
  for (let i in metadata) {
    element.append("p")
      .text(`${i}: ${metadata[i]}`)
  }
}  


//6.Update all the plots when a new sample is selected. 
function optionChanged(value){

  d3.json(url).then(function(data) {
    let sample = [];
    let metadata = [];
    for ( let i in data.samples){
      sample = data.samples[i];
      metadata = data.metadata[i];
      if ( sample.id == value ) {
        break;
      }
    }
  barChart(sample);
  bubbleChart(sample);
  metadataDisplay(metadata);
  gaugeChart(metadata);
  })

}