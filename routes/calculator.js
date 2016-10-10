var express = require('express');
var router = express.Router();
var answer = '';
router.post('/calculator', function (req, res) {
  var operator = req.body.operator;
  switch (operator) {
  case '+':
    answer = parseInt(req.body.first) + parseInt(req.body.second);
    res.sendStatus(200);
    break;
  case '-':
    answer = parseInt(req.body.first) - parseInt(req.body.second);
    res.sendStatus(200);
    break;
  case '*':
    answer = parseInt(req.body.first) * parseInt(req.body.second);
    res.sendStatus(200);
    break;
  case '/':
    if (req.body.second != '0') {
      answer = parseInt(req.body.first) / parseInt(req.body.second);
      res.sendStatus(200);
      break;
    } else {
      res.sendStatus(400);
      break;
    }
}
});

router.get('/calculator', function (req, res) {
  res.send({ answer: answer });
});

module.exports = router;
