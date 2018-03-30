# Precedence levels

# Arity

# Associativity

# Operators

The following table is sorted by precedence, with the highest precedence operators at the top.

<table>
<thead>
  <tr>
    <th>
    <th>Name
    <th>Operation
    <th>Syntax
    <th>Arity
    <th>Associativity

<tbody>
  <tr>
    <td rowspan="6">
    <td>Accessor
    <td>Access and assign to
    <td><code>.</code>
    <td>Binary
    <td>Left
  <tr>
    <td>Null-safe accessor
    <td>Access and assign to
    <td><code>?.</code>
    <td>Binary
    <td>Left
  <tr>
    <td>Lookup
    <td>Look up and update
    <td><code>[</code>
    <td>Unary
    <td>Left
  <tr>
    <td>Null-safe lookup
    <td>Look up and update
    <td><code>?[</code>
    <td>Unary
    <td>Left
  <tr>
    <td>Call
    <td>Call
    <td><code>(</code>
    <td>Unary
    <td>Left
  <tr>
    <td>Null-safe call
    <td>Call
    <td><code>?(</code>
    <td>Unary
    <td>Left

  <tr>
    <td rowspan="1">
    <td>Await
    <td>
    <td><code>await</code>
    <td>Unary
    <td>Right

  <tr>
    <td rowspan="1">
    <td>Exponentiate
    <td>Exponentiate
    <td><code>^</code>
    <td>Binary
    <td>Right

  <tr>
    <td rowspan="1">
    <td>Bitwise NOT
    <td>Bitwise NOT
    <td><code>~</code>
    <td>Unary
    <td>Right

  <tr>
    <td rowspan="1">
    <td>Measure
    <td>Measure
    <td><code>#</code>
    <td>Unary
    <td>Right

  <tr>
    <td rowspan="3">
    <td>Multiply
    <td>Multiply
    <td><code>*</code>
    <td>Binary
    <td>Left
  <tr>
    <td>Divide
    <td>Divide
    <td><code>/</code>
    <td>Binary
    <td>Left
  <tr>
    <td>Modulo
    <td>Modulo
    <td><code>%</code>
    <td>Binary
    <td>Left

  <tr>
    <td rowspan="2">
    <td>Plus
    <td>Add
    <td><code>+</code>
    <td>Binary
    <td>Left
  <tr>
    <td>Minus
    <td>Subtract
    <td><code>-</code>
    <td>Binary
    <td>Left

  <tr>
    <td rowspan="3">
    <td>Bitwise left shift
    <td>Bitwise left shift
    <td><code>&lt;&lt;</code>
    <td>Binary
    <td>Left
  <tr>
    <td>Bitwise right shift
    <td>Bitwise right shift
    <td><code>&gt;&gt;</code>
    <td>Binary
    <td>Left
  <tr>
    <td>Bitwise zero-fill right shift
    <td>Bitwise zero-fill right shift
    <td><code>&gt;&gt;&gt;</code>
    <td>Binary
    <td>Left

  <tr>
    <td rowspan="1">
    <td>Bitwise AND
    <td>Bitwise AND
    <td><code>&amp;</code>
    <td>Binary
    <td>Left

  <tr>
    <td rowspan="1">
    <td>Bitwise OR
    <td>Bitwise OR
    <td><code>|</code>
    <td>Binary
    <td>Left

  <tr>
    <td rowspan="1">
    <td>Bitwise XOR
    <td>Bitwise XOR
    <td><code>\</code>
    <td>Binary
    <td>Left

  <tr>
    <td rowspan="14">
    <td>In
    <td>Check contents
    <td><code>in</code>
    <td>Binary
    <td>Left
  <tr>
    <td>Not in
    <td>Check contents
    <td><code>not in</code>
    <td>Binary
    <td>Left
  <tr>
    <td>Empty
    <td>Test emptyness
    <td><code>empty</code>
    <td>Unary
    <td>Right
  <tr>
    <td>Is
    <td>Test identity
    <td><code>is</code>
    <td>Binary
    <td>Left
  <tr>
    <td>Is not
    <td>Test identity
    <td><code>is not</code>
    <td>Binary
    <td>Left
  <tr>
    <td>Equals
    <td>Test equality
    <td><code>==</code>
    <td>Binary
    <td>Left
  <tr>
    <td>Not equals
    <td>Test equality
    <td><code>~=</code>
    <td>Binary
    <td>Left
  <tr>
    <td>Less than
    <td>Compare
    <td><code><</code>
    <td>Binary
    <td>Left
  <tr>
    <td>Less than or equal to
    <td>Compare
    <td><code><=</code>
    <td>Binary
    <td>Left
  <tr>
    <td>Greater than
    <td>Compare
    <td><code>></code>
    <td>Binary
    <td>Left
  <tr>
    <td>Greater than or equal to
    <td>Compare
    <td><code>>=</code>
    <td>Binary
    <td>Left
  <tr>
    <td>Compare
    <td>Compare
    <td><code><=></code>
    <td>Binary
    <td>Left
  <tr>
    <td>Type of
    <td>Test ancestry
    <td><code>typeof</code>
    <td>Binary
    <td>Left
  <tr>
    <td>Not type of
    <td>Test ancestry
    <td><code>not typeof</code>
    <td>Binary
    <td>Left

  <tr>
    <td rowspan="1">
    <td>Not
    <td>
    <td><code>not</code>
    <td>Unary
    <td>Right

  <tr>
    <td rowspan="1">
    <td>And
    <td>
    <td><code>and</code>
    <td>Binary
    <td>Left

  <tr>
    <td rowspan="1">
    <td>Or
    <td>
    <td><code>or</code>
    <td>Binary
    <td>Left

  <tr>
    <td rowspan="1">
    <td>Null coalescing
    <td>
    <td><code>??</code>
    <td>Binary
    <td>Right

  <tr>
    <td rowspan="1">
    <td>Empty coalescing
    <td>
    <td><code>?:</code>
    <td>Binary
    <td>Right

  <tr>
    <td rowspan="1">
    <td>Yield
    <td>
    <td><code>yield</code>
    <td>Unary
    <td>Right
</table>
