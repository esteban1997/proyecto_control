const express = require('express');
const router = express.Router()

const {restartBots} = require('../controllers/web.js')

router.use('/restartBots', restartBots)

router.get('/', (req, res) => {
    res.send('Hello from App Engine!');
  });

module.exports = router