
require('dotenv').config()
const express = require('express');
const app = express();
const axios = require("axios")
const postgresqlConnection = require('./config/postgresql')
const cron = require("node-cron");

const port = process.env.PORT_CONTROL || 8081

app.use('/', require('./routes/routes.js'))

postgresqlConnection.connect()

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);

  cron.schedule('* * * * *',(async ()=>{
        axios.post(`http://localhost:${port}/restartBots`);
  }));

});
