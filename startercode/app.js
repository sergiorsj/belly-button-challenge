//URL

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Json data

d3.json(url).then(function(data) {
    console.log(data);
    // dropdown menu

    const dropDown = d3.select("#selDataset");

    const names = data.names;

    for (let i = 0; i < names.length; i++) {
        let option = dropDown.append("option");
        option.property("value", names[i]);
        option.text(names[i]);
    }

    //1 sample
    barChart(names[0]);
    bubbleChart(names[0]);
    demographicInfo(names[0])
});

// 3. Creating a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function barChart(sample) {
    d3.json(url).then(function(data) {
      // Filtering the data for the selected sample
      const sampleData = data.samples.filter(obj => obj.id === sample)[0];
  
      // Getting the top 10 OTUs and reverse the order for horizontal bar chart
      const top10OTUs = sampleData.otu_ids.slice(0, 10).reverse();
      const top10Values = sampleData.sample_values.slice(0, 10).reverse();
      const top10Labels = sampleData.otu_labels.slice(0, 10).reverse();
  
      // Creating the trace for the bar chart
      const barTrace = {
        x: top10Values,
        y: top10OTUs.map(otu => `OTU ${otu}`),
        text: top10Labels,
        type: "bar",
        orientation: "h"
      };
  
      // Creating the data array for the plot
      const barData = [barTrace];
  
      // Defining the layout for the bar chart
      const barLayout = {
        title: `Top 10 OTUs for Sample ${sample}`,
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU IDs" }
      };
  
      // Plotting the bar chart
      Plotly.newPlot("bar", barData, barLayout);
    })
};

 // 4. Creating a bubble chart that displays each sample.
    function bubbleChart(sample) {
        d3.json(url).then(function(data) {
          // Filter the data for the selected sample
          const sampleData = data.samples.filter(obj => obj.id === sample)[0];
      
          // Get the top 10 OTUs and reverse the order for horizontal bar chart
          const OTUs = sampleData.otu_ids;
          const values = sampleData.sample_values;
          const labels = sampleData.otu_labels;
     // Create the trace for the bubble chart

     const bubbleTrace = {
        x: OTUs,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          size: sampleData.sample_values,
          color: sampleData.otu_ids,
          colorscale: "Earth"
        }
        
    };
  
      // Create the data array for the bubble chart
      const bubbleData = [bubbleTrace];
  
      // Define the layout for the bubble chart
      const bubbleLayout = {
        title: `OTU IDs vs. Sample Values for Sample ${sample}`,
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "Sample Values" },
        showlegend: false
      };
  
      // Plot the bubble chart
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    })
};
  
  
// 5. Displaying the sample metadata, i.e., an individual's demographic information.

function demographicInfo(sample) {
    d3.json(url).then(function(data) {
      const metadata = data.metadata;
      const result = metadata.filter(obj => obj.id == sample)[0];
      const panel = d3.select("#sample-metadata");
  
      panel.html("");
  
      Object.entries(result).forEach(([key, value]) => {
        panel.append("p").text(`${key}: ${value}`);
      });
    });
};


// 6. Updating all the plots when a new sample is selected. 
function optionChanged(value) {
    console.log(value);
    barChart(value);
    bubbleChart(value)
    demographicInfo(value);
  };