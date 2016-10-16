var $ = require('jquery');

var init = function () {
    $('.menu_v422').on('click', '.book_active',function () {
        console.log('click');
    });
};



var minus = function (a, b) {
  return a-b;
};

exports.init = init;
exports.minus = minus;