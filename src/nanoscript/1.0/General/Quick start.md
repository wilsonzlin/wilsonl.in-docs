If you're already proficient in another language, here's some quick information to get you started quickly.

[Variables](#Scoped variable) must be declared before use. They must be initialised at the same time. To declare, use `create var_name as var_value`. To set a variable, use `set var_name to new_value`.

Every function, [`if` statement](#Branching), [`while`](#Conditional loop) and [`for`](#Iterator loop) loop, [`catch` block](#Error handling), and [`case` statement and option](#Branching) has their own [scope](#Scope). Noticeably, [`try` blocks](#Error handling) do **not** have their own scope.

[String](#String value) literals start and end with a backtick. [Comments](#Comment) use one or more quote marks (`"`) as delimiters. All [numbers](#Number value) are 64-bit floating-point. [Booleans](#Boolean value) and [null](#Null value) exists too.

The logic operators are [`not`, `and`, and `or`](#Logic). There are no "truthy" values; instead, use [emptyness](#Empty-related) and [null](#Null-related) to achieve similar shorthands. For equality, use [`==` and `~=`](#Compare). Two numbers, booleans, or strings are equal if they have the same value; for everything else, they are equal if they occupy the same location in memory. `null` always equals itself.

Functions, even class ones, are first-class and can be passed around as variables. Other than built-in functions, there are two types of functions: [lambdas](#Lambda) (functions by themselves) and [class functions](#Class function) (called *methods* in other languages). Declaring a function by itself simply invoves declaring a lambda and assigning it to a variable. Declaring a [function on a class](#Class function) makes it shared (known as *static* in other languages); adding a `self` parameter at the start also makes it an object function (known as *instance method* in other languages).

[Classes also have variables](#Class variable) (called *properties* in other languages). They are object variables (called *instance properties* in other languages), unless they are declared with `shared` (making them *static* in other languages). The variables and functions of a class are called its members.

There are no such thing as "interfaces", and classes can have multiple [parents](#Inheritance). All class members must have unique names, so there is no "overloading".

nanoscript is reasonably strict. All of the following actions will cause errors:

- Accessing and assigning to non-existent object variables of non-extensible objects
- Not matching the signature of a function when calling it
- Attempting to execute an operation that does not exist or with operands that don't match its signature (e.g. comparing a string to a number)
- Using a variable before it's declared

Type modifiers can be added to variables, functions (return type), and parameters. Depending on how the interpreter is run, they are ignored, used for runtime type hinting, or required for compile-time static type checking.
