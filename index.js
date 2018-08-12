const request = require("request");
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const args = process.argv;
if (args[2] == undefined) {
    args[2] = 'env=dev';
}
const env_type = args[2].split("=")[1];
var httpProxy = require('http-proxy');
var proxyServer = httpProxy.createProxyServer();
var config_file = require('./abm-config.' + env_type + '.json');
var jsonParser = bodyParser.json();
const app = express();
app.use(express.static('abm-frontend5/abm/dist'));

app.use('/download/*', function (req, res) {

    var url = config_file.url.slice(0, config_file.url.length - 1);
    var file = request.get(url + req.originalUrl);
    file.pipe(res);
});

app.use('/downloadHermes/*', function (req, res) {
    //res.setHeader("Content-Disposition", "attachment; filename=archive.zip;");
    // proxyServer.web(req, res, {
    //     target: config_file.url
    // });
    var url = config_file.url.slice(0, config_file.url.length - 1);
    var file = request.get(url + req.originalUrl);
    file.pipe(res);

});

app.all('/rest/*', function (req, res) {

    proxyServer.web(req, res, {
        target: config_file.url
    });

});

//Redirecting all other requests to index.html to make angular work from direct url when served from server.
//https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode
app.use('/', function (req, res, next) {

    res.sendFile('abm-frontend5/abm/dist/index.html', {
        root: __dirname
    });
});

proxyServer.on("proxyReq", function (proxyReq, req, res, options) {
    //console.log(res);
})

module.exports = app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});