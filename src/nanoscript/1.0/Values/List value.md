# Literals

Lists can be declared literally by separating each element with a comma and adding square brackets to the ends. Some examples:

|Code|Length|Elements|
|---|---|---|
|`[]`|0||
|`[1]`|1|<ol><li>`1`</ol>|
|<pre>[<br>  3.14,<br>  Math.PI,<br>  true,<br>  {},<br>  [1, 2, &#96;three&#96;, four]<br>]</pre>|5|<ol><li>`3.14`<li>`Math.PI`<li>`true`<li>`{}`<li>``[1, 2, `three`, four]``</ol>|

Lists can hold any values, and do not require all elements to be the same type. This includes lists, allowing multi-dimensional and nested lists.

# Operations

## Test emptyness

Gives `true` if it has no elements, and `false` otherwise.
