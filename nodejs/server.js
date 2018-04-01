var express = require('express');
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser');

httpProxy.prototype.onError = function(err) {
  console.log(err);
};
var apiProxy = httpProxy.createProxyServer({ changeOrigin: true });

var server = express();
server.set('port', process.env.PORT || 4200);
server.use(express.static(__dirname + '/dist'));

server.all("/api/*", function(req, res) {
  apiProxy.web(req, res, { target: process.env.backend_url, secure: true });
});

server.get('*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.listen(server.get('port'), function() {
  console.log('Express server listening on port ' + server.get('port'));
});
