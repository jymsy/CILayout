webpackJsonp([1],{

/***/ 3:
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

/***/ }

});