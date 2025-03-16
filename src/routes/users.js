const express = require('express');
const router = express.Router();

const connectMongoDB = require('../middlewares/Conect-MongoDB');


router.get('/', connectMongoDB, function(req, res, next) {
  res.send('respond with a resource 50 var' + process.env.TEST);
});

module.exports = router;
