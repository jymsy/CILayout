var $ = require('jquery');

var init = function (a, b) {
  return a+b;
};

var minus = function (a, b) {
  return a-b;
};

exports.init = init;
exports.minus = minus;