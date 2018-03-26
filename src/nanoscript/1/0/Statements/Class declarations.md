[**Classes**](#Classes) are declared using the `class` keyword. They are statements; additionally, they can only be declared in a chunk scope (i.e. the top-level scope). Like variables, classes must be declared before they can be referenced.

The format of a class declaration is its name, a colon, its parents separated by plus characters (`+`), the keyword `begin`, the class body, and the keyword `endclass`. Here's an example:

```nanoscript
class Name : FirstParent + SecondParent + ThirdParent + FourthParent begin
  "The class body goes here"
endclass
```

The class body is made up of class body units; these are declarations for the class's [variables](#Class variables), [functions](#Class functions), [constructor](#Constructors), [operations](#Object operations), and [extension handlers](#Extensions); see their respective documentation articles for their syntax. Here is an example of a class:

```nanoscript
class Name : FirstParent + SecondParent begin
  variable a as 1
  variable b : Number as 2 + a
  variable C : shared as 3.14
  variable D : shared String as `John`
  variable others as Map()

  constructor (self, arg_one, arg_two)
    set self.a to self.a + arg_one
    set self.b to arg_two
  endconstructor

  extension getter (self, name)
    return others[name]
  endgetter

  extension setter (self, name, value)
    set others[name] to value
  endsetter

  function x (self, a, b)
    set self.a to a
    set self.b to b
  endfunction

  function y : Number (self, p : Boolean)
    if p then
      return self.a
    otherwise
      return self.b
    endif
  endfunction

  function Z : null ()
    print(`Hello, world! I am ` + Name.D)
  endfunction

  operation lhs add (self, other : Name)
    return A(self.a + other.a, self.b + other.b)
  endoperation
endclass
```

For information on classes, see [Classes](#Classes).
