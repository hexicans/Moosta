var express = require('express');
var router = express.Router();

router.get('/chat', function(req, res, next) {
  console.log('wesh ici mon chat');
});

module.exports = router;
