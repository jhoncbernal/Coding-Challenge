/**
 * Challenge Number 2!
 *
 * Similar to Challenge Number 1 and 2, except now you should assume that a LogSource
 * has both methods: popAsync() and pop() which is able to consume many sources and evaluate the timestamp between them .
 */
const LogSource = require("./log-source");
const _ = require("lodash");
const Printer = require("./printer");
const logSources = new LogSource();
const arrayOfLogSources = [
  function () {
    return logSources.pop();
  },
  function () {
    return logSources.popAsync();
  },
  function () {
    return logSources.pop();
  },
  function () {
    return logSources.popAsync();
  },
];

function getInitalArrayofLogs() {
  return new Promise((resolve) => {
    const logInformationArray = arrayOfLogSources.map((source) => source());
    Promise.all(logInformationArray).then((info) => resolve(info));
  });
}

async function getData(numOfLogsToRead) {
  const printer = new Printer();
  const informationArray = await getInitalArrayofLogs();
  for (var i = 0; i < numOfLogsToRead; ++i) {
    index = informationArray.indexOf(_.minBy(informationArray, "date"));
    if (index >= 0) {
      printer.print(informationArray[index]);
      delete informationArray[index];
      informationArray[index] = await arrayOfLogSources[index]();
    }
  }
  printer.done();
}
module.exports = { getData, getInitalArrayofLogs };
