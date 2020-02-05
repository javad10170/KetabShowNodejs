module.exports = {
  mirror: require("./speed.js").mirror,
  latest: require("./latest.js"),
  random: require("./random.js"),
  search: require("./search.js"),
  utils: {
    clean: require("./clean.js"),
    check: {
      hasField: require("./check.js"),
      canDownload: require("./speed.js").canDownload
    }
  }
};
