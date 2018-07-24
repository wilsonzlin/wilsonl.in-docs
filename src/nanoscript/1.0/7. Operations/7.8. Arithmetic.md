There are 6 **arithmetic** operators. Note that although they are called arithmetic operators, the literal meaning only applies to numbers. Objects can use these operators to do anything, even if unrelated to the name of the operation or category (arithmetic). The operators are:

|Name|Operation|Syntax|Arity|Associativity|
|---|---|---|---|---|
|Exponentiate|Exponentiate|`^`|Binary|Right|
|Multiply|Multiply|`*`|Binary|Left|
|Divide|Divide|`/`|Binary|Left|
|Modulo|Modulo|`%`|Binary|Left|
|Plus|Add|`+`|Binary|Left|
|Minus|Subtract|`-`|Binary|Left|

Note that the exponentiate operator is right-associative. Here are some examples:

```nanoscript
1 + 1        "gives 2"
3.14 - 4     "gives -0.86"
1.5 * 3      "gives 4.5"
4 / 4        "gives 1"
2 ^ 4        "gives 16"
21 % 5       "gives 1"
2 + 3 * 5    "gives 17"
4 ^ 3 ^ 2    "gives 262144"
(4 ^ 3) ^ 2  "gives 4096"

`yes` + `no` "gives `yesno`"
`hello` * 3  "gives `hellohellohello`"

class A begin
  operation add (self, other : A)
    return @{
      completely as `random`
    }
  endoperation
endclass

A() + A()    "gives @{ completely as `random` }"
```
