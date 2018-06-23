const express = require('express');
const bodyParser = require('body-parser');
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


app.all('/rest/*', function (req, res) {
    proxyServer.web(req, res, { target: config_file.url });
    
});

//Redirecting all other requests to index.html to make angular work from direct url when served from server.
//https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode
app.use('/', function (req, res, next) {
    res.sendFile('abm-frontend5/abm/dist/index.html', {
        root: __dirname
    });
});

module.exports = app.listen(3000,()=>{
    console.log('Example app listening on port 3000!')
});