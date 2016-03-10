var jsonfile = require('jsonfile');
var util = require('util');
var fs = require('fs');

var baseDir = 'www/data/';
var drugsDir = baseDir + 'drugs/';

var listingFile = baseDir + 'index.json';
var listing = {};

var files = fs.readdirSync(drugsDir);

for (var file in files) {
    var obj = jsonfile.readFileSync(drugsDir + files[file]);

    listing[obj.name] = {
        duration: obj.details.duration,
        category: obj.details.category
    };
}

jsonfile.writeFile(listingFile, listing);