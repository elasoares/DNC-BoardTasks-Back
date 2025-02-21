const express = require('express');
const router = express.Router();
const conectarBD = require('../middlewares/conectarBD.js');

/* GET users listing. */
router.get('/', conectarBD , function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
