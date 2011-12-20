/**
 * Classy.js - Small and simple Javascript class creator
 *
 * @author tdroL
 * @page https://github.com/tdroL/classy.js
 */

window.Classy = window.Classy || function(methods)
{
	var parents = [Object],
		obj = methods,
		init, currentProto, undefined, prototype;

	if (arguments.length > 1) {
		if (arguments.length === 2) {
			// allow Classy([Parent1, Parent2], {...});
			parents = parents.concat((arguments[0] instanceof Array) ? arguments[0] : [arguments[0]]);
			obj = arguments[1];
		} else {
			// allow Classy(Parent1, Parent2, {...});
			parents = parents.concat([].splice.call(arguments, 0));
			obj = parents.pop();
		}
	}

	// Create a new class
	var classy = function() {
		// run initializer
		if (typeof this.init == 'function')
			this.init.apply(this, arguments);
	};

	for (var i in parents) {
		// Save current methods
		currentProto = classy.prototype;
		classy.fn = classy.prototype = Object.create(parents[i].prototype);

		// Restore unchanged methods
		for (var j in currentProto) {
			if (classy.fn[j] === undefined) {
				classy.fn[j] = currentProto[j];
			}
		}
	}

	// classy.fn is just an alias
	classy.fn = classy.prototype;

	// Overwrite the class stucture with provided base object
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			classy.fn[i] = obj[i];
		}
	}

	// Assign all proxy methods to the class
	for (var i in classy.fn) {
		if (classy.fn.hasOwnProperty(i) && typeof classy.fn[i] === 'function') {
			classy[i] = (function(fn) {
				return function(context) {
					return function() {
						return fn.apply(context, arguments);
					};
				};
			})(classy.fn[i]);
		}
	}

	// Custom instanceOf method, supporting multiple inheritance
	classy.instanceOf = classy.fn.instanceOf = function(Class) {
		if (this instanceof Class || classy === Class)
			return true;

		for (var i in parents) {
			if (parents[i] === Class)
				return true;

			if (parents[i].instanceOf !== undefined && parents[i].instanceOf(Class))
				return true;
		}

		return false;
	};

	classy.parentOf = function(obj) {
		if (obj instanceof classy || obj === classy)
			return true;

		return obj.instanceOf(classy);
	};

	classy.fn.constructor = classy;
	return classy;
};
