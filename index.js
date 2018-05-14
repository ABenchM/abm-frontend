var jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
const proxy = require('http-proxy-middleware');
var config_file = require('./abm-config.json');
var jsonParser = bodyParser.json()
const app = express()
app.use(express.static('abm-frontend5/abm/dist'))
//app.use('/rest', proxy({target: 'https://abm.cs.upb.de/', changeOrigin: true}));
app.use('/rest', proxy({
    target: 'http://localhost:8080/',
    changeOrigin: true
}));

app.post('/auth/login', jsonParser, function (req, res) {
    request.post({
            url: 'http://localhost:8080/rest/login',
            header: {
                'Content-type': 'application/json'
            },
            json: req.body,
            jar: true
        },
        function (error, response, body) {
            var payload = {
                'username': req.body['username'],
                'cookie':response.headers['set-cookie']
            }
           var token = jwt.sign(payload,config_file.secret_key)
           res.append('Set-Cookie','Bearer='+token); 
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