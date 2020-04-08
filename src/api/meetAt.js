require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/v1/locations', require('./locations/controller'));
app.use('/v1/nearby', require('./nearby/controller'));

if (process.argv.includes('--start')) {
  const port = process.env.PORT || 8081;
  console.log('Starting server on port ' + port);
  app.listen(port);
}

module.exports = app;
