There are two types of members:

- **Member variables**: Variables attached to the data that have their own value independent of any other data, including ones with the same type. They are normally accessed an assigned to.
- **Member functions**: Functions that implicitly take in the data as a parameter and does something invoving it. They are normally accessed and called simultaneously.

Members can be accessed by using the *accessor* (`.`) and *null-safe accessor* (`?.`) operators. Additionally, if the member is a function, it can be called using the [call operators](#Calling).

If the member does not exist, a `ReferenceError` is thrown.

Setting the value of a member uses the same syntax as setting a variable. Note that it's not possible to create new members on data except for maps, so there is no corresponding *create* syntax. Maps use the *set* syntax even if the member does not exist.

Sometimes, it's possible that the data might be null, in which case trying to access a member would result in an error. Instead of checking for null explicitly, the null-safe accessor can be used. It returns null if the data is null and won't try to access the member, and otherwise returns the member's value. This is especially useful in chaining member accesses. Note that accessing an invalid member throws an error, which doesn't change under the null-safe accessor.

Here are some examples:

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

All data types except objects and classes have predefined **members**. These definitions can be found in their respective [data type](#Data types) article. Objects and classes define their own member [variables](#Class variables) and [functions](#Class functions). This is known as [object orientation](#Classes).

# Overloading

None of the operators relating to members can be overloaded.
