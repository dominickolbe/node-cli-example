#!/usr/bin/env node

// dependencies
const dayjs = require('dayjs');
const readline = require('readline');

// create node readline interface to handle input stream
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// regex to test if the time is in the valid format
const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

// get input time
const inputTimeString = process.argv[2] || null;

// create dayjs object from input time - HH:mm
function parseTimeString(timeString) {
  return dayjs()
    .set('h', timeString.split(':')[0])
    .set('m', timeString.split(':')[1]);
}

// create dayjs object from crontab time - * 10
function parseCronTime(hour, minute, referenzTime) {
  let time = dayjs();

  function nextTick(value) {
    return value === '*';
  }

  // set time based on crontab value
  time = nextTick(hour) ? time.set('h', referenzTime.hour()) : time.set('h', hour);
  time = nextTick(minute) ? time.set('m', referenzTime.minute()) : time.set('m', minute);

  return time;
}

// checks if single line in crontab is valid
function isValidCronLine(lineParams) {
  // TODO: check single paramter to be true
  // eg if number or *
  return lineParams.length === 3;
}

function main() {

  // check if time parameter is valid
  if (!inputTimeString || !timeRegex.test(inputTimeString)) {
    console.log('Error: invalid time parameter');
    return false;
  }

  const referenceTime = parseTimeString(inputTimeString);

  // loop over lines in crontab file
  rl.on('line', function(line) {
    const lineParams = line.split(' ');

    if (!isValidCronLine(lineParams)) {
      // output empty line if crontab is invalid
      console.log();
    } else {
      const time = parseCronTime(lineParams[1], lineParams[0], referenceTime);
      console.log(
        `${time.format('HH:mm')}`,
        referenceTime.isBefore(time) ? 'today' : 'tomorrow',
        '-',
        lineParams[2]
      );
    }
  });

  return true;
}

// entry point
main();
