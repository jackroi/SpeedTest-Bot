const fs = require('fs');

const config = require('../config.json');


const names = ['ookla_speedtest', 'fast_speedtest', 'eolo_speedtest', 'google_speedtest', 'googlefiber_speedtest'];

// I/O
const fetchFile = (path) => {
	try {
		let file = fs.readFileSync(path);
		return JSON.parse(file);
	} catch (e) {
		return [];
	}
};

// I/O
const saveFile_json = (path, obj) => {
  fs.writeFile(path, JSON.stringify(obj), (e) => {
    if (e) {
      console.log(e);
    }
  });
};

// resultsByName: create a file that contains the results stored by name (of speedtest)
const resultsByName = (results) => {
  const temp = {};

  names.forEach(name => {
    temp[name] = results.filter((record) => record.name === name)
  });

  saveFile_json('./output/' + 'resultsByName.json', temp);
};

// resultsByType: create a file that contains the results stored by type ()
const resultsByType = (results) => {
  const temp = {};

  temp.multiple = results.filter((record) => record.type === 'multiple');
  temp.single = results.filter((record) => record.type === 'single');

  saveFile_json('./output/' + 'resultsByType.json', temp);
};

// go: public function to clean the results
const go = () => {
  const results = fetchFile('./output/' + config.output_file);

  resultsByName(results);
  resultsByType(results);
};


module.exports = {
  go
};
