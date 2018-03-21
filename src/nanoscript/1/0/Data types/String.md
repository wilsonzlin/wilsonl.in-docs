# Literals

String literals start and end with a backtick.

They may contain any characters, including line terminators. All characters, including any line terminators, are part of the string's data.

To include a backtick as part of the data and not have it become a delimiter, insert a backslash before it. This is known as escaping. To use a backslash before a backtick literally (i.e. not to escape the backtick), escape it by adding a backslash before it.

Some characters are hard to type or represent literally. To help, a character can also be represented using its Unicode code point. To do this, instead of inserting a character, insert `\x{ XXXXXX }`, where `XXXXXX` is the hexadecimal code point of the character (which is 2 to 6 digits long). When parsed, it will be replaced with the actual character data.

# Operations

## Add (other : String)

Gives the result of concatenating `other` to the end of it.

## Test equality (other : String)

Gives `true` if it has the same sequence of characters in the same order as `other`, otherwise gives `false`.

## Compare (other : String)

Every character from first to last is compared to its corresponding character at the same position in `other`. At the first position that has characters with different Unicode code points, a negative number is given if `other`'s code point is larger, and a positive number if `other`'s code point is smaller. If no other corresponding character is available (i.e. different lengths), a negative number is given if `other` is longer, and a positive number if `other` is shorter. If they have the same lengths and no differing character code points, they are equal and zero is given.

## Measure

Gives the length (i.e. amount of characters).

## Convert to boolean

Gives `true`.

## Convert to string

Gives itself.

# Members
