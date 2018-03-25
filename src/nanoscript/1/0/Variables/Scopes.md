A **scope** determines the visibility of scoped variables declared directly within it.

Scopes are a bit tricky to explain but easy to understand, so here are 5 rules for understanding scopes:

# Several things have their own scope

[Chunks](#Chunks) have their own scope, as well as functions, branches, loops, and catches.

# A scoped variable exists in the nearest scope it's declared in

In the following example, `x` is in the `while` loop's scope, and `y` is in the `for` loop's scope. `y` is *not* in the `while` loop's scope, and `x` is *not* in the `for` loop's scope.

```nanoscript
while true before
  create x as 1

  for i in range(10) do
    create y as 2
  endfor
endwhile
```

# A scoped variable can be referenced in the same scope

To reference means to use in an expression or statement.

```nanoscript
while true before
  create x as 1
  print(x) "<-- This is OK"
endwhile

print(x) "<-- This is not OK"
```

# A scoped variable can be referenced in any nested scope

A nested scope is any scope in a scope. In the following example, even though `x` is in the `while` loop's scope, it can still be referenced in the `for` loop and lambda, because they are inside the `while` loop.

```nanoscript
while true before
  create x as 1

  for i in range(10) do
    print(x) "<-- This is OK"

    create y as fn ()
      print(x) "<-- This is also OK"
    endfn
  endfor
endwhile
```

# A scoped variable cannot be referenced anywhere else

`x` cannot be referenced in the `if` statement, because it is outside the `while` loop, even though they are adjacent. Same goes for the `str` statement at the bottom, because that is in the chunk's scope, which is outside of the `while` loop.

```nanoscript
while true before
  create x as 1
endwhile

if true then
  print(x) "<-- This is not OK"
endif

str(x) "<-- This is not OK"
```

# A scoped variable cannot have the same name as an existing one in the same scope

A scoped variable *can* have the same name as a variable in an outer scope, but it is not recommended. It is a separate variable; any changes made to it only affects itself. Note that this makes it impossible to reference the outer scope's variable of the same name.

```nanoscript
while true before
  create x as 1
  create x as 2 "<-- This is not OK"

  for i in range(10) do
    create x as 3 "<-- This is not advised, and does **not** change the outer `x` or link to it"
    set x to 3.5 "<-- This affects the `x` in this for loop only"

    create y as fn ()
      create x as 4 "<-- This is also OK but not advised; there are now three different `x` variables"
      set x to 4.5 "<-- This affects the `x` in this function only"
    endfn
  endfor
endwhile

create x as 5 "<-- This is OK, because `x` doesn't exist out here"
```
