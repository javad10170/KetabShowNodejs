

module.exports = function (app) {

	var libgen = {
	  mirror: require('./lib/available_mirrors.js'),
	  latest: require('./lib/latest.js'),
	  random: require('./lib/random.js'),
	  search: require('./lib/search.js'),
	  available_mirrors: require('./lib/available_mirrors.js'),
	  utils: {
		clean: require('./lib/clean.js'),
		check: require('./lib/check.js')
	  }
	}
  
	app.get('/api/search', function (req, res) {
  
	  const options = {
		mirror: 'http://libgen.io',
		query: 'lord of the ring',
		count: 30
	  };
	  libgen.search(options, (err, data) => {
		if (err)
		  return console.error(err);
  
		res.end(JSON.stringify(data));
  
	  });
	})
  
	app.get('*', function (req, res) {
	  res.sendfile('./public/index.html');
	});
  
  };