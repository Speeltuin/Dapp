var jsonfile = require('jsonfile');
var util = require('util');

var file = '../www/data/data.json';
jsonfile.readFile(file, function(err, obj) {
    console.dir(obj)
});