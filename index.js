const express = require('express')
const app = express()
const proxy = require('http-proxy-middleware');
app.use(express.static('abm-frontend5/abm/dist'))
app.use('/rest', proxy({target: 'https://abm.cs.upb.de/', changeOrigin: true}));
app.listen(3000, () => console.log('Example app listening on port 3000!'))  

//Redirecting all other requests to index.html to make angular work from direct url when served from server.
//https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode
app.all('/*', function(req, res, next) {
    res.sendFile('abm-frontend5/abm/dist/index.html', { root: __dirname });
});