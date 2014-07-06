'use strict';

var CTOR_NAME = 'initialize';

var extend = function (argument) {
	// body...
}

function Class(props, parent) {
	var ctor = props[CTOR_NAME] || function () {};

	// // strict not allow modify arguments
	// // using arguments will cause 'Possible strict violation'
	// function ctor() {
	// 	if (props.hasOwnProperty(CTOR_NAME)) {
	// 		props[CTOR_NAME].apply(this, arguments);
	// 	}
	// }

	if (parent) {
		ctor.prototype.__proto__ = parent.prototype;
	}
	ctor.__super__ = parent || Object;

	for (var key in props) {
		if (key === CTOR_NAME) {
			continue;
		}
		ctor.prototype[key] = props[key];
	}

	return ctor;
}

module.exports = Class;
