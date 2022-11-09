//Advanced Challenge Assignment (Optional)
// Trig to calc meter point
function gaugePointer(angle){
	
    var degrees = 180 - angle;
    var radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    console.log("radians: ",radians,"math.cos: ",Math.cos(radians),"math.sin: ",Math.sin(radians));


    // Path: create triangle
    var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);
    console.log("x: ",x," y: ",y);
	console.log("path: ",path);
	return path;
}

function gaugeChart(metadata){
    var data = [{ type: 'scatter',
        x: [0], y:[0],
        marker: {size: 18, color:'darkred'},
        showlegend: false,
        name: 'Washing Frequency',
        text: metadata.wfreq,
        hoverinfo: 'text+name'},

        { values: [81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
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

    var angle = metadata.wfreq * 180/9;
    var layout = {
    shapes:[{
        type: 'path',
        path: gaugePointer(angle),
        fillcolor: 'darkred',
        line: {
            color: 'darkred'
        }
        }],
    title: '<b>Bully Button Washing Frequency</b><br>Scrubs Per Week',
        autosize:true,
    height: 600,
    width: 600,
    xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };
    config={responsive:true};
    // plot the gauge chart
    graphDiv = document.getElementById('gauge');
    Plotly.newPlot(graphDiv, data, layout,config); 
}

