Null-related operators include **[null-safe accessor](#Members)**, **[null-safe lookup](#Lookups)**, and **[null-safe call](#Calling)**, which are described on their respective non-null operator article.

**Null coalescing** operator is a binary operator that takes two operands and returns the right operand if the left operand is null, otherwise it returns the left operand. For example:

```nanoscript
create left as null
create right as 8
create nine as 9

create result as (left ?? right) + 9
```

The variable `result` in the above example would be equal to `17`.

The null coalescing operator is right associative and has the lowest precedence of all operators.
