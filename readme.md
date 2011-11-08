# Classy.js
Small and simple Javascript class creator, supporting multiple inheritance.

## Supported browsers (i.e. tested in)
* Firefox 7
* Chrome 15
* Opera 11.52 / Opera Mobile 9.80
* Android 2.3 browser (probably Safari 4.0)
* Internet Explorer 9

## Unit tests
Pull submodules (`git submodule update --init`) and open `tests/index.html` in your favorite browser.

## Usage

### 1. Create simple class:

	Test = Classy({
		a: null
	});

	obj1 = new Test();
	obj1.a = 1;

	obj2 = new Test();
	obj2.a = 2;

	// obj1.a == 1
	// obj2.a == 2

### 2. Create class with initializer (constructor):

	Test = Classy({
		a: null,
		init: function(a) {
			this.a = a;
		}
	});

	obj1 = new Test(1);
	obj2 = new Test(2);

	// obj1.a == 1
	// obj2.a == 2

### 3. Create class with inheritance (class ExtendedTest extends Test)

	Test = Classy({
		a: null,
		init: function(a) {
			this.a = a;
		}
	});

	ExtendedTest = Classy(Test, {
		b: null,
		init: function(a, b) {
			this.a = a;
			this.b = b;
		}
	});

	obj = new ExtendedTest(1, 2);

	// obj1.a == 1
	// obj2.a == 2

### 4. Check inheritance:

	obj = new ExtendedTest(1, 2);

	// obj instanceof Test == true
	// obj.instanceOf(Test) == true
	// Test.parentOf(obj) == true
	// Test.parentOf(Test) == true
	// Test.parentOf(ExtendedTest) == true

	// obj instanceof ExtendedTest == true
	// obj.instanceOf(ExtendedTest) == true
	// ExtendedTest.parentOf(obj) == true

**Note:** `instanceof` doesn't work for multiple inheritance (is unreliable), instead use `object.instanceOf(Class)` or `Class.parentOf(object)`

### 5. Create class with multiple inheritance:

	Base1 = Classy({
		a: 1,
		m: function() {
			return this.a;
		}
	});

	Base2 = Classy({
		b: 2,
		m: function() {
			return this.b;
		}
	});

	Test = Classy(Base1, Base2, {});
	// or
	Test = Classy([Base1, Base2], {});

	obj = new Test();

	// obj.m() == 2

### 6. Check multiple inheritance:

	Base1 = Classy({});

	Base2 = Classy({});

	Test = Classy(Base1, Base2, {});

	obj = new Test();

	// obj.instanceOf(Test) == true
	// obj.instanceOf(Base1) == true
	// obj.instanceOf(Base2) == true

	// Base1.parentOf(obj) == true
	// Base2.parentOf(obj) == true
	// Test.parentOf(obj) == true

	// Base1.parentOf(Test) == true
	// Base2.parentOf(Test) == true

	// obj instanceof Test == true
	// obj instanceof Base2 == true
	// obj instanceof Base1 == false, read note in example 4.

### 7. Access overloaded method:

	Base1 = Classy({
		a: 1,
		m: function() {
			return this.a;
		}
	});

	Base2 = Classy({
		b: 2,
		m: function() {
			return Base1.m(this)();
		}
	});

	Test = Classy(Base1, Base2, {});

	obj = new Test();

	// obj.m() == 1
	// Base1.m(obj)() == 1

* `Base1.m(this)(arg1, arg2)` is equivalent for `Base1.fn.m.call(this, arg1, arg2)`
* `Base1.fn`  is equivalent for `Base1.prototype` (jQuery style)

## Inspired by
* [John Resig's Simple Class](http://ejohn.org/blog/simple-javascript-inheritance/)
