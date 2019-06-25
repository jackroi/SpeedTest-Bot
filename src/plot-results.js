const fs = require('fs');

const config = require('../config.json');


// fetchFile: fetch a JSON file
const fetchFile = (path) => {
  try {
    let file = fs.readFileSync(path);
    return JSON.parse(file);
  } catch (e) {
    console.log(e);
    return [];
  }
};

// go: public function to plot the results
const go = () => {
  // get username and password from login
  const username = config.plot.username;
  const api_key = config.plot.api_key;

  if (!username || !api_key) {                    // catch eventual errors
    throw Error("missing username or api_key")
  }

  const plotly = require('plotly')(config.plot.username, config.plot.api_key)   // pass username and password to plotly library

  const results = fetchFile('./output/' + config.output_file);          // fetch output file

  // prepare data array that will be uploaded to plotly
  const date_arr = results.map(element => {
    return new Date(parseInt(element.time)).toISOString();
  });

  const download_arr = results.map(element => {
    return element.download;
  });

  const upload_arr = results.map(element => {
    return element.upload;
  });

  const ping_arr = results.map(element => {
    return element.ping;
  });

  // data that will be uploaded to plotly
  const data = [
    {
      x: date_arr,
      y: download_arr,
      name: 'Download',
      type: 'scatter'       // type of graph
    },
    {
      x: date_arr,
      y: upload_arr,
      name: 'Upload',
      type: 'scatter'       // type of graph
    },
    {
      x: date_arr,
      y: ping_arr,
      name: 'Ping',
      type: 'scatter'       // type of graph
    }
  ];


  const layout = {fileopt : "overwrite", filename : "speed-test-graph"};

  plotly.plot(data, layout, function (err, msg) {       // plot the results
    if (err) return console.log(err);
    console.log(msg);
  });


  const figure = { 'data': data };

  const imgOpts = {     // image options
      format: 'png',
      width: 1000,
      height: 700
  };

  plotly.getImage(figure, imgOpts, function (error, imageStream) {        // get the image of the graph
      if (error) return console.log (error);

      const fileStream = fs.createWriteStream('./output/graph.png');
      imageStream.pipe(fileStream);
  });
}


module.exports = {
  go
};
