var http = require('http');
var extract = require('./extract');
var fh = require('./fileHandler');

var server = http.createServer(function(req, res) {
    console.log('Responding to a request.');
    var filePath = extract(req.url);
    fh.readFile(filePath, res);
});
server.listen(8080);