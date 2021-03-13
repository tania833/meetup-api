var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/all-events', function(req, res, next) {
  res.send('Got a GET request');
});

router.post('/form-input', function (req, res) {
  res.send('Got a POST request')
});

module.exports = router;
