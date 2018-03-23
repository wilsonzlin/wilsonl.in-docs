If you're already proficient in another language, here's some quick information to get you started quickly.

[Variables](#Scoped variables) must be declared before use. They must be initialised at the same time. To declare, use `create var_name as var_value`. To set a variable, use `set var_name to new_value`.

Every [function](#Scoped functions), [`if` statement](#Conditional branching), [`while` and `for` loop](#Looping and iteration), [`catch` block](#Error handling statements), and [`case` option](#Conditional branching) has their own [scope](#Scopes). Noticeably, [`try` blocks](#Error handling statements) do **not** have their own scope.

[String](#String) literals start and end with a backtick. [Comments](#Comments) use one or more quote marks (`"`) as delimiters. All [numbers](#Number) are 64-bit floating-point. [Booleans](#Boolean) and [null](#Null) exists too.

The logic operators are [`not`, `and`, and `or`](#Logic). There are no "truthy" values; instead, use [emptyness](#Empty-related) and [null](#Null-related) to achieve similar shorthands. For equality, use [`==` and `!=`](#Comparison). Two numbers, booleans, and strings are equal if they have the same value; for everything else, they are equal if they occupy the same location in memory. `null` always equals itself.
