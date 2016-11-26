webpackJsonp([2,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var lc = __webpack_require__(4);


	lc.init();

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	module.exports = {
	    inited: false,
	    call: function (param) {
	        if (!this.inited) {
	            console.log('call');
	            this.inited = true;
	        } else {
	            console.log('inited');
	        }

	    }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(3);
	var $ = __webpack_require__(2);

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


/***/ }
]);