'use strict';

var CTOR_NAME = 'initialize';

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

	// extend
	if (parent) {
		ctor.prototype.__proto__ = parent.prototype;
		// Object.setPrototypeOf(ctor, parent.prototype);
	}
	ctor.__super__ = parent || Object;
	ctor.prototype.__super__ = parent || Object;

	var currentClass = ctor;
	ctor.prototype.super = function (methodName) {
		var args = [].slice.call(arguments, 1);
		currentClass = currentClass.__super__;
		var result = currentClass.prototype[methodName].apply(this, args);
		currentClass = ctor;
		return result;
	};

	return ctor;
}

module.exports = Class;
