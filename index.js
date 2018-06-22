var jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
var request = require('request');
const args = process.argv;
if (args[2] == undefined) {
    args[2] = 'env=dev';
}
const env_type = args[2].split("=")[1];
const proxy = require('http-proxy-middleware');
var config_file = require('./abm-config.' + env_type + '.json');
var jsonParser = bodyParser.json();
const app = express();
app.use(cookieParser());
app.use(express.static('abm-frontend5/abm/dist'));

app.post('/rest/auth/login', jsonParser, function (req, res) {
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
            const cookieOpts = {
                maxAge: 1000 * 60 * 30,
                httpOnly: true

            };
            res.cookie('Bearer', token, cookieOpts);
            res.send(payload);
        }

    );
});

var options = {
    target: config_file.url,
    changeOrigin: true,
    onProxyReq: function (proxyReq, req, res) {
        const bearerToken = req.cookies.Bearer;
        //TODO In case multiple cookies are there, JSESSIONID should be searched from the cookie string.
        jwt.verify(bearerToken, config_file.secret_key, function (err, decoded) {
            if (decoded !== undefined && decoded.cookie !== undefined) {
                const keys = decoded.cookie[0].split(';');

                function split(key) {
                    const pair = key.split('=');
                    var map = {};
                    map.key = pair[0];
                    map.value = pair[1];
                    return map;
                }
                const cookies = keys.map(split);
                const cookieOpts = {
                    path: cookies.filter(a => a.key === 'path').map(m => m.value)[0]
                };
                //proxyReq.cookie('JSESSIONID',cookies.filter(a => a.key === 'JSESSIONID').map(m => m.value)[0] , cookieOpts);
                console.log(proxyReq);
            }
            //       console.log(decoded.cookie[0].split("="));
        });

    }
}
app.use('/rest', proxy(options));

//app.use('^(((?!(login|logout)).))*$', proxy(options));



//Redirecting all other requests to index.html to make angular work from direct url when served from server.
//https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode
app.use('/', function (req, res, next) {
    res.sendFile('abm-frontend5/abm/dist/index.html', {
        root: __dirname
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))