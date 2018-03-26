If you're already proficient in another language, here's some quick information to get you started quickly.

[Variables](#Scoped variables) must be declared before use. They must be initialised at the same time. To declare, use `create var_name as var_value`. To set a variable, use `set var_name to new_value`.

Every function, [`if` statement](#Branching), [`while` and `for` loop](#Looping and iteration), [`catch` block](#`try` and `catch`), and [`case` statement and option](#Branching) has their own [scope](#Scopes). Noticeably, [`try` blocks](#`try` and `catch`) do **not** have their own scope.

[String](#String) literals start and end with a backtick. [Comments](#Comments) use one or more quote marks (`"`) as delimiters. All [numbers](#Number) are 64-bit floating-point. [Booleans](#Boolean) and [null](#Null) exists too.

The logic operators are [`not`, `and`, and `or`](#Logic). There are no "truthy" values; instead, use [emptyness](#Empty-related) and [null](#Null-related) to achieve similar shorthands. For equality, use [`==` and `!=`](#Comparison). Two numbers, booleans, and strings are equal if they have the same value; for everything else, they are equal if they occupy the same location in memory. `null` always equals itself.

Functions, even class ones, are first-class and can be passed around as variables (the type is [callable](#Callable)). Other than built-in functions, there are two types of functions: [lambdas](#Lambdas) (functions by themselves) and [class functions](#Class functions) (called *methods* in other languages). Declaring a function by itself simply invoves declaring a scoped function and assigning it to a variable. Declaring a [function on a class](#Class functions) makes it shared (known as *static* in other languages); adding a `self` parameter at the start makes it an object function (known as *instance methods* in other languages).

Classes also have variables (called *properties* in other languages). All variables are object variables (called *instance properties* in other languages), unless they have the `shared` modifier (making them *static* in other languages). The variables and functions of a class are called its members.

There are no interfaces, and classes can have multiple parents. All class members must have unique names, so there is no overloading.

nanoscript is reasonably strict. All of the following actions will cause errors:

- Accessing and assigning to non-existent member variables of non-extensible objects
- Not matching the signature of a function when calling it
- Attempting to execute an operation that does not exist or with operands that don't match its signature (e.g. comparing a string to a number)
- Using a variable before it's declared

Type modifiers can be added to variables, functions (return type), and parameters. Depending on how the interpreter is run, they are ignored, used for runtime type hinting, or required for compile-time static type checking.
