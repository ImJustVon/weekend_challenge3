// var operation = {
//   first: '',
//   second: '',
//   operator: '',
// };

var fullList = [];
var num = '';
var operator = '';

//sets the first number
// function setWriteNumber(str) {
//   if (operation.operator === '') {
//     operation.first += str;
//     $('#first').append(str);
//   } else {
//     operation.second += str;
//     $('#second').append(str);
//   }
// };

function writeString(str) {
  $('.operation').append(str);
  num += str;
  operator = '';
}

function setWriteOperator(str) {
  // if (operation.operator != '') {
  //   return;
  // }

  switch (str) {
    case 'add':
      str = '%2B';
    break;
    case 'subtract':
      str = '-';
    break;
    case 'multiply':
      str = '*';
    break;
    case 'divide':
      str = '/';
    break;
    case 'power':
      str = '^';
    break;
    case 'parLeft':
      str = '(';
    break;
    case 'parRight':
      str = ')';
    break;
  }
  fullList.push(num);
  fullList.push(str);
  num = '';
  if (str === '%2B') {
    $('.operation').append('+');
  } else {
    $('.operation').append(str);
  }
};

function postOperation(str) {
  $.ajax({
    type: 'POST',
    url: '/calculator',
    data: 'str=' + str,
    success: getAnswer, });
};

function getAnswer() {
  $.ajax({
    type: 'GET',
    url: '/calculator',
    success: function (obj) {
      console.log(obj);
      $('#answer').append(obj.answer);

    },
  });
};

// function reset() {
//   $('#first').empty();
//   $('#operator').empty();
//   $('#second').empty();
//   $('#answer').empty();
//   operation.first = '';
//   operation.second = '';
//   operation.operator = '';
// }

$(function () {
  $('.rows').on('click', 'button', function () {
    var num = $(this).attr('id');
    console.log(num);
    writeString(num);
    console.log(fullList);
  });

  $('.operators').on('click', 'button', function () {
    var operator = $(this).attr('id');
    console.log(operator);
    setWriteOperator(operator);
  });

  $('#equals').on('click', function () {
    fullList.push(num);
    console.log(fullList);
    var str = fullList.join('');
    console.log(str);
    postOperation(str);
  });

  $('#reset').on('click', reset);
});
