'use strict';
const express = require('express');
const path = require('path');
const hbs = require('express-hbs')
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
// the views directory should be the same one copied with webpack
app.set('views', path.join(__dirname, '/.netlify/functions/views'))

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

router.get('/foo', (req, res) => {
  res.render('foo')
})

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
