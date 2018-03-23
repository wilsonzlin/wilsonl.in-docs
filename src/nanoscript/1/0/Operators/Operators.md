The following table is sorted by precedence, with the highest precedence operators at the top.

|Name|Operation|Syntax|Arity|Associativity|
|---|---|---|---|---|
|Accessor|Access and assign|`.`|Binary|Left|
|Null-safe accessor|Access|`?.`|Binary|Left|
|Lookup|Access and assign|`[`|Unary|Left|
|Null-safe lookup|Access|`?[`|Unary|Left|
|Call|Call|`(`|Unary|Left|
|Null-safe call|Call|`?(`|Unary|Left|
|Measure|Measure|`#`|Unary|Right|
|Exponentiate|Exponentiate|`^`|Binary|Right|
|Multiply|Multiply|`*`|Binary|Left|
|Divide|Divide|`/`|Binary|Left|
|Modulo|Modulo|`%`|Binary|Left|
|Plus|Add|`+`|Binary|Left|
|Minus|Subtract|`-`|Binary|Left|
|Equals|Test equality|`==`|Binary|Left|
|Not equals|Test equality|`!=`|Binary|Left|
|Less than|Compare|`<`|Binary|Left|
|Less than or equal to|Compare|`<=`|Binary|Left|
|Greater than|Compare|`>`|Binary|Left|
|Greater than or equal to|Compare|`>=`|Binary|Left|
|Compare|Compare|`<=>`|Binary|Left|
|Type of|Test ancestry|`typeof`|Binary|Left|
|Not type of|Test ancestry|`not typeof`|Binary|Left|
|Empty|Test emptyness|`empty`|Unary|Right|
|Not||`not`|Unary|Right|
|And||`and`|Binary|Left|
|Or||`or`|Binary|Left|
|Null coalescing||`??`|Binary|Right|
|Empty coalescing||`?:`|Binary|Right|

## Precedence levels

Operators in the same row have the same precedence. The following table is sorted by precedence, with the highest precedence operators at the top.

|Operators|
|---|
|Accessor, null-safe accessor, lookup, null-safe lookup, call, null-safe call|
|Measure|
|Exponentiate|
|Multiply, divide, modulo|
|Plus, minus|
|Equals, not equals, less than, less than or equal to, greater than, greater than or equal to, compare, type of, not type of|
|Empty|
|Not|
|And|
|Or|
|Null coalescing|

## Arity

## Associativity
