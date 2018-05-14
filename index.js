var jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
const args = process.argv;
if (args[2] == undefined) {
    args[2] = 'env=dev';
}
const env_type = args[2].split("=")[1];
const proxy = require('http-proxy-middleware');
var config_file = require('./abm-config.'+env_type+'.json');
var jsonParser = bodyParser.json()
const app = express()
app.use(express.static('abm-frontend5/abm/dist'))
var options = {
    target: config_file.url,
    changeOrigin: true,
    onProxyReq: function (proxyReq, req, res) {
        console.log("Proxy");
    }
}
app.use('/rest', proxy(options));

app.post('/auth/login', jsonParser, function (req, res) {
    request.post({
            url: config_file.url + 'rest/login',
            header: {
                'Content-type': 'application/json'
            },
            json: req.body,
            jar: true
        },
        function (error, response, body) {
            var payload = {
                'username': req.body['username'],
                'cookie': response.headers['set-cookie']
            }

            var token = jwt.sign(payload, config_file.secret_key)
            res.status(response.statusCode);
            res.append('Set-Cookie', 'Bearer=' + token);
            res.send(payload);
        }

    );
});



//Redirecting all other requests to index.html to make angular work from direct url when served from server.
//https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode
app.use('/', function (req, res, next) {
    res.sendFile('abm-frontend5/abm/dist/index.html', {
        root: __dirname
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))