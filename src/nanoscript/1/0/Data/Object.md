# Literals

**Anonymous objects** can be declared literally by separating each member with a comma, adding curly braces to the ends, and then prefixing with the `@` character. Each member is declared in the form `name as value`, where `name` is a valid identifier and `value` is a valid expression. For example:

```nanoscript
set anon to @{
  member_1 as 1,
  member_2 as true,
  member_3 as `three`,
}
```

An advanced syntax is also available:

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

# Operations

All but the following operations are not defined by nanoscript; every object can define their own behaviour using [object operation implmentations](#Object operation implementation).

## Test emptyness

Gives `false`.
