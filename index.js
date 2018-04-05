const express = require('express')
const app = express()
const proxy = require('http-proxy-middleware');
app.use(express.static('de.fraunhofer.abm'))
app.use('/rest', proxy({target: 'http://localhost:8080/', changeOrigin: true}));
app.listen(3000, () => console.log('Example app listening on port 3000!'))  