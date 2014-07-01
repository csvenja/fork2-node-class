module.exports = function Class(props, parent) {
	var new_class = props.initialize || function () {};
	parent = parent || Object;
	new_class.prototype.__proto__ = parent.prototype;

	for (var prop in props) {
		new_class.prototype[prop] = props[prop];
	}

	return new_class;
}
