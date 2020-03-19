const express = require('express');
const app = express();

app.use('/v1/locations', require('./components/locations/controller'));

app.listen(process.env.PORT || 8081);
