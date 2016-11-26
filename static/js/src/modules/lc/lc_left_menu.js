var util = require('../../public/util');
var $ = require('jquery');

var minus = function (a, b) {
    return a - b;
};

module.exports = {
    init: function () {
        var $menu = lib.$('.menu_v422');
        $menu.on('click', '.tadk', function () {
            // $(this).addClass('tadk_active').removeClass('tadk');
            util.call();
            console.log(minus(2, 3));
            util.call();

        });
    }
};
