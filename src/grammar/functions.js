/**
 * Functions.js
 *	Functionality for the parser
 */

/****************************************
 * GLOBAL FUNCTIONS
 ***************************************/
var $U = function(tipo) {
	return tipo != 'undefined' && tipo != null;
};

var charCode = function(digits, radix) {
	return String.fromCharCode(
		parseInt(digits, radix));
};

var flatten = function(arr, src) {
	if (typeof src == 'undefined' || src == null)
		src = [];

	for (var i = 0, len = arr.length; i < len; i++) {
		if (Array.isArray(arr[i]))
			flatten(arr[i], src);
		else
			src.push(arr[i]);
	}

	return src;
};

/****************************************
 * OPERATOR FUNCTIONS
 ***************************************/
var operator_not = function(fn) {
	// ![operator]
	//	i.e. a!~=b, a!$=b, etc.
	return function(a, b) {
		return !(fn(a, b));
	};
};

var operator_eq = function(a, b) {
	// =
	return a == b;
};

var operator_contains = function(a, b) {
	// *=
	return a.indexOf(b) != -1;
};

var operator_inlist = function(a, b) {
	// ~=
	return (a.split(/\s+/)).indexOf(b) != -1;
};

var operator_begins = function(a, b) {
	// ^=
	return a.indexOf(b) == 0;
};

var operator_ends = function(a, b) {
	// $=
	// Just for future laughs:
	//	jsperf.com/ends-with-reverse-vs-length-length
	return a.substring(a.length - b.length) == b;
};