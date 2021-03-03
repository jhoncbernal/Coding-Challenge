"use strict";
const _ = require("lodash");
// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, sortLogArray) => {
  let logInformationArray = logSources.map((source) => source.pop());
  sortLogArray(logInformationArray);
  return console.log("Sync sort complete.");
};
