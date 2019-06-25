const yargs = require('yargs');

const speedtest = require('./src/speed-test.js');
const cleanResults = require('./src/clean-results.js');
const plotResults = require('./src/plot-results.js');
const config = require('./config.json');


// show_help: show help message
const show_help = () => {
  console.log('Commands:');
  console.log();
  console.log('>>>  node index.js -r | node index.js --run');
  console.log('  runs speedtests continuosly, it stops when you press CTRL-C or when the amount of time specified in config.json has elapsed');
  console.log();
  console.log('>>>  node index.js -c | node index.js --clean');
  console.log('  generates two json files: one will contain the results divided by provider, the other will contain the results divided by type (single or multiple connections)');
  console.log();
  console.log('>>>  node index.js -p | node index.js --plot');
  console.log('  plots the results in a chart viewable online at the given URL or as an image (needs a plotly api key, for more informations read the readme.txt file)');
  console.log();
  console.log('>>>  node index.js -s | node index.js --show');
  console.log('  shows the current settings stored in config.json');
  console.log();
};

// run_speedtest: start the speedtest
const run_speedtest = () => {
  speedtest.go();
};

// run_cleanResults: run clean results utility
const run_cleanResults = () => {
  cleanResults.go();
};

// show_config: show current content of config file
const show_config = () => {
  console.log('  OUTPUT FILE: ' + config.output_file);
  console.log('  SPEEDTEST DURATION: ' + config.time);
  console.log('  HEADLESS MODE: ' + config.headless);
  console.log('  DEBUG MODE: ' + config.debug);
  console.log('  PLOT USERNAME: ' + config.plot.username);
  console.log('  PLOT API_KEY: ' + config.plot.api_key);
  console.log('  PLOT GENERATE IMAGE: ' + config.plot.generate_image);
};

// plot_results: plot the results
const plot_results = () => {
  plotResults.go();
};



// main
const debug = config.debug;
const argv = yargs.argv;


if (debug) console.log('Yargs: ', argv);

// execute the right command
if (argv.h) {
  show_help();
} else if (argv.run || argv.r) {
  run_speedtest();
} else if (argv.clean || argv.c) {
  run_cleanResults();
} else if (argv.show || argv.s) {
  show_config();
} else if (argv.plot || argv.p) {
  plot_results();
} else {
  console.error('command not recognised, run node index.js -h for help');
}
