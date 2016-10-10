var express = require('express');
var router = express.Router();
var answer = '';
var ms = new MathSolver();
router.post('/calculator', function (req, res) {
  console.log(req);
  var reversePolish = ms.infixToPostfix(req.body.str);
  answer = ms.solvePostfix(reversePolish);
  console.log(answer);

  //   var operator = req.body.operator;
  //   switch (operator) {
  //   case '+':
  //     answer = parseInt(req.body.first) + parseInt(req.body.second);
  //     res.sendStatus(200);
  //     break;
  //   case '-':
  //     answer = parseInt(req.body.first) - parseInt(req.body.second);
  //     res.sendStatus(200);
  //     break;
  //   case '*':
  //     answer = parseInt(req.body.first) * parseInt(req.body.second);
  //     res.sendStatus(200);
  //     break;
  //   case '/':
  //     if (req.body.second != '0') {
  //       answer = parseInt(req.body.first) / parseInt(req.body.second);
  //       res.sendStatus(200);
  //       break;
  //     } else {
  //       res.sendStatus(400);
  //       break;
  //     }
  // }
});

router.get('/calculator', function (req, res) {
  res.send({ answer: answer });
});

String.prototype.isNumeric = function () {
    return !isNaN(parseFloat(this)) && isFinite(this);
  };

Array.prototype.clean = function () {
      for (var i = 0; i < this.length; i++) {
        if (this[i] === '') {
          this.splice(i, 1);
        }
      }

      return this;
    };

function MathSolver() {

  this.infixToPostfix = function (infix) {
      var outputQueue = '';
      var operatorStack = [];
      var operators = {
          '^': {
              precedence: 4,
              associativity: 'Right',
            },
          '/': {
              precedence: 3,
              associativity: 'Left',
            },
          '*': {
              precedence: 3,
              associativity: 'Left',
            },
          '+': {
              precedence: 2,
              associativity: 'Left',
            },
          '-': {
              precedence: 2,
              associativity: 'Left',
            },
        };
      console.log(infix);
      infix = infix.replace(/\s+/g, '');
      infix = infix.split(/([\+\-\*\/\^\(\)])/).clean();
      for (var i = 0; i < infix.length; i++) {
        var token = infix[i];
        if (token.isNumeric()) {
          outputQueue += token + ' ';
        } else if ('^*/+-'.indexOf(token) !== -1) {
          var o1 = token;
          var o2 = operatorStack[operatorStack.length - 1];
          while ('^*/+-'.indexOf(o2) !== -1 && ((operators[o1].associativity === 'Left' && operators[o1].precedence <= operators[o2].precedence) || (operators[o1].associativity === 'Right' && operators[o1].precedence < operators[o2].precedence))) {
            outputQueue += operatorStack.pop() + ' ';
            o2 = operatorStack[operatorStack.length - 1];
          }

          operatorStack.push(o1);
        } else if (token === '(') {
          operatorStack.push(token);
        } else if (token === ')') {
          while (operatorStack[operatorStack.length - 1] !== '(') {
            outputQueue += operatorStack.pop() + ' ';
          }

          operatorStack.pop();
        }
      }

      while (operatorStack.length > 0) {
        outputQueue += operatorStack.pop() + ' ';
      }

      console.log(outputQueue);
      return outputQueue;
    };

  this.solvePostfix = function (postfix) {
      var resultStack = [];
      postfix = postfix.split(' ');
      for (var i = 0; i < postfix.length; i++) {
        console.log(resultStack);
        if (postfix[i].isNumeric()) {
          resultStack.push(postfix[i]);
        } else {
          var a = resultStack.pop();
          var b = resultStack.pop();
          if (postfix[i] === '+') {
            resultStack.push(parseFloat(a) + parseFloat(b));
          } else if (postfix[i] === '-') {
            resultStack.push(parseFloat(b) - parseFloat(a));
          } else if (postfix[i] === '*') {
            resultStack.push(parseFloat(a) * parseFloat(b));
          } else if (postfix[i] === '/') {
            resultStack.push(parseFloat(b) / parseFloat(a));
          } else if (postfix[i] === '^') {
            resultStack.push(Math.pow(parseFloat(b), parseFloat(a)));
          }
        }
      }

      if (resultStack.length < 2) {
        console.log(resultStack);
        return resultStack.pop();
      } else {
        return 'error';
      }
    };

}

module.exports = router;
