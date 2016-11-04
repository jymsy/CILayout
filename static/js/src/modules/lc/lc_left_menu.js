var $ = require('jquery');
var util = require('../../public/util');

var minus = function (a, b) {
    return a - b;
};

module.exports = {
    init: function () {
        var $menu = $('.menu_v422');
        $menu.on('click', '.tadk', function () {
            // $(this).addClass('tadk_active').removeClass('tadk');
            console.log(minus(2, 3));
        });
    }
};
