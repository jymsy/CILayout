webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var lf = __webpack_require__(1);
	// var css = require('./../../../../css/base.css');

	lf.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2);
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
	            // var util = require('../../public/util');
	            // util.call();
	            // $(this).addClass('tadk_active').removeClass('tadk');
	            // console.log(minus(2, 3));
	            // $.get('http://localhost/index.php/svip/welcome', function (data) {
	            //     console.log(data);
	            // });
	            __webpack_require__.e/* nsure */(1, function (require) {
	                var util = __webpack_require__(3);
	                util.call();
	            });
	        });
	    },
	    clicked: function () {
	        console.log('global click');
	    }

	};


/***/ }
]);