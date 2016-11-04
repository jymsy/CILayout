webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var lf = __webpack_require__(1);

	lf.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2);
	var util = __webpack_require__(3);

	var minus = function (a, b) {
	    return a - b;
	};

	module.exports = {
	    init: function () {
	        var $menu = $('.menu_v422');
	        $menu.on('click', '.tadk', function () {
	            // $(this).addClass('tadk_active').removeClass('tadk');
	            console.log(minus(2, 3));
	            $.get('http://localhost/index.php/svip/welcome', function (data) {
	                console.log(data);
	            });
	        });
	    }
	};


/***/ }
]);