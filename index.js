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

	for (var key in props) {
		if (key === CTOR_NAME) {
			continue;
		}
		ctor.prototype[key] = props[key];
	}

	if (parent) {
		ctor.prototype.__proto__ = parent.prototype;
	}
	ctor.__super__ = parent || Object;
	ctor.prototype.__super__ = parent || Object;

	ctor.prototype.super = function () {
		var args = [].slice.call(arguments, 1);
		return this.__super__.prototype[arguments[0]].apply(this, args);
	};

	return ctor;
}

module.exports = Class;
