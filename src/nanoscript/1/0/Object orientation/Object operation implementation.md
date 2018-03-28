All data types except objects have their own operation implementations; they define what happens when they are operated upon.

Objects, however, can define what happens when they appear as an operand in some operation, by defining their own **object operation implementations**.

[User-defined classes](#User-defined class) define these for objects of its type. [Anonymous objects](#Object) define these in their declaration.

# Positioning

By default, all object operation implementations are only used if the object is on the left-hand side (LHS). To change this, implementations can specify what sides the object can be in for it to apply.

When an operation execution expression is reached, nanoscript will look for an implementation that applies to the LHS on the LHS operand.
If none is found, nanoscript will then look for an applicable implementation on the RHS operand. If nothing is available on the RHS either,
an `UnsupportedOperationError` is thrown.
