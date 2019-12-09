var fs = require('fs');

var fileHandler = {
    handleError: function(err, res) {
        res.setHeader('Content-type', 'text/html'); //this line need to be put before the next one, or the interpreter will throw error(annot set headers after they are sent to the client).
        res.writeHead(404);
        res.end('<h1>404 not found!</h1>');
    },
    readFile: function(filePath, res) {
        fs.readFile(filePath, function(err, data) {
            if (err) {
                fileHandler.handleError(err, res);
                return;
            } else {
                res.setHeader('Content-type', 'text/html');
                res.end(data);
            }
        });
    }
};

module.exports = fileHandler;