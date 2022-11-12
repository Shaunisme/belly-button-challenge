// Advanced Challenge Assignment (Optional)
// Calc needle pointer
function gaugePointer(washFreq){
	
    radians = (degrees) => degrees * Math.PI / 180;
    var freqCalc = washFreq / 9 * 180;
    var radius = 0.15; 

    const width = 0.015;
    const coordianateOffset= 0.50;

    // Reference https://observablehq.com/@arronhunt/building-a-gauge-meter-with-plotly
    // x, y is the needle pointer
    var x  = coordianateOffset + (-1) * Math.cos(radians(freqCalc)) * radius, // -1 inverts the direction of the rotation
        y  = coordianateOffset +        Math.sin(radians(freqCalc)) * radius;
    // x0, y0 and x1, y1 is the baseline of needle
    var x0 = coordianateOffset + (-1) * Math.cos(radians(freqCalc - 90)) * width,
        y0 = coordianateOffset +        Math.sin(radians(freqCalc - 90)) * width;
    var x1 = coordianateOffset +        Math.cos(radians(freqCalc - 90)) * width,
        y1 = coordianateOffset + (-1) * Math.sin(radians(freqCalc - 90)) * width;
    console.log(x0,y0,x1,y1);
    // SVG draw a triangle: M move to point-1 x/y, L from x/y draw a line to point-2 x0/y0, L draw next line from x0,y0 to point-3 x1,y1, and Z will back to point-1 x,y and sealed
    var path = `
    M ${x} ${y}
    L ${x0} ${y0}
    L ${x1} ${y1}
    Z`
	return path;
}

function gaugeChart(inputValue){
    var value = parseInt(inputValue);
    let metadata = dataSet.metadata.filter(subject => (subject.id === value));

    // make a pie chart, and set half of pie to white, so dispeared
    var data = [
        { values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
        rotation: 90, 
        text:['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1'],
        textinfo: 'text',
        textposition:'inside',	  
        marker: {colors:['rgba(0, 171, 0, .5)', 'rgba(20, 204, 0, .5)',
                            'rgba(32, 232, 0, .5)', 'rgba(73, 255, 0, .5)',
                            'rgba(128, 255, 0, .5)', 'rgba(153, 255, 51, .5)',
                            'rgba(178, 255, 102, .5)', 'rgba(200, 255, 183, .5)','rgba(229, 255, 229, .5)',
                            'rgba(255, 255, 255, 0)']},
        labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',' '],
        hoverinfo: "skip",
        hole: .4,
        type: 'pie',
        showlegend: false
    }];

    var layout = {
        shapes:[{
            type: 'path',
            path: gaugePointer(metadata[0].wfreq),

            fillcolor: 'darkred',
            line: {
                width: 0
            }
            }],
        title: '<b>Bully Button Washing Frequency</b><br>Scrubs Per Week',
        width: 500,
        height: 500,
        margin: {"t": 80, "b": 0, "l": 10, "r": 10}
    }; 
    config={responsive:true};
    // plot the gauge chart
    graphDiv = document.getElementById('gauge');
    Plotly.newPlot(graphDiv, data, layout,config); 
}

