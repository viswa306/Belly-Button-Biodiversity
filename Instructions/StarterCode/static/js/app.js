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
    
    var data=importedData
    console.log(data.names);
    //  getting otu_ids as array list
      
      var sample_values = data.samples[0].sample_values;
      console.log(sample_values);
      
      var otu_ids =data.samples[0].otu_ids;
      console.log(otu_ids);
      
      var otu_labels = data.samples[0].otu_labels;
      console.log(otu_labels);

      // Sort the data by otu_ids
var sortedOtuids =otu_ids.sort((a, b) => b.otu_ids- a.otu_ids);
console.log(sortedOtuids);
// ---------------------------------------------------------------------------------------
var sortedsample_values =sample_values.sort((a, b) => b.sample_values- a.sample_values);
console.log(sortedsample_values);
slicedData1 = sortedsample_values.slice(0, 10);
console.log(slicedData1);
reversedDatasamplevalues = slicedData1.reverse();
console.log(reversedDatasamplevalues);
// -------------------------------------------------------------------------------------

// Slice the first 10 objects for plotting
slicedData = sortedOtuids.slice(0, 10);
console.log(slicedData);
console.log("-----------------------")
// Reverse the array to accommodate Plotly's defaults
reversedDataotuids = slicedData.reverse();
console.log(reversedDataotuids);
 

// ----------------------------test----------------
// console.log(reversedData.map(object => object.otu_ids));


//  creating the bar chart
// var trace1 = {
//   type: "bar",
    
//     x: sample_values,
//   //   y: otu_ids,
//      y:reversedData,
//     //  text:otu_ids,
//      orientation: "h"
//  }
// values given in hardcoded way-------------------------------
x_otuids= [1977, 2318, 189, 352, 1189, 41, 2264, 482, 2859, 1167]
y_samplevalues=[40, 40, 47, 50, 51, 71, 78, 113, 126, 163]


var trace1 = {
  type: "bar",
    
    x:y_samplevalues,
  //   y: otu_ids,
    y:x_otuids ,
    
    text:otu_labels,
     orientation: "h"
 }



//  ----------------------------------test---------------------------------

var trace1 = {
  type: "bar",
    
    x:reversedDatasamplevalues ,
  //   y: otu_ids,
    y:reversedDataotuids,
    text:otu_labels,
     orientation: "h"
 }



// var trace1 = {
//   x: reversedData.map(object => object.sample_values),
//   y: reversedData.map(object => object.otu_ids),
//    text: reversedData.map(object => object.otu_ids),
//   name: "otu_ids",
//   type: "bar",
//   orientation: "h"
// };
var data = [trace1];
var layout = {
  title: "'Bar' Chart",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};

Plotly.newPlot("bar",data,layout);  
});
   
