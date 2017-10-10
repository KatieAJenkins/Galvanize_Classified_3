'use strict';

const express = require('express');
const app = express();
const path = require('path');

const env = require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname, '/./', 'node_modules')));

const classifieds = require('./routes/classifieds');

app.use('/api/classifieds',classifieds);

app.use('*', function(req, res, next) {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
