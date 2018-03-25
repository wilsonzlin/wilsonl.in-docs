# Literals

Lists can be declared literally by separating each element with a comma and adding square brackets to the ends. Some examples:

|Code|Length|Elements|
|---|---|---|
|`[]`|0||
|`[1]`|1|<ol><li>`1`</ol>|
|``[3.14, Math.PI, true, {}, [1, 2, `three`, four]]``|5|<ol><li>`3.14`<li>`Math.PI`<li>`true`<li>`{}`<li>``[1, 2, `three`, four]``</ol>|

Lists can hold any data type, and do not require all elements to be the same type. Lists can hold lists, allowing multi-dimensional and nested lists.

# Operations

## Test emptyness

Gives `true` if it has no elements, and `false` otherwise.
