"use strict";

const LogSource = require("./lib/log-source");
const { getData } = require("./lib/log-ingestor");
const sortLogArray = require("./lib/log-sort-print");
const _ = require("lodash");
function runSolutions(sourceCount) {
  return new Promise((resolve, reject) => {
    /**
     * Challenge Number 1!
     *
     * Assume that a LogSource only has one method: pop() which will return a LogEntry.
     *
     * A LogEntry is simply an object of the form:
     * {
     * 		date: Date,
     * 		msg: String,
     * }
     *
     * All LogEntries from a given LogSource are guaranteed to be popped in chronological order.
     * Eventually a LogSource will end and return boolean false.
     *
     * Your job is simple: print the sorted merge of all LogEntries across `n` LogSources.
     *
     * Call `printer.print(logEntry)` to print each entry of the merged output as they are ready.
     * This function will ensure that what you print is in fact in chronological order.
     * Call 'printer.done()' at the end to get a few stats on your solution!
     */
    const syncLogSources = [];
    for (let i = 0; i < sourceCount; i++) {
      syncLogSources.push(new LogSource());
    }
    try {
      require("./solution/sync-sorted-merge")(syncLogSources, sortLogArray);
      resolve();
    } catch (e) {
      reject(e);
    }
  }).then(() => {
    return new Promise((resolve, reject) => {
      /**
       * Challenge Number 2!
       *
       * Similar to Challenge Number 1, except now you should assume that a LogSource
       * has only one method: popAsync() which returns a promise that resolves with a LogEntry,
       * or boolean false once the LogSource has ended.
       */
      const asyncLogSources = [];
      for (let i = 0; i < sourceCount; i++) {
        asyncLogSources.push(new LogSource());
      }
      require("./solution/async-sorted-merge")(asyncLogSources, sortLogArray)
        .then(resolve)
        .catch(reject);
    });
  });
}
function runExtraSolutions(sourceCount) {
  return new Promise((resolve, reject) => {
    try {
      require("./solution/async-sync-sorted-merge")(sourceCount, getData);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
// Adjust this input to see how your solutions perform under various loads.
const sourceCount = 20;
runSolutions(sourceCount);
runExtraSolutions(sourceCount);
