var $ = require('jquery');
// var util = require('../../public/util');

var minus = function (a, b) {
    return a - b;
};
window.clicked = function () {
    console.log('global click');
    console.log(minus(6, 3));
};
module.exports = {
    init: function () {
        var $menu = $('.menu_v422');
        $menu.on('click', '.tadk', function () {
            var util = require('../../public/util');
            util.call();
            // $(this).addClass('tadk_active').removeClass('tadk');
            // console.log(minus(2, 3));
            // $.get('http://localhost/index.php/svip/welcome', function (data) {
            //     console.log(data);
            // });
            // require.ensure(['../../public/util'], function (require) {
            //     var util = require('../../public/util');
            //     util.call();
            // });
        });
    },
    clicked: function () {
        console.log('global click');
    }

};
