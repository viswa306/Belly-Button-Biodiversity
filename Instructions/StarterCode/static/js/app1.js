// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

d3.json("static/samples.json").then((importedData)=>{
// d3.json("static/samples.json").then(function(data) {

  console.log(importedData);
  
  var data=importedData;
  
// -------------------------------------------------------------------------------------
// Grab values from the data json object to build the plots
var name = data.names;
console.log(name);
var samples = data.samples;
console.log(samples);
for (var i = 0; i < name.length; i++) {
 console.log(name[i]);
  //  console.log("-----------------------------------");
  var resultArray = samples.filter(sampleObj => sampleObj.id == name[0] );
  console.log(resultArray);
  var result = resultArray[0];
}
 console.log(result);
 var sample_values = result.sample_values;
 console.log(sample_values);
 // Use `otu_labels` as the hovertext for the chart.
var otu_labels = result.otu_labels;
console.log(otu_labels);
var otu_ids = result.otu_ids;
console.log(otu_ids);
// Use `otu_ids` as the labels for the bar chart
var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse()
console.log(yticks);

//  pie chart labels
var labels = otu_ids.slice(0, 10).map(otuID => ` ${otuID}`).reverse()


//  -----------------part 3 Demographic info ----------------------------------------------
var metaData =data.metadata[0];
  // var metaData= data.metadata[0];
  console.log(metaData);

  Object.entries(metaData).forEach(([key, value]) => {
    d3.select("#sample-metadata")
      .append("h6")
      .text(`${key}: ${value}`);

  
  });

// ---------------------------------Barchart-----------------------------------------------------------
var trace1 = {
  type: "bar",
     x:sample_values ,
      y:yticks,
    text:otu_labels,
     orientation: "h"
 }
 var data = [trace1];
//   lay out
 var layout = {
   title: "Bar Chart",
   margin: {
     l: 100,
     r: 100,
     t: 100,
     b: 100
   }
 };
 
 Plotly.newPlot("bar",data,layout); 

// ---------------------------- Bubble chart--------------------------------------------

// * Use `otu_ids` for the x values.

// * Use `sample_values` for the y values.

// * Use `sample_values` for the marker size.

// * Use `otu_ids` for the marker colors.

// * Use `otu_labels` for the text values.

var trace2 = {
  x: otu_ids,
  y:sample_values,
  mode: 'markers',
  text: otu_labels,
    marker: {
    color:otu_ids,
    colorscale:"Earth",
    opacity: [1,0.8, 0.6, 0.4, 0.2],
 size:sample_values
  }
};

var data = [trace2];

var layout = {
  title: "Bacteria Cultures Per Sample",
      // margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30}
        //  margin: { t: 30} if this is in the chart is showing the tiltle
    };

Plotly.newPlot('bubble', data, layout)

// ---------------------------------------pie chart--------------------------------------------------------------
var trace3 = {
  labels: labels,
    values:otu_ids,
  type: "pie"
};
var data =[trace3]
 var layout ={

  title:"pie chart"
 }
 Plotly.newPlot("pie",data,layout);
  


// -------------------------------Demographic info-----------------------------------------------

// --------------------------------------------------------------------------------------
// d3.select("#sample-metadata")
// .selectAll("div")
// .data(demoInfo1)
// .enter()
// .append("div")
// .text(function(d){
//   return d;
  
// });


});

