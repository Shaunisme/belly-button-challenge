//Advanced Challenge Assignment (Optional)
// Trig to calc meter point
function gaugePointer(washFreq){
	
    // Plot needle
    var freqCalc = washFreq / 9 * 180
    var degrees = 180 - freqCalc, radius = 0.5; 
    var radians = degrees * Math.PI / 180;
    var aX = (0.01 * Math.cos((degrees - 90) * Math.PI / 180)) + 0.51;
    var aY = (0.01 * Math.sin((degrees - 90) * Math.PI / 180)) + 0.47;
    var bX = (-0.01 * Math.cos((degrees - 90) * Math.PI / 180)) + 0.51;
    var bY = (-0.01 * Math.sin((degrees - 90) * Math.PI / 180)) + 0.47;
    var cX = ((radius * Math.cos(radians))*0.5) + 0.51;
    var cY = ((radius * Math.sin(radians))*0.5) + 0.47 + 0.05;

    var path = 'M ' + aX + ' ' + aY +
    ' L ' + bX + ' ' + bY +
    ' L ' + cX + ' ' + cY +
    ' Z';

	return path;
}

function gaugeChart(metadata){
    var data = [
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

    var layout = {
        shapes:[{
            type: 'path',
            path: gaugePointer(metadata.wfreq),
            fillcolor: 'darkred',
            line: {
                color: 'darkred'
            }
            }],
        title: '<b>Bully Button Washing Frequency</b><br>Scrubs Per Week',
        autosize:true,
        height: 500,
        width: 500,
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

