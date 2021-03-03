"use strict";

// Print all entries, across all of the *async and sync* sources, in chronological order.

module.exports = (sourceCount, getData) => {
  return getData(sourceCount);
};
