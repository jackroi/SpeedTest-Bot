[//]: # (Comment)

<!--
<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>
-->

<h3 align="center">Speed Test Bot</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]()
  [![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">
    Bot running speed tests continuously.
    <br>
</p>


## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Configuration](#configuration)
- [Known Issues](#known_issues)
- [Built Using](#built_using)
- [TODO](./TODO.md)
- [Authors](#authors)


## 🧐 About <a name = "about"></a>
Bot that continuosly runs speed test (from various sites), generating a json file containing the results. It plots the results in an interactive graph, too.
<br>
It helps check the internet speed throughout a long period of time.


## 🏁 Getting Started <a name="getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Prerequisites
- [Node.js](https://nodejs.org/) v10.xx.x (probably works with more recent versions, too)
- Npm / [Yarn](https://yarnpkg.com/)
- [Plotly](https://plot.ly/online-chart-maker/) free account (only if you want to get a chart of your speed test results)


### Installing
Clone/Download the repository.

```bash
git clone https://github.com/jackroi/SpeedTest-Bot.git
```

Enter into SpeedTest-Bot folder and install the required packages using `yarn` or `npm`. It can take a few minutes, because puppeteer need to download chromium.

```bash
cd SpeedTest-Bot
yarn install
```

Check whether the installation was successful.

```bash
yarn start -h
```

It sholud output a help text.

## ⚙️ Configuration <a name="configuration"></a>
Rename `config-example.json` to `config.json`, and change the content as you prefer, using your favourite text editor.

```bash
mv config-example.json config.json
```

- `output_file`: name of the output file, where the results will be stored
- `headless`:
  - `true` for activating headless mode (might not work flawlessly, see [known issues](#known_issues) section)
  - `false` for disabling headless mode (works better but can be frustrating if you're using the pc meanwhile)
- `time`:
  - `infinity`: the bot stops only when CTRL-C is pressed
  - how many seconds the bot should run
- `plot.username`: plotly username
- `plot.api_key`: plotly api key
- `plot.generate_image`:
  - `true` if you do want a picture of the chart saved on your pc
  - `false` if you don't want the picture of the chart saved on your pc


## 🎈 Usage <a name="usage"></a>

`yarn start -r | yarn start --run`
<br>
Runs speedtests continuosly, it stops when you press CTRL-C or when the amount of time specified in config.json has elapsed. The results are saved into output folder.

`yarn start -c | yarn start --clean`
<br>
Generates two json files: one will contain the results divided by provider, the other will contain the results divided by type (single or multiple connections). The results are saved into output folder.

`yarn start -p | yarn start --plot`
<br>
Plots the results in a chart viewable online at the given URL or as an image (needs a plotly api key, for more informations read the readme.txt file). The resulting image is saved into output folder.

`yarn start -s | yarn start --show`
<br>
Shows the current settings stored in config.json.


## ❗️ Known Issues <a name="known_issues"></a>

- When headless mode is active, the bot stops at apparently random moments for apparently random periods, and then it normally resumes execution as if nothing had happened. The issues may be caused by different behaviours between headless mode and non headless mode.


## ⛏️ Built Using <a name = "built_using"></a>
- [Node.js](https://nodejs.org/) - Javascript runtime
- [Puppeteer](https://github.com/GoogleChrome/puppeteer) - Headless browser
- [Yargs](http://yargs.js.org/) - Command line arguments parser
- [Plotly](https://plot.ly/online-chart-maker/) - Graphs


## ✍️ Authors <a name = "authors"></a>
- [@jackroi](https://github.com/jackroi) - Idea & work

See also the list of [contributors](https://github.com/jackroi/SpeedTest-Bot/contributors) who participated in this project.
