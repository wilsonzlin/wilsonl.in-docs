# Literals

Maps can be declared literally by separating each entry with a comma and adding curly braces to the ends. Each entry is declared in the form `key as value`, where `key` and `value` are valid expressions. Some examples:

|Code|Size|Entries|
|---|---|---|
|`{}`|0||
|``{`stringkey` as `stringvalue`}``|1|<table><tr><th>`` `stringkey` ``<td>`` `stringvalue` ``</table>|
|``{``<br>```pi` as 3.14,``<br>``Math.PI as `pi`,``<br>``42 as true,``<br>``{} as {},``<br>`` `a list` as [1, 2, `three`, four] ``<br>`}`|5|<table><tr><th>`` `pi` ``<td>`3.14`<tr><th>`Math.PI`<td>`` `pi` ``<tr><th>`42`<td>`true`<tr><th>`{}`<td>`{}`<tr><th>`` `a list` ``<td>``[1, 2, `three`, four]``</table>|

Map keys and values can be of any type, and do not have to be the same. Maps do not have to have the same types of keys or values.

# Operations

## Test emptyness

Gives `true` if it has no entries, and `false` otherwise.
