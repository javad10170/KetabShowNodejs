module.exports = function(app) {
  var libgen = require("./lib/index");

  app.get("/api/search", function(req, res) {
    const options = {
      mirror: "http://libgen.lc",
      query: "lord of the ring",
      count: 10
    };

    if (req.query.query) {
      options.query = req.query.query;
    }

    libgen.search(options,res, (err, data) => {
      if (err) return console.error(err);

      res.end(data);
    });
  });

  app.get("*", function(req, res) {
	res.end('/api/search?query=lord of the ring');
  });
};
