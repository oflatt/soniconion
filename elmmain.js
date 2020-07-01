(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (!x.$)
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		(key !== 'value' || key !== 'checked' || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		value
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		value
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			var oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			var newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}



// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.download)
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// VIRTUAL-DOM WIDGETS


var _Markdown_toHtml = F3(function(options, factList, rawMarkdown)
{
	return _VirtualDom_custom(
		factList,
		{
			a: options,
			b: rawMarkdown
		},
		_Markdown_render,
		_Markdown_diff
	);
});



// WIDGET IMPLEMENTATION


function _Markdown_render(model)
{
	return A2(_Markdown_replace, model, _VirtualDom_doc.createElement('div'));
}


function _Markdown_diff(x, y)
{
	return x.b === y.b && x.a === y.a
		? false
		: _Markdown_replace(y);
}


var _Markdown_replace = F2(function(model, div)
{
	div.innerHTML = _Markdown_marked(model.b, _Markdown_formatOptions(model.a));
	return div;
});



// ACTUAL MARKDOWN PARSER


var _Markdown_marked = function() {
	// catch the `marked` object regardless of the outer environment.
	// (ex. a CommonJS module compatible environment.)
	// note that this depends on marked's implementation of environment detection.
	var module = {};
	var exports = module.exports = {};

	/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 * commit cd2f6f5b7091154c5526e79b5f3bfb4d15995a51
	 */
	(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&(cap[1]==="pre"||cap[1]==="script"||cap[1]==="style"),text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^_\_([\s\S]+?)_\_(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|_\_)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^_\_(?=\S)([\s\S]*?\S)_\_(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0||prot.indexOf("vbscript:")===0||prot.indexOf("data:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};Renderer.prototype.text=function(text){return text};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());

	return module.exports;
}();


// FORMAT OPTIONS FOR MARKED IMPLEMENTATION

function _Markdown_formatOptions(options)
{
	function toHighlight(code, lang)
	{
		if (!lang && $elm$core$Maybe$isJust(options.defaultHighlighting))
		{
			lang = options.defaultHighlighting.a;
		}

		if (typeof hljs !== 'undefined' && lang && hljs.listLanguages().indexOf(lang) >= 0)
		{
			return hljs.highlight(lang, code, true).value;
		}

		return code;
	}

	var gfm = options.githubFlavored.a;

	return {
		highlight: toHighlight,
		gfm: gfm,
		tables: gfm && gfm.tables,
		breaks: gfm && gfm.breaks,
		sanitize: options.sanitize,
		smartypants: options.smartypants
	};
}
var $author$project$Model$LinkClicked = function (a) {
	return {$: 'LinkClicked', a: a};
};
var $author$project$Model$UrlChanged = function (a) {
	return {$: 'UrlChanged', a: a};
};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$application = _Browser_application;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Model$Model = function (currentPage) {
	return function (fps) {
		return function (isRunning) {
			return function (highlightedButton) {
				return function (urlkey) {
					return function (url) {
						return function (indexurl) {
							return function (windowWidth) {
								return function (windowHeight) {
									return function (program) {
										return function (mouseState) {
											return function (errorBoxMaybe) {
												return function (idCounter) {
													return {currentPage: currentPage, errorBoxMaybe: errorBoxMaybe, fps: fps, highlightedButton: highlightedButton, idCounter: idCounter, indexurl: indexurl, isRunning: isRunning, mouseState: mouseState, program: program, url: url, urlkey: urlkey, windowHeight: windowHeight, windowWidth: windowWidth};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Model$MouseState = F5(
	function (mouseX, mouseY, scrollX, scrollY, mouseSelection) {
		return {mouseSelection: mouseSelection, mouseX: mouseX, mouseY: mouseY, scrollX: scrollX, scrollY: scrollY};
	});
var $author$project$Model$NoneSelected = {$: 'NoneSelected'};
var $author$project$Model$emptyMouseState = A5($author$project$Model$MouseState, 0, 0, 0, 0, $author$project$Model$NoneSelected);
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 'Nothing') {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 'Nothing') {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.protocol;
		if (_v0.$ === 'Http') {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.fragment,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.query,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.port_,
					_Utils_ap(http, url.host)),
				url.path)));
};
var $author$project$Model$getindexurl = function (url) {
	var str = $elm$url$Url$toString(url);
	return A3(
		$elm$core$String$slice,
		0,
		$elm$core$String$length(str) - $elm$core$String$length(url.path),
		str);
};
var $author$project$Model$Function = F4(
	function (name, id, args, calls) {
		return {args: args, calls: calls, id: id, name: name};
	});
var $author$project$Model$constructFunction = F3(
	function (id, name, calls) {
		return A4($author$project$Model$Function, name, id, _List_Nil, calls);
	});
var $author$project$Model$makeFunc = F3(
	function (id, calls, name) {
		return A3($author$project$Model$constructFunction, id, name, calls);
	});
var $author$project$Model$makeMain = F2(
	function (id, calls) {
		return A3($author$project$Model$makeFunc, id, calls, 'main');
	});
var $author$project$Model$initialProgram = _List_fromArray(
	[
		A2($author$project$Model$makeMain, 0, _List_Nil)
	]);
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$Model$docpages = _List_fromArray(
	['Tutorial']);
var $author$project$Model$pageNames = _Utils_ap(
	_List_fromArray(
		['Home', 'Unused']),
	$author$project$Model$docpages);
var $author$project$Model$urlToPageName = function (url) {
	if ($elm$core$String$length(url.path) > 1) {
		var potentialName = A3(
			$elm$core$String$slice,
			1,
			$elm$core$String$length(url.path),
			url.path);
		return A2($elm$core$List$member, potentialName, $author$project$Model$pageNames) ? potentialName : 'Home';
	} else {
		return 'Home';
	}
};
var $author$project$Model$initialModel = F3(
	function (flags, url, key) {
		return $author$project$Model$Model(
			$author$project$Model$urlToPageName(url))(0)(false)('none')(key)(url)(
			$author$project$Model$getindexurl(url))(flags.innerWindowWidth)(flags.innerWindowHeight)($author$project$Model$initialProgram)($author$project$Model$emptyMouseState)($elm$core$Maybe$Nothing)(1);
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Model$initialCommand = F3(
	function (flags, url, key) {
		return _Utils_Tuple2(
			A3($author$project$Model$initialModel, flags, url, key),
			$elm$core$Platform$Cmd$none);
	});
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$Model$KeyboardInput = function (a) {
	return {$: 'KeyboardInput', a: a};
};
var $author$project$Model$MouseMoved = function (a) {
	return {$: 'MouseMoved', a: a};
};
var $author$project$Model$MouseRelease = {$: 'MouseRelease'};
var $author$project$Model$WindowResize = F2(
	function (a, b) {
		return {$: 'WindowResize', a: a, b: b};
	});
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $Gizra$elm_keyboard_event$Keyboard$Event$KeyboardEvent = F7(
	function (altKey, ctrlKey, key, keyCode, metaKey, repeat, shiftKey) {
		return {altKey: altKey, ctrlKey: ctrlKey, key: key, keyCode: keyCode, metaKey: metaKey, repeat: repeat, shiftKey: shiftKey};
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$maybe = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder),
				$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
			]));
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $Gizra$elm_keyboard_event$Keyboard$Event$decodeKey = $elm$json$Json$Decode$maybe(
	A2(
		$elm$json$Json$Decode$andThen,
		function (key) {
			return $elm$core$String$isEmpty(key) ? $elm$json$Json$Decode$fail('empty key') : $elm$json$Json$Decode$succeed(key);
		},
		A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string)));
var $Gizra$elm_keyboard_event$Keyboard$Event$decodeNonZero = A2(
	$elm$json$Json$Decode$andThen,
	function (code) {
		return (!code) ? $elm$json$Json$Decode$fail('code was zero') : $elm$json$Json$Decode$succeed(code);
	},
	$elm$json$Json$Decode$int);
var $Gizra$elm_keyboard_event$Keyboard$Event$decodeKeyCode = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2($elm$json$Json$Decode$field, 'keyCode', $Gizra$elm_keyboard_event$Keyboard$Event$decodeNonZero),
			A2($elm$json$Json$Decode$field, 'which', $Gizra$elm_keyboard_event$Keyboard$Event$decodeNonZero),
			A2($elm$json$Json$Decode$field, 'charCode', $Gizra$elm_keyboard_event$Keyboard$Event$decodeNonZero),
			$elm$json$Json$Decode$succeed(0)
		]));
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$A = {$: 'A'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Add = {$: 'Add'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Alt = {$: 'Alt'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Ambiguous = function (a) {
	return {$: 'Ambiguous', a: a};
};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$B = {$: 'B'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Backspace = {$: 'Backspace'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$C = {$: 'C'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$CapsLock = {$: 'CapsLock'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$ChromeSearch = {$: 'ChromeSearch'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Command = {$: 'Command'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Ctrl = function (a) {
	return {$: 'Ctrl', a: a};
};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$D = {$: 'D'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Decimal = {$: 'Decimal'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Delete = {$: 'Delete'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Divide = {$: 'Divide'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Down = {$: 'Down'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$E = {$: 'E'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Eight = {$: 'Eight'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$End = {$: 'End'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Enter = {$: 'Enter'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Escape = {$: 'Escape'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F = {$: 'F'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F1 = {$: 'F1'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F10 = {$: 'F10'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F11 = {$: 'F11'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F12 = {$: 'F12'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F2 = {$: 'F2'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F3 = {$: 'F3'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F4 = {$: 'F4'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F5 = {$: 'F5'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F6 = {$: 'F6'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F7 = {$: 'F7'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F8 = {$: 'F8'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F9 = {$: 'F9'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Five = {$: 'Five'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Four = {$: 'Four'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$G = {$: 'G'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$H = {$: 'H'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Home = {$: 'Home'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$I = {$: 'I'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Insert = {$: 'Insert'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$J = {$: 'J'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$K = {$: 'K'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$L = {$: 'L'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Left = {$: 'Left'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$M = {$: 'M'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Multiply = {$: 'Multiply'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$N = {$: 'N'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Nine = {$: 'Nine'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumLock = {$: 'NumLock'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadEight = {$: 'NumpadEight'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadFive = {$: 'NumpadFive'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadFour = {$: 'NumpadFour'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadNine = {$: 'NumpadNine'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadOne = {$: 'NumpadOne'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadSeven = {$: 'NumpadSeven'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadSix = {$: 'NumpadSix'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadThree = {$: 'NumpadThree'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadTwo = {$: 'NumpadTwo'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadZero = {$: 'NumpadZero'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$O = {$: 'O'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$One = {$: 'One'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$P = {$: 'P'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$PageDown = {$: 'PageDown'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$PageUp = {$: 'PageUp'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$PauseBreak = {$: 'PauseBreak'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$PrintScreen = {$: 'PrintScreen'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Q = {$: 'Q'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$R = {$: 'R'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Right = {$: 'Right'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$S = {$: 'S'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$ScrollLock = {$: 'ScrollLock'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Seven = {$: 'Seven'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Shift = function (a) {
	return {$: 'Shift', a: a};
};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Six = {$: 'Six'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Spacebar = {$: 'Spacebar'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Subtract = {$: 'Subtract'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$T = {$: 'T'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Tab = {$: 'Tab'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Three = {$: 'Three'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Two = {$: 'Two'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$U = {$: 'U'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Unknown = function (a) {
	return {$: 'Unknown', a: a};
};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Up = {$: 'Up'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$V = {$: 'V'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$W = {$: 'W'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Windows = {$: 'Windows'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$X = {$: 'X'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Y = {$: 'Y'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Z = {$: 'Z'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Zero = {$: 'Zero'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$fromCode = function (keyCode) {
	switch (keyCode) {
		case 8:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Backspace;
		case 9:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Tab;
		case 13:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Enter;
		case 16:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Shift($elm$core$Maybe$Nothing);
		case 17:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Ctrl($elm$core$Maybe$Nothing);
		case 18:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Alt;
		case 19:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$PauseBreak;
		case 20:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$CapsLock;
		case 27:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Escape;
		case 32:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Spacebar;
		case 33:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$PageUp;
		case 34:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$PageDown;
		case 35:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$End;
		case 36:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Home;
		case 37:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Left;
		case 38:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Up;
		case 39:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Right;
		case 40:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Down;
		case 44:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$PrintScreen;
		case 45:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Insert;
		case 46:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Delete;
		case 48:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Zero;
		case 49:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$One;
		case 50:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Two;
		case 51:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Three;
		case 52:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Four;
		case 53:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Five;
		case 54:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Six;
		case 55:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Seven;
		case 56:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Eight;
		case 57:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Nine;
		case 65:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$A;
		case 66:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$B;
		case 67:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$C;
		case 68:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$D;
		case 69:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$E;
		case 70:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F;
		case 71:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$G;
		case 72:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$H;
		case 73:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$I;
		case 74:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$J;
		case 75:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$K;
		case 76:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$L;
		case 77:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$M;
		case 78:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$N;
		case 79:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$O;
		case 80:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$P;
		case 81:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Q;
		case 82:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$R;
		case 83:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$S;
		case 84:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$T;
		case 85:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$U;
		case 86:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$V;
		case 87:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$W;
		case 88:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$X;
		case 89:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Y;
		case 90:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Z;
		case 91:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Ambiguous(
				_List_fromArray(
					[$SwiftsNamesake$proper_keyboard$Keyboard$Key$Windows, $SwiftsNamesake$proper_keyboard$Keyboard$Key$Command, $SwiftsNamesake$proper_keyboard$Keyboard$Key$ChromeSearch]));
		case 96:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadZero;
		case 97:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadOne;
		case 98:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadTwo;
		case 99:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadThree;
		case 100:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadFour;
		case 101:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadFive;
		case 102:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadSix;
		case 103:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadSeven;
		case 104:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadEight;
		case 105:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadNine;
		case 106:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Multiply;
		case 107:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Add;
		case 109:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Subtract;
		case 110:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Decimal;
		case 111:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Divide;
		case 112:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F1;
		case 113:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F2;
		case 114:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F3;
		case 115:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F4;
		case 116:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F5;
		case 117:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F6;
		case 118:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F7;
		case 119:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F8;
		case 120:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F9;
		case 121:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F10;
		case 122:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F11;
		case 123:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F12;
		case 144:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumLock;
		case 145:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$ScrollLock;
		default:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Unknown(keyCode);
	}
};
var $elm$json$Json$Decode$map7 = _Json_map7;
var $Gizra$elm_keyboard_event$Keyboard$Event$decodeKeyboardEvent = A8(
	$elm$json$Json$Decode$map7,
	$Gizra$elm_keyboard_event$Keyboard$Event$KeyboardEvent,
	A2($elm$json$Json$Decode$field, 'altKey', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'ctrlKey', $elm$json$Json$Decode$bool),
	$Gizra$elm_keyboard_event$Keyboard$Event$decodeKey,
	A2($elm$json$Json$Decode$map, $SwiftsNamesake$proper_keyboard$Keyboard$Key$fromCode, $Gizra$elm_keyboard_event$Keyboard$Event$decodeKeyCode),
	A2($elm$json$Json$Decode$field, 'metaKey', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'repeat', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'shiftKey', $elm$json$Json$Decode$bool));
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$Update$fpsChange = _Platform_incomingPort('fpsChange', $elm$json$Json$Decode$value);
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $author$project$Model$FpsChange = function (a) {
	return {$: 'FpsChange', a: a};
};
var $author$project$Model$NoOp = {$: 'NoOp'};
var $author$project$Model$handelFpsResult = function (res) {
	if (res.$ === 'Ok') {
		var num = res.a;
		return $author$project$Model$FpsChange(num);
	} else {
		var err = res.a;
		return $author$project$Model$NoOp;
	}
};
var $author$project$Model$fpsChangeDecoder = A2(
	$elm$core$Basics$composeR,
	$elm$json$Json$Decode$decodeValue(
		A2($elm$json$Json$Decode$field, 'fps', $elm$json$Json$Decode$int)),
	$author$project$Model$handelFpsResult);
var $author$project$Model$MousePos = F2(
	function (x, y) {
		return {x: x, y: y};
	});
var $author$project$Model$mouseDecoder = A3(
	$elm$json$Json$Decode$map2,
	$author$project$Model$MousePos,
	A2($elm$json$Json$Decode$field, 'clientX', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'clientY', $elm$json$Json$Decode$int));
var $elm$browser$Browser$Events$Document = {$: 'Document'};
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.key;
		var event = _v0.event;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keydown');
var $elm$browser$Browser$Events$onMouseMove = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'mousemove');
var $elm$browser$Browser$Events$onMouseUp = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'mouseup');
var $elm$browser$Browser$Events$Window = {$: 'Window'};
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		$elm$browser$Browser$Events$Window,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $author$project$Update$runningChange = _Platform_incomingPort('runningChange', $elm$json$Json$Decode$value);
var $author$project$Model$RunningChange = function (a) {
	return {$: 'RunningChange', a: a};
};
var $author$project$Model$handelRunningResult = function (res) {
	if (res.$ === 'Ok') {
		var num = res.a;
		return $author$project$Model$RunningChange(num);
	} else {
		var err = res.a;
		return $author$project$Model$NoOp;
	}
};
var $author$project$Model$runningChangeDecoder = A2(
	$elm$core$Basics$composeR,
	$elm$json$Json$Decode$decodeValue(
		A2($elm$json$Json$Decode$field, 'running', $elm$json$Json$Decode$bool)),
	$author$project$Model$handelRunningResult);
var $author$project$Update$scrollChange = _Platform_incomingPort('scrollChange', $elm$json$Json$Decode$value);
var $author$project$Model$Pos = F2(
	function (xpos, ypos) {
		return {xpos: xpos, ypos: ypos};
	});
var $author$project$Model$ScrollChange = function (a) {
	return {$: 'ScrollChange', a: a};
};
var $author$project$Model$handelScrollResult = function (scrollRes) {
	if (scrollRes.$ === 'Ok') {
		var res = scrollRes.a;
		return $author$project$Model$ScrollChange(res);
	} else {
		var err = scrollRes.a;
		return $author$project$Model$NoOp;
	}
};
var $author$project$Model$scrollChangeDecoder = A2(
	$elm$core$Basics$composeR,
	$elm$json$Json$Decode$decodeValue(
		A3(
			$elm$json$Json$Decode$map2,
			$author$project$Model$Pos,
			A2($elm$json$Json$Decode$field, 'xpos', $elm$json$Json$Decode$int),
			A2($elm$json$Json$Decode$field, 'ypos', $elm$json$Json$Decode$int))),
	$author$project$Model$handelScrollResult);
var $author$project$Main$subscriptions = function (model) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$elm$browser$Browser$Events$onResize($author$project$Model$WindowResize),
				$elm$browser$Browser$Events$onMouseMove(
				A2($elm$json$Json$Decode$map, $author$project$Model$MouseMoved, $author$project$Model$mouseDecoder)),
				$elm$browser$Browser$Events$onMouseUp(
				$elm$json$Json$Decode$succeed($author$project$Model$MouseRelease)),
				$elm$browser$Browser$Events$onKeyDown(
				A2($elm$json$Json$Decode$map, $author$project$Model$KeyboardInput, $Gizra$elm_keyboard_event$Keyboard$Event$decodeKeyboardEvent)),
				$author$project$Update$scrollChange($author$project$Model$scrollChangeDecoder),
				$author$project$Update$fpsChange($author$project$Model$fpsChangeDecoder),
				$author$project$Update$runningChange($author$project$Model$runningChangeDecoder)
			]));
};
var $author$project$Model$BlockSelected = F3(
	function (a, b, c) {
		return {$: 'BlockSelected', a: a, b: b, c: c};
	});
var $author$project$ModelHelpers$removeCallsR = F2(
	function (calls, id) {
		if (!calls.b) {
			return _List_Nil;
		} else {
			var call = calls.a;
			var rest = calls.b;
			return _Utils_eq(call.id, id) ? rest : A2(
				$elm$core$List$cons,
				call,
				A2($author$project$ModelHelpers$removeCallsR, rest, id));
		}
	});
var $author$project$ModelHelpers$removeCallUnsafe = F2(
	function (func, id) {
		return _Utils_update(
			func,
			{
				calls: A2($author$project$ModelHelpers$removeCallsR, func.calls, id)
			});
	});
var $author$project$BuiltIn$BuiltInSpec = F3(
	function (functionName, argList, compileExprFunction) {
		return {argList: argList, compileExprFunction: compileExprFunction, functionName: functionName};
	});
var $author$project$Compiler$CompModel$CompileExprFunction = function (a) {
	return {$: 'CompileExprFunction', a: a};
};
var $author$project$BuiltIn$Finite = function (a) {
	return {$: 'Finite', a: a};
};
var $author$project$BuiltIn$Infinite = F2(
	function (a, b) {
		return {$: 'Infinite', a: a, b: b};
	});
var $author$project$Compiler$CompModel$CallFunction = F2(
	function (a, b) {
		return {$: 'CallFunction', a: a, b: b};
	});
var $author$project$Compiler$CompModel$Lit = function (a) {
	return {$: 'Lit', a: a};
};
var $author$project$Compiler$Song$append = F2(
	function (song1, song2) {
		return A2(
			$author$project$Compiler$CompModel$CallFunction,
			$author$project$Compiler$CompModel$Lit('append'),
			_List_fromArray(
				[song1, song2]));
	});
var $author$project$Compiler$CompModel$ConstV = function (a) {
	return {$: 'ConstV', a: a};
};
var $author$project$Compiler$CompModel$argName = function (index) {
	return 'arg' + $elm$core$String$fromInt(index);
};
var $author$project$Compiler$CompileFunction$getCacheValue = function (ast) {
	return A2(
		$author$project$Compiler$CompModel$CallFunction,
		$author$project$Compiler$CompModel$Lit('getValueAt'),
		_List_fromArray(
			[
				$author$project$Compiler$CompModel$Lit('cache'),
				ast
			]));
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$Compiler$CompModel$litFloat = function (_float) {
	return $author$project$Compiler$CompModel$Lit(
		$elm$core$String$fromFloat(_float));
};
var $author$project$Compiler$CompModel$litInt = function (_int) {
	return $author$project$Compiler$CompModel$Lit(
		$elm$core$String$fromInt(_int));
};
var $author$project$Compiler$Song$makeLit = function (literal) {
	return A2(
		$author$project$Compiler$CompModel$CallFunction,
		$author$project$Compiler$CompModel$Lit('noteSong'),
		_List_fromArray(
			[
				$author$project$Compiler$CompModel$litInt(0),
				$author$project$Compiler$CompModel$litInt(0),
				literal
			]));
};
var $author$project$Compiler$CompileBuiltIn$buildValue = function (val) {
	switch (val.$) {
		case 'StackIndex':
			var i = val.a;
			return $author$project$Compiler$CompileFunction$getCacheValue(
				$author$project$Compiler$CompModel$litInt(i));
		case 'ConstV':
			var c = val.a;
			return $author$project$Compiler$Song$makeLit(
				$author$project$Compiler$CompModel$litFloat(c));
		case 'FArg':
			var index = val.a;
			return $author$project$Compiler$CompModel$Lit(
				$author$project$Compiler$CompModel$argName(index));
		default:
			var str = val.a;
			return $author$project$Compiler$Song$makeLit(
				$author$project$Compiler$CompModel$Lit(str));
	}
};
var $author$project$Compiler$CompileBuiltIn$appendAll = F2(
	function (songs, func) {
		if (!songs.b) {
			return $author$project$Compiler$CompileBuiltIn$buildValue(
				$author$project$Compiler$CompModel$ConstV(0));
		} else {
			if (!songs.b.b) {
				var song = songs.a;
				return song;
			} else {
				var song = songs.a;
				var rest = songs.b;
				return A2(
					func,
					song,
					A2($author$project$Compiler$CompileBuiltIn$appendAll, rest, func));
			}
		}
	});
var $author$project$Compiler$CompileBuiltIn$buildAppend = function (expr) {
	return A2(
		$author$project$Compiler$CompileBuiltIn$appendAll,
		A2($elm$core$List$map, $author$project$Compiler$CompileBuiltIn$buildValue, expr.children),
		$author$project$Compiler$Song$append);
};
var $author$project$Compiler$CompModel$Empty = {$: 'Empty'};
var $author$project$Compiler$CompModel$If = F3(
	function (a, b, c) {
		return {$: 'If', a: a, b: b, c: c};
	});
var $author$project$Compiler$CompModel$Get = F2(
	function (a, b) {
		return {$: 'Get', a: a, b: b};
	});
var $author$project$Compiler$CompModel$getLit = F2(
	function (obj, str) {
		return A2(
			$author$project$Compiler$CompModel$Get,
			obj,
			$author$project$Compiler$CompModel$Lit(str));
	});
var $author$project$Compiler$CompModel$Arr = function (a) {
	return {$: 'Arr', a: a};
};
var $author$project$Compiler$CompModel$false = $author$project$Compiler$CompModel$Lit('false');
var $author$project$Compiler$CompileBuiltIn$wrapFuncRes = function (val) {
	return $author$project$Compiler$CompModel$Arr(
		_List_fromArray(
			[$author$project$Compiler$CompModel$false, val]));
};
var $author$project$Compiler$CompileBuiltIn$buildIf = F3(
	function (leftWrap, rightWrap, expr) {
		var _v0 = expr.children;
		if (((_v0.b && _v0.b.b) && _v0.b.b.b) && (!_v0.b.b.b.b)) {
			var cond = _v0.a;
			var _v1 = _v0.b;
			var thenValue = _v1.a;
			var _v2 = _v1.b;
			var elseValue = _v2.a;
			return A3(
				$author$project$Compiler$CompModel$If,
				A2(
					$author$project$Compiler$CompModel$getLit,
					$author$project$Compiler$CompileBuiltIn$buildValue(cond),
					'anchor'),
				leftWrap ? $author$project$Compiler$CompileBuiltIn$wrapFuncRes(
					$author$project$Compiler$CompileBuiltIn$buildValue(thenValue)) : $author$project$Compiler$CompileBuiltIn$buildValue(thenValue),
				rightWrap ? $author$project$Compiler$CompileBuiltIn$wrapFuncRes(
					$author$project$Compiler$CompileBuiltIn$buildValue(elseValue)) : $author$project$Compiler$CompileBuiltIn$buildValue(elseValue));
		} else {
			return $author$project$Compiler$CompModel$Empty;
		}
	});
var $author$project$Compiler$Song$join = F2(
	function (song1, song2) {
		return A2(
			$author$project$Compiler$CompModel$CallFunction,
			$author$project$Compiler$CompModel$Lit('join'),
			_List_fromArray(
				[song1, song2]));
	});
var $author$project$Compiler$CompileBuiltIn$buildJoin = function (expr) {
	return A2(
		$author$project$Compiler$CompileBuiltIn$appendAll,
		A2($elm$core$List$map, $author$project$Compiler$CompileBuiltIn$buildValue, expr.children),
		$author$project$Compiler$Song$join);
};
var $author$project$Compiler$Song$getAnchor = function (val) {
	return A2(
		$author$project$Compiler$CompModel$Get,
		val,
		$author$project$Compiler$CompModel$Lit('anchor'));
};
var $author$project$Compiler$Song$addSine = F3(
	function (song, frequency, duration) {
		return A2(
			$author$project$Compiler$Song$append,
			song,
			A2(
				$author$project$Compiler$CompModel$CallFunction,
				$author$project$Compiler$CompModel$Lit('noteSong'),
				_List_fromArray(
					[
						$author$project$Compiler$CompModel$litInt(0),
						$author$project$Compiler$Song$getAnchor(frequency),
						$author$project$Compiler$Song$getAnchor(duration)
					])));
	});
var $author$project$Compiler$CompileBuiltIn$buildWave = function (expr) {
	var _v0 = expr.children;
	if (((_v0.b && _v0.b.b) && _v0.b.b.b) && (!_v0.b.b.b.b)) {
		var time = _v0.a;
		var _v1 = _v0.b;
		var frequency = _v1.a;
		var _v2 = _v1.b;
		var duration = _v2.a;
		return A3(
			$author$project$Compiler$Song$addSine,
			$author$project$Compiler$CompileBuiltIn$buildValue(time),
			$author$project$Compiler$CompileBuiltIn$buildValue(frequency),
			$author$project$Compiler$CompileBuiltIn$buildValue(duration));
	} else {
		return $author$project$Compiler$CompModel$Empty;
	}
};
var $author$project$BuiltIn$generalList = _List_fromArray(
	[
		A3(
		$author$project$BuiltIn$BuiltInSpec,
		'note',
		$author$project$BuiltIn$Finite(
			_List_fromArray(
				['time', 'frequency', 'duration'])),
		$author$project$Compiler$CompModel$CompileExprFunction($author$project$Compiler$CompileBuiltIn$buildWave)),
		A3(
		$author$project$BuiltIn$BuiltInSpec,
		'append',
		A2($author$project$BuiltIn$Infinite, _List_Nil, 'songs'),
		$author$project$Compiler$CompModel$CompileExprFunction($author$project$Compiler$CompileBuiltIn$buildAppend)),
		A3(
		$author$project$BuiltIn$BuiltInSpec,
		'join',
		A2($author$project$BuiltIn$Infinite, _List_Nil, 'songs'),
		$author$project$Compiler$CompModel$CompileExprFunction($author$project$Compiler$CompileBuiltIn$buildJoin)),
		A3(
		$author$project$BuiltIn$BuiltInSpec,
		'if',
		$author$project$BuiltIn$Finite(
			_List_fromArray(
				['condition', 'thenValue', 'elseValue'])),
		$author$project$Compiler$CompModel$CompileExprFunction(
			A2($author$project$Compiler$CompileBuiltIn$buildIf, false, false)))
	]);
var $author$project$Compiler$CompModel$getAnchor = function (obj) {
	return A2($author$project$Compiler$CompModel$getLit, obj, 'anchor');
};
var $author$project$Compiler$CompileBuiltIn$buildJavascriptCall = F2(
	function (funcName, expr) {
		return $author$project$Compiler$Song$makeLit(
			A2(
				$author$project$Compiler$CompModel$CallFunction,
				$author$project$Compiler$CompModel$Lit(funcName),
				A2(
					$elm$core$List$map,
					$author$project$Compiler$CompModel$getAnchor,
					A2($elm$core$List$map, $author$project$Compiler$CompileBuiltIn$buildValue, expr.children))));
	});
var $author$project$BuiltIn$javascriptFunctionList = _List_fromArray(
	[
		A3(
		$author$project$BuiltIn$BuiltInSpec,
		'mod',
		$author$project$BuiltIn$Finite(
			_List_fromArray(
				['numerator', 'divisor'])),
		$author$project$Compiler$CompModel$CompileExprFunction(
			$author$project$Compiler$CompileBuiltIn$buildJavascriptCall('mathMod')))
	]);
var $author$project$Compiler$CompModel$CopySet = F2(
	function (a, b) {
		return {$: 'CopySet', a: a, b: b};
	});
var $author$project$Compiler$CompModel$Let = F2(
	function (a, b) {
		return {$: 'Let', a: a, b: b};
	});
var $author$project$Compiler$CompModel$SingleOp = F2(
	function (a, b) {
		return {$: 'SingleOp', a: a, b: b};
	});
var $author$project$Compiler$CompModel$Unary = F2(
	function (a, b) {
		return {$: 'Unary', a: a, b: b};
	});
var $author$project$Compiler$CompileBuiltIn$buildUnaryRest = F2(
	function (children, op) {
		if (!children.b) {
			return $author$project$Compiler$CompModel$Empty;
		} else {
			if (!children.b.b) {
				var arg = children.a;
				return A2(
					$author$project$Compiler$CompModel$getLit,
					$author$project$Compiler$CompileBuiltIn$buildValue(arg),
					'anchor');
			} else {
				var args = children;
				return A2(
					$author$project$Compiler$CompModel$Unary,
					op,
					A2(
						$elm$core$List$map,
						function (arg) {
							return A2(
								$author$project$Compiler$CompModel$getLit,
								$author$project$Compiler$CompileBuiltIn$buildValue(arg),
								'anchor');
						},
						args));
			}
		}
	});
var $author$project$Compiler$CompileBuiltIn$buildGeneralUnary = F3(
	function (defaultValue, singleArgumentLead, expr) {
		var _v0 = expr.children;
		if (!_v0.b) {
			return $author$project$Compiler$Song$makeLit(
				$author$project$Compiler$CompModel$Lit(defaultValue));
		} else {
			if (!_v0.b.b) {
				var arg = _v0.a;
				if (singleArgumentLead === '') {
					return $author$project$Compiler$CompileBuiltIn$buildValue(arg);
				} else {
					var lead = singleArgumentLead;
					return A2(
						$author$project$Compiler$CompModel$Let,
						_List_fromArray(
							[
								_Utils_Tuple2(
								'tmp',
								$author$project$Compiler$CompileBuiltIn$buildValue(arg))
							]),
						A2(
							$author$project$Compiler$CompModel$CopySet,
							$author$project$Compiler$CompModel$Lit('tmp'),
							_List_fromArray(
								[
									_Utils_Tuple2(
									'anchor',
									A2(
										$author$project$Compiler$CompModel$SingleOp,
										lead,
										A2(
											$author$project$Compiler$CompModel$getLit,
											$author$project$Compiler$CompModel$Lit('tmp'),
											'anchor')))
								])));
				}
			} else {
				var arg = _v0.a;
				var args = _v0.b;
				return A2(
					$author$project$Compiler$CompModel$Let,
					_List_fromArray(
						[
							_Utils_Tuple2(
							'tmp',
							$author$project$Compiler$CompileBuiltIn$buildValue(arg))
						]),
					A2(
						$author$project$Compiler$CompModel$CopySet,
						$author$project$Compiler$CompModel$Lit('tmp'),
						_List_fromArray(
							[
								_Utils_Tuple2(
								'anchor',
								A2(
									$author$project$Compiler$CompModel$Unary,
									expr.functionName,
									_List_fromArray(
										[
											A2(
											$author$project$Compiler$CompModel$getLit,
											$author$project$Compiler$CompModel$Lit('tmp'),
											'anchor'),
											A2($author$project$Compiler$CompileBuiltIn$buildUnaryRest, args, expr.functionName)
										])))
							])));
			}
		}
	});
var $author$project$Compiler$CompileBuiltIn$buildUnary = function (expr) {
	return A3($author$project$Compiler$CompileBuiltIn$buildGeneralUnary, '0', '', expr);
};
var $author$project$Compiler$CompileBuiltIn$buildUnaryWithDefault = F2(
	function (_default, expr) {
		return A3($author$project$Compiler$CompileBuiltIn$buildGeneralUnary, _default, '', expr);
	});
var $author$project$Compiler$CompileBuiltIn$buildUnaryWithSingleLead = F2(
	function (lead, expr) {
		return A3($author$project$Compiler$CompileBuiltIn$buildGeneralUnary, '0', lead, expr);
	});
var $author$project$BuiltIn$compareUnary = function (op) {
	return A3(
		$author$project$BuiltIn$BuiltInSpec,
		op,
		A2(
			$author$project$BuiltIn$Infinite,
			_List_fromArray(
				['leftComparable', 'rightComparable']),
			'comparables'),
		$author$project$Compiler$CompModel$CompileExprFunction($author$project$Compiler$CompileBuiltIn$buildUnary));
};
var $author$project$BuiltIn$compareUnaryOpList = A2(
	$elm$core$List$map,
	$author$project$BuiltIn$compareUnary,
	_List_fromArray(
		['>', '<', '>=', '<=', '==', '&&', '||']));
var $author$project$BuiltIn$unaryList = _Utils_ap(
	_List_fromArray(
		[
			A3(
			$author$project$BuiltIn$BuiltInSpec,
			'+',
			A2($author$project$BuiltIn$Infinite, _List_Nil, 'nums'),
			$author$project$Compiler$CompModel$CompileExprFunction(
				$author$project$Compiler$CompileBuiltIn$buildUnaryWithDefault('0'))),
			A3(
			$author$project$BuiltIn$BuiltInSpec,
			'-',
			A2(
				$author$project$BuiltIn$Infinite,
				_List_fromArray(
					['num']),
				'nums'),
			$author$project$Compiler$CompModel$CompileExprFunction(
				$author$project$Compiler$CompileBuiltIn$buildUnaryWithSingleLead('-'))),
			A3(
			$author$project$BuiltIn$BuiltInSpec,
			'/',
			A2(
				$author$project$BuiltIn$Infinite,
				_List_fromArray(
					['numerator']),
				'denominators'),
			$author$project$Compiler$CompModel$CompileExprFunction($author$project$Compiler$CompileBuiltIn$buildUnary)),
			A3(
			$author$project$BuiltIn$BuiltInSpec,
			'*',
			A2($author$project$BuiltIn$Infinite, _List_Nil, 'nums'),
			$author$project$Compiler$CompModel$CompileExprFunction(
				$author$project$Compiler$CompileBuiltIn$buildUnaryWithDefault('1')))
		]),
	$author$project$BuiltIn$compareUnaryOpList);
var $author$project$BuiltIn$builtInFunctionList = _Utils_ap(
	$author$project$BuiltIn$generalList,
	_Utils_ap($author$project$BuiltIn$unaryList, $author$project$BuiltIn$javascriptFunctionList));
var $author$project$BuiltIn$nameTuple = function (builtInList) {
	return _Utils_Tuple2(builtInList.functionName, builtInList);
};
var $author$project$BuiltIn$builtInFunctions = $elm$core$Dict$fromList(
	A2($elm$core$List$map, $author$project$BuiltIn$nameTuple, $author$project$BuiltIn$builtInFunctionList));
var $author$project$Utils$findBy = F2(
	function (list, key) {
		findBy:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (key(first)) {
					return $elm$core$Maybe$Just(first);
				} else {
					var $temp$list = rest,
						$temp$key = key;
					list = $temp$list;
					key = $temp$key;
					continue findBy;
				}
			}
		}
	});
var $author$project$Model$Hole = {$: 'Hole'};
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$ModelHelpers$fitInputsTo = F2(
	function (inputs, mandatoryLength) {
		return (_Utils_cmp(
			$elm$core$List$length(inputs),
			mandatoryLength) > 0) ? A2($elm$core$List$take, mandatoryLength, inputs) : ((_Utils_cmp(
			$elm$core$List$length(inputs),
			mandatoryLength) < 0) ? _Utils_ap(
			inputs,
			A2(
				$elm$core$List$repeat,
				mandatoryLength - $elm$core$List$length(inputs),
				$author$project$Model$Hole)) : inputs);
	});
var $author$project$ModelHelpers$eliminateHoles = function (inputs) {
	eliminateHoles:
	while (true) {
		if (!inputs.b) {
			return _List_fromArray(
				[$author$project$Model$Hole]);
		} else {
			var input = inputs.a;
			var rest = inputs.b;
			if (input.$ === 'Hole') {
				var $temp$inputs = rest;
				inputs = $temp$inputs;
				continue eliminateHoles;
			} else {
				return A2(
					$elm$core$List$cons,
					input,
					$author$project$ModelHelpers$eliminateHoles(rest));
			}
		}
	}
};
var $author$project$ModelHelpers$eliminateHolesAfter = F2(
	function (inputs, mandatoryLength) {
		eliminateHolesAfter:
		while (true) {
			if (!mandatoryLength) {
				return $author$project$ModelHelpers$eliminateHoles(inputs);
			} else {
				var $temp$inputs = inputs,
					$temp$mandatoryLength = mandatoryLength - 1;
				inputs = $temp$inputs;
				mandatoryLength = $temp$mandatoryLength;
				continue eliminateHolesAfter;
			}
		}
	});
var $author$project$ModelHelpers$fixInfiniteInputs = F2(
	function (inputs, mandatoryLength) {
		return A2($author$project$ModelHelpers$eliminateHolesAfter, inputs, mandatoryLength);
	});
var $author$project$ModelHelpers$fixForArgList = F2(
	function (call, argList) {
		var inputs = call.inputs;
		if (argList.$ === 'Infinite') {
			var finite = argList.a;
			return _Utils_update(
				call,
				{
					inputs: A2(
						$author$project$ModelHelpers$fixInfiniteInputs,
						inputs,
						$elm$core$List$length(finite))
				});
		} else {
			var finite = argList.a;
			return _Utils_update(
				call,
				{
					inputs: A2(
						$author$project$ModelHelpers$fitInputsTo,
						inputs,
						$elm$core$List$length(finite))
				});
		}
	});
var $author$project$ModelHelpers$funcToArgList = function (func) {
	return $author$project$BuiltIn$Finite(
		A2(
			$elm$core$List$repeat,
			$elm$core$List$length(func.args),
			''));
};
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $author$project$ModelHelpers$fixInputsForFunc = F2(
	function (onion, call) {
		var _v0 = A2($elm$core$Dict$get, call.functionName, $author$project$BuiltIn$builtInFunctions);
		if (_v0.$ === 'Just') {
			var builtInSpec = _v0.a;
			return A2($author$project$ModelHelpers$fixForArgList, call, builtInSpec.argList);
		} else {
			var _v1 = A2(
				$author$project$Utils$findBy,
				onion,
				function (func) {
					return _Utils_eq(func.name, call.functionName);
				});
			if (_v1.$ === 'Just') {
				var func = _v1.a;
				return A2(
					$author$project$ModelHelpers$fixForArgList,
					call,
					$author$project$ModelHelpers$funcToArgList(func));
			} else {
				return call;
			}
		}
	});
var $author$project$ModelHelpers$fixAllForFunc = F2(
	function (onion, func) {
		var calls = func.calls;
		return _Utils_update(
			func,
			{
				calls: A2(
					$elm$core$List$map,
					$author$project$ModelHelpers$fixInputsForFunc(onion),
					calls)
			});
	});
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$ModelHelpers$fixInputs = F4(
	function (inputs, idToPos, currentIndex, validF) {
		if (!inputs.b) {
			return _List_Nil;
		} else {
			var input = inputs.a;
			var rest = inputs.b;
			switch (input.$) {
				case 'Output':
					var id = input.a;
					var _v2 = A2($elm$core$Dict$get, id, idToPos);
					if (_v2.$ === 'Nothing') {
						return A2(
							$elm$core$List$cons,
							$author$project$Model$Hole,
							A4($author$project$ModelHelpers$fixInputs, rest, idToPos, currentIndex, validF));
					} else {
						var index = _v2.a;
						return (_Utils_cmp(index, currentIndex) > -1) ? A2(
							$elm$core$List$cons,
							$author$project$Model$Hole,
							A4($author$project$ModelHelpers$fixInputs, rest, idToPos, currentIndex, validF)) : A2(
							$elm$core$List$cons,
							input,
							A4($author$project$ModelHelpers$fixInputs, rest, idToPos, currentIndex, validF));
					}
				case 'FunctionArg':
					var index = input.a;
					return validF(index) ? A2(
						$elm$core$List$cons,
						input,
						A4($author$project$ModelHelpers$fixInputs, rest, idToPos, currentIndex, validF)) : A2(
						$elm$core$List$cons,
						$author$project$Model$Hole,
						A4($author$project$ModelHelpers$fixInputs, rest, idToPos, currentIndex, validF));
				default:
					return A2(
						$elm$core$List$cons,
						input,
						A4($author$project$ModelHelpers$fixInputs, rest, idToPos, currentIndex, validF));
			}
		}
	});
var $author$project$ModelHelpers$fixCallInputs = F4(
	function (call, idToPos, currentIndex, validF) {
		return _Utils_update(
			call,
			{
				inputs: A4($author$project$ModelHelpers$fixInputs, call.inputs, idToPos, currentIndex, validF)
			});
	});
var $author$project$ModelHelpers$fixInvalidInputsHelper = F4(
	function (func, idToPos, currentIndex, validF) {
		if (!func.b) {
			return _List_Nil;
		} else {
			var call = func.a;
			var calls = func.b;
			return A2(
				$elm$core$List$cons,
				A4($author$project$ModelHelpers$fixCallInputs, call, idToPos, currentIndex, validF),
				A4($author$project$ModelHelpers$fixInvalidInputsHelper, calls, idToPos, currentIndex + 1, validF));
		}
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $author$project$ModelHelpers$addFuncPos = F2(
	function (func, idToPos) {
		return A3($elm$core$Dict$insert, func.id, -1, idToPos);
	});
var $author$project$ModelHelpers$idToPositionCalls = F3(
	function (func, dict, pos) {
		idToPositionCalls:
		while (true) {
			if (!func.b) {
				return dict;
			} else {
				var e = func.a;
				var es = func.b;
				var $temp$func = es,
					$temp$dict = A3($elm$core$Dict$insert, e.id, pos, dict),
					$temp$pos = pos + 1;
				func = $temp$func;
				dict = $temp$dict;
				pos = $temp$pos;
				continue idToPositionCalls;
			}
		}
	});
var $author$project$ModelHelpers$idToPosition = F3(
	function (func, dict, pos) {
		return A2(
			$author$project$ModelHelpers$addFuncPos,
			func,
			A3($author$project$ModelHelpers$idToPositionCalls, func.calls, dict, pos));
	});
var $author$project$ModelHelpers$validFunctionArg = F2(
	function (header, pos) {
		validFunctionArg:
		while (true) {
			if (!header.b) {
				return false;
			} else {
				var h = header.a;
				var rest = header.b;
				if (!pos) {
					if (h.$ === 'Text') {
						return false;
					} else {
						return true;
					}
				} else {
					var $temp$header = rest,
						$temp$pos = pos - 1;
					header = $temp$header;
					pos = $temp$pos;
					continue validFunctionArg;
				}
			}
		}
	});
var $author$project$ModelHelpers$fixInvalidInputs = function (func) {
	var validF = $author$project$ModelHelpers$validFunctionArg(func.args);
	var idToPos = A3($author$project$ModelHelpers$idToPosition, func, $elm$core$Dict$empty, 0);
	return _Utils_update(
		func,
		{
			calls: A4($author$project$ModelHelpers$fixInvalidInputsHelper, func.calls, idToPos, 0, validF)
		});
};
var $author$project$ModelHelpers$fixAllInvalidInputs = function (onion) {
	return A2(
		$elm$core$List$map,
		$author$project$ModelHelpers$fixAllForFunc(onion),
		A2($elm$core$List$map, $author$project$ModelHelpers$fixInvalidInputs, onion));
};
var $author$project$ModelHelpers$updateFuncOnion = F3(
	function (onion, funcId, update) {
		if (!onion.b) {
			return _List_Nil;
		} else {
			var func = onion.a;
			var funcs = onion.b;
			return _Utils_eq(func.id, funcId) ? A2(
				$elm$core$List$cons,
				update(func),
				funcs) : A2(
				$elm$core$List$cons,
				func,
				A3($author$project$ModelHelpers$updateFuncOnion, funcs, funcId, update));
		}
	});
var $author$project$ModelHelpers$updateFunc = F3(
	function (model, funcId, update) {
		return _Utils_update(
			model,
			{
				program: $author$project$ModelHelpers$fixAllInvalidInputs(
					A3($author$project$ModelHelpers$updateFuncOnion, model.program, funcId, update))
			});
	});
var $author$project$Update$blockClickModel = F4(
	function (model, call, funcId, mouseOffset) {
		var removed = A3(
			$author$project$ModelHelpers$updateFunc,
			model,
			funcId,
			function (func) {
				return A2($author$project$ModelHelpers$removeCallUnsafe, func, call.id);
			});
		var oldMouse = model.mouseState;
		var newMouse = _Utils_update(
			oldMouse,
			{
				mouseSelection: A3($author$project$Model$BlockSelected, funcId, call, mouseOffset)
			});
		return _Utils_Tuple2(
			_Utils_update(
				removed,
				{mouseState: newMouse}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Update$blockNameClickModel = F4(
	function (model, call, funcId, mouseOffset) {
		return A4($author$project$Update$blockClickModel, model, call, funcId, mouseOffset);
	});
var $author$project$Model$NameSelected = function (a) {
	return {$: 'NameSelected', a: a};
};
var $author$project$Model$SilentDomError = function (a) {
	return {$: 'SilentDomError', a: a};
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2(
					$elm$core$Task$onError,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Err),
					A2(
						$elm$core$Task$andThen,
						A2(
							$elm$core$Basics$composeL,
							A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
							$elm$core$Result$Ok),
						task))));
	});
var $elm$browser$Browser$Dom$focus = _Browser_call('focus');
var $author$project$Update$focusInputCommand = function (domId) {
	return A2(
		$elm$core$Task$attempt,
		$author$project$Model$SilentDomError,
		$elm$browser$Browser$Dom$focus(domId));
};
var $author$project$Model$nodeNameId = function (callid) {
	return 'n' + $elm$core$String$fromInt(callid);
};
var $author$project$Update$blockNameHighlightModel = F2(
	function (model, id) {
		var oldMouse = model.mouseState;
		var newMouse = _Utils_update(
			oldMouse,
			{
				mouseSelection: $author$project$Model$NameSelected(id)
			});
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{mouseState: newMouse}),
			$author$project$Update$focusInputCommand(
				$author$project$Model$nodeNameId(id)));
	});
var $author$project$ModelHelpers$updateCallIfMatchesId = F4(
	function (call, callFunc, id, onion) {
		return _Utils_eq(call.id, id) ? A2(
			$author$project$ModelHelpers$fixInputsForFunc,
			onion,
			callFunc(call)) : call;
	});
var $author$project$ModelHelpers$updateCallFunc = F4(
	function (func, id, callFunc, onion) {
		if (!func.b) {
			return _List_Nil;
		} else {
			var call = func.a;
			var calls = func.b;
			return A2(
				$elm$core$List$cons,
				A4($author$project$ModelHelpers$updateCallIfMatchesId, call, callFunc, id, onion),
				A4($author$project$ModelHelpers$updateCallFunc, calls, id, callFunc, onion));
		}
	});
var $author$project$ModelHelpers$updateCallOnion = F3(
	function (onion, id, callFunc) {
		if (!onion.b) {
			return _List_Nil;
		} else {
			var func = onion.a;
			var funcs = onion.b;
			return A2(
				$elm$core$List$cons,
				_Utils_update(
					func,
					{
						calls: A4($author$project$ModelHelpers$updateCallFunc, func.calls, id, callFunc, onion)
					}),
				A3($author$project$ModelHelpers$updateCallOnion, funcs, id, callFunc));
		}
	});
var $author$project$ModelHelpers$updateCall = F3(
	function (model, id, callFunc) {
		var oldMouse = model.mouseState;
		var newOnion = A3($author$project$ModelHelpers$updateCallOnion, model.program, id, callFunc);
		var newMouse = _Utils_update(
			oldMouse,
			{mouseSelection: $author$project$Model$NoneSelected});
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{mouseState: newMouse, program: newOnion}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Update$blockNameUpdateModel = F3(
	function (model, id, str) {
		return A3(
			$author$project$ModelHelpers$updateCall,
			model,
			id,
			function (call) {
				return _Utils_update(
					call,
					{functionName: str});
			});
	});
var $author$project$Update$addFuncOutput = F2(
	function (model, id) {
		return A3(
			$author$project$ModelHelpers$updateFunc,
			model,
			id,
			function (func) {
				var newInputs = _Utils_ap(
					func.args,
					_List_fromArray(
						[$author$project$Model$Hole]));
				return _Utils_update(
					func,
					{args: newInputs});
			});
	});
var $author$project$Model$FunctionOutputSelected = F2(
	function (a, b) {
		return {$: 'FunctionOutputSelected', a: a, b: b};
	});
var $author$project$Model$headerNodeId = F2(
	function (functionid, index) {
		return 'h' + ($elm$core$String$fromInt(functionid) + ('-' + $elm$core$String$fromInt(index)));
	});
var $author$project$Update$headerHighlightModel = F3(
	function (model, id, index) {
		var oldMouse = model.mouseState;
		var newMouse = _Utils_update(
			oldMouse,
			{
				mouseSelection: A2($author$project$Model$FunctionOutputSelected, id, index)
			});
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{mouseState: newMouse}),
			$author$project$Update$focusInputCommand(
				A2($author$project$Model$headerNodeId, id, index)));
	});
var $author$project$Update$headerAddOutputModel = F3(
	function (model, id, index) {
		var added = A2($author$project$Update$addFuncOutput, model, id);
		return A3($author$project$Update$headerHighlightModel, added, id, index);
	});
var $author$project$Model$FunctionArg = function (a) {
	return {$: 'FunctionArg', a: a};
};
var $author$project$Model$Output = function (a) {
	return {$: 'Output', a: a};
};
var $author$project$ModelHelpers$updateInputAtIndex = F3(
	function (inputs, index, inputFunc) {
		if (!inputs.b) {
			return _List_Nil;
		} else {
			var thisinput = inputs.a;
			var rest = inputs.b;
			return (!index) ? A2(
				$elm$core$List$cons,
				inputFunc(thisinput),
				rest) : A2(
				$elm$core$List$cons,
				thisinput,
				A3($author$project$ModelHelpers$updateInputAtIndex, rest, index - 1, inputFunc));
		}
	});
var $author$project$ModelHelpers$fixInputsForInfiniteArguments = F2(
	function (inputs, call) {
		var _v0 = A2($elm$core$Dict$get, call.functionName, $author$project$BuiltIn$builtInFunctions);
		if (_v0.$ === 'Nothing') {
			return inputs;
		} else {
			var builtInSpec = _v0.a;
			var _v1 = builtInSpec.argList;
			if (_v1.$ === 'Infinite') {
				var base = _v1.a;
				var lastName = _v1.b;
				return A2(
					$author$project$ModelHelpers$fixInfiniteInputs,
					inputs,
					$elm$core$List$length(base));
			} else {
				return inputs;
			}
		}
	});
var $author$project$ModelHelpers$updateInputInputs = F4(
	function (inputs, index, inputFunc, call) {
		return A2(
			$author$project$ModelHelpers$fixInputsForInfiniteArguments,
			A3($author$project$ModelHelpers$updateInputAtIndex, inputs, index, inputFunc),
			call);
	});
var $author$project$ModelHelpers$updateInputCall = F4(
	function (call, id, index, inputFunc) {
		return _Utils_eq(id, call.id) ? _Utils_update(
			call,
			{
				inputs: A4($author$project$ModelHelpers$updateInputInputs, call.inputs, index, inputFunc, call)
			}) : call;
	});
var $author$project$ModelHelpers$updateInputFunc = F4(
	function (func, id, index, inputFunc) {
		if (!func.b) {
			return _List_Nil;
		} else {
			var call = func.a;
			var calls = func.b;
			return A2(
				$elm$core$List$cons,
				A4($author$project$ModelHelpers$updateInputCall, call, id, index, inputFunc),
				A4($author$project$ModelHelpers$updateInputFunc, calls, id, index, inputFunc));
		}
	});
var $author$project$ModelHelpers$updateInputOnion = F5(
	function (onion, id, index, funcIdMaybe, inputFunc) {
		if (!onion.b) {
			return _List_Nil;
		} else {
			var func = onion.a;
			var funcs = onion.b;
			if (funcIdMaybe.$ === 'Just') {
				var fId = funcIdMaybe.a;
				return _Utils_eq(fId, func.id) ? A2(
					$elm$core$List$cons,
					$author$project$ModelHelpers$fixInvalidInputs(
						_Utils_update(
							func,
							{
								calls: A4($author$project$ModelHelpers$updateInputFunc, func.calls, id, index, inputFunc)
							})),
					funcs) : A2(
					$elm$core$List$cons,
					func,
					A5($author$project$ModelHelpers$updateInputOnion, funcs, id, index, funcIdMaybe, inputFunc));
			} else {
				return A2(
					$elm$core$List$cons,
					$author$project$ModelHelpers$fixInvalidInputs(
						_Utils_update(
							func,
							{
								calls: A4($author$project$ModelHelpers$updateInputFunc, func.calls, id, index, inputFunc)
							})),
					A5($author$project$ModelHelpers$updateInputOnion, funcs, id, index, funcIdMaybe, inputFunc));
			}
		}
	});
var $author$project$ModelHelpers$updateInputOn = F5(
	function (model, id, index, funcIdMaybe, inputFunc) {
		var oldMouse = model.mouseState;
		var newOnion = A5($author$project$ModelHelpers$updateInputOnion, model.program, id, index, funcIdMaybe, inputFunc);
		var newMouse = _Utils_update(
			oldMouse,
			{mouseSelection: $author$project$Model$NoneSelected});
		return _Utils_update(
			model,
			{mouseState: newMouse, program: newOnion});
	});
var $author$project$Update$connectFuncArg = F5(
	function (model, id, index, funcId, argIndex) {
		return _Utils_Tuple2(
			A3(
				$author$project$ModelHelpers$updateFunc,
				A5(
					$author$project$ModelHelpers$updateInputOn,
					model,
					id,
					index,
					$elm$core$Maybe$Just(funcId),
					function (input) {
						return $author$project$Model$FunctionArg(argIndex);
					}),
				funcId,
				function (func) {
					var newArgs = A3(
						$author$project$ModelHelpers$updateInputAtIndex,
						func.args,
						argIndex,
						function (input) {
							return $author$project$Model$Output(id);
						});
					return _Utils_update(
						func,
						{args: newArgs});
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Update$headerOutputRightClickModel = F3(
	function (model, id, index) {
		var _v0 = model.mouseState.mouseSelection;
		if (_v0.$ === 'InputSelected') {
			var inputId = _v0.a;
			var inputIndex = _v0.b;
			return A5($author$project$Update$connectFuncArg, model, inputId, inputIndex, id, index);
		} else {
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Update$headerAddOutputRightClickModel = F3(
	function (model, id, index) {
		var added = A2($author$project$Update$addFuncOutput, model, id);
		return A3($author$project$Update$headerOutputRightClickModel, added, id, index);
	});
var $author$project$Model$FunctionSelected = F2(
	function (a, b) {
		return {$: 'FunctionSelected', a: a, b: b};
	});
var $author$project$ModelHelpers$removeFunc = F2(
	function (onion, funcId) {
		if (!onion.b) {
			return _List_Nil;
		} else {
			var func = onion.a;
			var funcs = onion.b;
			return _Utils_eq(func.id, funcId) ? funcs : A2(
				$elm$core$List$cons,
				func,
				A2($author$project$ModelHelpers$removeFunc, funcs, funcId));
		}
	});
var $author$project$Update$headerClickModel = F3(
	function (model, func, mouseOffset) {
		var oldMouse = model.mouseState;
		var newProgram = A2($author$project$ModelHelpers$removeFunc, model.program, func.id);
		var newMouse = _Utils_update(
			oldMouse,
			{
				mouseSelection: A2($author$project$Model$FunctionSelected, func, mouseOffset)
			});
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{mouseState: newMouse, program: newProgram}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Update$headerNameClickModel = F3(
	function (model, func, mouseOffset) {
		return A3($author$project$Update$headerClickModel, model, func, mouseOffset);
	});
var $author$project$Model$FunctionNameSelected = function (a) {
	return {$: 'FunctionNameSelected', a: a};
};
var $author$project$Model$headerNameId = function (functionid) {
	return 'hn' + $elm$core$String$fromInt(functionid);
};
var $author$project$Update$headerNameHighlightModel = F2(
	function (model, id) {
		var oldMouse = model.mouseState;
		var newMouse = _Utils_update(
			oldMouse,
			{
				mouseSelection: $author$project$Model$FunctionNameSelected(id)
			});
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{mouseState: newMouse}),
			$author$project$Update$focusInputCommand(
				$author$project$Model$headerNameId(id)));
	});
var $author$project$Update$headerNameUpdateModel = F3(
	function (model, id, str) {
		return _Utils_Tuple2(
			A3(
				$author$project$ModelHelpers$updateFunc,
				model,
				id,
				function (func) {
					return _Utils_update(
						func,
						{name: str});
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Update$headerOutputClickModel = F3(
	function (model, id, index) {
		return A3($author$project$Update$headerHighlightModel, model, id, index);
	});
var $author$project$Model$InputSelected = F2(
	function (a, b) {
		return {$: 'InputSelected', a: a, b: b};
	});
var $author$project$Model$nodeInputId = F2(
	function (callid, inputindex) {
		return 'i' + ($elm$core$String$fromInt(callid) + ('-' + $elm$core$String$fromInt(inputindex)));
	});
var $author$project$Update$inputHighlightModel = F3(
	function (model, id, index) {
		var oldMouse = model.mouseState;
		var newMouse = _Utils_update(
			oldMouse,
			{
				mouseSelection: A2($author$project$Model$InputSelected, id, index)
			});
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{mouseState: newMouse}),
			$author$project$Update$focusInputCommand(
				A2($author$project$Model$nodeInputId, id, index)));
	});
var $author$project$Update$inputClickModel = F3(
	function (model, id, index) {
		return A3($author$project$Update$inputHighlightModel, model, id, index);
	});
var $author$project$ModelHelpers$updateInput = F4(
	function (model, id, index, inputFunc) {
		return A5($author$project$ModelHelpers$updateInputOn, model, id, index, $elm$core$Maybe$Nothing, inputFunc);
	});
var $author$project$Update$inputRightClickModel = F3(
	function (model, id, index) {
		var _v0 = model.mouseState.mouseSelection;
		switch (_v0.$) {
			case 'OutputSelected':
				var outputId = _v0.a;
				return _Utils_Tuple2(
					A4(
						$author$project$ModelHelpers$updateInput,
						model,
						id,
						index,
						function (input) {
							return $author$project$Model$Output(outputId);
						}),
					$elm$core$Platform$Cmd$none);
			case 'FunctionOutputSelected':
				var funcId = _v0.a;
				var argIndex = _v0.b;
				return A5($author$project$Update$connectFuncArg, model, id, index, funcId, argIndex);
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Model$Text = function (a) {
	return {$: 'Text', a: a};
};
var $author$project$Update$inputUpdateModel = F4(
	function (model, id, index, str) {
		if (str === '') {
			return _Utils_Tuple2(
				A4(
					$author$project$ModelHelpers$updateInput,
					model,
					id,
					index,
					function (i) {
						return $author$project$Model$Hole;
					}),
				$author$project$Update$focusInputCommand(
					A2($author$project$Model$nodeInputId, id, index)));
		} else {
			return _Utils_Tuple2(
				A4(
					$author$project$ModelHelpers$updateInput,
					model,
					id,
					index,
					function (i) {
						return $author$project$Model$Text(str);
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Model$OutputSelected = function (a) {
	return {$: 'OutputSelected', a: a};
};
var $author$project$Model$nodeOutputId = function (callid) {
	return 'o' + $elm$core$String$fromInt(callid);
};
var $author$project$Update$outputHighlightModel = F2(
	function (model, id) {
		var oldMouse = model.mouseState;
		var newMouse = _Utils_update(
			oldMouse,
			{
				mouseSelection: $author$project$Model$OutputSelected(id)
			});
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{mouseState: newMouse}),
			A2(
				$elm$core$Task$attempt,
				$author$project$Model$SilentDomError,
				$elm$browser$Browser$Dom$focus(
					$author$project$Model$nodeOutputId(id))));
	});
var $author$project$Update$outputClickModel = F2(
	function (model, id) {
		return A2($author$project$Update$outputHighlightModel, model, id);
	});
var $author$project$Update$outputRightClickModel = F2(
	function (model, id) {
		var oldMouse = model.mouseState;
		var _v0 = oldMouse.mouseSelection;
		if (_v0.$ === 'InputSelected') {
			var inputId = _v0.a;
			var index = _v0.b;
			return _Utils_Tuple2(
				A4(
					$author$project$ModelHelpers$updateInput,
					model,
					inputId,
					index,
					function (i) {
						return $author$project$Model$Output(id);
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Model$Call = F4(
	function (id, inputs, functionName, outputText) {
		return {functionName: functionName, id: id, inputs: inputs, outputText: outputText};
	});
var $author$project$BuiltIn$callWithHoles = F3(
	function (id, name, numHoles) {
		return A4(
			$author$project$Model$Call,
			id,
			A2($elm$core$List$repeat, numHoles, $author$project$Model$Hole),
			name,
			'');
	});
var $author$project$BuiltIn$constructCall = F2(
	function (id, functionName) {
		var _v0 = A2($elm$core$Dict$get, functionName, $author$project$BuiltIn$builtInFunctions);
		if (_v0.$ === 'Just') {
			var builtIn = _v0.a;
			var _v1 = builtIn.argList;
			if (_v1.$ === 'Infinite') {
				var firstArgs = _v1.a;
				var restArgs = _v1.b;
				return A3(
					$author$project$BuiltIn$callWithHoles,
					id,
					functionName,
					A2(
						$elm$core$Basics$max,
						1,
						$elm$core$List$length(firstArgs)));
			} else {
				var args = _v1.a;
				return A3(
					$author$project$BuiltIn$callWithHoles,
					id,
					functionName,
					$elm$core$List$length(args));
			}
		} else {
			return A3($author$project$BuiltIn$callWithHoles, id, functionName, 0);
		}
	});
var $author$project$Update$firstOrSpawn = function (onion) {
	if (!onion.b) {
		return _Utils_Tuple2(
			0,
			_List_fromArray(
				[
					A2($author$project$Model$makeMain, 0, _List_Nil)
				]));
	} else {
		var func = onion.a;
		var rest = onion.b;
		return _Utils_Tuple2(func.id, onion);
	}
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$Update$spawnBlockModel = F3(
	function (model, name, mouseOffset) {
		var oldMouse = model.mouseState;
		var newCall = A2($author$project$BuiltIn$constructCall, model.idCounter, name);
		var funcTuple = $author$project$Update$firstOrSpawn(model.program);
		var newProgram = funcTuple.b;
		var funcId = funcTuple.a;
		var newMouse = _Utils_update(
			oldMouse,
			{
				mouseSelection: A3($author$project$Model$BlockSelected, funcId, newCall, mouseOffset)
			});
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{idCounter: newCall.id + 1, mouseState: newMouse, program: newProgram}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Update$spawnFuncModel = F3(
	function (model, name, mouseOffset) {
		var oldMouse = model.mouseState;
		var newFunc = A3($author$project$Model$constructFunction, model.idCounter, name, _List_Nil);
		var newMouse = _Utils_update(
			oldMouse,
			{
				mouseSelection: A2($author$project$Model$FunctionSelected, newFunc, mouseOffset)
			});
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{idCounter: newFunc.id + 1, mouseState: newMouse}),
			$elm$core$Platform$Cmd$none);
	});
var $elm$url$Url$Builder$toQueryPair = function (_v0) {
	var key = _v0.a;
	var value = _v0.b;
	return key + ('=' + value);
};
var $elm$url$Url$Builder$toQuery = function (parameters) {
	if (!parameters.b) {
		return '';
	} else {
		return '?' + A2(
			$elm$core$String$join,
			'&',
			A2($elm$core$List$map, $elm$url$Url$Builder$toQueryPair, parameters));
	}
};
var $elm$url$Url$Builder$absolute = F2(
	function (pathSegments, parameters) {
		return '/' + (A2($elm$core$String$join, '/', pathSegments) + $elm$url$Url$Builder$toQuery(parameters));
	});
var $elm$core$String$append = _String_append;
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $author$project$Update$changeUrl = F3(
	function (model, newurl, newPage) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{currentPage: newPage, url: newurl}),
			A2(
				$elm$browser$Browser$Navigation$pushUrl,
				model.urlkey,
				$elm$url$Url$toString(newurl)));
	});
var $author$project$Update$changeByName = F2(
	function (model, pageName) {
		var newurl = function () {
			var _v0 = $elm$url$Url$fromString(
				A2(
					$elm$core$String$append,
					model.indexurl,
					A2(
						$elm$url$Url$Builder$absolute,
						_List_fromArray(
							[pageName]),
						_List_Nil)));
			if (_v0.$ === 'Nothing') {
				return model.url;
			} else {
				var url = _v0.a;
				return url;
			}
		}();
		return A3($author$project$Update$changeUrl, model, newurl, pageName);
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $author$project$Update$updateWithChar = F2(
	function (_char, input) {
		if (input.$ === 'Text') {
			var str = input.a;
			return $author$project$Model$Text(str);
		} else {
			return $author$project$Model$Text(
				$elm$core$String$fromChar(_char));
		}
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Update$keyboardUpdateInput = F4(
	function (model, keyevent, id, index) {
		var _v0 = $elm$core$String$uncons(
			A2($elm$core$Maybe$withDefault, '', keyevent.key));
		if ((_v0.$ === 'Just') && (_v0.a.b === '')) {
			var _v1 = _v0.a;
			var _char = _v1.a;
			return $elm$core$Char$isAlphaNum(_char) ? _Utils_Tuple2(
				A4(
					$author$project$ModelHelpers$updateInput,
					model,
					id,
					index,
					$author$project$Update$updateWithChar(_char)),
				$author$project$Update$focusInputCommand(
					A2($author$project$Model$nodeInputId, id, index))) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		} else {
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Update$keyboardUpdateOutput = F3(
	function (model, keyevent, id) {
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$Update$keyboardUpdate = F2(
	function (model, keyevent) {
		var _v0 = model.mouseState.mouseSelection;
		switch (_v0.$) {
			case 'InputSelected':
				var id = _v0.a;
				var index = _v0.b;
				return A4($author$project$Update$keyboardUpdateInput, model, keyevent, id, index);
			case 'OutputSelected':
				var id = _v0.a;
				return A3($author$project$Update$keyboardUpdateOutput, model, keyevent, id);
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $author$project$DrawToolbar$ToolResult = F3(
	function (width, height, svg) {
		return {height: height, svg: svg, width: width};
	});
var $author$project$BuiltIn$callFromSpec = F2(
	function (spec, id) {
		return A2($author$project$BuiltIn$constructCall, id, spec.functionName);
	});
var $author$project$BuiltIn$makeAllFunction = F2(
	function (builtInList, counter) {
		if (!builtInList.b) {
			return _List_Nil;
		} else {
			var spec = builtInList.a;
			var specs = builtInList.b;
			return A2(
				$elm$core$List$cons,
				A2($author$project$BuiltIn$callFromSpec, spec, counter),
				A2($author$project$BuiltIn$makeAllFunction, specs, counter - 1));
		}
	});
var $author$project$BuiltIn$allBuiltInAsFunction = A3(
	$author$project$Model$makeFunc,
	-1,
	A2($author$project$BuiltIn$makeAllFunction, $author$project$BuiltIn$builtInFunctionList, -100),
	'function');
var $author$project$Model$BlockClick = F3(
	function (a, b, c) {
		return {$: 'BlockClick', a: a, b: b, c: c};
	});
var $author$project$Model$SpawnBlock = F2(
	function (a, b) {
		return {$: 'SpawnBlock', a: a, b: b};
	});
var $author$project$ViewVariables$blockColor = 'rgb(50, 214, 232)';
var $author$project$ViewVariables$blockHeight = 50;
var $author$project$ViewVariables$buttonHeight = 50;
var $author$project$ViewVariables$titleHeight = 90;
var $author$project$ViewVariables$svgYpos = $author$project$ViewVariables$titleHeight + $author$project$ViewVariables$buttonHeight;
var $author$project$ViewVariables$viewportHeight = 500;
var $author$project$ViewVariables$viewportWidth = F2(
	function (svgWindowWidth, svgWindowHeight) {
		return $elm$core$Basics$floor((svgWindowWidth / svgWindowHeight) * $author$project$ViewVariables$viewportHeight);
	});
var $author$project$ViewStructure$mouseToSvgCoordinates = F5(
	function (mouseState, svgScreenWidth, svgScreenHeight, xoffset, yoffset) {
		return _Utils_Tuple2(
			((((mouseState.mouseX + mouseState.scrollX) * A2($author$project$ViewVariables$viewportWidth, svgScreenWidth, svgScreenHeight)) / svgScreenWidth) | 0) - xoffset,
			(((((mouseState.mouseY + mouseState.scrollY) - $author$project$ViewVariables$svgYpos) * $author$project$ViewVariables$viewportHeight) / svgScreenHeight) | 0) - yoffset);
	});
var $author$project$SvgDraw$viewStructureToMouse = function (viewStructure) {
	return A5($author$project$ViewStructure$mouseToSvgCoordinates, viewStructure.mouseState, viewStructure.svgWidth, viewStructure.svgHeight, 0, 0);
};
var $author$project$SvgDraw$blockMouseOffset = F2(
	function (call, viewStructure) {
		var coordinates = $author$project$SvgDraw$viewStructureToMouse(viewStructure);
		var _v0 = A2($elm$core$Dict$get, call.id, viewStructure.blockPositions);
		if (_v0.$ === 'Just') {
			var blockPos = _v0.a;
			return _Utils_Tuple2((coordinates.a - blockPos.xpos) - viewStructure.headerPos.xpos, (coordinates.b - blockPos.ypos) - viewStructure.headerPos.ypos);
		} else {
			return _Utils_Tuple2(0, 0);
		}
	});
var $elm$svg$Svg$Attributes$cursor = _VirtualDom_attribute('cursor');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$virtual_dom$VirtualDom$nodeNS = function (tag) {
	return _VirtualDom_nodeNS(
		_VirtualDom_noScript(tag));
};
var $elm$svg$Svg$node = $elm$virtual_dom$VirtualDom$nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$Attributes$pointerEvents = _VirtualDom_attribute('pointer-events');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $author$project$SvgDraw$errorSvgNode = function (errorMsg) {
	return A3(
		$elm$svg$Svg$node,
		'g',
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$rect,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$x('0'),
						$elm$svg$Svg$Attributes$y('0'),
						$elm$svg$Svg$Attributes$width('100'),
						$elm$svg$Svg$Attributes$height('100'),
						$elm$svg$Svg$Attributes$fill('red'),
						$elm$svg$Svg$Attributes$stroke('red')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$text_,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$x('0'),
						$elm$svg$Svg$Attributes$y('50'),
						$elm$svg$Svg$Attributes$fill('white'),
						$elm$svg$Svg$Attributes$stroke('white'),
						$elm$svg$Svg$Attributes$pointerEvents('none'),
						$elm$svg$Svg$Attributes$cursor('default')
					]),
				_List_fromArray(
					[
						$elm$svg$Svg$text(errorMsg)
					]))
			]));
};
var $author$project$ViewVariables$nodeRadius = ($author$project$ViewVariables$blockHeight / 7) | 0;
var $elm$svg$Svg$Attributes$rx = _VirtualDom_attribute('rx');
var $elm$svg$Svg$Attributes$ry = _VirtualDom_attribute('ry');
var $author$project$SvgDraw$alwaysPreventDefault = function (msg) {
	return _Utils_Tuple2(msg, true);
};
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $elm$svg$Svg$Events$preventDefaultOn = $elm$html$Html$Events$preventDefaultOn;
var $author$project$SvgDraw$createLeftDecoder = F3(
	function (msgLeft, msgRight, button) {
		switch (button) {
			case 0:
				return $elm$json$Json$Decode$succeed(msgLeft);
			case 2:
				return $elm$json$Json$Decode$succeed(msgRight);
			default:
				return $elm$json$Json$Decode$succeed(msgLeft);
		}
	});
var $author$project$SvgDraw$checkLeftDecoder = F2(
	function (msgLeft, msgRight) {
		return A2(
			$elm$json$Json$Decode$andThen,
			A2($author$project$SvgDraw$createLeftDecoder, msgLeft, msgRight),
			A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int));
	});
var $author$project$SvgDraw$svgClickPrevent = F2(
	function (msgLeft, msgRight) {
		return A2(
			$elm$json$Json$Decode$map,
			$author$project$SvgDraw$alwaysPreventDefault,
			A2($author$project$SvgDraw$checkLeftDecoder, msgLeft, msgRight));
	});
var $author$project$SvgDraw$svgClickEvents = F2(
	function (leftClickEvent, rightClickEvent) {
		return _List_fromArray(
			[
				A2(
				$elm$svg$Svg$Events$preventDefaultOn,
				'contextmenu',
				A2(
					$elm$json$Json$Decode$map,
					$author$project$SvgDraw$alwaysPreventDefault,
					$elm$json$Json$Decode$succeed($author$project$Model$NoOp))),
				A2(
				$elm$svg$Svg$Events$preventDefaultOn,
				'mousedown',
				A2($author$project$SvgDraw$svgClickPrevent, leftClickEvent, rightClickEvent))
			]);
	});
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $author$project$SvgDraw$svgTranslate = F2(
	function (xpos, ypos) {
		return $elm$svg$Svg$Attributes$transform(
			'translate(' + ($elm$core$String$fromInt(xpos) + (',' + ($elm$core$String$fromInt(ypos) + ')'))));
	});
var $author$project$SvgDraw$drawBlock = F2(
	function (call, viewStructure) {
		var _v0 = A2($elm$core$Dict$get, call.id, viewStructure.blockPositions);
		if (_v0.$ === 'Just') {
			var blockPos = _v0.a;
			return A2(
				$elm$svg$Svg$rect,
				_Utils_ap(
					viewStructure.isToolbar ? A2(
						$author$project$SvgDraw$svgClickEvents,
						A2(
							$author$project$Model$SpawnBlock,
							call.functionName,
							A2($author$project$SvgDraw$blockMouseOffset, call, viewStructure)),
						A2(
							$author$project$Model$SpawnBlock,
							call.functionName,
							A2($author$project$SvgDraw$blockMouseOffset, call, viewStructure))) : A2(
						$author$project$SvgDraw$svgClickEvents,
						A3(
							$author$project$Model$BlockClick,
							call,
							viewStructure.id,
							A2($author$project$SvgDraw$blockMouseOffset, call, viewStructure)),
						A3(
							$author$project$Model$BlockClick,
							call,
							viewStructure.id,
							A2($author$project$SvgDraw$blockMouseOffset, call, viewStructure))),
					_List_fromArray(
						[
							A2($author$project$SvgDraw$svgTranslate, blockPos.xpos, blockPos.ypos),
							$elm$svg$Svg$Attributes$x('0'),
							$elm$svg$Svg$Attributes$y(
							$elm$core$String$fromInt($author$project$ViewVariables$nodeRadius)),
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(blockPos.width)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt($author$project$ViewVariables$blockHeight - ($author$project$ViewVariables$nodeRadius * 2))),
							$elm$svg$Svg$Attributes$fill($author$project$ViewVariables$blockColor),
							$elm$svg$Svg$Attributes$stroke($author$project$ViewVariables$blockColor),
							$elm$svg$Svg$Attributes$rx(
							$elm$core$String$fromInt($author$project$ViewVariables$nodeRadius)),
							$elm$svg$Svg$Attributes$ry(
							$elm$core$String$fromInt($author$project$ViewVariables$nodeRadius))
						])),
				_List_Nil);
		} else {
			return $author$project$SvgDraw$errorSvgNode('function call without block pos');
		}
	});
var $author$project$SvgDraw$drawBuiltIn = F3(
	function (call, index, viewStructure) {
		return A2($author$project$SvgDraw$drawBlock, call, viewStructure);
	});
var $author$project$DrawFunc$drawCall = F3(
	function (call, counter, viewStructure) {
		return A3($author$project$SvgDraw$drawBuiltIn, call, counter, viewStructure);
	});
var $author$project$DrawFunc$drawFuncCalls = F3(
	function (func, viewStructure, counter) {
		if (!func.b) {
			return _List_Nil;
		} else {
			var call = func.a;
			var calls = func.b;
			return A2(
				$elm$core$List$cons,
				A3($author$project$DrawFunc$drawCall, call, counter, viewStructure),
				A3($author$project$DrawFunc$drawFuncCalls, calls, viewStructure, counter + 1));
		}
	});
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$ellipse = $elm$svg$Svg$trustedNode('ellipse');
var $author$project$ViewVariables$functionHeaderHeight = $author$project$ViewVariables$blockHeight;
var $author$project$ViewVariables$functionHeaderSquareY = ($author$project$ViewVariables$functionHeaderHeight - $author$project$ViewVariables$blockHeight) + $author$project$ViewVariables$nodeRadius;
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $author$project$Model$HeaderClick = F2(
	function (a, b) {
		return {$: 'HeaderClick', a: a, b: b};
	});
var $author$project$Model$SpawnFunction = F2(
	function (a, b) {
		return {$: 'SpawnFunction', a: a, b: b};
	});
var $author$project$SvgDraw$functionMouseOffset = F2(
	function (_function, viewStructure) {
		var coordinates = $author$project$SvgDraw$viewStructureToMouse(viewStructure);
		return _Utils_Tuple2(coordinates.a - viewStructure.headerPos.xpos, coordinates.b - viewStructure.headerPos.ypos);
	});
var $author$project$SvgDraw$headerBlockEvents = F2(
	function (_function, viewStructure) {
		return viewStructure.isToolbar ? A2(
			$author$project$SvgDraw$svgClickEvents,
			A2(
				$author$project$Model$SpawnFunction,
				'',
				A2($author$project$SvgDraw$functionMouseOffset, _function, viewStructure)),
			A2(
				$author$project$Model$SpawnFunction,
				'',
				A2($author$project$SvgDraw$functionMouseOffset, _function, viewStructure))) : A2(
			$author$project$SvgDraw$svgClickEvents,
			A2(
				$author$project$Model$HeaderClick,
				_function,
				A2($author$project$SvgDraw$functionMouseOffset, _function, viewStructure)),
			A2(
				$author$project$Model$HeaderClick,
				_function,
				A2($author$project$SvgDraw$functionMouseOffset, _function, viewStructure)));
	});
var $author$project$SvgDraw$drawFuncHeader = F2(
	function (_function, viewStructure) {
		return A2(
			$elm$svg$Svg$g,
			A2($author$project$SvgDraw$headerBlockEvents, _function, viewStructure),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$ellipse,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$rx(
							$elm$core$String$fromInt((viewStructure.headerPos.width / 2) | 0)),
							$elm$svg$Svg$Attributes$ry(
							$elm$core$String$fromInt($author$project$ViewVariables$functionHeaderSquareY)),
							$elm$svg$Svg$Attributes$cx(
							$elm$core$String$fromInt((viewStructure.headerPos.width / 2) | 0)),
							$elm$svg$Svg$Attributes$cy(
							$elm$core$String$fromInt($author$project$ViewVariables$functionHeaderSquareY)),
							$elm$svg$Svg$Attributes$fill($author$project$ViewVariables$blockColor),
							$elm$svg$Svg$Attributes$stroke($author$project$ViewVariables$blockColor)
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$rect,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x('0'),
							$elm$svg$Svg$Attributes$y(
							$elm$core$String$fromInt($author$project$ViewVariables$functionHeaderSquareY)),
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(viewStructure.headerPos.width)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt(($author$project$ViewVariables$functionHeaderHeight - $author$project$ViewVariables$functionHeaderSquareY) - $author$project$ViewVariables$nodeRadius)),
							$elm$svg$Svg$Attributes$fill($author$project$ViewVariables$blockColor),
							$elm$svg$Svg$Attributes$stroke($author$project$ViewVariables$blockColor)
						]),
					_List_Nil)
				]));
	});
var $author$project$DrawFunc$drawFuncHeader = F2(
	function (func, viewStructure) {
		return A2($author$project$SvgDraw$drawFuncHeader, func, viewStructure);
	});
var $author$project$DrawFunc$drawFunc = F3(
	function (func, viewStructure, counter) {
		return A2(
			$elm$core$List$cons,
			A2($author$project$DrawFunc$drawFuncHeader, func, viewStructure),
			A3($author$project$DrawFunc$drawFuncCalls, func.calls, viewStructure, counter));
	});
var $author$project$Model$OutputClick = function (a) {
	return {$: 'OutputClick', a: a};
};
var $author$project$Model$OutputRightClick = function (a) {
	return {$: 'OutputRightClick', a: a};
};
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $author$project$ViewVariables$holeGrey = 'rgb(200, 200, 200)';
var $author$project$ViewVariables$hollowNodeOutlineProportion = 0.25;
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $author$project$SvgDraw$drawNode = F6(
	function (xpos, inputPosition, ypos, events, isHighlighted, isHollow) {
		var outerCircle = A2(
			$elm$svg$Svg$circle,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$r(
					$elm$core$String$fromInt((inputPosition.b / 2) | 0)),
					$elm$svg$Svg$Attributes$cx(
					$elm$core$String$fromInt((inputPosition.a + ((inputPosition.b / 2) | 0)) + xpos)),
					$elm$svg$Svg$Attributes$cy(
					$elm$core$String$fromInt(ypos)),
					$elm$svg$Svg$Attributes$fill(
					isHighlighted ? 'blue' : 'black')
				]),
			_List_Nil);
		return A2(
			$elm$svg$Svg$g,
			events,
			function () {
				if (isHollow) {
					var innerR = $elm$core$Basics$floor((inputPosition.b * 0.5) * (1 - $author$project$ViewVariables$hollowNodeOutlineProportion));
					return _List_fromArray(
						[
							outerCircle,
							A2(
							$elm$svg$Svg$circle,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$r(
									$elm$core$String$fromInt(innerR)),
									$elm$svg$Svg$Attributes$cx(
									$elm$core$String$fromInt((inputPosition.a + ((inputPosition.b / 2) | 0)) + xpos)),
									$elm$svg$Svg$Attributes$cy(
									$elm$core$String$fromInt(ypos)),
									$elm$svg$Svg$Attributes$fill($author$project$ViewVariables$holeGrey)
								]),
							_List_Nil)
						]);
				} else {
					return _List_fromArray(
						[outerCircle]);
				}
			}());
	});
var $author$project$ViewVariables$outputNodeY = $author$project$ViewVariables$blockHeight - $author$project$ViewVariables$nodeRadius;
var $author$project$DrawFunc$drawCallEnding = F2(
	function (call, viewStructure) {
		var _v0 = A2($elm$core$Dict$get, call.id, viewStructure.blockPositions);
		if (_v0.$ === 'Just') {
			var blockPos = _v0.a;
			var isOutputHighlighted = function () {
				var _v1 = viewStructure.mouseState.mouseSelection;
				if (_v1.$ === 'OutputSelected') {
					var outputId = _v1.a;
					return _Utils_eq(outputId, call.id);
				} else {
					return false;
				}
			}();
			var events = viewStructure.isToolbar ? A2(
				$author$project$SvgDraw$svgClickEvents,
				A2(
					$author$project$Model$SpawnBlock,
					call.functionName,
					A2($author$project$SvgDraw$blockMouseOffset, call, viewStructure)),
				A2(
					$author$project$Model$SpawnBlock,
					call.functionName,
					A2($author$project$SvgDraw$blockMouseOffset, call, viewStructure))) : A2(
				$author$project$SvgDraw$svgClickEvents,
				$author$project$Model$OutputClick(call.id),
				$author$project$Model$OutputRightClick(call.id));
			return A6(
				$author$project$SvgDraw$drawNode,
				blockPos.xpos,
				_Utils_Tuple2(((blockPos.width / 2) | 0) - $author$project$ViewVariables$nodeRadius, $author$project$ViewVariables$nodeRadius * 2),
				$author$project$ViewVariables$outputNodeY + blockPos.ypos,
				events,
				isOutputHighlighted,
				false);
		} else {
			return $author$project$SvgDraw$errorSvgNode('Call without a block position when drawing endings');
		}
	});
var $author$project$DrawFunc$drawFuncEndings = F2(
	function (func, viewStructure) {
		if (!func.b) {
			return _List_Nil;
		} else {
			var call = func.a;
			var calls = func.b;
			return A2(
				$elm$core$List$cons,
				A2($author$project$DrawFunc$drawCallEnding, call, viewStructure),
				A2($author$project$DrawFunc$drawFuncEndings, calls, viewStructure));
		}
	});
var $author$project$Model$OutputHighlight = function (a) {
	return {$: 'OutputHighlight', a: a};
};
var $author$project$Model$BlockNameHighlight = function (a) {
	return {$: 'BlockNameHighlight', a: a};
};
var $author$project$Model$BlockNameUpdate = F2(
	function (a, b) {
		return {$: 'BlockNameUpdate', a: a, b: b};
	});
var $author$project$Model$BlockNameClick = F3(
	function (a, b, c) {
		return {$: 'BlockNameClick', a: a, b: b, c: c};
	});
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$svg$Svg$Events$on = $elm$html$Html$Events$on;
var $author$project$SvgDraw$svgClickWithDefault = F2(
	function (leftClickEvent, rightClickEvent) {
		return _List_fromArray(
			[
				A2(
				$elm$svg$Svg$Events$preventDefaultOn,
				'contextmenu',
				A2(
					$elm$json$Json$Decode$map,
					$author$project$SvgDraw$alwaysPreventDefault,
					$elm$json$Json$Decode$succeed($author$project$Model$NoOp))),
				A2(
				$elm$svg$Svg$Events$on,
				'mousedown',
				A2($author$project$SvgDraw$checkLeftDecoder, leftClickEvent, rightClickEvent))
			]);
	});
var $author$project$SvgDraw$blockNameEvents = F2(
	function (call, viewStructure) {
		var coordinates = A2($author$project$SvgDraw$blockMouseOffset, call, viewStructure);
		return viewStructure.isToolbar ? A2(
			$author$project$SvgDraw$svgClickEvents,
			A2($author$project$Model$SpawnBlock, call.functionName, coordinates),
			A2($author$project$Model$SpawnBlock, call.functionName, coordinates)) : A2(
			$author$project$SvgDraw$svgClickWithDefault,
			A3($author$project$Model$BlockNameClick, call, viewStructure.id, coordinates),
			A3($author$project$Model$BlockNameClick, call, viewStructure.id, coordinates));
	});
var $author$project$ViewVariables$blockTextInputHeight = $author$project$ViewVariables$blockHeight - (4 * $author$project$ViewVariables$nodeRadius);
var $author$project$ViewVariables$blockTextInputYpos = $author$project$ViewVariables$nodeRadius * 2;
var $author$project$ViewVariables$charOverestimatePercent = 0.6;
var $author$project$ViewVariables$inputFontSizePercent = 0.80;
var $author$project$ViewVariables$blockCharacterOverestimate = ($author$project$ViewVariables$blockTextInputHeight * $author$project$ViewVariables$inputFontSizePercent) * $author$project$ViewVariables$charOverestimatePercent;
var $author$project$ViewVariables$blockTextXPadding = $elm$core$Basics$floor($author$project$ViewVariables$blockCharacterOverestimate);
var $rtfeldman$elm_css$Css$Structure$Compatible = {$: 'Compatible'};
var $rtfeldman$elm_css$Css$absolute = {position: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'absolute'};
var $rtfeldman$elm_css$Css$Preprocess$AppendProperty = function (a) {
	return {$: 'AppendProperty', a: a};
};
var $rtfeldman$elm_css$Css$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
	});
var $rtfeldman$elm_css$Css$backgroundColor = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'background-color', c.value);
};
var $rtfeldman$elm_css$Css$prop1 = F2(
	function (key, arg) {
		return A2($rtfeldman$elm_css$Css$property, key, arg.value);
	});
var $rtfeldman$elm_css$Css$border = $rtfeldman$elm_css$Css$prop1('border');
var $rtfeldman$elm_css$Css$borderBox = {backgroundClip: $rtfeldman$elm_css$Css$Structure$Compatible, boxSizing: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'border-box'};
var $rtfeldman$elm_css$Css$boxSizing = $rtfeldman$elm_css$Css$prop1('box-sizing');
var $rtfeldman$elm_css$Css$center = $rtfeldman$elm_css$Css$prop1('center');
var $rtfeldman$elm_css$VirtualDom$Styled$Attribute = F3(
	function (a, b, c) {
		return {$: 'Attribute', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence = function (a) {
	return {$: 'UniversalSelectorSequence', a: a};
};
var $elm$core$Basics$not = _Basics_not;
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $rtfeldman$elm_css$Css$Structure$compactHelp = F2(
	function (declaration, _v0) {
		var keyframesByName = _v0.a;
		var declarations = _v0.b;
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var _v2 = declaration.a;
				var properties = _v2.c;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'MediaRule':
				var styleBlocks = declaration.b;
				return A2(
					$elm$core$List$all,
					function (_v3) {
						var properties = _v3.c;
						return $elm$core$List$isEmpty(properties);
					},
					styleBlocks) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'SupportsRule':
				var otherDeclarations = declaration.b;
				return $elm$core$List$isEmpty(otherDeclarations) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'DocumentRule':
				return _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'PageRule':
				var properties = declaration.b;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'FontFace':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'Keyframes':
				var record = declaration.a;
				return $elm$core$String$isEmpty(record.declaration) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					A3($elm$core$Dict$insert, record.name, record.declaration, keyframesByName),
					declarations);
			case 'Viewport':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'CounterStyle':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			default:
				var tuples = declaration.a;
				return A2(
					$elm$core$List$all,
					function (_v4) {
						var properties = _v4.b;
						return $elm$core$List$isEmpty(properties);
					},
					tuples) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
		}
	});
var $rtfeldman$elm_css$Css$Structure$Keyframes = function (a) {
	return {$: 'Keyframes', a: a};
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations = F2(
	function (keyframesByName, compactedDeclarations) {
		return A2(
			$elm$core$List$append,
			A2(
				$elm$core$List$map,
				function (_v0) {
					var name = _v0.a;
					var decl = _v0.b;
					return $rtfeldman$elm_css$Css$Structure$Keyframes(
						{declaration: decl, name: name});
				},
				$elm$core$Dict$toList(keyframesByName)),
			compactedDeclarations);
	});
var $rtfeldman$elm_css$Css$Structure$compactStylesheet = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var declarations = _v0.declarations;
	var _v1 = A3(
		$elm$core$List$foldr,
		$rtfeldman$elm_css$Css$Structure$compactHelp,
		_Utils_Tuple2($elm$core$Dict$empty, _List_Nil),
		declarations);
	var keyframesByName = _v1.a;
	var compactedDeclarations = _v1.b;
	var finalDeclarations = A2($rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations, keyframesByName, compactedDeclarations);
	return {charset: charset, declarations: finalDeclarations, imports: imports, namespaces: namespaces};
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $rtfeldman$elm_css$Css$Structure$Output$charsetToString = function (charset) {
	return A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			function (str) {
				return '@charset \"' + (str + '\"');
			},
			charset));
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString = function (expression) {
	return '(' + (expression.feature + (A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			$elm$core$Basics$append(': '),
			expression.value)) + ')'));
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString = function (mediaType) {
	switch (mediaType.$) {
		case 'Print':
			return 'print';
		case 'Screen':
			return 'screen';
		default:
			return 'speech';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString = function (mediaQuery) {
	var prefixWith = F3(
		function (str, mediaType, expressions) {
			return str + (' ' + A2(
				$elm$core$String$join,
				' and ',
				A2(
					$elm$core$List$cons,
					$rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString(mediaType),
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions))));
		});
	switch (mediaQuery.$) {
		case 'AllQuery':
			var expressions = mediaQuery.a;
			return A2(
				$elm$core$String$join,
				' and ',
				A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions));
		case 'OnlyQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'only', mediaType, expressions);
		case 'NotQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'not', mediaType, expressions);
		default:
			var str = mediaQuery.a;
			return str;
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString = F2(
	function (name, mediaQuery) {
		return '@import \"' + (name + ($rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString(mediaQuery) + '\"'));
	});
var $rtfeldman$elm_css$Css$Structure$Output$importToString = function (_v0) {
	var name = _v0.a;
	var mediaQueries = _v0.b;
	return A2(
		$elm$core$String$join,
		'\n',
		A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString(name),
			mediaQueries));
};
var $rtfeldman$elm_css$Css$Structure$Output$namespaceToString = function (_v0) {
	var prefix = _v0.a;
	var str = _v0.b;
	return '@namespace ' + (prefix + ('\"' + (str + '\"')));
};
var $rtfeldman$elm_css$Css$Structure$Output$spaceIndent = '    ';
var $rtfeldman$elm_css$Css$Structure$Output$indent = function (str) {
	return _Utils_ap($rtfeldman$elm_css$Css$Structure$Output$spaceIndent, str);
};
var $rtfeldman$elm_css$Css$Structure$Output$noIndent = '';
var $rtfeldman$elm_css$Css$Structure$Output$emitProperty = function (str) {
	return str + ';';
};
var $rtfeldman$elm_css$Css$Structure$Output$emitProperties = function (properties) {
	return A2(
		$elm$core$String$join,
		'\n',
		A2(
			$elm$core$List$map,
			A2($elm$core$Basics$composeL, $rtfeldman$elm_css$Css$Structure$Output$indent, $rtfeldman$elm_css$Css$Structure$Output$emitProperty),
			properties));
};
var $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString = function (_v0) {
	var str = _v0.a;
	return '::' + str;
};
var $rtfeldman$elm_css$Css$Structure$Output$combinatorToString = function (combinator) {
	switch (combinator.$) {
		case 'AdjacentSibling':
			return '+';
		case 'GeneralSibling':
			return '~';
		case 'Child':
			return '>';
		default:
			return '';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString = function (repeatableSimpleSelector) {
	switch (repeatableSimpleSelector.$) {
		case 'ClassSelector':
			var str = repeatableSimpleSelector.a;
			return '.' + str;
		case 'IdSelector':
			var str = repeatableSimpleSelector.a;
			return '#' + str;
		case 'PseudoClassSelector':
			var str = repeatableSimpleSelector.a;
			return ':' + str;
		default:
			var str = repeatableSimpleSelector.a;
			return '[' + (str + ']');
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString = function (simpleSelectorSequence) {
	switch (simpleSelectorSequence.$) {
		case 'TypeSelectorSequence':
			var str = simpleSelectorSequence.a.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$cons,
					str,
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
		case 'UniversalSelectorSequence':
			var repeatableSimpleSelectors = simpleSelectorSequence.a;
			return $elm$core$List$isEmpty(repeatableSimpleSelectors) ? '*' : A2(
				$elm$core$String$join,
				'',
				A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors));
		default:
			var str = simpleSelectorSequence.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$cons,
					str,
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$selectorChainToString = function (_v0) {
	var combinator = _v0.a;
	var sequence = _v0.b;
	return A2(
		$elm$core$String$join,
		' ',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Structure$Output$combinatorToString(combinator),
				$rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(sequence)
			]));
};
var $rtfeldman$elm_css$Css$Structure$Output$selectorToString = function (_v0) {
	var simpleSelectorSequence = _v0.a;
	var chain = _v0.b;
	var pseudoElement = _v0.c;
	var segments = A2(
		$elm$core$List$cons,
		$rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(simpleSelectorSequence),
		A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$selectorChainToString, chain));
	var pseudoElementsString = A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			[
				A2(
				$elm$core$Maybe$withDefault,
				'',
				A2($elm$core$Maybe$map, $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString, pseudoElement))
			]));
	return A2(
		$elm$core$String$append,
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$filter,
				A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
				segments)),
		pseudoElementsString);
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock = F2(
	function (indentLevel, _v0) {
		var firstSelector = _v0.a;
		var otherSelectors = _v0.b;
		var properties = _v0.c;
		var selectorStr = A2(
			$elm$core$String$join,
			', ',
			A2(
				$elm$core$List$map,
				$rtfeldman$elm_css$Css$Structure$Output$selectorToString,
				A2($elm$core$List$cons, firstSelector, otherSelectors)));
		return A2(
			$elm$core$String$join,
			'',
			_List_fromArray(
				[
					selectorStr,
					' {\n',
					indentLevel,
					$rtfeldman$elm_css$Css$Structure$Output$emitProperties(properties),
					'\n',
					indentLevel,
					'}'
				]));
	});
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration = function (decl) {
	switch (decl.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = decl.a;
			return A2($rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock, $rtfeldman$elm_css$Css$Structure$Output$noIndent, styleBlock);
		case 'MediaRule':
			var mediaQueries = decl.a;
			var styleBlocks = decl.b;
			var query = A2(
				$elm$core$String$join,
				',\n',
				A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString, mediaQueries));
			var blocks = A2(
				$elm$core$String$join,
				'\n\n',
				A2(
					$elm$core$List$map,
					A2(
						$elm$core$Basics$composeL,
						$rtfeldman$elm_css$Css$Structure$Output$indent,
						$rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock($rtfeldman$elm_css$Css$Structure$Output$spaceIndent)),
					styleBlocks));
			return '@media ' + (query + (' {\n' + (blocks + '\n}')));
		case 'SupportsRule':
			return 'TODO';
		case 'DocumentRule':
			return 'TODO';
		case 'PageRule':
			return 'TODO';
		case 'FontFace':
			return 'TODO';
		case 'Keyframes':
			var name = decl.a.name;
			var declaration = decl.a.declaration;
			return '@keyframes ' + (name + (' {\n' + (declaration + '\n}')));
		case 'Viewport':
			return 'TODO';
		case 'CounterStyle':
			return 'TODO';
		default:
			return 'TODO';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrint = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var declarations = _v0.declarations;
	return A2(
		$elm$core$String$join,
		'\n\n',
		A2(
			$elm$core$List$filter,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$Output$charsetToString(charset),
					A2(
					$elm$core$String$join,
					'\n',
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$importToString, imports)),
					A2(
					$elm$core$String$join,
					'\n',
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$namespaceToString, namespaces)),
					A2(
					$elm$core$String$join,
					'\n\n',
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration, declarations))
				])));
};
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $rtfeldman$elm_css$Css$Structure$CounterStyle = function (a) {
	return {$: 'CounterStyle', a: a};
};
var $rtfeldman$elm_css$Css$Structure$FontFace = function (a) {
	return {$: 'FontFace', a: a};
};
var $rtfeldman$elm_css$Css$Structure$PageRule = F2(
	function (a, b) {
		return {$: 'PageRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$Selector = F3(
	function (a, b, c) {
		return {$: 'Selector', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var $rtfeldman$elm_css$Css$Structure$SupportsRule = F2(
	function (a, b) {
		return {$: 'SupportsRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$Viewport = function (a) {
	return {$: 'Viewport', a: a};
};
var $rtfeldman$elm_css$Css$Structure$MediaRule = F2(
	function (a, b) {
		return {$: 'MediaRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$mapLast = F2(
	function (update, list) {
		if (!list.b) {
			return list;
		} else {
			if (!list.b.b) {
				var only = list.a;
				return _List_fromArray(
					[
						update(only)
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$mapLast, update, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$withPropertyAppended = F2(
	function (property, _v0) {
		var firstSelector = _v0.a;
		var otherSelectors = _v0.b;
		var properties = _v0.c;
		return A3(
			$rtfeldman$elm_css$Css$Structure$StyleBlock,
			firstSelector,
			otherSelectors,
			_Utils_ap(
				properties,
				_List_fromArray(
					[property])));
	});
var $rtfeldman$elm_css$Css$Structure$appendProperty = F2(
	function (property, declarations) {
		if (!declarations.b) {
			return declarations;
		} else {
			if (!declarations.b.b) {
				switch (declarations.a.$) {
					case 'StyleBlockDeclaration':
						var styleBlock = declarations.a.a;
						return _List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
								A2($rtfeldman$elm_css$Css$Structure$withPropertyAppended, property, styleBlock))
							]);
					case 'MediaRule':
						var _v1 = declarations.a;
						var mediaQueries = _v1.a;
						var styleBlocks = _v1.b;
						return _List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Css$Structure$MediaRule,
								mediaQueries,
								A2(
									$rtfeldman$elm_css$Css$Structure$mapLast,
									$rtfeldman$elm_css$Css$Structure$withPropertyAppended(property),
									styleBlocks))
							]);
					default:
						return declarations;
				}
			} else {
				var first = declarations.a;
				var rest = declarations.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendToLastSelector = F2(
	function (f, styleBlock) {
		if (!styleBlock.b.b) {
			var only = styleBlock.a;
			var properties = styleBlock.c;
			return _List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, only, _List_Nil, properties),
					A3(
					$rtfeldman$elm_css$Css$Structure$StyleBlock,
					f(only),
					_List_Nil,
					_List_Nil)
				]);
		} else {
			var first = styleBlock.a;
			var rest = styleBlock.b;
			var properties = styleBlock.c;
			var newRest = A2($elm$core$List$map, f, rest);
			var newFirst = f(first);
			return _List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, first, rest, properties),
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, newFirst, newRest, _List_Nil)
				]);
		}
	});
var $rtfeldman$elm_css$Css$Structure$applyPseudoElement = F2(
	function (pseudo, _v0) {
		var sequence = _v0.a;
		var selectors = _v0.b;
		return A3(
			$rtfeldman$elm_css$Css$Structure$Selector,
			sequence,
			selectors,
			$elm$core$Maybe$Just(pseudo));
	});
var $rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector = F2(
	function (pseudo, styleBlock) {
		return A2(
			$rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			$rtfeldman$elm_css$Css$Structure$applyPseudoElement(pseudo),
			styleBlock);
	});
var $rtfeldman$elm_css$Css$Structure$CustomSelector = F2(
	function (a, b) {
		return {$: 'CustomSelector', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$TypeSelectorSequence = F2(
	function (a, b) {
		return {$: 'TypeSelectorSequence', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatable = F2(
	function (selector, sequence) {
		switch (sequence.$) {
			case 'TypeSelectorSequence':
				var typeSelector = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$TypeSelectorSequence,
					typeSelector,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			case 'UniversalSelectorSequence':
				var list = sequence.a;
				return $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			default:
				var str = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$CustomSelector,
					str,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator = F2(
	function (selector, list) {
		if (!list.b) {
			return _List_Nil;
		} else {
			if (!list.b.b) {
				var _v1 = list.a;
				var combinator = _v1.a;
				var sequence = _v1.b;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						combinator,
						A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, selector, sequence))
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, selector, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableSelector = F2(
	function (repeatableSimpleSelector, selector) {
		if (!selector.b.b) {
			var sequence = selector.a;
			var pseudoElement = selector.c;
			return A3(
				$rtfeldman$elm_css$Css$Structure$Selector,
				A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, repeatableSimpleSelector, sequence),
				_List_Nil,
				pseudoElement);
		} else {
			var firstSelector = selector.a;
			var tuples = selector.b;
			var pseudoElement = selector.c;
			return A3(
				$rtfeldman$elm_css$Css$Structure$Selector,
				firstSelector,
				A2($rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, repeatableSimpleSelector, tuples),
				pseudoElement);
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector = F2(
	function (selector, styleBlock) {
		return A2(
			$rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			$rtfeldman$elm_css$Css$Structure$appendRepeatableSelector(selector),
			styleBlock);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors = function (declarations) {
	collectSelectors:
	while (true) {
		if (!declarations.b) {
			return _List_Nil;
		} else {
			if (declarations.a.$ === 'StyleBlockDeclaration') {
				var _v1 = declarations.a.a;
				var firstSelector = _v1.a;
				var otherSelectors = _v1.b;
				var rest = declarations.b;
				return _Utils_ap(
					A2($elm$core$List$cons, firstSelector, otherSelectors),
					$rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(rest));
			} else {
				var rest = declarations.b;
				var $temp$declarations = rest;
				declarations = $temp$declarations;
				continue collectSelectors;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Structure$DocumentRule = F5(
	function (a, b, c, d, e) {
		return {$: 'DocumentRule', a: a, b: b, c: c, d: d, e: e};
	});
var $rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock = F2(
	function (update, declarations) {
		_v0$12:
		while (true) {
			if (!declarations.b) {
				return declarations;
			} else {
				if (!declarations.b.b) {
					switch (declarations.a.$) {
						case 'StyleBlockDeclaration':
							var styleBlock = declarations.a.a;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration,
								update(styleBlock));
						case 'MediaRule':
							if (declarations.a.b.b) {
								if (!declarations.a.b.b.b) {
									var _v1 = declarations.a;
									var mediaQueries = _v1.a;
									var _v2 = _v1.b;
									var styleBlock = _v2.a;
									return _List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Css$Structure$MediaRule,
											mediaQueries,
											update(styleBlock))
										]);
								} else {
									var _v3 = declarations.a;
									var mediaQueries = _v3.a;
									var _v4 = _v3.b;
									var first = _v4.a;
									var rest = _v4.b;
									var _v5 = A2(
										$rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock,
										update,
										_List_fromArray(
											[
												A2($rtfeldman$elm_css$Css$Structure$MediaRule, mediaQueries, rest)
											]));
									if ((_v5.b && (_v5.a.$ === 'MediaRule')) && (!_v5.b.b)) {
										var _v6 = _v5.a;
										var newMediaQueries = _v6.a;
										var newStyleBlocks = _v6.b;
										return _List_fromArray(
											[
												A2(
												$rtfeldman$elm_css$Css$Structure$MediaRule,
												newMediaQueries,
												A2($elm$core$List$cons, first, newStyleBlocks))
											]);
									} else {
										var newDeclarations = _v5;
										return newDeclarations;
									}
								}
							} else {
								break _v0$12;
							}
						case 'SupportsRule':
							var _v7 = declarations.a;
							var str = _v7.a;
							var nestedDeclarations = _v7.b;
							return _List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Css$Structure$SupportsRule,
									str,
									A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, nestedDeclarations))
								]);
						case 'DocumentRule':
							var _v8 = declarations.a;
							var str1 = _v8.a;
							var str2 = _v8.b;
							var str3 = _v8.c;
							var str4 = _v8.d;
							var styleBlock = _v8.e;
							return A2(
								$elm$core$List$map,
								A4($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4),
								update(styleBlock));
						case 'PageRule':
							var _v9 = declarations.a;
							return declarations;
						case 'FontFace':
							return declarations;
						case 'Keyframes':
							return declarations;
						case 'Viewport':
							return declarations;
						case 'CounterStyle':
							return declarations;
						default:
							return declarations;
					}
				} else {
					break _v0$12;
				}
			}
		}
		var first = declarations.a;
		var rest = declarations.b;
		return A2(
			$elm$core$List$cons,
			first,
			A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, rest));
	});
var $Skinney$murmur3$Murmur3$HashData = F4(
	function (shift, seed, hash, charsProcessed) {
		return {charsProcessed: charsProcessed, hash: hash, seed: seed, shift: shift};
	});
var $Skinney$murmur3$Murmur3$c1 = 3432918353;
var $Skinney$murmur3$Murmur3$c2 = 461845907;
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $Skinney$murmur3$Murmur3$multiplyBy = F2(
	function (b, a) {
		return ((a & 65535) * b) + ((((a >>> 16) * b) & 65535) << 16);
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Bitwise$or = _Bitwise_or;
var $Skinney$murmur3$Murmur3$rotlBy = F2(
	function (b, a) {
		return (a << b) | (a >>> (32 - b));
	});
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $Skinney$murmur3$Murmur3$finalize = function (data) {
	var acc = (!(!data.hash)) ? (data.seed ^ A2(
		$Skinney$murmur3$Murmur3$multiplyBy,
		$Skinney$murmur3$Murmur3$c2,
		A2(
			$Skinney$murmur3$Murmur3$rotlBy,
			15,
			A2($Skinney$murmur3$Murmur3$multiplyBy, $Skinney$murmur3$Murmur3$c1, data.hash)))) : data.seed;
	var h0 = acc ^ data.charsProcessed;
	var h1 = A2($Skinney$murmur3$Murmur3$multiplyBy, 2246822507, h0 ^ (h0 >>> 16));
	var h2 = A2($Skinney$murmur3$Murmur3$multiplyBy, 3266489909, h1 ^ (h1 >>> 13));
	return (h2 ^ (h2 >>> 16)) >>> 0;
};
var $elm$core$String$foldl = _String_foldl;
var $Skinney$murmur3$Murmur3$mix = F2(
	function (h1, k1) {
		return A2(
			$Skinney$murmur3$Murmur3$multiplyBy,
			5,
			A2(
				$Skinney$murmur3$Murmur3$rotlBy,
				13,
				h1 ^ A2(
					$Skinney$murmur3$Murmur3$multiplyBy,
					$Skinney$murmur3$Murmur3$c2,
					A2(
						$Skinney$murmur3$Murmur3$rotlBy,
						15,
						A2($Skinney$murmur3$Murmur3$multiplyBy, $Skinney$murmur3$Murmur3$c1, k1))))) + 3864292196;
	});
var $Skinney$murmur3$Murmur3$hashFold = F2(
	function (c, data) {
		var res = data.hash | ((255 & $elm$core$Char$toCode(c)) << data.shift);
		var _v0 = data.shift;
		if (_v0 === 24) {
			return {
				charsProcessed: data.charsProcessed + 1,
				hash: 0,
				seed: A2($Skinney$murmur3$Murmur3$mix, data.seed, res),
				shift: 0
			};
		} else {
			return {charsProcessed: data.charsProcessed + 1, hash: res, seed: data.seed, shift: data.shift + 8};
		}
	});
var $Skinney$murmur3$Murmur3$hashString = F2(
	function (seed, str) {
		return $Skinney$murmur3$Murmur3$finalize(
			A3(
				$elm$core$String$foldl,
				$Skinney$murmur3$Murmur3$hashFold,
				A4($Skinney$murmur3$Murmur3$HashData, 0, seed, 0, 0),
				str));
	});
var $rtfeldman$elm_css$Hash$murmurSeed = 15739;
var $elm$core$String$fromList = _String_fromList;
var $elm$core$Basics$modBy = _Basics_modBy;
var $rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
	unsafeToDigit:
	while (true) {
		switch (num) {
			case 0:
				return _Utils_chr('0');
			case 1:
				return _Utils_chr('1');
			case 2:
				return _Utils_chr('2');
			case 3:
				return _Utils_chr('3');
			case 4:
				return _Utils_chr('4');
			case 5:
				return _Utils_chr('5');
			case 6:
				return _Utils_chr('6');
			case 7:
				return _Utils_chr('7');
			case 8:
				return _Utils_chr('8');
			case 9:
				return _Utils_chr('9');
			case 10:
				return _Utils_chr('a');
			case 11:
				return _Utils_chr('b');
			case 12:
				return _Utils_chr('c');
			case 13:
				return _Utils_chr('d');
			case 14:
				return _Utils_chr('e');
			case 15:
				return _Utils_chr('f');
			default:
				var $temp$num = num;
				num = $temp$num;
				continue unsafeToDigit;
		}
	}
};
var $rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (num < 16) {
				return A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(num),
					digits);
			} else {
				var $temp$digits = A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(
						A2($elm$core$Basics$modBy, 16, num)),
					digits),
					$temp$num = (num / 16) | 0;
				digits = $temp$digits;
				num = $temp$num;
				continue unsafePositiveToDigits;
			}
		}
	});
var $rtfeldman$elm_hex$Hex$toString = function (num) {
	return $elm$core$String$fromList(
		(num < 0) ? A2(
			$elm$core$List$cons,
			_Utils_chr('-'),
			A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var $rtfeldman$elm_css$Hash$fromString = function (str) {
	return A2(
		$elm$core$String$cons,
		_Utils_chr('_'),
		$rtfeldman$elm_hex$Hex$toString(
			A2($Skinney$murmur3$Murmur3$hashString, $rtfeldman$elm_css$Hash$murmurSeed, str)));
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$last = function (list) {
	last:
	while (true) {
		if (!list.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!list.b.b) {
				var singleton = list.a;
				return $elm$core$Maybe$Just(singleton);
			} else {
				var rest = list.b;
				var $temp$list = rest;
				list = $temp$list;
				continue last;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration = function (declarations) {
	lastDeclaration:
	while (true) {
		if (!declarations.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!declarations.b.b) {
				var x = declarations.a;
				return $elm$core$Maybe$Just(
					_List_fromArray(
						[x]));
			} else {
				var xs = declarations.b;
				var $temp$declarations = xs;
				declarations = $temp$declarations;
				continue lastDeclaration;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf = function (maybes) {
	oneOf:
	while (true) {
		if (!maybes.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var maybe = maybes.a;
			var rest = maybes.b;
			if (maybe.$ === 'Nothing') {
				var $temp$maybes = rest;
				maybes = $temp$maybes;
				continue oneOf;
			} else {
				return maybe;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Structure$FontFeatureValues = function (a) {
	return {$: 'FontFeatureValues', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues = function (tuples) {
	var expandTuples = function (tuplesToExpand) {
		if (!tuplesToExpand.b) {
			return _List_Nil;
		} else {
			var properties = tuplesToExpand.a;
			var rest = tuplesToExpand.b;
			return A2(
				$elm$core$List$cons,
				properties,
				expandTuples(rest));
		}
	};
	var newTuples = expandTuples(tuples);
	return _List_fromArray(
		[
			$rtfeldman$elm_css$Css$Structure$FontFeatureValues(newTuples)
		]);
};
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule = F2(
	function (mediaQueries, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var styleBlock = declaration.a;
			return A2(
				$rtfeldman$elm_css$Css$Structure$MediaRule,
				mediaQueries,
				_List_fromArray(
					[styleBlock]));
		} else {
			return declaration;
		}
	});
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule = F5(
	function (str1, str2, str3, str4, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var structureStyleBlock = declaration.a;
			return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
		} else {
			return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule = F2(
	function (mediaQueries, declaration) {
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var structureStyleBlock = declaration.a;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					mediaQueries,
					_List_fromArray(
						[structureStyleBlock]));
			case 'MediaRule':
				var newMediaQueries = declaration.a;
				var structureStyleBlocks = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					_Utils_ap(mediaQueries, newMediaQueries),
					structureStyleBlocks);
			case 'SupportsRule':
				var str = declaration.a;
				var declarations = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$SupportsRule,
					str,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
						declarations));
			case 'DocumentRule':
				var str1 = declaration.a;
				var str2 = declaration.b;
				var str3 = declaration.c;
				var str4 = declaration.d;
				var structureStyleBlock = declaration.e;
				return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
			case 'PageRule':
				return declaration;
			case 'FontFace':
				return declaration;
			case 'Keyframes':
				return declaration;
			case 'Viewport':
				return declaration;
			case 'CounterStyle':
				return declaration;
			default:
				return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet = function (_v0) {
	var declarations = _v0.a;
	return declarations;
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast = F4(
	function (nestedStyles, rest, f, declarations) {
		var withoutParent = function (decls) {
			return A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$elm$core$List$tail(decls));
		};
		var nextResult = A2(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
			rest,
			A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		var newDeclarations = function () {
			var _v14 = _Utils_Tuple2(
				$elm$core$List$head(nextResult),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$last(declarations));
			if ((_v14.a.$ === 'Just') && (_v14.b.$ === 'Just')) {
				var nextResultParent = _v14.a.a;
				var originalParent = _v14.b.a;
				return _Utils_ap(
					A2(
						$elm$core$List$take,
						$elm$core$List$length(declarations) - 1,
						declarations),
					_List_fromArray(
						[
							(!_Utils_eq(originalParent, nextResultParent)) ? nextResultParent : originalParent
						]));
			} else {
				return declarations;
			}
		}();
		var insertStylesToNestedDecl = function (lastDecl) {
			return $elm$core$List$concat(
				A2(
					$rtfeldman$elm_css$Css$Structure$mapLast,
					$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles(nestedStyles),
					A2(
						$elm$core$List$map,
						$elm$core$List$singleton,
						A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, f, lastDecl))));
		};
		var initialResult = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				$elm$core$Maybe$map,
				insertStylesToNestedDecl,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		return _Utils_ap(
			newDeclarations,
			_Utils_ap(
				withoutParent(initialResult),
				withoutParent(nextResult)));
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles = F2(
	function (styles, declarations) {
		if (!styles.b) {
			return declarations;
		} else {
			switch (styles.a.$) {
				case 'AppendProperty':
					var property = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, declarations));
				case 'ExtendSelector':
					var _v4 = styles.a;
					var selector = _v4.a;
					var nestedStyles = _v4.b;
					var rest = styles.b;
					return A4(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector(selector),
						declarations);
				case 'NestSnippet':
					var _v5 = styles.a;
					var selectorCombinator = _v5.a;
					var snippets = _v5.b;
					var rest = styles.b;
					var chain = F2(
						function (_v9, _v10) {
							var originalSequence = _v9.a;
							var originalTuples = _v9.b;
							var originalPseudoElement = _v9.c;
							var newSequence = _v10.a;
							var newTuples = _v10.b;
							var newPseudoElement = _v10.c;
							return A3(
								$rtfeldman$elm_css$Css$Structure$Selector,
								originalSequence,
								_Utils_ap(
									originalTuples,
									A2(
										$elm$core$List$cons,
										_Utils_Tuple2(selectorCombinator, newSequence),
										newTuples)),
								$rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf(
									_List_fromArray(
										[newPseudoElement, originalPseudoElement])));
						});
					var expandDeclaration = function (declaration) {
						switch (declaration.$) {
							case 'StyleBlockDeclaration':
								var _v7 = declaration.a;
								var firstSelector = _v7.a;
								var otherSelectors = _v7.b;
								var nestedStyles = _v7.c;
								var newSelectors = A2(
									$elm$core$List$concatMap,
									function (originalSelector) {
										return A2(
											$elm$core$List$map,
											chain(originalSelector),
											A2($elm$core$List$cons, firstSelector, otherSelectors));
									},
									$rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations));
								var newDeclarations = function () {
									if (!newSelectors.b) {
										return _List_Nil;
									} else {
										var first = newSelectors.a;
										var remainder = newSelectors.b;
										return _List_fromArray(
											[
												$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
												A3($rtfeldman$elm_css$Css$Structure$StyleBlock, first, remainder, _List_Nil))
											]);
									}
								}();
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, nestedStyles, newDeclarations);
							case 'MediaRule':
								var mediaQueries = declaration.a;
								var styleBlocks = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
							case 'SupportsRule':
								var str = declaration.a;
								var otherSnippets = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, otherSnippets);
							case 'DocumentRule':
								var str1 = declaration.a;
								var str2 = declaration.b;
								var str3 = declaration.c;
								var str4 = declaration.d;
								var styleBlock = declaration.e;
								return A2(
									$elm$core$List$map,
									A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
									$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
							case 'PageRule':
								var str = declaration.a;
								var properties = declaration.b;
								return _List_fromArray(
									[
										A2($rtfeldman$elm_css$Css$Structure$PageRule, str, properties)
									]);
							case 'FontFace':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$FontFace(properties)
									]);
							case 'Viewport':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$Viewport(properties)
									]);
							case 'CounterStyle':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
									]);
							default:
								var tuples = declaration.a;
								return $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
						}
					};
					return $elm$core$List$concat(
						_Utils_ap(
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations)
								]),
							A2(
								$elm$core$List$map,
								expandDeclaration,
								A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets))));
				case 'WithPseudoElement':
					var _v11 = styles.a;
					var pseudoElement = _v11.a;
					var nestedStyles = _v11.b;
					var rest = styles.b;
					return A4(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector(pseudoElement),
						declarations);
				case 'WithKeyframes':
					var str = styles.a.a;
					var rest = styles.b;
					var name = $rtfeldman$elm_css$Hash$fromString(str);
					var newProperty = 'animation-name:' + name;
					var newDeclarations = A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, newProperty, declarations));
					return A2(
						$elm$core$List$append,
						newDeclarations,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$Keyframes(
								{declaration: str, name: name})
							]));
				case 'WithMedia':
					var _v12 = styles.a;
					var mediaQueries = _v12.a;
					var nestedStyles = _v12.b;
					var rest = styles.b;
					var extraDeclarations = function () {
						var _v13 = $rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations);
						if (!_v13.b) {
							return _List_Nil;
						} else {
							var firstSelector = _v13.a;
							var otherSelectors = _v13.b;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule(mediaQueries),
								A2(
									$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
									nestedStyles,
									$elm$core$List$singleton(
										$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
											A3($rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil)))));
						}
					}();
					return _Utils_ap(
						A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations),
						extraDeclarations);
				default:
					var otherStyles = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						_Utils_ap(otherStyles, rest),
						declarations);
			}
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock = function (_v2) {
	var firstSelector = _v2.a;
	var otherSelectors = _v2.b;
	var styles = _v2.c;
	return A2(
		$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
		styles,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
				A3($rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil))
			]));
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$extract = function (snippetDeclarations) {
	if (!snippetDeclarations.b) {
		return _List_Nil;
	} else {
		var first = snippetDeclarations.a;
		var rest = snippetDeclarations.b;
		return _Utils_ap(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations(first),
			$rtfeldman$elm_css$Css$Preprocess$Resolve$extract(rest));
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule = F2(
	function (mediaQueries, styleBlocks) {
		var handleStyleBlock = function (styleBlock) {
			return A2(
				$elm$core$List$map,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		};
		return A2($elm$core$List$concatMap, handleStyleBlock, styleBlocks);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule = F2(
	function (str, snippets) {
		var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
			A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
		return _List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$Structure$SupportsRule, str, declarations)
			]);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations = function (snippetDeclaration) {
	switch (snippetDeclaration.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock);
		case 'MediaRule':
			var mediaQueries = snippetDeclaration.a;
			var styleBlocks = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
		case 'SupportsRule':
			var str = snippetDeclaration.a;
			var snippets = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, snippets);
		case 'DocumentRule':
			var str1 = snippetDeclaration.a;
			var str2 = snippetDeclaration.b;
			var str3 = snippetDeclaration.c;
			var str4 = snippetDeclaration.d;
			var styleBlock = snippetDeclaration.e;
			return A2(
				$elm$core$List$map,
				A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		case 'PageRule':
			var str = snippetDeclaration.a;
			var properties = snippetDeclaration.b;
			return _List_fromArray(
				[
					A2($rtfeldman$elm_css$Css$Structure$PageRule, str, properties)
				]);
		case 'FontFace':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$FontFace(properties)
				]);
		case 'Viewport':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$Viewport(properties)
				]);
		case 'CounterStyle':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
				]);
		default:
			var tuples = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var snippets = _v0.snippets;
	var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
		A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
	return {charset: charset, declarations: declarations, imports: imports, namespaces: namespaces};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$compileHelp = function (sheet) {
	return $rtfeldman$elm_css$Css$Structure$Output$prettyPrint(
		$rtfeldman$elm_css$Css$Structure$compactStylesheet(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure(sheet)));
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$compile = function (styles) {
	return A2(
		$elm$core$String$join,
		'\n\n',
		A2($elm$core$List$map, $rtfeldman$elm_css$Css$Preprocess$Resolve$compileHelp, styles));
};
var $rtfeldman$elm_css$Css$Preprocess$Snippet = function (a) {
	return {$: 'Snippet', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$makeSnippet = F2(
	function (styles, sequence) {
		var selector = A3($rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, $elm$core$Maybe$Nothing);
		return $rtfeldman$elm_css$Css$Preprocess$Snippet(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
					A3($rtfeldman$elm_css$Css$Preprocess$StyleBlock, selector, _List_Nil, styles))
				]));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$murmurSeed = 15739;
var $rtfeldman$elm_css$Css$Preprocess$stylesheet = function (snippets) {
	return {charset: $elm$core$Maybe$Nothing, imports: _List_Nil, namespaces: _List_Nil, snippets: snippets};
};
var $rtfeldman$elm_css$VirtualDom$Styled$getClassname = function (styles) {
	return $elm$core$List$isEmpty(styles) ? 'unstyled' : A2(
		$elm$core$String$cons,
		_Utils_chr('_'),
		$rtfeldman$elm_hex$Hex$toString(
			A2(
				$Skinney$murmur3$Murmur3$hashString,
				$rtfeldman$elm_css$VirtualDom$Styled$murmurSeed,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
					$elm$core$List$singleton(
						$rtfeldman$elm_css$Css$Preprocess$stylesheet(
							$elm$core$List$singleton(
								A2(
									$rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
									styles,
									$rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(_List_Nil)))))))));
};
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $rtfeldman$elm_css$Html$Styled$Internal$css = function (styles) {
	var classname = $rtfeldman$elm_css$VirtualDom$Styled$getClassname(styles);
	var classProperty = A2(
		$elm$virtual_dom$VirtualDom$property,
		'className',
		$elm$json$Json$Encode$string(classname));
	return A3($rtfeldman$elm_css$VirtualDom$Styled$Attribute, classProperty, styles, classname);
};
var $rtfeldman$elm_css$Html$Styled$Attributes$css = $rtfeldman$elm_css$Html$Styled$Internal$css;
var $rtfeldman$elm_css$Css$fontFamily = $rtfeldman$elm_css$Css$prop1('font-family');
var $rtfeldman$elm_css$Css$fontSize = $rtfeldman$elm_css$Css$prop1('font-size');
var $elm$svg$Svg$foreignObject = $elm$svg$Svg$trustedNode('foreignObject');
var $rtfeldman$elm_css$Css$height = $rtfeldman$elm_css$Css$prop1('height');
var $rtfeldman$elm_css$VirtualDom$Styled$property = F2(
	function (key, value) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$property, key, value),
			_List_Nil,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$id = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('id');
var $rtfeldman$elm_css$VirtualDom$Styled$Node = F3(
	function (a, b, c) {
		return {$: 'Node', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$Node;
var $rtfeldman$elm_css$Html$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$node;
var $rtfeldman$elm_css$Html$Styled$input = $rtfeldman$elm_css$Html$Styled$node('input');
var $rtfeldman$elm_css$Css$monospace = {fontFamily: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'monospace'};
var $rtfeldman$elm_css$VirtualDom$Styled$on = F2(
	function (eventName, handler) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$on, eventName, handler),
			_List_Nil,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Events$on = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $rtfeldman$elm_css$Html$Styled$Events$onFocus = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'focus',
		$elm$json$Json$Decode$succeed(msg));
};
var $rtfeldman$elm_css$Html$Styled$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $rtfeldman$elm_css$Html$Styled$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $rtfeldman$elm_css$Html$Styled$Events$onInput = function (tagger) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$rtfeldman$elm_css$Html$Styled$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $rtfeldman$elm_css$Html$Styled$Events$targetValue)));
};
var $rtfeldman$elm_css$Css$padding = $rtfeldman$elm_css$Css$prop1('padding');
var $rtfeldman$elm_css$Css$PercentageUnits = {$: 'PercentageUnits'};
var $rtfeldman$elm_css$Css$Internal$lengthConverter = F3(
	function (units, unitLabel, numericValue) {
		return {
			absoluteLength: $rtfeldman$elm_css$Css$Structure$Compatible,
			calc: $rtfeldman$elm_css$Css$Structure$Compatible,
			flexBasis: $rtfeldman$elm_css$Css$Structure$Compatible,
			fontSize: $rtfeldman$elm_css$Css$Structure$Compatible,
			length: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNone: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible,
			numericValue: numericValue,
			textIndent: $rtfeldman$elm_css$Css$Structure$Compatible,
			unitLabel: unitLabel,
			units: units,
			value: _Utils_ap(
				$elm$core$String$fromFloat(numericValue),
				unitLabel)
		};
	});
var $rtfeldman$elm_css$Css$pct = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$PercentageUnits, '%');
var $rtfeldman$elm_css$Css$position = $rtfeldman$elm_css$Css$prop1('position');
var $rtfeldman$elm_css$Css$PxUnits = {$: 'PxUnits'};
var $rtfeldman$elm_css$Css$px = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$PxUnits, 'px');
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$attribute = F2(
	function (key, value) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$attribute, key, value),
			_List_Nil,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$tabindex = function (n) {
	return A2(
		$rtfeldman$elm_css$VirtualDom$Styled$attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $rtfeldman$elm_css$Css$Preprocess$ApplyStyles = function (a) {
	return {$: 'ApplyStyles', a: a};
};
var $rtfeldman$elm_css$Css$Internal$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
	});
var $rtfeldman$elm_css$Css$Internal$getOverloadedProperty = F3(
	function (functionName, desiredKey, style) {
		getOverloadedProperty:
		while (true) {
			switch (style.$) {
				case 'AppendProperty':
					var str = style.a;
					var key = A2(
						$elm$core$Maybe$withDefault,
						'',
						$elm$core$List$head(
							A2($elm$core$String$split, ':', str)));
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, key);
				case 'ExtendSelector':
					var selector = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-selector'));
				case 'NestSnippet':
					var combinator = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-combinator'));
				case 'WithPseudoElement':
					var pseudoElement = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-pseudo-element setter'));
				case 'WithMedia':
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-media-query'));
				case 'WithKeyframes':
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-keyframes'));
				default:
					if (!style.a.b) {
						return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-empty-Style'));
					} else {
						if (!style.a.b.b) {
							var _v1 = style.a;
							var only = _v1.a;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = only;
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						} else {
							var _v2 = style.a;
							var first = _v2.a;
							var rest = _v2.b;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = $rtfeldman$elm_css$Css$Preprocess$ApplyStyles(rest);
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						}
					}
			}
		}
	});
var $rtfeldman$elm_css$Css$Internal$IncompatibleUnits = {$: 'IncompatibleUnits'};
var $rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty = A3($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$Internal$IncompatibleUnits, '', 0);
var $rtfeldman$elm_css$Css$textAlign = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'textAlign',
		'text-align',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles = F2(
	function (_v0, styles) {
		var newStyles = _v0.b;
		var classname = _v0.c;
		return $elm$core$List$isEmpty(newStyles) ? styles : A3($elm$core$Dict$insert, classname, newStyles, styles);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute = function (_v0) {
	var val = _v0.a;
	return val;
};
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$keyedNodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_keyedNodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml = F2(
	function (_v6, _v7) {
		var key = _v6.a;
		var html = _v6.b;
		var pairs = _v7.a;
		var styles = _v7.b;
		switch (html.$) {
			case 'Unstyled':
				var vdom = html.a;
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v9 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v9.a;
				var finalStyles = _v9.b;
				var vdom = A3(
					$elm$virtual_dom$VirtualDom$node,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v10 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v10.a;
				var finalStyles = _v10.b;
				var vdom = A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v11 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v11.a;
				var finalStyles = _v11.b;
				var vdom = A3(
					$elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v12 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v12.a;
				var finalStyles = _v12.b;
				var vdom = A4(
					$elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml = F2(
	function (html, _v0) {
		var nodes = _v0.a;
		var styles = _v0.b;
		switch (html.$) {
			case 'Unstyled':
				var vdomNode = html.a;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v2 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v2.a;
				var finalStyles = _v2.b;
				var vdomNode = A3(
					$elm$virtual_dom$VirtualDom$node,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v3 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v3.a;
				var finalStyles = _v3.b;
				var vdomNode = A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v4 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v4.a;
				var finalStyles = _v4.b;
				var vdomNode = A3(
					$elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v5 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v5.a;
				var finalStyles = _v5.b;
				var vdomNode = A4(
					$elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
		}
	});
var $elm$core$Dict$singleton = F2(
	function (key, value) {
		return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$stylesFromPropertiesHelp = F2(
	function (candidate, properties) {
		stylesFromPropertiesHelp:
		while (true) {
			if (!properties.b) {
				return candidate;
			} else {
				var _v1 = properties.a;
				var styles = _v1.b;
				var classname = _v1.c;
				var rest = properties.b;
				if ($elm$core$String$isEmpty(classname)) {
					var $temp$candidate = candidate,
						$temp$properties = rest;
					candidate = $temp$candidate;
					properties = $temp$properties;
					continue stylesFromPropertiesHelp;
				} else {
					var $temp$candidate = $elm$core$Maybe$Just(
						_Utils_Tuple2(classname, styles)),
						$temp$properties = rest;
					candidate = $temp$candidate;
					properties = $temp$properties;
					continue stylesFromPropertiesHelp;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties = function (properties) {
	var _v0 = A2($rtfeldman$elm_css$VirtualDom$Styled$stylesFromPropertiesHelp, $elm$core$Maybe$Nothing, properties);
	if (_v0.$ === 'Nothing') {
		return $elm$core$Dict$empty;
	} else {
		var _v1 = _v0.a;
		var classname = _v1.a;
		var styles = _v1.b;
		return A2($elm$core$Dict$singleton, classname, styles);
	}
};
var $rtfeldman$elm_css$Css$Structure$ClassSelector = function (a) {
	return {$: 'ClassSelector', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$snippetFromPair = function (_v0) {
	var classname = _v0.a;
	var styles = _v0.b;
	return A2(
		$rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
		styles,
		$rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$ClassSelector(classname)
				])));
};
var $rtfeldman$elm_css$VirtualDom$Styled$toDeclaration = function (dict) {
	return $rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
		$elm$core$List$singleton(
			$rtfeldman$elm_css$Css$Preprocess$stylesheet(
				A2(
					$elm$core$List$map,
					$rtfeldman$elm_css$VirtualDom$Styled$snippetFromPair,
					$elm$core$Dict$toList(dict)))));
};
var $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode = function (styles) {
	return A3(
		$elm$virtual_dom$VirtualDom$node,
		'style',
		_List_Nil,
		$elm$core$List$singleton(
			$elm$virtual_dom$VirtualDom$text(
				$rtfeldman$elm_css$VirtualDom$Styled$toDeclaration(styles))));
};
var $rtfeldman$elm_css$VirtualDom$Styled$unstyle = F3(
	function (elemType, properties, children) {
		var unstyledProperties = A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _v0.a;
		var styles = _v0.b;
		var styleNode = $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(styles);
		return A3(
			$elm$virtual_dom$VirtualDom$node,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				styleNode,
				$elm$core$List$reverse(childNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$containsKey = F2(
	function (key, pairs) {
		containsKey:
		while (true) {
			if (!pairs.b) {
				return false;
			} else {
				var _v1 = pairs.a;
				var str = _v1.a;
				var rest = pairs.b;
				if (_Utils_eq(key, str)) {
					return true;
				} else {
					var $temp$key = key,
						$temp$pairs = rest;
					key = $temp$key;
					pairs = $temp$pairs;
					continue containsKey;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey = F2(
	function (_default, pairs) {
		getUnusedKey:
		while (true) {
			if (!pairs.b) {
				return _default;
			} else {
				var _v1 = pairs.a;
				var firstKey = _v1.a;
				var rest = pairs.b;
				var newKey = '_' + firstKey;
				if (A2($rtfeldman$elm_css$VirtualDom$Styled$containsKey, newKey, rest)) {
					var $temp$default = newKey,
						$temp$pairs = rest;
					_default = $temp$default;
					pairs = $temp$pairs;
					continue getUnusedKey;
				} else {
					return newKey;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode = F2(
	function (allStyles, keyedChildNodes) {
		var styleNodeKey = A2($rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey, '_', keyedChildNodes);
		var finalNode = $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(allStyles);
		return _Utils_Tuple2(styleNodeKey, finalNode);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed = F3(
	function (elemType, properties, keyedChildren) {
		var unstyledProperties = A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _v0.a;
		var styles = _v0.b;
		var keyedStyleNode = A2($rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, styles, keyedChildNodes);
		return A3(
			$elm$virtual_dom$VirtualDom$keyedNode,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				keyedStyleNode,
				$elm$core$List$reverse(keyedChildNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS = F4(
	function (ns, elemType, properties, keyedChildren) {
		var unstyledProperties = A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _v0.a;
		var styles = _v0.b;
		var keyedStyleNode = A2($rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, styles, keyedChildNodes);
		return A4(
			$elm$virtual_dom$VirtualDom$keyedNodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				keyedStyleNode,
				$elm$core$List$reverse(keyedChildNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleNS = F4(
	function (ns, elemType, properties, children) {
		var unstyledProperties = A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _v0.a;
		var styles = _v0.b;
		var styleNode = $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(styles);
		return A4(
			$elm$virtual_dom$VirtualDom$nodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				styleNode,
				$elm$core$List$reverse(childNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled = function (vdom) {
	switch (vdom.$) {
		case 'Unstyled':
			var plainNode = vdom.a;
			return plainNode;
		case 'Node':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A3($rtfeldman$elm_css$VirtualDom$Styled$unstyle, elemType, properties, children);
		case 'NodeNS':
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyleNS, ns, elemType, properties, children);
		case 'KeyedNode':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A3($rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed, elemType, properties, children);
		default:
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS, ns, elemType, properties, children);
	}
};
var $rtfeldman$elm_css$Html$Styled$toUnstyled = $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled;
var $rtfeldman$elm_css$Html$Styled$Attributes$value = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('value');
var $rtfeldman$elm_css$Css$width = $rtfeldman$elm_css$Css$prop1('width');
var $author$project$SvgDraw$svgTextInput = function (str) {
	return function (xpos) {
		return function (ypos) {
			return function (w) {
				return function (h) {
					return function (onFocusEvent) {
						return function (onInputEvent) {
							return function (backgroundColor) {
								return function (events) {
									return function (domId) {
										return function (viewStructure) {
											return A2(
												$elm$svg$Svg$foreignObject,
												_Utils_ap(
													events,
													_List_fromArray(
														[
															$elm$svg$Svg$Attributes$x(
															$elm$core$String$fromInt(xpos)),
															$elm$svg$Svg$Attributes$y(
															$elm$core$String$fromInt(ypos)),
															$elm$svg$Svg$Attributes$width(
															$elm$core$String$fromInt(w)),
															$elm$svg$Svg$Attributes$height(
															$elm$core$String$fromInt(h))
														])),
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$toUnstyled(
														A2(
															$rtfeldman$elm_css$Html$Styled$input,
															_List_fromArray(
																[
																	$rtfeldman$elm_css$Html$Styled$Attributes$value(str),
																	$rtfeldman$elm_css$Html$Styled$Events$onInput(onInputEvent),
																	$rtfeldman$elm_css$Html$Styled$Attributes$id(domId),
																	$rtfeldman$elm_css$Html$Styled$Events$onFocus(onFocusEvent),
																	viewStructure.isToolbar ? $rtfeldman$elm_css$Html$Styled$Attributes$tabindex(-1) : $rtfeldman$elm_css$Html$Styled$Attributes$tabindex(0),
																	$rtfeldman$elm_css$Html$Styled$Attributes$css(
																	_List_fromArray(
																		[
																			$rtfeldman$elm_css$Css$fontFamily($rtfeldman$elm_css$Css$monospace),
																			$rtfeldman$elm_css$Css$fontSize(
																			$rtfeldman$elm_css$Css$px(h * $author$project$ViewVariables$inputFontSizePercent)),
																			$rtfeldman$elm_css$Css$width(
																			$rtfeldman$elm_css$Css$pct(100)),
																			$rtfeldman$elm_css$Css$height(
																			$rtfeldman$elm_css$Css$pct(100)),
																			$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox),
																			$rtfeldman$elm_css$Css$backgroundColor(backgroundColor),
																			$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center),
																			$rtfeldman$elm_css$Css$padding(
																			$rtfeldman$elm_css$Css$px(0)),
																			$rtfeldman$elm_css$Css$border(
																			$rtfeldman$elm_css$Css$px(2)),
																			$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$absolute)
																		]))
																]),
															_List_Nil))
													]));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $rtfeldman$elm_css$Css$transparent = {color: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'transparent'};
var $author$project$SvgDraw$drawBlockNameInput = F3(
	function (call, viewStructure, blockPos) {
		return $author$project$SvgDraw$svgTextInput(call.functionName)(blockPos.xpos + $author$project$ViewVariables$blockTextXPadding)($author$project$ViewVariables$blockTextInputYpos + blockPos.ypos)(blockPos.width - (2 * $author$project$ViewVariables$blockTextXPadding))($author$project$ViewVariables$blockTextInputHeight)(
			$author$project$Model$BlockNameHighlight(call.id))(
			$author$project$Model$BlockNameUpdate(call.id))($rtfeldman$elm_css$Css$transparent)(
			A2($author$project$SvgDraw$blockNameEvents, call, viewStructure))(
			$author$project$Model$nodeNameId(call.id))(viewStructure);
	});
var $author$project$Model$HeaderOutputClick = F2(
	function (a, b) {
		return {$: 'HeaderOutputClick', a: a, b: b};
	});
var $author$project$Model$InputHighlight = F2(
	function (a, b) {
		return {$: 'InputHighlight', a: a, b: b};
	});
var $rtfeldman$elm_css$Html$Styled$div = $rtfeldman$elm_css$Html$Styled$node('div');
var $author$project$SvgDraw$nodeEvent = F7(
	function (xpos, inputPos, ypos, event, domId, viewStructure, isTabable) {
		return A2(
			$elm$svg$Svg$foreignObject,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x(
					$elm$core$String$fromInt(inputPos.a + xpos)),
					$elm$svg$Svg$Attributes$y(
					$elm$core$String$fromInt(ypos)),
					$elm$svg$Svg$Attributes$width(
					$elm$core$String$fromInt($author$project$ViewVariables$nodeRadius)),
					$elm$svg$Svg$Attributes$height(
					$elm$core$String$fromInt($author$project$ViewVariables$nodeRadius))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$toUnstyled(
					A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$tabindex(
								(viewStructure.isToolbar || (!isTabable)) ? (-1) : 0),
								$rtfeldman$elm_css$Html$Styled$Attributes$id(domId),
								$rtfeldman$elm_css$Html$Styled$Events$onFocus(event)
							]),
						_List_Nil))
				]));
	});
var $author$project$SvgDraw$drawNodeWithEvent = F9(
	function (xpos, inputPos, ypos, events, highlightevent, eventId, isHighlighted, viewStructure, isHollow) {
		return A2(
			$elm$svg$Svg$g,
			_List_Nil,
			_List_fromArray(
				[
					A7($author$project$SvgDraw$nodeEvent, xpos, inputPos, ypos, highlightevent, eventId, viewStructure, !isHollow),
					A6($author$project$SvgDraw$drawNode, xpos, inputPos, ypos, events, isHighlighted, isHollow)
				]));
	});
var $author$project$ViewStructure$countOutputsBefore = F2(
	function (inputs, threshhold) {
		countOutputsBefore:
		while (true) {
			if (!threshhold) {
				return 0;
			} else {
				if (!inputs.b) {
					return 0;
				} else {
					var input = inputs.a;
					var rest = inputs.b;
					switch (input.$) {
						case 'Output':
							var id = input.a;
							return 1 + A2($author$project$ViewStructure$countOutputsBefore, rest, threshhold - 1);
						case 'FunctionArg':
							var index = input.a;
							return 1 + A2($author$project$ViewStructure$countOutputsBefore, rest, threshhold - 1);
						default:
							var $temp$inputs = rest,
								$temp$threshhold = threshhold - 1;
							inputs = $temp$inputs;
							threshhold = $temp$threshhold;
							continue countOutputsBefore;
					}
				}
			}
		}
	});
var $author$project$ViewVariables$blockSpacing = ($author$project$ViewVariables$blockHeight / 6) | 0;
var $author$project$ViewVariables$lineSpaceBeforeBlock = (($author$project$ViewVariables$blockSpacing * 3) / 2) | 0;
var $author$project$ViewVariables$lineXSpace = ($author$project$ViewVariables$blockHeight / 2) | 0;
var $author$project$ViewVariables$lineWidth = '4';
var $author$project$Utils$listToStringListRest = function (l) {
	if (!l.b) {
		return '';
	} else {
		var i = l.a;
		var is = l.b;
		return ',' + ($elm$core$String$fromInt(i) + $author$project$Utils$listToStringListRest(is));
	}
};
var $author$project$Utils$listToStringList = function (l) {
	if (!l.b) {
		return '';
	} else {
		var i = l.a;
		var is = l.b;
		return _Utils_ap(
			$elm$core$String$fromInt(i),
			$author$project$Utils$listToStringListRest(is));
	}
};
var $elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var $elm$svg$Svg$polyline = $elm$svg$Svg$trustedNode('polyline');
var $elm$svg$Svg$Attributes$strokeLinecap = _VirtualDom_attribute('stroke-linecap');
var $elm$svg$Svg$Attributes$strokeLinejoin = _VirtualDom_attribute('stroke-linejoin');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $author$project$SvgDraw$taxiLine = F3(
	function (posList, events, isLineHighlighted) {
		var color = isLineHighlighted ? 'blue' : 'black';
		return A2(
			$elm$svg$Svg$polyline,
			_Utils_ap(
				events,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$points(
						$author$project$Utils$listToStringList(posList)),
						$elm$svg$Svg$Attributes$strokeLinejoin('round'),
						$elm$svg$Svg$Attributes$stroke(color),
						$elm$svg$Svg$Attributes$fill('none'),
						$elm$svg$Svg$Attributes$strokeWidth($author$project$ViewVariables$lineWidth),
						$elm$svg$Svg$Attributes$strokeLinecap('round')
					])),
			_List_Nil);
	});
var $author$project$SvgDraw$drawConnector = F9(
	function (call, blockPos, inputCounter, otherBlockPos, events, isLineHighlighted, routeOffset, viewStructure, topOffset) {
		var topY = otherBlockPos.b + ($author$project$ViewVariables$lineSpaceBeforeBlock * topOffset);
		var otherBlockOutputX = otherBlockPos.a;
		var nodeX = function () {
			var _v0 = A2($elm$core$Dict$get, inputCounter, blockPos.inputPositions);
			if (_v0.$ === 'Just') {
				var inputPos = _v0.a;
				return (inputPos.a + $author$project$ViewVariables$nodeRadius) + blockPos.xpos;
			} else {
				return -100;
			}
		}();
		var lineX = (routeOffset < 0) ? ($author$project$ViewVariables$lineXSpace * routeOffset) : ((routeOffset > 0) ? (($author$project$ViewVariables$lineXSpace * routeOffset) + viewStructure.funcBlockMaxWidth) : otherBlockOutputX);
		var lastY = (blockPos.ypos + $author$project$ViewVariables$nodeRadius) - ($author$project$ViewVariables$lineSpaceBeforeBlock * (1 + A2($author$project$ViewStructure$countOutputsBefore, call.inputs, inputCounter)));
		var linepoints = _List_fromArray(
			[otherBlockOutputX, otherBlockPos.b, otherBlockOutputX, topY, lineX, topY, lineX, lastY, nodeX, lastY, nodeX, blockPos.ypos + $author$project$ViewVariables$nodeRadius]);
		return A3($author$project$SvgDraw$taxiLine, linepoints, events, isLineHighlighted);
	});
var $author$project$DrawFunc$funcLineYOffset = F2(
	function (viewStructure, outputIndex) {
		return 1 + A2($author$project$ViewStructure$countOutputsBefore, viewStructure.sortedFunc.args, outputIndex);
	});
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $author$project$DrawFunc$getInputRouting = F3(
	function (call, inputCounter, viewStructure) {
		return A2(
			$elm$core$Maybe$withDefault,
			$elm$core$Maybe$Nothing,
			A2(
				$elm$core$Maybe$andThen,
				$elm$core$Array$get(inputCounter),
				A2($elm$core$Dict$get, call.id, viewStructure.lineRouting)));
	});
var $author$project$DrawFunc$getOutputPos = F3(
	function (outputId, viewStructure, outputIndex) {
		return _Utils_eq(outputId, viewStructure.id) ? A2(
			$elm$core$Maybe$map,
			function (inputPos) {
				return _Utils_Tuple2(inputPos.a + ((inputPos.b / 2) | 0), $author$project$ViewVariables$functionHeaderHeight - $author$project$ViewVariables$nodeRadius);
			},
			A2($elm$core$Dict$get, outputIndex, viewStructure.headerPos.inputPositions)) : A2(
			$elm$core$Maybe$map,
			function (otherPos) {
				return _Utils_Tuple2(otherPos.xpos + ((otherPos.width / 2) | 0), otherPos.ypos + $author$project$ViewVariables$outputNodeY);
			},
			A2($elm$core$Dict$get, outputId, viewStructure.blockPositions));
	});
var $elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 'Nothing') {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 'Nothing') {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return $elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var $author$project$DrawFunc$drawOutputLine = F8(
	function (call, blockPos, inputCounter, viewStructure, events, isLineHighlighted, outputId, outputIndex) {
		return A3(
			$elm$core$Maybe$map2,
			F2(
				function (otherBlockPos, routing) {
					return A9(
						$author$project$SvgDraw$drawConnector,
						call,
						blockPos,
						inputCounter,
						otherBlockPos,
						events,
						isLineHighlighted,
						routing,
						viewStructure,
						A2($author$project$DrawFunc$funcLineYOffset, viewStructure, outputIndex));
				}),
			A3($author$project$DrawFunc$getOutputPos, outputId, viewStructure, outputIndex),
			A3($author$project$DrawFunc$getInputRouting, call, inputCounter, viewStructure));
	});
var $author$project$Model$InputUpdate = F3(
	function (a, b, c) {
		return {$: 'InputUpdate', a: a, b: b, c: c};
	});
var $author$project$BuiltIn$Number = function (a) {
	return {$: 'Number', a: a};
};
var $author$project$BuiltIn$makeBuiltInNumber = function (pair) {
	return _Utils_Tuple2(
		pair.a,
		$author$project$BuiltIn$Number(pair.b));
};
var $author$project$BuiltIn$JavaScript = function (a) {
	return {$: 'JavaScript', a: a};
};
var $author$project$BuiltIn$makeJavascriptBuiltIn = function (pair) {
	return _Utils_Tuple2(
		pair.a,
		$author$project$BuiltIn$JavaScript(pair.b));
};
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $author$project$Utils$dictAppend = F3(
	function (dict, key, val) {
		return A3(
			$elm$core$Dict$update,
			key,
			function (maybeoldlist) {
				if (maybeoldlist.$ === 'Just') {
					var oldlist = maybeoldlist.a;
					return $elm$core$Maybe$Just(
						A2($elm$core$List$cons, val, oldlist));
				} else {
					return $elm$core$Maybe$Just(
						_List_fromArray(
							[val]));
				}
			},
			dict);
	});
var $author$project$Utils$dictAppendAll = F2(
	function (dict, list) {
		if (!list.b) {
			return dict;
		} else {
			var ele = list.a;
			var eles = list.b;
			return A3(
				$author$project$Utils$dictAppend,
				A2($author$project$Utils$dictAppendAll, dict, eles),
				ele.a,
				ele.b);
		}
	});
var $author$project$MusicTheory$getThisFlats = F2(
	function (index, letter) {
		return _Utils_Tuple2(
			A2($elm$core$Basics$modBy, 12, index - 1),
			letter + 'b');
	});
var $author$project$MusicTheory$getThisSharps = F2(
	function (index, letter) {
		return _Utils_Tuple2(
			A2($elm$core$Basics$modBy, 12, index + 1),
			letter + 's');
	});
var $elm$core$Debug$log = _Debug_log;
var $author$project$MusicTheory$addSharpsFlats = F2(
	function (dict, index) {
		if (index < 12) {
			var _v0 = A2($elm$core$Dict$get, index, dict);
			if (_v0.$ === 'Just') {
				var letters = _v0.a;
				return A2(
					$author$project$Utils$dictAppendAll,
					A2(
						$author$project$Utils$dictAppendAll,
						A2($author$project$MusicTheory$addSharpsFlats, dict, index + 1),
						A2(
							$elm$core$List$map,
							$author$project$MusicTheory$getThisSharps(index),
							letters)),
					A2(
						$elm$core$List$map,
						$author$project$MusicTheory$getThisFlats(index),
						letters));
			} else {
				return A2($elm$core$Debug$log, 'bad sharps flats', dict);
			}
		} else {
			return dict;
		}
	});
var $author$project$MusicTheory$letterDict = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2(
			0,
			_List_fromArray(
				['C'])),
			_Utils_Tuple2(1, _List_Nil),
			_Utils_Tuple2(
			2,
			_List_fromArray(
				['D'])),
			_Utils_Tuple2(3, _List_Nil),
			_Utils_Tuple2(
			4,
			_List_fromArray(
				['E'])),
			_Utils_Tuple2(
			5,
			_List_fromArray(
				['F'])),
			_Utils_Tuple2(6, _List_Nil),
			_Utils_Tuple2(
			7,
			_List_fromArray(
				['G'])),
			_Utils_Tuple2(8, _List_Nil),
			_Utils_Tuple2(
			9,
			_List_fromArray(
				['A'])),
			_Utils_Tuple2(10, _List_Nil),
			_Utils_Tuple2(
			11,
			_List_fromArray(
				['B']))
		]));
var $author$project$MusicTheory$letterDictWithSharpsFlats = A2($author$project$MusicTheory$addSharpsFlats, $author$project$MusicTheory$letterDict, 0);
var $elm$core$Basics$pow = _Basics_pow;
var $author$project$MusicTheory$offsetToFrequency = function (offset) {
	return 440.0 * A2($elm$core$Basics$pow, 2.0, (offset - ((4 * 12) + 9)) / 12.0);
};
var $author$project$MusicTheory$offsetToOctave = function (offset) {
	return (offset / 12) | 0;
};
var $author$project$MusicTheory$tupleReversed = F2(
	function (a, b) {
		return _Utils_Tuple2(b, a);
	});
var $author$project$MusicTheory$namedFrequenciesForOffset = function (offset) {
	var octave = $elm$core$String$fromInt(
		$author$project$MusicTheory$offsetToOctave(offset));
	var maybeLetters = A2(
		$elm$core$Dict$get,
		A2($elm$core$Basics$modBy, 12, offset),
		$author$project$MusicTheory$letterDictWithSharpsFlats);
	var frequency = $author$project$MusicTheory$offsetToFrequency(offset);
	if (maybeLetters.$ === 'Just') {
		var letters = maybeLetters.a;
		return A2(
			$elm$core$List$map,
			$author$project$MusicTheory$tupleReversed(frequency),
			A2(
				$elm$core$List$map,
				function (letter) {
					return _Utils_ap(letter, octave);
				},
				letters));
	} else {
		return A2($elm$core$Debug$log, 'bad get names music', _List_Nil);
	}
};
var $author$project$MusicTheory$offsetLimit = 12 * 8;
var $author$project$MusicTheory$namedFrequencies = A2(
	$elm$core$List$concatMap,
	$author$project$MusicTheory$namedFrequenciesForOffset,
	A2($elm$core$List$range, 0, $author$project$MusicTheory$offsetLimit));
var $author$project$Compiler$CompModel$systemValues = _List_fromArray(
	[
		_Utils_Tuple2('time', 'time'),
		_Utils_Tuple2('mouseX', 'window.mouseXPos'),
		_Utils_Tuple2('mouseY', 'window.mouseYPos')
	]);
var $author$project$BuiltIn$builtInVariables = $elm$core$Dict$fromList(
	_Utils_ap(
		A2($elm$core$List$map, $author$project$BuiltIn$makeBuiltInNumber, $author$project$MusicTheory$namedFrequencies),
		A2($elm$core$List$map, $author$project$BuiltIn$makeJavascriptBuiltIn, $author$project$Compiler$CompModel$systemValues)));
var $author$project$ViewVariables$inputHeight = $author$project$ViewVariables$nodeRadius * 2;
var $rtfeldman$elm_css$Css$cssFunction = F2(
	function (funcName, args) {
		return funcName + ('(' + (A2($elm$core$String$join, ', ', args) + ')'));
	});
var $rtfeldman$elm_css$Css$rgb = F3(
	function (r, g, b) {
		return {
			alpha: 1,
			blue: b,
			color: $rtfeldman$elm_css$Css$Structure$Compatible,
			green: g,
			red: r,
			value: A2(
				$rtfeldman$elm_css$Css$cssFunction,
				'rgb',
				A2(
					$elm$core$List$map,
					$elm$core$String$fromInt,
					_List_fromArray(
						[r, g, b])))
		};
	});
var $author$project$ViewVariables$textInputColor = A3($rtfeldman$elm_css$Css$rgb, 186, 232, 188);
var $author$project$ViewVariables$textInputColorVariable = A3($rtfeldman$elm_css$Css$rgb, 108, 230, 113);
var $author$project$SvgDraw$drawTextInput = F9(
	function (call, str, events, xpos, inputPos, ypos, index, domId, viewStructure) {
		return $author$project$SvgDraw$svgTextInput(str)(inputPos.a + xpos)(ypos - (($author$project$ViewVariables$inputHeight / 2) | 0))(inputPos.b)($author$project$ViewVariables$inputHeight)(
			A2($author$project$Model$InputHighlight, call.id, index))(
			A2($author$project$Model$InputUpdate, call.id, index))(
			function () {
				var _v0 = A2($elm$core$Dict$get, str, $author$project$BuiltIn$builtInVariables);
				if (_v0.$ === 'Just') {
					var val = _v0.a;
					return $author$project$ViewVariables$textInputColorVariable;
				} else {
					return $author$project$ViewVariables$textInputColor;
				}
			}())(events)(domId)(viewStructure);
	});
var $author$project$DrawFunc$inputHighlightedP = F3(
	function (viewStructure, call, inputCounter) {
		var _v0 = viewStructure.mouseState.mouseSelection;
		if (_v0.$ === 'InputSelected') {
			var inputId = _v0.a;
			var inputIndex = _v0.b;
			return _Utils_eq(inputId, call.id) && _Utils_eq(inputCounter, inputIndex);
		} else {
			return false;
		}
	});
var $author$project$ModelHelpers$isStandInInfinite = F3(
	function (call, input, index) {
		var _v0 = A2($elm$core$Dict$get, call.functionName, $author$project$BuiltIn$builtInFunctions);
		if (_v0.$ === 'Nothing') {
			return false;
		} else {
			var builtInSpec = _v0.a;
			var _v1 = builtInSpec.argList;
			if (_v1.$ === 'Infinite') {
				var base = _v1.a;
				var lastname = _v1.b;
				return _Utils_cmp(
					index,
					$elm$core$List$length(base)) > -1;
			} else {
				return false;
			}
		}
	});
var $author$project$Model$InputClick = F2(
	function (a, b) {
		return {$: 'InputClick', a: a, b: b};
	});
var $author$project$Model$InputRightClick = F2(
	function (a, b) {
		return {$: 'InputRightClick', a: a, b: b};
	});
var $author$project$SvgDraw$nodeEvents = F3(
	function (call, viewStructure, inputCounter) {
		return viewStructure.isToolbar ? _List_Nil : A2(
			$author$project$SvgDraw$svgClickEvents,
			A2($author$project$Model$InputClick, call.id, inputCounter),
			A2($author$project$Model$InputRightClick, call.id, inputCounter));
	});
var $author$project$DrawFunc$drawInput = F5(
	function (call, input, blockPos, inputCounter, viewStructure) {
		var nodePosition = A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(0, 0),
			A2($elm$core$Dict$get, inputCounter, blockPos.inputPositions));
		var nodeEvents = A3($author$project$SvgDraw$nodeEvents, call, viewStructure, inputCounter);
		var isInputHighlighted = A3($author$project$DrawFunc$inputHighlightedP, viewStructure, call, inputCounter);
		var inputStringId = A2($author$project$Model$nodeInputId, call.id, inputCounter);
		var highlightEvent = A2($author$project$Model$InputHighlight, call.id, inputCounter);
		var nodeWithEvent = function (isHollow) {
			return A9($author$project$SvgDraw$drawNodeWithEvent, blockPos.xpos, nodePosition, blockPos.ypos + $author$project$ViewVariables$nodeRadius, nodeEvents, highlightEvent, inputStringId, isInputHighlighted, viewStructure, isHollow);
		};
		switch (input.$) {
			case 'Output':
				var id = input.a;
				var outputEvents = A2(
					$author$project$SvgDraw$svgClickEvents,
					$author$project$Model$OutputClick(id),
					$author$project$Model$NoOp);
				var isLineHighlighted = function () {
					var _v2 = viewStructure.mouseState.mouseSelection;
					switch (_v2.$) {
						case 'InputSelected':
							var inputId = _v2.a;
							var inputIndex = _v2.b;
							return _Utils_eq(inputId, call.id) && _Utils_eq(inputCounter, inputIndex);
						case 'OutputSelected':
							var outputId = _v2.a;
							return _Utils_eq(outputId, id);
						default:
							return false;
					}
				}();
				return A3(
					$elm$svg$Svg$node,
					'g',
					_List_Nil,
					function () {
						var _v1 = A8($author$project$DrawFunc$drawOutputLine, call, blockPos, inputCounter, viewStructure, outputEvents, isLineHighlighted, id, 0);
						if (_v1.$ === 'Just') {
							var line = _v1.a;
							return _List_fromArray(
								[
									line,
									nodeWithEvent(false)
								]);
						} else {
							return _List_fromArray(
								[
									nodeWithEvent(false)
								]);
						}
					}());
			case 'FunctionArg':
				var index = input.a;
				var outputEvents = A2(
					$author$project$SvgDraw$svgClickEvents,
					A2($author$project$Model$HeaderOutputClick, viewStructure.id, index),
					$author$project$Model$NoOp);
				var isLineHighlighted = function () {
					var _v4 = viewStructure.mouseState.mouseSelection;
					switch (_v4.$) {
						case 'InputSelected':
							var inputId = _v4.a;
							var inputIndex = _v4.b;
							return _Utils_eq(inputId, call.id) && _Utils_eq(inputCounter, inputIndex);
						case 'FunctionOutputSelected':
							var sid = _v4.a;
							var sindex = _v4.b;
							return _Utils_eq(sid, viewStructure.id) && _Utils_eq(sindex, index);
						default:
							return false;
					}
				}();
				return A3(
					$elm$svg$Svg$node,
					'g',
					_List_Nil,
					function () {
						var _v3 = A8($author$project$DrawFunc$drawOutputLine, call, blockPos, inputCounter, viewStructure, outputEvents, isLineHighlighted, viewStructure.id, index);
						if (_v3.$ === 'Just') {
							var line = _v3.a;
							return _List_fromArray(
								[
									line,
									nodeWithEvent(false)
								]);
						} else {
							return _List_fromArray(
								[
									nodeWithEvent(false)
								]);
						}
					}());
			case 'Text':
				var str = input.a;
				return A9($author$project$SvgDraw$drawTextInput, call, str, nodeEvents, blockPos.xpos, nodePosition, blockPos.ypos + $author$project$ViewVariables$nodeRadius, inputCounter, inputStringId, viewStructure);
			default:
				return A3($author$project$ModelHelpers$isStandInInfinite, call, input, inputCounter) ? nodeWithEvent(true) : nodeWithEvent(false);
		}
	});
var $author$project$DrawFunc$drawInputLines = F5(
	function (call, inputs, blockPos, inputCounter, viewStructure) {
		if (!inputs.b) {
			return _List_fromArray(
				[
					A3($author$project$SvgDraw$drawBlockNameInput, call, viewStructure, blockPos),
					A7(
					$author$project$SvgDraw$nodeEvent,
					blockPos.xpos,
					_Utils_Tuple2(0, 0),
					blockPos.ypos + $author$project$ViewVariables$outputNodeY,
					$author$project$Model$OutputHighlight(call.id),
					$author$project$Model$nodeOutputId(call.id),
					viewStructure,
					true)
				]);
		} else {
			var input = inputs.a;
			var rest = inputs.b;
			return A2(
				$elm$core$List$cons,
				A5($author$project$DrawFunc$drawInput, call, input, blockPos, inputCounter, viewStructure),
				A5($author$project$DrawFunc$drawInputLines, call, rest, blockPos, inputCounter + 1, viewStructure));
		}
	});
var $author$project$DrawFunc$drawCallInputs = F2(
	function (call, viewStructure) {
		var _v0 = A2($elm$core$Dict$get, call.id, viewStructure.blockPositions);
		if (_v0.$ === 'Just') {
			var blockPos = _v0.a;
			return A2(
				$elm$svg$Svg$g,
				_List_Nil,
				A5($author$project$DrawFunc$drawInputLines, call, call.inputs, blockPos, 0, viewStructure));
		} else {
			return $author$project$SvgDraw$errorSvgNode('Call without a block position');
		}
	});
var $author$project$DrawFunc$drawAllInputs = F2(
	function (func, viewStructure) {
		if (!func.b) {
			return _List_Nil;
		} else {
			var call = func.a;
			var calls = func.b;
			var callToDraw = function () {
				var _v1 = viewStructure.mouseState.mouseSelection;
				if (_v1.$ === 'BlockSelected') {
					var funcId = _v1.a;
					var movedCall = _v1.b;
					if ((!_Utils_eq(funcId, viewStructure.id)) && _Utils_eq(movedCall.id, call.id)) {
						var newInputs = A2(
							$elm$core$List$map,
							function (_v2) {
								return $author$project$Model$Hole;
							},
							call.inputs);
						return _Utils_update(
							call,
							{inputs: newInputs});
					} else {
						return call;
					}
				} else {
					return call;
				}
			}();
			return A2(
				$elm$core$List$cons,
				A2($author$project$DrawFunc$drawCallInputs, callToDraw, viewStructure),
				A2($author$project$DrawFunc$drawAllInputs, calls, viewStructure));
		}
	});
var $author$project$Model$HeaderNameHighlight = function (a) {
	return {$: 'HeaderNameHighlight', a: a};
};
var $author$project$Model$HeaderNameUpdate = F2(
	function (a, b) {
		return {$: 'HeaderNameUpdate', a: a, b: b};
	});
var $author$project$Model$HeaderNameClick = F2(
	function (a, b) {
		return {$: 'HeaderNameClick', a: a, b: b};
	});
var $author$project$SvgDraw$headerNameEvents = F2(
	function (_function, viewStructure) {
		return viewStructure.isToolbar ? A2(
			$author$project$SvgDraw$svgClickEvents,
			A2(
				$author$project$Model$SpawnFunction,
				'',
				A2($author$project$SvgDraw$functionMouseOffset, _function, viewStructure)),
			A2(
				$author$project$Model$SpawnFunction,
				'',
				A2($author$project$SvgDraw$functionMouseOffset, _function, viewStructure))) : A2(
			$author$project$SvgDraw$svgClickWithDefault,
			A2(
				$author$project$Model$HeaderNameClick,
				_function,
				A2($author$project$SvgDraw$functionMouseOffset, _function, viewStructure)),
			A2(
				$author$project$Model$HeaderClick,
				_function,
				A2($author$project$SvgDraw$functionMouseOffset, _function, viewStructure)));
	});
var $author$project$SvgDraw$drawHeaderNameInput = F2(
	function (_function, viewStructure) {
		return $author$project$SvgDraw$svgTextInput(_function.name)($author$project$ViewVariables$blockTextXPadding)($author$project$ViewVariables$functionHeaderSquareY + $author$project$ViewVariables$nodeRadius)(viewStructure.headerPos.width - (2 * $author$project$ViewVariables$blockTextXPadding))($author$project$ViewVariables$blockTextInputHeight)(
			$author$project$Model$HeaderNameHighlight(viewStructure.id))(
			$author$project$Model$HeaderNameUpdate(viewStructure.id))($rtfeldman$elm_css$Css$transparent)(
			A2($author$project$SvgDraw$headerNameEvents, _function, viewStructure))(
			$author$project$Model$headerNameId(viewStructure.id))(viewStructure);
	});
var $author$project$Model$HeaderAddOutput = F2(
	function (a, b) {
		return {$: 'HeaderAddOutput', a: a, b: b};
	});
var $author$project$Model$HeaderAddOutputRightClick = F2(
	function (a, b) {
		return {$: 'HeaderAddOutputRightClick', a: a, b: b};
	});
var $author$project$SvgDraw$headerEventsFinal = F2(
	function (inputCounter, viewStructure) {
		return viewStructure.isToolbar ? _List_Nil : A2(
			$author$project$SvgDraw$svgClickEvents,
			A2($author$project$Model$HeaderAddOutput, viewStructure.id, inputCounter),
			A2($author$project$Model$HeaderAddOutputRightClick, viewStructure.id, inputCounter));
	});
var $author$project$DrawFunc$drawHeaderFinalOutput = F2(
	function (viewStructure, inputCounter) {
		var isInputHighlighted = false;
		var events = A2($author$project$SvgDraw$headerEventsFinal, inputCounter, viewStructure);
		var domId = A2($author$project$Model$headerNodeId, viewStructure.id, inputCounter);
		var blockPos = viewStructure.headerPos;
		var nodePos = function () {
			var _v0 = A2($elm$core$Dict$get, inputCounter, blockPos.inputPositions);
			if (_v0.$ === 'Just') {
				var nodeP = _v0.a;
				return nodeP;
			} else {
				return _Utils_Tuple2(-100, -100);
			}
		}();
		return A9(
			$author$project$SvgDraw$drawNodeWithEvent,
			0,
			nodePos,
			$author$project$ViewVariables$functionHeaderHeight - $author$project$ViewVariables$nodeRadius,
			events,
			A2($author$project$Model$HeaderAddOutput, viewStructure.id, inputCounter),
			domId,
			isInputHighlighted,
			viewStructure,
			true);
	});
var $author$project$Model$HeaderOutputHighlight = F2(
	function (a, b) {
		return {$: 'HeaderOutputHighlight', a: a, b: b};
	});
var $author$project$Model$HeaderOutputUpdate = F3(
	function (a, b, c) {
		return {$: 'HeaderOutputUpdate', a: a, b: b, c: c};
	});
var $author$project$Model$HeaderOutputRightClick = F2(
	function (a, b) {
		return {$: 'HeaderOutputRightClick', a: a, b: b};
	});
var $author$project$SvgDraw$headerEvents = F2(
	function (inputCounter, viewStructure) {
		return viewStructure.isToolbar ? _List_Nil : A2(
			$author$project$SvgDraw$svgClickEvents,
			A2($author$project$Model$HeaderOutputClick, viewStructure.id, inputCounter),
			A2($author$project$Model$HeaderOutputRightClick, viewStructure.id, inputCounter));
	});
var $author$project$DrawFunc$drawHeaderOutput = F3(
	function (input, viewStructure, inputCounter) {
		var isInputHighlighted = function () {
			var _v2 = viewStructure.mouseState.mouseSelection;
			if (_v2.$ === 'FunctionOutputSelected') {
				var sid = _v2.a;
				var sindex = _v2.b;
				return _Utils_eq(sid, viewStructure.id) && _Utils_eq(sindex, inputCounter);
			} else {
				return false;
			}
		}();
		var events = A2($author$project$SvgDraw$headerEvents, inputCounter, viewStructure);
		var domId = A2($author$project$Model$headerNodeId, viewStructure.id, inputCounter);
		var blockPos = viewStructure.headerPos;
		var nodePos = function () {
			var _v1 = A2($elm$core$Dict$get, inputCounter, blockPos.inputPositions);
			if (_v1.$ === 'Just') {
				var nodeP = _v1.a;
				return nodeP;
			} else {
				return _Utils_Tuple2(-100, -100);
			}
		}();
		if (input.$ === 'Text') {
			var str = input.a;
			return $author$project$SvgDraw$svgTextInput(str)(nodePos.a)($author$project$ViewVariables$functionHeaderHeight - $author$project$ViewVariables$inputHeight)(nodePos.b)($author$project$ViewVariables$inputHeight)(
				A2($author$project$Model$HeaderOutputHighlight, viewStructure.id, inputCounter))(
				A2($author$project$Model$HeaderOutputUpdate, viewStructure.id, inputCounter))($author$project$ViewVariables$textInputColorVariable)(events)(domId)(viewStructure);
		} else {
			return A9(
				$author$project$SvgDraw$drawNodeWithEvent,
				0,
				nodePos,
				$author$project$ViewVariables$functionHeaderHeight - $author$project$ViewVariables$nodeRadius,
				events,
				A2($author$project$Model$HeaderOutputHighlight, viewStructure.id, inputCounter),
				domId,
				isInputHighlighted,
				viewStructure,
				false);
		}
	});
var $author$project$DrawFunc$drawHeaderOutputs = F3(
	function (funcArgs, viewStructure, inputCounter) {
		if (!funcArgs.b) {
			return _List_fromArray(
				[
					A2($author$project$DrawFunc$drawHeaderFinalOutput, viewStructure, inputCounter)
				]);
		} else {
			var input = funcArgs.a;
			var rest = funcArgs.b;
			return A2(
				$elm$core$List$cons,
				A3($author$project$DrawFunc$drawHeaderOutput, input, viewStructure, inputCounter),
				A3($author$project$DrawFunc$drawHeaderOutputs, rest, viewStructure, inputCounter + 1));
		}
	});
var $author$project$DrawFunc$drawFuncInputs = F2(
	function (func, viewStructure) {
		return A2(
			$elm$core$List$cons,
			A2($author$project$SvgDraw$drawHeaderNameInput, func, viewStructure),
			_Utils_ap(
				A3($author$project$DrawFunc$drawHeaderOutputs, func.args, viewStructure, 0),
				A2($author$project$DrawFunc$drawAllInputs, func.calls, viewStructure)));
	});
var $author$project$DrawFunc$drawFuncWithConnections = function (viewStructure) {
	return A2(
		$elm$svg$Svg$g,
		_List_fromArray(
			[
				A2($author$project$SvgDraw$svgTranslate, viewStructure.headerPos.xpos, viewStructure.headerPos.ypos)
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$g,
				_List_Nil,
				A3($author$project$DrawFunc$drawFunc, viewStructure.sortedFunc, viewStructure, 0)),
				A2(
				$elm$svg$Svg$g,
				_List_Nil,
				A2($author$project$DrawFunc$drawFuncInputs, viewStructure.sortedFunc, viewStructure)),
				A2(
				$elm$svg$Svg$g,
				_List_Nil,
				A2($author$project$DrawFunc$drawFuncEndings, viewStructure.sortedFunc.calls, viewStructure))
			]));
};
var $author$project$ViewStructure$ViewStructure = function (blockPositions) {
	return function (lineRouting) {
		return function (sortedFunc) {
			return function (id) {
				return function (headerPos) {
					return function (funcBlockMaxWidth) {
						return function (funcWidth) {
							return function (funcHeight) {
								return function (mouseState) {
									return function (svgWidth) {
										return function (svgHeight) {
											return function (isToolbar) {
												return {blockPositions: blockPositions, funcBlockMaxWidth: funcBlockMaxWidth, funcHeight: funcHeight, funcWidth: funcWidth, headerPos: headerPos, id: id, isToolbar: isToolbar, lineRouting: lineRouting, mouseState: mouseState, sortedFunc: sortedFunc, svgHeight: svgHeight, svgWidth: svgWidth};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$ViewStructure$fixLeftForMoveInfo = F3(
	function (withoutLeft, maybeMove, leftW) {
		if (maybeMove.$ === 'Nothing') {
			return withoutLeft;
		} else {
			var moveInfo = maybeMove.a;
			var _v1 = A2($elm$core$Dict$get, moveInfo.movedCall.id, withoutLeft);
			if (_v1.$ === 'Just') {
				var blockPos = _v1.a;
				var newx = blockPos.xpos - leftW;
				return A3(
					$elm$core$Dict$insert,
					moveInfo.movedCall.id,
					_Utils_update(
						blockPos,
						{xpos: newx}),
					withoutLeft);
			} else {
				return withoutLeft;
			}
		}
	});
var $author$project$ViewStructure$fixMoveInfo = F3(
	function (xoffset, yoffset, maybeMove) {
		if (maybeMove.$ === 'Nothing') {
			return $elm$core$Maybe$Nothing;
		} else {
			var moveInfo = maybeMove.a;
			var newy = moveInfo.movedPos.b - yoffset;
			var newx = moveInfo.movedPos.a - xoffset;
			return $elm$core$Maybe$Just(
				_Utils_update(
					moveInfo,
					{
						movedPos: _Utils_Tuple2(newx, newy)
					}));
		}
	});
var $author$project$ViewVariables$blockSpace = $author$project$ViewVariables$blockHeight + $author$project$ViewVariables$blockSpacing;
var $author$project$ViewStructure$countOutputs = function (inputs) {
	return A2(
		$author$project$ViewStructure$countOutputsBefore,
		inputs,
		$elm$core$List$length(inputs));
};
var $author$project$ViewStructure$callLinesSpace = function (call) {
	return $author$project$ViewStructure$countOutputs(call.inputs) * $author$project$ViewVariables$lineSpaceBeforeBlock;
};
var $author$project$ViewStructure$BlockPosition = F4(
	function (xpos, ypos, width, inputPositions) {
		return {inputPositions: inputPositions, width: width, xpos: xpos, ypos: ypos};
	});
var $author$project$ViewVariables$callTextBlockSize = function (text) {
	return $elm$core$Basics$floor(
		$author$project$ViewVariables$blockCharacterOverestimate * $elm$core$String$length(text)) + (2 * $author$project$ViewVariables$blockTextXPadding);
};
var $elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2($elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var $elm$core$Dict$size = function (dict) {
	return A2($elm$core$Dict$sizeHelp, 0, dict);
};
var $author$project$ViewStructure$inputPositionsMax = function (inputPositions) {
	var _v0 = A2(
		$elm$core$Dict$get,
		$elm$core$Dict$size(inputPositions) - 1,
		inputPositions);
	if (_v0.$ === 'Just') {
		var lastPos = _v0.a;
		return (lastPos.a + lastPos.b) + $author$project$ViewVariables$blockTextXPadding;
	} else {
		return 0;
	}
};
var $author$project$ViewStructure$getBlockWidth = F2(
	function (call, inputPositions) {
		return A2(
			$elm$core$Basics$max,
			$author$project$ViewStructure$inputPositionsMax(inputPositions),
			$author$project$ViewVariables$callTextBlockSize(call.functionName));
	});
var $author$project$ViewVariables$inputPadding = $author$project$ViewVariables$nodeRadius * 3;
var $author$project$ViewVariables$characterOverestimate = ($author$project$ViewVariables$inputHeight * $author$project$ViewVariables$inputFontSizePercent) * $author$project$ViewVariables$charOverestimatePercent;
var $author$project$ViewVariables$numCharactersToInputWidth = function (numChars) {
	return $elm$core$Basics$floor($author$project$ViewVariables$characterOverestimate * (numChars + 1));
};
var $author$project$ViewStructure$getInputWidth = function (input) {
	if (input.$ === 'Text') {
		var str = input.a;
		return $author$project$ViewVariables$numCharactersToInputWidth(
			$elm$core$String$length(str));
	} else {
		return $author$project$ViewVariables$nodeRadius * 2;
	}
};
var $author$project$ViewVariables$inputSpacing = $author$project$ViewVariables$nodeRadius * 1;
var $author$project$ViewStructure$inputPositionList = F4(
	function (inputs, counter, currentX, shouldAddTail) {
		if (!inputs.b) {
			return shouldAddTail ? _List_fromArray(
				[
					_Utils_Tuple2(
					counter,
					_Utils_Tuple2(
						currentX,
						$author$project$ViewStructure$getInputWidth($author$project$Model$Hole)))
				]) : _List_Nil;
		} else {
			var input = inputs.a;
			var rest = inputs.b;
			var width = $author$project$ViewStructure$getInputWidth(input);
			return A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					counter,
					_Utils_Tuple2(currentX, width)),
				A4($author$project$ViewStructure$inputPositionList, rest, counter + 1, (currentX + width) + $author$project$ViewVariables$inputSpacing, shouldAddTail));
		}
	});
var $author$project$ViewStructure$makeInputPositions = F2(
	function (call, shouldAddTail) {
		return $elm$core$Dict$fromList(
			A4($author$project$ViewStructure$inputPositionList, call.inputs, 0, $author$project$ViewVariables$inputPadding, shouldAddTail));
	});
var $author$project$ViewStructure$makeBlockPosition = F5(
	function (xpos, ypos, call, shouldCenter, shouldAddTail) {
		var inputPositions = A2($author$project$ViewStructure$makeInputPositions, call, shouldAddTail);
		var blockYpos = shouldCenter ? (ypos - (($author$project$ViewVariables$blockHeight / 2) | 0)) : ypos;
		var blockW = A2($author$project$ViewStructure$getBlockWidth, call, inputPositions);
		var blockXpos = shouldCenter ? (xpos - ((blockW / 2) | 0)) : xpos;
		return A4($author$project$ViewStructure$BlockPosition, blockXpos, blockYpos, blockW, inputPositions);
	});
var $author$project$ViewStructure$movedInfoBlockPos = function (moveInfo) {
	return A5($author$project$ViewStructure$makeBlockPosition, moveInfo.movedPos.a, moveInfo.movedPos.b, moveInfo.movedCall, false, false);
};
var $author$project$ViewStructure$getAllBlockPositions = F3(
	function (maybeMoveInfo, func, currentY) {
		if (!func.b) {
			if (maybeMoveInfo.$ === 'Nothing') {
				return _Utils_Tuple2(_List_Nil, $elm$core$Dict$empty);
			} else {
				var moveInfo = maybeMoveInfo.a;
				return _Utils_Tuple2(
					_List_fromArray(
						[moveInfo.movedCall]),
					A3(
						$elm$core$Dict$insert,
						moveInfo.movedCall.id,
						$author$project$ViewStructure$movedInfoBlockPos(moveInfo),
						$elm$core$Dict$empty));
			}
		} else {
			var call = func.a;
			var rest = func.b;
			var isMoved = function () {
				if (maybeMoveInfo.$ === 'Nothing') {
					return false;
				} else {
					var moveInfo = maybeMoveInfo.a;
					return _Utils_cmp(moveInfo.movedPos.b, currentY + $author$project$ViewVariables$blockHeight) < 0;
				}
			}();
			var newMoveInfo = isMoved ? $elm$core$Maybe$Nothing : maybeMoveInfo;
			var newY = function () {
				if (isMoved) {
					if (maybeMoveInfo.$ === 'Just') {
						var moveInfo = maybeMoveInfo.a;
						return (currentY + $author$project$ViewVariables$blockSpace) + $author$project$ViewStructure$callLinesSpace(moveInfo.movedCall);
					} else {
						return 0;
					}
				} else {
					return (currentY + $author$project$ViewVariables$blockSpace) + $author$project$ViewStructure$callLinesSpace(call);
				}
			}();
			var restCall = isMoved ? func : rest;
			var iteration = A3($author$project$ViewStructure$getAllBlockPositions, newMoveInfo, restCall, newY);
			var topCall = isMoved ? A2(
				$elm$core$Maybe$withDefault,
				call,
				A2(
					$elm$core$Maybe$map,
					function ($) {
						return $.movedCall;
					},
					maybeMoveInfo)) : call;
			var blockPos = function () {
				if (isMoved) {
					if (maybeMoveInfo.$ === 'Just') {
						var moveInfo = maybeMoveInfo.a;
						return $author$project$ViewStructure$movedInfoBlockPos(moveInfo);
					} else {
						return A5($author$project$ViewStructure$makeBlockPosition, 0, 0, call, false, false);
					}
				} else {
					return A5(
						$author$project$ViewStructure$makeBlockPosition,
						0,
						currentY + $author$project$ViewStructure$callLinesSpace(call),
						call,
						false,
						false);
				}
			}();
			return _Utils_Tuple2(
				A2($elm$core$List$cons, topCall, iteration.a),
				A3($elm$core$Dict$insert, topCall.id, blockPos, iteration.b));
		}
	});
var $author$project$ViewStructure$getFuncHeaderHeight = function (func) {
	return ($author$project$ViewVariables$functionHeaderHeight + ($author$project$ViewStructure$countOutputs(func.args) * $author$project$ViewVariables$lineSpaceBeforeBlock)) + $author$project$ViewVariables$blockSpacing;
};
var $author$project$ViewStructure$getBlockPositions = F5(
	function (func, mouseState, xoffset, yoffset, maybeMove) {
		var fixedMoveInfo = A3($author$project$ViewStructure$fixMoveInfo, xoffset, yoffset, maybeMove);
		var allPositions = A3(
			$author$project$ViewStructure$getAllBlockPositions,
			fixedMoveInfo,
			func.calls,
			$author$project$ViewStructure$getFuncHeaderHeight(func));
		return _Utils_Tuple2(
			_Utils_update(
				func,
				{calls: allPositions.a}),
			allPositions.b);
	});
var $author$project$ViewStructure$getHeaderBlockPos = F3(
	function (func, xoffset, yoffset) {
		return A5(
			$author$project$ViewStructure$makeBlockPosition,
			xoffset,
			yoffset,
			A4($author$project$Model$Call, 0, func.args, func.name, ''),
			false,
			true);
	});
var $author$project$LineRouting$findMaxBurden = F4(
	function (fArray, outputBurden, currentIndex, maxIndex) {
		if (_Utils_cmp(currentIndex, maxIndex) > 0) {
			return 0;
		} else {
			var callId = (currentIndex < 0) ? currentIndex : A2(
				$elm$core$Maybe$withDefault,
				-100,
				A2(
					$elm$core$Maybe$map,
					function (call) {
						return call.id;
					},
					A2($elm$core$Array$get, currentIndex, fArray)));
			return A2(
				$elm$core$Basics$max,
				A4($author$project$LineRouting$findMaxBurden, fArray, outputBurden, currentIndex + 1, maxIndex),
				A2(
					$elm$core$Maybe$withDefault,
					0,
					A2($elm$core$Dict$get, callId, outputBurden)));
		}
	});
var $author$project$LineRouting$findThisRouting = F4(
	function (inputInfo, outputBurden, fArray, idToPos) {
		var oIndex = function () {
			var _v1 = A2($elm$core$Dict$get, inputInfo.outputId, idToPos);
			if (_v1.$ === 'Just') {
				var outputIndex = _v1.a;
				return outputIndex;
			} else {
				return inputInfo.outputId;
			}
		}();
		var cIndex = function () {
			var _v0 = A2($elm$core$Dict$get, inputInfo.call.id, idToPos);
			if (_v0.$ === 'Just') {
				var callIndex = _v0.a;
				return callIndex;
			} else {
				return 0;
			}
		}();
		return A4($author$project$LineRouting$findMaxBurden, fArray, outputBurden, oIndex + 1, cIndex - 1) + 1;
	});
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (_v0.$ === 'SubTree') {
			var subTree = _v0.a;
			var newSub = A4($elm$core$Array$setHelp, shift - $elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _v0.a;
			var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var $elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4($elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var $author$project$LineRouting$updateCallLineRoute = F3(
	function (inputInfo, thisRouting, lineRoute) {
		return $elm$core$Maybe$Just(
			A3(
				$elm$core$Array$set,
				inputInfo.index,
				$elm$core$Maybe$Just(thisRouting),
				function () {
					if (lineRoute.$ === 'Nothing') {
						return A2(
							$elm$core$Array$initialize,
							$elm$core$List$length(inputInfo.call.inputs),
							$elm$core$Basics$always($elm$core$Maybe$Nothing));
					} else {
						var route = lineRoute.a;
						return route;
					}
				}()));
	});
var $author$project$LineRouting$setLineRouting = F4(
	function (lineRouting, inputInfo, thisRouting, isLeft) {
		var correctRouting = isLeft ? (-thisRouting) : thisRouting;
		return A3(
			$elm$core$Dict$update,
			inputInfo.call.id,
			A2($author$project$LineRouting$updateCallLineRoute, inputInfo, correctRouting),
			lineRouting);
	});
var $author$project$LineRouting$updateOutputBurden = F2(
	function (burden, otherBurden) {
		if (otherBurden.$ === 'Just') {
			var ob = otherBurden.a;
			return $elm$core$Maybe$Just(
				A2($elm$core$Basics$max, burden, ob));
		} else {
			return $elm$core$Maybe$Just(burden);
		}
	});
var $author$project$LineRouting$setOutputBurden = F3(
	function (outputBurden, id, burden) {
		return A3(
			$elm$core$Dict$update,
			id,
			$author$project$LineRouting$updateOutputBurden(burden),
			outputBurden);
	});
var $author$project$LineRouting$addLineRouting = F6(
	function (inputInfo, outputBurden, lineRouting, fArray, idToPos, isLeft) {
		var thisRouting = A4($author$project$LineRouting$findThisRouting, inputInfo, outputBurden, fArray, idToPos);
		return _Utils_Tuple2(
			A3($author$project$LineRouting$setOutputBurden, outputBurden, inputInfo.outputId, thisRouting),
			A4($author$project$LineRouting$setLineRouting, lineRouting, inputInfo, thisRouting, isLeft));
	});
var $author$project$LineRouting$getOutputBurden = F2(
	function (outputBurden, id) {
		var _v0 = A2($elm$core$Dict$get, id, outputBurden);
		if (_v0.$ === 'Nothing') {
			return 0;
		} else {
			var burden = _v0.a;
			return burden;
		}
	});
var $author$project$LineRouting$existingBurdenOne = F4(
	function (inputInfo, burden, lineRouting, isLeft) {
		var _v0 = A2($author$project$LineRouting$getOutputBurden, burden, inputInfo.outputId);
		if (!_v0) {
			return $elm$core$Maybe$Nothing;
		} else {
			var value = _v0;
			return $elm$core$Maybe$Just(
				A4($author$project$LineRouting$setLineRouting, lineRouting, inputInfo, value, isLeft));
		}
	});
var $author$project$LineRouting$isDirectlyAbove = F2(
	function (inputInfo, idToPos) {
		var _v0 = A2($elm$core$Dict$get, inputInfo.call.id, idToPos);
		if (_v0.$ === 'Just') {
			var inputPos = _v0.a;
			if (inputInfo.outputId < 0) {
				return !inputPos;
			} else {
				var _v1 = A2($elm$core$Dict$get, inputInfo.outputId, idToPos);
				if (_v1.$ === 'Just') {
					var outputPos = _v1.a;
					return _Utils_eq(inputPos, outputPos + 1);
				} else {
					return false;
				}
			}
		} else {
			return false;
		}
	});
var $author$project$LineRouting$existingBurden = F5(
	function (inputInfo, burdenLeft, burdenRight, lineRouting, idToPos) {
		if (A2($author$project$LineRouting$isDirectlyAbove, inputInfo, idToPos)) {
			return $elm$core$Maybe$Just(
				A4($author$project$LineRouting$setLineRouting, lineRouting, inputInfo, 0, true));
		} else {
			var _v0 = A4($author$project$LineRouting$existingBurdenOne, inputInfo, burdenLeft, lineRouting, true);
			if (_v0.$ === 'Just') {
				var newRouting = _v0.a;
				return $elm$core$Maybe$Just(newRouting);
			} else {
				return A4($author$project$LineRouting$existingBurdenOne, inputInfo, burdenRight, lineRouting, false);
			}
		}
	});
var $author$project$LineRouting$buildLineRouting = F7(
	function (fArray, ordering, outputBurdenLeft, outputBurdenRight, lineRouting, idToPos, isLeft) {
		buildLineRouting:
		while (true) {
			if (!ordering.b) {
				return lineRouting;
			} else {
				var inputInfo = ordering.a;
				var rest = ordering.b;
				var _v1 = A5($author$project$LineRouting$existingBurden, inputInfo, outputBurdenLeft, outputBurdenRight, lineRouting, idToPos);
				if (_v1.$ === 'Just') {
					var newLineRouting = _v1.a;
					var $temp$fArray = fArray,
						$temp$ordering = rest,
						$temp$outputBurdenLeft = outputBurdenLeft,
						$temp$outputBurdenRight = outputBurdenRight,
						$temp$lineRouting = newLineRouting,
						$temp$idToPos = idToPos,
						$temp$isLeft = isLeft;
					fArray = $temp$fArray;
					ordering = $temp$ordering;
					outputBurdenLeft = $temp$outputBurdenLeft;
					outputBurdenRight = $temp$outputBurdenRight;
					lineRouting = $temp$lineRouting;
					idToPos = $temp$idToPos;
					isLeft = $temp$isLeft;
					continue buildLineRouting;
				} else {
					var otherBurden = (!isLeft) ? outputBurdenLeft : outputBurdenRight;
					var currentBurden = isLeft ? outputBurdenLeft : outputBurdenRight;
					var _v2 = A6($author$project$LineRouting$addLineRouting, inputInfo, currentBurden, lineRouting, fArray, idToPos, isLeft);
					var newBurden = _v2.a;
					var newRouting = _v2.b;
					var newLeft = isLeft ? newBurden : outputBurdenLeft;
					var newRight = (!isLeft) ? newBurden : outputBurdenRight;
					var $temp$fArray = fArray,
						$temp$ordering = rest,
						$temp$outputBurdenLeft = newLeft,
						$temp$outputBurdenRight = newRight,
						$temp$lineRouting = newRouting,
						$temp$idToPos = idToPos,
						$temp$isLeft = !isLeft;
					fArray = $temp$fArray;
					ordering = $temp$ordering;
					outputBurdenLeft = $temp$outputBurdenLeft;
					outputBurdenRight = $temp$outputBurdenRight;
					lineRouting = $temp$lineRouting;
					idToPos = $temp$idToPos;
					isLeft = $temp$isLeft;
					continue buildLineRouting;
				}
			}
		}
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $author$project$LineRouting$byOutput = F2(
	function (idToPos, element) {
		var _v0 = A2($elm$core$Dict$get, element.call.id, idToPos);
		if (_v0.$ === 'Just') {
			var callPos = _v0.a;
			var _v1 = A2($elm$core$Dict$get, element.outputId, idToPos);
			if (_v1.$ === 'Just') {
				var pos = _v1.a;
				return _Utils_Tuple2(-pos, -callPos);
			} else {
				return _Utils_Tuple2(-element.outputId, -callPos);
			}
		} else {
			return _Utils_Tuple2(1, 1);
		}
	});
var $author$project$LineRouting$InputInfo = F3(
	function (call, index, outputId) {
		return {call: call, index: index, outputId: outputId};
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$LineRouting$getCallOrderedInputs = F2(
	function (funcId, call) {
		return A2(
			$elm$core$List$filterMap,
			function (inputPair) {
				var _v0 = inputPair.a;
				switch (_v0.$) {
					case 'Output':
						var outputId = _v0.a;
						return $elm$core$Maybe$Just(
							A3($author$project$LineRouting$InputInfo, call, inputPair.b, outputId));
					case 'FunctionArg':
						var index = _v0.a;
						return $elm$core$Maybe$Just(
							A3($author$project$LineRouting$InputInfo, call, inputPair.b, (-index) - 1));
					default:
						return $elm$core$Maybe$Nothing;
				}
			},
			A3(
				$elm$core$List$map2,
				$elm$core$Tuple$pair,
				call.inputs,
				A2(
					$elm$core$List$range,
					0,
					$elm$core$List$length(call.inputs) - 1)));
	});
var $elm$core$List$sortBy = _List_sortBy;
var $author$project$LineRouting$getOutputOrdering = F2(
	function (func, idToPos) {
		return A2(
			$elm$core$List$sortBy,
			$author$project$LineRouting$byOutput(idToPos),
			A2(
				$elm$core$List$concatMap,
				$author$project$LineRouting$getCallOrderedInputs(func.id),
				func.calls));
	});
var $author$project$LineRouting$getLineRouting = function (func) {
	var idToPos = A3($author$project$ModelHelpers$idToPosition, func, $elm$core$Dict$empty, 0);
	var ordering = A2($author$project$LineRouting$getOutputOrdering, func, idToPos);
	var funcArray = $elm$core$Array$fromList(func.calls);
	return A7($author$project$LineRouting$buildLineRouting, funcArray, ordering, $elm$core$Dict$empty, $elm$core$Dict$empty, $elm$core$Dict$empty, idToPos, true);
};
var $author$project$ViewStructure$getMaxBlockBottom = function (blockPositions) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, blockpos, acc) {
				return A2($elm$core$Basics$max, blockpos.ypos + $author$project$ViewVariables$blockHeight, acc);
			}),
		0,
		blockPositions);
};
var $author$project$ViewStructure$getMaxBlockWidth = F2(
	function (blockPositions, topBlock) {
		return A3(
			$elm$core$Dict$foldr,
			F3(
				function (key, blockpos, acc) {
					return A2($elm$core$Basics$max, blockpos.width, acc);
				}),
			topBlock.width,
			blockPositions);
	});
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$LineRouting$maybeMax = function (subroute) {
	return A2(
		$elm$core$Maybe$withDefault,
		0,
		$elm$core$List$maximum(
			A2(
				$elm$core$List$map,
				$elm$core$Maybe$withDefault(0),
				$elm$core$Array$toList(subroute))));
};
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $author$project$LineRouting$getMaxLine = function (routing) {
	return A2(
		$elm$core$Basics$max,
		0,
		A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$maximum(
				A2(
					$elm$core$List$map,
					$author$project$LineRouting$maybeMax,
					$elm$core$Dict$values(routing)))));
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$LineRouting$maybeMin = function (subroute) {
	return A2(
		$elm$core$Maybe$withDefault,
		0,
		$elm$core$List$minimum(
			A2(
				$elm$core$List$map,
				$elm$core$Maybe$withDefault(0),
				$elm$core$Array$toList(subroute))));
};
var $author$project$LineRouting$getMinLine = function (routing) {
	return A2(
		$elm$core$Basics$min,
		0,
		A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$minimum(
				A2(
					$elm$core$List$map,
					$author$project$LineRouting$maybeMin,
					$elm$core$Dict$values(routing)))));
};
var $author$project$ViewStructure$getViewStructure = F8(
	function (func, mouseState, svgScreenWidth, svgScreenHeight, xoffset, yoffset, maybeMoveInfo, isToolbar) {
		var blockTuple = A5($author$project$ViewStructure$getBlockPositions, func, mouseState, xoffset, yoffset, maybeMoveInfo);
		var sortedFunc = blockTuple.a;
		var lineRouting = $author$project$LineRouting$getLineRouting(sortedFunc);
		var leftWidth = (-$author$project$LineRouting$getMinLine(lineRouting)) * $author$project$ViewVariables$lineXSpace;
		var topBlockPosition = A3($author$project$ViewStructure$getHeaderBlockPos, func, xoffset + leftWidth, yoffset);
		var rightWidth = $author$project$LineRouting$getMaxLine(lineRouting) * $author$project$ViewVariables$lineXSpace;
		var blockPositionsWithoutLeftWidth = blockTuple.b;
		var blockPositions = A3($author$project$ViewStructure$fixLeftForMoveInfo, blockPositionsWithoutLeftWidth, maybeMoveInfo, leftWidth);
		var funcHeight = $author$project$ViewStructure$getMaxBlockBottom(blockPositions);
		var maxWidth = A2($author$project$ViewStructure$getMaxBlockWidth, blockPositions, topBlockPosition);
		var totalWidth = (leftWidth + rightWidth) + maxWidth;
		return $author$project$ViewStructure$ViewStructure(blockPositions)(lineRouting)(sortedFunc)(sortedFunc.id)(topBlockPosition)(maxWidth)(totalWidth)(funcHeight)(mouseState)(svgScreenWidth)(svgScreenHeight)(isToolbar);
	});
var $author$project$DrawToolbar$drawToolbar = F4(
	function (onion, mouseState, svgWindowWidth, svgWindowHeight) {
		var viewStructure = A8($author$project$ViewStructure$getViewStructure, $author$project$BuiltIn$allBuiltInAsFunction, mouseState, svgWindowWidth, svgWindowHeight, 0, 0, $elm$core$Maybe$Nothing, true);
		return A3(
			$author$project$DrawToolbar$ToolResult,
			viewStructure.funcWidth,
			viewStructure.funcHeight,
			$author$project$DrawFunc$drawFuncWithConnections(viewStructure));
	});
var $author$project$ViewVariables$functionXSpacing = 25;
var $author$project$ViewVariables$funcInitialX = $author$project$ViewVariables$functionXSpacing;
var $author$project$ViewVariables$functionYSpacing = $author$project$ViewVariables$functionXSpacing;
var $author$project$ViewVariables$funcInitialY = $author$project$ViewVariables$functionYSpacing;
var $author$project$ViewPositions$selectedFunc = F5(
	function (mouseState, func, svgWindowWidth, svgWindowHeight, mouseOffset) {
		var view = A8($author$project$ViewStructure$getViewStructure, func, mouseState, svgWindowWidth, svgWindowHeight, 0, 0, $elm$core$Maybe$Nothing, false);
		var oldPos = view.headerPos;
		var mouseCoordinates = A5($author$project$ViewStructure$mouseToSvgCoordinates, mouseState, svgWindowWidth, svgWindowHeight, 0, 0);
		var xpos = mouseCoordinates.a - mouseOffset.a;
		var ypos = mouseCoordinates.b - mouseOffset.b;
		var newPos = _Utils_update(
			oldPos,
			{xpos: xpos, ypos: ypos});
		return _Utils_update(
			view,
			{headerPos: newPos});
	});
var $author$project$ViewPositions$getSelected = F3(
	function (mouseState, svgWindowWidth, svgWindowHeight) {
		var _v0 = mouseState.mouseSelection;
		if (_v0.$ === 'FunctionSelected') {
			var func = _v0.a;
			var mouseOffset = _v0.b;
			return $elm$core$Maybe$Just(
				A5($author$project$ViewPositions$selectedFunc, mouseState, func, svgWindowWidth, svgWindowHeight, mouseOffset));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$ViewStructure$MovedBlockInfo = F2(
	function (movedCall, movedPos) {
		return {movedCall: movedCall, movedPos: movedPos};
	});
var $author$project$ViewStructure$maybeMovedInfo = F3(
	function (mouseState, svgScreenWidth, svgScreenHeight) {
		var _v0 = mouseState.mouseSelection;
		if (_v0.$ === 'BlockSelected') {
			var funcId = _v0.a;
			var call = _v0.b;
			var mouseOffset = _v0.c;
			return $elm$core$Maybe$Just(
				A2(
					$author$project$ViewStructure$MovedBlockInfo,
					call,
					A5($author$project$ViewStructure$mouseToSvgCoordinates, mouseState, svgScreenWidth, svgScreenHeight, mouseOffset.a, mouseOffset.b)));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$ViewPositions$getCurrentMoveInfo = F4(
	function (maybeMoved, rest, xpos, testStructure) {
		if (maybeMoved.$ === 'Nothing') {
			return $elm$core$Maybe$Nothing;
		} else {
			var moveI = maybeMoved.a;
			if (!rest.b) {
				return $elm$core$Maybe$Just(moveI);
			} else {
				return (_Utils_cmp(moveI.movedPos.a, xpos + testStructure.funcWidth) < 1) ? $elm$core$Maybe$Just(moveI) : $elm$core$Maybe$Nothing;
			}
		}
	});
var $author$project$ViewPositions$recursivePosition = F8(
	function (xpos, ypos, maybeSelected, maybeMoved, mouseState, svgWindowWidth, svgWindowHeight, onion) {
		if (!onion.b) {
			if (maybeSelected.$ === 'Nothing') {
				return _List_Nil;
			} else {
				var selected = maybeSelected.a;
				return _List_fromArray(
					[selected]);
			}
		} else {
			var func = onion.a;
			var rest = onion.b;
			var testStructure = A8($author$project$ViewStructure$getViewStructure, func, mouseState, svgWindowWidth, svgWindowHeight, xpos, ypos, $elm$core$Maybe$Nothing, false);
			var newy = ypos;
			var currentMoveInfo = A4($author$project$ViewPositions$getCurrentMoveInfo, maybeMoved, rest, xpos, testStructure);
			var newMoveInfo = function () {
				if (currentMoveInfo.$ === 'Nothing') {
					return maybeMoved;
				} else {
					var moveInfo = currentMoveInfo.a;
					return $elm$core$Maybe$Nothing;
				}
			}();
			var newStructure = function () {
				if (currentMoveInfo.$ === 'Nothing') {
					return testStructure;
				} else {
					var moveInfo = currentMoveInfo.a;
					return A8($author$project$ViewStructure$getViewStructure, func, mouseState, svgWindowWidth, svgWindowHeight, xpos, ypos, currentMoveInfo, false);
				}
			}();
			var isSelected = function () {
				if (maybeSelected.$ === 'Nothing') {
					return false;
				} else {
					var selected = maybeSelected.a;
					return _Utils_cmp(selected.headerPos.xpos, xpos + newStructure.funcWidth) < 1;
				}
			}();
			var newMaybeSelected = isSelected ? $elm$core$Maybe$Nothing : maybeSelected;
			var recurList = isSelected ? onion : rest;
			var newW = function () {
				if (isSelected) {
					if (maybeSelected.$ === 'Just') {
						var selected = maybeSelected.a;
						return selected.funcWidth;
					} else {
						return 0;
					}
				} else {
					return newStructure.funcWidth;
				}
			}();
			var newx = (xpos + newW) + $author$project$ViewVariables$functionXSpacing;
			var recurrance = A8($author$project$ViewPositions$recursivePosition, newx, newy, newMaybeSelected, newMoveInfo, mouseState, svgWindowWidth, svgWindowHeight, recurList);
			if (isSelected) {
				if (maybeSelected.$ === 'Just') {
					var selected = maybeSelected.a;
					return A2($elm$core$List$cons, selected, recurrance);
				} else {
					return recurrance;
				}
			} else {
				return A2($elm$core$List$cons, newStructure, recurrance);
			}
		}
	});
var $author$project$ViewPositions$getViewStructures = F6(
	function (onion, mouseState, svgWindowWidth, svgWindowHeight, xoffset, yoffset) {
		var selected = A3($author$project$ViewPositions$getSelected, mouseState, svgWindowWidth, svgWindowHeight);
		var moved = A3($author$project$ViewStructure$maybeMovedInfo, mouseState, svgWindowWidth, svgWindowHeight);
		return A8($author$project$ViewPositions$recursivePosition, $author$project$ViewVariables$funcInitialX + xoffset, $author$project$ViewVariables$funcInitialY + yoffset, selected, moved, mouseState, svgWindowWidth, svgWindowHeight, onion);
	});
var $author$project$ViewVariables$toSvgWindowHeight = function (windowHeight) {
	return (windowHeight - $author$project$ViewVariables$svgYpos) - $author$project$ViewVariables$buttonHeight;
};
var $author$project$ViewVariables$scrollbarWidth = 40;
var $author$project$ViewVariables$toSvgWindowWidth = function (windowWidth) {
	return windowWidth - ($author$project$ViewVariables$scrollbarWidth + 1);
};
var $author$project$Update$programDropped = function (model) {
	var svgW = $author$project$ViewVariables$toSvgWindowWidth(model.windowWidth);
	var svgH = $author$project$ViewVariables$toSvgWindowHeight(model.windowHeight);
	var toolbar = A4($author$project$DrawToolbar$drawToolbar, model.program, model.mouseState, svgW, svgH);
	var viewStructures = A6($author$project$ViewPositions$getViewStructures, model.program, model.mouseState, svgW, svgH, toolbar.width, 0);
	return A2(
		$elm$core$List$map,
		function ($) {
			return $.sortedFunc;
		},
		viewStructures);
};
var $author$project$Update$modelBlockDropped = F2(
	function (model, call) {
		var oldMouse = model.mouseState;
		var newProgram = $author$project$ModelHelpers$fixAllInvalidInputs(
			$author$project$Update$programDropped(model));
		var newMouse = _Utils_update(
			oldMouse,
			{
				mouseSelection: $author$project$Model$NameSelected(call.id)
			});
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{mouseState: newMouse, program: newProgram}),
			$author$project$Update$focusInputCommand(
				$author$project$Model$nodeNameId(call.id)));
	});
var $author$project$Update$modelFunctionDropped = F2(
	function (model, func) {
		var oldMouse = model.mouseState;
		var newProgram = $author$project$Update$programDropped(model);
		var newMouse = _Utils_update(
			oldMouse,
			{
				mouseSelection: $author$project$Model$FunctionNameSelected(func.id)
			});
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{mouseState: newMouse, program: newProgram}),
			$author$project$Update$focusInputCommand(
				$author$project$Model$headerNameId(func.id)));
	});
var $author$project$Update$modelMouseRelease = function (model) {
	var _v0 = model.mouseState.mouseSelection;
	switch (_v0.$) {
		case 'BlockSelected':
			var funcId = _v0.a;
			var call = _v0.b;
			return A2($author$project$Update$modelBlockDropped, model, call);
		case 'FunctionSelected':
			var func = _v0.a;
			var mouseOffset = _v0.b;
			return A2($author$project$Update$modelFunctionDropped, model, func);
		default:
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	}
};
var $author$project$Model$ErrorBox = function (error) {
	return {error: error};
};
var $author$project$Update$modelWithError = F2(
	function (model, errorString) {
		return _Utils_update(
			model,
			{
				errorBoxMaybe: $elm$core$Maybe$Just(
					$author$project$Model$ErrorBox(errorString))
			});
	});
var $author$project$Compiler$CompModel$Begin = function (a) {
	return {$: 'Begin', a: a};
};
var $author$project$Compiler$CompModel$VarDeclaration = F2(
	function (a, b) {
		return {$: 'VarDeclaration', a: a, b: b};
	});
var $author$project$Utils$splitLast = function (func) {
	if (!func.b) {
		return $elm$core$Maybe$Nothing;
	} else {
		if (!func.b.b) {
			var a = func.a;
			return $elm$core$Maybe$Just(
				_Utils_Tuple2(_List_Nil, a));
		} else {
			var c = func.a;
			var cs = func.b;
			var _v1 = $author$project$Utils$splitLast(cs);
			if (_v1.$ === 'Just') {
				var _v2 = _v1.a;
				var rest = _v2.a;
				var _final = _v2.b;
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						A2($elm$core$List$cons, c, rest),
						_final));
			} else {
				return $elm$core$Maybe$Nothing;
			}
		}
	}
};
var $author$project$Compiler$ASTToJavascript$aSTToJavascript = function (astArgument) {
	switch (astArgument.$) {
		case 'Empty':
			return '';
		case 'Lit':
			var str = astArgument.a;
			return str;
		case 'Object':
			var fields = astArgument.a;
			return $author$project$Compiler$ASTToJavascript$javascriptObject(fields);
		case 'CopySet':
			var object = astArgument.a;
			var fields = astArgument.b;
			return A2($author$project$Compiler$ASTToJavascript$javascriptCopySet, object, fields);
		case 'Get':
			var object = astArgument.a;
			var field = astArgument.b;
			return A2($author$project$Compiler$ASTToJavascript$javascriptGet, object, field);
		case 'Set':
			var object = astArgument.a;
			var field = astArgument.b;
			var value = astArgument.c;
			return A3($author$project$Compiler$ASTToJavascript$javascriptSet, object, field, value);
		case 'Arr':
			var elements = astArgument.a;
			return $author$project$Compiler$ASTToJavascript$javascriptArray(elements);
		case 'ArrRef':
			var array = astArgument.a;
			var pos = astArgument.b;
			return A2($author$project$Compiler$ASTToJavascript$javascriptArrayRef, array, pos);
		case 'Begin':
			var commands = astArgument.a;
			return $author$project$Compiler$ASTToJavascript$javascriptBegin(commands);
		case 'Let':
			var vars = astArgument.a;
			var body = astArgument.b;
			return A2($author$project$Compiler$ASTToJavascript$javascriptLet, vars, body);
		case 'CallFunction':
			var funcName = astArgument.a;
			var args = astArgument.b;
			return A2(
				$elm$core$String$join,
				'',
				_List_fromArray(
					[
						$author$project$Compiler$ASTToJavascript$aSTToJavascript(funcName),
						'(',
						$author$project$Compiler$ASTToJavascript$javascriptCommas(args),
						')'
					]));
		case 'Function':
			var argNames = astArgument.a;
			var body = astArgument.b;
			return A2($author$project$Compiler$ASTToJavascript$javascriptFunction, argNames, body);
		case 'For':
			var _var = astArgument.a;
			var check = astArgument.b;
			var increment = astArgument.c;
			var body = astArgument.d;
			return A4($author$project$Compiler$ASTToJavascript$javascriptFor, _var, check, increment, body);
		case 'VarDeclaration':
			var varName = astArgument.a;
			var varBody = astArgument.b;
			return A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					[
						'let',
						$author$project$Compiler$ASTToJavascript$aSTToJavascript(varName),
						'=',
						$author$project$Compiler$ASTToJavascript$aSTToJavascript(varBody)
					]));
		case 'VarSet':
			var varName = astArgument.a;
			var varBody = astArgument.b;
			return A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					[
						$author$project$Compiler$ASTToJavascript$aSTToJavascript(varName),
						'=',
						$author$project$Compiler$ASTToJavascript$aSTToJavascript(varBody)
					]));
		case 'CachePush':
			var ast = astArgument.a;
			return 'cache.push(' + ($author$project$Compiler$ASTToJavascript$aSTToJavascript(ast) + ')');
		case 'CacheUpdate':
			var index = astArgument.a;
			var ast = astArgument.b;
			return A2(
				$elm$core$String$join,
				'',
				_List_fromArray(
					[
						'cache[',
						$author$project$Compiler$ASTToJavascript$aSTToJavascript(index),
						']',
						' = ',
						$author$project$Compiler$ASTToJavascript$aSTToJavascript(ast)
					]));
		case 'CacheRef':
			var index = astArgument.a;
			return 'cache[' + ($author$project$Compiler$ASTToJavascript$aSTToJavascript(index) + ']');
		case 'If':
			var cond = astArgument.a;
			var thenCase = astArgument.b;
			var elseCase = astArgument.c;
			return A3($author$project$Compiler$ASTToJavascript$javascriptIf, cond, thenCase, elseCase);
		case 'Unary':
			var op = astArgument.a;
			var args = astArgument.b;
			return '(' + (A2(
				$elm$core$String$join,
				op,
				A2($elm$core$List$map, $author$project$Compiler$ASTToJavascript$aSTToJavascript, args)) + ')');
		default:
			var op = astArgument.a;
			var arg = astArgument.b;
			return '(' + (op + ($author$project$Compiler$ASTToJavascript$aSTToJavascript(arg) + ')'));
	}
};
var $author$project$Compiler$ASTToJavascript$javascriptArray = function (elements) {
	return '[' + (A2(
		$elm$core$String$join,
		',',
		A2($elm$core$List$map, $author$project$Compiler$ASTToJavascript$aSTToJavascript, elements)) + ']');
};
var $author$project$Compiler$ASTToJavascript$javascriptArrayRef = F2(
	function (array, pos) {
		return A2(
			$elm$core$String$join,
			'',
			_List_fromArray(
				[
					$author$project$Compiler$ASTToJavascript$aSTToJavascript(array),
					'[',
					$author$project$Compiler$ASTToJavascript$aSTToJavascript(pos),
					']'
				]));
	});
var $author$project$Compiler$ASTToJavascript$javascriptBegin = function (commands) {
	var _v1 = $author$project$Utils$splitLast(commands);
	if (_v1.$ === 'Just') {
		var _v2 = _v1.a;
		var beforeFinal = _v2.a;
		var _final = _v2.b;
		return A2(
			$elm$core$String$join,
			'',
			_List_fromArray(
				[
					'(function(){',
					A2(
					$elm$core$String$join,
					';',
					A2($elm$core$List$map, $author$project$Compiler$ASTToJavascript$aSTToJavascript, beforeFinal)),
					';',
					function () {
					switch (_final.$) {
						case 'VarSet':
							return '';
						case 'VarDeclaration':
							return '';
						default:
							return 'return ';
					}
				}(),
					$author$project$Compiler$ASTToJavascript$aSTToJavascript(_final),
					'}())'
				]));
	} else {
		return '';
	}
};
var $author$project$Compiler$ASTToJavascript$javascriptCommas = function (args) {
	return A2(
		$elm$core$String$join,
		',',
		A2($elm$core$List$map, $author$project$Compiler$ASTToJavascript$aSTToJavascript, args));
};
var $author$project$Compiler$ASTToJavascript$javascriptCopyObject = function (objectAst) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			[
				'Object.assign({},',
				$author$project$Compiler$ASTToJavascript$aSTToJavascript(objectAst),
				')'
			]));
};
var $author$project$Compiler$ASTToJavascript$javascriptCopySet = F2(
	function (object, fields) {
		return A2(
			$elm$core$String$join,
			'',
			_List_fromArray(
				[
					'Object.assign(',
					$author$project$Compiler$ASTToJavascript$javascriptCopyObject(object),
					',',
					$author$project$Compiler$ASTToJavascript$javascriptObject(fields),
					')'
				]));
	});
var $author$project$Compiler$ASTToJavascript$javascriptElse = function (elseCase) {
	var _v0 = $author$project$Compiler$ASTToJavascript$aSTToJavascript(elseCase);
	if (_v0 === '') {
		return '';
	} else {
		var str = _v0;
		return 'else { return ' + (str + '}');
	}
};
var $author$project$Compiler$ASTToJavascript$javascriptField = function (field) {
	return A2(
		$elm$core$String$join,
		':',
		_List_fromArray(
			[
				field.a,
				$author$project$Compiler$ASTToJavascript$aSTToJavascript(field.b)
			]));
};
var $author$project$Compiler$ASTToJavascript$javascriptFor = F4(
	function (_var, check, increment, body) {
		return A2(
			$elm$core$String$join,
			'',
			_List_fromArray(
				[
					'(function() { for(',
					$author$project$Compiler$ASTToJavascript$aSTToJavascript(_var),
					';',
					$author$project$Compiler$ASTToJavascript$aSTToJavascript(check),
					';',
					$author$project$Compiler$ASTToJavascript$aSTToJavascript(increment),
					') {',
					$author$project$Compiler$ASTToJavascript$aSTToJavascript(body),
					'}}())'
				]));
	});
var $author$project$Compiler$ASTToJavascript$javascriptFunction = F2(
	function (argNames, body) {
		return A2(
			$elm$core$String$join,
			'',
			_List_fromArray(
				[
					'function(',
					A2($elm$core$String$join, ',', argNames),
					'){',
					'return ',
					$author$project$Compiler$ASTToJavascript$aSTToJavascript(body),
					'}'
				]));
	});
var $author$project$Compiler$ASTToJavascript$javascriptGet = F2(
	function (object, field) {
		return A2(
			$elm$core$String$join,
			'.',
			_List_fromArray(
				[
					$author$project$Compiler$ASTToJavascript$aSTToJavascript(object),
					$author$project$Compiler$ASTToJavascript$aSTToJavascript(field)
				]));
	});
var $author$project$Compiler$ASTToJavascript$javascriptIf = F3(
	function (bool, thenCase, elseCase) {
		return A2(
			$elm$core$String$join,
			'',
			_List_fromArray(
				[
					'(function() { if(',
					$author$project$Compiler$ASTToJavascript$aSTToJavascript(bool),
					') {',
					'return ',
					$author$project$Compiler$ASTToJavascript$aSTToJavascript(thenCase),
					'}',
					$author$project$Compiler$ASTToJavascript$javascriptElse(elseCase),
					'}())'
				]));
	});
var $author$project$Compiler$ASTToJavascript$javascriptLet = F2(
	function (vars, body) {
		return $author$project$Compiler$ASTToJavascript$aSTToJavascript(
			$author$project$Compiler$CompModel$Begin(
				_Utils_ap(
					A2(
						$elm$core$List$map,
						function (_var) {
							return A2(
								$author$project$Compiler$CompModel$VarDeclaration,
								$author$project$Compiler$CompModel$Lit(_var.a),
								_var.b);
						},
						vars),
					_List_fromArray(
						[body]))));
	});
var $author$project$Compiler$ASTToJavascript$javascriptObject = function (fields) {
	return '{' + (A2(
		$elm$core$String$join,
		',',
		A2($elm$core$List$map, $author$project$Compiler$ASTToJavascript$javascriptField, fields)) + '}');
};
var $author$project$Compiler$ASTToJavascript$javascriptSet = F3(
	function (object, field, value) {
		return A2(
			$elm$core$String$join,
			'',
			_List_fromArray(
				[
					$author$project$Compiler$ASTToJavascript$aSTToJavascript(object),
					'.',
					$author$project$Compiler$ASTToJavascript$aSTToJavascript(field),
					' = ',
					$author$project$Compiler$ASTToJavascript$aSTToJavascript(value)
				]));
	});
var $author$project$Compiler$CompModel$CacheRef = function (a) {
	return {$: 'CacheRef', a: a};
};
var $author$project$Compiler$CompModel$CacheUpdate = F2(
	function (a, b) {
		return {$: 'CacheUpdate', a: a, b: b};
	});
var $author$project$Compiler$CompModel$Function = F2(
	function (a, b) {
		return {$: 'Function', a: a, b: b};
	});
var $author$project$Compiler$CompileFunction$getValueFunctionAST = A2(
	$author$project$Compiler$CompModel$VarDeclaration,
	$author$project$Compiler$CompModel$Lit('getValueAt'),
	A2(
		$author$project$Compiler$CompModel$Function,
		_List_fromArray(
			['cache', 'cacheI']),
		A2(
			$author$project$Compiler$CompModel$Let,
			_List_fromArray(
				[
					_Utils_Tuple2(
					'val',
					A2(
						$author$project$Compiler$CompModel$CallFunction,
						$author$project$Compiler$CompModel$CacheRef(
							$author$project$Compiler$CompModel$Lit('cacheI')),
						_List_Nil))
				]),
			$author$project$Compiler$CompModel$Begin(
				_List_fromArray(
					[
						A2(
						$author$project$Compiler$CompModel$CacheUpdate,
						$author$project$Compiler$CompModel$Lit('cacheI'),
						A2(
							$author$project$Compiler$CompModel$Function,
							_List_Nil,
							$author$project$Compiler$CompModel$Lit('val'))),
						$author$project$Compiler$CompModel$Lit('val')
					])))));
var $author$project$Compiler$CompModel$Object = function (a) {
	return {$: 'Object', a: a};
};
var $author$project$Compiler$CompileToAST$globals = _List_fromArray(
	[
		A2(
		$author$project$Compiler$CompModel$VarDeclaration,
		$author$project$Compiler$CompModel$Lit('startTime'),
		$author$project$Compiler$CompModel$Lit('getTime()')),
		A2(
		$author$project$Compiler$CompModel$VarDeclaration,
		$author$project$Compiler$CompModel$Lit('functions'),
		$author$project$Compiler$CompModel$Object(_List_Nil))
	]);
var $author$project$Compiler$CompModel$VarSet = F2(
	function (a, b) {
		return {$: 'VarSet', a: a, b: b};
	});
var $author$project$Compiler$CompileToAST$initialVariables = _List_fromArray(
	[
		A2(
		$author$project$Compiler$CompModel$VarSet,
		$author$project$Compiler$CompModel$Lit('time'),
		A2(
			$author$project$Compiler$CompModel$Unary,
			'-',
			_List_fromArray(
				[
					$author$project$Compiler$CompModel$Lit('getTime()'),
					$author$project$Compiler$CompModel$Lit('startTime')
				])))
	]);
var $author$project$Compiler$CompileToAST$varSetToVarDec = function (ast) {
	if (ast.$ === 'VarSet') {
		var a = ast.a;
		var b = ast.b;
		return A2($author$project$Compiler$CompModel$VarDeclaration, a, b);
	} else {
		return A2(
			$author$project$Compiler$CompModel$VarDeclaration,
			$author$project$Compiler$CompModel$Lit('bad'),
			$author$project$Compiler$CompModel$Lit('shouldnothappen'));
	}
};
var $author$project$Compiler$CompileToAST$initialVariablesDeclaration = A2($elm$core$List$map, $author$project$Compiler$CompileToAST$varSetToVarDec, $author$project$Compiler$CompileToAST$initialVariables);
var $author$project$Compiler$Song$litFunc = function (lit) {
	return A2($author$project$Compiler$CompModel$Function, _List_Nil, lit);
};
var $author$project$Compiler$CompModel$maximum = function (args) {
	return A2(
		$author$project$Compiler$CompModel$CallFunction,
		$author$project$Compiler$CompModel$Lit('Math.max'),
		args);
};
var $author$project$Compiler$Song$songType = $author$project$Compiler$CompModel$Lit('\'song\'');
var $author$project$Compiler$CompModel$sum = function (args) {
	return A2($author$project$Compiler$CompModel$Unary, '+', args);
};
var $author$project$Compiler$Song$appendFunc = A2(
	$author$project$Compiler$CompModel$VarDeclaration,
	$author$project$Compiler$CompModel$Lit('append'),
	A2(
		$author$project$Compiler$CompModel$Function,
		_List_fromArray(
			['song1', 'song2']),
		$author$project$Compiler$CompModel$Object(
			_List_fromArray(
				[
					_Utils_Tuple2('type', $author$project$Compiler$Song$songType),
					_Utils_Tuple2(
					'children',
					$author$project$Compiler$CompModel$Arr(
						_List_fromArray(
							[
								$author$project$Compiler$Song$litFunc(
								$author$project$Compiler$CompModel$Lit('song1')),
								$author$project$Compiler$Song$litFunc(
								A2(
									$author$project$Compiler$CompModel$CopySet,
									$author$project$Compiler$CompModel$Lit('song2'),
									_List_fromArray(
										[
											_Utils_Tuple2(
											'time',
											$author$project$Compiler$CompModel$sum(
												_List_fromArray(
													[
														A2(
														$author$project$Compiler$CompModel$getLit,
														$author$project$Compiler$CompModel$Lit('song2'),
														'time'),
														A2(
														$author$project$Compiler$CompModel$getLit,
														$author$project$Compiler$CompModel$Lit('song1'),
														'anchor')
													])))
										])))
							]))),
					_Utils_Tuple2(
					'time',
					$author$project$Compiler$CompModel$litInt(0)),
					_Utils_Tuple2(
					'anchor',
					$author$project$Compiler$CompModel$sum(
						_List_fromArray(
							[
								A2(
								$author$project$Compiler$CompModel$getLit,
								$author$project$Compiler$CompModel$Lit('song1'),
								'anchor'),
								A2(
								$author$project$Compiler$CompModel$getLit,
								$author$project$Compiler$CompModel$Lit('song2'),
								'anchor')
							]))),
					_Utils_Tuple2(
					'duration',
					$author$project$Compiler$CompModel$maximum(
						_List_fromArray(
							[
								A2(
								$author$project$Compiler$CompModel$getLit,
								$author$project$Compiler$CompModel$Lit('song1'),
								'duration'),
								$author$project$Compiler$CompModel$sum(
								_List_fromArray(
									[
										A2(
										$author$project$Compiler$CompModel$getLit,
										$author$project$Compiler$CompModel$Lit('song2'),
										'duration'),
										A2(
										$author$project$Compiler$CompModel$getLit,
										$author$project$Compiler$CompModel$Lit('song2'),
										'time')
									]))
							])))
				]))));
var $author$project$Compiler$Song$joinFunc = A2(
	$author$project$Compiler$CompModel$VarDeclaration,
	$author$project$Compiler$CompModel$Lit('join'),
	A2(
		$author$project$Compiler$CompModel$Function,
		_List_fromArray(
			['song1', 'song2']),
		A3(
			$author$project$Compiler$CompModel$If,
			A2(
				$author$project$Compiler$CompModel$Unary,
				'>',
				_List_fromArray(
					[
						$author$project$Compiler$Song$getAnchor(
						$author$project$Compiler$CompModel$Lit('song1')),
						$author$project$Compiler$Song$getAnchor(
						$author$project$Compiler$CompModel$Lit('song2'))
					])),
			A2(
				$author$project$Compiler$Song$append,
				A2(
					$author$project$Compiler$CompModel$CopySet,
					$author$project$Compiler$CompModel$Lit('song2'),
					_List_fromArray(
						[
							_Utils_Tuple2(
							'anchor',
							$author$project$Compiler$CompModel$litInt(0))
						])),
				$author$project$Compiler$CompModel$Lit('song1')),
			A2(
				$author$project$Compiler$Song$append,
				A2(
					$author$project$Compiler$CompModel$CopySet,
					$author$project$Compiler$CompModel$Lit('song1'),
					_List_fromArray(
						[
							_Utils_Tuple2(
							'anchor',
							$author$project$Compiler$CompModel$litInt(0))
						])),
				$author$project$Compiler$CompModel$Lit('song2')))));
var $author$project$Compiler$Note$noteType = $author$project$Compiler$CompModel$Lit('\'note\'');
var $author$project$Compiler$Note$makeNote = F2(
	function (frequency, volume) {
		return $author$project$Compiler$CompModel$Object(
			_List_fromArray(
				[
					_Utils_Tuple2('type', $author$project$Compiler$Note$noteType),
					_Utils_Tuple2('frequency', frequency),
					_Utils_Tuple2('volume', volume)
				]));
	});
var $author$project$Compiler$Song$noteSongFunc = A2(
	$author$project$Compiler$CompModel$VarDeclaration,
	$author$project$Compiler$CompModel$Lit('noteSong'),
	A2(
		$author$project$Compiler$CompModel$Function,
		_List_fromArray(
			['time', 'frequency', 'duration']),
		$author$project$Compiler$CompModel$Object(
			_List_fromArray(
				[
					_Utils_Tuple2('type', $author$project$Compiler$Song$songType),
					_Utils_Tuple2(
					'children',
					$author$project$Compiler$CompModel$Arr(
						_List_fromArray(
							[
								$author$project$Compiler$Song$litFunc(
								A2(
									$author$project$Compiler$Note$makeNote,
									$author$project$Compiler$CompModel$Lit('frequency'),
									$author$project$Compiler$CompModel$litFloat(1)))
							]))),
					_Utils_Tuple2(
					'time',
					$author$project$Compiler$CompModel$Lit('time')),
					_Utils_Tuple2(
					'anchor',
					$author$project$Compiler$CompModel$Lit('duration')),
					_Utils_Tuple2(
					'duration',
					$author$project$Compiler$CompModel$Lit('duration'))
				]))));
var $author$project$Compiler$Song$javascriptFuncs = _List_fromArray(
	[$author$project$Compiler$Song$appendFunc, $author$project$Compiler$Song$noteSongFunc, $author$project$Compiler$Song$joinFunc]);
var $author$project$Compiler$CompileToAST$astHead = A2(
	$elm$core$List$cons,
	$author$project$Compiler$CompileFunction$getValueFunctionAST,
	_Utils_ap(
		$author$project$Compiler$CompileToAST$globals,
		_Utils_ap($author$project$Compiler$CompileToAST$initialVariablesDeclaration, $author$project$Compiler$Song$javascriptFuncs)));
var $author$project$Compiler$CompModel$Set = F3(
	function (a, b, c) {
		return {$: 'Set', a: a, b: b, c: c};
	});
var $author$project$Compiler$CompileFunction$buildArgs = function (method) {
	return A2(
		$elm$core$List$map,
		function (index) {
			return $author$project$Compiler$CompModel$argName(index);
		},
		A2($elm$core$List$range, 0, method.argCount - 1));
};
var $author$project$Compiler$CompModel$CachePush = function (a) {
	return {$: 'CachePush', a: a};
};
var $author$project$Compiler$CompileFunction$compileExpr = F2(
	function (expr, entireMethod) {
		return $author$project$Compiler$CompModel$CachePush(
			A2(
				$author$project$Compiler$CompModel$Function,
				_List_Nil,
				function () {
					var _v0 = expr.compileExprFunction;
					var func = _v0.a;
					return func(expr);
				}()));
	});
var $author$project$Compiler$CompileFunction$functionEnd = function (method) {
	return $author$project$Compiler$CompileFunction$getCacheValue(
		$author$project$Compiler$CompModel$litInt(
			$elm$core$List$length(method.exprs) - 1));
};
var $author$project$Compiler$CompileFunction$compileExprs = F2(
	function (method, entireMethod) {
		if (!method.b) {
			return _List_Nil;
		} else {
			if (!method.b.b) {
				var expr = method.a;
				return _List_fromArray(
					[
						A2($author$project$Compiler$CompileFunction$compileExpr, expr, entireMethod),
						$author$project$Compiler$CompileFunction$functionEnd(entireMethod)
					]);
			} else {
				var expr = method.a;
				var exprs = method.b;
				return A2(
					$elm$core$List$cons,
					A2($author$project$Compiler$CompileFunction$compileExpr, expr, entireMethod),
					A2($author$project$Compiler$CompileFunction$compileExprs, exprs, entireMethod));
			}
		}
	});
var $author$project$Compiler$CompileFunction$functionStart = function (method) {
	return A2(
		$author$project$Compiler$CompModel$VarDeclaration,
		$author$project$Compiler$CompModel$Lit('cache'),
		$author$project$Compiler$CompModel$Arr(_List_Nil));
};
var $author$project$Compiler$CompileFunction$compileFunction = function (method) {
	return A2(
		$author$project$Compiler$CompModel$Function,
		$author$project$Compiler$CompileFunction$buildArgs(method),
		$author$project$Compiler$CompModel$Begin(
			A2(
				$elm$core$List$cons,
				$author$project$Compiler$CompileFunction$functionStart(method),
				A2($author$project$Compiler$CompileFunction$compileExprs, method.exprs, method))));
};
var $author$project$Compiler$CompileToAST$compileOneFunction = function (funcTuple) {
	return A3(
		$author$project$Compiler$CompModel$Set,
		$author$project$Compiler$CompModel$Lit('functions'),
		$author$project$Compiler$CompModel$Lit(funcTuple.a),
		$author$project$Compiler$CompileFunction$compileFunction(funcTuple.b));
};
var $author$project$Compiler$CompileToAST$compileFunctions = function (compModel) {
	return A2(
		$elm$core$List$map,
		$author$project$Compiler$CompileToAST$compileOneFunction,
		$elm$core$Dict$toList(compModel));
};
var $author$project$Compiler$CompModel$ArrRef = F2(
	function (a, b) {
		return {$: 'ArrRef', a: a, b: b};
	});
var $author$project$Compiler$CompModel$For = F4(
	function (a, b, c, d) {
		return {$: 'For', a: a, b: b, c: c, d: d};
	});
var $author$project$Compiler$CompModel$while = F2(
	function (condition, body) {
		return A4($author$project$Compiler$CompModel$For, $author$project$Compiler$CompModel$Empty, condition, $author$project$Compiler$CompModel$Empty, body);
	});
var $author$project$Compiler$CompileBuiltIn$handleContinuations = function (ast) {
	return $author$project$Compiler$CompModel$Begin(
		_List_fromArray(
			[
				A2(
				$author$project$Compiler$CompModel$VarDeclaration,
				$author$project$Compiler$CompModel$Lit('cont'),
				ast),
				A2(
				$author$project$Compiler$CompModel$while,
				A2(
					$author$project$Compiler$CompModel$ArrRef,
					$author$project$Compiler$CompModel$Lit('cont'),
					$author$project$Compiler$CompModel$litInt(0)),
				A2(
					$author$project$Compiler$CompModel$VarSet,
					$author$project$Compiler$CompModel$Lit('cont'),
					A2(
						$author$project$Compiler$CompModel$CallFunction,
						A2(
							$author$project$Compiler$CompModel$ArrRef,
							$author$project$Compiler$CompModel$Lit('cont'),
							$author$project$Compiler$CompModel$litInt(1)),
						_List_Nil))),
				A2(
				$author$project$Compiler$CompModel$ArrRef,
				$author$project$Compiler$CompModel$Lit('cont'),
				$author$project$Compiler$CompModel$litInt(1))
			]));
};
var $author$project$Compiler$CompileToAST$loopFunctionBody = $author$project$Compiler$CompModel$Begin(
	_Utils_ap(
		$author$project$Compiler$CompileToAST$initialVariables,
		_List_fromArray(
			[
				A2(
				$author$project$Compiler$CompModel$CallFunction,
				$author$project$Compiler$CompModel$Lit('sleep'),
				_List_fromArray(
					[
						$author$project$Compiler$CompModel$Lit('4')
					])),
				A2(
				$author$project$Compiler$CompModel$CallFunction,
				$author$project$Compiler$CompModel$Lit('onTick'),
				_List_fromArray(
					[
						$author$project$Compiler$CompModel$Lit('state')
					])),
				A2(
				$author$project$Compiler$CompModel$CallFunction,
				$author$project$Compiler$CompModel$Lit('update'),
				_List_fromArray(
					[
						$author$project$Compiler$CompModel$Lit('state'),
						$author$project$Compiler$CompileBuiltIn$handleContinuations(
						A2(
							$author$project$Compiler$CompModel$CallFunction,
							A2(
								$author$project$Compiler$CompModel$Get,
								$author$project$Compiler$CompModel$Lit('functions'),
								$author$project$Compiler$CompModel$Lit('main')),
							_List_Nil)),
						$author$project$Compiler$CompModel$Lit('time')
					]))
			])));
var $author$project$Compiler$CompileToAST$loopAST = A2(
	$author$project$Compiler$CompModel$while,
	$author$project$Compiler$CompModel$Lit('true'),
	$author$project$Compiler$CompileToAST$loopFunctionBody);
var $author$project$Compiler$CompileToAST$compileToAST = function (compModel) {
	return $author$project$Compiler$CompModel$Begin(
		_Utils_ap(
			$author$project$Compiler$CompileToAST$astHead,
			_Utils_ap(
				$author$project$Compiler$CompileToAST$compileFunctions(compModel),
				_List_fromArray(
					[$author$project$Compiler$CompileToAST$loopAST]))));
};
var $author$project$Compiler$Compile$compile = function (compModel) {
	return A2(
		$elm$core$Debug$log,
		'Running Program',
		$author$project$Compiler$ASTToJavascript$aSTToJavascript(
			$author$project$Compiler$CompileToAST$compileToAST(compModel)));
};
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (result.$ === 'Ok') {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $author$project$Compiler$CompModel$Method = F2(
	function (argCount, exprs) {
		return {argCount: argCount, exprs: exprs};
	});
var $author$project$Compiler$CompileBuiltIn$buildLiteralFuncCall = function (expr) {
	return A2(
		$author$project$Compiler$CompModel$CallFunction,
		A2(
			$author$project$Compiler$CompModel$getLit,
			$author$project$Compiler$CompModel$Lit('functions'),
			expr.functionName),
		A2($elm$core$List$map, $author$project$Compiler$CompileBuiltIn$buildValue, expr.children));
};
var $author$project$Compiler$CompileBuiltIn$buildFuncCall = function (expr) {
	return $author$project$Compiler$CompileBuiltIn$handleContinuations(
		$author$project$Compiler$CompileBuiltIn$buildLiteralFuncCall(expr));
};
var $author$project$Compiler$CompModel$Expr = F4(
	function (functionName, id, children, compileExprFunction) {
		return {children: children, compileExprFunction: compileExprFunction, functionName: functionName, id: id};
	});
var $author$project$Compiler$OnionToExpr$dropFinalHole = function (argList) {
	if (!argList.b) {
		return _List_Nil;
	} else {
		if (!argList.b.b) {
			var finalArg = argList.a;
			if (finalArg.$ === 'Hole') {
				return _List_Nil;
			} else {
				return argList;
			}
		} else {
			var arg = argList.a;
			var args = argList.b;
			return A2(
				$elm$core$List$cons,
				arg,
				$author$project$Compiler$OnionToExpr$dropFinalHole(args));
		}
	}
};
var $author$project$Compiler$OnionToExpr$argumentSubset = F2(
	function (argList, inputs) {
		if (argList.$ === 'Finite') {
			var args = argList.a;
			return inputs;
		} else {
			var args = argList.a;
			var othername = argList.b;
			return $author$project$Compiler$OnionToExpr$dropFinalHole(inputs);
		}
	});
var $author$project$Compiler$OnionToExpr$checkCorrectNumberArguments = F2(
	function (argList, inputs) {
		if (argList.$ === 'Finite') {
			var args = argList.a;
			return _Utils_cmp(
				$elm$core$List$length(inputs),
				$elm$core$List$length(args)) > -1;
		} else {
			var args = argList.a;
			var othername = argList.b;
			return _Utils_cmp(
				$elm$core$List$length(inputs),
				$elm$core$List$length(args)) > -1;
		}
	});
var $author$project$Compiler$CompModel$FArg = function (a) {
	return {$: 'FArg', a: a};
};
var $author$project$Compiler$CompModel$ScriptVariable = function (a) {
	return {$: 'ScriptVariable', a: a};
};
var $author$project$Compiler$CompModel$StackIndex = function (a) {
	return {$: 'StackIndex', a: a};
};
var $elm$core$String$toFloat = _String_toFloat;
var $author$project$Compiler$OnionToExpr$inputToValue = F2(
	function (input, idToIndex) {
		switch (input.$) {
			case 'Output':
				var output = input.a;
				var _v1 = A2($elm$core$Dict$get, output, idToIndex);
				if (_v1.$ === 'Just') {
					var index = _v1.a;
					return $elm$core$Result$Ok(
						$author$project$Compiler$CompModel$StackIndex(index));
				} else {
					return $elm$core$Result$Err('Invalid input found');
				}
			case 'Text':
				var text = input.a;
				var _v2 = A2($elm$core$Dict$get, text, $author$project$BuiltIn$builtInVariables);
				if (_v2.$ === 'Nothing') {
					var _v3 = $elm$core$String$toFloat(text);
					if (_v3.$ === 'Nothing') {
						return $elm$core$Result$Err('Could not parse number');
					} else {
						var _float = _v3.a;
						return $elm$core$Result$Ok(
							$author$project$Compiler$CompModel$ConstV(_float));
					}
				} else {
					switch (_v2.a.$) {
						case 'Number':
							var value = _v2.a.a;
							return $elm$core$Result$Ok(
								$author$project$Compiler$CompModel$ConstV(value));
						case 'StackReference':
							var index = _v2.a.a;
							return $elm$core$Result$Ok(
								$author$project$Compiler$CompModel$StackIndex(index));
						default:
							var varName = _v2.a.a;
							return $elm$core$Result$Ok(
								$author$project$Compiler$CompModel$ScriptVariable(varName));
					}
				}
			case 'FunctionArg':
				var index = input.a;
				return $elm$core$Result$Ok(
					$author$project$Compiler$CompModel$FArg(index));
			default:
				return $elm$core$Result$Err('No argument supplied to a function call');
		}
	});
var $elm$core$Result$map2 = F3(
	function (func, ra, rb) {
		if (ra.$ === 'Err') {
			var x = ra.a;
			return $elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 'Err') {
				var x = rb.a;
				return $elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				return $elm$core$Result$Ok(
					A2(func, a, b));
			}
		}
	});
var $author$project$Compiler$OnionToExpr$inputsToValues = F2(
	function (inputs, idToIndex) {
		if (!inputs.b) {
			return $elm$core$Result$Ok(_List_Nil);
		} else {
			var input = inputs.a;
			var rest = inputs.b;
			return A3(
				$elm$core$Result$map2,
				$elm$core$List$cons,
				A2($author$project$Compiler$OnionToExpr$inputToValue, input, idToIndex),
				A2($author$project$Compiler$OnionToExpr$inputsToValues, rest, idToIndex));
		}
	});
var $author$project$Compiler$OnionToExpr$callToExprWith = F4(
	function (call, idToIndex, argList, compileExprFunction) {
		var filteredInputs = A2($author$project$Compiler$OnionToExpr$argumentSubset, argList, call.inputs);
		if (A2($author$project$Compiler$OnionToExpr$checkCorrectNumberArguments, argList, filteredInputs)) {
			var _v0 = A2($author$project$Compiler$OnionToExpr$inputsToValues, filteredInputs, idToIndex);
			if (_v0.$ === 'Ok') {
				var children = _v0.a;
				return $elm$core$Result$Ok(
					A4($author$project$Compiler$CompModel$Expr, call.functionName, call.id, children, compileExprFunction));
			} else {
				var e = _v0.a;
				return $elm$core$Result$Err(e);
			}
		} else {
			return $elm$core$Result$Err('Wrong number of arguments');
		}
	});
var $author$project$Compiler$OnionToExpr$callToExpr = F3(
	function (call, idToIndex, onionMap) {
		var _v0 = A2($elm$core$Dict$get, call.functionName, $author$project$BuiltIn$builtInFunctions);
		if (_v0.$ === 'Just') {
			var builtIn = _v0.a;
			return A4($author$project$Compiler$OnionToExpr$callToExprWith, call, idToIndex, builtIn.argList, builtIn.compileExprFunction);
		} else {
			var _v1 = A2($elm$core$Dict$get, call.functionName, onionMap);
			if (_v1.$ === 'Just') {
				var func = _v1.a;
				return A4(
					$author$project$Compiler$OnionToExpr$callToExprWith,
					call,
					idToIndex,
					$author$project$ModelHelpers$funcToArgList(func),
					$author$project$Compiler$CompModel$CompileExprFunction($author$project$Compiler$CompileBuiltIn$buildFuncCall));
			} else {
				return $elm$core$Result$Err('Not a function name');
			}
		}
	});
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $author$project$Utils$resultMap = F2(
	function (func, list) {
		if (!list.b) {
			return $elm$core$Result$Ok(_List_Nil);
		} else {
			var first = list.a;
			var rest = list.b;
			return A3(
				$elm$core$Result$map2,
				$elm$core$List$cons,
				func(first),
				A2($author$project$Utils$resultMap, func, rest));
		}
	});
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $author$project$Compiler$HandleTailRecursion$buildCont = function (expr) {
	var _v0 = expr.compileExprFunction;
	var func = _v0.a;
	return $author$project$Compiler$CompModel$CompileExprFunction(
		function (e) {
			return $author$project$Compiler$CompModel$Arr(
				_List_fromArray(
					[
						$author$project$Compiler$CompModel$false,
						func(e)
					]));
		});
};
var $author$project$Compiler$HandleTailRecursion$normalTail = F3(
	function (exprArr, pos, expr) {
		return A3(
			$elm$core$Array$set,
			pos,
			_Utils_update(
				expr,
				{
					compileExprFunction: $author$project$Compiler$HandleTailRecursion$buildCont(expr)
				}),
			exprArr);
	});
var $author$project$Compiler$CompModel$true = $author$project$Compiler$CompModel$Lit('true');
var $author$project$Compiler$CompileBuiltIn$buildTailFuncCall = function (expr) {
	return $author$project$Compiler$CompModel$Arr(
		_List_fromArray(
			[
				$author$project$Compiler$CompModel$true,
				A2(
				$author$project$Compiler$CompModel$Function,
				_List_Nil,
				$author$project$Compiler$CompileBuiltIn$buildLiteralFuncCall(expr))
			]));
};
var $author$project$Compiler$HandleTailRecursion$tailFunc = F4(
	function (exprArr, pos, expr, numRefs) {
		var _v0 = A2($elm$core$Array$get, pos, numRefs);
		if (_v0.$ === 'Just') {
			var n = _v0.a;
			return (n < 2) ? A3(
				$elm$core$Array$set,
				pos,
				_Utils_update(
					expr,
					{
						compileExprFunction: $author$project$Compiler$CompModel$CompileExprFunction($author$project$Compiler$CompileBuiltIn$buildTailFuncCall)
					}),
				exprArr) : A3($author$project$Compiler$HandleTailRecursion$normalTail, exprArr, pos, expr);
		} else {
			return A3($author$project$Compiler$HandleTailRecursion$normalTail, exprArr, pos, expr);
		}
	});
var $author$project$Compiler$HandleTailRecursion$makeContinuations = F4(
	function (exprArr, numRefs, pos, onionMap) {
		var _v0 = A2($elm$core$Array$get, pos, exprArr);
		if (_v0.$ === 'Nothing') {
			return exprArr;
		} else {
			var expr = _v0.a;
			var _v1 = expr.functionName;
			if (_v1 === 'if') {
				var _v2 = expr.children;
				if (((_v2.b && _v2.b.b) && _v2.b.b.b) && (!_v2.b.b.b.b)) {
					var cond = _v2.a;
					var _v3 = _v2.b;
					var left = _v3.a;
					var _v4 = _v3.b;
					var right = _v4.a;
					var rightWrap = function () {
						if (right.$ === 'StackIndex') {
							var p = right.a;
							return false;
						} else {
							return true;
						}
					}();
					var leftWrap = function () {
						if (left.$ === 'StackIndex') {
							var p = left.a;
							return false;
						} else {
							return true;
						}
					}();
					var leftRecur = function () {
						if (left.$ === 'StackIndex') {
							var p = left.a;
							return A4($author$project$Compiler$HandleTailRecursion$makeContinuations, exprArr, numRefs, p, onionMap);
						} else {
							return exprArr;
						}
					}();
					var rightRecur = function () {
						if (right.$ === 'StackIndex') {
							var p = right.a;
							return A4($author$project$Compiler$HandleTailRecursion$makeContinuations, leftRecur, numRefs, p, onionMap);
						} else {
							return leftRecur;
						}
					}();
					return A3(
						$elm$core$Array$set,
						pos,
						_Utils_update(
							expr,
							{
								compileExprFunction: $author$project$Compiler$CompModel$CompileExprFunction(
									A2($author$project$Compiler$CompileBuiltIn$buildIf, leftWrap, rightWrap))
							}),
						rightRecur);
				} else {
					return exprArr;
				}
			} else {
				var other = _v1;
				var _v9 = A2($elm$core$Dict$get, other, onionMap);
				if (_v9.$ === 'Just') {
					var func = _v9.a;
					return A4($author$project$Compiler$HandleTailRecursion$tailFunc, exprArr, pos, expr, numRefs);
				} else {
					return A3($author$project$Compiler$HandleTailRecursion$normalTail, exprArr, pos, expr);
				}
			}
		}
	});
var $author$project$Compiler$HandleTailRecursion$arrayIncrement = F2(
	function (arr, index) {
		return A3(
			$elm$core$Array$set,
			index,
			1 + A2(
				$elm$core$Maybe$withDefault,
				0,
				A2($elm$core$Array$get, index, arr)),
			arr);
	});
var $author$project$Compiler$HandleTailRecursion$addChildren = F2(
	function (children, numRefs) {
		addChildren:
		while (true) {
			if (!children.b) {
				return numRefs;
			} else {
				var child = children.a;
				var rest = children.b;
				if (child.$ === 'StackIndex') {
					var i = child.a;
					var $temp$children = rest,
						$temp$numRefs = A2($author$project$Compiler$HandleTailRecursion$arrayIncrement, numRefs, i);
					children = $temp$children;
					numRefs = $temp$numRefs;
					continue addChildren;
				} else {
					var $temp$children = rest,
						$temp$numRefs = numRefs;
					children = $temp$children;
					numRefs = $temp$numRefs;
					continue addChildren;
				}
			}
		}
	});
var $author$project$Compiler$HandleTailRecursion$makeNumRefs = F2(
	function (exprs, numRefs) {
		makeNumRefs:
		while (true) {
			if (!exprs.b) {
				return numRefs;
			} else {
				var expr = exprs.a;
				var rest = exprs.b;
				var $temp$exprs = rest,
					$temp$numRefs = A2($author$project$Compiler$HandleTailRecursion$addChildren, expr.children, numRefs);
				exprs = $temp$exprs;
				numRefs = $temp$numRefs;
				continue makeNumRefs;
			}
		}
	});
var $elm$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			$elm$core$Array$initialize,
			n,
			function (_v0) {
				return e;
			});
	});
var $author$project$Compiler$HandleTailRecursion$returnContinuation = F2(
	function (onionMap, exprs) {
		var exprArr = $elm$core$Array$fromList(exprs);
		var numRefs = A2(
			$author$project$Compiler$HandleTailRecursion$makeNumRefs,
			exprs,
			A2(
				$elm$core$Array$repeat,
				$elm$core$Array$length(exprArr),
				0));
		return $elm$core$Array$toList(
			A4(
				$author$project$Compiler$HandleTailRecursion$makeContinuations,
				exprArr,
				numRefs,
				$elm$core$Array$length(exprArr) - 1,
				onionMap));
	});
var $author$project$Compiler$OnionToExpr$callsToExprs = F3(
	function (calls, onionMap, idToIndex) {
		return A2(
			$elm$core$Result$map,
			$author$project$Compiler$HandleTailRecursion$returnContinuation(onionMap),
			A2(
				$author$project$Utils$resultMap,
				function (call) {
					return A3($author$project$Compiler$OnionToExpr$callToExpr, call, idToIndex, onionMap);
				},
				calls));
	});
var $author$project$Compiler$OnionToExpr$checkName = function (func) {
	return $elm$core$String$isEmpty(func.name) ? $elm$core$Result$Err('Empty function name') : (A2($elm$core$String$contains, ' ', func.name) ? $elm$core$Result$Err('No whitespace allowed in function name') : $elm$core$Result$Ok(func.name));
};
var $author$project$Compiler$OnionToExpr$makeIdToIndex = F3(
	function (func, dict, index) {
		makeIdToIndex:
		while (true) {
			if (!func.b) {
				return dict;
			} else {
				var e = func.a;
				var es = func.b;
				var $temp$func = es,
					$temp$dict = A3($elm$core$Dict$insert, e.id, index, dict),
					$temp$index = index + 1;
				func = $temp$func;
				dict = $temp$dict;
				index = $temp$index;
				continue makeIdToIndex;
			}
		}
	});
var $author$project$Compiler$OnionToExpr$functionToMethod = F2(
	function (onionMap, func) {
		var idToPos = A3($author$project$Compiler$OnionToExpr$makeIdToIndex, func.calls, $elm$core$Dict$empty, 0);
		var funcName = $author$project$Compiler$OnionToExpr$checkName(func);
		return A3(
			$elm$core$Result$map2,
			F2(
				function (exprs, name) {
					return _Utils_Tuple2(
						name,
						A2(
							$author$project$Compiler$CompModel$Method,
							$elm$core$List$length(func.args),
							exprs));
				}),
			A3($author$project$Compiler$OnionToExpr$callsToExprs, func.calls, onionMap, idToPos),
			funcName);
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $author$project$ModelHelpers$makeOnionMap = function (onion) {
	if (!onion.b) {
		return $elm$core$Result$Ok($elm$core$Dict$empty);
	} else {
		var func = onion.a;
		var funcs = onion.b;
		return A2(
			$elm$core$Result$andThen,
			function (currentMap) {
				return A2($elm$core$Dict$member, func.name, currentMap) ? $elm$core$Result$Err('Cannot define two functions with the name ' + func.name) : $elm$core$Result$Ok(
					A3($elm$core$Dict$insert, func.name, func, currentMap));
			},
			$author$project$ModelHelpers$makeOnionMap(funcs));
	}
};
var $author$project$Compiler$OnionToExpr$onionToCompModel = function (onion) {
	return A2(
		$elm$core$Result$andThen,
		function (onionMap) {
			return A2(
				$elm$core$Result$map,
				$elm$core$Dict$fromList,
				A2(
					$author$project$Utils$resultMap,
					$author$project$Compiler$OnionToExpr$functionToMethod(onionMap),
					onion));
		},
		$author$project$ModelHelpers$makeOnionMap(onion));
};
var $author$project$Compiler$Compile$compileOnion = function (onion) {
	var _v0 = $author$project$Compiler$OnionToExpr$onionToCompModel(onion);
	if (_v0.$ === 'Ok') {
		var compModel = _v0.a;
		return $elm$core$Result$Ok(
			$author$project$Compiler$Compile$compile(compModel));
	} else {
		var e = _v0.a;
		return $elm$core$Result$Err(e);
	}
};
var $author$project$Update$evalJavascript = _Platform_outgoingPort('evalJavascript', $elm$json$Json$Encode$string);
var $author$project$Update$playOnionResult = F2(
	function (model, onion) {
		var _v0 = $author$project$Compiler$Compile$compileOnion(onion);
		if (_v0.$ === 'Err') {
			var e = _v0.a;
			return _Utils_Tuple2(
				A2($author$project$Update$modelWithError, model, e),
				$elm$core$Platform$Cmd$none);
		} else {
			var s = _v0.a;
			return _Utils_Tuple2(
				model,
				$author$project$Update$evalJavascript(s));
		}
	});
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$Update$stopJavascript = _Platform_outgoingPort(
	'stopJavascript',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Update$stopSoundResult = function (model) {
	return _Utils_Tuple2(
		model,
		$author$project$Update$stopJavascript(_Utils_Tuple0));
};
var $author$project$Update$updateWindow = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'NoOp':
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 'SilentDomError':
				var dom_error = msg.a;
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 'SetError':
				var errorString = msg.a;
				return _Utils_Tuple2(
					A2($author$project$Update$modelWithError, model, errorString),
					$elm$core$Platform$Cmd$none);
			case 'PlayOnion':
				var onion = msg.a;
				return A2($author$project$Update$playOnionResult, model, onion);
			case 'StopSound':
				return $author$project$Update$stopSoundResult(model);
			case 'MouseRelease':
				return $author$project$Update$modelMouseRelease(model);
			case 'MouseMoved':
				var pos = msg.a;
				var oldMouse = model.mouseState;
				var newMouse = _Utils_update(
					oldMouse,
					{mouseX: pos.x, mouseY: pos.y});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{mouseState: newMouse}),
					$elm$core$Platform$Cmd$none);
			case 'ScrollChange':
				var pos = msg.a;
				var oldMouse = model.mouseState;
				var newMouse = _Utils_update(
					oldMouse,
					{scrollX: pos.xpos, scrollY: pos.ypos});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{mouseState: newMouse}),
					$elm$core$Platform$Cmd$none);
			case 'FpsChange':
				var newFps = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{fps: newFps}),
					$elm$core$Platform$Cmd$none);
			case 'RunningChange':
				var isRunning = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{isRunning: isRunning}),
					$elm$core$Platform$Cmd$none);
			case 'KeyboardInput':
				var keyevent = msg.a;
				return A2($author$project$Update$keyboardUpdate, model, keyevent);
			case 'WindowResize':
				var newWidth = msg.a;
				var newHeight = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{windowHeight: newHeight, windowWidth: newWidth}),
					$elm$core$Platform$Cmd$none);
			case 'LinkClicked':
				var urlRequest = msg.a;
				if (urlRequest.$ === 'Internal') {
					var url = urlRequest.a;
					return A2(
						$author$project$Update$changeByName,
						model,
						$author$project$Model$urlToPageName(url));
				} else {
					var href = urlRequest.a;
					return _Utils_Tuple2(
						model,
						$elm$browser$Browser$Navigation$load(href));
				}
			case 'PageChange':
				var pageName = msg.a;
				return A2($author$project$Update$changeByName, model, pageName);
			case 'UrlChanged':
				var url = msg.a;
				return _Utils_Tuple2(
					A2(
						$author$project$Update$changeByName,
						model,
						$author$project$Model$urlToPageName(url)).a,
					$elm$core$Platform$Cmd$none);
			case 'MouseOver':
				var pageName = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{highlightedButton: pageName}),
					$elm$core$Platform$Cmd$none);
			case 'MouseLeave':
				var pageName = msg.a;
				return _Utils_eq(pageName, model.highlightedButton) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{highlightedButton: 'none'}),
					$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Update$updateProgram = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'BlockClick':
				var call = msg.a;
				var funcId = msg.b;
				var mouseOffset = msg.c;
				return A4($author$project$Update$blockClickModel, model, call, funcId, mouseOffset);
			case 'BlockNameClick':
				var call = msg.a;
				var funcId = msg.b;
				var mouseOffset = msg.c;
				return A4($author$project$Update$blockNameClickModel, model, call, funcId, mouseOffset);
			case 'HeaderOutputHighlight':
				var id = msg.a;
				var index = msg.b;
				return A3($author$project$Update$headerHighlightModel, model, id, index);
			case 'HeaderOutputUpdate':
				var id = msg.a;
				var index = msg.b;
				var str = msg.c;
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 'HeaderOutputClick':
				var id = msg.a;
				var index = msg.b;
				return A3($author$project$Update$headerOutputClickModel, model, id, index);
			case 'HeaderOutputRightClick':
				var id = msg.a;
				var index = msg.b;
				return A3($author$project$Update$headerOutputRightClickModel, model, id, index);
			case 'HeaderNameClick':
				var id = msg.a;
				var mouseOffset = msg.b;
				return A3($author$project$Update$headerNameClickModel, model, id, mouseOffset);
			case 'HeaderClick':
				var func = msg.a;
				var mouseOffset = msg.b;
				return A3($author$project$Update$headerClickModel, model, func, mouseOffset);
			case 'HeaderNameHighlight':
				var id = msg.a;
				return A2($author$project$Update$headerNameHighlightModel, model, id);
			case 'HeaderNameUpdate':
				var id = msg.a;
				var str = msg.b;
				return A3($author$project$Update$headerNameUpdateModel, model, id, str);
			case 'HeaderAddOutput':
				var id = msg.a;
				var inputCounter = msg.b;
				return A3($author$project$Update$headerAddOutputModel, model, id, inputCounter);
			case 'HeaderAddOutputRightClick':
				var id = msg.a;
				var inputCounter = msg.b;
				return A3($author$project$Update$headerAddOutputRightClickModel, model, id, inputCounter);
			case 'InputHighlight':
				var id = msg.a;
				var index = msg.b;
				return A3($author$project$Update$inputHighlightModel, model, id, index);
			case 'OutputHighlight':
				var id = msg.a;
				return A2($author$project$Update$outputHighlightModel, model, id);
			case 'InputClick':
				var id = msg.a;
				var index = msg.b;
				return A3($author$project$Update$inputClickModel, model, id, index);
			case 'InputUpdate':
				var id = msg.a;
				var index = msg.b;
				var str = msg.c;
				return A4($author$project$Update$inputUpdateModel, model, id, index, str);
			case 'OutputClick':
				var id = msg.a;
				return A2($author$project$Update$outputClickModel, model, id);
			case 'InputRightClick':
				var id = msg.a;
				var index = msg.b;
				return A3($author$project$Update$inputRightClickModel, model, id, index);
			case 'OutputRightClick':
				var id = msg.a;
				return A2($author$project$Update$outputRightClickModel, model, id);
			case 'BlockNameHighlight':
				var id = msg.a;
				return A2($author$project$Update$blockNameHighlightModel, model, id);
			case 'BlockNameUpdate':
				var id = msg.a;
				var str = msg.b;
				return A3($author$project$Update$blockNameUpdateModel, model, id, str);
			case 'SpawnBlock':
				var name = msg.a;
				var mouseOffset = msg.b;
				return A3($author$project$Update$spawnBlockModel, model, name, mouseOffset);
			case 'SpawnFunction':
				var name = msg.a;
				var mouseOffset = msg.b;
				return A3($author$project$Update$spawnFuncModel, model, name, mouseOffset);
			default:
				return A2($author$project$Update$updateWindow, msg, model);
		}
	});
var $author$project$Update$update = F2(
	function (msg, model) {
		return A2($elm$core$List$member, model.currentPage, $author$project$Model$docpages) ? A2($author$project$Update$updateWindow, msg, model) : A2($author$project$Update$updateProgram, msg, model);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$Unstyled = function (a) {
	return {$: 'Unstyled', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$text = function (str) {
	return $rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
		$elm$virtual_dom$VirtualDom$text(str));
};
var $rtfeldman$elm_css$Html$Styled$text = $rtfeldman$elm_css$VirtualDom$Styled$text;
var $author$project$View$makeDocsPage = function (model) {
	return $rtfeldman$elm_css$Html$Styled$text('hello');
};
var $rtfeldman$elm_css$Css$block = {display: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'block'};
var $rtfeldman$elm_css$Css$display = $rtfeldman$elm_css$Css$prop1('display');
var $rtfeldman$elm_css$Html$Styled$Attributes$href = function (url) {
	return A2($rtfeldman$elm_css$Html$Styled$Attributes$stringProperty, 'href', url);
};
var $author$project$Model$PageChange = function (a) {
	return {$: 'PageChange', a: a};
};
var $author$project$TitleBar$buttonSpacing = 50;
var $rtfeldman$elm_css$Css$stringsToValue = function (list) {
	return $elm$core$List$isEmpty(list) ? {value: 'none'} : {
		value: A2(
			$elm$core$String$join,
			', ',
			A2(
				$elm$core$List$map,
				function (s) {
					return s;
				},
				list))
	};
};
var $rtfeldman$elm_css$Css$fontFamilies = A2(
	$elm$core$Basics$composeL,
	$rtfeldman$elm_css$Css$prop1('font-family'),
	$rtfeldman$elm_css$Css$stringsToValue);
var $rtfeldman$elm_css$Css$inlineBlock = {display: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'inline-block'};
var $author$project$Model$MouseLeave = function (a) {
	return {$: 'MouseLeave', a: a};
};
var $author$project$Model$MouseOver = function (a) {
	return {$: 'MouseOver', a: a};
};
var $rtfeldman$elm_css$Css$borderRadius = $rtfeldman$elm_css$Css$prop1('border-radius');
var $rtfeldman$elm_css$Html$Styled$button = $rtfeldman$elm_css$Html$Styled$node('button');
var $author$project$Utils$darkenInt = F2(
	function (amount, _int) {
		return A2(
			$elm$core$Basics$min,
			A2($elm$core$Basics$max, 0, _int - amount),
			255);
	});
var $rtfeldman$elm_css$Css$rgba = F4(
	function (r, g, b, alpha) {
		return {
			alpha: alpha,
			blue: b,
			color: $rtfeldman$elm_css$Css$Structure$Compatible,
			green: g,
			red: r,
			value: A2(
				$rtfeldman$elm_css$Css$cssFunction,
				'rgba',
				_Utils_ap(
					A2(
						$elm$core$List$map,
						$elm$core$String$fromInt,
						_List_fromArray(
							[r, g, b])),
					_List_fromArray(
						[
							$elm$core$String$fromFloat(alpha)
						])))
		};
	});
var $author$project$Utils$darken = F2(
	function (amount, color) {
		return A4(
			$rtfeldman$elm_css$Css$rgba,
			A2($author$project$Utils$darkenInt, amount, color.red),
			A2($author$project$Utils$darkenInt, amount, color.green),
			A2($author$project$Utils$darkenInt, amount, color.blue),
			color.alpha);
	});
var $rtfeldman$elm_css$Css$Preprocess$ExtendSelector = F2(
	function (a, b) {
		return {$: 'ExtendSelector', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$PseudoClassSelector = function (a) {
	return {$: 'PseudoClassSelector', a: a};
};
var $rtfeldman$elm_css$Css$pseudoClass = function (_class) {
	return $rtfeldman$elm_css$Css$Preprocess$ExtendSelector(
		$rtfeldman$elm_css$Css$Structure$PseudoClassSelector(_class));
};
var $rtfeldman$elm_css$Css$hover = $rtfeldman$elm_css$Css$pseudoClass('hover');
var $rtfeldman$elm_css$Css$marginLeft = $rtfeldman$elm_css$Css$prop1('margin-left');
var $rtfeldman$elm_css$Html$Styled$Events$onClick = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $rtfeldman$elm_css$Html$Styled$Events$onMouseLeave = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'mouseleave',
		$elm$json$Json$Decode$succeed(msg));
};
var $rtfeldman$elm_css$Html$Styled$Events$onMouseOver = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'mouseover',
		$elm$json$Json$Decode$succeed(msg));
};
var $rtfeldman$elm_css$Css$paddingLeft = $rtfeldman$elm_css$Css$prop1('padding-left');
var $rtfeldman$elm_css$Css$paddingRight = $rtfeldman$elm_css$Css$prop1('padding-right');
var $author$project$TitleBar$makeIconButton = F4(
	function (icon, textString, event, color) {
		return A2(
			$rtfeldman$elm_css$Html$Styled$button,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Events$onClick(event),
					$rtfeldman$elm_css$Html$Styled$Events$onMouseOver(
					$author$project$Model$MouseOver(textString)),
					$rtfeldman$elm_css$Html$Styled$Events$onMouseLeave(
					$author$project$Model$MouseLeave(textString)),
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$fontFamilies(
							_List_fromArray(
								['monospace'])),
							$rtfeldman$elm_css$Css$fontSize(
							$rtfeldman$elm_css$Css$px(24)),
							$rtfeldman$elm_css$Css$padding(
							$rtfeldman$elm_css$Css$px(10)),
							$rtfeldman$elm_css$Css$paddingLeft(
							$rtfeldman$elm_css$Css$px(20)),
							$rtfeldman$elm_css$Css$paddingRight(
							$rtfeldman$elm_css$Css$px(20)),
							$rtfeldman$elm_css$Css$marginLeft(
							$rtfeldman$elm_css$Css$px($author$project$TitleBar$buttonSpacing)),
							$rtfeldman$elm_css$Css$border(
							$rtfeldman$elm_css$Css$px(0)),
							$rtfeldman$elm_css$Css$borderRadius(
							$rtfeldman$elm_css$Css$px(5)),
							$rtfeldman$elm_css$Css$hover(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$backgroundColor(
									A2($author$project$Utils$darken, 10, color))
								])),
							$rtfeldman$elm_css$Css$backgroundColor(color)
						]))
				]),
			_List_fromArray(
				[
					icon,
					$rtfeldman$elm_css$Html$Styled$text(textString)
				]));
	});
var $rtfeldman$elm_css$Css$margin = $rtfeldman$elm_css$Css$prop1('margin');
var $author$project$Model$PlayOnion = function (a) {
	return {$: 'PlayOnion', a: a};
};
var $rtfeldman$elm_css$Css$alignSelf = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'alignSelf',
		'align-self',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $rtfeldman$elm_css$Css$EmUnits = {$: 'EmUnits'};
var $rtfeldman$elm_css$Css$em = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$EmUnits, 'em');
var $rtfeldman$elm_css$VirtualDom$Styled$unstyledNode = $rtfeldman$elm_css$VirtualDom$Styled$Unstyled;
var $rtfeldman$elm_css$Html$Styled$fromUnstyled = $rtfeldman$elm_css$VirtualDom$Styled$unstyledNode;
var $rtfeldman$elm_css$Css$inlineFlex = {display: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'inline-flex'};
var $rtfeldman$elm_css$Css$marginRight = $rtfeldman$elm_css$Css$prop1('margin-right');
var $elm$svg$Svg$polygon = $elm$svg$Svg$trustedNode('polygon');
var $rtfeldman$elm_css$Css$relative = {position: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'relative'};
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $rtfeldman$elm_css$Css$top = $rtfeldman$elm_css$Css$prop1('top');
var $author$project$TitleBar$makeIcon = function (polygonAttrs) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$width(
						$rtfeldman$elm_css$Css$em(1)),
						$rtfeldman$elm_css$Css$height(
						$rtfeldman$elm_css$Css$em(1)),
						$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$inlineFlex),
						$rtfeldman$elm_css$Css$alignSelf($rtfeldman$elm_css$Css$center),
						$rtfeldman$elm_css$Css$top(
						$rtfeldman$elm_css$Css$em(0.125)),
						$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$relative),
						$rtfeldman$elm_css$Css$marginRight(
						$rtfeldman$elm_css$Css$px(10))
					]))
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$fromUnstyled(
				A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width('24px'),
							$elm$svg$Svg$Attributes$height('24px')
						]),
					_List_fromArray(
						[
							A2($elm$svg$Svg$polygon, polygonAttrs, _List_Nil)
						])))
			]));
};
var $author$project$TitleBar$playIcon = $author$project$TitleBar$makeIcon(
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$points('0,0 0,24 24,12'),
			$elm$svg$Svg$Attributes$fill('rgb(67, 194, 60)')
		]));
var $author$project$TitleBar$playButton = function (onion) {
	return A4(
		$author$project$TitleBar$makeIconButton,
		$author$project$TitleBar$playIcon,
		'Play',
		$author$project$Model$PlayOnion(onion),
		A3($rtfeldman$elm_css$Css$rgb, 168, 255, 163));
};
var $author$project$Model$StopSound = {$: 'StopSound'};
var $author$project$ViewVariables$disabledGrey = A3($rtfeldman$elm_css$Css$rgb, 220, 220, 220);
var $author$project$TitleBar$stopIcon = function (isRunning) {
	return $author$project$TitleBar$makeIcon(
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$points('0,0 0,24 24,24, 24,0'),
				$elm$svg$Svg$Attributes$fill(
				isRunning ? 'rgb(214, 36, 36)' : $author$project$ViewVariables$holeGrey)
			]));
};
var $author$project$TitleBar$stopButton = function (model) {
	return A4(
		$author$project$TitleBar$makeIconButton,
		$author$project$TitleBar$stopIcon(model.isRunning),
		'Stop',
		$author$project$Model$StopSound,
		model.isRunning ? A3($rtfeldman$elm_css$Css$rgb, 232, 93, 93) : $author$project$ViewVariables$disabledGrey);
};
var $author$project$TitleBar$makeTitle = function (model) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$inlineBlock),
						$rtfeldman$elm_css$Css$width(
						$rtfeldman$elm_css$Css$pct(100)),
						$rtfeldman$elm_css$Css$margin(
						$rtfeldman$elm_css$Css$px(20))
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$fontFamilies(
								_List_fromArray(
									['monospace'])),
								$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$inlineBlock),
								$rtfeldman$elm_css$Css$fontSize(
								$rtfeldman$elm_css$Css$px(32)),
								$rtfeldman$elm_css$Css$top(
								$rtfeldman$elm_css$Css$px(10))
							]))
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('Sonic Onion')
					])),
				$author$project$TitleBar$playButton(model.program),
				$author$project$TitleBar$stopButton(model),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$fontFamilies(
								_List_fromArray(
									['monospace'])),
								$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$inlineBlock),
								$rtfeldman$elm_css$Css$fontSize(
								$rtfeldman$elm_css$Css$px(24)),
								$rtfeldman$elm_css$Css$marginLeft(
								$rtfeldman$elm_css$Css$px($author$project$TitleBar$buttonSpacing))
							]))
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						'fps: ' + ((!model.isRunning) ? 'none' : $elm$core$String$fromInt(model.fps)))
					])),
				A4(
				$author$project$TitleBar$makeIconButton,
				$rtfeldman$elm_css$Html$Styled$text(''),
				'Tutorial',
				$author$project$Model$PageChange('Tutorial'),
				A3($rtfeldman$elm_css$Css$rgb, 212, 214, 67))
			]));
};
var $author$project$ViewVariables$pageColor = A3($rtfeldman$elm_css$Css$rgb, 247, 247, 222);
var $rtfeldman$elm_css$Css$borderBottomColor = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'border-bottom-color', c.value);
};
var $rtfeldman$elm_css$Css$borderColor = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'border-color', c.value);
};
var $rtfeldman$elm_css$Css$borderStyle = $rtfeldman$elm_css$Css$prop1('border-style');
var $rtfeldman$elm_css$Css$borderTopLeftRadius = $rtfeldman$elm_css$Css$prop1('border-top-left-radius');
var $rtfeldman$elm_css$Css$borderTopRightRadius = $rtfeldman$elm_css$Css$prop1('border-top-right-radius');
var $rtfeldman$elm_css$Css$marginTop = $rtfeldman$elm_css$Css$prop1('margin-top');
var $rtfeldman$elm_css$Css$none = {backgroundImage: $rtfeldman$elm_css$Css$Structure$Compatible, blockAxisOverflow: $rtfeldman$elm_css$Css$Structure$Compatible, borderStyle: $rtfeldman$elm_css$Css$Structure$Compatible, cursor: $rtfeldman$elm_css$Css$Structure$Compatible, display: $rtfeldman$elm_css$Css$Structure$Compatible, hoverCapability: $rtfeldman$elm_css$Css$Structure$Compatible, inlineAxisOverflow: $rtfeldman$elm_css$Css$Structure$Compatible, keyframes: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNone: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible, listStyleType: $rtfeldman$elm_css$Css$Structure$Compatible, listStyleTypeOrPositionOrImage: $rtfeldman$elm_css$Css$Structure$Compatible, none: $rtfeldman$elm_css$Css$Structure$Compatible, outline: $rtfeldman$elm_css$Css$Structure$Compatible, pointerDevice: $rtfeldman$elm_css$Css$Structure$Compatible, pointerEvents: $rtfeldman$elm_css$Css$Structure$Compatible, resize: $rtfeldman$elm_css$Css$Structure$Compatible, scriptingSupport: $rtfeldman$elm_css$Css$Structure$Compatible, textDecorationLine: $rtfeldman$elm_css$Css$Structure$Compatible, textTransform: $rtfeldman$elm_css$Css$Structure$Compatible, touchAction: $rtfeldman$elm_css$Css$Structure$Compatible, transform: $rtfeldman$elm_css$Css$Structure$Compatible, updateFrequency: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'none'};
var $rtfeldman$elm_css$Css$outline = $rtfeldman$elm_css$Css$prop1('outline');
var $author$project$ViewVariables$pageBackgroundColor = A3($rtfeldman$elm_css$Css$rgb, 229, 229, 208);
var $rtfeldman$elm_css$Css$solid = {borderStyle: $rtfeldman$elm_css$Css$Structure$Compatible, textDecorationStyle: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'solid'};
var $author$project$View$pagebutton = F2(
	function (pageName, model) {
		var buttonPageColor = _Utils_eq(pageName, model.currentPage) ? $author$project$ViewVariables$pageColor : $author$project$ViewVariables$pageBackgroundColor;
		return A2(
			$rtfeldman$elm_css$Html$Styled$button,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Events$onClick(
					$author$project$Model$PageChange(pageName)),
					$rtfeldman$elm_css$Html$Styled$Events$onMouseOver(
					$author$project$Model$MouseOver(pageName)),
					$rtfeldman$elm_css$Html$Styled$Events$onMouseLeave(
					$author$project$Model$MouseLeave(pageName)),
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$width(
							$rtfeldman$elm_css$Css$pct(20)),
							$rtfeldman$elm_css$Css$height(
							$rtfeldman$elm_css$Css$px($author$project$ViewVariables$buttonHeight)),
							$rtfeldman$elm_css$Css$marginTop(
							$rtfeldman$elm_css$Css$px(10)),
							$rtfeldman$elm_css$Css$marginRight(
							$rtfeldman$elm_css$Css$px(10)),
							$rtfeldman$elm_css$Css$borderTopLeftRadius(
							$rtfeldman$elm_css$Css$px(8)),
							$rtfeldman$elm_css$Css$borderTopRightRadius(
							$rtfeldman$elm_css$Css$px(8)),
							_Utils_eq(pageName, model.highlightedButton) ? $rtfeldman$elm_css$Css$border(
							$rtfeldman$elm_css$Css$px(2)) : $rtfeldman$elm_css$Css$border(
							$rtfeldman$elm_css$Css$px(0)),
							$rtfeldman$elm_css$Css$borderColor(
							A3($rtfeldman$elm_css$Css$rgb, 0, 0, 0)),
							$rtfeldman$elm_css$Css$borderBottomColor(buttonPageColor),
							$rtfeldman$elm_css$Css$outline($rtfeldman$elm_css$Css$none),
							$rtfeldman$elm_css$Css$borderStyle($rtfeldman$elm_css$Css$solid),
							$rtfeldman$elm_css$Css$backgroundColor(buttonPageColor),
							$rtfeldman$elm_css$Css$fontFamilies(
							_List_fromArray(
								['Raleway'])),
							$rtfeldman$elm_css$Css$fontSize(
							$rtfeldman$elm_css$Css$px(20))
						]))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text(pageName)
				]));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$rel = $rtfeldman$elm_css$VirtualDom$Styled$attribute('rel');
var $author$project$View$pageWrapper = F2(
	function (page, model) {
		return A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A3(
					$rtfeldman$elm_css$Html$Styled$node,
					'link',
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Attributes$rel('stylesheet'),
							$rtfeldman$elm_css$Html$Styled$Attributes$href('https://fonts.googleapis.com/css?family=Tangerine')
						]),
					_List_Nil),
					A3(
					$rtfeldman$elm_css$Html$Styled$node,
					'link',
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Attributes$rel('stylesheet'),
							$rtfeldman$elm_css$Html$Styled$Attributes$href('https://fonts.googleapis.com/css?family=Raleway')
						]),
					_List_Nil),
					$author$project$TitleBar$makeTitle(model),
					A2($author$project$View$pagebutton, 'Home', model),
					A2($author$project$View$pagebutton, 'Unused', model),
					A2(
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$block),
									$rtfeldman$elm_css$Css$backgroundColor($author$project$ViewVariables$pageColor)
								]))
						]),
					_List_fromArray(
						[page]))
				]));
	});
var $author$project$ViewVariables$errorColor = A3($rtfeldman$elm_css$Css$rgb, 255, 150, 150);
var $rtfeldman$elm_css$Css$fixed = {backgroundAttachment: $rtfeldman$elm_css$Css$Structure$Compatible, position: $rtfeldman$elm_css$Css$Structure$Compatible, tableLayout: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'fixed'};
var $rtfeldman$elm_css$Css$UnitlessInteger = {$: 'UnitlessInteger'};
var $rtfeldman$elm_css$Css$int = function (val) {
	return {
		fontWeight: $rtfeldman$elm_css$Css$Structure$Compatible,
		intOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible,
		lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible,
		lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible,
		number: $rtfeldman$elm_css$Css$Structure$Compatible,
		numberOrInfinite: $rtfeldman$elm_css$Css$Structure$Compatible,
		numericValue: val,
		unitLabel: '',
		units: $rtfeldman$elm_css$Css$UnitlessInteger,
		value: $elm$core$String$fromInt(val)
	};
};
var $rtfeldman$elm_css$Css$UnitlessFloat = {$: 'UnitlessFloat'};
var $rtfeldman$elm_css$Css$num = function (val) {
	return {
		lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible,
		lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible,
		number: $rtfeldman$elm_css$Css$Structure$Compatible,
		numberOrInfinite: $rtfeldman$elm_css$Css$Structure$Compatible,
		numericValue: val,
		unitLabel: '',
		units: $rtfeldman$elm_css$Css$UnitlessFloat,
		value: $elm$core$String$fromFloat(val)
	};
};
var $rtfeldman$elm_css$Css$opacity = $rtfeldman$elm_css$Css$prop1('opacity');
var $rtfeldman$elm_css$Css$pointerEvents = $rtfeldman$elm_css$Css$prop1('pointer-events');
var $rtfeldman$elm_css$Css$zIndex = $rtfeldman$elm_css$Css$prop1('z-index');
var $author$project$View$drawErrorBox = function (errorBox) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$zIndex(
						$rtfeldman$elm_css$Css$int(2)),
						$rtfeldman$elm_css$Css$borderRadius(
						$rtfeldman$elm_css$Css$px(15)),
						$rtfeldman$elm_css$Css$backgroundColor($author$project$ViewVariables$errorColor),
						$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$fixed),
						$rtfeldman$elm_css$Css$opacity(
						$rtfeldman$elm_css$Css$num(0.75)),
						$rtfeldman$elm_css$Css$pointerEvents($rtfeldman$elm_css$Css$none)
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$margin(
								$rtfeldman$elm_css$Css$px(10))
							]))
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(errorBox.error)
					]))
			]));
};
var $elm$svg$Svg$Attributes$display = _VirtualDom_attribute('display');
var $author$project$DrawProgram$maxYOfStructures = function (positioned) {
	return A2(
		$elm$core$Maybe$withDefault,
		0,
		$elm$core$List$maximum(
			A2(
				$elm$core$List$map,
				function (structure) {
					return structure.headerPos.ypos + structure.funcHeight;
				},
				positioned)));
};
var $author$project$DrawProgram$drawOnion = F6(
	function (onion, mouseState, svgWindowWidth, svgWindowHeight, xoffset, yoffset) {
		var viewStructures = A6($author$project$ViewPositions$getViewStructures, onion, mouseState, svgWindowWidth, svgWindowHeight, xoffset, yoffset);
		return _Utils_Tuple2(
			$author$project$DrawProgram$maxYOfStructures(viewStructures),
			A2($elm$core$List$map, $author$project$DrawFunc$drawFuncWithConnections, viewStructures));
	});
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $author$project$DrawProgram$drawProgram = F5(
	function (program, mouseState, svgWindowWidth, svgWindowHeight, shouldDrawToolbar) {
		var viewportWidth = A2($author$project$ViewVariables$viewportWidth, svgWindowWidth, svgWindowHeight);
		var viewportHeight = $author$project$ViewVariables$viewportHeight;
		var drawnToolbar = shouldDrawToolbar ? A4($author$project$DrawToolbar$drawToolbar, program, mouseState, svgWindowWidth, svgWindowHeight) : A3(
			$author$project$DrawToolbar$ToolResult,
			0,
			0,
			A2($elm$svg$Svg$g, _List_Nil, _List_Nil));
		var drawnOnion = A6($author$project$DrawProgram$drawOnion, program, mouseState, svgWindowWidth, svgWindowHeight, drawnToolbar.width, 0);
		var actualViewportHeight = A2($elm$core$Basics$max, drawnOnion.a, drawnToolbar.height);
		var actualWindowHeight = $elm$core$Basics$floor(svgWindowHeight * (actualViewportHeight / viewportHeight));
		return $rtfeldman$elm_css$Html$Styled$fromUnstyled(
			A2(
				$elm$svg$Svg$svg,
				_Utils_ap(
					A2($author$project$SvgDraw$svgClickEvents, $author$project$Model$NoOp, $author$project$Model$NoOp),
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(svgWindowWidth)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt(actualWindowHeight)),
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromInt(viewportWidth) + (' ' + $elm$core$String$fromInt(actualViewportHeight)))),
							$elm$svg$Svg$Attributes$display('inline-block')
						])),
				A2($elm$core$List$cons, drawnToolbar.svg, drawnOnion.b)));
	});
var $author$project$View$programPage = function (model) {
	var programWidth = $author$project$ViewVariables$toSvgWindowWidth(model.windowWidth);
	var programSectionHeight = $author$project$ViewVariables$toSvgWindowHeight(model.windowHeight);
	var drawnProgram = A5($author$project$DrawProgram$drawProgram, model.program, model.mouseState, programWidth, programSectionHeight, true);
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$inlineBlock)
					]))
			]),
		function () {
			var _v0 = model.errorBoxMaybe;
			if (_v0.$ === 'Nothing') {
				return _List_fromArray(
					[drawnProgram]);
			} else {
				var errorBox = _v0.a;
				return _List_fromArray(
					[
						$author$project$View$drawErrorBox(errorBox),
						drawnProgram
					]);
			}
		}());
};
var $author$project$View$makeHomePage = function (model) {
	return A2(
		$author$project$View$pageWrapper,
		$author$project$View$programPage(model),
		model);
};
var $rtfeldman$elm_css$Css$marginBottom = $rtfeldman$elm_css$Css$prop1('margin-bottom');
var $author$project$Docs$Tutorial$pageWidth = 600;
var $rtfeldman$elm_css$Css$auto = {alignItemsOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, cursor: $rtfeldman$elm_css$Css$Structure$Compatible, flexBasis: $rtfeldman$elm_css$Css$Structure$Compatible, intOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, justifyContentOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible, overflow: $rtfeldman$elm_css$Css$Structure$Compatible, pointerEvents: $rtfeldman$elm_css$Css$Structure$Compatible, tableLayout: $rtfeldman$elm_css$Css$Structure$Compatible, textRendering: $rtfeldman$elm_css$Css$Structure$Compatible, touchAction: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'auto'};
var $rtfeldman$elm_css$Css$prop2 = F3(
	function (key, argA, argB) {
		return A2(
			$rtfeldman$elm_css$Css$property,
			key,
			A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.value, argB.value])));
	});
var $rtfeldman$elm_css$Css$margin2 = $rtfeldman$elm_css$Css$prop2('margin');
var $rtfeldman$elm_css$Css$maxWidth = $rtfeldman$elm_css$Css$prop1('max-width');
var $author$project$Docs$Tutorial$wrapCenter = function (elements) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$block),
						$rtfeldman$elm_css$Css$maxWidth(
						$rtfeldman$elm_css$Css$px($author$project$Docs$Tutorial$pageWidth)),
						A2(
						$rtfeldman$elm_css$Css$margin2,
						$rtfeldman$elm_css$Css$px(0),
						$rtfeldman$elm_css$Css$auto)
					]))
			]),
		elements);
};
var $author$project$Docs$Tutorial$makeExampleProgram = F3(
	function (onion, model, shouldAddPlayButton) {
		return $author$project$Docs$Tutorial$wrapCenter(
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$marginBottom(
									$rtfeldman$elm_css$Css$em(2))
								]))
						]),
					_Utils_ap(
						_List_fromArray(
							[
								A5(
								$author$project$DrawProgram$drawProgram,
								onion,
								model.mouseState,
								$author$project$Docs$Tutorial$pageWidth,
								$author$project$ViewVariables$toSvgWindowHeight(model.windowHeight),
								false)
							]),
						shouldAddPlayButton ? _List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Html$Styled$div,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$Attributes$css(
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$marginTop(
												$rtfeldman$elm_css$Css$em(1))
											]))
									]),
								_List_fromArray(
									[
										$author$project$TitleBar$playButton(onion),
										$author$project$TitleBar$stopButton(model)
									]))
							]) : _List_Nil))
				]));
	});
var $author$project$Docs$Tutorial$makeExampleCalls = F3(
	function (calls, model, addPlayButton) {
		return A3(
			$author$project$Docs$Tutorial$makeExampleProgram,
			_List_fromArray(
				[
					A2($author$project$Model$makeMain, 1, calls)
				]),
			model,
			addPlayButton);
	});
var $author$project$Docs$Tutorial$appendExample = function (model) {
	return A3(
		$author$project$Docs$Tutorial$makeExampleCalls,
		_List_fromArray(
			[
				A4(
				$author$project$Model$Call,
				2,
				_List_fromArray(
					[
						$author$project$Model$Text('0'),
						$author$project$Model$Text('C4'),
						$author$project$Model$Text('1')
					]),
				'note',
				''),
				A4(
				$author$project$Model$Call,
				3,
				_List_fromArray(
					[
						$author$project$Model$Output(2),
						$author$project$Model$Text('D4'),
						$author$project$Model$Text('1')
					]),
				'note',
				''),
				A4(
				$author$project$Model$Call,
				4,
				_List_fromArray(
					[
						$author$project$Model$Output(3),
						$author$project$Model$Text('1')
					]),
				'+',
				''),
				A4(
				$author$project$Model$Call,
				5,
				_List_fromArray(
					[
						$author$project$Model$Text('0'),
						$author$project$Model$Text('E4'),
						$author$project$Model$Text('1')
					]),
				'note',
				''),
				A4(
				$author$project$Model$Call,
				6,
				_List_fromArray(
					[
						$author$project$Model$Output(5),
						$author$project$Model$Text('F4'),
						$author$project$Model$Text('1')
					]),
				'note',
				''),
				A4(
				$author$project$Model$Call,
				7,
				_List_fromArray(
					[
						$author$project$Model$Output(4),
						$author$project$Model$Output(6)
					]),
				'append',
				'')
			]),
		model,
		true);
};
var $author$project$Docs$Tutorial$coolBeepsSimple = function (model) {
	return A3(
		$author$project$Docs$Tutorial$makeExampleProgram,
		_List_fromArray(
			[
				A2(
				$author$project$Model$makeMain,
				1,
				_List_fromArray(
					[
						A4($author$project$Model$Call, 2, _List_Nil, 'coolBeeps', '')
					])),
				A3(
				$author$project$Model$makeFunc,
				3,
				_List_fromArray(
					[
						A4(
						$author$project$Model$Call,
						4,
						_List_fromArray(
							[
								$author$project$Model$Text('0'),
								$author$project$Model$Text('A4'),
								$author$project$Model$Text('1')
							]),
						'note',
						''),
						A4(
						$author$project$Model$Call,
						5,
						_List_fromArray(
							[
								$author$project$Model$Output(4),
								$author$project$Model$Text('B4'),
								$author$project$Model$Text('1')
							]),
						'note',
						'')
					]),
				'coolBeeps')
			]),
		model,
		true);
};
var $author$project$Docs$Tutorial$coolBeepsWithArgument = function (model) {
	return A3(
		$author$project$Docs$Tutorial$makeExampleProgram,
		_List_fromArray(
			[
				A2(
				$author$project$Model$makeMain,
				1,
				_List_fromArray(
					[
						A4(
						$author$project$Model$Call,
						2,
						_List_fromArray(
							[
								$author$project$Model$Text('5')
							]),
						'coolBeeps',
						'')
					])),
				A4(
				$author$project$Model$Function,
				'coolBeeps',
				3,
				_List_fromArray(
					[$author$project$Model$Hole]),
				_List_fromArray(
					[
						A4(
						$author$project$Model$Call,
						4,
						_List_fromArray(
							[
								$author$project$Model$Text('0'),
								$author$project$Model$Text('A4'),
								$author$project$Model$FunctionArg(0)
							]),
						'note',
						''),
						A4(
						$author$project$Model$Call,
						5,
						_List_fromArray(
							[
								$author$project$Model$Output(4),
								$author$project$Model$Text('B4'),
								$author$project$Model$Text('1')
							]),
						'note',
						'')
					]))
			]),
		model,
		true);
};
var $author$project$Docs$Tutorial$emptyNoteBlock = function (model) {
	return A3(
		$author$project$Docs$Tutorial$makeExampleCalls,
		_List_fromArray(
			[
				A2($author$project$BuiltIn$constructCall, 2, 'note')
			]),
		model,
		false);
};
var $author$project$Docs$Tutorial$ex1Addition = function (model) {
	return A3(
		$author$project$Docs$Tutorial$makeExampleCalls,
		_List_fromArray(
			[
				A4(
				$author$project$Model$Call,
				2,
				_List_fromArray(
					[
						$author$project$Model$Text('0'),
						$author$project$Model$Text('A4'),
						$author$project$Model$Text('1')
					]),
				'note',
				''),
				A4(
				$author$project$Model$Call,
				3,
				_List_fromArray(
					[
						$author$project$Model$Output(2),
						$author$project$Model$Text('2')
					]),
				'+',
				''),
				A4(
				$author$project$Model$Call,
				4,
				_List_fromArray(
					[
						$author$project$Model$Output(3),
						$author$project$Model$Text('B4'),
						$author$project$Model$Text('1')
					]),
				'note',
				'')
			]),
		model,
		true);
};
var $author$project$Docs$Tutorial$ex2Addition = function (model) {
	return A3(
		$author$project$Docs$Tutorial$makeExampleCalls,
		_List_fromArray(
			[
				A4(
				$author$project$Model$Call,
				2,
				_List_fromArray(
					[
						$author$project$Model$Text('0'),
						$author$project$Model$Text('A4'),
						$author$project$Model$Text('1')
					]),
				'note',
				''),
				A4(
				$author$project$Model$Call,
				3,
				_List_fromArray(
					[
						$author$project$Model$Text('2'),
						$author$project$Model$Output(2)
					]),
				'+',
				''),
				A4(
				$author$project$Model$Call,
				4,
				_List_fromArray(
					[
						$author$project$Model$Output(3),
						$author$project$Model$Text('B4'),
						$author$project$Model$Text('1')
					]),
				'note',
				'')
			]),
		model,
		true);
};
var $author$project$Docs$Tutorial$ifExample = function (model) {
	return A3(
		$author$project$Docs$Tutorial$makeExampleProgram,
		_List_fromArray(
			[
				A2(
				$author$project$Model$makeMain,
				1,
				_List_fromArray(
					[
						A4(
						$author$project$Model$Call,
						2,
						_List_fromArray(
							[
								$author$project$Model$Text('mouseY'),
								$author$project$Model$Text('200')
							]),
						'>',
						''),
						A4(
						$author$project$Model$Call,
						4,
						_List_fromArray(
							[
								$author$project$Model$Text('0'),
								$author$project$Model$Text('A4'),
								$author$project$Model$Text('10')
							]),
						'note',
						''),
						A4(
						$author$project$Model$Call,
						5,
						_List_fromArray(
							[
								$author$project$Model$Text('0'),
								$author$project$Model$Text('B4'),
								$author$project$Model$Text('10')
							]),
						'note',
						''),
						A4(
						$author$project$Model$Call,
						3,
						_List_fromArray(
							[
								$author$project$Model$Output(2),
								$author$project$Model$Output(4),
								$author$project$Model$Output(5)
							]),
						'if',
						'')
					]))
			]),
		model,
		true);
};
var $author$project$Docs$Tutorial$joinExample = function (model) {
	return A3(
		$author$project$Docs$Tutorial$makeExampleCalls,
		_List_fromArray(
			[
				A4(
				$author$project$Model$Call,
				2,
				_List_fromArray(
					[
						$author$project$Model$Text('0'),
						$author$project$Model$Text('C4'),
						$author$project$Model$Text('1')
					]),
				'note',
				''),
				A4(
				$author$project$Model$Call,
				3,
				_List_fromArray(
					[
						$author$project$Model$Text('0'),
						$author$project$Model$Text('E4'),
						$author$project$Model$Text('1')
					]),
				'note',
				''),
				A4(
				$author$project$Model$Call,
				4,
				_List_fromArray(
					[
						$author$project$Model$Output(2),
						$author$project$Model$Output(3)
					]),
				'join',
				'')
			]),
		model,
		true);
};
var $author$project$Docs$Tutorial$joinExampleZero = function (model) {
	return A3(
		$author$project$Docs$Tutorial$makeExampleCalls,
		_List_fromArray(
			[
				A4(
				$author$project$Model$Call,
				2,
				_List_fromArray(
					[
						$author$project$Model$Text('0'),
						$author$project$Model$Text('C4'),
						$author$project$Model$Text('1')
					]),
				'note',
				''),
				A4(
				$author$project$Model$Call,
				3,
				_List_fromArray(
					[
						$author$project$Model$Output(2),
						$author$project$Model$Output(2)
					]),
				'-',
				''),
				A4(
				$author$project$Model$Call,
				4,
				_List_fromArray(
					[
						$author$project$Model$Output(3),
						$author$project$Model$Text('E4'),
						$author$project$Model$Text('1')
					]),
				'note',
				'')
			]),
		model,
		true);
};
var $author$project$Docs$Tutorial$options = {
	defaultHighlighting: $elm$core$Maybe$Nothing,
	githubFlavored: $elm$core$Maybe$Just(
		{breaks: false, tables: false}),
	sanitize: false,
	smartypants: false
};
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm_explorations$markdown$Markdown$toHtmlWith = _Markdown_toHtml;
var $author$project$Docs$Tutorial$makeMarkdown = function (str) {
	return $author$project$Docs$Tutorial$wrapCenter(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$fromUnstyled(
				A3($elm_explorations$markdown$Markdown$toHtmlWith, $author$project$Docs$Tutorial$options, _List_Nil, str))
			]));
};
var $author$project$Docs$Tutorial$mouseXExample = function (model) {
	return A3(
		$author$project$Docs$Tutorial$makeExampleCalls,
		_List_fromArray(
			[
				A4(
				$author$project$Model$Call,
				2,
				_List_fromArray(
					[
						$author$project$Model$Text('0'),
						$author$project$Model$Text('mouseX'),
						$author$project$Model$Text('10')
					]),
				'note',
				'')
			]),
		model,
		true);
};
var $author$project$Docs$Tutorial$recursiveExample = function (model) {
	return A3(
		$author$project$Docs$Tutorial$makeExampleProgram,
		_List_fromArray(
			[
				A2(
				$author$project$Model$makeMain,
				1,
				_List_fromArray(
					[
						A4(
						$author$project$Model$Call,
						2,
						_List_fromArray(
							[
								$author$project$Model$Text('0')
							]),
						'beeps',
						'')
					])),
				A4(
				$author$project$Model$Function,
				'beeps',
				3,
				_List_fromArray(
					[$author$project$Model$Hole]),
				_List_fromArray(
					[
						A4(
						$author$project$Model$Call,
						4,
						_List_fromArray(
							[
								$author$project$Model$FunctionArg(0),
								$author$project$Model$Text('0.2')
							]),
						'+',
						''),
						A4(
						$author$project$Model$Call,
						5,
						_List_fromArray(
							[
								$author$project$Model$Output(4),
								$author$project$Model$Text('A4'),
								$author$project$Model$Text('0.2')
							]),
						'note',
						''),
						A4(
						$author$project$Model$Call,
						6,
						_List_fromArray(
							[
								$author$project$Model$Output(5)
							]),
						'beeps',
						''),
						A4(
						$author$project$Model$Call,
						7,
						_List_fromArray(
							[
								$author$project$Model$FunctionArg(0),
								$author$project$Model$Text('5')
							]),
						'>',
						''),
						A4(
						$author$project$Model$Call,
						8,
						_List_fromArray(
							[
								$author$project$Model$Output(7),
								$author$project$Model$FunctionArg(0),
								$author$project$Model$Output(6)
							]),
						'if',
						'')
					]))
			]),
		model,
		true);
};
var $author$project$Docs$Tutorial$sideEffectFreeExample = function (model) {
	return A3(
		$author$project$Docs$Tutorial$makeExampleCalls,
		_List_fromArray(
			[
				A4(
				$author$project$Model$Call,
				2,
				_List_fromArray(
					[
						$author$project$Model$Text('0'),
						$author$project$Model$Text('C4'),
						$author$project$Model$Text('1')
					]),
				'note',
				''),
				A4(
				$author$project$Model$Call,
				3,
				_List_fromArray(
					[
						$author$project$Model$Text('0'),
						$author$project$Model$Text('E4'),
						$author$project$Model$Text('1')
					]),
				'note',
				'')
			]),
		model,
		true);
};
var $author$project$Docs$Tutorial$simpleNoteBlock = function (model) {
	return A3(
		$author$project$Docs$Tutorial$makeExampleCalls,
		_List_fromArray(
			[
				A4(
				$author$project$Model$Call,
				2,
				_List_fromArray(
					[
						$author$project$Model$Text('0'),
						$author$project$Model$Text('440'),
						$author$project$Model$Text('1')
					]),
				'note',
				'')
			]),
		model,
		true);
};
var $author$project$Docs$Tutorial$twoNoteBlocks = function (model) {
	return A3(
		$author$project$Docs$Tutorial$makeExampleCalls,
		_List_fromArray(
			[
				A4(
				$author$project$Model$Call,
				2,
				_List_fromArray(
					[
						$author$project$Model$Text('1'),
						$author$project$Model$Text('A4'),
						$author$project$Model$Text('2')
					]),
				'note',
				''),
				A4(
				$author$project$Model$Call,
				3,
				_List_fromArray(
					[
						$author$project$Model$Output(2),
						$author$project$Model$Text('B4'),
						$author$project$Model$Text('1')
					]),
				'note',
				'')
			]),
		model,
		true);
};
var $author$project$Docs$Tutorial$bodyList = function (model) {
	return _List_fromArray(
		[
			$author$project$Docs$Tutorial$makeMarkdown('\n## The Note Block\n'),
			$author$project$Docs$Tutorial$emptyNoteBlock(model),
			$author$project$Docs$Tutorial$makeMarkdown('\nThe main function above contains a block which represents calling the `note` function.\n\nThe three black dots on top of the `note` call represent the three arguments the function requires,\n  information `note` needs to create a single musical note.\nThis function call has holes where the arguments should be, so you cannot evaluate it to get a song.\n\nThe dot on the bottom of the block represents the output of the function, a song with a single\n  musical note in it.\n\n'),
			$author$project$Docs$Tutorial$simpleNoteBlock(model),
			$author$project$Docs$Tutorial$makeMarkdown('\nThe `note` call above has three arguments provided.\nYou can provide them when editing code by clicking a hole and typing on your keyboard.\n\nThe three arguments to `note` are the `startTime` (in seconds), `frequency` (in hertz), and `duration` (in seconds).\nThis call to `note` plays the note `A4` for 1 second. Alternatively, you can type the constant `A4` for 440.\n\n## Chaining Note Blocks\n'),
			$author$project$Docs$Tutorial$twoNoteBlocks(model),
			$author$project$Docs$Tutorial$makeMarkdown('\nThis example uses the output of the first note as the input for the `startTime` of the second note.\nThe `startTime` of the second note becomes the ending time for the first note, so it plays just after.\n\nWhen editing your programs, do this by left-clicking the output of the first block\n  and right clicking the input of a second block. (Alternatively, you can left-click an input and right-click\nan output).\n\n\nNotice that you can provide either a song or a literal number for the start time.\nIn fact, all literal numbers, such as `2`, represent silent songs with a start time of `0` and a duration\nwhich is the same as the literal number. The start time `1` sequences the first note after a silent period of\n1 second, then the second note is played after as it has a start time of `3`.\n\n## Computing With Songs\n\nAll literal values instantiate songs, and all calls to the `note` function result in songs. Operations like\n`+` also compute using songs, but require the definition of a song `anchor`.\n\nThe `anchor` of a song is the attachment point for future songs. This anchor is initialized\nto the duration of a song when the song is a literal. When songs are chained, the new anchor\nis updated to be `duration` greater.\n\nMathematical operations like `+` operate\non the anchors of multiple songs, returning the first argument with a modified anchor, \nin a similar way to how `note` extends a song with another note.\nConsider the following example.\n'),
			$author$project$Docs$Tutorial$ex1Addition(model),
			$author$project$Docs$Tutorial$makeMarkdown('\nNotice that the second note plays one second after the first.\nThe second note starts at the modified anchor of the first note, which is 2.\n\nHowever, something different happens when we reverse the order of the arguments to `+`.\n'),
			$author$project$Docs$Tutorial$ex2Addition(model),
			$author$project$Docs$Tutorial$makeMarkdown('\nThe first note does not play! This is because the result of the `+` computation is\na silent song of duration `2` with the anchor `3`. The other argument, the first note,\nis used to update the anchor of the literal `2`.\n\n\n## Join and Append\n'),
			$author$project$Docs$Tutorial$sideEffectFreeExample(model),
			$author$project$Docs$Tutorial$makeMarkdown('\nNotice that, in the example above, only the second note plays.\nThis is because the call to `note` constructs a song, but the song only plays\nwhen it is returned at the end of the `main` function. In other words, the result of the entire program\nis a single song, so the top note is a song which is not used anywhere.\nEach function returns the result of the last call in the body of the function, and last block of the `main`\nfunction should be the entire desired song.\n\nChaining two notes creates a song with both notes in them, but what if two songs must be played in parallel?\nCombining two separate songs can be achieved with the `join` function.\n\n'),
			$author$project$Docs$Tutorial$joinExample(model),
			$author$project$Docs$Tutorial$makeMarkdown('\nActually, it is possible to get away with never using the `join` function.\nThis is because there are no contraints on the `anchor` of a song- the anchor can even be negative!\nIf we set the anchor of the first note to zero, the second note will be added at time zero and\nachieve the same effect as the `join` call.\n'),
			$author$project$Docs$Tutorial$joinExampleZero(model),
			$author$project$Docs$Tutorial$makeMarkdown('\nThe above example subtracts the song from the first note from itself.\nThe anchor of the output then becomes `0`, the result of `1-1`.\nThis anchor is used in adding the second note, resulting in the same song as in the first example.\n\nSometimes, it is convenient to sequence two separate songs, one after another.\nThe `append` function sequences songs together, adding the anchor of each song to the `startTime` of the next.\nHere is an example that plays two notes, waits a second, then plays another two notes.\n'),
			$author$project$Docs$Tutorial$appendExample(model),
			$author$project$Docs$Tutorial$makeMarkdown('\n\n## Signals\n\nSo far, we have been writing programs that generate a static song.\nHowever, Sonic Onion is a reactive programing language- a song can be thought of\nas a continuous signal over time, which is a function of other signals.\n\nSignals can be anything that changes over time. In the next example, we use the mouse\nX coordinate, which can be refered to using the `mouseX` variable.\n'),
			$author$project$Docs$Tutorial$mouseXExample(model),
			$author$project$Docs$Tutorial$makeMarkdown('\nThe output of the program changes over time, with a frequency that matches the mouse\nposition. In reality, the continuous nature of your program is simulated by running many times\nper second. This is why we display a `fps`, or frames per second, counter to get an idea of how fine\nthe simulation is.\n\nSome other useful signals are `mouseY`, the Y coordinate of the mouse, and `time`, the current time\nin seconds since the program started playing.\n'),
			$author$project$Docs$Tutorial$makeMarkdown('\n## If Statements\n\nIt is useful sometimes to select between two songs\ndepending on a condition. Condition operators like `<` return\na boolean value, which is either true or false.\nThe `<` operator returns `true` if the first argument is less than the second argument.\n\n\nTo check conditions, we use the `if` function.\nThe first argument to `if` is the boolean value. If the value\nis `true`, the result of the `if` is the second argument.\nOtherwise, `if` returns the third argument.\n\n'),
			$author$project$Docs$Tutorial$ifExample(model),
			$author$project$Docs$Tutorial$makeMarkdown('\nIn the example above, we use `if` to detect if the mouse is far enough down\nthe screen, and change the note if it is.\nThe condition is that the mouse is greater than 200 pixels down the screen, and the\nchoices are two notes, either `A4` or `B4`. Using `if`, we can pick between entire songs!\nThe song is a signal which changes depending on the mouse position.\n'),
			$author$project$Docs$Tutorial$makeMarkdown('\n## Functions\nWriting little songs in the `main` functions is fun and all, but it\'s time to make things more interesting\nwith functions.\nDragging a new function block allows you to define a new function, which you can give a name in the text box.\nI called my new function `coolBeeps`.\n'),
			$author$project$Docs$Tutorial$coolBeepsSimple(model),
			$author$project$Docs$Tutorial$makeMarkdown('\nNotice that this program calls the `coolBeeps` function in `main`. `coolBeeps` returns\na little two-note song, which `main` provides as the main song.\n\nYour functions can also take arguments, allowing them to change their behavior\nin response to signals from outside the function.\n\n\nTo do this, connect the dots on the top of the function to inputs inside the body\nof the function.\nThen, when calling the function, provide arguments which are substituted for the outputs\nat the top of the function when it is called.\n'),
			$author$project$Docs$Tutorial$coolBeepsWithArgument(model),
			$author$project$Docs$Tutorial$makeMarkdown('\nThe example above provides `5` for the argument to the coolBeeps function.\nThis value is used for the duration of the first note, so the resulting song\nhas a first note of duration `5`.\n\n## Recursive Functions\n\nIf a function contains a call to itself in the body of the function, it is called \na `recursive` function. Recursive functions provide a powerful way to describe songs\nconcisely.\n'),
			$author$project$Docs$Tutorial$recursiveExample(model),
			$author$project$Docs$Tutorial$makeMarkdown('\n\nThis example recusrively calls the `beep` method to play notes\nseparated by 0.2 seconds. The input to the function is the song to\nadd on to, and the output is a completed song.\n\nWhen the function is called, it importantly checks that the song is\nnot too long. Without this check, the function would run forever, continuously\nadding to the song.\n\nIf you are familiar with other programming languages, you may notice Sonic Onion currently has no syntax to support loops. However, all loops can be written as recursive functions.\n\n\n## Sonic Onion To Do List\n\nSonic Onion is in an early stage of development, and lacks many features\nthat make programming languages usable and scalable.\n\nYou can contribute new ideas (as a github issue) or contribute at\n[https://github.com/oflatt/soniconion](https://github.com/oflatt/soniconion).\n\nIdeas:\n- infinite-length songs\n- saving programs\n- better toolbar\n- structs\n- state that persists over time- ontick loop\n- iterating over songs\n- synthesizers\n- effects\n- modules\n- performance improvement with Tone library\n- virtual reality inputs\n')
		]);
};
var $author$project$Docs$Tutorial$tutorialBody = function (model) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_Nil,
		$author$project$Docs$Tutorial$bodyList(model));
};
var $rtfeldman$elm_css$Css$color = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'color', c.value);
};
var $rtfeldman$elm_css$Css$prop3 = F4(
	function (key, argA, argB, argC) {
		return A2(
			$rtfeldman$elm_css$Css$property,
			key,
			A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.value, argB.value, argC.value])));
	});
var $rtfeldman$elm_css$Css$padding3 = $rtfeldman$elm_css$Css$prop3('padding');
var $author$project$Docs$Tutorial$makeMarkdownTitle = function (title) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						A3(
						$rtfeldman$elm_css$Css$padding3,
						$rtfeldman$elm_css$Css$em(4),
						$rtfeldman$elm_css$Css$em(0),
						$rtfeldman$elm_css$Css$em(1)),
						$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center)
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$fontSize(
								$rtfeldman$elm_css$Css$em(4)),
								$rtfeldman$elm_css$Css$color(
								A3($rtfeldman$elm_css$Css$rgb, 0, 14, 22))
							]))
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(title)
					]))
			]));
};
var $author$project$Docs$Tutorial$wrapMarkdownPage = F2(
	function (title, page) {
		return A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$backgroundColor($author$project$ViewVariables$pageColor),
							$rtfeldman$elm_css$Css$fontFamilies(
							_List_fromArray(
								['IBM Plex Sans', 'sans-serif']))
						]))
				]),
			_List_fromArray(
				[
					$author$project$Docs$Tutorial$makeMarkdownTitle(title),
					page
				]));
	});
var $author$project$Docs$Tutorial$makeTutorialPage = function (model) {
	return A2(
		$author$project$Docs$Tutorial$wrapMarkdownPage,
		'Tutorial',
		$author$project$Docs$Tutorial$tutorialBody(model));
};
var $author$project$View$makeUnusedPage = function (model) {
	return A2(
		$author$project$View$pageWrapper,
		$rtfeldman$elm_css$Html$Styled$text(''),
		model);
};
var $author$project$View$view = function (model) {
	return {
		body: _List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$toUnstyled(
				function () {
					var _v0 = model.currentPage;
					switch (_v0) {
						case 'Home':
							return $author$project$View$makeHomePage(model);
						case 'Unused':
							return $author$project$View$makeUnusedPage(model);
						case 'Docs':
							return $author$project$View$makeDocsPage(model);
						case 'Tutorial':
							return $author$project$Docs$Tutorial$makeTutorialPage(model);
						default:
							return $rtfeldman$elm_css$Html$Styled$text('error: not a page');
					}
				}())
			]),
		title: 'Sonic Onion'
	};
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{init: $author$project$Model$initialCommand, onUrlChange: $author$project$Model$UrlChanged, onUrlRequest: $author$project$Model$LinkClicked, subscriptions: $author$project$Main$subscriptions, update: $author$project$Update$update, view: $author$project$View$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (outerWindowWidth) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (outerWindowHeight) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (innerWindowWidth) {
							return A2(
								$elm$json$Json$Decode$andThen,
								function (innerWindowHeight) {
									return $elm$json$Json$Decode$succeed(
										{innerWindowHeight: innerWindowHeight, innerWindowWidth: innerWindowWidth, outerWindowHeight: outerWindowHeight, outerWindowWidth: outerWindowWidth});
								},
								A2($elm$json$Json$Decode$field, 'innerWindowHeight', $elm$json$Json$Decode$int));
						},
						A2($elm$json$Json$Decode$field, 'innerWindowWidth', $elm$json$Json$Decode$int));
				},
				A2($elm$json$Json$Decode$field, 'outerWindowHeight', $elm$json$Json$Decode$int));
		},
		A2($elm$json$Json$Decode$field, 'outerWindowWidth', $elm$json$Json$Decode$int)))(0)}});}(this));