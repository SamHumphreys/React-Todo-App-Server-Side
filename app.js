const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const allowCORS = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next ();
  };
};

const app = express();
app.use(allowCORS);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Im alive!'
}));

module.exports = app;
