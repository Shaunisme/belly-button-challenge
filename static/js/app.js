//1.Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
var dataSet;

document.getElementsByClassName("jumbotron")[0].style.background = "url('static/img/BBB.gif') repeat-x center";
document.getElementsByClassName("jumbotron")[0].style.color = "white";
document.getElementsByClassName("jumbotron")[0].style.textShadow = "4px 6px 5px #000000";
document.getElementsByClassName("jumbotron")[0].style.fontWeight = "bold";
document.getElementsByClassName("jumbotron")[0].style.fontVariant = "small-caps";

// Fetch the JSON data
d3.json(url).then(function(data) {
  
  dataSet=data;
  let element = document.getElementById("selDataset");

  for (let i in dataSet.names) {
    var subjectList = document.createElement("option");
    subjectList.text = parseInt(dataSet.names[i]);
    subjectList.value = dataSet.names[i];
    element.append(subjectList, element[null]);
  };

  let value = document.getElementById("selDataset").value;

  barChart(value);
  bubbleChart(value);
  metadataDisplay(value);
  gaugeChart(value);
});


//2.Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function barChart(value) {

  let sample = dataSet.samples.filter(subject => (subject.id === value));

  let first10Otu = sample[0].otu_ids.slice(0,10).map((object)=>"OTU "+object).reverse();
  let first10Labels = sample[0].otu_labels.slice(0,10).reverse();
  let first10Values= sample[0].sample_values.slice(0,10);
  first10Values.sort((a,b) => a-b);

  let plotData = [{
    x: first10Values,
    y: first10Otu,
    text: first10Labels,
    orientation:'h',
    type:"bar"}];

  let layout = {
    title: {
      text:'<b>Microbial Species ( Operational Taxonomic Units )</b>'},
    height: 500,
    width: 500,
    }; 
  config={responsive:true};

  graphDiv = document.getElementById('bar');
  Plotly.newPlot("bar", plotData, layout,config);
}

//3.Create a bubble chart that displays each sample.
function bubbleChart(value){

  let sample = dataSet.samples.filter(subject => (subject.id === value));
  let bubbleData = [{
    x: sample[0].otu_ids,
    y: sample[0].sample_values,
    mode:"markers",
    marker: {
      size: sample[0].sample_values,
      color: sample[0].otu_ids,
      colorscale: "Jet"
    },
    text:sample[0].otu_labels,
    type:"scatter"
  }];

  layout = {
    title: {
      text:'<b>Bubble Chart of Microbial Species</b>'},
    xaxis: {
      title: {
        text: 'OTU ( Operational Taxonomic Units ) ID',
        font: {
          family: 'Courier New, monospace',
          size: 18
        }
      },
    },
    showlegend: false
  }
  config={responsive:true};
  
  graphDiv = document.getElementById('bubble');
  Plotly.newPlot(graphDiv, bubbleData, layout,config);
}

//4.Display the sample metadata, i.e., an individual's demographic information.
//5.Display each key-value pair from the metadata JSON object somewhere on the page.
function metadataDisplay(inputValue) {

  var value = parseInt(inputValue);
  let metadata = dataSet.metadata.filter(subject => (subject.id === value));
  let element = d3.select("#sample-metadata");
  d3.selectAll('p').remove();
  // Display Metadata
  for (let i in metadata[0]) {
    element.append("p")
      .text(`${i}: ${metadata[0][i]}`)
  }
}  


//6.Update all the plots when a new sample is selected. 
function optionChanged(value){

  barChart(value);
  bubbleChart(value);
  metadataDisplay(value);
  gaugeChart(value);

}