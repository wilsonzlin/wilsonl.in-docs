Members can be **accessed** by using the *accessor* (`.`) and *null-safe accessor* (`?.`) operators.

If the member does not exist, a `ReferenceError` is thrown.

Setting the value of a member uses the same syntax as setting a variable. Note that it's not possible to create new members on data except for maps and extensible objects, so there is no corresponding *create* syntax. Maps and extensible objects use the *set* syntax even if the member does not exist. Here are some examples:

```nanoscript
create list as [0, 1, 2, { three: 3 }]

"Access the <length> member variable of <list>, which is of type List"
list.length

"Call the <get> member function of <list>"
list.get(0)

"Set the <length> member variable of <list>"
set list.length to 5

"Call the <toString> member function of the <list> member variable <length>, which is of type Number"
list.length.toString()

"Access the <three> member of the result of calling the <get> member function of <list>"
list.get(3).three

"Set the <three> member of the result of calling the <get> member function of <list>"
set list.get(3).three to `three`
```

Sometimes, it's possible that the data being accessed might be null, in which case trying to access a member would result in an error. Instead of checking for null explicitly, the null-safe accessor can be used. It returns null if the data is null and won't try to access it, and otherwise returns the member's value. This is especially useful in chaining member accesses. Note that accessing an invalid member throws an error, which doesn't change under the null-safe accessor. Here is an example:

```nanoscript
create my_fun as fn (opt some_obj)
  """
  This will return the value of <some_member> on <some_obj>,
  unless <some_obj> is null, in which case no ReferenceError
  will be thrown and it will return `null`
  """
  return some_obj?.some_member
endfn
```

# Overloading

None of the operators relating to members can be overloaded.
