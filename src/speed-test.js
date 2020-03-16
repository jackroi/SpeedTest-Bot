const fs = require('fs');
const puppeteer = require('puppeteer');

const config = require('../config.json');


console.log('Server started');
const debug = config.debug;
const names = ['ookla_speedtest', 'fast_speedtest', 'eolo_speedtest', 'google_speedtest', 'googlefiber_speedtest'];

const URLs = {
  ookla_speedtest: 'http://www.speedtest.net/it',
  fast_speedtest: 'https://fast.com/it',
  eolo_speedtest: 'http://eolo.speedtestcustom.com/',
  google_speedtest: 'https://www.google.it/search?q=speed+test&oq=spee&aqs=chrome.3.69i60l2j69i57j35i39l2j0.4133j0j7&sourceid=chrome&ie=UTF-8',
  googlefiber_speedtest: 'http://speedtest.googlefiber.net/'
};

// functions to launch speedtest and to scrape results
const do_ookla_speedtest_multiple = async (page) => {
  await page.goto(URLs.ookla_speedtest);
  await page.waitFor(3000);

  // skip pop-up
  //await page.click('#_evidon-banner-acceptbutton');
  await page.click('#_evidon-banner-acceptbutton');
  await page.waitFor(3000);

  // await page.screenshot({
  //   path: './after_banner.jpg'
  // });

  const ookla_speedtest_go_selector = '#container > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.start-button > a';

  console.log('doing speedtest (ookla)');
  await page.click(ookla_speedtest_go_selector);

  // await page.waitFor(1000 * 2);
  // await page.screenshot({
  //   path: './start.jpg'
  // });

  await page.waitFor(1000 * 60);
  console.log('speedtest done');

  const result = await page.evaluate(() => {
    const data = {
      time: (new Date().getTime().toString()),
      name: 'ookla_speedtest',
      type: 'multiple',
      download: '-1',
      upload: '-1',
      ping: '-1',
      ping_loaded: '-1',
      jitter: '-1'
    };

    const data_selectors = {
      ping: '#container > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.main-view > div > div.result-area.result-area-test > div > div > div.result-container-speed.result-container-speed-active > div.result-container-data > div.result-item-container.result-item-container-align-right > div > div.result-data.u-align-left > span',
      download: '#container > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.main-view > div > div.result-area.result-area-test > div > div > div.result-container-speed.result-container-speed-active > div.result-container-data > div.result-item-container.result-item-container-align-center > div > div.result-data.u-align-left > span',
      upload: '#container > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.main-view > div > div.result-area.result-area-test > div > div > div.result-container-speed.result-container-speed-active > div.result-container-data > div.result-item-container.result-item-container-align-left > div > div.result-data.u-align-left > span'
    };

    data.download = document.querySelector(data_selectors.download).textContent;
    data.upload = document.querySelector(data_selectors.upload).textContent;
    data.ping = document.querySelector(data_selectors.ping).textContent;

    return data;
  });

  return result;
};

const do_ookla_speedtest_single = async (page) => {
  await page.goto(URLs.ookla_speedtest);
  await page.waitFor(3000);

  // skip pop-up
  //await page.click('#_evidon-banner-acceptbutton');
  await page.click('#_evidon-banner-acceptbutton');
  await page.waitFor(3000);

  // change to single
  const ookla_speedtest_single_selector = '#container > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.main-view > div > div:nth-child(5) > div > div > a.test-mode-icon > svg.svg-icon.svg-icon-ms.svg-icon-ring.active';
  await page.click(ookla_speedtest_single_selector);
  await page.waitFor(3500);

  // await page.screenshot({
  //   path: './after_banner.jpg'
  // });

  const ookla_speedtest_go_selector = '#container > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.start-button > a';
  console.log('doing speedtest (ookla)');
  await page.click(ookla_speedtest_go_selector);

  // await page.waitFor(1000 * 2);
  // await page.screenshot({
  //   path: './start.jpg'
  // });

  await page.waitFor(1000 * 60);
  console.log('speedtest done');

  const result = await page.evaluate(() => {
    const data = {
      time: (new Date().getTime().toString()),
      name: 'ookla_speedtest',
      type: 'single',
      download: '-1',
      upload: '-1',
      ping: '-1',
      ping_loaded: '-1',
      jitter: '-1'
    };

    const data_selectors = {
      ping: '#container > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.main-view > div > div.result-area.result-area-test > div > div > div.result-container-speed.result-container-speed-active > div.result-container-data > div.result-item-container.result-item-container-align-right > div > div.result-data.u-align-left > span',
      download: '#container > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.main-view > div > div.result-area.result-area-test > div > div > div.result-container-speed.result-container-speed-active > div.result-container-data > div.result-item-container.result-item-container-align-center > div > div.result-data.u-align-left > span',
      upload: '#container > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.main-view > div > div.result-area.result-area-test > div > div > div.result-container-speed.result-container-speed-active > div.result-container-data > div.result-item-container.result-item-container-align-left > div > div.result-data.u-align-left > span'
    };

    data.download = document.querySelector(data_selectors.download).textContent;
    data.upload = document.querySelector(data_selectors.upload).textContent;
    data.ping = document.querySelector(data_selectors.ping).textContent;

    return data;
  });

  return result;
};

const do_fast_speedtest = async (page) => {
  console.log('doing speedtest (fast)');
  await page.goto(URLs.fast_speedtest);
  await page.waitFor(1000 * 60);

  // click show other info
  const other_info_selector = '#show-more-details-link';
  await page.click(other_info_selector);
  await page.waitFor(1000 * 60);
  console.log('ended speedtest');

  const result = await page.evaluate(() => {
    const data = {
      time: (new Date().getTime().toString()),
      name: 'fast_speedtest',
      type: 'multiple',
      download: '-1',
      upload: '-1',
      ping: '-1',
      ping_loaded: '-1',
      jitter: '-1'
    };

    const data_selectors = {
      ping: '#latency-value',
      ping_loaded: '#bufferbloat-value',
      download: '#speed-value',
      upload: '#upload-value'
    };

    data.download = document.querySelector(data_selectors.download).textContent;
    data.upload = document.querySelector(data_selectors.upload).textContent;
    data.ping = document.querySelector(data_selectors.ping).textContent;
    data.ping_loaded = document.querySelector(data_selectors.ping_loaded).textContent;

    return data;
  });

  return result;
};

const do_eolo_speedtest = async (page) => {
  console.log('doing speedtest (eolo)');
  await page.goto(URLs.eolo_speedtest);
  await page.waitFor(3000);

  // click go
  const eolo_go_selector = '#main-content > div.button__wrapper > div > button > span';
  await page.click(eolo_go_selector);

  await page.waitFor(1000 * 60);
  console.log('ended speedtest');

  const data = {
    time: (new Date().getTime().toString()),
    name: 'eolo_speedtest',
    type: 'multiple',
    download: '-1',
    upload: '-1',
    ping: '-1',
    ping_loaded: '-1',
    jitter: '-1'
  };

  const data_xpath = {
    ping: '//*[@id="root"]/div/div[2]/div[2]/main/div[2]/div[1]/div[1]/div[2]/div/div/span',
    jitter: '//*[@id="root"]/div/div[2]/div[2]/main/div[2]/div[1]/div[2]/div[2]/div/div/span',
    download: '//*[@id="root"]/div/div[2]/div[2]/main/div[2]/div[2]/div[1]/div[2]/div/div/span',
    upload: '//*[@id="root"]/div/div[2]/div[2]/main/div[2]/div[2]/div[2]/div[2]/div/div/span'
  };


  const ping_span = await page.$x(data_xpath.ping);
  const jitter_span = await page.$x(data_xpath.jitter);
  const download_span = await page.$x(data_xpath.download);
  const upload_span = await page.$x(data_xpath.upload);
  data.ping = await page.evaluate(span => span.textContent, ping_span[0]);
  data.jitter = await page.evaluate(span => span.textContent, jitter_span[0]);
  data.download = await page.evaluate(span => span.textContent.replace(',', '.'), download_span[0]);
  data.upload = await page.evaluate(span => span.textContent.replace(',', '.'), upload_span[0]);

  const result = data;

  return result;
};

const do_google_speedtest = async (page) => {
  console.log('doing speedtest (google)');
  await page.goto(URLs.google_speedtest);
  await page.waitFor(3000);

  // click go
  const google_go_selector = '#knowledge-verticals-internetspeedtest__test_button > div';
  await page.click(google_go_selector);
  await page.waitFor(1000 * 60);
  console.log('ended speedtest');

  const result = await page.evaluate(() => {
    const data = {
      time: (new Date().getTime().toString()),
      name: 'google_speedtest',
      type: 'single',
      download: '-1',
      upload: '-1',
      ping: '-1',
      ping_loaded: '-1',
      jitter: '-1'
    };

    // const data_selectors = {
    //   ping: '#knowledge-verticals-internetspeedtest__latency > span.lAqhed.iTTg8ov22en0-V3w6V6WgxOw',
    //   download: '#knowledge-verticals-internetspeedtest__download > p.spiqle.iTTg8ov22en0-kMKCIXyuNCs',
    //   upload: '#knowledge-verticals-internetspeedtest__upload > p.spiqle.iTTg8ov22en0-Ehhee1Gox1M'
    // };

    const data_selectors = {
      ping: '#knowledge-verticals-internetspeedtest__latency',
      download: '#knowledge-verticals-internetspeedtest__download',
      upload: '#knowledge-verticals-internetspeedtest__upload'
    };

    data.download = parseFloat(document.querySelector(data_selectors.download).textContent);
    data.upload = parseFloat(document.querySelector(data_selectors.upload).textContent);
    data.ping = parseInt(document.querySelector(data_selectors.ping).childNodes[2].textContent);

    return data;
  });

  return result;
};

const do_googlefiber_speedtest = async (page) => {
  console.log('doing speedtest (google fiber)');
  await page.goto(URLs.googlefiber_speedtest);
  await page.waitFor(10000);

  // click go
  const googlefiber_go_selector = '#run-test > img';
  await page.click(googlefiber_go_selector);
  await page.waitFor(1500);
  const google_fiber_continue_selector = '#view39';
  await page.click(google_fiber_continue_selector);
  await page.waitFor(1000 * 60);
  console.log('ended speedtest');

  const result = await page.evaluate(() => {
    const data = {
      time: (new Date().getTime().toString()),
      name: 'googlefiber_speedtest',
      type: 'multiple',
      download: '-1',
      upload: '-1',
      ping: '-1',
      ping_loaded: '-1',
      jitter: '-1'
    };

    const data_selectors = {
      ping: '#view20',
      download: '#view24',
      upload: '#view28'
    };

    data.download = document.querySelector(data_selectors.download).textContent;
    data.upload = document.querySelector(data_selectors.upload).textContent;
    data.ping = document.querySelector(data_selectors.ping).textContent;

    return data;
  });

  return result;
};

// do_speedtest: call the right function to run speedtest and scrape its results
const do_speedtest = async (page, name, type) => {
  if (name === 'ookla_speedtest' && type === 'single') {
    return await do_ookla_speedtest_single(page);
  } else if (name === 'ookla_speedtest' && type === 'multiple') {
    return await do_ookla_speedtest_multiple(page);
  } else if (name === 'fast_speedtest') {
    return await do_fast_speedtest(page);
  } else if (name === 'eolo_speedtest'){
    return await do_eolo_speedtest(page);
  } else if (name === 'google_speedtest') {
    return await do_google_speedtest(page);
  } else {
    return await do_googlefiber_speedtest(page);
  }
};


// load_data: read file
const load_data = () => {
  if (!fs.existsSync('./output/' + config.output_file)) {
    return [];
  } else {
    return JSON.parse(fs.readFileSync('./output/' + config.output_file));
  }
};

// update_data: update a JSON file
const update_data = (res) => {
  const results = load_data();

  results.push(res);

  fs.writeFileSync('./output/' + config.output_file, JSON.stringify(results));
};

// scrape: main scrape function (that call the right speedtest)
const scrape = async (name, type) => {
  const browser = await puppeteer.launch({
    headless: config.headless
  });

  const page = await browser.newPage();

  const result = await do_speedtest(page, name, type);

  await browser.close();

  return result;
};

// functions that scrape and update the JSON results file
const scrape_ookla_multiple = async () => {
  if (debug) console.log('starting browser (ookla multiple)...');
  const res = await scrape('ookla_speedtest', 'multiple');
  //console.log('new res obtained');
  if (debug) console.log(res);

  // write res
  //console.log('writing new result into results.json...');
  update_data(res)
  //console.log('new result wrote');

  if (debug) console.log();
};

const scrape_ookla_single = async () => {
  if (debug) console.log('starting browser (ookla single)...');
  const res = await scrape('ookla_speedtest', 'single');
  //console.log('new res obtained');
  if (debug) console.log(res);

  // write res
  //console.log('writing new result into results.json...');
  update_data(res)
  //console.log('new result wrote');

  if (debug) console.log();
};

const scrape_fast = async () => {
  if (debug) console.log('starting browser (fast)...');
  const res = await scrape('fast_speedtest');
  //console.log('new res obtained');
  if (debug) console.log(res);

  // write res
  //console.log('writing new result into results.json...');
  update_data(res)
  //console.log('new result wrote');

  if (debug) console.log();
};

const scrape_eolo = async () => {
  if (debug) console.log('starting browser (eolo)...');
  const res = await scrape('eolo_speedtest');
  //console.log('new res obtained');
  if (debug) console.log(res);

  // write res
  //console.log('writing new result into results.json...');
  update_data(res)
  //console.log('new result wrote');

  if (debug) console.log();
};

const scrape_google = async () => {
  if (debug) console.log('starting browser (google)...');
  const res = await scrape('google_speedtest');
  //console.log('new res obtained');
  if (debug) console.log(res);

  // write res
  //console.log('writing new result into results.json...');
  update_data(res)
  //console.log('new result wrote');

  if (debug) console.log();
};

const scrape_googlefiber = async () => {
  if (debug) console.log('starting browser (google fiber)...');
  const res = await scrape('googlefiber_speedtest');
  //console.log('new res obtained');
  if (debug) console.log(res);

  // write res
  //console.log('writing new result into results.json...');
  update_data(res)
  //console.log('new result wrote');

  if (debug) console.log();
};


// oneAtTime: run a speedtest at time
const oneAtTime = async () => {
  // ookla multiple
  await scrape_ookla_multiple();
  // ookla single
  await scrape_ookla_single();
  // fast
  await scrape_fast();
  // eolo
  await scrape_eolo();
  // google
  await scrape_google();
  // google fiber
  //await scrape_googlefiber();     // removed due to strange results
};

// allAtSameTime: run all speedtests at same time
const allAtSameTime = () => {
  // ookla multiple
  scrape_ookla_multiple();
  // ookla single
  scrape_ookla_single();
  // fast
  scrape_fast();
  // eolo
  scrape_eolo();
  // google
  scrape_google();
  // google fiber
  //scrape_googlefiber();     // removed due to strange results
};


// go: public function to start the speedtest
const go = async () => {
  // LAUNCH ONE SPEEDTEST AT TIME
  oneAtTime();


  // LAUNCH ALL THE SPEEDTESTS AT THE SAME TIME   // TODO maybe let the user choose the mode
  //allAtSameTime();

  // every 10 minuts
  const intervalId = setInterval(oneAtTime, 1000 * 60 * 10);


  const time = config.time;
  if (time !== 'infinity') {
    setTimeout(() => {
      clearInterval(intervalId);
    }, time * 1000);
  }
};


module.exports = {
  go
};
