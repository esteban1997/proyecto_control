
require('dotenv').config()
const express = require('express');
const app = express();
const postgresqlConnection = require('./config/postgresql')

const port = process.env.PORT_CONTROL || 8081

app.use('/', require('./routes/routes.js'))

postgresqlConnection.connect()

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
