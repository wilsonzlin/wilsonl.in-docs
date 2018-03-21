# Literals

Maps can be declared literally by separating each entry with a comma and adding curly braces to the ends. Each entry is declared in the form `key as value`, where `key` and `value` are valid expressions. Some examples:

|Code|Size|Entries|
|---|---|---|
|`{}`|0||
|``{`stringkey` as `stringvalue`}``|1|`` `stringkey` ``: `` `stringvalue` ``|
|``{ `pi` as 3.14, Math.PI as `pi`, 42 as true, {} as {}, `a list` as [1, 2, `three`, four] }``|5|`` `pi` ``: `3.14`, `Math.PI`: `` `pi` ``, `42`: `true`, `{}`: `{}`, `` `a list` ``: ``[1, 2, `three`, four]``|

Map keys and values can be of any type, and do not have to be the same. Maps do not have to have the same types of keys or values.
