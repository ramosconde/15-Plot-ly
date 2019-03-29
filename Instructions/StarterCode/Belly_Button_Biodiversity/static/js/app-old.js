function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    
	d3.json(`/metadata/${sample}`).then(meta => {
		console.log(meta);
		var panel = d3.select("#sample-metadata");
		panel.html("");
		Object.entries(meta).forEach(item => {
			panel.append("h5").text(`${item[0]}: ${item[1]}`);
		});
	
    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
//    buildGauge(data.WFREQ);

    });
}



// Bubble Chart---------------------------------------------------------

function buildCharts(sample) {

// @TODO: Use `d3.json` to fetch the sample data for the plots
	d3.json(`/samples/${sample}`).then(sampleData => {
	
	var trace1 = {
		x: sampleData.otu_ids,
		y: sampleData.sample_values,
		mode: 'markers',
		marker:{
			size: sampleData.sample_values,
			color: sampleData.otu_ids,
			colorscale: "Rainbow"
    	}
	};
	var bubbleData = [trace1];
	var bubbleLayout = {
		xaxis: "OUT ID"
		};
	
	Plotly.newPlot('bubble', bubbleData, bubbleLayout);
	
	});
	
	
	// Pie Chart---------------------------------------------------------
	
	var pieData = [{
		values: sampleData.sample_values.slice(0,10),
		labels: sampleData.otu_ids.slice(0,10),
		type: 'pie'
	}];

	var pieLayout = {};

	Plotly.newPlot("pie", pieData, pieLayout);
	
	}
	
	
	
	
	// 
// 		var trace1 = {4
//   			x: sampleData.otu_ids,
//   			y: sampleData.sample_values,
//   			mode: 'markers',
//   			marker: {3
//     			size: sampleData.sample_values,
//     			color: sampleData.otu_ids,
//     			colorscale: "Rainbow"
//   			3};
// 		4};
// 
// 		var bubbleData = [trace1];
// 
// 		var bubbleLayout = {2
//   			xaxis: ' OUT ID'
// 		2};
// 
// 		Plotly.newPlot('bubble', bubbleData, bubbleLayout);
// 1};


// });

// 
// 	// build pie chart HERE
// // Pie Chart---------------------------------------------------------
// 	
// 	var pieData = [{
//  	 values: sampleData.sample_values.slice(0,10),
//  	 labels: sampleData.otu_ids.slice(0,10),
//   	type: 'pie'
// 	}];
// 
// 	var pieLayout = {};
// 
// 	Plotly.newPlot("pie", pieData, pieLayout);
// 
// 	// });
// // gauge chart =================================================start
// 
// // var gaugeData = [{
// //  	 values: sampleData.sample_values.slice(0,10),
// //  	 labels: sampleData.otu_ids.slice(0,10)
// //  	 mode: 'markers',
// //   			marker: {
// //     			size: sampleData.sample_values,
// //     			color: sampleData.otu_ids,
// //     			colorscale: "Rainbow"
// // 	}];
// // 
// //    
// //     "domain": {"x": [0, 0.48]},
// //     "name": "Gauge",
// //     "hole": .3,
// //     "type": "pie",
// //     "direction": "clockwise",
// //     "rotation": 90,
// //     "showlegend": False,
// //     "textinfo": "label",
// //     "textposition": "inside",
// //     "hoverinfo": "none"
// //     
// //     var gaugeLayout = {};
// //     
// //     Plotly.newPlot('gauge', gaugeData, gaugeLayout);
// 
// 
// // gauge chart =================================================end
// });
// }

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
