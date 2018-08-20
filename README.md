# crontab-info

**This is an example project using a javascript command line interface (CLI) with node.js. I just wanted to figure out, how to work with cli parameters and input streams and here is the result...**

> node.js cli example of parsing crontab

[![Build Status](https://travis-ci.org/dominickolbe/crontab-info.svg?branch=master)](https://travis-ci.org/dominickolbe/crontab-info)

## Install

Install npm dependencies
```
$ yarn
```

make it executable
```
$ chmod +x ./index.js
```

## Run

```
$ ./index.js 16:10 < crontab.example
```

or use npm task

```
$ yarn example
```

## Info
created and tested with:

* macOS High Sierra ```v10.13.5```
* node.js ```v9.8.0```
* npm ```5.6.0```
