var operation = {
  first: '',
  second: '',
  operator: '',
};

//sets the first number
function setWriteNumber(str) {
  if (operation.operator === '') {
    operation.first += str;
    $('#first').append(str);
  } else {
    operation.second += str;
    $('#second').append(str);
  }
};

function setWriteOperator(str) {

  //if (operation.operator = '') {
  switch (str) {
    case 'add':
      str = '+';
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
  }
  $('#operator').append(str);
  operation.operator = str;
  console.log(operation.operator);

  //} else {
  //return operation.operator;
  //}
};

function postOperation() {
  $.ajax({
    type: 'POST',
    url: '/calculator',
    data: operation,
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

function reset() {
  $('#first').empty();
  $('#operator').empty();
  $('#second').empty();
  $('#answer').empty();
  operation.first = '';
  operation.second = '';
  operation.operator = '';
}

$(function () {
  $('.rows').on('click', 'button', function () {
    var num = $(this).attr('id');
    console.log(num);
    setWriteNumber(num);
  });

  $('.operators').on('click', 'button', function () {
    var operator = $(this).attr('id');
    console.log(operator);
    setWriteOperator(operator);
  });

  $('#equals').on('click', postOperation);
  $('#reset').on('click', reset);
});
