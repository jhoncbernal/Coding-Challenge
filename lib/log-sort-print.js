const _ = require("lodash");
const Printer = require("./printer");
module.exports = function sortLogArray(logInformationArray) {
  const printer = new Printer();
  logInformationArray = _.orderBy(logInformationArray, ["date"], ["asc"]);
  logInformationArray.forEach((log) => {
    printer.print(log);
  });
  printer.done();
};
