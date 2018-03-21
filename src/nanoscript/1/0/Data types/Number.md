# Literals

Number literals can be written in different bases.

All literals regardless of base can have a negative value if prefixed with a hyphen (`-`).

For base 10, the format is simply one or more digits, followed optionally by a decimal and more digits. Some examples:

|Code|Value in base 10|
|---|---|
|`0`|0|
|`131`|131|
|`3.14`|3.14|
|`-65535.000`|-65535|

It can have an exponent part at the end, which is the character `e` followed by one or more digits. Some examples:

|Code|Value in base 10|
|---|---|
|`1e2`|100|
|`0e500`|0|
|`-43e0`|-43|
|`3.14e3`|3140|

For base 2, 8, and 16, the format is a zero, followed by a base delimiter, followed by one or more digits valid for the base. Decimals and exponents are not allowed. The base delimiters and valid digits are:

|Delimiter|Base|Valid digits
|---|---|---|
|`b`|2|`01`|
|`o`|8|`01234567`|
|`x`|16|`0123456789abcdef` (case-insensitive)|

Some examples:

|Code|Value in base 10|
|---|---|
|`0xaf`|175|
|`0b0110`|6|
|`-0o777`|511|

No other bases are supported for literals.

# Operations

## Add (other : Number)

Gives the result of adding it to `other`.

## Subtract (other : Number)

Gives the result of subtracting `other` from it.

## Multiply (other : Number)

Gives the result of multiplying it by `other`.

## Divide (other : Number)

Gives the result of dividing it by `other`.

## Exponentiate (other : Number)

Gives the result of raising it to the power `other`.

## Modulo (other : Number)

Gives the remainder after dividing it by `other`.

## Test equality (other : Number)

Gives `true` if it has the same value as `other`, otherwise gives `false`.

## Compare (other : Number)

Gives a negative number if it is less than `other`, zero if it is the same as `other`, and a positive number if it is greater than `other`.

## Convert to boolean

Gives `true`.

## Convert to string

Gives the string representation of it.

# Members
