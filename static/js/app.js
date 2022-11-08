//Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data
d3.json(url).then(function(data) {
  console.log(data.names);
  console.log(data.metadata);
  console.log(data.samples);

  let element = d3.select("#selDataset");
  // Make dropdwon select option from namws
  for (let i in data.names) {
    let option = element.append("option")
      .text(data.names[i])
      .attr("values", data.names[i]);
  }  

  //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
  function init() {
    let sample = data.samples[0];

    let first10Otu = sample.otu_ids.slice(0,10).map((object)=>"OTU "+object).reverse();
    let first10Lables = sample.otu_labels.slice(0,10).reverse();
    let first10Values= sample.sample_values.slice(0,10);
    first10Values.sort((a,b) => a-b);
    console.log("first10 :",first10Otu,first10Lables,first10Values);
    let plotData = [{
      x: first10Values,
      y: first10Otu,
      text: first10Lables,
      orientation:'h',
      type:"bar"}];

    let layout = {
        height: 600,
        width: 400
      }; 
    config={responsive:true};

    console.log("plotdata: ",plotData);
    Plotly.newPlot("bar", plotData, layout,config);
  }

  init();
});

