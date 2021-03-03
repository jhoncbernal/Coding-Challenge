"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, sortLogArray) => {
  function getInitalArrayofLogs() {
    return new Promise((resolve) => {
      const logInformationArray = logSources.map((source) => source.popAsync());
      Promise.all(logInformationArray).then((info) => resolve(info));
    });
  }
  return new Promise((resolve, reject) => {
    (async () => {
      const informationArray = await getInitalArrayofLogs();
      sortLogArray(informationArray);
      resolve(console.log("Async sort complete."));
    })();
  });
};
