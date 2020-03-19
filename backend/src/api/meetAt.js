const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/v1/locations', require('./components/locations/controller'));

app.listen(process.env.PORT || 8081);
