# Literals

It's possible to create an object quickly without having to declare an entire class for it, by using **anonymous objects**.
Anonymous objects can be literally declared and simply have the type `Object`.

Anonymous objects can be declared simply by separating each member variable with a comma, adding curly braces to the ends, and then prefixing with the `@` character.
Each member variable is declared in the form `name as value`, where `name` is a valid identifier and `value` is a valid expression. For example:

```nanoscript
set anon to @{
  member_1 as 1,
  member_2 as true,
  member_3 as `three`,
  not_a_member_function as fn (param_1)
    print(`This is not a member function and does not have \`self\``)
  endn
}
```

The above syntax is simple, as it only allows for member variables. To take advantage of object functions, extension handlers, and operation implementations, use the advanced syntax:

```nanoscript
set adv_anon to @{
  variable one as 1
  variable two as 2
  variable extns as Map()

  extension getter (self, name)
    return extns[name]
  endgetter

  extension setter (self, name, value)
    set extns[name] to value
  endsetter

  function set_one (self, new_one)
    set self.one to new_one
  endfunction

  function hello ()
    print(`Hello`)
  endfunction

  operation add (self, other : Number)
    return self.one + other
  endoperation
}
```

The syntax is essentially the same as a class declaration's body, except constructors and shared variables are not allowed, and all functions must be object functions.

# Operations

All object operations are not defined by nanoscript; every object can define their own behaviour using [object operation implmentations](#Object operation implementation).
