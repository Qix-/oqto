var CCS = require('../lib/grammar/oqto-ccs.js');
var fs = require('fs');
var util = require('util');

console.log("\x1b[36;1mReading example CCS...\n\x1b[0m");
fs.readFile('./ccs-grammar-example.ccs', function(err, data) {
	if(err)
	{
		console.error(err);
		return;
	}

	var results = CCS.parse(data.toString()) || [];
	console.log(util.inspect(results, {colors: true}));
});