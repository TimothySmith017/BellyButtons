function init() {
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        console.log(data);
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });
    })};

    buildCharts(940);
    buildMetadata(940);

init();

function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
};

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var PANEL = d3.select("#sample-metadata");

        PANEL.html("");
        Object.entries(result).forEach(([key, value]) =>
        {PANEL.append("h6").text(key + " : " + value);})
    });

};




//d3.json("samples.json").then((data) => {
   // desampstotal = data.samples.map(person => person.sampstotal).sort((a,b) => b - a);
   // console.log(desampstotal);
//});




function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var sampleresult = resultArray[0];
        var otu_idlist = sampleresult.otu_ids.slice(0,10);
        var otu_ids = sampleresult.otu_ids.slice(0,10).map(item => 'OTU ' +item);
        var otu_labels = sampleresult.otu_labels.slice(0,10);
        var sample_values = sampleresult.sample_values.slice(0,10);
        console.log(otu_labels);
        console.log(otu_ids);
        console.log(sample_values);
        

        var barchart = [{
            type: 'bar',
            x: sample_values.reverse(),
            y: otu_ids.reverse(),
            orientation: 'h',
            text: otu_labels
        }];


        Plotly.newPlot('bar',barchart);



        var bubbledata = [{
            x: otu_idlist,
            y: sample_values,
            mode: 'markers',
            marker: {
                color: (otu_idlist),
                size: (sample_values),
            },
            text: otu_labels
        }];

        var layout = {
            xaxis: {title: "OTU_ID"},

        };

        Plotly.newPlot("bubble",bubbledata,layout);

        Object.entries(sampleresult).forEach(([key, value]) =>
            {console.log(key + " : " + value);})

        });
    
};  
